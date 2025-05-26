
import React from 'react';
import { Excellence, Experience, EXCELLENCE_CATEGORIES } from '../types';
import { Star, Calendar } from 'lucide-react';

interface ExperiencesKanbanViewProps {
  experiences: Experience[];
  excellences: Excellence[];
}

export const ExperiencesKanbanView: React.FC<ExperiencesKanbanViewProps> = ({
  experiences,
  excellences
}) => {
  const categories = ['manifestee', 'principe', 'quete'] as const;

  const groupExperiencesByCategory = () => {
    const groups = {
      manifestee: [] as Experience[],
      principe: [] as Experience[],
      quete: [] as Experience[]
    };

    experiences.forEach(experience => {
      const excellence = excellences.find(exc => exc.id === experience.excellence_id);
      if (excellence && excellence.category in groups) {
        groups[excellence.category as keyof typeof groups].push(experience);
      }
    });

    return groups;
  };

  const groupedExperiences = groupExperiencesByCategory();

  const getCategoryIconClass = (category: string) => {
    if (category === 'manifestee') return 'category-icon--manifestee';
    if (category === 'principe') return 'category-icon--principe';
    if (category === 'quete') return 'category-icon--quete';
    return 'category-icon--manifestee';
  };

  if (experiences.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'var(--bg-secondary)' }}>
          <Calendar style={{ color: 'var(--text-muted)' }} size={24} />
        </div>
        <h3 className="text-lg font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
          Aucune expérience
        </h3>
        <p style={{ color: 'var(--text-muted)' }}>
          Aucune expérience ne correspond aux critères sélectionnés
        </p>
      </div>
    );
  }

  return (
    <div className="experiences-grid">
      {categories.map(category => {
        const categoryData = EXCELLENCE_CATEGORIES[category];
        const categoryExperiences = groupedExperiences[category];

        return (
          <div key={category} className="category-column">
            <div className="category-header" style={{ marginBottom: '16px' }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Star className={`category-icon ${getCategoryIconClass(category)} mr-2`} size={16} />
                  <h3 className="font-medium" style={{ color: 'var(--text-primary)' }}>
                    {categoryData.title}
                  </h3>
                </div>
                <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  {categoryExperiences.length} expérience{categoryExperiences.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
            
            <div className="experiences-list">
              {categoryExperiences.map(experience => (
                <div 
                  key={experience.id} 
                  className="rounded-lg p-3 mb-3 border"
                  style={{ 
                    backgroundColor: 'var(--bg-primary)',
                    borderColor: 'var(--border-subtle)'
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
                      {experience.title}
                    </h4>
                    {experience.image_url && (
                      <img
                        src={experience.image_url}
                        alt={experience.image_caption || experience.title}
                        className="w-12 h-12 object-cover rounded ml-3"
                      />
                    )}
                  </div>
                  
                  <p className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>
                    {new Date(experience.date_experienced).toLocaleDateString('fr-FR')}
                  </p>
                  
                  {experience.description && (
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {experience.description.substring(0, 100)}
                      {experience.description.length > 100 ? '...' : ''}
                    </p>
                  )}
                </div>
              ))}
              
              {categoryExperiences.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    Aucune expérience dans cette catégorie
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
