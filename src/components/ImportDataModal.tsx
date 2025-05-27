
import React, { useState } from 'react';
import { X, HelpCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { ImportData, ImportStatus } from '../types/import';
import { parseFileContent, validateData, getFileFormat } from '../utils/fileParser';
import { importDataToSupabase } from '../services/importService';
import { ImportFileInput } from './ImportFileInput';
import { ImportStatusMessage } from './ImportStatusMessage';

interface ImportDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportComplete?: () => void;
  onShowHelp?: () => void;
}

export const ImportDataModal: React.FC<ImportDataModalProps> = ({
  isOpen,
  onClose,
  onImportComplete,
  onShowHelp
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [importStatus, setImportStatus] = useState<ImportStatus>({ type: null, message: '' });
  const { user } = useAuth();

  if (!isOpen) return null;

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

  const handleImport = async () => {
    if (!file || !user) return;

    setIsImporting(true);
    setImportStatus({ type: 'info', message: 'Importation en cours...' });

    try {
      const data: ImportData = await parseFileContent(file);

      if (!validateData(data)) {
        throw new Error('Format de données invalide. Le fichier doit contenir des excellences et/ou des expériences.');
      }

      const { importedExcellences, importedExperiences } = await importDataToSupabase(data, user.id);

      setImportStatus({
        type: 'success',
        message: `Importation réussie ! ${importedExcellences} excellences et ${importedExperiences} expériences importées.`
      });

      if (onImportComplete) {
        onImportComplete();
      }

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

  const handleShowHelp = () => {
    if (onShowHelp) {
      onShowHelp();
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
            <div className="flex items-center space-x-2">
              {onShowHelp && (
                <button
                  onClick={handleShowHelp}
                  disabled={isImporting}
                  className="p-1 rounded-md transition-colors"
                  style={{ color: 'var(--text-muted)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                  title="Guide d'importation"
                >
                  <HelpCircle size={20} />
                </button>
              )}
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
          </div>

          {/* Content */}
          <div className="p-4 space-y-4">
            <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Sélectionnez un fichier contenant vos excellences et expériences.
              <br />
              <strong>Formats supportés :</strong> JSON, CSV, Excel (.xlsx/.xls), Markdown (.md)
              {onShowHelp && (
                <>
                  <br />
                  <button
                    onClick={handleShowHelp}
                    className="text-blue-500 hover:text-blue-400 underline mt-1 inline-block"
                  >
                    Voir le guide de formatage des données
                  </button>
                </>
              )}
            </div>

            <ImportFileInput
              file={file}
              onFileSelect={handleFileSelect}
              isImporting={isImporting}
            />

            <ImportStatusMessage status={importStatus} />
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
