
import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
}

export const GalleryIcon: React.FC<IconProps> = ({ size = 18, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 18 18" 
    fill="currentColor" 
    className={className}
  >
    {/* 3x3 grid of squares */}
    <rect x="1" y="1" width="4" height="4" rx="0.5" />
    <rect x="7" y="1" width="4" height="4" rx="0.5" />
    <rect x="13" y="1" width="4" height="4" rx="0.5" />
    <rect x="1" y="7" width="4" height="4" rx="0.5" />
    <rect x="7" y="7" width="4" height="4" rx="0.5" />
    <rect x="13" y="7" width="4" height="4" rx="0.5" />
    <rect x="1" y="13" width="4" height="4" rx="0.5" />
    <rect x="7" y="13" width="4" height="4" rx="0.5" />
    <rect x="13" y="13" width="4" height="4" rx="0.5" />
  </svg>
);
