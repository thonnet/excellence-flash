
import React from 'react';

interface NavigationButtonProps {
  variant: 'primary' | 'back';
  onClick: () => void;
  children: React.ReactNode;
}

export const NavigationButton: React.FC<NavigationButtonProps> = ({ variant, onClick, children }) => {
  const baseClasses = "px-6 py-3 rounded-lg transition-all duration-200 font-medium";
  
  const variantStyles = {
    primary: {
      backgroundColor: 'var(--accent-orange)',
      color: 'white',
      hoverStyle: 'hover:opacity-90'
    },
    back: {
      backgroundColor: 'transparent',
      color: 'var(--text-secondary)',
      hoverStyle: 'hover:bg-gray-100 dark:hover:bg-gray-800'
    }
  };

  const style = variantStyles[variant];

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${style.hoverStyle}`}
      style={{
        backgroundColor: style.backgroundColor,
        color: style.color,
        border: variant === 'back' ? '1px solid var(--border-subtle)' : 'none'
      }}
    >
      {children}
    </button>
  );
};
