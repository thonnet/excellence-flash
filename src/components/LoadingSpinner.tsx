
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  className = ''
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8'
  };

  return (
    <div 
      className={`loading-spinner ${sizeClasses[size]} ${className}`}
      role="status"
      aria-label="Chargement..."
    />
  );
};

interface SkeletonCardProps {
  className?: string;
  children?: React.ReactNode;
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({
  className = '',
  children
}) => {
  return (
    <div className={`skeleton-card ${className}`}>
      <div className="skeleton-shimmer" />
      {children}
    </div>
  );
};
