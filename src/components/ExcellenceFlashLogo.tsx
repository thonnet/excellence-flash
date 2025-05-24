
import React from 'react';

interface ExcellenceFlashLogoProps {
  size?: number;
  className?: string;
}

export const ExcellenceFlashLogo: React.FC<ExcellenceFlashLogoProps> = ({ 
  size = 32, 
  className = "" 
}) => {
  return (
    <img 
      src="https://example.com/excellence-flash-logo.svg" 
      alt="Excellence Flash"
      width={size}
      height={size}
      className={`logo-excellence-flash ${className}`}
    />
  );
};
