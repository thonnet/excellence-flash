
import React, { useState } from 'react';
import { ExperiencePageLayout } from './ExperiencePageLayout';
import { ExperienceHeader } from './ExperienceHeader';
import { ConsignerForm } from './ConsignerForm';
import { useExcellences } from '../hooks/useExcellences';
import { useExperiences } from '../hooks/useExperiences';

interface ConsignerExperienceProps {
  onModeChange: (mode: 'explorer' | 'consigner') => void;
}

export const ConsignerExperience: React.FC<ConsignerExperienceProps> = ({ onModeChange }) => {
  const { excellences } = useExcellences();
  const { addExperience } = useExperiences();

  const handleSave = async (experienceData: any) => {
    try {
      await addExperience(experienceData);
      onModeChange('explorer');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  const handleCancel = () => {
    onModeChange('explorer');
  };

  return (
    <ExperiencePageLayout>
      <ExperienceHeader mode="consigner" onModeChange={onModeChange} />
      
      <ConsignerForm
        excellences={excellences}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </ExperiencePageLayout>
  );
};
