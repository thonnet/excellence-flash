
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { MainContent } from '../components/MainContent';
import { ExperienceForm } from '../components/ExperienceForm';
import { DataImportExport } from '../components/DataImportExport';
import { Excellence, Experience } from '../types';
import { UserDisplay } from '../types/auth';
import { useAuth } from '../hooks/useAuth';
import { mockExcellences, mockExperiences } from '../data/mockData';

type ViewType = 'kanban' | 'list' | 'observatoire' | 'experiences' | 'admin';
type ExperienceViewMode = 'list' | 'gallery';

const Index = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  
  const [currentView, setCurrentView] = useState<ViewType>('kanban');
  const [experienceViewMode, setExperienceViewMode] = useState<ExperienceViewMode>('list');
  const [excellences, setExcellences] = useState<Excellence[]>(mockExcellences);
  const [experiences, setExperiences] = useState<Experience[]>(mockExperiences);
  const [searchQuery, setSearchQuery] = useState('');
  const [isExperienceFormOpen, setIsExperienceFormOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  // Redirection si non connecté
  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  // Affichage du loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  // Si pas d'utilisateur, ne rien afficher (redirection en cours)
  if (!user) {
    return null;
  }

  const filteredExcellences = excellences.filter(excellence => 
    excellence.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    excellence.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddExcellence = (excellence: Omit<Excellence, 'id' | 'created_at' | 'updated_at'>) => {
    const newExcellence: Excellence = {
      ...excellence,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setExcellences(prev => [...prev, newExcellence]);
  };

  const handleUpdateExcellence = (id: string, updates: Partial<Excellence>) => {
    setExcellences(prev => prev.map(excellence => 
      excellence.id === id 
        ? { ...excellence, ...updates, updated_at: new Date().toISOString() }
        : excellence
    ));
  };

  const handleDeleteExcellence = (id: string) => {
    setExcellences(prev => prev.filter(excellence => excellence.id !== id));
    setExperiences(prev => prev.filter(experience => experience.excellence_id !== id));
  };

  const handleAddExperience = (experience: Omit<Experience, 'id' | 'created_at' | 'updated_at'>) => {
    const newExperience: Experience = {
      ...experience,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setExperiences(prev => [...prev, newExperience]);
  };

  const getExperienceCount = (excellenceId: string) => {
    return experiences.filter(exp => exp.excellence_id === excellenceId).length;
  };

  const handleImportData = (importedExcellences: Excellence[], importedExperiences: Experience[]) => {
    const newExcellences = [...excellences];
    const newExperiences = [...experiences];

    importedExcellences.forEach(importedExc => {
      if (!newExcellences.find(exc => exc.id === importedExc.id)) {
        newExcellences.push(importedExc);
      }
    });

    importedExperiences.forEach(importedExp => {
      if (!newExperiences.find(exp => exp.id === importedExp.id)) {
        newExperiences.push(importedExp);
      }
    });

    setExcellences(newExcellences);
    setExperiences(newExperiences);
    
    console.log(`Importé: ${importedExcellences.length} excellences, ${importedExperiences.length} expériences`);
  };

  const handleExportData = () => {
    console.log('Export data triggered');
  };

  const handleImportDataClick = () => {
    setIsImportModalOpen(true);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <AppHeader
        user={user}
        currentView={currentView}
        onViewChange={setCurrentView}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onExportData={handleExportData}
        onImportData={handleImportDataClick}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <MainContent
          currentView={currentView}
          experienceViewMode={experienceViewMode}
          filteredExcellences={filteredExcellences}
          experiences={experiences}
          user={user}
          onAddExcellence={handleAddExcellence}
          onUpdateExcellence={handleUpdateExcellence}
          onDeleteExcellence={handleDeleteExcellence}
          getExperienceCount={getExperienceCount}
          onAddExperience={() => setIsExperienceFormOpen(true)}
          onViewModeChange={setExperienceViewMode}
        />
      </main>

      {/* Experience Form Modal */}
      {isExperienceFormOpen && (
        <ExperienceForm
          excellences={excellences}
          onAdd={handleAddExperience}
          onClose={() => setIsExperienceFormOpen(false)}
        />
      )}

      {/* Import Modal */}
      {isImportModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <DataImportExport
              excellences={excellences}
              experiences={experiences}
              onImportData={handleImportData}
            />
            <button 
              onClick={() => setIsImportModalOpen(false)}
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
