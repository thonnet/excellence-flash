
import React, { useState, useEffect } from 'react';
import { ExcellenceFlashLogo } from '../components/ExcellenceFlashLogo';
import { KanbanBoard } from '../components/KanbanBoard';
import { Observatoire } from '../components/Observatoire';
import { ExperiencesDisplay } from '../components/ExperiencesDisplay';
import { ExperienceForm } from '../components/ExperienceForm';
import { Navigation } from '../components/Navigation';
import { UserProfile } from '../components/UserProfile';
import { ThemeToggle } from '../components/ThemeToggle';
import { ViewToggle } from '../components/ViewToggle';
import { DataImportExport } from '../components/DataImportExport';
import { Excellence, Experience, User } from '../types';
import { mockExcellences, mockExperiences, mockUser } from '../data/mockData';
import { Plus } from 'lucide-react';

type ViewType = 'kanban' | 'list' | 'observatoire' | 'experiences';
type ExperienceViewMode = 'list' | 'gallery';

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>('kanban');
  const [experienceViewMode, setExperienceViewMode] = useState<ExperienceViewMode>('list');
  const [excellences, setExcellences] = useState<Excellence[]>(mockExcellences);
  const [experiences, setExperiences] = useState<Experience[]>(mockExperiences);
  const [user, setUser] = useState<User>(mockUser);
  const [searchQuery, setSearchQuery] = useState('');
  const [isExperienceFormOpen, setIsExperienceFormOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

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
    // Use the existing DataImportExport functionality
    const dataImportExport = new DataImportExport({
      excellences,
      experiences,
      onImportData: handleImportData
    });
    // Trigger export (this would need to be implemented properly)
    console.log('Export data triggered');
  };

  const handleImportDataClick = () => {
    setIsImportModalOpen(true);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* Header */}
      <header 
        className="border-b sticky top-0 z-50"
        style={{ 
          backgroundColor: 'var(--bg-secondary)',
          borderColor: 'var(--border-subtle)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo, Title & Baseline */}
            <div className="flex items-center space-x-4">
              <ExcellenceFlashLogo size={32} />
              <div>
                <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Excellence Flash</h1>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Modelez et structurez votre excellence</p>
              </div>
            </div>

            {/* Navigation */}
            <Navigation 
              currentView={currentView} 
              onViewChange={setCurrentView}
              className="hidden md:flex"
            />

            {/* Search, Theme Toggle & Profile */}
            <div className="flex items-center space-x-4">
              <div className="relative hidden sm:block">
                <input
                  type="text"
                  placeholder="Rechercher dans votre contenu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>
              <ThemeToggle />
              <UserProfile 
                user={user} 
                onExportData={handleExportData}
                onImportData={handleImportDataClick}
              />
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t" style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-secondary)' }}>
          <Navigation 
            currentView={currentView} 
            onViewChange={setCurrentView}
            className="flex justify-around py-2"
            isMobile={true}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'observatoire' && (
          <Observatoire 
            excellences={excellences}
            experiences={experiences}
            user={user}
          />
        )}

        {currentView === 'kanban' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Vos Excellences</h2>
                <p style={{ color: 'var(--text-muted)' }} className="mt-1">Organisez et développez vos compétences</p>
              </div>
            </div>
            
            <KanbanBoard
              excellences={filteredExcellences}
              onAddExcellence={handleAddExcellence}
              onUpdateExcellence={handleUpdateExcellence}
              onDeleteExcellence={handleDeleteExcellence}
              getExperienceCount={getExperienceCount}
            />
          </div>
        )}

        {currentView === 'list' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Liste des Excellences</h2>
                <p style={{ color: 'var(--text-muted)' }} className="mt-1">Vue détaillée de toutes vos excellences</p>
              </div>
            </div>
            
            <div className="rounded-xl p-6 border" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-subtle)' }}>
              <p style={{ color: 'var(--text-muted)' }}>Vue liste à implémenter dans la prochaine itération</p>
            </div>
          </div>
        )}

        {currentView === 'experiences' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Vos Expériences</h2>
                <p style={{ color: 'var(--text-muted)' }} className="mt-1">Toutes vos expériences d'excellence</p>
              </div>
              <button 
                onClick={() => setIsExperienceFormOpen(true)}
                className="flex items-center space-x-2 px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors"
                style={{ backgroundColor: 'var(--accent-orange)' }}
              >
                <Plus size={16} />
                <span>Nouvelle expérience</span>
              </button>
            </div>

            {/* Experience View Toggle */}
            <div className="flex justify-center">
              <ViewToggle
                currentView={experienceViewMode}
                onViewChange={(view) => setExperienceViewMode(view as ExperienceViewMode)}
                availableViews={['list', 'gallery']}
              />
            </div>
            
            <ExperiencesDisplay
              experiences={experiences}
              excellences={excellences}
            />
          </div>
        )}
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
