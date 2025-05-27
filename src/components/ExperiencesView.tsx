
import React from 'react';
import { ExperiencesDisplay } from './ExperiencesDisplay';
import { ViewToggle } from './ViewToggle';
import { ContextualHelp } from './ContextualHelp';
import { AlternatingBaseline } from './AlternatingBaseline';
import { Excellence, Experience } from '../types';
import { Plus } from 'lucide-react';

type ExperienceViewMode = 'list' | 'gallery';

interface ExperiencesViewProps {
  experiences: Experience[];
  excellences: Excellence[];
  viewMode: ExperienceViewMode;
  onViewModeChange: (mode: ExperienceViewMode) => void;
  onOpenExperienceForm: () => void;
}

export const ExperiencesView: React.FC<ExperiencesViewProps> = ({
  experiences,
  excellences,
  viewMode,
  onViewModeChange,
  onOpenExperienceForm,
}) => {
  const experiencesBaselines = [
    "Transformez vos expériences en carburant d'excellence",
    "Conscientisez la valeur de ce que vous accomplissez naturellement",
    "Connectez vos expériences aux excellences qu'elles révèlent",
    "Donnez du sens et de la valeur à ce que vous vivez",
    "Développez votre autorité intrinsèque par la présence à ce que vous faites"
  ];

  return (
    <div className="space-y-6">
      <div className="page-header">
        <div className="title-section">
          <div className="flex items-center space-x-4">
            <h2 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Vos Expériences</h2>
            <ContextualHelp pageType="experiences" />
          </div>
          <div className="mt-1 h-6">
            <AlternatingBaseline baselines={experiencesBaselines} />
          </div>
        </div>
        <div className="view-controls">
          <ViewToggle
            currentView={viewMode}
            onViewChange={(view) => onViewModeChange(view as ExperienceViewMode)}
            availableViews={['list', 'gallery']}
          />
          <button 
            onClick={onOpenExperienceForm}
            className="flex items-center space-x-2 px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors ml-4"
            style={{ backgroundColor: 'var(--accent-orange)' }}
          >
            <Plus size={16} />
            <span>Nouvelle expérience</span>
          </button>
        </div>
      </div>
      
      <ExperiencesDisplay
        experiences={experiences}
        excellences={excellences}
        viewMode={viewMode}
      />
    </div>
  );
};
