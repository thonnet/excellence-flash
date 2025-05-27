
import React from 'react';
import { Excellence } from '../types';
import { ExcellenceListView } from './ExcellenceListView';
import { ContextualHelp } from './ContextualHelp';
import { AlternatingBaseline } from './AlternatingBaseline';

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
  const excellencesBaselines = [
    "Conscientisez vos capacités pour les mobiliser intentionnellement",
    "Rassemblez vos forces distinctives en un lieu unique",
    "Cartographiez votre signature distinctive",
    "Transformez vos capacités implicites en atouts stratégiques"
  ];

  const handleView = (excellence: Excellence) => {
    // Implement view logic if needed
    console.log('View excellence:', excellence);
  };

  const handleEdit = (excellence: Excellence) => {
    // Implement edit logic if needed
    console.log('Edit excellence:', excellence);
  };

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
      </div>
      
      <ExcellenceListView
        excellences={excellences}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={onDeleteExcellence}
        onAddExcellence={onAddExcellence}
        getExperienceCount={getExperienceCount}
      />
    </div>
  );
};
