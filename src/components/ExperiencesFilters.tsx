
import React, { useState } from 'react';
import { Excellence } from '../types';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { SearchIcon } from './icons/SearchIcon';
import { ExcellenceMenuIcon } from './icons/ExcellenceMenuIcon';

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
  excellences,
  onClearFilters,
  experienceCount
}) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (isSearchExpanded) {
      onSearchChange('');
    }
  };

  const hasActiveFilters = searchQuery || selectedExcellences.length > 0;

  return (
    <div className="filters-section">
      {/* Groupe Excellence simple */}
      <div className="filter-group">
        <ExcellenceMenuIcon size={14} />
        <span className="filter-label">Excellences</span>
        <select
          className="form-select"
          value={selectedExcellences.length > 0 ? selectedExcellences[0] : 'all'}
          onChange={(e) => {
            // Clear all selections first
            selectedExcellences.forEach(id => onExcellenceToggle(id));
            // Add new selection if not 'all'
            if (e.target.value !== 'all') {
              onExcellenceToggle(e.target.value);
            }
          }}
        >
          <option value="all">Toutes</option>
          {excellences.map(excellence => (
            <option key={excellence.id} value={excellence.id}>
              {excellence.name}
            </option>
          ))}
        </select>
      </div>

      {/* Recherche rétractable */}
      <div className={`search-container ${isSearchExpanded ? 'expanded' : ''}`}>
        {isSearchExpanded && (
          <input
            type="text"
            className="search-input"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            autoFocus
          />
        )}
        <button className="search-toggle" onClick={toggleSearch}>
          <SearchIcon size={14} />
        </button>
      </div>

      {/* Compteur de résultats */}
      {hasActiveFilters && (
        <div className="filter-group">
          <span className="filter-label text-xs">
            <span style={{ color: 'var(--color-primary-orange)' }}>{experienceCount}</span> résultats
          </span>
          <Button
            onClick={onClearFilters}
            variant="ghost"
            size="sm"
            className="text-xs px-2 h-6 hover:text-white"
          >
            <X size={12} className="mr-1" />
            Effacer
          </Button>
        </div>
      )}
    </div>
  );
};
