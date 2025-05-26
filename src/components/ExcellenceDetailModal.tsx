
import React from 'react';
import { Excellence, Experience } from '../types';
import { EXCELLENCE_CATEGORIES } from '../types';
import { X, Calendar } from 'lucide-react';

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

  const getCategoryIcon = () => {
    return <span className={`category-icon ${excellence.category}`}>🏷️</span>;
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
            <div className="flex items-center">
              {getCategoryIcon()}
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {category.title}
              </span>
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
              <div 
                className={`excellence-description category-${excellence.category}`}
                style={{ 
                  color: 'var(--text-secondary)',
                  lineHeight: '1.5',
                  paddingLeft: '15px',
                  borderLeft: `3px solid var(--category-color)`
                }}
              >
                {excellence.description}
              </div>
            </div>
          )}

          {/* Expériences associées */}
          <div>
            <div className="flex items-baseline mb-3">
              <h3 className="experiences-title">
                Expériences d'amplification associées
              </h3>
              <span className="experiences-count">
                {relatedExperiences.length}
              </span>
            </div>
            
            {relatedExperiences.length > 0 ? (
              <div className="space-y-3">
                {relatedExperiences.map(experience => (
                  <div 
                    key={experience.id}
                    className="p-4 rounded-lg border"
                    style={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      borderColor: '#444444'
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
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        {experience.description}
                      </p>
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
