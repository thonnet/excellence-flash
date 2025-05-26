
import React from 'react';
import { KanbanView } from './KanbanView';
import { ListView } from './ListView';
import { Observatoire } from './Observatoire';
import { ExperiencesDisplay } from './ExperiencesDisplay';
import { ViewToggle } from './ViewToggle';
import { ContextualHelp } from './ContextualHelp';
import { AlternatingBaseline } from './AlternatingBaseline';
import { Excellence, Experience, User } from '../types';
import { Plus } from 'lucide-react';

type ViewType = 'kanban' | 'list' | 'observatoire' | 'experiences';
type ExperienceViewMode = 'list' | 'gallery';

interface MainContentProps {
  currentView: ViewType;
  experienceViewMode: ExperienceViewMode;
  setExperienceViewMode: (mode: ExperienceViewMode) => void;
  excellences: Excellence[];
  filteredExcellences: Excellence[];
  experiences: Experience[];
  user: User;
  onAddExcellence: (excellence: Omit<Excellence, 'id' | 'created_at' | 'updated_at'>) => void;
  onUpdateExcellence: (id: string, updates: Partial<Excellence>) => void;
  onDeleteExcellence: (id: string) => void;
  getExperienceCount: (excellenceId: string) => number;
  setIsExperienceFormOpen: (open: boolean) => void;
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
}) => {
  const experiencesBaselines = [
    "Transformez vos expériences en carburant d'excellence",
    "Conscientisez la valeur de ce que vous accomplissez naturellement",
    "Connectez vos expériences aux excellences qu'elles révèlent",
    "Donnez du sens et de la valeur à ce que vous vivez",
    "Développez votre autorité intrinsèque par la présence à ce que vous faites"
  ];

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
          excellences={filteredExcellences}
          experiences={experiences}
          onAddExcellence={onAddExcellence}
          onUpdateExcellence={onUpdateExcellence}
          onDeleteExcellence={onDeleteExcellence}
          getExperienceCount={getExperienceCount}
        />
      )}

      {currentView === 'list' && (
        <ListView
          excellences={filteredExcellences}
          experiences={experiences}
          onAddExcellence={onAddExcellence}
          onUpdateExcellence={onUpdateExcellence}
          onDeleteExcellence={onDeleteExcellence}
          getExperienceCount={getExperienceCount}
        />
      )}

      {currentView === 'experiences' && (
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
                currentView={experienceViewMode}
                onViewChange={(view) => setExperienceViewMode(view as ExperienceViewMode)}
                availableViews={['list', 'gallery']}
              />
              <button 
                onClick={() => setIsExperienceFormOpen(true)}
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
            viewMode={experienceViewMode}
          />
        </div>
      )}
    </main>
  );
};
