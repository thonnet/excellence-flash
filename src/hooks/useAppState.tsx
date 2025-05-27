
import { useState } from 'react';
import { useExcellences } from './useExcellences';
import { useExperiences } from './useExperiences';
import { useAuth } from './useAuth';
import { Excellence, Experience, User } from '../types';

type ViewType = 'kanban' | 'list' | 'observatoire' | 'experiences';

export const useAppState = () => {
  const [currentView, setCurrentView] = useState<ViewType>('kanban');
  const [searchQuery, setSearchQuery] = useState('');
  const [isExperienceFormOpen, setIsExperienceFormOpen] = useState(false);

  // Use Supabase hooks for real data
  const { user } = useAuth();
  const { excellences: allExcellences, addExcellence, updateExcellence, deleteExcellence, refetch: refetchExcellences } = useExcellences();
  const { experiences, addExperience, getExperienceCount, refetch: refetchExperiences } = useExperiences();

  // Create user object from auth user data
  const userState: User = user ? {
    id: user.id,
    email: user.email || '',
    full_name: user.user_metadata?.full_name || user.email || 'Utilisateur',
    is_admin: true, // Since you're the admin user
    plan_type: 'premium',
    created_at: user.created_at || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  } : {
    id: '',
    email: '',
    full_name: 'Utilisateur',
    is_admin: false,
    plan_type: 'gratuit',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const filteredExcellences = allExcellences.filter(excellence => 
    excellence.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    excellence.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExportData = () => {
    console.log('Export data triggered');
  };

  const handleImportDataClick = () => {
    // Refresh data after import
    refetchExcellences();
    refetchExperiences();
    console.log('Import data completed - data refreshed');
  };

  return {
    currentView,
    setCurrentView,
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
