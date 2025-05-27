
import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
}

export const CompactIcon: React.FC<IconProps> = ({ size = 18, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 18 18" 
    fill="currentColor" 
    className={className}
  >
    {/* Overlapping/nested shapes to suggest density */}
    <rect x="2" y="2" width="8" height="6" rx="1" opacity="0.7" />
    <rect x="4" y="5" width="8" height="6" rx="1" opacity="0.8" />
    <rect x="6" y="8" width="8" height="6" rx="1" opacity="0.9" />
  </svg>
);
