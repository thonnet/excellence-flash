import React from 'react';
import { Excellence } from '../types';
import { Search, X, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
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
  return <div className="filters-section" style={{
    padding: '9px 18px',
    background: '#2a2a2a',
    borderBottom: '1px solid #404040',
    display: 'flex',
    gap: '14px',
    alignItems: 'center',
    height: '51px',
    overflowX: 'auto'
  }}>
      {/* Groupe Excellences */}
      <div className="filter-group" style={{
      display: 'flex',
      alignItems: 'center',
      gap: '7px',
      flexShrink: 0
    }}>
        <Menu size={16} style={{
        color: '#b0b0b0'
      }} />
        <span className="filter-label" style={{
        fontSize: '14px',
        color: '#b0b0b0',
        whiteSpace: 'nowrap'
      }}>
          Excellences
        </span>
        
        {/* Sélecteur d'excellences */}
        <div className="flex gap-2">
          {excellences.map(excellence => {
          const isSelected = selectedExcellences.includes(excellence.id);
          const experienceCount = 0; // TODO: Calculer le nombre d'expériences par excellence

          return;
        })}
        </div>
      </div>

      {/* Champ de recherche rétractable aligné à droite */}
      <div className="filter-group ml-auto" style={{
      display: 'flex',
      alignItems: 'center',
      gap: '7px',
      flexShrink: 0,
      marginLeft: 'auto'
    }}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2" size={14} style={{
          color: '#999'
        }} />
          <Input value={searchQuery} onChange={e => onSearchChange(e.target.value)} placeholder="Rechercher..." className="pl-9 pr-8" style={{
          backgroundColor: '#333',
          borderColor: '#555',
          color: '#ccc',
          width: '200px',
          height: '32px',
          fontSize: '13px'
        }} />
          {searchQuery && <button onClick={() => onSearchChange('')} className="absolute right-2 top-1/2 transform -translate-y-1/2" style={{
          color: '#999'
        }}>
              <X size={14} />
            </button>}
        </div>
      </div>

      {/* Indicateur de résultats */}
      {hasActiveFilters && <div className="filter-group" style={{
      display: 'flex',
      alignItems: 'center',
      gap: '7px',
      flexShrink: 0
    }}>
          <span className="filter-label" style={{
        fontSize: '12px',
        color: '#999',
        whiteSpace: 'nowrap'
      }}>
            <span style={{
          color: '#ee5a01'
        }}>{experienceCount}</span> résultats
          </span>
          <Button onClick={onClearFilters} variant="ghost" size="sm" className="text-gray-400 hover:text-white h-6 px-2" style={{
        fontSize: '11px'
      }}>
            <X size={12} className="mr-1" />
            Effacer
          </Button>
        </div>}
    </div>;
};