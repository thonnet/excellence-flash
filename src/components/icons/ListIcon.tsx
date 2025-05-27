
import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
}

export const ListIcon: React.FC<IconProps> = ({ size = 18, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 18 18" 
    fill="currentColor" 
    className={className}
  >
    {/* 4 horizontal lines */}
    <rect x="2" y="3" width="14" height="1.5" rx="0.75" />
    <rect x="2" y="6.5" width="14" height="1.5" rx="0.75" />
    <rect x="2" y="10" width="14" height="1.5" rx="0.75" />
    <rect x="2" y="13.5" width="14" height="1.5" rx="0.75" />
  </svg>
);
