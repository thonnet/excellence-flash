
import React from 'react';
import { Excellence } from '../types';
import { KanbanBoard } from './KanbanBoard';
import { ContextualHelp } from './ContextualHelp';
import { AlternatingBaseline } from './AlternatingBaseline';
import { AddExcellenceModal } from './AddExcellenceModal';
import { Plus } from 'lucide-react';

interface ListViewProps {
  excellences: Excellence[];
  experiences: any[];
  onAddExcellence: (excellence: Omit<Excellence, 'id' | 'created_at' | 'updated_at'>) => void;
  onUpdateExcellence: (id: string, updates: Partial<Excellence>) => void;
  onDeleteExcellence: (id: string) => void;
  getExperienceCount: (excellenceId: string) => number;
}

export const ListView: React.FC<ListViewProps> = ({
  excellences,
  experiences,
  onAddExcellence,
  onUpdateExcellence,
  onDeleteExcellence,
  getExperienceCount
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);

  const excellencesBaselines = [
    "Conscientisez vos capacités pour les mobiliser intentionnellement",
    "Rassemblez vos forces distinctives en un lieu unique",
    "Cartographiez votre signature distinctive",
    "Transformez vos capacités implicites en atouts stratégiques"
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-4">
            <h2 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Vos Excellences</h2>
            <ContextualHelp pageType="excellences" />
            {/* Desktop button */}
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="btn-create-excellence hidden lg:flex"
              title="Créer une nouvelle excellence"
            >
              <Plus size={16} />
            </button>
          </div>
          <div className="mt-1 h-6">
            <AlternatingBaseline baselines={excellencesBaselines} />
          </div>
        </div>
      </div>

      {/* Mobile/Tablet FAB */}
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="btn-create-excellence lg:hidden"
        title="Créer une nouvelle excellence"
      >
        <Plus size={24} />
      </button>
      
      <KanbanBoard
        excellences={excellences}
        experiences={experiences}
        onAddExcellence={onAddExcellence}
        onUpdateExcellence={onUpdateExcellence}
        onDeleteExcellence={onDeleteExcellence}
        getExperienceCount={getExperienceCount}
      />

      {/* Add Excellence Modal */}
      {isAddModalOpen && (
        <AddExcellenceModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={onAddExcellence}
        />
      )}
    </div>
  );
};
