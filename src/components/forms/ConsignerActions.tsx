
import React from 'react';

interface ConsignerActionsProps {
  isFormValid: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

export const ConsignerActions: React.FC<ConsignerActionsProps> = ({
  isFormValid,
  onSubmit,
  onCancel
}) => {
  return (
    <section className="text-center py-8 border-t" style={{ borderColor: '#333' }}>
      <button
        onClick={onSubmit}
        disabled={!isFormValid}
        className="px-8 py-4 rounded-lg text-lg font-semibold mr-4 transition-colors"
        style={{
          backgroundColor: isFormValid ? '#ee5a01' : '#555',
          color: isFormValid ? 'white' : '#999',
          cursor: isFormValid ? 'pointer' : 'not-allowed'
        }}
        onMouseEnter={(e) => {
          if (isFormValid) (e.target as HTMLButtonElement).style.backgroundColor = '#d44f01';
        }}
        onMouseLeave={(e) => {
          if (isFormValid) (e.target as HTMLButtonElement).style.backgroundColor = '#ee5a01';
        }}
      >
        💾 Enregistrer l'expérience
      </button>

      <button
        onClick={onCancel}
        className="px-8 py-4 rounded-lg border-2 transition-colors"
        style={{
          backgroundColor: 'transparent',
          borderColor: '#555',
          color: '#999'
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLButtonElement).style.borderColor = '#999';
          (e.target as HTMLButtonElement).style.color = 'white';
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLButtonElement).style.borderColor = '#555';
          (e.target as HTMLButtonElement).style.color = '#999';
        }}
      >
        ❌ Annuler
      </button>
    </section>
  );
};
