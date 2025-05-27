
import React from 'react';
import { ExperiencePageLayout } from './ExperiencePageLayout';
import { ExperienceHeader } from './ExperienceHeader';

interface ConsignerExperienceProps {
  onModeChange: (mode: 'explorer' | 'consigner') => void;
}

export const ConsignerExperience: React.FC<ConsignerExperienceProps> = ({ onModeChange }) => {
  return (
    <ExperiencePageLayout>
      <ExperienceHeader mode="consigner" onModeChange={onModeChange} />
      
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-6xl opacity-30">⚡</div>
          <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
            Interface Consigner en cours de développement
          </h3>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            Formulaire de consignation à implémenter dans le prompt 3
          </p>
        </div>
      </div>
    </ExperiencePageLayout>
  );
};
