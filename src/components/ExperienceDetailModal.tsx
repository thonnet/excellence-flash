
import React from 'react';
import { Experience, Excellence } from '../types';
import { X, Calendar, Tag, Star } from 'lucide-react';

interface ExperienceDetailModalProps {
  experience: Experience;
  excellences: Excellence[];
  isOpen: boolean;
  onClose: () => void;
}

export const ExperienceDetailModal: React.FC<ExperienceDetailModalProps> = ({
  experience,
  excellences,
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const linkedExcellence = excellences.find(exc => exc.id === experience.excellence_id);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        className="max-w-2xl w-full max-h-[90vh] overflow-hidden rounded-lg border"
        style={{ 
          backgroundColor: 'var(--bg-secondary)',
          borderColor: 'var(--border-subtle)'
        }}
      >
        {/* Header */}
        <div className="p-6 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                {experience.title}
              </h2>
              <div className="flex items-center space-x-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <div className="flex items-center space-x-1">
                  <Calendar size={14} />
                  <span>{formatDate(experience.date_experienced)}</span>
                </div>
                {linkedExcellence && (
                  <div className="flex items-center space-x-1">
                    <Star size={14} />
                    <span>{linkedExcellence.name}</span>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg transition-colors"
              style={{ 
                color: 'var(--text-secondary)',
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Description */}
          {experience.description && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
                Description
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {experience.description}
              </p>
            </div>
          )}

          {/* Excellence liée */}
          {linkedExcellence && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
                Excellence mobilisée
              </h3>
              <div 
                className="p-4 rounded-lg border"
                style={{
                  backgroundColor: 'rgba(1,149,238,0.1)',
                  borderColor: '#0195ee'
                }}
              >
                <h4 className="font-medium" style={{ color: '#0195ee' }}>
                  {linkedExcellence.name}
                </h4>
                {linkedExcellence.description && (
                  <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
                    {linkedExcellence.description}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Tags */}
          {experience.tags && experience.tags.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {experience.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="flex items-center space-x-1 px-3 py-1 text-sm rounded-full"
                    style={{
                      backgroundColor: '#333',
                      color: '#ccc'
                    }}
                  >
                    <Tag size={12} />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
