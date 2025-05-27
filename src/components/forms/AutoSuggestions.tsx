
import React from 'react';
import { Excellence } from '../../types';

interface AutoSuggestionsProps {
  suggestions: Excellence[];
  selectedExcellences: string[];
  onApplySuggestion: (excellenceId: string) => void;
}

export const AutoSuggestions: React.FC<AutoSuggestionsProps> = ({
  suggestions,
  selectedExcellences,
  onApplySuggestion
}) => {
  if (suggestions.length === 0) {
    return null;
  }

  return (
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
            onClick={() => onApplySuggestion(excellence.id)}
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
  );
};
