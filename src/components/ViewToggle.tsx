
import React from 'react';
import { List } from 'lucide-react';

type ViewMode = 'kanban' | 'list' | 'gallery';

interface ViewToggleProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  availableViews: ViewMode[];
  className?: string;
}

const KanbanIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
    <rect x="1" y="2" width="4" height="12" rx="1" />
    <rect x="7" y="2" width="4" height="8" rx="1" />
    <rect x="13" y="2" width="4" height="10" rx="1" />
  </svg>
);

export const ViewToggle: React.FC<ViewToggleProps> = ({
  currentView,
  onViewChange,
  availableViews,
  className = ""
}) => {
  const viewIcons = {
    kanban: KanbanIcon,
    list: List,
    gallery: KanbanIcon // Use Kanban icon for gallery mode on experiences page
  };

  const getViewTitle = (view: ViewMode) => {
    switch (view) {
      case 'kanban':
        return 'Vue Kanban';
      case 'list':
        return 'Vue Liste';
      case 'gallery':
        return 'Vue par Catégories';
      default:
        return '';
    }
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
            title={getViewTitle(view)}
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
