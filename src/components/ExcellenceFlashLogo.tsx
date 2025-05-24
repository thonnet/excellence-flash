
import React from 'react';

interface ExcellenceFlashLogoProps {
  size?: number;
  className?: string;
}

export const ExcellenceFlashLogo: React.FC<ExcellenceFlashLogoProps> = ({ 
  size = 32, 
  className = "" 
}) => {
  return (
    <div 
      className={`relative flex items-center justify-center ${className}`} 
      style={{ width: size, height: size }}
    >
      {/* Base pyramidale - Triangles bleus */}
      <div className="relative">
        {/* Triangle principal */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-[#0195ee] to-[#0175bb]"
          style={{ 
            width: size * 0.9,
            height: size * 0.9,
            clipPath: 'polygon(50% 10%, 15% 85%, 85% 85%)',
            filter: 'drop-shadow(0 2px 4px rgba(1, 149, 238, 0.3))'
          }} 
        />
        
        {/* Détails de la pyramide - lignes de structure */}
        <div 
          className="absolute bg-gradient-to-br from-[#0195ee]/80 to-[#0175bb]/80"
          style={{ 
            width: size * 0.6,
            height: size * 0.6,
            left: size * 0.15,
            top: size * 0.15,
            clipPath: 'polygon(50% 15%, 25% 75%, 75% 75%)',
          }} 
        />
      </div>

      {/* Triangles orange en lévitation */}
      <div 
        className="absolute bg-gradient-to-br from-[#ee5a01] to-[#cc4a00] rotate-45 animate-pulse"
        style={{ 
          width: size * 0.15,
          height: size * 0.15,
          top: -size * 0.1,
          left: size * 0.425,
          filter: 'drop-shadow(0 2px 4px rgba(238, 90, 1, 0.4))',
          animationDuration: '3s'
        }} 
      />
      
      <div 
        className="absolute bg-gradient-to-br from-[#ee5a01] to-[#cc4a00] rotate-45 animate-pulse"
        style={{ 
          width: size * 0.1,
          height: size * 0.1,
          top: -size * 0.05,
          right: size * 0.35,
          filter: 'drop-shadow(0 1px 2px rgba(238, 90, 1, 0.4))',
          animationDuration: '3s',
          animationDelay: '0.5s'
        }} 
      />
    </div>
  );
};
