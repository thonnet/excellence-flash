
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { ExperiencePageLayout } from './ExperiencePageLayout';
import { ExperienceHeader } from './ExperienceHeader';
import { ExperiencesFilters } from './ExperiencesFilters';
import { ExperiencesGrid } from './ExperiencesGrid';
import { LoadingSpinner, SkeletonCard } from './LoadingSpinner';
import { useExperiences } from '../hooks/useExperiences';
import { useExcellences } from '../hooks/useExcellences';
import { useDebounce } from '../hooks/useDebounce';
import { KeyboardShortcuts } from '../utils/keyboardShortcuts';
import { Experience } from '../types';

interface ExplorerExperiencesProps {
  onModeChange: (mode: 'explorer' | 'consigner') => void;
}

export const ExplorerExperiences: React.FC<ExplorerExperiencesProps> = ({ onModeChange }) => {
  const { experiences, isLoading } = useExperiences();
  const { excellences } = useExcellences();
  
  // États des filtres avec optimisations
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExcellences, setSelectedExcellences] = useState<string[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Debounced search pour optimiser les performances
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Refs pour focus management
  const pageRef = useRef<HTMLDivElement>(null);
  const keyboardShortcuts = useRef<KeyboardShortcuts | null>(null);

  // Initialisation raccourcis clavier
  useEffect(() => {
    keyboardShortcuts.current = new KeyboardShortcuts({
      currentMode: 'explorer',
      isModalOpen,
      canSave: false,
      onNavigateToConsigner: () => onModeChange('consigner'),
      onNavigateToExplorer: () => onModeChange('explorer'),
      onSave: () => {},
      onCloseModal: () => setIsModalOpen(false)
    });

    keyboardShortcuts.current.activate();

    return () => {
      keyboardShortcuts.current?.deactivate();
    };
  }, [onModeChange, isModalOpen]);

  // Mise à jour du contexte des raccourcis
  useEffect(() => {
    keyboardShortcuts.current?.updateContext({
      isModalOpen
    });
  }, [isModalOpen]);

  // Logique de filtrage optimisée
  const filteredExperiences = useMemo(() => {
    let filtered = [...experiences];

    // Filtre de recherche avec debounce
    if (debouncedSearchQuery.trim()) {
      const query = debouncedSearchQuery.toLowerCase();
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
  }, [experiences, excellences, debouncedSearchQuery, selectedExcellences, selectedPeriod]);

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
    setIsModalOpen(true);
  };

  const handleEdit = (experience: Experience) => {
    console.log('Éditer expérience:', experience);
    setIsModalOpen(true);
  };

  const handleLink = (experience: Experience) => {
    console.log('Lier expérience:', experience);
  };

  const handleDelete = (experience: Experience) => {
    console.log('Supprimer expérience:', experience);
  };

  const isFiltered = debouncedSearchQuery.trim() !== '' || selectedExcellences.length > 0 || selectedPeriod !== 'all';

  // Loading state avec skeleton
  if (isLoading) {
    return (
      <ExperiencePageLayout>
        <ExperienceHeader mode="explorer" onModeChange={onModeChange} />
        <div className="space-y-6">
          <SkeletonCard className="h-16" />
          <div className="grid grid-cols-1 gap-4">
            {[...Array(3)].map((_, i) => (
              <SkeletonCard key={i} className="h-32" />
            ))}
          </div>
        </div>
      </ExperiencePageLayout>
    );
  }

  return (
    <ExperiencePageLayout>
      <div ref={pageRef} className="fade-in">
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
          onDelete={handleDelete}
          onConsigner={() => onModeChange('consigner')}
          isFiltered={isFiltered}
        />
      </div>
    </ExperiencePageLayout>
  );
};
