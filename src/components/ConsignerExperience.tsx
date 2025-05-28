
import React, { useState } from 'react';
import { ExperiencePageLayout } from './ExperiencePageLayout';
import { ExperienceHeader } from './ExperienceHeader';
import { ConsignerForm } from './ConsignerForm';
import { ConfirmationModal } from './ConfirmationModal';
import { ToastNotification } from './ToastNotification';
import { useExcellences } from '../hooks/useExcellences';
import { useExperiences } from '../hooks/useExperiences';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { useToastNotification } from '../hooks/useToastNotification';

interface ConsignerExperienceProps {
  onModeChange: (mode: 'explorer' | 'consigner') => void;
}

export const ConsignerExperience: React.FC<ConsignerExperienceProps> = ({ onModeChange }) => {
  const { excellences } = useExcellences();
  const { addExperience } = useExperiences();
  const { toasts, showSuccess, showError, hideToast } = useToastNotification();
  
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (experienceData: any) => {
    setIsSaving(true);
    try {
      await addExperience(experienceData);
      setHasUnsavedChanges(false);
      showSuccess('Expérience enregistrée avec succès');
      
      // Délai pour voir le message de succès avant redirection
      setTimeout(() => {
        onModeChange('explorer');
      }, 1000);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      showError('Erreur lors de la sauvegarde');
    } finally {
      setIsSaving(false);
    }
  };

  const handleFormChange = () => {
    if (!hasUnsavedChanges) {
      setHasUnsavedChanges(true);
    }
  };

  const handleBackRequest = () => {
    if (hasUnsavedChanges) {
      setShowExitConfirmation(true);
    } else {
      onModeChange('explorer');
    }
  };

  const handleExitConfirm = () => {
    setHasUnsavedChanges(false);
    setShowExitConfirmation(false);
    onModeChange('explorer');
  };

  const handleExitCancel = () => {
    setShowExitConfirmation(false);
  };

  // Raccourcis clavier
  useKeyboardShortcuts({
    onEscape: () => handleBackRequest(),
    onSave: () => {
      // TODO: Trigger form submission
      console.log('Save shortcut triggered');
    }
  });

  return (
    <>
      <ExperiencePageLayout>
        <ExperienceHeader 
          mode="consigner" 
          onModeChange={handleBackRequest}
        />
        
        <div className="relative">
          {isSaving && (
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center z-10 rounded-lg">
              <div 
                className="px-4 py-2 rounded-lg flex items-center gap-2"
                style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
              >
                <div className="w-4 h-4 border-2 border-current border-r-transparent rounded-full animate-spin"></div>
                <span className="text-sm">Enregistrement...</span>
              </div>
            </div>
          )}
          
          <ConsignerForm
            excellences={excellences}
            onSave={handleSave}
            onCancel={handleBackRequest}
            onChange={handleFormChange}
            disabled={isSaving}
          />
        </div>
      </ExperiencePageLayout>

      {/* Modal de confirmation de sortie */}
      <ConfirmationModal
        isOpen={showExitConfirmation}
        title="Quitter sans sauvegarder ?"
        message="Vous avez des modifications non sauvegardées. Souhaitez-vous vraiment quitter ?"
        confirmText="Quitter"
        cancelText="Continuer l'édition"
        variant="warning"
        onConfirm={handleExitConfirm}
        onCancel={handleExitCancel}
      />

      {/* Notifications toast */}
      {toasts.map((toast) => (
        <ToastNotification
          key={toast.id}
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={() => hideToast(toast.id)}
        />
      ))}
    </>
  );
};
