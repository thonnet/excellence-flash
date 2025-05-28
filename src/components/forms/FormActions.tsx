
import React from 'react';

interface FormActionsProps {
  onSubmit: () => void;
  onClose: () => void;
  isValid: boolean;
  submitText?: string;
  cancelText?: string;
}

export const FormActions: React.FC<FormActionsProps> = ({
  onSubmit,
  onClose,
  isValid,
  submitText = "Créer l'expérience",
  cancelText = "Annuler"
}) => {
  return (
    <div className="flex justify-end space-x-3 pt-4">
      <button
        type="button"
        onClick={onClose}
        className="btn-secondary"
      >
        {cancelText}
      </button>
      <button
        type="button"
        onClick={onSubmit}
        disabled={!isValid}
        className="btn-primary"
        style={{ opacity: !isValid ? 0.5 : 1, cursor: !isValid ? 'not-allowed' : 'pointer' }}
      >
        {submitText}
      </button>
    </div>
  );
};
