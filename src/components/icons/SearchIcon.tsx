
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
    <span 
      className={className}
      style={{ 
        fontSize: `${size}px`,
        display: 'inline-block',
        lineHeight: '1',
        ...style 
      }}
    >
      🔍
    </span>
  );
};
