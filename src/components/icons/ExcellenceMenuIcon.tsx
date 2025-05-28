
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
    <div 
      style={{
        width: size,
        height: size,
        background: 'orange',
        borderRadius: '2px',
        display: 'inline-block',
        ...style
      }}
    >
      🔷
    </div>
  );
};
