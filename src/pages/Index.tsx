
import React, { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import { ExcellenceFlashLogo } from '../components/ExcellenceFlashLogo';
import { Header } from '../components/Header';
import { MainContent } from '../components/MainContent';
import { ExperienceForm } from '../components/ExperienceForm';
import { useAppState } from '../hooks/useAppState';
import { useExcellences } from '../hooks/useExcellences';
import { useExperiences } from '../hooks/useExperiences';

const Index = () => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const appState = useAppState();
  const { isLoading: excellencesLoading } = useExcellences();
  const { isLoading: experiencesLoading } = useExperiences();
  
  // Set current view based on route
  useEffect(() => {
    if (location.pathname.startsWith('/experiences')) {
      console.log('Setting view to experiences for path:', location.pathname);
      appState.setCurrentView('experiences');
    }
  }, [location.pathname, appState]);

  // Loading state
  if (loading) {
    console.log('Auth loading...');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ExcellenceFlashLogo size={64} className="mx-auto mb-4" />
          <p className="text-lg">Chargement...</p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!user) {
    console.log('User not authenticated, redirecting to auth');
    return <Navigate to="/auth" replace />;
  }

  // Data loading
  if (excellencesLoading || experiencesLoading) {
    console.log('Data loading...', { excellencesLoading, experiencesLoading });
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ExcellenceFlashLogo size={64} className="mx-auto mb-4" />
          <p className="text-lg">Chargement de vos données...</p>
        </div>
      </div>
    );
  }

  console.log('Rendering main app. Current view:', appState.currentView, 'Path:', location.pathname);

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
        excellences={appState.excellences}
        experiences={appState.experiences}
        user={appState.userState}
        onAddExcellence={appState.handleAddExcellence}
        onUpdateExcellence={appState.handleUpdateExcellence}
        onDeleteExcellence={appState.handleDeleteExcellence}
        onAddExperience={appState.handleAddExperience}
        getExperienceCount={appState.getExperienceCount}
        onOpenExperienceForm={() => appState.setIsExperienceFormOpen(true)}
        setCurrentView={appState.setCurrentView}
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
