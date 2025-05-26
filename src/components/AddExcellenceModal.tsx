
import React, { useState, useEffect } from 'react';
import { Excellence } from '../types';
import { EXCELLENCE_CATEGORIES } from '../types';
import { X, Star } from 'lucide-react';

interface AddExcellenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (excellence: Omit<Excellence, 'id' | 'created_at' | 'updated_at'>) => void;
  preselectedCategory?: 'manifestee' | 'principe' | 'quete' | null;
}

export const AddExcellenceModal: React.FC<AddExcellenceModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  preselectedCategory
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'manifestee' | 'principe' | 'quete'>('manifestee');

  useEffect(() => {
    if (preselectedCategory) {
      setCategory(preselectedCategory);
    }
  }, [preselectedCategory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) return;

    onAdd({
      user_id: 'current-user', // This would come from auth context
      name: name.trim(),
      description: description.trim(),
      category
    });

    // Reset form
    setName('');
    setDescription('');
    setCategory('manifestee');
    onClose();
  };

  const getCategoryIcon = (categoryKey: string) => {
    const iconColor = categoryKey === 'manifestee' ? '#8B9657' : 
                      categoryKey === 'principe' ? '#A7C7E7' : 
                      categoryKey === 'quete' ? '#FFB366' : '#999999';
    
    return (
      <Star 
        size={16}
        style={{ 
          color: iconColor,
          marginRight: '8px'
        }}
      />
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div 
        className="rounded-xl max-w-md w-full border"
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
          <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
            Nouvelle Excellence
          </h3>
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
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
              Nom de l'excellence *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Communication empathique, Leadership collaboratif..."
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-primary)'
              }}
              required
              autoFocus
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
              Catégorie
            </label>
            <div className="space-y-2">
              {Object.entries(EXCELLENCE_CATEGORIES).map(([key, cat]) => (
                <label key={key} className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value={key}
                    checked={category === key}
                    onChange={(e) => setCategory(e.target.value as 'manifestee' | 'principe' | 'quete')}
                    className="mt-1"
                    style={{ accentColor: '#ee5a01' }}
                  />
                  <div>
                    <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                      {getCategoryIcon(key)}
                      <span className="ml-2">{cat.title}</span>
                    </div>
                    <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {cat.description}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
              Description (optionnelle)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décrivez cette excellence, comment vous la manifestez..."
              rows={3}
              className="w-full px-3 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-primary)'
              }}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 transition-colors"
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-secondary)';
              }}
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="px-4 py-2 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#ee5a01' }}
              onMouseEnter={(e) => {
                if (!e.currentTarget.disabled) {
                  e.currentTarget.style.backgroundColor = '#d14d01';
                }
              }}
              onMouseLeave={(e) => {
                if (!e.currentTarget.disabled) {
                  e.currentTarget.style.backgroundColor = '#ee5a01';
                }
              }}
            >
              Créer l'excellence
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
