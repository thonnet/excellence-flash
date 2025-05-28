
import React from 'react';
import { CustomPlusIcon } from './icons/CustomPlusIcon';

interface NavigationButtonProps {
  variant: 'primary' | 'back';
  onClick: () => void;
  children: React.ReactNode;
}

export const NavigationButton: React.FC<NavigationButtonProps> = ({ variant, onClick, children }) => {
  const baseClasses = "transition-all duration-200 font-medium flex items-center gap-2";
  
  if (variant === 'primary') {
    return (
      <button
        onClick={onClick}
        className={`${baseClasses} bg-transparent border border-orange-500 text-white px-4 py-2 rounded hover:bg-orange-500 hover:text-white`}
        style={{
          borderColor: '#ee5a01',
          fontSize: '13px',
          padding: '7px 14px',
          borderRadius: '4px'
        }}
      >
        <CustomPlusIcon size={16} />
        <span>{children}</span>
      </button>
    );
  }

  // Back button variant
  return (
    <button
      onClick={onClick}
      className={`${baseClasses} px-6 py-3 rounded-lg bg-transparent text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800`}
      style={{
        color: 'var(--text-secondary)',
        border: '1px solid var(--border-subtle)'
      }}
    >
      {children}
    </button>
  );
};
