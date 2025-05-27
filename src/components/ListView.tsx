
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
      <div className="page-header">
        <div className="title-section">
          <div className="flex items-center space-x-4">
            <h2 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Vos Excellences</h2>
            <ContextualHelp pageType="excellences" />
          </div>
          <div className="mt-1 h-6">
            <AlternatingBaseline baselines={excellencesBaselines} />
          </div>
        </div>
        <div className="view-controls">
          {/* Desktop button - intégré à droite des contrôles */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="excellence-add-btn-desktop hidden md:flex"
            title="Ajouter une nouvelle excellence"
            aria-label="Ajouter une nouvelle excellence"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

      {/* Mobile FAB */}
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="excellence-add-btn-mobile md:hidden"
        title="Ajouter une nouvelle excellence"
        aria-label="Ajouter une nouvelle excellence"
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
