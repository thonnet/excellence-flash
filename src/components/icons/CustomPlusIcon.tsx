
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
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 500.1 500.1"
      width={size}
      height={size}
      className={className}
      style={{ fill: 'currentColor' }}
    >
      <g>
        <path d="M461.5,211.3h-173.3V38.6c0-21.2-17.4-38.6-38.6-38.6h0c-21.2,0-38.6,17.4-38.6,38.6v172.8H38.6c-21.2-.1-38.6,17.3-38.6,38.5h0c0,21.2,17.4,38.6,38.6,38.6h172.4v173c0,21.2,17.4,38.6,38.6,38.6h0c21.2,0,38.6-17.4,38.6-38.6v-173h173.3c21.2,0,38.6-17.4,38.6-38.6h0c0-21.2-17.4-38.6-38.6-38.6h0Z"/>
      </g>
    </svg>
  );
};
