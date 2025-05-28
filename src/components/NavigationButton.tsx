
import React from 'react';

interface NavigationButtonProps {
  variant: 'primary' | 'back';
  onClick: () => void;
  children: React.ReactNode;
}

export const NavigationButton: React.FC<NavigationButtonProps> = ({ 
  variant, 
  onClick, 
  children 
}) => {
  if (variant === 'primary') {
    return (
      <button
        onClick={onClick}
        className="btn-primary"
      >
        {children}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="btn-icon"
      style={{
        width: 'auto',
        padding: '7px 14px',
        backgroundColor: 'transparent',
        border: '1px solid var(--border-primary)',
        color: 'var(--text-secondary)'
      }}
    >
      {children}
    </button>
  );
};
