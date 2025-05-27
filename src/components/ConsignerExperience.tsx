
import React, { useState, useEffect, useRef } from 'react';
import { ExperiencePageLayout } from './ExperiencePageLayout';
import { ExperienceHeader } from './ExperienceHeader';
import { ConsignerForm } from './ConsignerForm';
import { LoadingSpinner } from './LoadingSpinner';
import { useExcellences } from '../hooks/useExcellences';
import { useExperiences } from '../hooks/useExperiences';
import { KeyboardShortcuts } from '../utils/keyboardShortcuts';

interface ConsignerExperienceProps {
  onModeChange: (mode: 'explorer' | 'consigner') => void;
}

export const ConsignerExperience: React.FC<ConsignerExperienceProps> = ({ onModeChange }) => {
  const { excellences, isLoading: excellencesLoading } = useExcellences();
  const { addExperience } = useExperiences();
  
  const [isSaving, setIsSaving] = useState(false);
  const [canSave, setCanSave] = useState(false);
  
  // Refs pour focus management
  const pageRef = useRef<HTMLDivElement>(null);
  const keyboardShortcuts = useRef<KeyboardShortcuts | null>(null);

  // Fonction de sauvegarde référencée pour les raccourcis
  const handleSaveRef = useRef<(() => void) | null>(null);

  const handleSave = async (experienceData: any) => {
    if (isSaving) return;
    
    setIsSaving(true);
    try {
      await addExperience(experienceData);
      onModeChange('explorer');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    onModeChange('explorer');
  };

  // Initialisation raccourcis clavier
  useEffect(() => {
    keyboardShortcuts.current = new KeyboardShortcuts({
      currentMode: 'consigner',
      isModalOpen: false,
      canSave,
      onNavigateToConsigner: () => {},
      onNavigateToExplorer: () => onModeChange('explorer'),
      onSave: () => {
        if (handleSaveRef.current && canSave && !isSaving) {
          handleSaveRef.current();
        }
      },
      onCloseModal: () => {}
    });

    keyboardShortcuts.current.activate();

    return () => {
      keyboardShortcuts.current?.deactivate();
    };
  }, [onModeChange, canSave, isSaving]);

  // Mise à jour du contexte des raccourcis
  useEffect(() => {
    keyboardShortcuts.current?.updateContext({
      canSave,
    });
  }, [canSave]);

  // Focus sur le titre au montage
  useEffect(() => {
    const timer = setTimeout(() => {
      const titleInput = document.querySelector('input[placeholder*="titre"]') as HTMLInputElement;
      if (titleInput) {
        titleInput.focus();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (excellencesLoading) {
    return (
      <ExperiencePageLayout>
        <ExperienceHeader mode="consigner" onModeChange={onModeChange} />
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="large" />
          <span className="ml-3" style={{ color: 'var(--text-secondary)' }}>
            Chargement des excellences...
          </span>
        </div>
      </ExperiencePageLayout>
    );
  }

  return (
    <ExperiencePageLayout>
      <div ref={pageRef} className="fade-in">
        <ExperienceHeader mode="consigner" onModeChange={onModeChange} />
        
        <ConsignerForm
          excellences={excellences}
          onSave={handleSave}
          onCancel={handleCancel}
          disabled={isSaving}
          onValidityChange={setCanSave}
          onSaveRef={(saveFunction) => {
            handleSaveRef.current = saveFunction;
          }}
        />

        {isSaving && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div 
              className="bg-white rounded-lg p-6 flex items-center space-x-3"
              style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
            >
              <LoadingSpinner />
              <span>Enregistrement en cours...</span>
            </div>
          </div>
        )}
      </div>
    </ExperiencePageLayout>
  );
};
