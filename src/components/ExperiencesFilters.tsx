
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
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);

  const handleSearchToggle = () => {
    setIsSearchCollapsed(!isSearchCollapsed);
  };

  const handleAddClick = () => {
    console.log('Bouton + cliqué - TODO: implémenter action');
  };

  const getSelectedExcellenceName = () => {
    if (selectedExcellences.length === 0) return 'Toutes';
    if (selectedExcellences.length === 1) {
      const excellence = excellences.find(exc => exc.id === selectedExcellences[0]);
      return excellence?.name || 'Toutes';
    }
    return `${selectedExcellences.length} sélectionnées`;
  };

  return (
    <div 
      className="filters-section"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '16px 24px',
        backgroundColor: '#1e1e1e',
        borderBottom: '1px solid #404040'
      }}
    >
      {/* Bouton + */}
      <button 
        className="add-btn"
        onClick={handleAddClick}
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          backgroundColor: '#333333',
          border: '2px solid #ee5a01',
          color: '#ee5a01',
          fontSize: '18px',
          fontWeight: 'bold',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#ee5a01';
          e.currentTarget.style.color = 'white';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#333333';
          e.currentTarget.style.color = '#ee5a01';
        }}
      >
        +
      </button>

      {/* Groupe de filtres excellences */}
      <div 
        className="filter-group"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <span 
          className="filter-label"
          style={{
            fontSize: '16px'
          }}
        >
          ⭐
        </span>
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
          style={{
            backgroundColor: '#333333',
            color: '#ffffff',
            border: '1px solid #555555',
            borderRadius: '6px',
            padding: '6px 12px',
            fontSize: '14px',
            cursor: 'pointer',
            minWidth: '120px'
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
        style={{
          padding: '6px 12px',
          borderRadius: '16px',
          fontSize: '12px',
          cursor: 'pointer',
          backgroundColor: selectedPeriod === 'today' ? '#ee5a01' : '#333333',
          color: selectedPeriod === 'today' ? 'white' : '#cccccc',
          border: selectedPeriod === 'today' ? '1px solid #ee5a01' : '1px solid #555555',
          transition: 'all 0.2s ease'
        }}
      >
        Aujourd'hui
      </div>

      <div 
        className={`filter-chip ${selectedPeriod === 'week' ? 'active' : ''}`}
        onClick={() => onPeriodChange('week')}
        style={{
          padding: '6px 12px',
          borderRadius: '16px',
          fontSize: '12px',
          cursor: 'pointer',
          backgroundColor: selectedPeriod === 'week' ? '#ee5a01' : '#333333',
          color: selectedPeriod === 'week' ? 'white' : '#cccccc',
          border: selectedPeriod === 'week' ? '1px solid #ee5a01' : '1px solid #555555',
          transition: 'all 0.2s ease'
        }}
      >
        Semaine
      </div>

      <div 
        className={`filter-chip ${selectedPeriod === 'month' ? 'active' : ''}`}
        onClick={() => onPeriodChange('month')}
        style={{
          padding: '6px 12px',
          borderRadius: '16px',
          fontSize: '12px',
          cursor: 'pointer',
          backgroundColor: selectedPeriod === 'month' ? '#ee5a01' : '#333333',
          color: selectedPeriod === 'month' ? 'white' : '#cccccc',
          border: selectedPeriod === 'month' ? '1px solid #ee5a01' : '1px solid #555555',
          transition: 'all 0.2s ease'
        }}
      >
        Mois
      </div>

      <div 
        className={`filter-chip ${selectedPeriod === 'all' ? 'active' : ''}`}
        onClick={() => onPeriodChange('all')}
        style={{
          padding: '6px 12px',
          borderRadius: '16px',
          fontSize: '12px',
          cursor: 'pointer',
          backgroundColor: selectedPeriod === 'all' ? '#ee5a01' : '#333333',
          color: selectedPeriod === 'all' ? 'white' : '#cccccc',
          border: selectedPeriod === 'all' ? '1px solid #ee5a01' : '1px solid #555555',
          transition: 'all 0.2s ease'
        }}
      >
        Tout
      </div>

      {/* Container de recherche */}
      <div 
        className={`search-container ${isSearchCollapsed ? 'collapsed' : ''}`}
        style={{
          display: 'flex',
          alignItems: 'center',
          marginLeft: 'auto',
          position: 'relative'
        }}
      >
        {!isSearchCollapsed && (
          <input 
            type="text" 
            className="search-input"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{
              backgroundColor: '#333333',
              color: '#ffffff',
              border: '1px solid #555555',
              borderRadius: '6px',
              padding: '6px 12px',
              fontSize: '14px',
              minWidth: '200px',
              marginRight: '8px'
            }}
          />
        )}
        <button 
          className="search-toggle"
          onClick={handleSearchToggle}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '16px',
            cursor: 'pointer',
            padding: '6px',
            borderRadius: '4px',
            color: '#cccccc'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#333333';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          🔍
        </button>
      </div>
    </div>
  );
};
