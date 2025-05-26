
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { MainContent } from '../components/MainContent';
import { AppModals } from '../components/AppModals';
import { useAppState } from '../hooks/useAppState';
import { useAuth } from '../hooks/useAuth';
import '../components/AdminSwitch.css';

const Index = () => {
  const navigate = useNavigate();
  const { loading: authLoading, user: authUser } = useAuth();
  
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

  // Rediriger vers la page d'authentification si pas connecté
  React.useEffect(() => {
    if (!authLoading && !authUser) {
      navigate('/auth');
    }
  }, [authLoading, authUser, navigate]);

  // Afficher un loader pendant le chargement de l'authentification
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p style={{ color: 'var(--text-muted)' }}>Chargement...</p>
        </div>
      </div>
    );
  }

  // Ne pas afficher le contenu si pas d'utilisateur
  if (!user) {
    return null;
  }

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
