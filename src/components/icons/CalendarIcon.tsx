
import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
}

export const CalendarIcon: React.FC<IconProps> = ({ size = 18, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 18 18" 
    fill="currentColor" 
    className={className}
  >
    {/* Calendar base */}
    <rect x="2" y="3" width="14" height="12" rx="1" stroke="currentColor" strokeWidth="1" fill="none" />
    
    {/* Top rings */}
    <rect x="5" y="1" width="1" height="4" rx="0.5" />
    <rect x="12" y="1" width="1" height="4" rx="0.5" />
    
    {/* Header separator */}
    <line x1="2" y1="6" x2="16" y2="6" stroke="currentColor" strokeWidth="1" />
    
    {/* Internal 2x3 grid */}
    <rect x="4" y="8" width="2" height="2" rx="0.3" />
    <rect x="8" y="8" width="2" height="2" rx="0.3" />
    <rect x="12" y="8" width="2" height="2" rx="0.3" />
    <rect x="4" y="11" width="2" height="2" rx="0.3" />
    <rect x="8" y="11" width="2" height="2" rx="0.3" />
    <rect x="12" y="11" width="2" height="2" rx="0.3" />
  </svg>
);
