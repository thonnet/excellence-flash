
import { useState } from 'react';
import { Excellence, Experience, User } from '../types';
import { mockExcellences, mockExperiences, mockUser } from '../data/mockData';

type ViewType = 'kanban' | 'list' | 'observatoire' | 'experiences';
type ExperienceViewMode = 'grid' | 'kanban';

export const useAppState = () => {
  const [currentView, setCurrentView] = useState<ViewType>('kanban');
  const [experienceViewMode, setExperienceViewMode] = useState<ExperienceViewMode>('grid');
  const [excellences, setExcellences] = useState<Excellence[]>(mockExcellences);
  const [experiences, setExperiences] = useState<Experience[]>(mockExperiences);
  const [user, setUser] = useState<User>({...mockUser, role: 'admin'});
  const [searchQuery, setSearchQuery] = useState('');
  const [isExperienceFormOpen, setIsExperienceFormOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);

  const filteredExcellences = excellences.filter(excellence => 
    excellence.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    excellence.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddExcellence = (excellence: Omit<Excellence, 'id' | 'created_at' | 'updated_at'>) => {
    const newExcellence: Excellence = {
      ...excellence,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setExcellences(prev => [...prev, newExcellence]);
  };

  const handleUpdateExcellence = (id: string, updates: Partial<Excellence>) => {
    setExcellences(prev => prev.map(excellence => 
      excellence.id === id 
        ? { ...excellence, ...updates, updated_at: new Date().toISOString() }
        : excellence
    ));
  };

  const handleDeleteExcellence = (id: string) => {
    setExcellences(prev => prev.filter(excellence => excellence.id !== id));
    setExperiences(prev => prev.filter(experience => experience.excellence_id !== id));
  };

  const handleAddExperience = (experience: Omit<Experience, 'id' | 'created_at' | 'updated_at'>) => {
    const newExperience: Experience = {
      ...experience,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setExperiences(prev => [...prev, newExperience]);
  };

  const getExperienceCount = (excellenceId: string) => {
    return experiences.filter(exp => exp.excellence_id === excellenceId).length;
  };

  const handleImportData = (importedExcellences: Excellence[], importedExperiences: Experience[]) => {
    const newExcellences = [...excellences];
    const newExperiences = [...experiences];

    importedExcellences.forEach(importedExc => {
      if (!newExcellences.find(exc => exc.id === importedExc.id)) {
        newExcellences.push(importedExc);
      }
    });

    importedExperiences.forEach(importedExp => {
      if (!newExperiences.find(exp => exp.id === importedExp.id)) {
        newExperiences.push(importedExp);
      }
    });

    setExcellences(newExcellences);
    setExperiences(newExperiences);
    
    console.log(`Importé: ${importedExcellences.length} excellences, ${importedExperiences.length} expériences`);
  };

  const handleExportData = () => {
    console.log('Export data triggered');
  };

  return {
    // States
    currentView,
    experienceViewMode,
    excellences,
    experiences,
    user,
    searchQuery,
    isExperienceFormOpen,
    isImportModalOpen,
    isSearchFocused,
    isAdminMode,
    filteredExcellences,
    
    // Setters
    setCurrentView,
    setExperienceViewMode,
    setUser,
    setSearchQuery,
    setIsExperienceFormOpen,
    setIsImportModalOpen,
    setIsSearchFocused,
    setIsAdminMode,
    
    // Handlers
    handleAddExcellence,
    handleUpdateExcellence,
    handleDeleteExcellence,
    handleAddExperience,
    getExperienceCount,
    handleImportData,
    handleExportData,
  };
};
