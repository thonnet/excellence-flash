import React, { useState } from 'react';
import { Excellence } from '../types';
import { EXCELLENCE_CATEGORIES } from '../types';
import { ExcellenceCard } from './ExcellenceCard';
import { AddExcellenceModal } from './AddExcellenceModal';
import { ViewToggle } from './ViewToggle';
import { ContextualHelp } from './ContextualHelp';
import { ExcellenceListView } from './ExcellenceListView';
import { ExcellenceDetailModal } from './ExcellenceDetailModal';
import { ExcellenceEditModal } from './ExcellenceEditModal';
import { Plus } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';

interface KanbanBoardProps {
  excellences: Excellence[];
  experiences: any[];
  onAddExcellence: (excellence: Omit<Excellence, 'id' | 'created_at' | 'updated_at'>) => void;
  onUpdateExcellence: (id: string, updates: Partial<Excellence>) => void;
  onDeleteExcellence: (id: string) => void;
  getExperienceCount: (excellenceId: string) => number;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  excellences,
  experiences,
  onAddExcellence,
  onUpdateExcellence,
  onDeleteExcellence,
  getExperienceCount
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'manifestee' | 'principe' | 'quete' | null>(null);
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [selectedExcellence, setSelectedExcellence] = useState<Excellence | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [draggedExcellence, setDraggedExcellence] = useState<Excellence | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);
  const [showContextMenu, setShowContextMenu] = useState<{excellence: Excellence, x: number, y: number} | null>(null);
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);
  
  const isMobile = useIsMobile();

  const getExcellencesByCategory = (category: 'manifestee' | 'principe' | 'quete') => {
    return excellences.filter(excellence => excellence.category === category);
  };

  const handleAddClick = (category: 'manifestee' | 'principe' | 'quete') => {
    setSelectedCategory(category);
    setIsAddModalOpen(true);
  };

  const handleViewExcellence = (excellence: Excellence) => {
    setSelectedExcellence(excellence);
    setIsDetailModalOpen(true);
  };

  const handleEditExcellence = (excellence: Excellence) => {
    setSelectedExcellence(excellence);
    setIsEditModalOpen(true);
  };

  // Drag & Drop handlers for desktop
  const handleDragStart = (e: React.DragEvent, excellence: Excellence) => {
    if (isMobile) return;
    setDraggedExcellence(excellence);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, category: string) => {
    if (isMobile) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverColumn(category);
  };

  const handleDragLeave = () => {
    if (isMobile) return;
    setDragOverColumn(null);
  };

  const handleDrop = (e: React.DragEvent, targetCategory: 'manifestee' | 'principe' | 'quete') => {
    if (isMobile) return;
    e.preventDefault();
    setDragOverColumn(null);
    
    if (draggedExcellence && draggedExcellence.category !== targetCategory) {
      onUpdateExcellence(draggedExcellence.id, { category: targetCategory });
    }
    setDraggedExcellence(null);
  };

  const handleDragEnd = () => {
    if (isMobile) return;
    setDraggedExcellence(null);
    setDragOverColumn(null);
  };

  // Long press handlers for mobile
  const handleTouchStart = (e: React.TouchEvent, excellence: Excellence) => {
    if (!isMobile) return;
    const timer = setTimeout(() => {
      const touch = e.touches[0];
      setShowContextMenu({
        excellence,
        x: touch.clientX,
        y: touch.clientY
      });
    }, 500);
    setLongPressTimer(timer);
  };

  const handleTouchEnd = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };

  const handleCategoryChange = (excellence: Excellence, newCategory: 'manifestee' | 'principe' | 'quete') => {
    onUpdateExcellence(excellence.id, { category: newCategory });
    setShowContextMenu(null);
  };

  const closeContextMenu = () => {
    setShowContextMenu(null);
  };

  return (
    <div className="space-y-6">
      {/* View Toggle Controls */}
      <div className="flex justify-center">
        <ViewToggle
          currentView={viewMode}
          onViewChange={(view) => setViewMode(view as 'kanban' | 'list')}
          availableViews={['kanban', 'list']}
        />
      </div>

      {/* Kanban Columns */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 kanban-mobile-optimized">
          {Object.entries(EXCELLENCE_CATEGORIES).map(([categoryKey, category]) => {
            const categoryExcellences = getExcellencesByCategory(categoryKey as 'manifestee' | 'principe' | 'quete');
            const isDragOver = dragOverColumn === categoryKey;
            
            return (
              <div 
                key={categoryKey} 
                className={`kanban-column ${isDragOver ? 'drag-over' : ''}`}
                onDragOver={(e) => handleDragOver(e, categoryKey)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, categoryKey as 'manifestee' | 'principe' | 'quete')}
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
                        <h3 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                          <span className="font-bold">{category.title}</span>
                          <span className="font-normal ml-2" style={{ color: 'var(--text-secondary)' }}>
                            {categoryExcellences.length}
                          </span>
                        </h3>
                      </div>
                      <ContextualHelp pageType={categoryKey as 'manifestee' | 'principe' | 'quete'} />
                    </div>
                    <button
                      onClick={() => handleAddClick(categoryKey as 'manifestee' | 'principe' | 'quete')}
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
                  {categoryExcellences.map(excellence => (
                    <div
                      key={excellence.id}
                      draggable={!isMobile}
                      onDragStart={(e) => handleDragStart(e, excellence)}
                      onDragEnd={handleDragEnd}
                      onTouchStart={(e) => handleTouchStart(e, excellence)}
                      onTouchEnd={handleTouchEnd}
                      className={`${draggedExcellence?.id === excellence.id ? 'dragging' : ''}`}
                    >
                      <ExcellenceCard
                        excellence={excellence}
                        experienceCount={getExperienceCount(excellence.id)}
                        onUpdate={onUpdateExcellence}
                        onDelete={onDeleteExcellence}
                        onView={handleViewExcellence}
                        onEdit={handleEditExcellence}
                      />
                    </div>
                  ))}
                  
                  {categoryExcellences.length === 0 && (
                    <div className="text-center py-8" style={{ color: 'var(--text-muted)' }}>
                      <p className="text-sm">Aucune excellence pour le moment</p>
                      <button
                        onClick={() => handleAddClick(categoryKey as 'manifestee' | 'principe' | 'quete')}
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
          })}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <ExcellenceListView
          excellences={excellences}
          onView={handleViewExcellence}
          onEdit={handleEditExcellence}
          onDelete={onDeleteExcellence}
          getExperienceCount={getExperienceCount}
        />
      )}

      {/* Mobile Context Menu */}
      {showContextMenu && (
        <div 
          className="fixed bg-white border border-gray-300 rounded-lg shadow-lg z-50 py-2"
          style={{
            left: showContextMenu.x - 100,
            top: showContextMenu.y - 50,
            backgroundColor: 'var(--bg-tertiary)',
            borderColor: 'var(--border-medium)'
          }}
        >
          {Object.entries(EXCELLENCE_CATEGORIES).map(([categoryKey, category]) => (
            <button
              key={categoryKey}
              onClick={() => handleCategoryChange(showContextMenu.excellence, categoryKey as 'manifestee' | 'principe' | 'quete')}
              disabled={showContextMenu.excellence.category === categoryKey}
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                showContextMenu.excellence.category === categoryKey ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              style={{ 
                color: 'var(--text-primary)',
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                if (showContextMenu.excellence.category !== categoryKey) {
                  e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {category.title}
            </button>
          ))}
          <button
            onClick={closeContextMenu}
            className="w-full text-left px-4 py-2 text-sm"
            style={{ color: 'var(--text-secondary)' }}
          >
            Annuler
          </button>
        </div>
      )}

      {/* Overlay to close context menu */}
      {showContextMenu && (
        <div 
          className="fixed inset-0 z-40"
          onClick={closeContextMenu}
        />
      )}

      {/* Add Excellence Modal */}
      <AddExcellenceModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={onAddExcellence}
        preselectedCategory={selectedCategory}
      />

      {/* Excellence Detail Modal */}
      {selectedExcellence && (
        <ExcellenceDetailModal
          excellence={selectedExcellence}
          experiences={experiences}
          isOpen={isDetailModalOpen}
          onClose={() => {
            setIsDetailModalOpen(false);
            setSelectedExcellence(null);
          }}
        />
      )}

      {/* Excellence Edit Modal */}
      {selectedExcellence && (
        <ExcellenceEditModal
          excellence={selectedExcellence}
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedExcellence(null);
          }}
          onSave={onUpdateExcellence}
        />
      )}
    </div>
  );
};
