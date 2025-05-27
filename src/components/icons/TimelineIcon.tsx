
import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
}

export const TimelineIcon: React.FC<IconProps> = ({ size = 18, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 18 18" 
    fill="currentColor" 
    className={className}
  >
    {/* Grid base */}
    <rect x="1" y="4" width="3" height="3" rx="0.5" />
    <rect x="6" y="4" width="3" height="3" rx="0.5" />
    <rect x="11" y="4" width="3" height="3" rx="0.5" />
    <rect x="1" y="9" width="3" height="3" rx="0.5" />
    <rect x="6" y="9" width="3" height="3" rx="0.5" />
    <rect x="11" y="9" width="3" height="3" rx="0.5" />
    
    {/* Clock/pendulum indicator */}
    <circle cx="14.5" cy="3.5" r="2.5" stroke="currentColor" strokeWidth="1" fill="none" />
    <line x1="14.5" y1="3.5" x2="14.5" y2="2" stroke="currentColor" strokeWidth="1" />
    <line x1="14.5" y1="3.5" x2="15.5" y2="4" stroke="currentColor" strokeWidth="1" />
  </svg>
);
