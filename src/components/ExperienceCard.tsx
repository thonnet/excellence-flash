
import React from 'react';
import { Experience, Excellence } from '../types';
import { ViewIcon, EditIcon, LinkIcon } from './icons/IconLibrary';

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
  const linkedExcellence = excellences.find(exc => exc.id === experience.excellence_id);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short'
    });
  };

  return (
    <div className="info-card">
      {/* Header */}
      <div className="card-header">
        <h3 className="card-title">
          {experience.title}
        </h3>
        <span className="card-meta">
          {formatDate(experience.date_experienced)}
        </span>
      </div>

      {/* Content */}
      <div className="card-content">
        {experience.description}
      </div>

      {/* Footer */}
      <div className="card-footer">
        <div className="card-tags">
          {experience.tags && experience.tags.length > 0 && (
            <>
              {experience.tags.slice(0, 2).map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))}
              {experience.tags.length > 2 && (
                <span className="tag gray">
                  +{experience.tags.length - 2}
                </span>
              )}
            </>
          )}
          {linkedExcellence && (
            <span className="excellence-tag" style={{ 
              backgroundColor: '#0195ee', 
              color: 'white' 
            }}>
              {linkedExcellence.name}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="card-actions">
          <button
            onClick={() => onView(experience)}
            className="btn-icon"
            title="Voir"
          >
            <ViewIcon size={14} />
          </button>
          <button
            onClick={() => onEdit(experience)}
            className="btn-icon"
            title="Éditer"
          >
            <EditIcon size={14} />
          </button>
          <button
            onClick={() => onLink(experience)}
            className="btn-icon"
            title="Lier"
          >
            <LinkIcon size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
