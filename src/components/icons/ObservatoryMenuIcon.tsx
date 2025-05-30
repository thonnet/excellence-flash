
import React from 'react';

interface ObservatoryMenuIconProps {
  className?: string;
  size?: number;
  style?: React.CSSProperties;
}

export const ObservatoryMenuIcon: React.FC<ObservatoryMenuIconProps> = ({ 
  className = "", 
  size = 16,
  style = {}
}) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 483.11 499.76"
      width={size}
      height={size}
      className={className}
      style={{ fill: 'currentColor', ...style }}
    >
      <g>
        <path d="M33.2,233.36c2.3-24.6,8-47.8,18.8-69.4,33.2-66.1,86.7-104.1,160.1-113,36.9-4.5,72.2,2.2,105.8,18,3.3,1.5,5,1.2,7.5-1.3,11.1-11.4,22.5-22.6,34.2-34.3-1.5-1.6-2.9-3.1-4.3-4.5-6.9-7.2-7.2-17.1-.7-23.8,6.6-6.8,16.9-6.8,24.1.3,29,28.9,58,57.9,86.9,86.9,4.2,4.2,8.4,8.3,12.5,12.5,6.6,7,6.7,16.8.2,23.4-6.6,6.7-16.6,6.8-23.7,0-1.5-1.4-2.4-3.4-3.3-4.6-9,8.6-17.1,16.1-25,23.9-4.5,4.4-11.1,8.5-12.2,13.7-1.1,4.8,3.9,11,6.1,16.6,6.9,17.7,11,36.1,12.9,55.6h15.1c10.7,0,18.2,6.9,18.2,16.6s-7.5,16.6-18.1,16.6H18.2c-10.6,0-18.2-6.9-18.2-16.5s7.4-16.6,18.1-16.6h15.1v-.1Z"/>
        <path d="M33.3,300.16h399.9v180.4c0,12.8-6.4,19.2-19.2,19.2H52.6c-12.8,0-19.3-6.5-19.3-19.2v-180.5.1ZM266.3,466.56v-99.6h-66.1v99.6h66.1Z"/>
      </g>
    </svg>
  );
};
