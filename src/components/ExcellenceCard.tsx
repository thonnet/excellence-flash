
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
  const [isExpanded, setIsExpanded] = useState(false);
  const category = EXCELLENCE_CATEGORIES[excellence.category];

  return (
    <div 
      className="bg-[#2a2a3e] rounded-lg p-4 border border-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer group"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="font-medium text-white mb-2 line-clamp-2">
            {excellence.name}
          </h4>
          
          {/* Experience Counter */}
          <div className="flex items-center space-x-2 mb-3">
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
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="p-1 rounded text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Eye size={14} />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              // TODO: Implement edit modal
              console.log('Edit excellence:', excellence.id);
            }}
            className="p-1 rounded text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
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
            className="p-1 rounded text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Description (when expanded) */}
      {isExpanded && excellence.description && (
        <div className="pt-3 border-t border-white/10">
          <p className="text-sm text-gray-300 leading-relaxed">
            {excellence.description}
          </p>
        </div>
      )}
    </div>
  );
};
