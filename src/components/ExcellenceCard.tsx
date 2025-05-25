
import React, { useState } from 'react';
import { Excellence } from '../types';
import { Eye, Edit2, X } from 'lucide-react';

interface ExcellenceCardProps {
  excellence: Excellence;
  experienceCount: number;
  onUpdate: (id: string, updates: Partial<Excellence>) => void;
  onDelete: (id: string) => void;
}

export const ExcellenceCard: React.FC<ExcellenceCardProps> = ({
  excellence,
  experienceCount,
  onUpdate,
  onDelete
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="excellence-card-minimal"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* AFFICHAGE MINIMAL - Nom uniquement */}
      <h4 className="font-medium text-sm line-clamp-2" style={{ color: 'var(--text-primary)' }}>
        {excellence.name}
      </h4>

      {/* DÉTAILS au survol UNIQUEMENT */}
      {isHovered && (
        <>
          {/* Compteur d'expériences au survol */}
          <div className="experience-counter-overlay">
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              {experienceCount} expérience{experienceCount !== 1 ? 's' : ''}
            </span>
          </div>

          {excellence.description && (
            <div className="excellence-description-overlay">
              {/* Triangle orange pointer */}
              <div 
                className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0"
                style={{
                  borderLeft: '6px solid transparent',
                  borderRight: '6px solid transparent',
                  borderBottom: '6px solid var(--accent-orange)',
                  zIndex: 11
                }}
              />
              {excellence.description}
            </div>
          )}
          
          <div className="excellence-actions-overlay">
            <button
              onClick={(e) => {
                e.stopPropagation();
                console.log('View excellence:', excellence.id);
              }}
              className="action-btn"
              title="Voir"
            >
              <Eye size={14} />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                console.log('Edit excellence:', excellence.id);
              }}
              className="action-btn"
              title="Modifier"
            >
              <Edit2 size={14} />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (confirm('Êtes-vous sûr de vouloir supprimer cette excellence ?')) {
                  onDelete(excellence.id);
                }
              }}
              className="action-btn"
              title="Supprimer"
            >
              <X size={14} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};
