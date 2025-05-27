
import { useState, useEffect } from 'react';

interface FilterState {
  searchQuery: string;
  selectedExcellences: string[];
  selectedPeriod: string;
}

const FILTER_STORAGE_KEY = 'experiences_filters';

export const useFilterPersistence = () => {
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    selectedExcellences: [],
    selectedPeriod: 'all'
  });

  // Charger les filtres depuis le localStorage au démarrage
  useEffect(() => {
    try {
      const savedFilters = localStorage.getItem(FILTER_STORAGE_KEY);
      if (savedFilters) {
        const parsed = JSON.parse(savedFilters);
        setFilters(parsed);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des filtres:', error);
    }
  }, []);

  // Sauvegarder les filtres dans le localStorage
  const saveFilters = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    
    try {
      localStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify(updatedFilters));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des filtres:', error);
    }
  };

  // Effacer tous les filtres
  const clearFilters = () => {
    const defaultFilters: FilterState = {
      searchQuery: '',
      selectedExcellences: [],
      selectedPeriod: 'all'
    };
    setFilters(defaultFilters);
    
    try {
      localStorage.removeItem(FILTER_STORAGE_KEY);
    } catch (error) {
      console.error('Erreur lors de l\'effacement des filtres:', error);
    }
  };

  return {
    filters,
    saveFilters,
    clearFilters,
    updateSearchQuery: (searchQuery: string) => saveFilters({ searchQuery }),
    updateSelectedExcellences: (selectedExcellences: string[]) => saveFilters({ selectedExcellences }),
    updateSelectedPeriod: (selectedPeriod: string) => saveFilters({ selectedPeriod })
  };
};
