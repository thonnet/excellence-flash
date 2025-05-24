
import React, { useState } from 'react';
import { Experience, Excellence } from '../types';
import { EXCELLENCE_CATEGORIES } from '../types';
import { Calendar, Tag, List, Image as ImageIcon } from 'lucide-react';

interface ExperiencesDisplayProps {
  experiences: Experience[];
  excellences: Excellence[];
}

export const ExperiencesDisplay: React.FC<ExperiencesDisplayProps> = ({
  experiences,
  excellences
}) => {
  const [viewMode, setViewMode] = useState<'list' | 'gallery'>('list');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getExcellenceForExperience = (experienceId: string) => {
    const experience = experiences.find(exp => exp.id === experienceId);
    if (!experience) return null;
    return excellences.find(exc => exc.id === experience.excellence_id);
  };

  return (
    <div className="space-y-6">
      {/* View Toggle */}
      <div className="flex items-center space-x-3">
        <button
          onClick={() => setViewMode('list')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            viewMode === 'list' ? 'nav-item-active' : 'nav-item'
          }`}
        >
          <List size={16} />
          <span>Liste</span>
        </button>
        <button
          onClick={() => setViewMode('gallery')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            viewMode === 'gallery' ? 'nav-item-active' : 'nav-item'
          }`}
        >
          <ImageIcon size={16} />
          <span>Galerie</span>
        </button>
      </div>

      {/* Display Mode */}
      {viewMode === 'list' ? (
        <ExperiencesList experiences={experiences} excellences={excellences} />
      ) : (
        <ExperiencesGallery experiences={experiences} excellences={excellences} />
      )}
    </div>
  );
};

const ExperiencesList: React.FC<{ experiences: Experience[]; excellences: Excellence[] }> = ({
  experiences,
  excellences
}) => {
  // Group experiences by date
  const groupedExperiences = experiences.reduce((groups, experience) => {
    const date = experience.date_experienced;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(experience);
    return groups;
  }, {} as Record<string, Experience[]>);

  const sortedDates = Object.keys(groupedExperiences).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (sortedDates.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'var(--bg-secondary)' }}>
          <Calendar style={{ color: 'var(--text-muted)' }} size={24} />
        </div>
        <h3 className="text-lg font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
          Aucune expérience
        </h3>
        <p style={{ color: 'var(--text-muted)' }} className="mb-4">
          Commencez à documenter vos expériences d'excellence
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {sortedDates.map(date => (
        <div key={date} className="space-y-3">
          {/* Date Header */}
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--gauge-blue)' }} />
            <h3 className="text-lg font-medium" style={{ color: 'var(--text-primary)' }}>
              {formatDate(date)}
            </h3>
            <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border-subtle)' }} />
            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
              {groupedExperiences[date].length} expérience{groupedExperiences[date].length !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Experiences for this date */}
          <div className="space-y-3 ml-6">
            {groupedExperiences[date].map(experience => {
              const excellence = excellences.find(exc => exc.id === experience.excellence_id);
              const category = excellence ? EXCELLENCE_CATEGORIES[excellence.category] : null;

              return (
                <div 
                  key={experience.id} 
                  className="rounded-lg p-4 border"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)',
                    borderColor: 'var(--border-subtle)'
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                        {experience.title}
                      </h4>
                      {excellence && (
                        <div className="flex items-center space-x-2">
                          <div 
                            className="px-2 py-1 rounded text-xs font-medium"
                            style={{
                              backgroundColor: category?.bgColor,
                              color: category?.color
                            }}
                          >
                            {excellence.name}
                          </div>
                        </div>
                      )}
                    </div>
                    {experience.image_url && (
                      <img
                        src={experience.image_url}
                        alt={experience.image_caption || experience.title}
                        className="w-16 h-16 object-cover rounded ml-4"
                      />
                    )}
                  </div>

                  {experience.description && (
                    <p className="text-sm mb-3 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {experience.description}
                    </p>
                  )}

                  {experience.image_caption && (
                    <p className="text-xs mb-3 italic" style={{ color: 'var(--text-muted)' }}>
                      {experience.image_caption}
                    </p>
                  )}

                  {experience.tags.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <Tag size={14} style={{ color: 'var(--text-muted)' }} />
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
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

const ExperiencesGallery: React.FC<{ experiences: Experience[]; excellences: Excellence[] }> = ({
  experiences,
  excellences
}) => {
  return (
    <div className="experiences-gallery">
      {experiences.map(experience => {
        const excellence = excellences.find(exc => exc.id === experience.excellence_id);

        return (
          <div key={experience.id} className="gallery-item">
            {experience.image_url ? (
              <img src={experience.image_url} alt={experience.image_caption || experience.title} />
            ) : (
              <div className="no-image-placeholder">📄</div>
            )}
            <div className="gallery-overlay">
              <h4 className="font-medium mb-1">{experience.title}</h4>
              {excellence && (
                <p className="text-sm opacity-90 mb-2">{excellence.name}</p>
              )}
              <p className="text-sm opacity-75">
                {experience.description?.substring(0, 100)}
                {experience.description && experience.description.length > 100 ? '...' : ''}
              </p>
            </div>
          </div>
        );
      })}
      
      {experiences.length === 0 && (
        <div className="col-span-full text-center py-12">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <ImageIcon style={{ color: 'var(--text-muted)' }} size={24} />
          </div>
          <h3 className="text-lg font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
            Aucune expérience
          </h3>
          <p style={{ color: 'var(--text-muted)' }}>
            Ajoutez vos premières expériences pour les voir ici
          </p>
        </div>
      )}
    </div>
  );
};
