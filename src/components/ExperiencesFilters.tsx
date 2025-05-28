
import React, { useState } from 'react';
import { Excellence } from '../types';

interface ExperiencesFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedExcellences: string[];
  onExcellenceToggle: (excellenceId: string) => void;
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
  excellences: Excellence[];
  onClearFilters: () => void;
  experienceCount: number;
}

export const ExperiencesFilters: React.FC<ExperiencesFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedExcellences,
  onExcellenceToggle,
  selectedPeriod,
  onPeriodChange,
  excellences,
  onClearFilters,
  experienceCount
}) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const handleSearchToggle = () => {
    setIsSearchExpanded(!isSearchExpanded);
    // Auto-focus on input when expanding
    if (!isSearchExpanded) {
      setTimeout(() => {
        const searchInput = document.querySelector('.search-input') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
      }, 100);
    }
  };

  const handleAddClick = () => {
    console.log('Bouton + cliqué - TODO: implémenter action');
  };

  return (
    <div className="filters-section">
      {/* Bouton + */}
      <button 
        className="add-btn"
        onClick={handleAddClick}
      >
        +
      </button>

      {/* Groupe de filtres excellences */}
      <div className="filter-group">
        <span className="filter-label">⭐</span>
        <select 
          className="filter-select"
          value={selectedExcellences.length === 1 ? selectedExcellences[0] : 'all'}
          onChange={(e) => {
            if (e.target.value === 'all') {
              onClearFilters();
            } else {
              onExcellenceToggle(e.target.value);
            }
          }}
        >
          <option value="all">Toutes</option>
          {excellences.map((excellence) => (
            <option key={excellence.id} value={excellence.id}>
              {excellence.name}
            </option>
          ))}
        </select>
      </div>

      {/* Chips de filtres temporels */}
      <div 
        className={`filter-chip ${selectedPeriod === 'today' ? 'active' : ''}`}
        onClick={() => onPeriodChange('today')}
      >
        Aujourd'hui
      </div>

      <div 
        className={`filter-chip ${selectedPeriod === 'week' ? 'active' : ''}`}
        onClick={() => onPeriodChange('week')}
      >
        Semaine
      </div>

      <div 
        className={`filter-chip ${selectedPeriod === 'month' ? 'active' : ''}`}
        onClick={() => onPeriodChange('month')}
      >
        Mois
      </div>

      <div 
        className={`filter-chip ${selectedPeriod === 'all' ? 'active' : ''}`}
        onClick={() => onPeriodChange('all')}
      >
        Tout
      </div>

      {/* Container de recherche rétractable */}
      <div className={`search-container ${isSearchExpanded ? 'expanded' : 'collapsed'}`}>
        <input 
          type="text" 
          className="search-input"
          placeholder="Rechercher..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <button 
          className="search-toggle"
          onClick={handleSearchToggle}
        >
          🔍
        </button>
      </div>
    </div>
  );
};
