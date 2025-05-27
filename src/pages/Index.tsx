import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { ExcellenceFlashLogo } from '../components/ExcellenceFlashLogo';
import { KanbanView } from '../components/KanbanView';
import { ListView } from '../components/ListView';
import { Observatoire } from '../components/Observatoire';
import { ExperiencesDisplay } from '../components/ExperiencesDisplay';
import { ExperienceForm } from '../components/ExperienceForm';
import { Navigation } from '../components/Navigation';
import { UserProfile } from '../components/UserProfile';
import { ThemeToggle } from '../components/ThemeToggle';
import { ViewToggle } from '../components/ViewToggle';
import { ContextualHelp } from '../components/ContextualHelp';
import { AlternatingBaseline } from '../components/AlternatingBaseline';
import { Excellence, Experience, User } from '../types';
import { mockExcellences, mockExperiences, mockUser } from '../data/mockData';
import { Plus, Search } from 'lucide-react';

type ViewType = 'kanban' | 'list' | 'observatoire' | 'experiences';
type ExperienceViewMode = 'list' | 'gallery';

const Index = () => {
  const { user, loading } = useAuth();
  
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

  const [currentView, setCurrentView] = useState<ViewType>('kanban');
  const [experienceViewMode, setExperienceViewMode] = useState<ExperienceViewMode>('list');
  const [excellences, setExcellences] = useState<Excellence[]>(mockExcellences);
  const [experiences, setExperiences] = useState<Experience[]>(mockExperiences);
  const [userState, setUserState] = useState<User>(mockUser);
  const [searchQuery, setSearchQuery] = useState('');
  const [isExperienceFormOpen, setIsExperienceFormOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

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

  const handleExportData = () => {
    console.log('Export data triggered');
  };

  const handleImportDataClick = () => {
    console.log('Import data triggered');
  };

  const experiencesBaselines = [
    "Transformez vos expériences en carburant d'excellence",
    "Conscientisez la valeur de ce que vous accomplissez naturellement",
    "Connectez vos expériences aux excellences qu'elles révèlent",
    "Donnez du sens et de la valeur à ce que vous vivez",
    "Développez votre autorité intrinsèque par la présence à ce que vous faites"
  ];

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

            {/* Simplified Search, Theme Toggle & Profile */}
            <div className="flex items-center space-x-4">
              <div className="relative hidden sm:block">
                <div className="relative">
                  <button
                    className={`flex items-center justify-center transition-all duration-200 ${
                      isSearchFocused ? 'w-64' : 'w-10'
                    } h-10 border rounded-lg focus:outline-none`}
                    style={{
                      backgroundColor: 'var(--bg-tertiary)',
                      borderColor: searchQuery ? 'var(--accent-orange)' : 'var(--border-subtle)',
                      color: 'var(--text-primary)'
                    }}
                    onClick={() => setIsSearchFocused(true)}
                    title={!isSearchFocused ? "Rechercher" : undefined}
                  >
                    {!isSearchFocused ? (
                      <Search size={20} style={{ color: 'var(--text-secondary)' }} />
                    ) : (
                      <>
                        <Search size={16} className="absolute left-3" style={{ color: 'var(--text-secondary)' }} />
                        <input
                          type="text"
                          placeholder="Rechercher..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          onBlur={() => !searchQuery && setIsSearchFocused(false)}
                          className="w-full pl-10 pr-4 py-2 bg-transparent focus:outline-none"
                          style={{ color: 'var(--text-primary)' }}
                          autoFocus
                        />
                      </>
                    )}
                  </button>
                </div>
              </div>
              <ThemeToggle />
              <UserProfile 
                user={userState} 
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
            user={userState}
          />
        )}

        {currentView === 'kanban' && (
          <KanbanView
            excellences={filteredExcellences}
            experiences={experiences}
            onAddExcellence={handleAddExcellence}
            onUpdateExcellence={handleUpdateExcellence}
            onDeleteExcellence={handleDeleteExcellence}
            getExperienceCount={getExperienceCount}
          />
        )}

        {currentView === 'list' && (
          <ListView
            excellences={filteredExcellences}
            experiences={experiences}
            onAddExcellence={handleAddExcellence}
            onUpdateExcellence={handleUpdateExcellence}
            onDeleteExcellence={handleDeleteExcellence}
            getExperienceCount={getExperienceCount}
          />
        )}

        {currentView === 'experiences' && (
          <div className="space-y-6">
            <div className="page-header">
              <div className="title-section">
                <div className="flex items-center space-x-4">
                  <h2 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Vos Expériences</h2>
                  <ContextualHelp pageType="experiences" />
                </div>
                <div className="mt-1 h-6">
                  <AlternatingBaseline baselines={experiencesBaselines} />
                </div>
              </div>
              <div className="view-controls">
                <ViewToggle
                  currentView={experienceViewMode}
                  onViewChange={(view) => setExperienceViewMode(view as ExperienceViewMode)}
                  availableViews={['list', 'gallery']}
                />
                <button 
                  onClick={() => setIsExperienceFormOpen(true)}
                  className="flex items-center space-x-2 px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors ml-4"
                  style={{ backgroundColor: 'var(--accent-orange)' }}
                >
                  <Plus size={16} />
                  <span>Nouvelle expérience</span>
                </button>
              </div>
            </div>
            
            <ExperiencesDisplay
              experiences={experiences}
              excellences={excellences}
              viewMode={experienceViewMode}
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
    </div>
  );
};

export default Index;
