
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useExcellences } from '@/hooks/useExcellences';
import { useExperiences } from '@/hooks/useExperiences';
import { AuthPage } from '@/components/auth/AuthPage';
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
import { Excellence, Experience } from '../types';
import { Plus, Search } from 'lucide-react';

type ViewType = 'kanban' | 'list' | 'observatoire' | 'experiences';
type ExperienceViewMode = 'list' | 'gallery';

const Index = () => {
  const { user, profile, loading: authLoading } = useAuth();
  const { excellences, loading: excellencesLoading, addExcellence, updateExcellence, deleteExcellence } = useExcellences();
  const { experiences, loading: experiencesLoading, addExperience } = useExperiences();

  const [currentView, setCurrentView] = useState<ViewType>('kanban');
  const [experienceViewMode, setExperienceViewMode] = useState<ExperienceViewMode>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [isExperienceFormOpen, setIsExperienceFormOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Show loading spinner while auth is loading
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ExcellenceFlashLogo size={64} />
          <p className="mt-4 text-lg">Chargement...</p>
        </div>
      </div>
    );
  }

  // Show auth page if user is not logged in
  if (!user || !profile) {
    return <AuthPage />;
  }

  const filteredExcellences = excellences.filter(excellence => 
    excellence.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (excellence.description && excellence.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAddExcellence = async (excellence: Omit<Excellence, 'id' | 'created_at' | 'updated_at'>) => {
    await addExcellence({
      ...excellence,
      user_id: user.id
    });
  };

  const handleAddExperience = async (experience: Omit<Experience, 'id' | 'created_at' | 'updated_at'>) => {
    await addExperience({
      ...experience,
      user_id: user.id
    });
  };

  const getExperienceCount = (excellenceId: string) => {
    return experiences.filter(exp => exp.excellence_id === excellenceId).length;
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
                user={profile} 
                onExportData={() => {}}
                onImportData={() => {}}
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
            user={profile}
          />
        )}

        {currentView === 'kanban' && (
          <KanbanView
            excellences={filteredExcellences}
            experiences={experiences}
            onAddExcellence={handleAddExcellence}
            onUpdateExcellence={updateExcellence}
            onDeleteExcellence={deleteExcellence}
            getExperienceCount={getExperienceCount}
          />
        )}

        {currentView === 'list' && (
          <ListView
            excellences={filteredExcellences}
            experiences={experiences}
            onAddExcellence={handleAddExcellence}
            onUpdateExcellence={updateExcellence}
            onDeleteExcellence={deleteExcellence}
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
