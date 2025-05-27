
import React from 'react';

interface ConsignerActionsProps {
  isFormValid: boolean;
  onSubmit: () => void;
  onCancel: () => void;
  disabled?: boolean;
}

export const ConsignerActions: React.FC<ConsignerActionsProps> = ({
  isFormValid,
  onSubmit,
  onCancel,
  disabled = false
}) => {
  const canSubmit = isFormValid && !disabled;

  return (
    <section 
      className="text-center py-8 border-t transition-opacity" 
      style={{ 
        borderColor: 'var(--border-subtle)',
        opacity: disabled ? 0.7 : 1
      }}
    >
      <button
        onClick={onSubmit}
        disabled={!canSubmit}
        className="px-8 py-4 rounded-lg text-lg font-semibold mr-4 transition-all duration-200 disabled:cursor-not-allowed"
        style={{
          backgroundColor: canSubmit ? '#ee5a01' : 'var(--bg-hover)',
          color: canSubmit ? 'white' : 'var(--text-muted)',
          transform: disabled ? 'none' : 'scale(1)',
        }}
        onMouseEnter={(e) => {
          if (canSubmit) {
            (e.target as HTMLButtonElement).style.backgroundColor = '#d44f01';
            (e.target as HTMLButtonElement).style.transform = 'translateY(-1px)';
          }
        }}
        onMouseLeave={(e) => {
          if (canSubmit) {
            (e.target as HTMLButtonElement).style.backgroundColor = '#ee5a01';
            (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
          }
        }}
      >
        💾 Enregistrer l'expérience
      </button>

      <button
        onClick={onCancel}
        disabled={disabled}
        className="px-8 py-4 rounded-lg border-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          backgroundColor: 'transparent',
          borderColor: 'var(--border-medium)',
          color: 'var(--text-secondary)'
        }}
        onMouseEnter={(e) => {
          if (!disabled) {
            (e.target as HTMLButtonElement).style.borderColor = 'var(--text-secondary)';
            (e.target as HTMLButtonElement).style.color = 'var(--text-primary)';
            (e.target as HTMLButtonElement).style.transform = 'translateY(-1px)';
          }
        }}
        onMouseLeave={(e) => {
          if (!disabled) {
            (e.target as HTMLButtonElement).style.borderColor = 'var(--border-medium)';
            (e.target as HTMLButtonElement).style.color = 'var(--text-secondary)';
            (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
          }
        }}
      >
        ❌ Annuler
      </button>
    </section>
  );
};
