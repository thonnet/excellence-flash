
import React, { useState, useMemo } from 'react';
import { Excellence } from '../types';
import { ExcellenceSelector } from './ExcellenceSelector';
import { QuickTips } from './QuickTips';
import { ConsignerBasicInfo } from './forms/ConsignerBasicInfo';
import { AutoSuggestions } from './forms/AutoSuggestions';
import { ConsignerActions } from './forms/ConsignerActions';

interface ConsignerFormProps {
  excellences: Excellence[];
  onSave: (data: any) => void;
  onCancel: () => void;
  onChange?: () => void;
  disabled?: boolean;
}

export const ConsignerForm: React.FC<ConsignerFormProps> = ({
  excellences,
  onSave,
  onCancel,
  onChange,
  disabled = false
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dateExperienced, setDateExperienced] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [selectedExcellences, setSelectedExcellences] = useState<string[]>([]);

  // Auto-suggestions basées sur mots-clés
  const suggestions = useMemo(() => {
    const text = (title + ' ' + description).toLowerCase();
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
  }, [title, description, excellences]);

  const applySuggestion = (excellenceId: string) => {
    if (!selectedExcellences.includes(excellenceId)) {
      setSelectedExcellences(prev => [...prev, excellenceId]);
      onChange?.();
    }
  };

  const handleFieldChange = (field: string, value: any) => {
    switch (field) {
      case 'title':
        setTitle(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'date':
        setDateExperienced(value);
        break;
    }
    onChange?.();
  };

  const handleExcellenceSelectionChange = (newSelection: string[]) => {
    setSelectedExcellences(newSelection);
    onChange?.();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || disabled) return;

    const experienceData = {
      title: title.trim(),
      description: description.trim(),
      date_experienced: dateExperienced,
      excellence_id: selectedExcellences[0] || '', // Pour la compatibilité, prendre la première
      tags: []
    };

    onSave(experienceData);
  };

  const isFormValid = title.trim().length > 0 && selectedExcellences.length > 0;

  return (
    <div className="space-y-6">
      <ConsignerBasicInfo
        title={title}
        description={description}
        dateExperienced={dateExperienced}
        onTitleChange={(value) => handleFieldChange('title', value)}
        onDescriptionChange={(value) => handleFieldChange('description', value)}
        onDateChange={(value) => handleFieldChange('date', value)}
        onSubmit={handleSubmit}
        disabled={disabled}
      />

      <AutoSuggestions
        suggestions={suggestions}
        selectedExcellences={selectedExcellences}
        onApplySuggestion={applySuggestion}
      />

      <ExcellenceSelector
        excellences={excellences}
        selectedExcellences={selectedExcellences}
        onSelectionChange={handleExcellenceSelectionChange}
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
