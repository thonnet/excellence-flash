
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
      viewBox="0 0 16 16" 
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      className={className}
      style={{ fill: 'currentColor', ...style }}
    >
      <path d="M6.5 0C10.09 0 13 2.91 13 6.5C13 8.11 12.41 9.59 11.44 10.73L15.71 15L15 15.71L10.73 11.44C9.59 12.41 8.11 13 6.5 13C2.91 13 0 10.09 0 6.5C0 2.91 2.91 0 6.5 0ZM6.5 1C3.46 1 1 3.46 1 6.5C1 9.54 3.46 12 6.5 12C9.54 12 12 9.54 12 6.5C12 3.46 9.54 1 6.5 1Z"/>
    </svg>
  );
};
