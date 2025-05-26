
import React, { useState, useMemo } from 'react';
import { Experience, Excellence } from '../types';
import { EXCELLENCE_CATEGORIES } from '../types';
import { Calendar, Tag } from 'lucide-react';
import { isToday, isThisWeek, isThisMonth, isThisYear } from 'date-fns';

interface ExperiencesDisplayProps {
  experiences: Experience[];
  excellences: Excellence[];
  viewMode: 'list' | 'gallery';
}

type SortType = 'today' | 'week' | 'month' | 'year' | 'category' | 'title';
type CategoryFilter = 'all' | 'manifestee' | 'principe' | 'quete';

export const ExperiencesDisplay: React.FC<ExperiencesDisplayProps> = ({
  experiences,
  excellences,
  viewMode
}) => {
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [sortType, setSortType] = useState<SortType>('today');

  // Get category for an experience
  const getExperienceCategory = (experience: Experience): string => {
    const excellence = excellences.find(exc => exc.id === experience.excellence_id);
    return excellence?.category || '';
  };

  // Filter and sort experiences
  const filteredAndSortedExperiences = useMemo(() => {
    let filtered = experiences;

    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = experiences.filter(exp => {
        const category = getExperienceCategory(exp);
        return category === categoryFilter;
      });
    }

    // Apply sorting
    switch (sortType) {
      case 'today':
        filtered = filtered.filter(exp => isToday(new Date(exp.date_experienced)));
        break;
      case 'week':
        filtered = filtered.filter(exp => isThisWeek(new Date(exp.date_experienced)));
        break;
      case 'month':
        filtered = filtered.filter(exp => isThisMonth(new Date(exp.date_experienced)));
        break;
      case 'year':
        filtered = filtered.filter(exp => isThisYear(new Date(exp.date_experienced)));
        break;
      case 'category':
        filtered = filtered.sort((a, b) => {
          const catA = getExperienceCategory(a);
          const catB = getExperienceCategory(b);
          return catA.localeCompare(catB);
        });
        break;
      case 'title':
        filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return filtered;
  }, [experiences, excellences, categoryFilter, sortType]);

  const sortButtons = [
    { id: 'today' as SortType, label: '📅 Aujourd\'hui' },
    { id: 'week' as SortType, label: '📅 Cette semaine' },
    { id: 'month' as SortType, label: '📅 Ce mois' },
    { id: 'year' as SortType, label: '📅 Cette année' },
    { id: 'category' as SortType, label: '🏷️ Catégorie' },
    { id: 'title' as SortType, label: '🔤 Titre A-Z' }
  ];

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="controls-bar">
        <div className="filter-section">
          <span className="filter-label">Filtrer par catégorie :</span>
          <select 
            className="category-filter"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as CategoryFilter)}
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '6px',
              padding: '8px 12px',
              marginLeft: '12px'
            }}
          >
            <option value="all">Toutes les catégories</option>
            <option value="manifestee">Excellence manifestée</option>
            <option value="principe">Principe d'excellence</option>
            <option value="quete">Quête d'excellence</option>
          </select>
        </div>
        
        <div className="sort-section">
          <span className="filter-label">Trier par :</span>
          <div className="sort-buttons">
            {sortButtons.map((button) => (
              <button
                key={button.id}
                className={`sort-btn ${sortType === button.id ? 'active' : ''}`}
                onClick={() => setSortType(button.id)}
              >
                {button.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Display Mode */}
      {viewMode === 'list' ? (
        <ExperiencesList experiences={filteredAndSortedExperiences} excellences={excellences} />
      ) : (
        <ExperiencesKanban experiences={filteredAndSortedExperiences} excellences={excellences} />
      )}
    </div>
  );
};

const ExperiencesKanban: React.FC<{ experiences: Experience[]; excellences: Excellence[] }> = ({
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

  const getCategoryIcon = (category: string) => {
    const iconColor = category === 'manifestee' ? '#8B9657' : 
                      category === 'principe' ? '#A7C7E7' : 
                      category === 'quete' ? '#FFB366' : '#999999';
    
    return (
      <Tag 
        size={16}
        style={{ 
          color: iconColor,
          marginRight: '8px'
        }}
      />
    );
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
                  {getCategoryIcon(category)}
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

  const getCategoryIcon = (category: string) => {
    const iconColor = category === 'manifestee' ? '#8B9657' : 
                      category === 'principe' ? '#A7C7E7' : 
                      category === 'quete' ? '#FFB366' : '#999999';
    
    return (
      <Tag 
        size={16}
        style={{ 
          color: iconColor,
          marginRight: '8px'
        }}
      />
    );
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
                            {getCategoryIcon(excellence.category)}
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
