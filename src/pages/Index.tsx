
import React from 'react';
import { AppHeader } from '../components/AppHeader';
import { MainContent } from '../components/MainContent';
import { AppModals } from '../components/AppModals';
import { useAppState } from '../hooks/useAppState';
import { useUserProfile } from '../hooks/useUserProfile';
import type { UserDisplay } from '../types/userDisplay';
import '../components/AdminSwitch.css';

const Index = () => {
  const { profile, loading: profileLoading } = useUserProfile();
  
  const {
    // States
    currentView,
    experienceViewMode,
    excellences,
    experiences,
    searchQuery,
    isExperienceFormOpen,
    isImportModalOpen,
    isSearchFocused,
    isAdminMode,
    filteredExcellences,
    
    // Setters
    setCurrentView,
    setExperienceViewMode,
    setSearchQuery,
    setIsExperienceFormOpen,
    setIsImportModalOpen,
    setIsSearchFocused,
    setIsAdminMode,
    
    // Handlers
    handleAddExcellence,
    handleUpdateExcellence,
    handleDeleteExcellence,
    handleAddExperience,
    getExperienceCount,
    handleImportData,
    handleExportData,
  } = useAppState();

  const handleImportDataClick = () => {
    setIsImportModalOpen(true);
  };

  // Créer un objet user compatible avec l'interface UserDisplay
  const user: UserDisplay | null = profile ? {
    id: profile.id,
    name: profile.full_name || profile.email,
    email: profile.email,
    role: profile.role as 'user' | 'admin'
  } : null;

  if (profileLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p>Chargement de votre profil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <AppHeader
        currentView={currentView}
        onViewChange={setCurrentView}
        user={user}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isSearchFocused={isSearchFocused}
        setIsSearchFocused={setIsSearchFocused}
        isAdminMode={isAdminMode}
        setIsAdminMode={setIsAdminMode}
        onExportData={handleExportData}
        onImportData={handleImportDataClick}
      />

      <MainContent
        currentView={currentView}
        experienceViewMode={experienceViewMode}
        setExperienceViewMode={setExperienceViewMode}
        excellences={excellences}
        filteredExcellences={filteredExcellences}
        experiences={experiences}
        user={user}
        onAddExcellence={handleAddExcellence}
        onUpdateExcellence={handleUpdateExcellence}
        onDeleteExcellence={handleDeleteExcellence}
        getExperienceCount={getExperienceCount}
        setIsExperienceFormOpen={setIsExperienceFormOpen}
        isAdminMode={isAdminMode}
      />

      <AppModals
        isExperienceFormOpen={isExperienceFormOpen}
        setIsExperienceFormOpen={setIsExperienceFormOpen}
        isImportModalOpen={isImportModalOpen}
        setIsImportModalOpen={setIsImportModalOpen}
        excellences={excellences}
        experiences={experiences}
        onAddExperience={handleAddExperience}
        onImportData={handleImportData}
      />
    </div>
  );
};

export default Index;
