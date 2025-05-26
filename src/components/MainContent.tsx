
import React from 'react';
import { KanbanView } from './KanbanView';
import { ListView } from './ListView';
import { Observatoire } from './Observatoire';
import { ExperiencesDisplay } from './ExperiencesDisplay';
import type { Excellence, Experience } from '../types';
import type { UserDisplay } from '../types/userDisplay';

type ViewType = 'kanban' | 'list' | 'observatoire' | 'experiences';
type ExperienceViewMode = 'grid' | 'kanban';

interface MainContentProps {
  currentView: ViewType;
  experienceViewMode: ExperienceViewMode;
  setExperienceViewMode: (mode: ExperienceViewMode) => void;
  excellences: Excellence[];
  filteredExcellences: Excellence[];
  experiences: Experience[];
  user: UserDisplay;
  onAddExcellence: (excellence: Omit<Excellence, 'id' | 'created_at' | 'updated_at'>) => void;
  onUpdateExcellence: (id: string, updates: Partial<Excellence>) => void;
  onDeleteExcellence: (id: string) => void;
  getExperienceCount: (excellenceId: string) => number;
  setIsExperienceFormOpen: (open: boolean) => void;
  isAdminMode: boolean;
}

export const MainContent: React.FC<MainContentProps> = ({
  currentView,
  experienceViewMode,
  setExperienceViewMode,
  excellences,
  filteredExcellences,
  experiences,
  user,
  onAddExcellence,
  onUpdateExcellence,
  onDeleteExcellence,
  getExperienceCount,
  setIsExperienceFormOpen,
  isAdminMode,
}) => {
  switch (currentView) {
    case 'kanban':
      return (
        <KanbanView
          excellences={excellences}
          experiences={experiences}
          user={user}
          onAddExcellence={onAddExcellence}
          onUpdateExcellence={onUpdateExcellence}
          onDeleteExcellence={onDeleteExcellence}
          getExperienceCount={getExperienceCount}
          setIsExperienceFormOpen={setIsExperienceFormOpen}
          isAdminMode={isAdminMode}
        />
      );
    case 'list':
      return (
        <ListView
          excellences={excellences}
          experiences={experiences}
          user={user}
          onAddExcellence={onAddExcellence}
          onUpdateExcellence={onUpdateExcellence}
          onDeleteExcellence={onDeleteExcellence}
          getExperienceCount={getExperienceCount}
          setIsExperienceFormOpen={setIsExperienceFormOpen}
          isAdminMode={isAdminMode}
        />
      );
    case 'observatoire':
      return (
        <Observatoire
          excellences={filteredExcellences}
          experiences={experiences}
          user={user}
          onAddExcellence={onAddExcellence}
          onUpdateExcellence={onUpdateExcellence}
          onDeleteExcellence={onDeleteExcellence}
          getExperienceCount={getExperienceCount}
          setIsExperienceFormOpen={setIsExperienceFormOpen}
          isAdminMode={isAdminMode}
        />
      );
    case 'experiences':
      return (
        <ExperiencesDisplay
          experienceViewMode={experienceViewMode}
          setExperienceViewMode={setExperienceViewMode}
          excellences={excellences}
          experiences={experiences}
          user={user}
          onAddExcellence={onAddExcellence}
          onUpdateExcellence={onUpdateExcellence}
          onDeleteExcellence={onDeleteExcellence}
          getExperienceCount={getExperienceCount}
          setIsExperienceFormOpen={setIsExperienceFormOpen}
          isAdminMode={isAdminMode}
        />
      );
    default:
      return <p>Vue non reconnue.</p>;
  }
};
