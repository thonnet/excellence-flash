
import React from 'react';
import { KanbanView } from './KanbanView';
import { ListView } from './ListView';
import { Observatoire } from './Observatoire';
import { ExperiencesView } from './ExperiencesView';
import { Excellence, Experience, User } from '../types';

type ViewType = 'kanban' | 'list' | 'observatoire' | 'experiences';
type ExperienceViewMode = 'list' | 'gallery';

interface MainContentProps {
  currentView: ViewType;
  experienceViewMode: ExperienceViewMode;
  onExperienceViewModeChange: (mode: ExperienceViewMode) => void;
  excellences: Excellence[];
  experiences: Experience[];
  user: User;
  onAddExcellence: (excellence: Omit<Excellence, 'id' | 'created_at' | 'updated_at'>) => void;
  onUpdateExcellence: (id: string, updates: Partial<Excellence>) => void;
  onDeleteExcellence: (id: string) => void;
  onAddExperience: (experience: Omit<Experience, 'id' | 'created_at' | 'updated_at'>) => void;
  getExperienceCount: (excellenceId: string) => number;
  onOpenExperienceForm: () => void;
}

export const MainContent: React.FC<MainContentProps> = ({
  currentView,
  experienceViewMode,
  onExperienceViewModeChange,
  excellences,
  experiences,
  user,
  onAddExcellence,
  onUpdateExcellence,
  onDeleteExcellence,
  onAddExperience,
  getExperienceCount,
  onOpenExperienceForm,
}) => {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {currentView === 'observatoire' && (
        <Observatoire 
          excellences={excellences}
          experiences={experiences}
          user={user}
        />
      )}

      {currentView === 'kanban' && (
        <KanbanView
          excellences={excellences}
          experiences={experiences}
          onAddExcellence={onAddExcellence}
          onUpdateExcellence={onUpdateExcellence}
          onDeleteExcellence={onDeleteExcellence}
          getExperienceCount={getExperienceCount}
        />
      )}

      {currentView === 'list' && (
        <ListView
          excellences={excellences}
          experiences={experiences}
          onAddExcellence={onAddExcellence}
          onUpdateExcellence={onUpdateExcellence}
          onDeleteExcellence={onDeleteExcellence}
          getExperienceCount={getExperienceCount}
        />
      )}

      {currentView === 'experiences' && (
        <ExperiencesView
          experiences={experiences}
          excellences={excellences}
          viewMode={experienceViewMode}
          onViewModeChange={onExperienceViewModeChange}
          onOpenExperienceForm={onOpenExperienceForm}
        />
      )}
    </main>
  );
};
