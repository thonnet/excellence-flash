
import React from 'react';
import { Icon, IconName } from './ui/icon';

type ViewMode = 'kanban' | 'list' | 'gallery' | 'timeline' | 'compact' | 'calendar';

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
  const getViewTitle = (view: ViewMode) => {
    switch (view) {
      case 'kanban':
        return 'Vue Kanban';
      case 'list':
        return 'Vue Liste';
      case 'gallery':
        return 'Vue Galerie';
      case 'timeline':
        return 'Vue Timeline';
      case 'compact':
        return 'Vue Compact';
      case 'calendar':
        return 'Vue Calendrier';
      default:
        return '';
    }
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {availableViews.map((view) => {
        const isActive = currentView === view;
        
        return (
          <button
            key={view}
            onClick={() => onViewChange(view)}
            className={`btn-icon ${isActive ? 'active-view-toggle' : ''}`}
            style={{ 
              color: isActive ? 'var(--orange-primary)' : 'var(--text-muted)',
              borderColor: isActive ? 'var(--orange-primary)' : 'var(--border-primary)'
            }}
            title={getViewTitle(view)}
          >
            <Icon name={view as IconName} size={14} />
            {isActive && (
              <div 
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-0.5"
                style={{ backgroundColor: 'var(--orange-primary)' }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};
