
import React from 'react';

// VERSION 1 - Original (viewBox 500x500)
const OriginalSvgIcon: React.FC<{ size?: number; color?: string }> = ({ 
  size = 24, 
  color = '#ee5a01' 
}) => (
  <svg 
    viewBox="0 0 500 500" 
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    style={{ fill: color }}
  >
    <path d="M250,50L350,200H150L250,50ZM75,250L200,425H50L75,250ZM425,250L450,425H300L425,250ZM250,350L350,500H150L250,350Z"/>
  </svg>
);

// VERSION 2 - Normalisé (viewBox 0 0 100 100)
const NormalizedSvgIcon: React.FC<{ size?: number; color?: string }> = ({ 
  size = 24, 
  color = '#ee5a01' 
}) => (
  <svg 
    viewBox="0 0 100 100" 
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    style={{ fill: color }}
  >
    <path d="M50,10L70,40H30L50,10ZM15,50L40,85H10L15,50ZM85,50L90,85H60L85,50ZM50,70L70,100H30L50,70Z"/>
  </svg>
);

// VERSION 3 - Simplifié (viewBox 0 0 24 24)
const SimplifiedSvgIcon: React.FC<{ size?: number; color?: string }> = ({ 
  size = 24, 
  color = '#ee5a01' 
}) => (
  <svg 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    style={{ fill: color }}
  >
    <path d="M12 2L18 10H6L12 2ZM3 12L9 20H1L3 12ZM21 12L23 20H15L21 12ZM12 14L18 22H6L12 14Z"/>
  </svg>
);

// VERSION 4 - Stroke au lieu de Fill
const StrokeSvgIcon: React.FC<{ size?: number; color?: string }> = ({ 
  size = 24, 
  color = '#ee5a01' 
}) => (
  <svg 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    style={{ fill: 'none', stroke: color, strokeWidth: '1.5' }}
  >
    <path d="M12 2L18 10H6L12 2ZM3 12L9 20H1L3 12ZM21 12L23 20H15L21 12ZM12 14L18 22H6L12 14Z"/>
  </svg>
);

// VERSION 5 - Path optimisé avec curves
const OptimizedSvgIcon: React.FC<{ size?: number; color?: string }> = ({ 
  size = 24, 
  color = '#ee5a01' 
}) => (
  <svg 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    style={{ fill: color }}
  >
    <path d="M12 2l5.5 7.5H6.5L12 2zm-8.5 9.5L8 20H1l2.5-8.5zm17 0L23 20h-7l2.5-8.5zM12 14l5.5 7.5H6.5L12 14z"/>
  </svg>
);

const TestSvgFormats: React.FC = () => {
  const iconVersions = [
    {
      name: 'VERSION 1 - Original',
      description: 'viewBox 500x500 - Coordonnées originales',
      component: OriginalSvgIcon,
      code: `<path d="M250,50L350,200H150L250,50ZM75,250L200,425H50L75,250ZM425,250L450,425H300L425,250ZM250,350L350,500H150L250,350Z"/>`,
      viewBox: '500x500'
    },
    {
      name: 'VERSION 2 - Normalisé',
      description: 'viewBox 100x100 - Coordonnées proportionnelles',
      component: NormalizedSvgIcon,
      code: `<path d="M50,10L70,40H30L50,10ZM15,50L40,85H10L15,50ZM85,50L90,85H60L85,50ZM50,70L70,100H30L50,70Z"/>`,
      viewBox: '100x100'
    },
    {
      name: 'VERSION 3 - Simplifié',
      description: 'viewBox 24x24 - Coordonnées simples',
      component: SimplifiedSvgIcon,
      code: `<path d="M12 2L18 10H6L12 2ZM3 12L9 20H1L3 12ZM21 12L23 20H15L21 12ZM12 14L18 22H6L12 14Z"/>`,
      viewBox: '24x24'
    },
    {
      name: 'VERSION 4 - Stroke',
      description: 'stroke au lieu de fill - Plus léger visuellement',
      component: StrokeSvgIcon,
      code: `<path d="M12 2L18 10H6L12 2ZM3 12L9 20H1L3 12ZM21 12L23 20H15L21 12ZM12 14L18 22H6L12 14Z"/>`,
      viewBox: '24x24 + stroke'
    },
    {
      name: 'VERSION 5 - Optimisé',
      description: 'Path avec courbes lisses',
      component: OptimizedSvgIcon,
      code: `<path d="M12 2l5.5 7.5H6.5L12 2zm-8.5 9.5L8 20H1l2.5-8.5zm17 0L23 20h-7l2.5-8.5zM12 14l5.5 7.5H6.5L12 14z"/>`,
      viewBox: '24x24 + optimized'
    }
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-[#ee5a01] mb-4">
            🔬 SAUVETAGE SVG - Test Formats d'Encodage
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Comparaison visuelle de 5 versions de l'icône ExcellenceMenu
          </p>
          <div className="bg-[#2a2a2a] p-4 rounded-lg inline-block">
            <div className="text-sm text-gray-400 mb-2">Objectif :</div>
            <div className="text-[#0195ee]">Identifier la version qui rend le mieux à 24px</div>
          </div>
        </header>

        {/* Comparaison rapide côte à côte */}
        <section className="mb-12 bg-[#2a2a2a] p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-[#0195ee] mb-6">
            🚀 COMPARAISON RAPIDE - Toutes à 24px
          </h2>
          <div className="flex gap-8 justify-center items-center mb-6">
            {iconVersions.map((version, index) => (
              <div key={index} className="text-center">
                <div className="mb-2 text-xs text-gray-400">V{index + 1}</div>
                <div className="bg-[#1a1a1a] p-4 rounded border border-[#404040]">
                  <version.component size={24} color="#ee5a01" />
                </div>
                <div className="mt-2 text-xs text-gray-300">{version.viewBox}</div>
              </div>
            ))}
          </div>
          <div className="text-center text-sm text-gray-400">
            ⬆️ Laquelle est la plus visible et nette ?
          </div>
        </section>

        {/* Tests détaillés pour chaque version */}
        {iconVersions.map((version, index) => (
          <section key={index} className="mb-8 bg-[#2a2a2a] p-6 rounded-lg">
            <h3 className="text-xl font-bold text-[#ee5a01] mb-4">
              {version.name}
            </h3>
            <p className="text-gray-300 mb-6">{version.description}</p>
            
            {/* Test de tailles multiples */}
            <div className="mb-6">
              <h4 className="text-lg font-medium text-[#0195ee] mb-3">Test Tailles</h4>
              <div className="flex gap-6 items-center">
                {[12, 16, 20, 24, 32].map(size => (
                  <div key={size} className="text-center">
                    <div className="text-xs text-gray-400 mb-2">{size}px</div>
                    <div className="bg-[#1a1a1a] p-3 rounded border border-[#404040] inline-block">
                      <version.component size={size} color="#ee5a01" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Test de couleurs */}
            <div className="mb-6">
              <h4 className="text-lg font-medium text-[#0195ee] mb-3">Test Couleurs</h4>
              <div className="flex gap-6 items-center">
                {[
                  { name: 'Orange', color: '#ee5a01' },
                  { name: 'Bleu', color: '#0195ee' },
                  { name: 'Gris', color: '#b0b0b0' },
                  { name: 'Blanc', color: '#ffffff' }
                ].map(({ name, color }) => (
                  <div key={name} className="text-center">
                    <div className="text-xs text-gray-400 mb-2">{name}</div>
                    <div className="bg-[#1a1a1a] p-3 rounded border border-[#404040] inline-block">
                      <version.component size={24} color={color} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Code SVG */}
            <div className="bg-[#1a1a1a] p-4 rounded border border-[#404040]">
              <div className="text-sm text-gray-400 mb-2">Code SVG :</div>
              <pre className="text-xs text-gray-300 font-mono overflow-x-auto">
                {`<svg viewBox="${version.viewBox.includes('x') ? version.viewBox.replace('x', ' 0 0 ').replace('x', ' ') : '0 0 24 24'}" xmlns="http://www.w3.org/2000/svg">
  ${version.code}
</svg>`}
              </pre>
            </div>
          </section>
        ))}

        {/* Instructions d'évaluation */}
        <section className="mt-12 bg-[#333] p-6 rounded-lg">
          <h3 className="text-xl font-bold text-[#ee5a01] mb-4">
            📋 CRITÈRES D'ÉVALUATION
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-[#0195ee] mb-3">À vérifier :</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>✅ Netteté à 24px (taille principale)</li>
                <li>✅ Lisibilité à 16px (taille réduite)</li>
                <li>✅ Cohérence visuelle avec le design</li>
                <li>✅ Performance (taille du code)</li>
                <li>✅ Compatibilité navigateurs</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-[#0195ee] mb-3">Questions clés :</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>🤔 Laquelle garde le mieux les détails ?</li>
                <li>🤔 Version stroke ou fill ?</li>
                <li>🤔 ViewBox 24x24 ou plus grand ?</li>
                <li>🤔 Path simple ou optimisé ?</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-[#1a1a1a] rounded">
            <div className="text-[#0195ee] font-bold mb-2">📸 Action requise :</div>
            <p className="text-gray-300">
              Faites une capture d'écran et indiquez quelle version rend le mieux !
              Nous implémenterons ensuite la version gagnante dans votre design system.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TestSvgFormats;
