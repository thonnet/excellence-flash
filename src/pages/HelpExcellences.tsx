
import React from 'react';
import { HelpPage } from '../components/HelpPage';

const HelpExcellences = () => {
  const handleBack = () => {
    window.close();
  };

  return (
    <HelpPage 
      title="Guide - Vos Excellences"
      onBack={handleBack}
    >
      <div className="space-y-8">
        {/* Intention de la page */}
        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--accent-orange)' }}>Intention de la page</h2>
          <ul className="space-y-2 text-lg">
            <li>• Conscientisez vos capacités pour les mobiliser intentionnellement</li>
            <li>• Rassemblez vos forces distinctives en un lieu unique</li>
            <li>• Cartographiez votre signature distinctive</li>
            <li>• Transformez vos capacités implicites en atouts stratégiques</li>
          </ul>
        </section>

        {/* Créez votre collection */}
        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--accent-orange)' }}>Créez votre collection d'excellences vivantes</h2>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            Cette page transforme vos talents naturels en ressources conscientes et stratégiques. 
            Chaque carte d'excellence que vous créez devient un atout que vous pourrez mobiliser intentionnellement.
          </p>
        </section>

        {/* Conseils pour nommer */}
        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--accent-orange)' }}>Conseils pour nommer vos excellences</h2>
          <ul className="space-y-2 text-lg">
            <li>• Privilégiez des noms courts pour pouvoir les embrasser d'un coup d'œil</li>
            <li>• Choisissez des termes qui vous parlent et résonnent avec votre expérience</li>
            <li>• N'hésitez pas à inventer vos propres appellations si elles sont plus justes</li>
          </ul>
        </section>

        {/* Faites évoluer */}
        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--accent-orange)' }}>Faites évoluer vos cartes dans le temps</h2>
          <ul className="space-y-2 text-lg">
            <li>• Affinez régulièrement le nom et la description de chaque excellence</li>
            <li>• Ajoutez de nouvelles excellences au fur et à mesure de vos découvertes</li>
            <li>• Déplacez vos cartes entre catégories quand votre maîtrise progresse</li>
            <li>• Parcourez votre collection pour vous rappeler l'étendue de vos ressources</li>
          </ul>
        </section>

        {/* L'objectif */}
        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--accent-orange)' }}>L'objectif</h2>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            Transformer des capacités implicites en un catalogue personnel d'excellences que vous pourrez 
            mobiliser consciemment pour créer votre signature distinctive.
          </p>
        </section>

        {/* Citation finale */}
        <section className="border-t pt-8" style={{ borderColor: 'var(--border-subtle)' }}>
          <blockquote className="text-xl italic text-center" style={{ color: 'var(--accent-orange)' }}>
            "Votre diversité n'est pas une dispersion, c'est votre force intégrative unique."
          </blockquote>
        </section>
      </div>
    </HelpPage>
  );
};

export default HelpExcellences;
