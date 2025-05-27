
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { ImportStatus } from '../types/import';

interface ImportStatusMessageProps {
  status: ImportStatus;
}

export const ImportStatusMessage: React.FC<ImportStatusMessageProps> = ({ status }) => {
  if (!status.type) return null;

  return (
    <div 
      className={`
        flex items-center space-x-2 p-3 rounded-md text-sm
        ${status.type === 'success' ? 'bg-green-50/10 text-green-400' : ''}
        ${status.type === 'error' ? 'bg-red-50/10 text-red-400' : ''}
        ${status.type === 'info' ? 'bg-blue-50/10 text-blue-400' : ''}
      `}
    >
      <AlertCircle size={16} />
      <span>{status.message}</span>
    </div>
  );
};
