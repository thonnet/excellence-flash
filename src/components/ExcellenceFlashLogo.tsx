
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
      src="https://www.entrepreneur-multipotentiel.com/wp-content/uploads/2025/05/Source-Logo-anime-442x420-carre-seul.gif" 
      alt="Excellence Flash"
      width={size}
      height={size}
      className={`logo-excellence-flash ${className}`}
    />
  );
};
