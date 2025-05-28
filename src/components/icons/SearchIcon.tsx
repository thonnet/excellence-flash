
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
    <div 
      style={{
        width: size,
        height: size,
        background: 'blue',
        borderRadius: '50%',
        display: 'inline-block',
        color: 'white',
        textAlign: 'center',
        lineHeight: `${size}px`,
        fontSize: '10px',
        ...style
      }}
    >
      🔍
    </div>
  );
};
