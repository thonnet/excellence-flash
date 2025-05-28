
import React from 'react';

interface SearchIconProps {
  className?: string;
  size?: number;
}

export const SearchIcon: React.FC<SearchIconProps> = ({ 
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
      <path d="M325,75c69.1,0,125,55.9,125,125s-55.9,125-125,125c-28.8,0-55.3-9.8-76.4-26.2L173.2,374.2c-9.8,9.8-25.6,9.8-35.4,0s-9.8-25.6,0-35.4L213.2,263.4C196.8,242.3,187,215.8,187,187C187,117.9,242.9,75,325,75z M325,125c-41.4,0-75,33.6-75,75s33.6,75,75,75s75-33.6,75-75S366.4,125,325,125z"/>
    </svg>
  );
};
