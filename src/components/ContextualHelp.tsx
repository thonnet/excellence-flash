
import React from 'react';

interface ContextualHelpProps {
  pageType: 'excellences' | 'experiences' | 'manifestee' | 'principe' | 'quete';
  className?: string;
}

export const ContextualHelp: React.FC<ContextualHelpProps> = ({
  pageType,
  className = ""
}) => {
  const handleHelpClick = () => {
    const helpRoutes = {
      excellences: '/aide/excellences',
      experiences: '/aide/experiences',
      manifestee: '/aide/manifestee',
      principe: '/aide/principe',
      quete: '/aide/quete'
    };

    // Open help page in new tab
    window.open(helpRoutes[pageType], '_blank');
  };

  return (
    <button
      onClick={handleHelpClick}
      className={`info-button ${className}`}
      title="Obtenir de l'aide sur cette section"
    >
      i
    </button>
  );
};
