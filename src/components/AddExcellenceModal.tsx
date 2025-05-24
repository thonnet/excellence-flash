
import React, { useState, useEffect } from 'react';
import { Excellence } from '../types';
import { EXCELLENCE_CATEGORIES } from '../types';
import { X } from 'lucide-react';

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#2a2a3e] rounded-xl max-w-md w-full border border-white/10">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h3 className="text-lg font-semibold text-white">
            Nouvelle Excellence
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nom de l'excellence *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Communication empathique, Leadership collaboratif..."
              className="w-full px-3 py-2 bg-[#1a1a2e] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0195ee]/50"
              required
              autoFocus
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
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
                    style={{ accentColor: cat.color }}
                  />
                  <div>
                    <div className="text-sm font-medium" style={{ color: cat.color }}>
                      {cat.title}
                    </div>
                    <div className="text-xs text-gray-400">
                      {cat.description}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description (optionnelle)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décrivez cette excellence, comment vous la manifestez..."
              rows={3}
              className="w-full px-3 py-2 bg-[#1a1a2e] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0195ee]/50 resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="px-4 py-2 bg-[#0195ee] text-white rounded-lg hover:bg-[#0175bb] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Créer l'excellence
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
