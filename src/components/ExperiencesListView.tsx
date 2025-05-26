
import React from 'react';
import { Experience, Excellence, EXCELLENCE_CATEGORIES } from '../types';
import { Calendar, Star } from 'lucide-react';

interface ExperiencesListViewProps {
  experiences: Experience[];
  excellences: Excellence[];
}

export const ExperiencesListView: React.FC<ExperiencesListViewProps> = ({
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

  const getCategoryIconClass = (category: string) => {
    if (category === 'manifestee') return 'category-icon--manifestee';
    if (category === 'principe') return 'category-icon--principe';
    if (category === 'quete') return 'category-icon--quete';
    return 'category-icon--manifestee';
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
          Aucune expérience ne correspond aux critères sélectionnés
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
                          <div className="flex items-center">
                            <Star className={`category-icon ${getCategoryIconClass(excellence.category)} mr-2`} size={16} />
                            <span 
                              className="text-xs font-medium"
                              style={{ color: 'var(--text-secondary)' }}
                            >
                              {excellence.name}
                            </span>
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
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
