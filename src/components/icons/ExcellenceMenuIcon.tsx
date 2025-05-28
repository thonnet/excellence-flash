
import React from 'react';

interface ExcellenceMenuIconProps {
  className?: string;
  size?: number;
  style?: React.CSSProperties;
}

export const ExcellenceMenuIcon: React.FC<ExcellenceMenuIconProps> = ({ 
  className = "", 
  size = 16,
  style = {}
}) => {
  return (
    <svg 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      className={className}
      style={{ fill: 'currentColor', ...style }}
    >
      <path d="M12 2L15 9H21L16 14L18 21L12 17L6 21L8 14L3 9H9L12 2Z"/>
    </svg>
  );
};
