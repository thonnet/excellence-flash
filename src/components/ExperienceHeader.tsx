
import React from 'react';
import { NavigationButton } from './NavigationButton';

interface ExperienceHeaderProps {
  mode: 'explorer' | 'consigner';
  onModeChange: (mode: 'explorer' | 'consigner') => void;
}

export const ExperienceHeader: React.FC<ExperienceHeaderProps> = ({ mode, onModeChange }) => {
  const isExplorer = mode === 'explorer';
  
  const handleConsignerClick = () => {
    console.log('Consigner button clicked, changing mode to consigner');
    onModeChange('consigner');
  };

  const handleBackClick = () => {
    console.log('Back button clicked, changing mode to explorer');
    onModeChange('explorer');
  };
  
  return (
    <div 
      className="border-b"
      style={{ 
        backgroundColor: '#1e1e1e',
        borderBottomColor: '#404040',
        paddingTop: '12px',
        paddingBottom: '8px',
        paddingLeft: '24px',
        paddingRight: '24px'
      }}
    >
      <div className="flex items-start justify-between">
        <div className="title-section flex-1">
          <div className="flex items-center space-x-4">
            {!isExplorer && (
              <NavigationButton
                variant="back"
                onClick={handleBackClick}
              >
                ← Retour
              </NavigationButton>
            )}
            <h2 
              className="font-semibold"
              style={{ 
                color: 'var(--text-primary)',
                fontSize: '18px',
                fontWeight: '600'
              }}
            >
              {isExplorer ? 'Explorer mes Expériences' : '⚡ Consigner une Expérience'}
            </h2>
          </div>
          <p 
            className="mt-2"
            style={{ 
              color: '#b0b0b0',
              fontSize: '11px'
            }}
          >
            {isExplorer 
              ? 'Découvrez vos patterns, renforcez vos excellences'
              : 'Capturez rapidement ce que vous venez de vivre'
            }
          </p>
        </div>
        
        {/* Bouton supprimé pour le mode explorer comme demandé */}
      </div>
    </div>
  );
};
