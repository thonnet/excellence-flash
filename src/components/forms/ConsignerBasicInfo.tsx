
import React from 'react';

interface ConsignerBasicInfoProps {
  title: string;
  description: string;
  dateExperienced: string;
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
  onDateChange: (date: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  disabled?: boolean;
}

export const ConsignerBasicInfo: React.FC<ConsignerBasicInfoProps> = ({
  title,
  description,
  dateExperienced,
  onTitleChange,
  onDescriptionChange,
  onDateChange,
  onSubmit,
  disabled = false
}) => {
  return (
    <section 
      className="p-8 rounded-lg"
      style={{ backgroundColor: '#2a2a2a' }}
    >
      <h3 className="text-lg font-semibold mb-6" style={{ color: '#ee5a01' }}>
        📝 Informations de base
      </h3>

      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#ccc' }}>
            Titre de l'expérience <span style={{ color: '#ee5a01' }}>*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Ex: Présentation client réussie, Discussion enrichissante..."
            disabled={disabled}
            className="w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none"
            style={{
              backgroundColor: disabled ? '#222' : '#333',
              borderColor: '#555',
              color: disabled ? '#666' : 'white',
              cursor: disabled ? 'not-allowed' : 'text'
            }}
            onFocus={(e) => !disabled && ((e.target as HTMLInputElement).style.borderColor = '#ee5a01')}
            onBlur={(e) => !disabled && ((e.target as HTMLInputElement).style.borderColor = '#555')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#ccc' }}>
            Description détaillée
          </label>
          <textarea
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="Décrivez ce que vous avez vécu, appris, les défis relevés..."
            rows={5}
            maxLength={500}
            disabled={disabled}
            className="w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none resize-none"
            style={{
              backgroundColor: disabled ? '#222' : '#333',
              borderColor: '#555',
              color: disabled ? '#666' : 'white',
              cursor: disabled ? 'not-allowed' : 'text'
            }}
            onFocus={(e) => !disabled && ((e.target as HTMLTextAreaElement).style.borderColor = '#ee5a01')}
            onBlur={(e) => !disabled && ((e.target as HTMLTextAreaElement).style.borderColor = '#555')}
          />
          <div className="text-right text-xs mt-1" style={{ color: '#999' }}>
            {description.length} / 500 caractères
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#ccc' }}>
            Date de l'expérience
          </label>
          <input
            type="date"
            value={dateExperienced}
            onChange={(e) => onDateChange(e.target.value)}
            disabled={disabled}
            className="px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none"
            style={{
              backgroundColor: disabled ? '#222' : '#333',
              borderColor: '#555',
              color: disabled ? '#666' : 'white',
              cursor: disabled ? 'not-allowed' : 'pointer'
            }}
            onFocus={(e) => !disabled && ((e.target as HTMLInputElement).style.borderColor = '#ee5a01')}
            onBlur={(e) => !disabled && ((e.target as HTMLInputElement).style.borderColor = '#555')}
          />
        </div>
      </form>
    </section>
  );
};
