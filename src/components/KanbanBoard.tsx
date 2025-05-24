
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
            <div key={categoryKey} className="space-y-4">
              {/* Column Header */}
              <div 
                className="p-4 rounded-xl border"
                style={{
                  backgroundColor: category.bgColor,
                  borderColor: category.borderColor
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 
                      className="font-semibold text-lg"
                      style={{ color: category.color }}
                    >
                      {category.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">
                      {category.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {categoryExcellences.length} excellence{categoryExcellences.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <button
                    onClick={() => handleAddClick(categoryKey as 'manifestee' | 'principe' | 'quete')}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    style={{ color: category.color }}
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>

              {/* Excellence Cards */}
              <div className="space-y-3 min-h-[200px]">
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
                  <div className="text-center py-8 text-gray-500">
                    <p className="text-sm">Aucune excellence pour le moment</p>
                    <button
                      onClick={() => handleAddClick(categoryKey as 'manifestee' | 'principe' | 'quete')}
                      className="text-xs mt-2 hover:underline"
                      style={{ color: category.color }}
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
