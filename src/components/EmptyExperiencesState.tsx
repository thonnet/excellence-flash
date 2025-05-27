
import React from 'react';
import { NavigationButton } from './NavigationButton';

interface EmptyExperiencesStateProps {
  isFiltered: boolean;
  onConsigner: () => void;
}

export const EmptyExperiencesState: React.FC<EmptyExperiencesStateProps> = ({
  isFiltered,
  onConsigner
}) => {
  return (
    <div className="text-center py-16">
      <div className="text-5xl mb-4 opacity-50">🔍</div>
      <h3 className="text-lg mb-2" style={{ color: '#ccc' }}>
        {isFiltered ? 'Aucune expérience trouvée' : 'Aucune expérience enregistrée'}
      </h3>
      <p className="mb-8" style={{ color: '#999' }}>
        {isFiltered 
          ? 'Ajustez vos filtres ou consignez une nouvelle expérience'
          : 'Commencez par consigner votre première expérience'
        }
      </p>
      <NavigationButton
        variant="primary"
        onClick={onConsigner}
      >
        ⚡ Consigner une expérience
      </NavigationButton>
    </div>
  );
};
