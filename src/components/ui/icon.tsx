
import React from 'react';
import { icons, IconName } from '../icons/IconLibrary';

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  viewBox?: string;
}

export const Icon: React.FC<IconProps> = ({ 
  name, 
  size = 14, 
  className = "", 
  viewBox = "0 0 500 500" 
}) => {
  const IconComponent = icons[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }
  
  return <IconComponent size={size} className={className} viewBox={viewBox} />;
};

export type { IconName };
export { icons };
