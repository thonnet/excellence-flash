
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
      viewBox="0 0 16 16" 
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      className={className}
      style={{ fill: 'currentColor', ...style }}
    >
      <path d="M8 0L12 6H4L8 0ZM2 8L6 14H0L2 8ZM14 8L16 14H10L14 8ZM8 10L12 16H4L8 10Z"/>
    </svg>
  );
};
