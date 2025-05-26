
import React from 'react';
import { AppHeader } from '../components/AppHeader';
import { MainContent } from '../components/MainContent';
import { AppModals } from '../components/AppModals';
import { useAppState } from '../hooks/useAppState';
import '../components/AdminSwitch.css';

const Index = () => {
  const {
    // States
    currentView,
    experienceViewMode,
    excellences,
    experiences,
    user,
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
