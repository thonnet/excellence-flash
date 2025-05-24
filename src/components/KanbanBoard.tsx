
import React, { useState } from 'react';
import { Excellence } from '../types';
import { EXCELLENCE_CATEGORIES } from '../types';
import { ExcellenceCard } from './ExcellenceCard';
import { AddExcellenceModal } from './AddExcellenceModal';
import { Plus } from 'lucide-react';

interface KanbanBoardProps {
  excellences: Excellence[];
  onAddExcellence: (excellence: Omit<Excellence, 'id' | 'created_at' | 'updated_at'>) => void;
  onUpdateExcellence: (id: string, updates: Partial<Excellence>) => void;
  onDeleteExcellence: (id: string) => void;
  getExperienceCount: (excellenceId: string) => number;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  excellences,
  onAddExcellence,
  onUpdateExcellence,
  onDeleteExcellence,
  getExperienceCount
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'manifestee' | 'principe' | 'quete' | null>(null);

  const getExcellencesByCategory = (category: 'manifestee' | 'principe' | 'quete') => {
    return excellences.filter(excellence => excellence.category === category);
  };

  const handleAddClick = (category: 'manifestee' | 'principe' | 'quete') => {
    setSelectedCategory(category);
    setIsAddModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Kanban Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {Object.entries(EXCELLENCE_CATEGORIES).map(([categoryKey, category]) => {
          const categoryExcellences = getExcellencesByCategory(categoryKey as 'manifestee' | 'principe' | 'quete');
          
          return (
            <div key={categoryKey} className="kanban-column">
              {/* Column Header - Style barre de menu */}
              <div 
                className="kanban-header"
                style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  borderBottom: '2px solid var(--border-medium)'
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 
                      className="font-bold text-lg"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {category.title}
                    </h3>
                    <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                      {category.description}
                    </p>
                    <p className="text-xs mt-2" style={{ color: 'var(--text-secondary)' }}>
                      {categoryExcellences.length} excellence{categoryExcellences.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <button
                    onClick={() => handleAddClick(categoryKey as 'manifestee' | 'principe' | 'quete')}
                    className="p-2 rounded-lg transition-colors"
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
                  <ExcellenceCard
                    key={excellence.id}
                    excellence={excellence}
                    experienceCount={getExperienceCount(excellence.id)}
                    onUpdate={onUpdateExcellence}
                    onDelete={onDeleteExcellence}
                  />
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

      {/* Add Excellence Modal */}
      <AddExcellenceModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={onAddExcellence}
        preselectedCategory={selectedCategory}
      />
    </div>
  );
};
