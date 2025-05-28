
import React from 'react';
import { EXCELLENCE_CATEGORIES } from '../types';
import { ExcellencesIcon } from './icons/IconLibrary';

interface ExperiencesControlsBarProps {
  selectedCategory: string;
  selectedSort: string;
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: string) => void;
}

export const ExperiencesControlsBar: React.FC<ExperiencesControlsBarProps> = ({
  selectedCategory,
  selectedSort,
  onCategoryChange,
  onSortChange
}) => {
  return (
    <div className="controls-bar">
      <div className="filter-section">
        <span className="text-label">Filtrer par catégorie :</span>
        <select
          className="form-select"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="all">Toutes les catégories</option>
          {Object.entries(EXCELLENCE_CATEGORIES).map(([key, category]) => (
            <option key={key} value={key}>
              {category.title}
            </option>
          ))}
        </select>
      </div>

      <div className="sort-section">
        <span className="text-label">Trier par :</span>
        <div className="sort-buttons">
          <button
            className={`filter-chip ${selectedSort === 'today' ? 'active' : ''}`}
            onClick={() => onSortChange('today')}
          >
            📅 Aujourd'hui
          </button>
          <button
            className={`filter-chip ${selectedSort === 'week' ? 'active' : ''}`}
            onClick={() => onSortChange('week')}
          >
            📅 Cette semaine
          </button>
          <button
            className={`filter-chip ${selectedSort === 'month' ? 'active' : ''}`}
            onClick={() => onSortChange('month')}
          >
            📅 Ce mois
          </button>
          <button
            className={`filter-chip ${selectedSort === 'year' ? 'active' : ''}`}
            onClick={() => onSortChange('year')}
          >
            📅 Cette année
          </button>
          <button
            className={`filter-chip ${selectedSort === 'category' ? 'active' : ''}`}
            onClick={() => onSortChange('category')}
          >
            <ExcellencesIcon size={14} style={{ marginRight: '4px' }} />
            Catégorie
          </button>
          <button
            className={`filter-chip ${selectedSort === 'title' ? 'active' : ''}`}
            onClick={() => onSortChange('title')}
          >
            🔤 Titre A-Z
          </button>
        </div>
      </div>
    </div>
  );
};
