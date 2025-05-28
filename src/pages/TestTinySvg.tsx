
import React from 'react';

// TinySVG optimized version (path data incomplete in request)
const TinyExcellenceIcon: React.FC<{ size?: number; color?: string }> = ({ 
  size = 24, 
  color = '#ee5a01' 
}) => (
  <svg 
    version="1.2" 
    baseProfile="tiny" 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 500 500"
    width={size}
    height={size}
    style={{ overflow: 'visible' }}
  >
    <g>
      <g>
        <path fill={color} d="M250,50L350,200H150L250,50ZM75,250L200,425H50L75,250ZM425,250L450,425H300L425,250ZM250,350L350,500H150L250,350Z"/>
      </g>
    </g>
  </svg>
);

// Standard SVG for comparison
const StandardExcellenceIcon: React.FC<{ size?: number; color?: string }> = ({ 
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

// Optimized 24x24 version for comparison
const OptimizedExcellenceIcon: React.FC<{ size?: number; color?: string }> = ({ 
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

const TestTinySvg: React.FC = () => {
  const testVersions = [
    {
      name: 'TinySVG Optimized',
      description: 'version="1.2" baseProfile="tiny" avec groupes',
      component: TinyExcellenceIcon,
      features: ['baseProfile="tiny"', 'overflow="visible"', 'Groupes <g>']
    },
    {
      name: 'Standard SVG',
      description: 'Version standard sans optimisations',
      component: StandardExcellenceIcon,
      features: ['viewBox classique', 'Path simple', 'Sans groupes']
    },
    {
      name: 'Optimized 24x24',
      description: 'ViewBox 24x24 pour comparaison',
      component: OptimizedExcellenceIcon,
      features: ['viewBox 24x24', 'Coordonnées simples', 'Léger']
    }
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-[#ee5a01] mb-4">
            🔬 TEST TINYSVG - Format SVG Optimisé
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Comparaison TinySVG vs formats standards
          </p>
          <div className="bg-[#2a2a2a] p-4 rounded-lg inline-block">
            <div className="text-sm text-gray-400 mb-2">Objectif :</div>
            <div className="text-[#0195ee]">Voir si TinySVG améliore le rendu et les performances</div>
          </div>
        </header>

        {/* Comparaison rapide côte à côte */}
        <section className="mb-12 bg-[#2a2a2a] p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-[#0195ee] mb-6">
            🚀 COMPARAISON DIRECTE - Toutes à 24px
          </h2>
          <div className="flex gap-12 justify-center items-center mb-6">
            {testVersions.map((version, index) => (
              <div key={index} className="text-center">
                <div className="mb-3 text-sm font-medium text-gray-300">{version.name}</div>
                <div className="bg-[#1a1a1a] p-6 rounded border border-[#404040] mb-3">
                  <version.component size={24} color="#ee5a01" />
                </div>
                <div className="text-xs text-gray-400 max-w-[120px]">
                  {version.description}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center text-sm text-gray-400">
            ⬆️ Comparez la netteté, les bords et la qualité visuelle
          </div>
        </section>

        {/* Tests détaillés pour chaque version */}
        {testVersions.map((version, index) => (
          <section key={index} className="mb-8 bg-[#2a2a2a] p-6 rounded-lg">
            <h3 className="text-xl font-bold text-[#ee5a01] mb-4">
              {version.name}
            </h3>
            <p className="text-gray-300 mb-4">{version.description}</p>
            
            {/* Caractéristiques techniques */}
            <div className="mb-6">
              <h4 className="text-lg font-medium text-[#0195ee] mb-3">Caractéristiques</h4>
              <div className="flex gap-3">
                {version.features.map((feature, idx) => (
                  <span key={idx} className="bg-[#1a1a1a] px-3 py-1 rounded text-xs text-gray-300">
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Test de tailles multiples */}
            <div className="mb-6">
              <h4 className="text-lg font-medium text-[#0195ee] mb-3">Test Tailles</h4>
              <div className="flex gap-6 items-center">
                {[12, 16, 20, 24, 32, 48].map(size => (
                  <div key={size} className="text-center">
                    <div className="text-xs text-gray-400 mb-2">{size}px</div>
                    <div className="bg-[#1a1a1a] p-3 rounded border border-[#404040] inline-block">
                      <version.component size={size} color="#ee5a01" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Test de performance visuelle */}
            <div className="mb-6">
              <h4 className="text-lg font-medium text-[#0195ee] mb-3">Test Performance Visuelle</h4>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-gray-400 mb-2">Fond sombre :</div>
                  <div className="bg-[#1a1a1a] p-4 rounded border border-[#404040] flex gap-4 items-center">
                    <version.component size={20} color="#ee5a01" />
                    <version.component size={20} color="#0195ee" />
                    <version.component size={20} color="#ffffff" />
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-2">Fond clair :</div>
                  <div className="bg-gray-100 p-4 rounded border border-gray-300 flex gap-4 items-center">
                    <version.component size={20} color="#ee5a01" />
                    <version.component size={20} color="#0195ee" />
                    <version.component size={20} color="#333333" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Instructions d'évaluation TinySVG */}
        <section className="mt-12 bg-[#333] p-6 rounded-lg">
          <h3 className="text-xl font-bold text-[#ee5a01] mb-4">
            📋 ÉVALUATION TINYSVG
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-[#0195ee] mb-3">Avantages TinySVG :</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>✅ Optimisé pour mobile/embarqué</li>
                <li>✅ Meilleur rendu sur petits écrans</li>
                <li>✅ Support natif des animations</li>
                <li>✅ Gestion améliorée des couleurs</li>
                <li>✅ Code plus structuré avec groupes</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-[#0195ee] mb-3">À vérifier :</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>🔍 Netteté vs version standard</li>
                <li>🔍 Performance de rendu</li>
                <li>🔍 Compatibilité navigateurs</li>
                <li>🔍 Taille du fichier final</li>
                <li>🔍 Qualité à petites tailles</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-[#1a1a1a] rounded">
            <div className="text-[#0195ee] font-bold mb-2">📝 Note importante :</div>
            <p className="text-gray-300 text-sm">
              Le path data dans votre message était incomplet. J'ai utilisé le path standard pour cette démo.
              Fournissez le path TinySVG complet pour un test précis !
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TestTinySvg;
