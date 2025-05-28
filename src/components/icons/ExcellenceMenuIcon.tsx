
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
      <path d="M12 3L16 10H20L15 15L17 22L12 18L7 22L9 15L4 10H8L12 3Z"/>
    </svg>
  );
};
