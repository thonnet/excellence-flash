
import React, { useState } from 'react';
import { ExcellenceFlashLogo } from './ExcellenceFlashLogo';
import { Navigation } from './Navigation';
import { UserProfile } from './UserProfile';
import { ThemeToggle } from './ThemeToggle';
import { UserDisplay } from '../types/auth';
import { Search, Shield, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

type ViewType = 'kanban' | 'list' | 'observatoire' | 'experiences' | 'admin';

interface AppHeaderProps {
  user: UserDisplay;
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onExportData: () => void;
  onImportData: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  user,
  currentView,
  onViewChange,
  searchQuery,
  onSearchChange,
  onExportData,
  onImportData
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const isAdminMode = currentView === 'admin';

  return (
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
              <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                Excellence Flash
              </h1>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                {isAdminMode ? 'Panneau d\'administration' : 'Modelez et structurez votre excellence'}
              </p>
            </div>
          </div>

          {/* Navigation (seulement en mode utilisateur) */}
          {!isAdminMode && (
            <Navigation 
              currentView={currentView} 
              onViewChange={onViewChange}
              className="hidden md:flex"
            />
          )}

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Search (seulement en mode utilisateur) */}
            {!isAdminMode && (
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
                          onChange={(e) => onSearchChange(e.target.value)}
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
            )}

            {/* Bouton de basculement Admin (seulement pour les admins) */}
            {user.role === 'admin' && (
              <button
                onClick={() => onViewChange(isAdminMode ? 'kanban' : 'admin')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  isAdminMode 
                    ? 'bg-red-500 text-white hover:bg-red-600' 
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
                title={isAdminMode ? 'Mode Utilisateur' : 'Mode Admin'}
              >
                {isAdminMode ? (
                  <>
                    <User size={18} />
                    <span className="hidden sm:inline">Utilisateur</span>
                  </>
                ) : (
                  <>
                    <Shield size={18} />
                    <span className="hidden sm:inline">Admin</span>
                  </>
                )}
              </button>
            )}

            <ThemeToggle />
            <UserProfile 
              user={user} 
              onExportData={onExportData}
              onImportData={onImportData}
              onLogout={handleLogout}
            />
          </div>
        </div>
      </div>

      {/* Mobile Navigation (seulement en mode utilisateur) */}
      {!isAdminMode && (
        <div className="md:hidden border-t" style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-secondary)' }}>
          <Navigation 
            currentView={currentView} 
            onViewChange={onViewChange}
            className="flex justify-around py-2"
            isMobile={true}
          />
        </div>
      )}
    </header>
  );
};
