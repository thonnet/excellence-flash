
import React from 'react';
import { KanbanView } from './KanbanView';
import { ListView } from './ListView';
import { Observatoire } from './Observatoire';
import { ExperiencesDisplay } from './ExperiencesDisplay';
import AdminDashboard from './AdminDashboard';
import { Excellence, Experience } from '../types';
import { UserDisplay } from '../types/auth';

type ViewType = 'kanban' | 'list' | 'observatoire' | 'experiences' | 'admin';
type ExperienceViewMode = 'list' | 'gallery';

interface MainContentProps {
  currentView: ViewType;
  experienceViewMode: ExperienceViewMode;
  filteredExcellences: Excellence[];
  experiences: Experience[];
  user: UserDisplay;
  onAddExcellence: (excellence: Omit<Excellence, 'id' | 'created_at' | 'updated_at'>) => void;
  onUpdateExcellence: (id: string, updates: Partial<Excellence>) => void;
  onDeleteExcellence: (id: string) => void;
  getExperienceCount: (excellenceId: string) => number;
  onAddExperience: () => void;
  onViewModeChange: (mode: ExperienceViewMode) => void;
}

export const MainContent: React.FC<MainContentProps> = ({
  currentView,
  experienceViewMode,
  filteredExcellences,
  experiences,
  user,
  onAddExcellence,
  onUpdateExcellence,
  onDeleteExcellence,
  getExperienceCount,
  onAddExperience,
  onViewModeChange
}) => {
  // Convertir UserDisplay en User pour la compatibilité avec Observatoire
  const fullUser = {
    ...user,
    company_name: '',
    billing_type: 'individual' as const,
    vat_number: '',
    subscription_status: 'pro' as const,
    plan_type: 'pro' as const,
    theme_preference: 'dark' as const,
    ai_insights_enabled: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  if (currentView === 'admin') {
    return <AdminDashboard user={user} />;
  }

  if (currentView === 'observatoire') {
    return (
      <Observatoire 
        excellences={filteredExcellences}
        experiences={experiences}
        user={fullUser}
      />
    );
  }

  if (currentView === 'kanban') {
    return (
      <KanbanView
        excellences={filteredExcellences}
        experiences={experiences}
        onAddExcellence={onAddExcellence}
        onUpdateExcellence={onUpdateExcellence}
        onDeleteExcellence={onDeleteExcellence}
        getExperienceCount={getExperienceCount}
      />
    );
  }

  if (currentView === 'list') {
    return (
      <ListView
        excellences={filteredExcellences}
        experiences={experiences}
        onAddExcellence={onAddExcellence}
        onUpdateExcellence={onUpdateExcellence}
        onDeleteExcellence={onDeleteExcellence}
        getExperienceCount={getExperienceCount}
      />
    );
  }

  if (currentView === 'experiences') {
    return (
      <ExperiencesDisplay
        experiences={experiences}
        excellences={filteredExcellences}
        viewMode={experienceViewMode}
      />
    );
  }

  return null;
};
