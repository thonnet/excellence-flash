
import React, { useState } from 'react';
import { Excellence } from '../types';
import { ExcellenceMenuIcon } from './icons/ExcellenceMenuIcon';
import { SearchIcon } from './icons/SearchIcon';

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
  return (
    <div style={{
      padding: '9px 18px',
      background: '#2a2a2a',
      borderBottom: '1px solid #404040',
      display: 'flex',
      gap: '14px',
      alignItems: 'center',
      height: '51px'
    }}>
      {/* Excellence simple */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
        <ExcellenceMenuIcon size={14} style={{color: '#b0b0b0'}} />
        <span style={{ fontSize: '14px', color: '#b0b0b0' }}>Excellences</span>
        <select
          style={{
            background: '#1a1a1a',
            border: '1px solid #404040',
            color: 'white',
            padding: '5px 9px',
            borderRadius: '4px',
            fontSize: '12px',
            height: '30px'
          }}
          value={selectedExcellences.length > 0 ? selectedExcellences[0] : 'all'}
          onChange={(e) => {
            if (e.target.value === 'all') {
              selectedExcellences.forEach(id => onExcellenceToggle(id));
            } else {
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

      {/* Recherche simple */}
      <div style={{ marginLeft: 'auto', position: 'relative' }}>
        <SearchIcon size={14} style={{position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', color: '#b0b0b0', pointerEvents: 'none'}} />
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{
            background: '#1a1a1a',
            border: '1px solid #404040',
            color: 'white',
            padding: '5px 9px',
            paddingLeft: '30px',
            borderRadius: '4px',
            fontSize: '13px',
            height: '30px',
            width: '200px'
          }}
        />
      </div>

      {/* Compteur */}
      {(searchQuery || selectedExcellences.length > 0) && (
        <div style={{ fontSize: '12px', color: '#b0b0b0' }}>
          <span style={{ color: '#ee5a01' }}>{experienceCount}</span> résultats
          <button
            onClick={onClearFilters}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#b0b0b0',
              marginLeft: '8px',
              cursor: 'pointer',
              fontSize: '11px'
            }}
          >
            ✕ Effacer
          </button>
        </div>
      )}
    </div>
  );
};
