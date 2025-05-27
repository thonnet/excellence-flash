
import React, { useState, useMemo } from 'react';
import { Excellence } from '../types';
import { ExcellenceSelector } from './ExcellenceSelector';
import { QuickTips } from './QuickTips';

interface ConsignerFormProps {
  excellences: Excellence[];
  onSave: (data: any) => void;
  onCancel: () => void;
}

export const ConsignerForm: React.FC<ConsignerFormProps> = ({
  excellences,
  onSave,
  onCancel
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
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const experienceData = {
      title: title.trim(),
      description: description.trim(),
      date_experienced: dateExperienced,
      excellence_id: selectedExcellences[0] || '', // Pour la compatibilité, prendre la première
      tags: []
    };

    onSave(experienceData);
  };

  const isFormValid = title.trim().length > 0;

  return (
    <div className="space-y-6">
      {/* Section Informations de Base */}
      <section 
        className="p-8 rounded-lg"
        style={{ backgroundColor: '#2a2a2a' }}
      >
        <h3 className="text-lg font-semibold mb-6" style={{ color: '#ee5a01' }}>
          📝 Informations de base
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#ccc' }}>
              Titre de l'expérience <span style={{ color: '#ee5a01' }}>*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Présentation client réussie, Discussion enrichissante..."
              className="w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none"
              style={{
                backgroundColor: '#333',
                borderColor: '#555',
                color: 'white'
              }}
              onFocus={(e) => (e.target as HTMLInputElement).style.borderColor = '#ee5a01'}
              onBlur={(e) => (e.target as HTMLInputElement).style.borderColor = '#555'}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#ccc' }}>
              Description détaillée
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décrivez ce que vous avez vécu, appris, les défis relevés..."
              rows={5}
              maxLength={500}
              className="w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none resize-none"
              style={{
                backgroundColor: '#333',
                borderColor: '#555',
                color: 'white'
              }}
              onFocus={(e) => (e.target as HTMLTextAreaElement).style.borderColor = '#ee5a01'}
              onBlur={(e) => (e.target as HTMLTextAreaElement).style.borderColor = '#555'}
            />
            <div className="text-right text-xs mt-1" style={{ color: '#999' }}>
              {description.length} / 500 caractères
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#ccc' }}>
              Date de l'expérience
            </label>
            <input
              type="date"
              value={dateExperienced}
              onChange={(e) => setDateExperienced(e.target.value)}
              className="px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none"
              style={{
                backgroundColor: '#333',
                borderColor: '#555',
                color: 'white'
              }}
              onFocus={(e) => (e.target as HTMLInputElement).style.borderColor = '#ee5a01'}
              onBlur={(e) => (e.target as HTMLInputElement).style.borderColor = '#555'}
            />
          </div>
        </form>
      </section>

      {/* Auto-suggestions */}
      {suggestions.length > 0 && (
        <section 
          className="p-4 rounded-lg border"
          style={{ 
            backgroundColor: 'rgba(238,90,1,0.1)',
            borderColor: '#ee5a01'
          }}
        >
          <h4 className="text-sm font-medium mb-3" style={{ color: '#ee5a01' }}>
            🤖 Suggestions basées sur votre description
          </h4>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((excellence) => (
              <button
                key={excellence.id}
                onClick={() => applySuggestion(excellence.id)}
                className="px-3 py-1 rounded-full text-sm font-medium transition-colors"
                style={{
                  backgroundColor: selectedExcellences.includes(excellence.id) ? '#0195ee' : '#ee5a01',
                  color: 'white'
                }}
              >
                {excellence.name}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Sélection des Excellences */}
      <ExcellenceSelector
        excellences={excellences}
        selectedExcellences={selectedExcellences}
        onSelectionChange={setSelectedExcellences}
      />

      {/* Quick Tips */}
      <QuickTips />

      {/* Actions */}
      <section className="text-center py-8 border-t" style={{ borderColor: '#333' }}>
        <button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className="px-8 py-4 rounded-lg text-lg font-semibold mr-4 transition-colors"
          style={{
            backgroundColor: isFormValid ? '#ee5a01' : '#555',
            color: isFormValid ? 'white' : '#999',
            cursor: isFormValid ? 'pointer' : 'not-allowed'
          }}
          onMouseEnter={(e) => {
            if (isFormValid) (e.target as HTMLButtonElement).style.backgroundColor = '#d44f01';
          }}
          onMouseLeave={(e) => {
            if (isFormValid) (e.target as HTMLButtonElement).style.backgroundColor = '#ee5a01';
          }}
        >
          💾 Enregistrer l'expérience
        </button>

        <button
          onClick={onCancel}
          className="px-8 py-4 rounded-lg border-2 transition-colors"
          style={{
            backgroundColor: 'transparent',
            borderColor: '#555',
            color: '#999'
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLButtonElement).style.borderColor = '#999';
            (e.target as HTMLButtonElement).style.color = 'white';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLButtonElement).style.borderColor = '#555';
            (e.target as HTMLButtonElement).style.color = '#999';
          }}
        >
          ❌ Annuler
        </button>
      </section>
    </div>
  );
};
