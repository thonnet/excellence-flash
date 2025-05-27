
import React from 'react';
import { Excellence } from '../types';
import { EXCELLENCE_CATEGORIES } from '../types';
import { ExcellenceCard } from './ExcellenceCard';
import { ContextualHelp } from './ContextualHelp';
import { Plus, Star } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';

interface KanbanColumnProps {
  categoryKey: 'manifestee' | 'principe' | 'quete';
  excellences: Excellence[];
  onAddClick: (category: 'manifestee' | 'principe' | 'quete') => void;
  onViewExcellence: (excellence: Excellence) => void;
  onEditExcellence: (excellence: Excellence) => void;
  onUpdateExcellence: (id: string, updates: Partial<Excellence>) => void;
  onDeleteExcellence: (id: string) => void;
  getExperienceCount: (excellenceId: string) => number;
  draggedExcellence: Excellence | null;
  dragOverColumn: string | null;
  onDragOver: (e: React.DragEvent, category: string) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent, targetCategory: 'manifestee' | 'principe' | 'quete') => void;
  onDragStart: (e: React.DragEvent, excellence: Excellence) => void;
  onDragEnd: () => void;
  onTouchStart: (e: React.TouchEvent, excellence: Excellence) => void;
  onTouchEnd: () => void;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  categoryKey,
  excellences,
  onAddClick,
  onViewExcellence,
  onEditExcellence,
  onUpdateExcellence,
  onDeleteExcellence,
  getExperienceCount,
  draggedExcellence,
  dragOverColumn,
  onDragOver,
  onDragLeave,
  onDrop,
  onDragStart,
  onDragEnd,
  onTouchStart,
  onTouchEnd
}) => {
  const isMobile = useIsMobile();
  const category = EXCELLENCE_CATEGORIES[categoryKey];
  const isDragOver = dragOverColumn === categoryKey;

  const getCategoryIconClass = (category: string) => {
    if (category.includes('manifestée') || category.includes('manifestee')) {
      return 'category-icon--manifestee';
    }
    if (category.includes('principe')) {
      return 'category-icon--principe';
    }
    if (category.includes('quête') || category.includes('quete')) {
      return 'category-icon--quete';
    }
    return 'category-icon--manifestee';
  };

  return (
    <div 
      className={`kanban-column ${isDragOver ? 'drag-over' : ''}`}
      onDragOver={(e) => onDragOver(e, categoryKey)}
      onDragLeave={onDragLeave}
      onDrop={(e) => onDrop(e, categoryKey)}
    >
      {/* Column Header */}
      <div 
        className="kanban-header"
        style={{
          backgroundColor: 'var(--bg-tertiary)',
          borderBottom: '2px solid var(--border-medium)'
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 flex-1">
            <div 
              className="flex-1 cursor-help"
              title={category.description}
            >
              <h3 className="font-bold text-lg flex items-center" style={{ color: 'var(--text-primary)' }}>
                <Star className={`category-icon ${getCategoryIconClass(categoryKey)} mr-2`} size={16} />
                <span className="font-bold">{category.title}</span>
                <span className="font-normal ml-2" style={{ color: 'var(--text-secondary)' }}>
                  {excellences.length}
                </span>
              </h3>
            </div>
            <ContextualHelp pageType={categoryKey} />
          </div>
          <button
            onClick={() => onAddClick(categoryKey)}
            className="p-2 rounded-lg transition-colors ml-2"
            style={{ 
              color: 'var(--text-secondary)',
              backgroundColor: 'transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

      {/* Excellence Cards Container */}
      <div 
        className="kanban-content"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-subtle)',
          borderTop: 'none'
        }}
      >
        {excellences.map(excellence => (
          <div
            key={excellence.id}
            draggable={!isMobile}
            onDragStart={(e) => onDragStart(e, excellence)}
            onDragEnd={onDragEnd}
            onTouchStart={(e) => onTouchStart(e, excellence)}
            onTouchEnd={onTouchEnd}
            className={`${draggedExcellence?.id === excellence.id ? 'dragging' : ''}`}
          >
            <ExcellenceCard
              excellence={excellence}
              experienceCount={getExperienceCount(excellence.id)}
              onUpdate={onUpdateExcellence}
              onDelete={onDeleteExcellence}
              onView={onViewExcellence}
              onEdit={onEditExcellence}
            />
          </div>
        ))}
        
        {excellences.length === 0 && (
          <div className="text-center py-8" style={{ color: 'var(--text-muted)' }}>
            <p className="text-sm">Aucune excellence pour le moment</p>
            <button
              onClick={() => onAddClick(categoryKey)}
              className="text-xs mt-2 hover:underline"
              style={{ color: 'var(--text-secondary)' }}
            >
              Ajouter la première
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
