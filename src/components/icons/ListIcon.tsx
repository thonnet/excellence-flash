
import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
}

export const ListIcon: React.FC<IconProps> = ({ size = 18, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 499.8 499.9"
    width={size} 
    height={size} 
    fill="currentColor" 
    className={className}
  >
    <g>
      <path d="M142.9,70.9V0h356.7v70.8H142.9v.1Z"/>
      <path d="M142.9,213.8v-70.8h356.7v70.8H142.9Z"/>
      <path d="M499.8,286.1v70.8H143.1v-70.8h356.7Z"/>
      <path d="M142.9,499.8v-70.8h356.7v70.8H142.9Z"/>
      <path d="M70.7,71H0V.2h70.8v70.8h-.1Z"/>
      <path d="M70.6,214.1H.1v-71h70.6v71h-.1Z"/>
      <path d="M70.7,356.9H0v-70.8h70.8v70.8h-.1Z"/>
      <path d=".1,428.9h70.7v71H.1v-71Z"/>
    </g>
  </svg>
);
