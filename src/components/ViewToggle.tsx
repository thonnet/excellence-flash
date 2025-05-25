
import React from 'react';
import { BarChart3, List } from 'lucide-react';

type ViewMode = 'kanban' | 'list' | 'gallery';

interface ViewToggleProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  availableViews: ViewMode[];
  className?: string;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({
  currentView,
  onViewChange,
  availableViews,
  className = ""
}) => {
  const viewIcons = {
    kanban: BarChart3,
    list: List,
    gallery: () => (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
        <rect x="1" y="1" width="6" height="6" rx="1" />
        <rect x="11" y="1" width="6" height="6" rx="1" />
        <rect x="1" y="11" width="6" height="6" rx="1" />
        <rect x="11" y="11" width="6" height="6" rx="1" />
      </svg>
    )
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {availableViews.map((view) => {
        const Icon = viewIcons[view];
        const isActive = currentView === view;
        
        return (
          <button
            key={view}
            onClick={() => onViewChange(view)}
            className={`p-2 transition-colors relative ${isActive ? 'active-view-toggle' : ''}`}
            style={{ color: 'var(--text-secondary)' }}
            title={view === 'kanban' ? 'Vue Kanban' : view === 'list' ? 'Vue Liste' : 'Vue Galerie'}
          >
            <Icon size={18} />
            {isActive && (
              <div 
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-0.5"
                style={{ backgroundColor: 'var(--accent-orange)' }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};
