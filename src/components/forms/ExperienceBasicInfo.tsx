
import React from 'react';
import { Excellence } from '../../types';

interface ExperienceBasicInfoProps {
  title: string;
  description: string;
  excellenceId: string;
  dateExperienced: string;
  excellences: Excellence[];
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
  onExcellenceChange: (excellenceId: string) => void;
  onDateChange: (date: string) => void;
}

export const ExperienceBasicInfo: React.FC<ExperienceBasicInfoProps> = ({
  title,
  description,
  excellenceId,
  dateExperienced,
  excellences,
  onTitleChange,
  onDescriptionChange,
  onExcellenceChange,
  onDateChange
}) => {
  return (
    <div className="space-y-4">
      {/* Excellence Selection */}
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
          Excellence associée *
        </label>
        <select
          value={excellenceId}
          onChange={(e) => onExcellenceChange(e.target.value)}
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
          onChange={(e) => onTitleChange(e.target.value)}
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
          onChange={(e) => onDescriptionChange(e.target.value)}
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

      {/* Date */}
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
          Date de l'expérience
        </label>
        <input
          type="date"
          value={dateExperienced}
          onChange={(e) => onDateChange(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
          style={{
            backgroundColor: 'var(--bg-tertiary)',
            borderColor: 'var(--border-subtle)',
            color: 'var(--text-primary)'
          }}
        />
      </div>
    </div>
  );
};
