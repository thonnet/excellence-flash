
import React from 'react';
import { Upload, FileText } from 'lucide-react';
import { getSupportedFormats, getFileFormatLabel } from '../utils/fileParser';

interface ImportFileInputProps {
  file: File | null;
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isImporting: boolean;
}

export const ImportFileInput: React.FC<ImportFileInputProps> = ({
  file,
  onFileSelect,
  isImporting
}) => {
  return (
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
          onChange={onFileSelect}
          disabled={isImporting}
        />
      </label>
    </div>
  );
};
