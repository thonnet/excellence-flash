
import React, { useState } from 'react';
import { Excellence } from '../types';
import { EXCELLENCE_CATEGORIES } from '../types';
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
  const category = EXCELLENCE_CATEGORIES[excellence.category];

  return (
    <div 
      className="excellence-card-minimal"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* AFFICHAGE MINIMAL par défaut */}
      <h4 className="font-medium mb-2 line-clamp-2" style={{ color: 'var(--text-primary)' }}>
        {excellence.name}
      </h4>
      
      {/* Experience Counter */}
      <div className="flex items-center space-x-2">
        <div 
          className="px-2 py-1 rounded text-xs font-medium"
          style={{
            backgroundColor: category.bgColor,
            color: category.color
          }}
        >
          {experienceCount} expérience{experienceCount !== 1 ? 's' : ''}
        </div>
        
        <div 
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: category.color }}
        />
      </div>

      {/* DÉTAILS au survol UNIQUEMENT */}
      {isHovered && (
        <>
          {excellence.description && (
            <div className="excellence-description-overlay">
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
