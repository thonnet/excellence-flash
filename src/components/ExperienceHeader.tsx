
import React from 'react';
import { NavigationButton } from './NavigationButton';

interface ExperienceHeaderProps {
  mode: 'explorer' | 'consigner';
  onModeChange: (mode: 'explorer' | 'consigner') => void;
}

export const ExperienceHeader: React.FC<ExperienceHeaderProps> = ({ mode, onModeChange }) => {
  const isExplorer = mode === 'explorer';
  
  return (
    <div className="page-header">
      <div className="flex items-start justify-between">
        <div className="title-section flex-1">
          <div className="flex items-center space-x-4">
            {!isExplorer && (
              <NavigationButton
                variant="back"
                onClick={() => onModeChange('explorer')}
              >
                ← Retour
              </NavigationButton>
            )}
            <h2 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
              {isExplorer ? 'Explorer mes Expériences' : '⚡ Consigner une Expérience'}
            </h2>
          </div>
          <p className="text-lg mt-2" style={{ color: 'var(--text-secondary)' }}>
            {isExplorer 
              ? 'Découvrez vos patterns, renforcez vos excellences'
              : 'Capturez rapidement ce que vous venez de vivre'
            }
          </p>
        </div>
        
        {isExplorer && (
          <NavigationButton
            variant="primary"
            onClick={() => onModeChange('consigner')}
          >
            ⚡ Consigner une expérience
          </NavigationButton>
        )}
      </div>
    </div>
  );
};
