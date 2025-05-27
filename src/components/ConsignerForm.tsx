
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Excellence } from '../types';
import { ExcellenceSelector } from './ExcellenceSelector';
import { QuickTips } from './QuickTips';
import { ConsignerBasicInfo } from './forms/ConsignerBasicInfo';
import { AutoSuggestions } from './forms/AutoSuggestions';
import { ConsignerActions } from './forms/ConsignerActions';
import { useDebounce } from '../hooks/useDebounce';

interface ConsignerFormProps {
  excellences: Excellence[];
  onSave: (data: any) => void;
  onCancel: () => void;
  disabled?: boolean;
  onValidityChange?: (isValid: boolean) => void;
  onSaveRef?: (saveFunction: () => void) => void;
}

export const ConsignerForm: React.FC<ConsignerFormProps> = ({
  excellences,
  onSave,
  onCancel,
  disabled = false,
  onValidityChange,
  onSaveRef
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dateExperienced, setDateExperienced] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [selectedExcellences, setSelectedExcellences] = useState<string[]>([]);

  // Debounced values pour optimiser les suggestions
  const debouncedTitle = useDebounce(title, 300);
  const debouncedDescription = useDebounce(description, 300);

  // Auto-suggestions basées sur mots-clés avec debouncing
  const suggestions = useMemo(() => {
    const text = (debouncedTitle + ' ' + debouncedDescription).toLowerCase();
    const suggestionRules = {
      'présent|client|parler|communication': ['Communication', 'Persuasion'],
      'créa|innov|idée|solution': ['Inventivité', 'Innovation'],
      'stratégi|plan|vision': ['Strategic thinking', 'Leadership'],
      'équipe|groupe|diriger': ['Leadership', 'Communication'],
      'négoci|accord|discussion': ['Négociation', 'Communication'],
      'perfect|amélio|qualité': ['Perfectionnisme', 'Dépassement'],
      'nommer|mot|désign': ['Nommer']
    };

    const suggestedNames = new Set<string>();
    Object.entries(suggestionRules).forEach(([keywords, names]) => {
      const regex = new RegExp(keywords, 'i');
      if (regex.test(text)) {
        names.forEach(name => suggestedNames.add(name));
      }
    });

    return Array.from(suggestedNames)
      .map(name => excellences.find(exc => exc.name.toLowerCase().includes(name.toLowerCase())))
      .filter(Boolean) as Excellence[];
  }, [debouncedTitle, debouncedDescription, excellences]);

  const applySuggestion = useCallback((excellenceId: string) => {
    if (!selectedExcellences.includes(excellenceId)) {
      setSelectedExcellences(prev => [...prev, excellenceId]);
    }
  }, [selectedExcellences]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || disabled) return;

    const experienceData = {
      title: title.trim(),
      description: description.trim(),
      date_experienced: dateExperienced,
      excellence_id: selectedExcellences[0] || '',
      tags: []
    };

    onSave(experienceData);
  }, [title, description, dateExperienced, selectedExcellences, onSave, disabled]);

  const isFormValid = title.trim().length > 0 && !disabled;

  // Notification de validité du formulaire
  useEffect(() => {
    onValidityChange?.(isFormValid);
  }, [isFormValid, onValidityChange]);

  // Référence de la fonction de sauvegarde pour les raccourcis clavier
  useEffect(() => {
    onSaveRef?.(() => {
      if (isFormValid) {
        handleSubmit({ preventDefault: () => {} } as React.FormEvent);
      }
    });
  }, [handleSubmit, isFormValid, onSaveRef]);

  return (
    <div className={`space-y-6 transition-opacity ${disabled ? 'opacity-70' : ''}`}>
      <ConsignerBasicInfo
        title={title}
        description={description}
        dateExperienced={dateExperienced}
        onTitleChange={setTitle}
        onDescriptionChange={setDescription}
        onDateChange={setDateExperienced}
        onSubmit={handleSubmit}
        disabled={disabled}
      />

      <AutoSuggestions
        suggestions={suggestions}
        selectedExcellences={selectedExcellences}
        onApplySuggestion={applySuggestion}
        disabled={disabled}
      />

      <ExcellenceSelector
        excellences={excellences}
        selectedExcellences={selectedExcellences}
        onSelectionChange={setSelectedExcellences}
        disabled={disabled}
      />

      <QuickTips />

      <ConsignerActions
        isFormValid={isFormValid}
        onSubmit={() => handleSubmit({ preventDefault: () => {} } as React.FormEvent)}
        onCancel={onCancel}
        disabled={disabled}
      />
    </div>
  );
};
