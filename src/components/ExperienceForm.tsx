
import React, { useState } from 'react';
import { Experience, Excellence } from '../types';
import { X } from 'lucide-react';
import { ExperienceBasicInfo } from './forms/ExperienceBasicInfo';
import { ImageUploadSection } from './forms/ImageUploadSection';
import { FormActions } from './forms/FormActions';

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

  const handleSubmit = async () => {
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
      tags: []
    };

    onAdd(newExperience);
    onClose();
  };

  const isFormValid = title.trim() && excellenceId;

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

        <div className="space-y-6">
          <ExperienceBasicInfo
            title={title}
            description={description}
            excellenceId={excellenceId}
            dateExperienced={dateExperienced}
            excellences={excellences}
            onTitleChange={setTitle}
            onDescriptionChange={setDescription}
            onExcellenceChange={setExcellenceId}
            onDateChange={setDateExperienced}
          />

          <ImageUploadSection
            imageFile={imageFile}
            imagePreview={imagePreview}
            imageCaption={imageCaption}
            onImageUpload={handleImageUpload}
            onImageRemove={removeImage}
            onImageCaptionChange={setImageCaption}
          />

          <FormActions
            onSubmit={handleSubmit}
            onClose={onClose}
            isValid={!!isFormValid}
          />
        </div>
      </div>
    </div>
  );
};
