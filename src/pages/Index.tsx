
import React, { useState, useEffect } from 'react';
import { ExcellenceFlashLogo } from '../components/ExcellenceFlashLogo';
import { KanbanBoard } from '../components/KanbanBoard';
import { Dashboard } from '../components/Dashboard';
import { ExperiencesList } from '../components/ExperiencesList';
import { Navigation } from '../components/Navigation';
import { UserProfile } from '../components/UserProfile';
import { Excellence, Experience, User } from '../types';
import { mockExcellences, mockExperiences, mockUser } from '../data/mockData';

type ViewType = 'kanban' | 'list' | 'dashboard' | 'experiences';

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>('kanban');
  const [excellences, setExcellences] = useState<Excellence[]>(mockExcellences);
  const [experiences, setExperiences] = useState<Experience[]>(mockExperiences);
  const [user, setUser] = useState<User>(mockUser);
  const [searchQuery, setSearchQuery] = useState('');

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

  return (
    <div className="min-h-screen bg-[#1a1a2e] text-white">
      {/* Header */}
      <header className="bg-[#16213e] border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Brand */}
            <div className="flex items-center space-x-3">
              <ExcellenceFlashLogo size={40} />
              <div>
                <h1 className="text-xl font-bold text-white">Excellence Flash</h1>
                <p className="text-xs text-gray-400">Révélez vos talents</p>
              </div>
            </div>

            {/* Navigation */}
            <Navigation 
              currentView={currentView} 
              onViewChange={setCurrentView}
              className="hidden md:flex"
            />

            {/* Search & Profile */}
            <div className="flex items-center space-x-4">
              <div className="relative hidden sm:block">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 px-4 py-2 bg-[#2a2a3e] border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0195ee]/50"
                />
              </div>
              <UserProfile user={user} />
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-white/10 bg-[#16213e]">
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
        {currentView === 'dashboard' && (
          <Dashboard 
            excellences={excellences}
            experiences={experiences}
            user={user}
          />
        )}

        {currentView === 'kanban' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white">Vos Excellences</h2>
                <p className="text-gray-400 mt-1">Organisez et développez vos compétences</p>
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
                <h2 className="text-3xl font-bold text-white">Liste des Excellences</h2>
                <p className="text-gray-400 mt-1">Vue détaillée de toutes vos excellences</p>
              </div>
            </div>
            
            {/* Liste des excellences - à implémenter */}
            <div className="bg-[#2a2a3e] rounded-xl p-6 border border-white/10">
              <p className="text-gray-400">Vue liste à implémenter dans la prochaine itération</p>
            </div>
          </div>
        )}

        {currentView === 'experiences' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white">Vos Expériences</h2>
                <p className="text-gray-400 mt-1">Toutes vos expériences d'excellence</p>
              </div>
            </div>
            
            <ExperiencesList
              experiences={experiences}
              excellences={excellences}
              onAddExperience={handleAddExperience}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
