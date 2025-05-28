
import React from 'react';

interface FilterIconProps {
  className?: string;
  size?: number;
  style?: React.CSSProperties;
}

export const FilterIcon: React.FC<FilterIconProps> = ({ 
  className = "", 
  size = 16,
  style = {}
}) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 498.47 459.67"
      width={size}
      height={size}
      className={className}
      style={{ fill: 'currentColor', ...style }}
    >
      <g>
        <path d="M249.23,0h226.3c15.5,0,22.5,7.2,22.9,22.6.7,28.4-8.8,52.4-27.9,73.4-47.1,51.8-93.8,104-140.8,156-2.7,3-3.9,6-3.9,10.1.2,31.5,0,63.1,0,94.6,0,25.4-11.1,43.9-33.8,55.3-29.9,15-59.9,29.9-89.9,44.8-15.8,7.8-29.6-.9-29.6-18.7,0-58.7,0-117.3-.2-176,0-3.4-1.6-7.4-3.8-9.9-47.7-53.2-95.5-106.3-143.3-159.3C6.03,71.4-1.47,46.1.23,17.8.83,7.1,9.33,0,21.13,0h136.5C188.13,0,218.73,0,249.23,0Z"/>
      </g>
    </svg>
  );
};
