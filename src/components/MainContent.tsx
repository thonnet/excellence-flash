
import React from 'react';
import { KanbanBoard } from './KanbanBoard';
import { ListView } from './ListView';
import { Observatoire } from './Observatoire';
import { ExperiencesDisplay } from './ExperiencesDisplay';
import { AdminDashboard } from './AdminDashboard';
import { Excellence, Experience } from '../types';
import { UserDisplay } from '../types/user';

type ViewType = 'kanban' | 'list' | 'observatoire' | 'experiences';
type ExperienceViewMode = 'list' | 'gallery';

interface MainContentProps {
  currentView: ViewType;
  experienceViewMode: ExperienceViewMode;
  setExperienceViewMode: (mode: ExperienceViewMode) => void;
  excellences: Excellence[];
  filteredExcellences: Excellence[];
  experiences: Experience[];
  user: UserDisplay | null;
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
  // Si l'utilisateur est admin et en mode admin, afficher le dashboard admin
  if (isAdminMode && user?.role === 'admin') {
    return (
      <main className="flex-1 overflow-hidden">
        <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AdminDashboard />
        </div>
      </main>
    );
  }

  // Affichage normal selon la vue sélectionnée
  const renderContent = () => {
    switch (currentView) {
      case 'kanban':
        return (
          <KanbanBoard
            excellences={filteredExcellences}
            onAddExcellence={onAddExcellence}
            onUpdateExcellence={onUpdateExcellence}
            onDeleteExcellence={onDeleteExcellence}
            getExperienceCount={getExperienceCount}
            user={user}
          />
        );
      case 'list':
        return (
          <ListView
            excellences={filteredExcellences}
            onAddExcellence={onAddExcellence}
            onUpdateExcellence={onUpdateExcellence}
            onDeleteExcellence={onDeleteExcellence}
            getExperienceCount={getExperienceCount}
            user={user}
          />
        );
      case 'observatoire':
        return (
          <Observatoire
            excellences={excellences}
            experiences={experiences}
            user={user}
          />
        );
      case 'experiences':
        return (
          <ExperiencesDisplay
            experiences={experiences}
            excellences={excellences}
            viewMode={experienceViewMode}
            onViewModeChange={setExperienceViewMode}
            onAddExperience={() => setIsExperienceFormOpen(true)}
            user={user}
          />
        );
      default:
        return null;
    }
  };

  return (
    <main className="flex-1 overflow-hidden">
      <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </div>
    </main>
  );
};
