
import React, { useState, useMemo } from 'react';
import { ExperiencePageLayout } from './ExperiencePageLayout';
import { ExperienceHeader } from './ExperienceHeader';
import { ExperiencesFilters } from './ExperiencesFilters';
import { ExperiencesGrid } from './ExperiencesGrid';
import { ExperienceDetailModal } from './ExperienceDetailModal';
import { ConfirmationModal } from './ConfirmationModal';
import { ToastNotification } from './ToastNotification';
import { useExperiences } from '../hooks/useExperiences';
import { useExcellences } from '../hooks/useExcellences';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { useFilterPersistence } from '../hooks/useFilterPersistence';
import { useToastNotification } from '../hooks/useToastNotification';
import { Experience } from '../types';

interface ExplorerExperiencesProps {
  onModeChange: (mode: 'explorer' | 'consigner') => void;
}

export const ExplorerExperiences: React.FC<ExplorerExperiencesProps> = ({ onModeChange }) => {
  const { experiences, refetch } = useExperiences();
  const { excellences } = useExcellences();
  const { filters, updateSearchQuery, updateSelectedExcellences, updateSelectedPeriod, clearFilters } = useFilterPersistence();
  const { toasts, showSuccess, showError, hideToast } = useToastNotification();
  
  // États des modales
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [experienceToDelete, setExperienceToDelete] = useState<Experience | null>(null);

  // Logique de filtrage avec persistance
  const filteredExperiences = useMemo(() => {
    let filtered = [...experiences];

    // Filtre de recherche
    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(exp => 
        exp.title.toLowerCase().includes(query) ||
        exp.description.toLowerCase().includes(query) ||
        excellences.find(exc => exc.id === exp.excellence_id)?.name.toLowerCase().includes(query)
      );
    }

    // Filtre par excellences
    if (filters.selectedExcellences.length > 0) {
      filtered = filtered.filter(exp => 
        filters.selectedExcellences.includes(exp.excellence_id)
      );
    }

    // Filtre temporel
    if (filters.selectedPeriod !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (filters.selectedPeriod) {
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
  }, [experiences, excellences, filters]);

  // Gestion des actions sur expériences
  const handleView = (experience: Experience) => {
    setSelectedExperience(experience);
    setShowDetailModal(true);
  };

  const handleEdit = (experience: Experience) => {
    // TODO: Implémenter navigation vers consigner avec pré-remplissage
    onModeChange('consigner');
    showSuccess('Ouverture du mode édition...');
  };

  const handleLink = (experience: Experience) => {
    // TODO: Implémenter fonctionnalité de liaison
    showSuccess('Fonctionnalité de liaison à venir...');
  };

  const handleDeleteRequest = (experience: Experience) => {
    setExperienceToDelete(experience);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirm = async () => {
    if (experienceToDelete) {
      try {
        // TODO: Implémenter suppression réelle
        showSuccess('Expérience supprimée avec succès');
        setShowDeleteConfirmation(false);
        setExperienceToDelete(null);
        refetch();
      } catch (error) {
        showError('Erreur lors de la suppression');
      }
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirmation(false);
    setExperienceToDelete(null);
  };

  // Raccourcis clavier
  useKeyboardShortcuts({
    onNewExperience: () => onModeChange('consigner'),
    onFocusSearch: () => {
      const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
      if (searchInput) searchInput.focus();
    },
    onEscape: () => {
      if (showDetailModal) {
        setShowDetailModal(false);
        setSelectedExperience(null);
      }
    }
  });

  // Gestion des filtres
  const handleExcellenceToggle = (excellenceId: string) => {
    const newSelection = filters.selectedExcellences.includes(excellenceId)
      ? filters.selectedExcellences.filter(id => id !== excellenceId)
      : [...filters.selectedExcellences, excellenceId];
    updateSelectedExcellences(newSelection);
  };

  const handleClearFilters = () => {
    clearFilters();
    showSuccess('Filtres effacés');
  };

  const isFiltered = filters.searchQuery.trim() !== '' || 
                    filters.selectedExcellences.length > 0 || 
                    filters.selectedPeriod !== 'all';

  const selectedExcellence = selectedExperience 
    ? excellences.find(exc => exc.id === selectedExperience.excellence_id)
    : undefined;

  return (
    <>
      <ExperiencePageLayout>
        <ExperienceHeader mode="explorer" onModeChange={onModeChange} />
        
        <ExperiencesFilters
          searchQuery={filters.searchQuery}
          onSearchChange={updateSearchQuery}
          selectedExcellences={filters.selectedExcellences}
          onExcellenceToggle={handleExcellenceToggle}
          selectedPeriod={filters.selectedPeriod}
          onPeriodChange={updateSelectedPeriod}
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
          onDelete={handleDeleteRequest}
          onConsigner={() => onModeChange('consigner')}
          isFiltered={isFiltered}
        />
      </ExperiencePageLayout>

      {/* Modal de détail */}
      {selectedExperience && (
        <ExperienceDetailModal
          experience={selectedExperience}
          excellence={selectedExcellence}
          isOpen={showDetailModal}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedExperience(null);
          }}
          onEdit={handleEdit}
          onLink={handleLink}
          onDelete={handleDeleteRequest}
        />
      )}

      {/* Modal de confirmation de suppression */}
      <ConfirmationModal
        isOpen={showDeleteConfirmation}
        title="Supprimer cette expérience ?"
        message="Cette action est irréversible. L'expérience sera définitivement supprimée."
        confirmText="Supprimer"
        cancelText="Annuler"
        variant="danger"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />

      {/* Notifications toast */}
      {toasts.map((toast) => (
        <ToastNotification
          key={toast.id}
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={() => hideToast(toast.id)}
        />
      ))}
    </>
  );
};
