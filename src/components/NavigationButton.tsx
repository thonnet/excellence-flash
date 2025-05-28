
import React from 'react';
import { CustomPlusIcon } from './icons/CustomPlusIcon';

interface NavigationButtonProps {
  variant: 'primary' | 'back' | 'icon-only';
  onClick: () => void;
  children: React.ReactNode;
}

export const NavigationButton: React.FC<NavigationButtonProps> = ({ variant, onClick, children }) => {
  if (variant === 'icon-only') {
    return (
      <button onClick={onClick} className="btn-add">
        <CustomPlusIcon size={18} />
      </button>
    );
  }

  if (variant === 'primary') {
    return (
      <button onClick={onClick} className="btn-primary">
        <CustomPlusIcon size={16} />
        <span>{children}</span>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="btn-back"
    >
      {children}
    </button>
  );
};
