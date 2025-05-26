
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
      src="https://imgur.com/ExzBObo.gif" 
      alt="Excellence Flash"
      width={size}
      height={size}
      className={`logo-excellence-flash ${className}`}
      onError={(e) => {
        // Fallback to text if image fails to load
        e.currentTarget.style.display = 'none';
        e.currentTarget.parentElement!.innerHTML = '<span style="font-weight: bold; color: var(--accent-orange);">EF</span>';
      }}
    />
  );
};
