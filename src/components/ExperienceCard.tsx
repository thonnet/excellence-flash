import React from 'react';
import { Experience, Excellence } from '../types';
import '../styles/experience-cards.css';

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
      month: 'short'
    });
  };

  return (
    <div className="experience-card-compact">
      {/* Header */}
      <div className="experience-header">
        <h3 className="experience-title">
          {experience.title}
        </h3>
        <span className="experience-date">
          {formatDate(experience.date_experienced)}
        </span>
      </div>

      {/* Content */}
      <div className="experience-content">
        <p className="experience-description">
          {experience.description}
        </p>
      </div>

      {/* Footer */}
      <div className="experience-footer">
        <div className="experience-tags">
          {experience.tags && experience.tags.length > 0 && (
            <>
              {experience.tags.slice(0, 2).map((tag, index) => (
                <span key={index} className="experience-tag">
                  {tag}
                </span>
              ))}
              {experience.tags.length > 2 && (
                <span className="experience-tag">
                  +{experience.tags.length - 2}
                </span>
              )}
            </>
          )}
          {linkedExcellence && (
            <span className="experience-tag" style={{ 
              backgroundColor: '#0195ee', 
              color: 'white' 
            }}>
              {linkedExcellence.name}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="experience-actions">
          <button
            onClick={() => onView(experience)}
            className="experience-action-btn"
            title="Voir"
          >
            👁
          </button>
          <button
            onClick={() => onEdit(experience)}
            className="experience-action-btn"
            title="Éditer"
          >
            ✏
          </button>
          <button
            onClick={() => onLink(experience)}
            className="experience-action-btn"
            title="Lier"
          >
            🔗
          </button>
        </div>
      </div>
    </div>
  );
};
