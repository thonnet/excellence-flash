
import React, { useState } from 'react';
import { Experience, Excellence } from '../types';
import { X, Search } from 'lucide-react';

interface ExperienceLinkModalProps {
  experience: Experience;
  excellences: Excellence[];
  isOpen: boolean;
  onClose: () => void;
  onLink: (experienceId: string, excellenceId: string) => void;
}

export const ExperienceLinkModal: React.FC<ExperienceLinkModalProps> = ({
  experience,
  excellences,
  isOpen,
  onClose,
  onLink
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExcellence, setSelectedExcellence] = useState(experience.excellence_id);

  if (!isOpen) return null;

  const filteredExcellences = excellences.filter(exc =>
    exc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exc.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedExcellence) {
      onLink(experience.id, selectedExcellence);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        className="max-w-lg w-full max-h-[90vh] overflow-hidden rounded-lg border"
        style={{ 
          backgroundColor: 'var(--bg-secondary)',
          borderColor: 'var(--border-subtle)'
        }}
      >
        {/* Header */}
        <div 
          className="flex items-center justify-between p-6 border-b"
          style={{ borderColor: 'var(--border-subtle)' }}
        >
          <div>
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Lier une excellence
            </h2>
            <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
              {experience.title}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg transition-colors"
            style={{ 
              color: 'var(--text-secondary)',
              backgroundColor: 'transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Recherche */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                Rechercher une excellence
              </label>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: 'var(--text-secondary)' }} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--text-primary)'
                  }}
                  placeholder="Rechercher par nom ou description..."
                />
              </div>
            </div>

            {/* Liste des excellences */}
            <div>
              <label className="block text-sm font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
                Sélectionner une excellence
              </label>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                <div
                  onClick={() => setSelectedExcellence('')}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                    selectedExcellence === '' ? 'border-blue-500 bg-blue-500/10' : 'border-gray-600 hover:border-gray-500'
                  }`}
                  style={{
                    backgroundColor: selectedExcellence === '' ? 'rgba(1,149,238,0.1)' : 'var(--bg-tertiary)',
                    borderColor: selectedExcellence === '' ? '#0195ee' : 'var(--border-subtle)'
                  }}
                >
                  <span style={{ color: 'var(--text-primary)' }}>
                    Aucune excellence (retirer le lien)
                  </span>
                </div>
                {filteredExcellences.map(excellence => (
                  <div
                    key={excellence.id}
                    onClick={() => setSelectedExcellence(excellence.id)}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                      selectedExcellence === excellence.id ? 'border-blue-500 bg-blue-500/10' : 'border-gray-600 hover:border-gray-500'
                    }`}
                    style={{
                      backgroundColor: selectedExcellence === excellence.id ? 'rgba(1,149,238,0.1)' : 'var(--bg-tertiary)',
                      borderColor: selectedExcellence === excellence.id ? '#0195ee' : 'var(--border-subtle)'
                    }}
                  >
                    <h4 className="font-medium" style={{ color: 'var(--text-primary)' }}>
                      {excellence.name}
                    </h4>
                    {excellence.description && (
                      <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                        {excellence.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 border rounded-lg transition-colors"
                style={{
                  borderColor: 'var(--border-medium)',
                  color: 'var(--text-secondary)',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                Annuler
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-3 text-white rounded-lg transition-colors"
                style={{ 
                  backgroundColor: '#0195ee'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#0178cc';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#0195ee';
                }}
              >
                Lier
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
