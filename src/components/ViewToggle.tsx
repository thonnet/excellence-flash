
import React from 'react';
import { GalleryIcon } from './icons/GalleryIcon';
import { TimelineIcon } from './icons/TimelineIcon';
import { ListIcon } from './icons/ListIcon';
import { CompactIcon } from './icons/CompactIcon';
import { CalendarIcon } from './icons/CalendarIcon';
import { KanbanIcon } from './icons/KanbanIcon';

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
  const viewIcons = {
    kanban: KanbanIcon,
    list: ListIcon,
    gallery: GalleryIcon, // Fixed: now uses proper gallery icon instead of kanban
    timeline: TimelineIcon,
    compact: CompactIcon,
    calendar: CalendarIcon
  };

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
        const Icon = viewIcons[view];
        const isActive = currentView === view;
        
        return (
          <button
            key={view}
            onClick={() => onViewChange(view)}
            className={`p-2 transition-colors relative ${isActive ? 'active-view-toggle' : ''}`}
            style={{ color: isActive ? 'var(--accent-orange)' : 'var(--text-secondary)' }}
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
