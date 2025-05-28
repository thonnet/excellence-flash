
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
        className="btn-primary mr-4"
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          opacity: canSubmit ? 1 : 0.5,
          cursor: canSubmit ? 'pointer' : 'not-allowed'
        }}
      >
        💾 Enregistrer l'expérience
      </button>

      <button
        onClick={onCancel}
        disabled={disabled}
        className="btn-secondary"
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? 'not-allowed' : 'pointer'
        }}
      >
        ❌ Annuler
      </button>
    </section>
  );
};
