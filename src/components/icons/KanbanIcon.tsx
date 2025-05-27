
import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
}

export const KanbanIcon: React.FC<IconProps> = ({ size = 18, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 18 18" 
    fill="currentColor" 
    className={className}
  >
    {/* 3 vertical columns of different heights */}
    <rect x="1" y="2" width="4" height="14" rx="1" />
    <rect x="7" y="4" width="4" height="12" rx="1" />
    <rect x="13" y="3" width="4" height="13" rx="1" />
  </svg>
);
