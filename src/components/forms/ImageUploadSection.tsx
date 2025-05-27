
import React from 'react';
import { Upload, X } from 'lucide-react';

interface ImageUploadSectionProps {
  imageFile: File | null;
  imagePreview: string | null;
  imageCaption: string;
  onImageUpload: (file: File) => void;
  onImageRemove: () => void;
  onImageCaptionChange: (caption: string) => void;
}

export const ImageUploadSection: React.FC<ImageUploadSectionProps> = ({
  imageFile,
  imagePreview,
  imageCaption,
  onImageUpload,
  onImageRemove,
  onImageCaptionChange
}) => {
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  return (
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
            onChange={handleFileSelect}
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
              onClick={onImageRemove}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
          <input
            type="text"
            value={imageCaption}
            onChange={(e) => onImageCaptionChange(e.target.value)}
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
  );
};
