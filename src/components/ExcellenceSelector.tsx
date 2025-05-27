
import React, { useState, useMemo } from 'react';
import { Excellence, EXCELLENCE_CATEGORIES } from '../types';

interface ExcellenceSelectorProps {
  excellences: Excellence[];
  selectedExcellences: string[];
  onSelectionChange: (selected: string[]) => void;
  disabled?: boolean;
}

type SortOption = 'alphabetical' | 'usage' | 'recent';

export const ExcellenceSelector: React.FC<ExcellenceSelectorProps> = ({
  excellences,
  selectedExcellences,
  onSelectionChange,
  disabled = false
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});
  const [sortOptions, setSortOptions] = useState<Record<string, SortOption>>({
    manifestee: 'alphabetical',
    principe: 'alphabetical',
    quete: 'alphabetical'
  });

  // Grouper et filtrer les excellences par catégorie
  const categorizedExcellences = useMemo(() => {
    const filtered = excellences.filter(exc =>
      exc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exc.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const categorized = {
      principe: filtered.filter(exc => exc.category === 'principe'),
      manifestee: filtered.filter(exc => exc.category === 'manifestee'),
      quete: filtered.filter(exc => exc.category === 'quete')
    };

    // Trier chaque catégorie
    Object.keys(categorized).forEach(category => {
      const sortBy = sortOptions[category];
      categorized[category].sort((a, b) => {
        switch (sortBy) {
          case 'alphabetical':
            return a.name.localeCompare(b.name);
          case 'usage':
            // Simuler usage count basé sur l'id pour le tri
            return b.id.localeCompare(a.id);
          case 'recent':
            return b.created_at.localeCompare(a.created_at);
          default:
            return 0;
        }
      });
    });

    return categorized;
  }, [excellences, searchQuery, sortOptions]);

  const toggleExcellence = (excellenceId: string) => {
    if (disabled) return;
    const newSelected = selectedExcellences.includes(excellenceId)
      ? selectedExcellences.filter(id => id !== excellenceId)
      : [...selectedExcellences, excellenceId];
    onSelectionChange(newSelected);
  };

  const toggleCategory = (category: string) => {
    if (disabled) return;
    setCollapsedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const setSortOption = (category: string, sortBy: SortOption) => {
    if (disabled) return;
    setSortOptions(prev => ({
      ...prev,
      [category]: sortBy
    }));
  };

  const removeSelection = (excellenceId: string) => {
    if (disabled) return;
    onSelectionChange(selectedExcellences.filter(id => id !== excellenceId));
  };

  const selectedExcellenceObjects = excellences.filter(exc => 
    selectedExcellences.includes(exc.id)
  );

  return (
    <section 
      className={`p-8 rounded-lg transition-opacity ${disabled ? 'opacity-50 pointer-events-none' : ''}`} 
      style={{ backgroundColor: '#2a2a2a' }}
    >
      <h3 className="text-lg font-semibold mb-6" style={{ color: '#ee5a01' }}>
        ⭐ Excellences mobilisées
      </h3>

      {/* Recherche */}
      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => !disabled && setSearchQuery(e.target.value)}
          placeholder="🔍 Rechercher une excellence..."
          disabled={disabled}
          className="w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none"
          style={{
            backgroundColor: '#333',
            borderColor: '#555',
            color: 'white'
          }}
          onFocus={(e) => !disabled && (e.target as HTMLInputElement).style.borderColor = '#0195ee'}
          onBlur={(e) => !disabled && (e.target as HTMLInputElement).style.borderColor = '#555'}
        />
      </div>

      {/* Catégories */}
      <div className="space-y-6">
        {Object.entries(EXCELLENCE_CATEGORIES).map(([categoryKey, categoryInfo]) => {
          const categoryExcellences = categorizedExcellences[categoryKey] || [];
          const isCollapsed = collapsedCategories[categoryKey];

          return (
            <div key={categoryKey}>
              {/* Header de catégorie */}
              <div
                className={`flex items-center justify-between py-3 border-b ${disabled ? '' : 'cursor-pointer'}`}
                style={{ borderColor: '#555' }}
                onClick={() => toggleCategory(categoryKey)}
              >
                <div className="flex items-center gap-3">
                  <h4 className="text-base font-medium" style={{ color: '#0195ee' }}>
                    {categoryInfo.title}
                    <span 
                      className="ml-2 px-2 py-1 text-xs rounded"
                      style={{ 
                        backgroundColor: 'rgba(1,149,238,0.2)',
                        color: '#0195ee'
                      }}
                    >
                      {categoryExcellences.length}
                    </span>
                  </h4>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    value={sortOptions[categoryKey]}
                    onChange={(e) => setSortOption(categoryKey, e.target.value as SortOption)}
                    onClick={(e) => e.stopPropagation()}
                    disabled={disabled}
                    className="px-2 py-1 text-xs rounded border"
                    style={{
                      backgroundColor: '#333',
                      borderColor: '#555',
                      color: '#999'
                    }}
                  >
                    <option value="alphabetical">Alphabétique</option>
                    <option value="usage">Plus utilisées</option>
                    <option value="recent">Plus récentes</option>
                  </select>
                  <span style={{ color: '#999' }}>
                    {isCollapsed ? '▼' : '▲'}
                  </span>
                </div>
              </div>

              {/* Grid d'excellences */}
              {!isCollapsed && (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 mt-4">
                  {categoryExcellences.map((excellence) => {
                    const isSelected = selectedExcellences.includes(excellence.id);
                    
                    return (
                      <div
                        key={excellence.id}
                        onClick={() => toggleExcellence(excellence.id)}
                        className={`flex items-start gap-3 p-4 rounded-lg border-2 transition-all ${disabled ? '' : 'cursor-pointer'}`}
                        style={{
                          backgroundColor: isSelected ? 'rgba(1,149,238,0.1)' : '#333',
                          borderColor: isSelected ? '#0195ee' : '#555'
                        }}
                        onMouseEnter={(e) => {
                          if (!isSelected && !disabled) (e.target as HTMLDivElement).style.borderColor = '#0195ee';
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected && !disabled) (e.target as HTMLDivElement).style.borderColor = '#555';
                        }}
                      >
                        <div
                          className="flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center text-white text-xs"
                          style={{
                            backgroundColor: isSelected ? '#0195ee' : 'transparent',
                            borderColor: isSelected ? '#0195ee' : '#555'
                          }}
                        >
                          {isSelected && '✓'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="font-semibold text-sm" style={{ color: '#fff' }}>
                            {excellence.name}
                          </h5>
                          <p className="text-xs mt-1 line-clamp-2" style={{ color: '#999' }}>
                            {excellence.description}
                          </p>
                          <div className="text-xs mt-2" style={{ color: '#0195ee' }}>
                            Utilisée récemment
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Résumé des sélections */}
      {selectedExcellenceObjects.length > 0 && (
        <div
          className="mt-6 p-4 rounded-lg border"
          style={{
            backgroundColor: 'rgba(1,149,238,0.1)',
            borderColor: '#0195ee'
          }}
        >
          <h4 className="text-sm font-medium mb-3" style={{ color: '#0195ee' }}>
            Excellences sélectionnées ({selectedExcellenceObjects.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {selectedExcellenceObjects.map((excellence) => (
              <div
                key={excellence.id}
                className="flex items-center gap-2 px-3 py-1 rounded-full text-sm"
                style={{
                  backgroundColor: '#0195ee',
                  color: 'white'
                }}
              >
                {excellence.name}
                <button
                  onClick={() => removeSelection(excellence.id)}
                  disabled={disabled}
                  className="ml-1 hover:opacity-80 disabled:opacity-50"
                  style={{ color: 'white' }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
