
import React, { useState } from 'react';
import { X, Upload, FileText, AlertCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../integrations/supabase/client';
import { Excellence, Experience } from '../types';

interface ImportDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportComplete?: () => void;
}

interface ImportData {
  excellences?: Excellence[];
  experiences?: Experience[];
}

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

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === 'application/json') {
        setFile(selectedFile);
        setImportStatus({ type: null, message: '' });
      } else {
        setImportStatus({
          type: 'error',
          message: 'Veuillez sélectionner un fichier JSON valide.'
        });
      }
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
      const fileContent = await file.text();
      const data = JSON.parse(fileContent);

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
              Sélectionnez un fichier JSON contenant vos excellences et expériences.
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
                        {(file.size / 1024).toFixed(1)} KB
                      </p>
                    </>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 mb-2" style={{ color: 'var(--text-muted)' }} />
                      <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
                        Cliquez pour sélectionner un fichier
                      </p>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        JSON uniquement
                      </p>
                    </>
                  )}
                </div>
                <input
                  id="file-input"
                  type="file"
                  accept=".json"
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
