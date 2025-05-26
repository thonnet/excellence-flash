
import React, { useState, useRef, useEffect } from 'react';
import { Excellence } from '../types';
import { Eye, Edit2, X } from 'lucide-react';

interface ExcellenceCardProps {
  excellence: Excellence;
  experienceCount: number;
  onUpdate: (id: string, updates: Partial<Excellence>) => void;
  onDelete: (id: string) => void;
  onView: (excellence: Excellence) => void;
  onEdit: (excellence: Excellence) => void;
}

export const ExcellenceCard: React.FC<ExcellenceCardProps> = ({
  excellence,
  experienceCount,
  onUpdate,
  onDelete,
  onView,
  onEdit
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [descriptionPosition, setDescriptionPosition] = useState<'above' | 'below'>('below');
  const cardRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isHovered && excellence.description) {
      timeoutRef.current = setTimeout(() => {
        // Check position in viewport to decide if description goes above or below
        if (cardRef.current) {
          const rect = cardRef.current.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const spaceBelow = viewportHeight - rect.bottom;
          const spaceAbove = rect.top;
          
          // If less than 150px below, show above
          setDescriptionPosition(spaceBelow < 150 && spaceAbove > 150 ? 'above' : 'below');
        }
        setShowDescription(true);
      }, 300);
    } else {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setShowDescription(false);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isHovered, excellence.description]);

  const handleView = (e: React.MouseEvent) => {
    e.stopPropagation();
    onView(excellence);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(excellence);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Êtes-vous sûr de vouloir supprimer cette excellence ?')) {
      onDelete(excellence.id);
    }
  };

  return (
    <div 
      ref={cardRef}
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

          {excellence.description && showDescription && (
            <div 
              className={`excellence-description-overlay ${descriptionPosition === 'above' ? 'above' : 'below'}`}
            >
              {/* Triangle orange pointer */}
              <div 
                className={`description-triangle ${descriptionPosition === 'above' ? 'triangle-below' : 'triangle-above'}`}
              />
              {excellence.description}
            </div>
          )}
          
          <div className="excellence-actions-overlay">
            <button
              onClick={handleView}
              className="action-btn"
              title="Voir"
            >
              <Eye size={14} />
            </button>
            
            <button
              onClick={handleEdit}
              className="action-btn"
              title="Modifier"
            >
              <Edit2 size={14} />
            </button>
            
            <button
              onClick={handleDelete}
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
