
import React, { useState, useEffect } from 'react';
import { Experience, Excellence } from '../types';
import { X } from 'lucide-react';

interface ExperienceEditModalProps {
  experience: Experience;
  excellences: Excellence[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, updates: Partial<Experience>) => void;
}

export const ExperienceEditModal: React.FC<ExperienceEditModalProps> = ({
  experience,
  excellences,
  isOpen,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    excellence_id: '',
    date_experienced: '',
    tags: [] as string[]
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        title: experience.title,
        description: experience.description,
        excellence_id: experience.excellence_id,
        date_experienced: experience.date_experienced,
        tags: experience.tags || []
      });
    }
  }, [experience, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim()) {
      onSave(experience.id, {
        title: formData.title.trim(),
        description: formData.description.trim(),
        excellence_id: formData.excellence_id,
        date_experienced: formData.date_experienced,
        tags: formData.tags
      });
      onClose();
    }
  };

  const handleChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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
          <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Modifier l'expérience
          </h2>
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

        {/* Form - Scrollable */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Titre */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                Titre de l'expérience
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--text-primary)'
                }}
                placeholder="Titre de votre expérience..."
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-vertical"
                style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--text-primary)'
                }}
                placeholder="Décrivez votre expérience..."
              />
            </div>

            {/* Excellence */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                Excellence associée
              </label>
              <select
                value={formData.excellence_id}
                onChange={(e) => handleChange('excellence_id', e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--text-primary)'
                }}
              >
                <option value="">Aucune excellence sélectionnée</option>
                {excellences.map(excellence => (
                  <option key={excellence.id} value={excellence.id}>
                    {excellence.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                Date de l'expérience
              </label>
              <input
                type="date"
                value={formData.date_experienced}
                onChange={(e) => handleChange('date_experienced', e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--text-primary)'
                }}
              />
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
                  backgroundColor: 'var(--accent-orange)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--active-orange-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--accent-orange)';
                }}
              >
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
