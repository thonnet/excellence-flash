
import React, { useState } from 'react';
import { Excellence } from '../types';
import { EXCELLENCE_CATEGORIES } from '../types';
import { AddExcellenceModal } from './AddExcellenceModal';
import { ViewToggle } from './ViewToggle';
import { ExcellenceListView } from './ExcellenceListView';
import { ExcellenceDetailModal } from './ExcellenceDetailModal';
import { ExcellenceEditModal } from './ExcellenceEditModal';
import { KanbanColumn } from './KanbanColumn';
import { MobileContextMenu } from './MobileContextMenu';
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
      <div className="view-controls">
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
            
            return (
              <KanbanColumn
                key={categoryKey}
                categoryKey={categoryKey as 'manifestee' | 'principe' | 'quete'}
                excellences={categoryExcellences}
                onAddClick={handleAddClick}
                onViewExcellence={handleViewExcellence}
                onEditExcellence={handleEditExcellence}
                onUpdateExcellence={onUpdateExcellence}
                onDeleteExcellence={onDeleteExcellence}
                getExperienceCount={getExperienceCount}
                draggedExcellence={draggedExcellence}
                dragOverColumn={dragOverColumn}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              />
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
          onAddExcellence={onAddExcellence}
          getExperienceCount={getExperienceCount}
        />
      )}

      {/* Mobile Context Menu */}
      <MobileContextMenu
        contextMenu={showContextMenu}
        onCategoryChange={handleCategoryChange}
        onClose={closeContextMenu}
      />

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
