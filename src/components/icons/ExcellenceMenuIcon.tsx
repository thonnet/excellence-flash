
import React from 'react';

interface ExcellenceMenuIconProps {
  className?: string;
  size?: number;
  style?: React.CSSProperties;
}

export const ExcellenceMenuIcon: React.FC<ExcellenceMenuIconProps> = ({ 
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
      ◆
    </span>
  );
};
