
import React from 'react';
import { Experience, Excellence } from '../types';
import { ExperienceCard } from './ExperienceCard';
import { EmptyExperiencesState } from './EmptyExperiencesState';

interface ExperiencesGridProps {
  experiences: Experience[];
  excellences: Excellence[];
  onView: (experience: Experience) => void;
  onEdit: (experience: Experience) => void;
  onLink: (experience: Experience) => void;
  onDelete: (experience: Experience) => void;
  onConsigner: () => void;
  isFiltered: boolean;
}

export const ExperiencesGrid: React.FC<ExperiencesGridProps> = ({
  experiences,
  excellences,
  onView,
  onEdit,
  onLink,
  onDelete,
  onConsigner,
  isFiltered
}) => {
  if (experiences.length === 0) {
    return (
      <EmptyExperiencesState 
        isFiltered={isFiltered}
        onConsigner={onConsigner}
      />
    );
  }

  return (
    <div className="space-y-4">
      {experiences.map((experience) => (
        <ExperienceCard
          key={experience.id}
          experience={experience}
          excellences={excellences}
          onView={onView}
          onEdit={onEdit}
          onLink={onLink}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
