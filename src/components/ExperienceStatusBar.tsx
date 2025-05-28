import React from 'react';
import '../styles/experience-grid.css';

interface ExperienceStatusBarProps {
  totalCount: number;
  filteredCount: number;
  activeFilters: string[];
}

export const ExperienceStatusBar: React.FC<ExperienceStatusBarProps> = ({
  totalCount,
  filteredCount,
  activeFilters
}) => {
  const getFilterText = () => {
    if (activeFilters.length === 0) {
      return 'Aucun filtre actif';
    }
    return `Filtrées par : ${activeFilters.join(', ')}`;
  };

  return (
    <div className="status-bar">
      <span>
        {filteredCount} expérience{filteredCount !== 1 ? 's' : ''} 
        {filteredCount !== totalCount && ` sur ${totalCount}`} • {getFilterText()}
      </span>
    </div>
  );
};
