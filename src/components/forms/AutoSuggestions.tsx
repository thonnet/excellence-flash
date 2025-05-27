
import React from 'react';
import { Excellence } from '../../types';

interface AutoSuggestionsProps {
  suggestions: Excellence[];
  selectedExcellences: string[];
  onApplySuggestion: (excellenceId: string) => void;
  disabled?: boolean;
}

export const AutoSuggestions: React.FC<AutoSuggestionsProps> = ({
  suggestions,
  selectedExcellences,
  onApplySuggestion,
  disabled = false
}) => {
  if (suggestions.length === 0) {
    return null;
  }

  return (
    <section 
      className={`p-4 rounded-lg border smooth-element transition-opacity ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
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
            onClick={() => !disabled && onApplySuggestion(excellence.id)}
            disabled={disabled}
            className="button-press px-3 py-1 rounded-full text-sm font-medium transition-all disabled:cursor-not-allowed interactive-element"
            style={{
              backgroundColor: selectedExcellences.includes(excellence.id) ? '#0195ee' : '#ee5a01',
              color: 'white',
              opacity: disabled ? 0.6 : 1
            }}
          >
            {excellence.name}
          </button>
        ))}
      </div>
    </section>
  );
};
