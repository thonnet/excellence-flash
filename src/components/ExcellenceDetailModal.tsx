
import React from 'react';
import { Excellence, Experience } from '../types';
import { EXCELLENCE_CATEGORIES } from '../types';
import { X, Calendar, Tag } from 'lucide-react';

interface ExcellenceDetailModalProps {
  excellence: Excellence;
  experiences: Experience[];
  isOpen: boolean;
  onClose: () => void;
}

export const ExcellenceDetailModal: React.FC<ExcellenceDetailModalProps> = ({
  excellence,
  experiences,
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const category = EXCELLENCE_CATEGORIES[excellence.category];
  const relatedExperiences = experiences.filter(exp => exp.excellence_id === excellence.id);

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
        className="max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-lg border"
        style={{ 
          backgroundColor: 'var(--bg-secondary)',
          borderColor: 'var(--border-subtle)'
        }}
      >
        {/* Header */}
        <div 
          className="flex items-center justify-between p-6 border-b"
          style={{ borderColor: 'var(--border-subtle)' }}
        >
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              {excellence.name}
            </h2>
            <div 
              className="inline-block px-3 py-1 rounded text-sm font-medium"
              style={{
                backgroundColor: category.bgColor,
                color: category.color
              }}
            >
              {category.title}
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

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          {excellence.description && (
            <div>
              <h3 className="text-lg font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
                Description
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {excellence.description}
              </p>
            </div>
          )}

          {/* Expériences associées */}
          <div>
            <h3 className="text-lg font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
              Expériences associées ({relatedExperiences.length})
            </h3>
            
            {relatedExperiences.length > 0 ? (
              <div className="space-y-3">
                {relatedExperiences.map(experience => (
                  <div 
                    key={experience.id}
                    className="p-4 rounded-lg border"
                    style={{ 
                      backgroundColor: 'var(--bg-tertiary)',
                      borderColor: 'var(--border-subtle)'
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium" style={{ color: 'var(--text-primary)' }}>
                        {experience.title}
                      </h4>
                      <div className="flex items-center space-x-1 text-xs" style={{ color: 'var(--text-muted)' }}>
                        <Calendar size={12} />
                        <span>{formatDate(experience.date_experienced)}</span>
                      </div>
                    </div>
                    
                    {experience.description && (
                      <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
                        {experience.description}
                      </p>
                    )}
                    
                    {experience.tags.length > 0 && (
                      <div className="flex items-center space-x-2">
                        <Tag size={12} style={{ color: 'var(--text-muted)' }} />
                        <div className="flex flex-wrap gap-1">
                          {experience.tags.map(tag => (
                            <span 
                              key={tag}
                              className="px-2 py-1 text-xs rounded"
                              style={{ 
                                backgroundColor: 'var(--bg-hover)',
                                color: 'var(--text-muted)'
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Aucune expérience associée pour le moment.
              </p>
            )}
          </div>

          {/* Métadonnées */}
          <div 
            className="pt-4 border-t"
            style={{ borderColor: 'var(--border-subtle)' }}
          >
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Créée le :</span>
                <span className="ml-2" style={{ color: 'var(--text-secondary)' }}>
                  {formatDate(excellence.created_at)}
                </span>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Modifiée le :</span>
                <span className="ml-2" style={{ color: 'var(--text-secondary)' }}>
                  {formatDate(excellence.updated_at)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
