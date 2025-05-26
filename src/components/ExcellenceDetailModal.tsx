
import React from 'react';
import { Excellence, Experience } from '../types';
import { EXCELLENCE_CATEGORIES } from '../types';
import { X, Calendar, Star } from 'lucide-react';

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

  // Fonction corrigée pour déterminer la classe CSS selon la catégorie
  const getCategoryClass = (category: string) => {
    if (category === 'manifestee') return 'category-icon--manifestee';
    if (category === 'principe') return 'category-icon--principe';
    if (category === 'quete') return 'category-icon--quete';
    return '';
  };

  const getCategoryIcon = () => {
    const iconColor = excellence.category === 'manifestee' ? '#8B9657' : 
                      excellence.category === 'principe' ? '#A7C7E7' : 
                      excellence.category === 'quete' ? '#FFB366' : '#999999';
    
    return (
      <Star 
        size={18}
        className="category-tag__icon"
        style={{ 
          color: iconColor,
          marginRight: '8px'
        }}
      />
    );
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
        {/* Excellence Header - Fixed */}
        <div className="excellence-header">
          <div className="excellence-title">
            <span>{excellence.name}</span>
            <div className="excellence-dates">
              <div>Créée le : {formatDate(excellence.created_at)}</div>
              <div>Modifiée le : {formatDate(excellence.updated_at)}</div>
            </div>
          </div>
          
          <div className="excellence-category">
            <div className={`category-tag category-tag--${excellence.category}`}>
              {getCategoryIcon()}
              <span className="category-tag__text">{category.title}</span>
            </div>
          </div>

          {excellence.description && (
            <div className={`excellence-description category-${excellence.category}`}>
              {excellence.description}
            </div>
          )}

          <div className="excellence-separator"></div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg transition-colors"
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

        {/* Experiences Section - Scrollable */}
        <div className="experiences-section">
          <h3 className="experiences-title">
            Expériences d'amplification associées
            <span className="experiences-count">{relatedExperiences.length}</span>
          </h3>
          
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
                    <div className="flex items-center space-x-1 text-xs experience-date">
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
      </div>
    </div>
  );
};
