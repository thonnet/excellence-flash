
import React from 'react';
import { X, Calendar, Tag, Edit, Link2, Trash2 } from 'lucide-react';
import { Experience, Excellence } from '../types';

interface ExperienceDetailModalProps {
  experience: Experience;
  excellence: Excellence | undefined;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (experience: Experience) => void;
  onLink: (experience: Experience) => void;
  onDelete: (experience: Experience) => void;
}

export const ExperienceDetailModal: React.FC<ExperienceDetailModalProps> = ({
  experience,
  excellence,
  isOpen,
  onClose,
  onEdit,
  onLink,
  onDelete
}) => {
  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'e' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      onEdit(experience);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div
        className="max-w-2xl w-full rounded-lg overflow-hidden"
        style={{ backgroundColor: 'var(--bg-secondary)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div 
          className="p-6 border-b"
          style={{ borderColor: 'var(--border-subtle)' }}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 mr-4">
              <h2 
                className="text-xl font-semibold mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                {experience.title}
              </h2>
              {excellence && (
                <div className="flex items-center gap-2 mb-3">
                  <Tag size={14} style={{ color: 'var(--text-muted)' }} />
                  <span 
                    className="text-sm"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {excellence.name}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar size={14} style={{ color: 'var(--text-muted)' }} />
                <span 
                  className="text-sm"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {formatDate(experience.date_experienced)}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => onEdit(experience)}
                className="p-2 rounded-lg transition-colors"
                style={{ 
                  backgroundColor: 'var(--bg-tertiary)',
                  color: 'var(--text-secondary)'
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.backgroundColor = 'var(--bg-hover)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.backgroundColor = 'var(--bg-tertiary)';
                }}
                title="Éditer (Ctrl+E)"
              >
                <Edit size={16} />
              </button>
              
              <button
                onClick={() => onLink(experience)}
                className="p-2 rounded-lg transition-colors"
                style={{ 
                  backgroundColor: 'var(--bg-tertiary)',
                  color: 'var(--text-secondary)'
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.backgroundColor = 'var(--bg-hover)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.backgroundColor = 'var(--bg-tertiary)';
                }}
                title="Lier à d'autres excellences"
              >
                <Link2 size={16} />
              </button>
              
              <button
                onClick={() => onDelete(experience)}
                className="p-2 rounded-lg transition-colors"
                style={{ 
                  backgroundColor: 'var(--bg-tertiary)',
                  color: 'var(--text-secondary)'
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.backgroundColor = 'var(--bg-hover)';
                  (e.target as HTMLElement).style.color = '#ee5a01';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.backgroundColor = 'var(--bg-tertiary)';
                  (e.target as HTMLElement).style.color = 'var(--text-secondary)';
                }}
                title="Supprimer"
              >
                <Trash2 size={16} />
              </button>
              
              <button
                onClick={onClose}
                className="p-2 rounded-lg transition-colors ml-2"
                style={{ 
                  backgroundColor: 'var(--bg-tertiary)',
                  color: 'var(--text-secondary)'
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.backgroundColor = 'var(--bg-hover)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.backgroundColor = 'var(--bg-tertiary)';
                }}
                title="Fermer (Escape)"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {experience.description ? (
            <div>
              <h3 
                className="text-sm font-medium mb-3"
                style={{ color: 'var(--text-secondary)' }}
              >
                Description
              </h3>
              <p 
                className="text-sm leading-relaxed"
                style={{ color: 'var(--text-primary)' }}
              >
                {experience.description}
              </p>
            </div>
          ) : (
            <p 
              className="text-sm italic"
              style={{ color: 'var(--text-muted)' }}
            >
              Aucune description disponible
            </p>
          )}
        </div>

        {/* Footer */}
        <div 
          className="px-6 py-4 border-t text-center"
          style={{ 
            borderColor: 'var(--border-subtle)',
            backgroundColor: 'var(--bg-tertiary)'
          }}
        >
          <span 
            className="text-xs"
            style={{ color: 'var(--text-muted)' }}
          >
            Créée le {formatDate(experience.created_at)}
          </span>
        </div>
      </div>
    </div>
  );
};
