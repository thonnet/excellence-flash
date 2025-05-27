
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { ExcellenceFlashLogo } from '../components/ExcellenceFlashLogo';
import { Header } from '../components/Header';
import { MainContent } from '../components/MainContent';
import { ExperienceForm } from '../components/ExperienceForm';
import { useAppState } from '../hooks/useAppState';

const Index = () => {
  const { user, loading } = useAuth();
  const appState = useAppState();
  
  // Rediriger vers la page d'authentification si pas connecté
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ExcellenceFlashLogo size={64} className="mx-auto mb-4" />
          <p className="text-lg">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <Header
        currentView={appState.currentView}
        onViewChange={appState.setCurrentView}
        searchQuery={appState.searchQuery}
        onSearchChange={appState.setSearchQuery}
        user={appState.userState}
        onExportData={appState.handleExportData}
        onImportData={appState.handleImportDataClick}
      />

      <MainContent
        currentView={appState.currentView}
        experienceViewMode={appState.experienceViewMode}
        onExperienceViewModeChange={appState.setExperienceViewMode}
        excellences={appState.excellences}
        experiences={appState.experiences}
        user={appState.userState}
        onAddExcellence={appState.handleAddExcellence}
        onUpdateExcellence={appState.handleUpdateExcellence}
        onDeleteExcellence={appState.handleDeleteExcellence}
        onAddExperience={appState.handleAddExperience}
        getExperienceCount={appState.getExperienceCount}
        onOpenExperienceForm={() => appState.setIsExperienceFormOpen(true)}
      />

      {/* Experience Form Modal */}
      {appState.isExperienceFormOpen && (
        <ExperienceForm
          excellences={appState.excellences}
          onAdd={appState.handleAddExperience}
          onClose={() => appState.setIsExperienceFormOpen(false)}
        />
      )}
    </div>
  );
};

export default Index;
