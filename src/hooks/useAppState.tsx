
import { useState } from 'react';
import { useExcellences } from './useExcellences';
import { useExperiences } from './useExperiences';
import { Excellence, Experience, User } from '../types';
import { mockUser } from '../data/mockData';

type ViewType = 'kanban' | 'list' | 'observatoire' | 'experiences';
type ExperienceViewMode = 'list' | 'gallery';

export const useAppState = () => {
  const [currentView, setCurrentView] = useState<ViewType>('kanban');
  const [experienceViewMode, setExperienceViewMode] = useState<ExperienceViewMode>('list');
  const [userState, setUserState] = useState<User>(mockUser);
  const [searchQuery, setSearchQuery] = useState('');
  const [isExperienceFormOpen, setIsExperienceFormOpen] = useState(false);

  // Use Supabase hooks for real data
  const { excellences: allExcellences, addExcellence, updateExcellence, deleteExcellence } = useExcellences();
  const { experiences, addExperience, getExperienceCount } = useExperiences();

  const filteredExcellences = allExcellences.filter(excellence => 
    excellence.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    excellence.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExportData = () => {
    console.log('Export data triggered');
  };

  const handleImportDataClick = () => {
    console.log('Import data triggered');
  };

  return {
    currentView,
    setCurrentView,
    experienceViewMode,
    setExperienceViewMode,
    excellences: filteredExcellences,
    experiences,
    userState,
    searchQuery,
    setSearchQuery,
    isExperienceFormOpen,
    setIsExperienceFormOpen,
    handleAddExcellence: addExcellence,
    handleUpdateExcellence: (id: string, updates: Partial<Excellence>) => updateExcellence({ id, updates }),
    handleDeleteExcellence: deleteExcellence,
    handleAddExperience: addExperience,
    getExperienceCount,
    handleExportData,
    handleImportDataClick,
  };
};
