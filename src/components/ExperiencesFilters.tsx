
import React from 'react';
import { Excellence } from '../types';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
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
  const hasActiveFilters = searchQuery || selectedExcellences.length > 0;

  return (
    <div className="filters-section">
      {/* Groupe Excellences */}
      <div className="filter-group">
        <ExcellenceMenuIcon size={14} />
        <span className="filter-label">Excellences</span>
        
        {/* Sélecteur d'excellences */}
        <div className="flex gap-2">
          {excellences.map(excellence => {
            const isSelected = selectedExcellences.includes(excellence.id);
            
            return (
              <Badge
                key={excellence.id}
                variant={isSelected ? excellence.category : 'outline'}
                className={`filter-chip cursor-pointer transition-all ${
                  isSelected ? 'active' : ''
                }`}
                onClick={() => onExcellenceToggle(excellence.id)}
              >
                {excellence.name}
              </Badge>
            );
          })}
        </div>
      </div>

      {/* Champ de recherche aligné à droite */}
      <div className="filter-group ml-auto">
        <div className="relative">
          <SearchIcon 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-muted)]" 
            size={14} 
          />
          <Input
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Rechercher..."
            className="search-input pl-9 pr-8"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[var(--text-muted)] hover:text-white transition-colors"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Indicateur de résultats */}
      {hasActiveFilters && (
        <div className="filter-group">
          <span className="filter-label text-xs">
            <span className="text-[var(--color-primary-orange)]">{experienceCount}</span> résultats
          </span>
          <Button
            onClick={onClearFilters}
            variant="ghost"
            size="sm"
            className="text-[var(--text-muted)] hover:text-white h-6 px-2 text-xs"
          >
            <X size={12} className="mr-1" />
            Effacer
          </Button>
        </div>
      )}
    </div>
  );
};
