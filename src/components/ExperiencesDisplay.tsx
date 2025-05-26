
import React, { useState, useMemo } from 'react';
import { Experience, Excellence } from '../types';
import { isToday, isThisWeek, isThisMonth, isThisYear } from 'date-fns';
import { ExperiencesControlsBar } from './ExperiencesControlsBar';
import { ExperiencesListView } from './ExperiencesListView';
import { ExperiencesKanbanView } from './ExperiencesKanbanView';
import type { UserDisplay } from '../types/userDisplay';

type ExperienceViewMode = 'grid' | 'kanban';
type SortType = 'today' | 'week' | 'month' | 'year' | 'category' | 'title';
type CategoryFilter = 'all' | 'manifestee' | 'principe' | 'quete';

interface ExperiencesDisplayProps {
  experienceViewMode: ExperienceViewMode;
  setExperienceViewMode: (mode: ExperienceViewMode) => void;
  excellences: Excellence[];
  experiences: Experience[];
  user: UserDisplay;
  onAddExcellence: (excellence: Omit<Excellence, 'id' | 'created_at' | 'updated_at'>) => void;
  onUpdateExcellence: (id: string, updates: Partial<Excellence>) => void;
  onDeleteExcellence: (id: string) => void;
  getExperienceCount: (excellenceId: string) => number;
  setIsExperienceFormOpen: (open: boolean) => void;
  isAdminMode: boolean;
}

export const ExperiencesDisplay: React.FC<ExperiencesDisplayProps> = ({
  experienceViewMode,
  setExperienceViewMode,
  experiences,
  excellences,
  user,
  onAddExcellence,
  onUpdateExcellence,
  onDeleteExcellence,
  getExperienceCount,
  setIsExperienceFormOpen,
  isAdminMode
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

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <ExperiencesControlsBar
        categoryFilter={categoryFilter}
        sortType={sortType}
        onCategoryChange={setCategoryFilter}
        onSortChange={setSortType}
      />

      {/* Display Mode */}
      {experienceViewMode === 'grid' ? (
        <ExperiencesListView experiences={filteredAndSortedExperiences} excellences={excellences} />
      ) : (
        <ExperiencesKanbanView experiences={filteredAndSortedExperiences} excellences={excellences} />
      )}
    </div>
  );
};
