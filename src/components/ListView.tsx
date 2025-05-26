
import React from 'react';
import { Excellence } from '../types';
import { KanbanBoard } from './KanbanBoard';

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
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Liste des Excellences</h2>
          <p style={{ color: 'var(--text-muted)' }} className="mt-1">Vue détaillée de toutes vos excellences</p>
        </div>
      </div>
      
      <KanbanBoard
        excellences={excellences}
        experiences={experiences}
        onAddExcellence={onAddExcellence}
        onUpdateExcellence={onUpdateExcellence}
        onDeleteExcellence={onDeleteExcellence}
        getExperienceCount={getExperienceCount}
      />
    </div>
  );
};
