
import React from 'react';
import { HelpPage } from '../components/HelpPage';

const HelpExperiences = () => {
  const handleBack = () => {
    window.close();
  };

  return (
    <HelpPage 
      title="Guide - Vos Expériences"
      onBack={handleBack}
    >
      <div className="space-y-8">
        {/* Intention de la page */}
        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--accent-orange)' }}>Intention de la page</h2>
          <ul className="space-y-2 text-lg">
            <li>• Transformez vos expériences en carburant d'excellence</li>
            <li>• Conscientisez la valeur de ce que vous accomplissez naturellement</li>
            <li>• Connectez vos expériences aux excellences qu'elles révèlent</li>
            <li>• Donnez du sens et de la valeur à ce que vous vivez</li>
            <li>• Développez votre autorité intrinsèque par la présence à ce que vous faites</li>
          </ul>
        </section>

        {/* Transformez vos expériences */}
        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--accent-orange)' }}>Transformez vos expériences en carburant d'excellence</h2>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            Chaque expérience que vous vivez renforce vos excellences. En les collectant consciemment, 
            vous développez votre autorité intrinsèque et créez un cercle vertueux d'amplification.
          </p>
        </section>

        {/* Pourquoi collecter */}
        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--accent-orange)' }}>Pourquoi collecter vos expériences</h2>
          <ul className="space-y-2 text-lg">
            <li>• Reprendre le pouvoir sur votre propre définition</li>
            <li>• Reconnaître la valeur de ce que vous accomplissez naturellement</li>
            <li>• Sortir du pilote automatique des influences extérieures</li>
            <li>• Créer un renforcement positif de vos talents uniques</li>
          </ul>
        </section>

        {/* Comment procéder */}
        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--accent-orange)' }}>Comment procéder</h2>
          <ol className="space-y-3 text-lg list-decimal list-inside">
            <li>Nommez simplement cette expérience avec vos propres mots</li>
            <li>Décrivez-la librement sans filtre ni retenue - cet espace vous appartient</li>
            <li>Associez-la aux excellences qu'elle révèle ou renforce</li>
            <li>Prenez le temps de reconnaître votre contribution unique</li>
            <li>Célébrez ce que cette expérience dit de vos capacités</li>
          </ol>
        </section>

        {/* Votre espace de liberté */}
        <section className="bg-opacity-10 p-6 rounded-lg" style={{ backgroundColor: 'var(--accent-orange)' }}>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--accent-orange)' }}>Votre espace de liberté</h2>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            <strong>Exprimez-vous sans aucune retenue, cet espace est personnel et confidentiel.</strong> 
            C'est ici que vous pouvez libérer ce que vous n'exprimez jamais ailleurs - ces éléments précieux 
            souvent enfouis derrière la peur du jugement. Ce sont exactement ces parts de vous qui, une fois révélées, 
            débloqueront votre inventivité et votre capacité à vous définir comme l'identité unique que vous êtes.
          </p>
        </section>

        {/* Le processus de recâblage */}
        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--accent-orange)' }}>Le processus de recâblage cognitif</h2>
          <ul className="space-y-2 text-lg">
            <li>• <strong>Présence à soi :</strong> Observer ce que vous faites vraiment</li>
            <li>• <strong>Reconnaissance positive :</strong> Valoriser vos actions et réflexions</li>
            <li>• <strong>Autorité intrinsèque :</strong> Reprendre les rênes de vos choix</li>
            <li>• <strong>Amplification :</strong> Renforcer naturellement ce que vous faites de mieux</li>
          </ul>
        </section>

        {/* L'objectif */}
        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--accent-orange)' }}>L'objectif</h2>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            Développer une identité forte et assertive en transformant vos expériences en preuves conscientes de votre singularité.
          </p>
        </section>

        {/* Citation finale */}
        <section className="border-t pt-8" style={{ borderColor: 'var(--border-subtle)' }}>
          <blockquote className="text-xl italic text-center" style={{ color: 'var(--accent-orange)' }}>
            "Plus vous reconnaissez vos excellences en action, plus elles s'amplifient naturellement."
          </blockquote>
        </section>
      </div>
    </HelpPage>
  );
};

export default HelpExperiences;
