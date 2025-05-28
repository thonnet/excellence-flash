
import React from 'react';

interface CustomPlusIconProps {
  className?: string;
  size?: number;
}

export const CustomPlusIcon: React.FC<CustomPlusIconProps> = ({ 
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
      <path d="M461.8,211.3H288.5V38.6c0-21.2-17.4-38.6-38.6-38.6h0c-21.2,0-38.6,17.4-38.6,38.6v172.8H38.9c-21.2,0-38.6,17.4-38.6,38.6 v0c0,21.2,17.4,38.6,38.6,38.6h172.4v173c0,21.2,17.4,38.6,38.6,38.6h0c21.2,0,38.6-17.4,38.6-38.6v-173h173.3 c21.2,0,38.6-17.4,38.6-38.6v0C500.3,228.7,483,211.3,461.8,211.3z"/>
    </svg>
  );
};
