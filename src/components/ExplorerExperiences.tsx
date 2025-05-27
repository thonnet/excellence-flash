
import React from 'react';
import { ExperiencePageLayout } from './ExperiencePageLayout';
import { ExperienceHeader } from './ExperienceHeader';

interface ExplorerExperiencesProps {
  onModeChange: (mode: 'explorer' | 'consigner') => void;
}

export const ExplorerExperiences: React.FC<ExplorerExperiencesProps> = ({ onModeChange }) => {
  return (
    <ExperiencePageLayout>
      <ExperienceHeader mode="explorer" onModeChange={onModeChange} />
      
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-6xl opacity-30">📋</div>
          <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
            Interface Explorer en cours de développement
          </h3>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            Filtres et affichage des expériences à implémenter dans le prompt 2
          </p>
        </div>
      </div>
    </ExperiencePageLayout>
  );
};
