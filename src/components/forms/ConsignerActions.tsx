
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
    <section className="text-center py-8 border-t" style={{ borderColor: '#333' }}>
      <button
        onClick={onSubmit}
        disabled={!canSubmit}
        className="px-8 py-4 rounded-lg text-lg font-semibold mr-4 transition-colors"
        style={{
          backgroundColor: canSubmit ? '#ee5a01' : '#555',
          color: canSubmit ? 'white' : '#999',
          cursor: canSubmit ? 'pointer' : 'not-allowed'
        }}
        onMouseEnter={(e) => {
          if (canSubmit) (e.target as HTMLButtonElement).style.backgroundColor = '#d44f01';
        }}
        onMouseLeave={(e) => {
          if (canSubmit) (e.target as HTMLButtonElement).style.backgroundColor = '#ee5a01';
        }}
      >
        💾 Enregistrer l'expérience
      </button>

      <button
        onClick={onCancel}
        disabled={disabled}
        className="px-8 py-4 rounded-lg border-2 transition-colors"
        style={{
          backgroundColor: 'transparent',
          borderColor: disabled ? '#333' : '#555',
          color: disabled ? '#666' : '#999',
          cursor: disabled ? 'not-allowed' : 'pointer'
        }}
        onMouseEnter={(e) => {
          if (!disabled) {
            (e.target as HTMLButtonElement).style.borderColor = '#999';
            (e.target as HTMLButtonElement).style.color = 'white';
          }
        }}
        onMouseLeave={(e) => {
          if (!disabled) {
            (e.target as HTMLButtonElement).style.borderColor = '#555';
            (e.target as HTMLButtonElement).style.color = '#999';
          }
        }}
      >
        ❌ Annuler
      </button>
    </section>
  );
};
