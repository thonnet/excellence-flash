
import React, { useState, useMemo } from 'react';
import { ExperiencePageLayout } from './ExperiencePageLayout';
import { ExperienceHeader } from './ExperienceHeader';
import { ExperiencesFilters } from './ExperiencesFilters';
import { ExperiencesGrid } from './ExperiencesGrid';
import { useExperiences } from '../hooks/useExperiences';
import { useExcellences } from '../hooks/useExcellences';
import { Experience } from '../types';

interface ExplorerExperiencesProps {
  onModeChange: (mode: 'explorer' | 'consigner') => void;
}

export const ExplorerExperiences: React.FC<ExplorerExperiencesProps> = ({ onModeChange }) => {
  const { experiences } = useExperiences();
  const { excellences } = useExcellences();
  
  // États des filtres
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExcellences, setSelectedExcellences] = useState<string[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState('all');

  // Logique de filtrage
  const filteredExperiences = useMemo(() => {
    let filtered = [...experiences];

    // Filtre de recherche
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(exp => 
        exp.title.toLowerCase().includes(query) ||
        exp.description.toLowerCase().includes(query) ||
        excellences.find(exc => exc.id === exp.excellence_id)?.name.toLowerCase().includes(query)
      );
    }

    // Filtre par excellences
    if (selectedExcellences.length > 0) {
      filtered = filtered.filter(exp => 
        selectedExcellences.includes(exp.excellence_id)
      );
    }

    // Filtre temporel
    if (selectedPeriod !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (selectedPeriod) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case 'quarter':
          filterDate.setMonth(now.getMonth() - 3);
          break;
      }
      
      filtered = filtered.filter(exp => 
        new Date(exp.date_experienced) >= filterDate
      );
    }

    return filtered;
  }, [experiences, excellences, searchQuery, selectedExcellences, selectedPeriod]);

  const handleExcellenceToggle = (excellenceId: string) => {
    setSelectedExcellences(prev => 
      prev.includes(excellenceId)
        ? prev.filter(id => id !== excellenceId)
        : [...prev, excellenceId]
    );
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedExcellences([]);
    setSelectedPeriod('all');
  };

  const handleView = (experience: Experience) => {
    console.log('Voir expérience:', experience);
    // TODO: Implémenter modal de détail
  };

  const handleEdit = (experience: Experience) => {
    console.log('Éditer expérience:', experience);
    // TODO: Implémenter modal d'édition
  };

  const handleLink = (experience: Experience) => {
    console.log('Lier expérience:', experience);
    // TODO: Implémenter fonctionnalité de liaison
  };

  const isFiltered = searchQuery.trim() !== '' || selectedExcellences.length > 0 || selectedPeriod !== 'all';

  return (
    <ExperiencePageLayout>
      <ExperienceHeader mode="explorer" onModeChange={onModeChange} />
      
      <ExperiencesFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedExcellences={selectedExcellences}
        onExcellenceToggle={handleExcellenceToggle}
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
        excellences={excellences}
        onClearFilters={handleClearFilters}
        experienceCount={filteredExperiences.length}
      />

      <ExperiencesGrid
        experiences={filteredExperiences}
        excellences={excellences}
        onView={handleView}
        onEdit={handleEdit}
        onLink={handleLink}
        onConsigner={() => onModeChange('consigner')}
        isFiltered={isFiltered}
      />
    </ExperiencePageLayout>
  );
};
