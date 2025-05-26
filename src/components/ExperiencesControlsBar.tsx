
import React from 'react';
import { EXCELLENCE_CATEGORIES } from '../types';
import { Star } from 'lucide-react';

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
  const getCategoryIconClass = (category: string) => {
    if (category === 'manifestee') return 'category-icon--manifestee';
    if (category === 'principe') return 'category-icon--principe';
    if (category === 'quete') return 'category-icon--quete';
    return 'category-icon--manifestee';
  };

  return (
    <div className="controls-bar">
      <div className="filter-section">
        <span className="filter-label">Filtrer par catégorie :</span>
        <select
          className="category-filter"
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
        <span className="filter-label">Trier par :</span>
        <div className="sort-buttons">
          <button
            className={`sort-btn ${selectedSort === 'today' ? 'active' : ''}`}
            onClick={() => onSortChange('today')}
          >
            📅 Aujourd'hui
          </button>
          <button
            className={`sort-btn ${selectedSort === 'week' ? 'active' : ''}`}
            onClick={() => onSortChange('week')}
          >
            📅 Cette semaine
          </button>
          <button
            className={`sort-btn ${selectedSort === 'month' ? 'active' : ''}`}
            onClick={() => onSortChange('month')}
          >
            📅 Ce mois
          </button>
          <button
            className={`sort-btn ${selectedSort === 'year' ? 'active' : ''}`}
            onClick={() => onSortChange('year')}
          >
            📅 Cette année
          </button>
          <button
            className={`sort-btn ${selectedSort === 'category' ? 'active' : ''}`}
            onClick={() => onSortChange('category')}
          >
            <Star className="category-icon" size={14} style={{ marginRight: '4px' }} />
            Catégorie
          </button>
          <button
            className={`sort-btn ${selectedSort === 'title' ? 'active' : ''}`}
            onClick={() => onSortChange('title')}
          >
            🔤 Titre A-Z
          </button>
        </div>
      </div>
    </div>
  );
};
