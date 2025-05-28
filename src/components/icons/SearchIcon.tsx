
import React from 'react';

interface SearchIconProps {
  className?: string;
  size?: number;
  style?: React.CSSProperties;
}

export const SearchIcon: React.FC<SearchIconProps> = ({ 
  className = "", 
  size = 16,
  style = {}
}) => {
  return (
    <svg 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      className={className}
      style={{ fill: 'currentColor', ...style }}
    >
      <circle cx="11" cy="11" r="8" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="m21 21-4.35-4.35" fill="none" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );
};
