
import React from 'react';
import { X } from 'lucide-react';

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
        className="px-4 py-2 border rounded-lg hover:opacity-80 transition-colors"
        style={{
          borderColor: 'var(--border-medium)',
          color: 'var(--text-secondary)'
        }}
      >
        {cancelText}
      </button>
      <button
        type="button"
        onClick={onSubmit}
        disabled={!isValid}
        className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ backgroundColor: 'var(--accent-orange)' }}
      >
        {submitText}
      </button>
    </div>
  );
};
