
import React, { useState, useEffect } from 'react';
import { Excellence } from '../types';
import { EXCELLENCE_CATEGORIES } from '../types';
import { X } from 'lucide-react';

interface ExcellenceEditModalProps {
  excellence: Excellence;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, updates: Partial<Excellence>) => void;
}

export const ExcellenceEditModal: React.FC<ExcellenceEditModalProps> = ({
  excellence,
  isOpen,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'manifestee' as 'manifestee' | 'principe' | 'quete'
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: excellence.name,
        description: excellence.description,
        category: excellence.category
      });
    }
  }, [excellence, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onSave(excellence.id, {
        name: formData.name.trim(),
        description: formData.description.trim(),
        category: formData.category
      });
      onClose();
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        className="max-w-lg w-full rounded-lg border"
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
            Modifier l'excellence
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Nom */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
              Nom de l'excellence
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-primary)'
              }}
              placeholder="Donnez un nom à votre excellence..."
              required
            />
          </div>

          {/* Catégorie */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
              Catégorie
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-primary)'
              }}
            >
              {Object.entries(EXCELLENCE_CATEGORIES).map(([key, category]) => (
                <option key={key} value={key}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
              Description (optionnelle)
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
              placeholder="Décrivez cette excellence, son contexte, ses manifestations..."
            />
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
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
  );
};
