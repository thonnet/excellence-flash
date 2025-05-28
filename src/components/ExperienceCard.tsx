
import React from 'react';
import { Experience, Excellence } from '../types';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

// Import des icônes SVG personnalisées
import { ViewIcon } from './icons/ViewIcon';
import { EditIcon } from './icons/EditIcon';
import { LinkIcon } from './icons/LinkIcon';
import { CalendarIcon } from './icons/CalendarIcon';

interface ExperienceCardProps {
  experience: Experience;
  excellences: Excellence[];
  onView: (experience: Experience) => void;
  onEdit: (experience: Experience) => void;
  onLink: (experience: Experience) => void;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({
  experience,
  excellences,
  onView,
  onEdit,
  onLink
}) => {
  // Trouver l'excellence liée à cette expérience
  const linkedExcellence = excellences.find(exc => exc.id === experience.excellence_id);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div 
      className="p-6 rounded-lg transition-all duration-200 hover:shadow-lg"
      style={{ backgroundColor: '#2a2a2a' }}
    >
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2" style={{ color: '#ffffff' }}>
          {experience.title}
        </h3>
        <div className="text-sm flex items-center space-x-4" style={{ color: '#999' }}>
          <span className="flex items-center">
            <CalendarIcon size={14} className="mr-1" style={{ color: '#999' }} />
            {formatDate(experience.date_experienced)}
          </span>
          {linkedExcellence && (
            <span>🏷️ {linkedExcellence.category}</span>
          )}
        </div>
      </div>

      {/* Description */}
      <p 
        className="text-sm mb-4 line-clamp-3"
        style={{ color: '#ccc', lineHeight: '1.6' }}
      >
        {experience.description}
      </p>

      {/* Excellence Tags */}
      {linkedExcellence && (
        <div className="mb-4">
          <Badge
            variant="outline"
            className="text-xs"
            style={{
              backgroundColor: 'rgba(1,149,238,0.2)',
              borderColor: '#0195ee',
              color: '#0195ee'
            }}
          >
            {linkedExcellence.name}
          </Badge>
        </div>
      )}

      {/* Tags */}
      {experience.tags && experience.tags.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {experience.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs rounded"
                style={{
                  backgroundColor: '#333',
                  color: '#999'
                }}
              >
                {tag}
              </span>
            ))}
            {experience.tags.length > 3 && (
              <span className="text-xs" style={{ color: '#666' }}>
                +{experience.tags.length - 3} autres
              </span>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <Button
            onClick={() => onView(experience)}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white text-xs"
          >
            <ViewIcon size={14} className="mr-1" />
            Détail
          </Button>
          <Button
            onClick={() => onEdit(experience)}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white text-xs"
          >
            <EditIcon size={14} className="mr-1" />
            Éditer
          </Button>
          <Button
            onClick={() => onLink(experience)}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white text-xs"
          >
            <LinkIcon size={14} className="mr-1" />
            Lier
          </Button>
        </div>
      </div>
    </div>
  );
};
