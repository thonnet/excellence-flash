
import React from 'react';
import { Excellence } from '../types';
import { EXCELLENCE_CATEGORIES } from '../types';

interface MobileContextMenuProps {
  contextMenu: {excellence: Excellence, x: number, y: number} | null;
  onCategoryChange: (excellence: Excellence, newCategory: 'manifestee' | 'principe' | 'quete') => void;
  onClose: () => void;
}

export const MobileContextMenu: React.FC<MobileContextMenuProps> = ({
  contextMenu,
  onCategoryChange,
  onClose
}) => {
  if (!contextMenu) return null;

  return (
    <>
      <div 
        className="fixed bg-white border border-gray-300 rounded-lg shadow-lg z-50 py-2"
        style={{
          left: contextMenu.x - 100,
          top: contextMenu.y - 50,
          backgroundColor: 'var(--bg-tertiary)',
          borderColor: 'var(--border-medium)'
        }}
      >
        {Object.entries(EXCELLENCE_CATEGORIES).map(([categoryKey, category]) => (
          <button
            key={categoryKey}
            onClick={() => onCategoryChange(contextMenu.excellence, categoryKey as 'manifestee' | 'principe' | 'quete')}
            disabled={contextMenu.excellence.category === categoryKey}
            className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
              contextMenu.excellence.category === categoryKey ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            style={{ 
              color: 'var(--text-primary)',
              backgroundColor: 'transparent'
            }}
            onMouseEnter={(e) => {
              if (contextMenu.excellence.category !== categoryKey) {
                e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            {category.title}
          </button>
        ))}
        <button
          onClick={onClose}
          className="w-full text-left px-4 py-2 text-sm"
          style={{ color: 'var(--text-secondary)' }}
        >
          Annuler
        </button>
      </div>

      {/* Overlay to close context menu */}
      <div 
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
    </>
  );
};
