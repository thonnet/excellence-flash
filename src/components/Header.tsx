
import React, { useState } from 'react';
import { ExcellenceFlashLogo } from './ExcellenceFlashLogo';
import { Navigation } from './Navigation';
import { UserProfile } from './UserProfile';
import { ThemeToggle } from './ThemeToggle';
import { User } from '../types';
import { Search } from 'lucide-react';

type ViewType = 'kanban' | 'list' | 'observatoire' | 'experiences';

interface HeaderProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  user: User;
  onExportData: () => void;
  onImportData: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onViewChange,
  searchQuery,
  onSearchChange,
  user,
  onExportData,
  onImportData,
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

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
              <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Excellence Flash</h1>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Modelez et structurez votre excellence</p>
            </div>
          </div>

          {/* Navigation */}
          <Navigation 
            currentView={currentView} 
            onViewChange={onViewChange}
            className="hidden md:flex"
          />

          {/* Search, Theme Toggle & Profile */}
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
            <ThemeToggle />
            <UserProfile 
              user={user} 
              onExportData={onExportData}
              onImportData={onImportData}
            />
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t" style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-secondary)' }}>
        <Navigation 
          currentView={currentView} 
          onViewChange={onViewChange}
          className="flex justify-around py-2"
          isMobile={true}
        />
      </div>
    </header>
  );
};
