
import React, { useState } from 'react';
import { X, Upload, FileText, AlertCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../integrations/supabase/client';
import { Excellence, Experience } from '../types';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

interface ImportDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportComplete?: () => void;
}

interface ImportData {
  excellences?: Excellence[];
  experiences?: Experience[];
}

type SupportedFormat = 'json' | 'csv' | 'xlsx' | 'md';

export const ImportDataModal: React.FC<ImportDataModalProps> = ({
  isOpen,
  onClose,
  onImportComplete
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [importStatus, setImportStatus] = useState<{
    type: 'success' | 'error' | 'info' | null;
    message: string;
  }>({ type: null, message: '' });
  const { user } = useAuth();

  if (!isOpen) return null;

  const getSupportedFormats = (): string[] => {
    return ['.json', '.csv', '.xlsx', '.xls', '.md'];
  };

  const getFileFormat = (file: File): SupportedFormat | null => {
    const extension = file.name.toLowerCase().split('.').pop();
    switch (extension) {
      case 'json':
        return 'json';
      case 'csv':
        return 'csv';
      case 'xlsx':
      case 'xls':
        return 'xlsx';
      case 'md':
        return 'md';
      default:
        return null;
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const format = getFileFormat(selectedFile);
      if (format) {
        setFile(selectedFile);
        setImportStatus({ type: null, message: '' });
      } else {
        setImportStatus({
          type: 'error',
          message: 'Format de fichier non supporté. Utilisez JSON, CSV, Excel (.xlsx/.xls) ou Markdown (.md).'
        });
      }
    }
  };

  const parseCSV = (content: string): Promise<ImportData> => {
    return new Promise((resolve, reject) => {
      Papa.parse(content, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          try {
            const data = results.data as any[];
            
            // Déterminer si c'est des excellences ou des expériences basé sur les colonnes
            const firstRow = data[0];
            if (!firstRow) {
              resolve({ excellences: [], experiences: [] });
              return;
            }

            if ('name' in firstRow && 'category' in firstRow) {
              // Format excellences
              const excellences = data.map(row => ({
                name: row.name || '',
                description: row.description || '',
                category: row.category || 'manifestee'
              }));
              resolve({ excellences });
            } else if ('title' in firstRow && 'excellence_id' in firstRow) {
              // Format expériences
              const experiences = data.map(row => ({
                excellence_id: row.excellence_id || '',
                title: row.title || '',
                description: row.description || '',
                date_experienced: row.date_experienced || new Date().toISOString().split('T')[0],
                tags: row.tags ? row.tags.split(',').map((tag: string) => tag.trim()) : [],
                image_url: row.image_url || null,
                image_caption: row.image_caption || null
              }));
              resolve({ experiences });
            } else {
              reject(new Error('Format CSV non reconnu. Assurez-vous d\'avoir les bonnes colonnes.'));
            }
          } catch (error) {
            reject(error);
          }
        },
        error: (error) => {
          reject(new Error(`Erreur lors du parsing CSV: ${error.message}`));
        }
      });
    });
  };

  const parseExcel = (file: File): Promise<ImportData> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          
          let excellences: any[] = [];
          let experiences: any[] = [];

          // Chercher les feuilles "excellences" et "experiences"
          if (workbook.SheetNames.includes('excellences')) {
            const excellencesSheet = workbook.Sheets['excellences'];
            const excellencesData = XLSX.utils.sheet_to_json(excellencesSheet);
            excellences = excellencesData.map((row: any) => ({
              name: row.name || '',
              description: row.description || '',
              category: row.category || 'manifestee'
            }));
          }

          if (workbook.SheetNames.includes('experiences')) {
            const experiencesSheet = workbook.Sheets['experiences'];
            const experiencesData = XLSX.utils.sheet_to_json(experiencesSheet);
            experiences = experiencesData.map((row: any) => ({
              excellence_id: row.excellence_id || '',
              title: row.title || '',
              description: row.description || '',
              date_experienced: row.date_experienced || new Date().toISOString().split('T')[0],
              tags: row.tags ? row.tags.split(',').map((tag: string) => tag.trim()) : [],
              image_url: row.image_url || null,
              image_caption: row.image_caption || null
            }));
          }

          // Si pas de feuilles spécifiques, utiliser la première feuille
          if (excellences.length === 0 && experiences.length === 0 && workbook.SheetNames.length > 0) {
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const firstSheetData = XLSX.utils.sheet_to_json(firstSheet);
            
            if (firstSheetData.length > 0) {
              const firstRow = firstSheetData[0] as any;
              if ('name' in firstRow && 'category' in firstRow) {
                excellences = firstSheetData.map((row: any) => ({
                  name: row.name || '',
                  description: row.description || '',
                  category: row.category || 'manifestee'
                }));
              }
            }
          }

          resolve({ excellences, experiences });
        } catch (error) {
          reject(new Error(`Erreur lors du parsing Excel: ${error instanceof Error ? error.message : 'Erreur inconnue'}`));
        }
      };
      reader.onerror = () => reject(new Error('Erreur lors de la lecture du fichier Excel'));
      reader.readAsArrayBuffer(file);
    });
  };

  const parseMarkdown = (content: string): ImportData => {
    const lines = content.split('\n');
    const excellences: any[] = [];
    const experiences: any[] = [];

    let currentSection = '';
    let currentItem: any = {};

    for (const line of lines) {
      const trimmedLine = line.trim();
      
      if (trimmedLine.startsWith('# ')) {
        currentSection = trimmedLine.substring(2).toLowerCase();
        continue;
      }

      if (trimmedLine.startsWith('## ')) {
        // Nouveau item
        if (Object.keys(currentItem).length > 0) {
          if (currentSection.includes('excellence')) {
            excellences.push(currentItem);
          } else if (currentSection.includes('experience')) {
            experiences.push(currentItem);
          }
        }
        currentItem = { name: trimmedLine.substring(3), title: trimmedLine.substring(3) };
        continue;
      }

      if (trimmedLine.startsWith('**Description:**')) {
        currentItem.description = trimmedLine.substring(16).trim();
      } else if (trimmedLine.startsWith('**Catégorie:**')) {
        currentItem.category = trimmedLine.substring(14).trim();
      } else if (trimmedLine.startsWith('**Date:**')) {
        currentItem.date_experienced = trimmedLine.substring(9).trim();
      } else if (trimmedLine.startsWith('**Tags:**')) {
        const tagsStr = trimmedLine.substring(9).trim();
        currentItem.tags = tagsStr.split(',').map(tag => tag.trim());
      }
    }

    // Ajouter le dernier item
    if (Object.keys(currentItem).length > 0) {
      if (currentSection.includes('excellence')) {
        excellences.push(currentItem);
      } else if (currentSection.includes('experience')) {
        experiences.push(currentItem);
      }
    }

    return { excellences, experiences };
  };

  const parseFileContent = async (file: File): Promise<ImportData> => {
    const format = getFileFormat(file);
    
    switch (format) {
      case 'json':
        const jsonContent = await file.text();
        return JSON.parse(jsonContent);
      
      case 'csv':
        const csvContent = await file.text();
        return await parseCSV(csvContent);
      
      case 'xlsx':
        return await parseExcel(file);
      
      case 'md':
        const mdContent = await file.text();
        return parseMarkdown(mdContent);
      
      default:
        throw new Error('Format de fichier non supporté');
    }
  };

  const validateData = (data: any): data is ImportData => {
    if (!data || typeof data !== 'object') return false;
    
    if (data.excellences && !Array.isArray(data.excellences)) return false;
    if (data.experiences && !Array.isArray(data.experiences)) return false;
    
    return true;
  };

  const handleImport = async () => {
    if (!file || !user) return;

    setIsImporting(true);
    setImportStatus({ type: 'info', message: 'Importation en cours...' });

    try {
      const data = await parseFileContent(file);

      if (!validateData(data)) {
        throw new Error('Format de données invalide. Le fichier doit contenir des excellences et/ou des expériences.');
      }

      let importedExcellences = 0;
      let importedExperiences = 0;

      // Import excellences
      if (data.excellences && data.excellences.length > 0) {
        const excellencesToImport = data.excellences.map((excellence: any) => ({
          user_id: user.id,
          name: excellence.name,
          description: excellence.description || '',
          category: excellence.category
        }));

        const { error: excellencesError } = await supabase
          .from('excellences')
          .insert(excellencesToImport);

        if (excellencesError) {
          throw new Error(`Erreur lors de l'importation des excellences: ${excellencesError.message}`);
        }

        importedExcellences = excellencesToImport.length;
      }

      // Import experiences
      if (data.experiences && data.experiences.length > 0) {
        const experiencesToImport = data.experiences.map((experience: any) => ({
          user_id: user.id,
          excellence_id: experience.excellence_id,
          title: experience.title,
          description: experience.description || '',
          date_experienced: experience.date_experienced,
          tags: experience.tags || [],
          image_url: experience.image_url || null,
          image_caption: experience.image_caption || null
        }));

        const { error: experiencesError } = await supabase
          .from('experiences')
          .insert(experiencesToImport);

        if (experiencesError) {
          throw new Error(`Erreur lors de l'importation des expériences: ${experiencesError.message}`);
        }

        importedExperiences = experiencesToImport.length;
      }

      setImportStatus({
        type: 'success',
        message: `Importation réussie ! ${importedExcellences} excellences et ${importedExperiences} expériences importées.`
      });

      if (onImportComplete) {
        onImportComplete();
      }

      // Close modal after a short delay
      setTimeout(() => {
        onClose();
      }, 2000);

    } catch (error) {
      console.error('Erreur lors de l\'importation:', error);
      setImportStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Erreur lors de l\'importation des données.'
      });
    } finally {
      setIsImporting(false);
    }
  };

  const handleClose = () => {
    if (!isImporting) {
      setFile(null);
      setImportStatus({ type: null, message: '' });
      onClose();
    }
  };

  const getFileFormatLabel = (file: File): string => {
    const format = getFileFormat(file);
    switch (format) {
      case 'json': return 'JSON';
      case 'csv': return 'CSV';
      case 'xlsx': return 'Excel';
      case 'md': return 'Markdown';
      default: return 'Inconnu';
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50" 
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div 
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
      >
        <div 
          className="w-full max-w-md border rounded-lg shadow-xl"
          style={{
            backgroundColor: 'var(--bg-secondary)',
            borderColor: 'var(--border-subtle)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div 
            className="flex items-center justify-between p-4 border-b"
            style={{ borderColor: 'var(--border-subtle)' }}
          >
            <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
              Importer des données
            </h2>
            <button
              onClick={handleClose}
              disabled={isImporting}
              className="p-1 rounded-md transition-colors"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 space-y-4">
            <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Sélectionnez un fichier contenant vos excellences et expériences.
              <br />
              <strong>Formats supportés :</strong> JSON, CSV, Excel (.xlsx/.xls), Markdown (.md)
            </div>

            {/* File Input */}
            <div>
              <label 
                htmlFor="file-input"
                className={`
                  flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors
                  ${file ? 'border-green-400 bg-green-50/10' : 'border-gray-300'}
                  ${isImporting ? 'pointer-events-none opacity-50' : 'hover:bg-gray-50/5'}
                `}
                style={{ borderColor: file ? '#10b981' : 'var(--border-subtle)' }}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {file ? (
                    <>
                      <FileText className="w-8 h-8 mb-2 text-green-400" />
                      <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                        {file.name}
                      </p>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        {(file.size / 1024).toFixed(1)} KB • {getFileFormatLabel(file)}
                      </p>
                    </>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 mb-2" style={{ color: 'var(--text-muted)' }} />
                      <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
                        Cliquez pour sélectionner un fichier
                      </p>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        JSON, CSV, Excel ou Markdown
                      </p>
                    </>
                  )}
                </div>
                <input
                  id="file-input"
                  type="file"
                  accept={getSupportedFormats().join(',')}
                  className="hidden"
                  onChange={handleFileSelect}
                  disabled={isImporting}
                />
              </label>
            </div>

            {/* Status Message */}
            {importStatus.type && (
              <div 
                className={`
                  flex items-center space-x-2 p-3 rounded-md text-sm
                  ${importStatus.type === 'success' ? 'bg-green-50/10 text-green-400' : ''}
                  ${importStatus.type === 'error' ? 'bg-red-50/10 text-red-400' : ''}
                  ${importStatus.type === 'info' ? 'bg-blue-50/10 text-blue-400' : ''}
                `}
              >
                <AlertCircle size={16} />
                <span>{importStatus.message}</span>
              </div>
            )}
          </div>

          {/* Footer */}
          <div 
            className="flex justify-end space-x-3 p-4 border-t"
            style={{ borderColor: 'var(--border-subtle)' }}
          >
            <button
              onClick={handleClose}
              disabled={isImporting}
              className="px-4 py-2 text-sm rounded-md transition-colors"
              style={{ 
                color: 'var(--text-muted)',
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              Annuler
            </button>
            <button
              onClick={handleImport}
              disabled={!file || isImporting}
              className={`
                px-4 py-2 text-sm font-medium rounded-md transition-colors
                ${!file || isImporting 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:opacity-90'
                }
              `}
              style={{
                backgroundColor: '#0195ee',
                color: 'white'
              }}
            >
              {isImporting ? 'Importation...' : 'Importer'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
