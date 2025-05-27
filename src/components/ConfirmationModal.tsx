
import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: 'danger' | 'warning' | 'info';
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirmer',
  cancelText = 'Annuler',
  onConfirm,
  onCancel,
  variant = 'warning'
}) => {
  if (!isOpen) return null;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onCancel();
    if (e.key === 'Enter') onConfirm();
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
      onClick={onCancel}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div
        className="max-w-md w-full rounded-lg p-6"
        style={{ backgroundColor: 'var(--bg-secondary)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <AlertTriangle 
              size={24}
              style={{ color: variant === 'danger' ? '#ee5a01' : 'var(--text-muted)' }}
            />
          </div>
          
          <div className="flex-1">
            <h3 
              className="text-lg font-semibold mb-2"
              style={{ color: 'var(--text-primary)' }}
            >
              {title}
            </h3>
            <p 
              className="text-sm mb-6"
              style={{ color: 'var(--text-secondary)' }}
            >
              {message}
            </p>
            
            <div className="flex gap-3 justify-end">
              <button
                onClick={onCancel}
                className="px-4 py-2 text-sm rounded-lg border transition-colors"
                style={{
                  backgroundColor: 'transparent',
                  borderColor: 'var(--border-medium)',
                  color: 'var(--text-secondary)'
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.backgroundColor = 'var(--bg-hover)';
                  (e.target as HTMLElement).style.borderColor = 'var(--border-medium)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.backgroundColor = 'transparent';
                  (e.target as HTMLElement).style.borderColor = 'var(--border-medium)';
                }}
              >
                {cancelText}
              </button>
              
              <button
                onClick={onConfirm}
                className="px-4 py-2 text-sm rounded-lg transition-colors"
                style={{
                  backgroundColor: variant === 'danger' ? '#ee5a01' : 'var(--bg-hover)',
                  color: variant === 'danger' ? 'white' : 'var(--text-primary)',
                  border: 'none'
                }}
                onMouseEnter={(e) => {
                  if (variant === 'danger') {
                    (e.target as HTMLElement).style.backgroundColor = '#d64f01';
                  } else {
                    (e.target as HTMLElement).style.backgroundColor = 'var(--bg-light)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (variant === 'danger') {
                    (e.target as HTMLElement).style.backgroundColor = '#ee5a01';
                  } else {
                    (e.target as HTMLElement).style.backgroundColor = 'var(--bg-hover)';
                  }
                }}
              >
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
