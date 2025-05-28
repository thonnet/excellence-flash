
import React, { useState } from 'react';
import { Excellence } from '../types';
import { Search, X } from 'lucide-react';
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
  selectedPeriod,
  onPeriodChange,
  excellences,
  onClearFilters,
  experienceCount
}) => {
  const periods = [
    { id: 'today', label: 'Aujourd\'hui' },
    { id: 'week', label: 'Cette semaine' },
    { id: 'month', label: 'Ce mois' },
    { id: 'quarter', label: 'Trimestre' },
    { id: 'all', label: 'Tout' }
  ];

  const hasActiveFilters = searchQuery || selectedExcellences.length > 0 || selectedPeriod !== 'all';

  return (
    <div 
      className="p-6 rounded-lg mb-6"
      style={{ backgroundColor: '#2a2a2a' }}
    >
      {/* Recherche */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2" style={{ color: '#ee5a01' }}>
          🔍 Recherche
        </label>
        <div className="relative">
          <Search 
            className="absolute left-3 top-1/2 transform -translate-y-1/2" 
            size={16} 
            style={{ color: '#999' }}
          />
          <Input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Rechercher dans vos expériences..."
            className="pl-10"
            style={{
              backgroundColor: '#333',
              borderColor: '#555',
              color: '#ccc'
            }}
          />
        </div>
      </div>

      {/* Filtres par Excellence */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-3" style={{ color: '#ee5a01' }}>
          ⭐ Filtrer par Excellence
        </label>
        <div className="flex flex-wrap gap-2">
          {excellences.map((excellence) => {
            const isSelected = selectedExcellences.includes(excellence.id);
            const experienceCount = 0; // TODO: Calculer le nombre d'expériences par excellence
            
            return (
              <button
                key={excellence.id}
                onClick={() => onExcellenceToggle(excellence.id)}
                className="px-3 py-2 rounded-full text-sm transition-all duration-200"
                style={{
                  backgroundColor: isSelected ? '#0195ee' : '#333',
                  borderColor: '#555',
                  border: '1px solid',
                  color: isSelected ? 'white' : '#ccc'
                }}
              >
                {excellence.name} ({experienceCount})
              </button>
            );
          })}
        </div>
      </div>

      {/* Filtres Temporels */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-3" style={{ color: '#ee5a01' }}>
          📅 Période
        </label>
        <div className="flex flex-wrap gap-2">
          {periods.map((period) => {
            const isSelected = selectedPeriod === period.id;
            
            return (
              <button
                key={period.id}
                onClick={() => onPeriodChange(period.id)}
                className="px-4 py-2 rounded-lg text-sm transition-all duration-200"
                style={{
                  backgroundColor: isSelected ? '#ee5a01' : '#333',
                  borderColor: '#555',
                  border: '1px solid',
                  color: isSelected ? 'white' : '#999'
                }}
              >
                {period.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Effacer filtres */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between">
          <span className="text-sm" style={{ color: '#999' }}>
            <span style={{ color: '#ee5a01' }}>{experienceCount}</span> expériences trouvées
          </span>
          <Button
            onClick={onClearFilters}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
          >
            <X size={16} className="mr-1" />
            Effacer les filtres
          </Button>
        </div>
      )}
    </div>
  );
};
