
import React, { useState } from 'react';
import { Experience, Excellence } from '../types';
import { Upload, X } from 'lucide-react';

interface ExperienceFormProps {
  excellences: Excellence[];
  onAdd: (experience: Omit<Experience, 'id' | 'created_at' | 'updated_at'>) => void;
  onClose: () => void;
}

export const ExperienceForm: React.FC<ExperienceFormProps> = ({
  excellences,
  onAdd,
  onClose
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [excellenceId, setExcellenceId] = useState('');
  const [dateExperienced, setDateExperienced] = useState(new Date().toISOString().split('T')[0]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageCaption, setImageCaption] = useState('');

  const handleImageUpload = (file: File) => {
    setImageFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setImageCaption('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !excellenceId) return;

    // In a real app, upload the image to storage here
    // For now, we'll simulate an image URL
    const imageUrl = imageFile ? `https://example.com/images/${Date.now()}-${imageFile.name}` : undefined;

    const newExperience: Omit<Experience, 'id' | 'created_at' | 'updated_at'> = {
      user_id: 'current-user-id', // Would come from auth context
      excellence_id: excellenceId,
      title: title.trim(),
      description: description.trim(),
      image_url: imageUrl,
      image_caption: imageCaption.trim() || undefined,
      date_experienced: dateExperienced,
      tags: [] // Système de tags supprimé
    };

    onAdd(newExperience);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div 
        className="w-full max-w-2xl mx-4 rounded-lg p-6 max-h-[90vh] overflow-y-auto"
        style={{ backgroundColor: 'var(--bg-secondary)' }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Nouvelle Expérience
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:opacity-80 transition-colors"
            style={{ backgroundColor: 'var(--bg-hover)' }}
          >
            <X size={20} style={{ color: 'var(--text-primary)' }} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Excellence Selection */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
              Excellence associée *
            </label>
            <select
              value={excellenceId}
              onChange={(e) => setExcellenceId(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-primary)'
              }}
            >
              <option value="">Sélectionner une excellence</option>
              {excellences.map(excellence => (
                <option key={excellence.id} value={excellence.id}>
                  {excellence.name}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
              Titre de l'expérience *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Titre de votre expérience..."
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-primary)'
              }}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décrivez votre expérience..."
              rows={4}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 resize-none"
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-primary)'
              }}
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
              Illustrer cette expérience (optionnel)
            </label>
            
            {!imagePreview ? (
              <div
                className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:opacity-80 transition-colors"
                style={{ borderColor: 'var(--border-subtle)' }}
                onClick={() => document.getElementById('image-upload')?.click()}
              >
                <Upload size={32} style={{ color: 'var(--text-muted)' }} className="mx-auto mb-2" />
                <p style={{ color: 'var(--text-muted)' }} className="text-sm">
                  Cliquez pour ajouter une image
                </p>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="space-y-3">
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Aperçu"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
                <input
                  type="text"
                  value={imageCaption}
                  onChange={(e) => setImageCaption(e.target.value)}
                  placeholder="Légende de l'image (optionnel)"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>
            )}
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
              Date de l'expérience
            </label>
            <input
              type="date"
              value={dateExperienced}
              onChange={(e) => setDateExperienced(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-primary)'
              }}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:opacity-80 transition-colors"
              style={{
                borderColor: 'var(--border-medium)',
                color: 'var(--text-secondary)'
              }}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors"
              style={{ backgroundColor: 'var(--accent-orange)' }}
            >
              Créer l'expérience
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
