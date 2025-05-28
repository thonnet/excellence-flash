
import React from 'react';

interface ExcellenceMenuIconProps {
  className?: string;
  size?: number;
}

export const ExcellenceMenuIcon: React.FC<ExcellenceMenuIconProps> = ({ 
  className = "", 
  size = 16 
}) => {
  return (
    <svg 
      viewBox="0 0 500 500" 
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      className={className}
      style={{ fill: 'currentColor' }}
    >
      <path d="M250,50L350,200H150L250,50ZM75,250L200,425H50L75,250ZM425,250L450,425H300L425,250ZM250,350L350,500H150L250,350Z"/>
    </svg>
  );
};
