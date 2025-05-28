
import React from 'react';

interface DarkModeIconProps {
  className?: string;
  size?: number;
  style?: React.CSSProperties;
}

export const DarkModeIcon: React.FC<DarkModeIconProps> = ({ 
  className = "", 
  size = 16,
  style = {}
}) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 500.47 500.03"
      width={size}
      height={size}
      className={className}
      style={{ fill: 'currentColor', ...style }}
    >
      <g>
        <path d="M267.3,500.01c-118.2,1.4-217.9-68.7-254.3-178.7C-27.5,198.71,28.8,57.51,151.5,2.31c12.2-5.5,23.9-.9,26.6,10.9.9,4,0,8.9-1.4,12.9-23.2,65.5-22.9,130.3,9.8,192.4,35.8,67.9,92.8,107.7,168.9,118.5,41,5.8,81.3,1.4,120-14.1,7.5-3,14.3-1.7,20,3.9,5.6,5.6,6.6,12.9,2.8,21.2-28.7,62.9-75.6,106.8-139.4,132.9-30.1,12.3-61.6,18.2-91.6,19l.1.1Z"/>
      </g>
    </svg>
  );
};
