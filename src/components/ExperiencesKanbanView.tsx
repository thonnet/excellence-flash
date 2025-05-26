
import React from 'react';
import { Excellence, Experience } from '../types';
import { EXCELLENCE_CATEGORIES } from '../types';
import { Star } from 'lucide-react';

interface ExperiencesKanbanViewProps {
  experiences: Experience[];
  excellences: Excellence[];
}

export const ExperiencesKanbanView: React.FC<ExperiencesKanbanViewProps> = ({
  experiences,
  excellences
}) => {
  const getExcellenceCategory = (excellenceId: string) => {
    const excellence = excellences.find(exc => exc.id === excellenceId);
    return excellence?.category || 'manifestee';
  };

  const getExperiencesByCategory = (category: string) => {
    return experiences.filter(exp => {
      const excellence = excellences.find(exc => exc.id === exp.excellence_id);
      return excellence?.category === category;
    });
  };

  const getCategoryIconClass = (category: string) => {
    if (category === 'manifestee') return 'category-icon--manifestee';
    if (category === 'principe') return 'category-icon--principe';
    if (category === 'quete') return 'category-icon--quete';
    return 'category-icon--manifestee';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="experiences-grid">
      {Object.entries(EXCELLENCE_CATEGORIES).map(([categoryKey, category]) => {
        const categoryExperiences = getExperiencesByCategory(categoryKey);
        
        return (
          <div key={categoryKey} className="category-column">
            <div className="category-header">
              <h3 className="font-bold text-lg flex items-center" style={{ color: 'var(--text-primary)' }}>
                <Star className={`category-icon ${getCategoryIconClass(categoryKey)} mr-2`} size={16} />
                <span className="font-bold">{category.title}</span>
                <span className="font-normal ml-2" style={{ color: 'var(--text-secondary)' }}>
                  {categoryExperiences.length}
                </span>
              </h3>
            </div>

            <div className="experiences-list">
              {categoryExperiences.length === 0 ? (
                <div className="text-center py-8" style={{ color: 'var(--text-muted)' }}>
                  <p className="text-sm">Aucune expérience pour cette catégorie</p>
                </div>
              ) : (
                categoryExperiences.map(experience => {
                  const excellence = excellences.find(exc => exc.id === experience.excellence_id);
                  
                  return (
                    <div 
                      key={experience.id}
                      className="p-4 border rounded-lg mb-3"
                      style={{
                        backgroundColor: 'var(--bg-primary)',
                        borderColor: 'var(--border-subtle)'
                      }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
                          {experience.title}
                        </h4>
                        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                          {formatDate(experience.date_experienced)}
                        </span>
                      </div>
                      
                      {excellence && (
                        <div className="flex items-center mb-2">
                          <Star className={`category-icon ${getCategoryIconClass(excellence.category)} mr-1`} size={12} />
                          <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                            {excellence.name}
                          </span>
                        </div>
                      )}
                      
                      <p className="text-xs line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                        {experience.description}
                      </p>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
