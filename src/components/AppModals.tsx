
import React from 'react';
import { ExperienceForm } from './ExperienceForm';
import { DataImportExport } from './DataImportExport';
import { Excellence, Experience } from '../types';

interface AppModalsProps {
  isExperienceFormOpen: boolean;
  setIsExperienceFormOpen: (open: boolean) => void;
  isImportModalOpen: boolean;
  setIsImportModalOpen: (open: boolean) => void;
  excellences: Excellence[];
  experiences: Experience[];
  onAddExperience: (experience: Omit<Experience, 'id' | 'created_at' | 'updated_at'>) => void;
  onImportData: (excellences: Excellence[], experiences: Experience[]) => void;
}

export const AppModals: React.FC<AppModalsProps> = ({
  isExperienceFormOpen,
  setIsExperienceFormOpen,
  isImportModalOpen,
  setIsImportModalOpen,
  excellences,
  experiences,
  onAddExperience,
  onImportData,
}) => {
  return (
    <>
      {/* Experience Form Modal */}
      {isExperienceFormOpen && (
        <ExperienceForm
          excellences={excellences}
          onAdd={onAddExperience}
          onClose={() => setIsExperienceFormOpen(false)}
        />
      )}

      {/* Import Modal */}
      {isImportModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <DataImportExport
              excellences={excellences}
              experiences={experiences}
              onImportData={onImportData}
            />
            <button 
              onClick={() => setIsImportModalOpen(false)}
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </>
  );
};
