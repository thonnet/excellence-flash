import React, { useState, useMemo, useEffect, useRef } from 'react';
import { ExperiencePageLayout } from './ExperiencePageLayout';
import { ExperienceHeader } from './ExperienceHeader';
import { ExperiencesFilters } from './ExperiencesFilters';
import { ExperiencesGrid } from './ExperiencesGrid';
import { ExperienceDetailModal } from './ExperienceDetailModal';
import { ExperienceEditModal } from './ExperienceEditModal';
import { ExperienceLinkModal } from './ExperienceLinkModal';
import { ExperienceStatusBar } from './ExperienceStatusBar';
import { LoadingSpinner, SkeletonCard } from './LoadingSpinner';
import { useExperiences } from '../hooks/useExperiences';
import { useExcellences } from '../hooks/useExcellences';
import { useDebounce } from '../hooks/useDebounce';
import { KeyboardShortcuts } from '../utils/keyboardShortcuts';
import { Experience } from '../types';

// Import modular CSS files - removed non-existent files
import '../styles/experience-filters.css';
import '../styles/experience-grid.css';
import '../styles/experience-responsive.css';

interface ExplorerExperiencesProps {
  onModeChange: (mode: 'explorer' | 'consigner') => void;
}

export const ExplorerExperiences: React.FC<ExplorerExperiencesProps> = ({ onModeChange }) => {
  const { experiences, isLoading } = useExperiences();
  const { excellences, updateExcellence } = useExcellences();
  
  // États des filtres avec optimisations
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExcellences, setSelectedExcellences] = useState<string[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  
  // États des modales
  const [detailModal, setDetailModal] = useState<{ isOpen: boolean; experience: Experience | null }>({
    isOpen: false,
    experience: null
  });
  const [editModal, setEditModal] = useState<{ isOpen: boolean; experience: Experience | null }>({
    isOpen: false,
    experience: null
  });
  const [linkModal, setLinkModal] = useState<{ isOpen: boolean; experience: Experience | null }>({
    isOpen: false,
    experience: null
  });

  // Debounced search pour optimiser les performances
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Refs pour focus management
  const pageRef = useRef<HTMLDivElement>(null);
  const keyboardShortcuts = useRef<KeyboardShortcuts | null>(null);

  const isModalOpen = detailModal.isOpen || editModal.isOpen || linkModal.isOpen;

  // Initialisation raccourcis clavier
  useEffect(() => {
    keyboardShortcuts.current = new KeyboardShortcuts({
      currentMode: 'explorer',
      isModalOpen,
      canSave: false,
      onNavigateToConsigner: () => onModeChange('consigner'),
      onNavigateToExplorer: () => onModeChange('explorer'),
      onSave: () => {},
      onCloseModal: () => {
        if (detailModal.isOpen) setDetailModal({ isOpen: false, experience: null });
        if (editModal.isOpen) setEditModal({ isOpen: false, experience: null });
        if (linkModal.isOpen) setLinkModal({ isOpen: false, experience: null });
      }
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

  // Enhanced filter tracking for status bar
  const getActiveFilters = () => {
    const filters: string[] = [];
    
    if (debouncedSearchQuery.trim()) {
      filters.push(`Recherche: "${debouncedSearchQuery}"`);
    }
    
    if (selectedExcellences.length > 0) {
      const excellenceNames = selectedExcellences
        .map(id => excellences.find(exc => exc.id === id)?.name)
        .filter(Boolean);
      filters.push(`Excellences: ${excellenceNames.join(', ')}`);
    }
    
    if (selectedPeriod !== 'all') {
      const periodLabels = {
        'today': 'Aujourd\'hui',
        'week': 'Cette semaine', 
        'month': 'Ce mois',
        'quarter': 'Ce trimestre'
      };
      filters.push(`Période: ${periodLabels[selectedPeriod as keyof typeof periodLabels] || selectedPeriod}`);
    }
    
    return filters;
  };

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
    console.log('Ouvrir détail expérience:', experience.title);
    setDetailModal({ isOpen: true, experience });
  };

  const handleEdit = (experience: Experience) => {
    console.log('Éditer expérience:', experience.title);
    setEditModal({ isOpen: true, experience });
  };

  const handleLink = (experience: Experience) => {
    console.log('Lier expérience:', experience.title);
    setLinkModal({ isOpen: true, experience });
  };

  const handleSaveEdit = (id: string, updates: Partial<Experience>) => {
    console.log('Sauvegarder modifications expérience:', id, updates);
    // TODO: Implémenter la sauvegarde des modifications d'expérience
    // Cette fonctionnalité nécessitera une mutation dans useExperiences
  };

  const handleLinkExperience = (experienceId: string, excellenceId: string) => {
    console.log('Lier expérience à excellence:', experienceId, excellenceId);
    // TODO: Implémenter le lien expérience-excellence
    // Cette fonctionnalité nécessitera une mutation dans useExperiences
  };

  const isFiltered = debouncedSearchQuery.trim() !== '' || selectedExcellences.length > 0 || selectedPeriod !== 'all';

  // Loading state with skeleton
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
      <div ref={pageRef} className="fade-in h-full flex flex-col">
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

        <div className="flex-1 flex flex-col min-h-0">
          <ExperiencesGrid
            experiences={filteredExperiences}
            excellences={excellences}
            onView={handleView}
            onEdit={handleEdit}
            onLink={handleLink}
            onConsigner={() => onModeChange('consigner')}
            isFiltered={isFiltered}
          />
          
          <ExperienceStatusBar
            totalCount={experiences.length}
            filteredCount={filteredExperiences.length}
            activeFilters={getActiveFilters()}
          />
        </div>

        {/* Modales */}
        {detailModal.experience && (
          <ExperienceDetailModal
            experience={detailModal.experience}
            excellences={excellences}
            isOpen={detailModal.isOpen}
            onClose={() => setDetailModal({ isOpen: false, experience: null })}
          />
        )}

        {editModal.experience && (
          <ExperienceEditModal
            experience={editModal.experience}
            excellences={excellences}
            isOpen={editModal.isOpen}
            onClose={() => setEditModal({ isOpen: false, experience: null })}
            onSave={handleSaveEdit}
          />
        )}

        {linkModal.experience && (
          <ExperienceLinkModal
            experience={linkModal.experience}
            excellences={excellences}
            isOpen={linkModal.isOpen}
            onClose={() => setLinkModal({ isOpen: false, experience: null })}
            onLink={handleLinkExperience}
          />
        )}
      </div>
    </ExperiencePageLayout>
  );
};
