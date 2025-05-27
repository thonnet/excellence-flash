
import React from 'react';
import { useLocation } from 'react-router-dom';
import { KanbanView } from './KanbanView';
import { ListView } from './ListView';
import { Observatoire } from './Observatoire';
import { ExplorerExperiences } from './ExplorerExperiences';
import { ConsignerExperience } from './ConsignerExperience';
import { Excellence, Experience, User } from '../types';

type ViewType = 'kanban' | 'list' | 'observatoire' | 'experiences';

interface MainContentProps {
  currentView: ViewType;
  excellences: Excellence[];
  experiences: Experience[];
  user: User;
  onAddExcellence: (excellence: Omit<Excellence, 'id' | 'created_at' | 'updated_at'>) => void;
  onUpdateExcellence: (id: string, updates: Partial<Excellence>) => void;
  onDeleteExcellence: (id: string) => void;
  onAddExperience: (experience: Omit<Experience, 'id' | 'created_at' | 'updated_at'>) => void;
  getExperienceCount: (excellenceId: string) => number;
  onOpenExperienceForm: () => void;
  setCurrentView: (view: ViewType) => void;
}

export const MainContent: React.FC<MainContentProps> = ({
  currentView,
  excellences,
  experiences,
  user,
  onAddExcellence,
  onUpdateExcellence,
  onDeleteExcellence,
  onAddExperience,
  getExperienceCount,
  onOpenExperienceForm,
  setCurrentView,
}) => {
  const location = useLocation();
  
  // Determine experience mode based on URL
  const getExperienceMode = (): 'explorer' | 'consigner' => {
    if (location.pathname === '/experiences/new') return 'consigner';
    return 'explorer';
  };

  const handleExperienceModeChange = (mode: 'explorer' | 'consigner') => {
    if (mode === 'consigner') {
      window.history.pushState({}, '', '/experiences/new');
    } else {
      window.history.pushState({}, '', '/experiences');
    }
    // Force a re-render by updating the current view
    setCurrentView('experiences');
  };

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

      {currentView === 'experiences' && getExperienceMode() === 'explorer' && (
        <ExplorerExperiences
          onModeChange={handleExperienceModeChange}
        />
      )}

      {currentView === 'experiences' && getExperienceMode() === 'consigner' && (
        <ConsignerExperience
          onModeChange={handleExperienceModeChange}
        />
      )}
    </main>
  );
};
