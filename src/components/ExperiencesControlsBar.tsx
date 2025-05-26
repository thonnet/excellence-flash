
import React from 'react';

type SortType = 'today' | 'week' | 'month' | 'year' | 'category' | 'title';
type CategoryFilter = 'all' | 'manifestee' | 'principe' | 'quete';

interface ExperiencesControlsBarProps {
  categoryFilter: CategoryFilter;
  sortType: SortType;
  onCategoryChange: (category: CategoryFilter) => void;
  onSortChange: (sort: SortType) => void;
}

export const ExperiencesControlsBar: React.FC<ExperiencesControlsBarProps> = ({
  categoryFilter,
  sortType,
  onCategoryChange,
  onSortChange
}) => {
  const sortButtons = [
    { id: 'today' as SortType, label: '📅 Aujourd\'hui' },
    { id: 'week' as SortType, label: '📅 Cette semaine' },
    { id: 'month' as SortType, label: '📅 Ce mois' },
    { id: 'year' as SortType, label: '📅 Cette année' },
    { id: 'category' as SortType, label: '🏷️ Catégorie' },
    { id: 'title' as SortType, label: '🔤 Titre A-Z' }
  ];

  return (
    <div className="controls-bar">
      <div className="filter-section">
        <span className="filter-label">Filtrer par catégorie :</span>
        <select 
          className="category-filter"
          value={categoryFilter}
          onChange={(e) => onCategoryChange(e.target.value as CategoryFilter)}
          style={{
            backgroundColor: 'var(--bg-tertiary)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '6px',
            padding: '8px 12px',
            marginLeft: '12px'
          }}
        >
          <option value="all">Toutes les catégories</option>
          <option value="manifestee">Excellence manifestée</option>
          <option value="principe">Principe d'excellence</option>
          <option value="quete">Quête d'excellence</option>
        </select>
      </div>
      
      <div className="sort-section">
        <span className="filter-label">Trier par :</span>
        <div className="sort-buttons">
          {sortButtons.map((button) => (
            <button
              key={button.id}
              className={`sort-btn ${sortType === button.id ? 'active' : ''}`}
              onClick={() => onSortChange(button.id)}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
