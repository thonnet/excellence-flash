
import React, { useRef } from 'react';
import { Download, Upload } from 'lucide-react';
import { Excellence, Experience } from '../types';
import { exportToCSV, exportToMarkdown, importFromCSV } from '../utils/dataUtils';

interface DataImportExportProps {
  excellences: Excellence[];
  experiences: Experience[];
  onImportData: (excellences: Excellence[], experiences: Experience[]) => void;
}

export const DataImportExport: React.FC<DataImportExportProps> = ({
  excellences,
  experiences,
  onImportData
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExportCSV = () => {
    exportToCSV(excellences, experiences);
  };

  const handleExportMarkdown = () => {
    exportToMarkdown(excellences, experiences);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const { excellences: importedExcellences, experiences: importedExperiences } = await importFromCSV(file);
      onImportData(importedExcellences, importedExperiences);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Erreur lors de l\'import:', error);
      alert('Erreur lors de l\'import du fichier. Vérifiez le format.');
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Import Button */}
      <button
        onClick={handleImportClick}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors text-sm"
        style={{
          backgroundColor: 'var(--bg-tertiary)',
          color: 'var(--text-secondary)',
          border: '1px solid var(--border-subtle)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
        }}
        title="Importer des données CSV"
      >
        <Upload size={16} />
        <span>Importer</span>
      </button>

      {/* Export Dropdown */}
      <div className="relative group">
        <button
          className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors text-sm"
          style={{
            backgroundColor: 'var(--bg-tertiary)',
            color: 'var(--text-secondary)',
            border: '1px solid var(--border-subtle)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
          }}
          title="Exporter des données"
        >
          <Download size={16} />
          <span>Exporter</span>
        </button>

        {/* Dropdown Menu */}
        <div 
          className="absolute right-0 mt-1 w-48 rounded-lg border shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
          style={{
            backgroundColor: 'var(--bg-secondary)',
            borderColor: 'var(--border-subtle)'
          }}
        >
          <button
            onClick={handleExportCSV}
            className="w-full text-left px-4 py-2 text-sm rounded-t-lg transition-colors"
            style={{ color: 'var(--text-primary)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Exporter en CSV
          </button>
          <button
            onClick={handleExportMarkdown}
            className="w-full text-left px-4 py-2 text-sm rounded-b-lg transition-colors"
            style={{ color: 'var(--text-primary)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Exporter en Markdown
          </button>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};
