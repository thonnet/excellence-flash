
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
      className="p-8 rounded-lg transition-opacity"
      style={{ 
        backgroundColor: 'var(--bg-secondary)',
        opacity: disabled ? 0.7 : 1
      }}
    >
      <h3 className="text-lg font-semibold mb-6" style={{ color: '#ee5a01' }}>
        📝 Informations de base
      </h3>

      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
            Titre de l'expérience <span style={{ color: '#ee5a01' }}>*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Ex: Présentation client réussie, Discussion enrichissante..."
            disabled={disabled}
            className="w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-primary)'
            }}
            onFocus={(e) => !disabled && ((e.target as HTMLInputElement).style.borderColor = '#ee5a01')}
            onBlur={(e) => (e.target as HTMLInputElement).style.borderColor = 'var(--border-subtle)'}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
            Description détaillée
          </label>
          <textarea
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="Décrivez ce que vous avez vécu, appris, les défis relevés..."
            rows={5}
            maxLength={500}
            disabled={disabled}
            className="w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none resize-none disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-primary)'
            }}
            onFocus={(e) => !disabled && ((e.target as HTMLTextAreaElement).style.borderColor = '#ee5a01')}
            onBlur={(e) => (e.target as HTMLTextAreaElement).style.borderColor = 'var(--border-subtle)'}
          />
          <div className="text-right text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
            {description.length} / 500 caractères
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
            Date de l'expérience
          </label>
          <input
            type="date"
            value={dateExperienced}
            onChange={(e) => onDateChange(e.target.value)}
            disabled={disabled}
            className="px-4 py-3 rounded-lg border-2 transition-all focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-primary)'
            }}
            onFocus={(e) => !disabled && ((e.target as HTMLInputElement).style.borderColor = '#ee5a01')}
            onBlur={(e) => (e.target as HTMLInputElement).style.borderColor = 'var(--border-subtle)'}
          />
        </div>
      </form>
    </section>
  );
};
