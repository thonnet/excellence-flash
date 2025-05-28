
import React, { useEffect } from 'react';

// SVG 1.1 Standard avec métadonnées Adobe - Version complète
const StandardExcellenceIcon: React.FC<{ size?: number; color?: string }> = ({ 
  size = 24, 
  color = '#ee5a01' 
}) => {
  useEffect(() => {
    console.log(`StandardExcellenceIcon mounted: size=${size}, color=${color}`);
  }, [size, color]);

  return (
    <svg 
      version="1.1" 
      xmlns="http://www.w3.org/2000/svg" 
      xmlnsXlink="http://www.w3.org/1999/xlink" 
      viewBox="0 0 500 500"
      enableBackground="new 0 0 500 500"
      width={size}
      height={size}
      style={{ 
        fill: color,
        border: '2px solid #ff0000', // Bordure rouge pour debug
        background: 'rgba(255,255,255,0.1)' // Fond semi-transparent pour debug
      }}
    >
      <metadata></metadata>
      <g>
        <g>
          <path d="M262.7,101.4L304,228.5c1.8,5.5,6.9,9.2,12.7,9.2h133.7c12.9,0,18.3,16.5,7.8,24.1l-108.1,78.6c-4.7,3.4-6.6,9.4-4.8,14.9
            l41.3,127.1c4,12.3-10.1,22.5-20.5,14.9L258,418.7c-4.7-3.4-11-3.4-15.7,0l-108.1,78.6c-10.4,7.6-24.5-2.6-20.5-14.9L155,355.3
            c1.8-5.5-0.2-11.5-4.8-14.9L42.1,261.8c-10.4-7.6-5.1-24.1,7.8-24.1h133.7c5.8,0,10.9-3.7,12.7-9.2l41.3-127.1
            c4-12.3,21.4-12.3,25.4,0L262.7,101.4z"/>
          <path d="M344.4,6.5l22.7,41.7c1,1.8,3,2.8,5,2.4l46.7-8.7c4.5-0.8,7.5,4.6,4.3,7.9l-32.6,34.5c-1.4,1.5-1.7,3.7-0.7,5.5l22.7,41.7
            c2.2,4-2,8.5-6.2,6.5l-42.9-20.4c-1.9-0.9-4.1-0.5-5.5,1l-32.6,34.5c-3.2,3.3-8.7,0.7-8.1-3.9l6.1-47.1c0.3-2-0.8-4-2.7-4.9
            l-42.9-20.4c-4.1-2-3.3-8.1,1.2-8.9l46.7-8.7c2-0.4,3.6-2,3.8-4l6.1-47.1C336.1,3.6,342.2,2.4,344.4,6.5L344.4,6.5z"/>
          <path d="M201.3,76.8l-7.3,25.8c-0.3,1.1,0.1,2.3,1.1,2.9l22.3,14.9c2.2,1.4,1.2,4.8-1.4,4.9l-26.8,1c-1.2,0-2.2,0.8-2.5,1.9
            l-7.3,25.8c-0.7,2.5-4.2,2.6-5.1,0.2l-9.3-25.1c-0.4-1.1-1.5-1.8-2.6-1.7l-26.8,1c-2.6,0-3.8-3.2-1.8-4.8l21.1-16.6
            c0.9-0.7,1.3-1.9,0.9-3l-9.3-25.1c-0.9-2.4,1.8-4.6,4-3.1l22.3,14.9c1,0.6,2.2,0.6,3.1-0.1L197,74c2-1.6,4.9,0.3,4.2,2.8
            L201.3,76.8z"/>
          <path d="M236.6,32.2l-3.7,13c-0.2,0.6,0,1.2,0.5,1.5l11.3,7.5c1.1,0.7,0.6,2.4-0.7,2.5l-13.5,0.5c-0.6,0-1.1,0.4-1.2,1l-3.7,13
            c-0.4,1.3-2.1,1.3-2.6,0l-4.7-12.7c-0.2-0.5-0.7-0.9-1.3-0.9l-13.5,0.5c-1.3,0-1.9-1.6-0.9-2.4l10.7-8.4c0.5-0.4,0.6-1,0.4-1.5
            L209,33.1c-0.5-1.2,0.9-2.3,2-1.6l11.3,7.5c0.5,0.3,1.1,0.3,1.6,0l10.7-8.4c1-0.8,2.5,0.2,2.1,1.4L236.6,32.2z"/>
        </g>
      </g>
    </svg>
  );
};

// Version simple pour comparaison
const SimpleExcellenceIcon: React.FC<{ size?: number; color?: string }> = ({ 
  size = 24, 
  color = '#ee5a01' 
}) => (
  <svg 
    viewBox="0 0 500 500" 
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    style={{ 
      fill: color,
      border: '2px solid #00ff00', // Bordure verte pour debug
      background: 'rgba(255,255,255,0.1)'
    }}
  >
    <path d="M250,50L350,200H150L250,50ZM75,250L200,425H50L75,250ZM425,250L450,425H300L425,250ZM250,350L350,500H150L250,350Z"/>
  </svg>
);

// Test basique avec rectangle coloré
const TestRectangle: React.FC<{ size?: number; color?: string }> = ({ 
  size = 24, 
  color = '#ee5a01' 
}) => (
  <svg 
    viewBox="0 0 100 100" 
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    style={{ 
      border: '2px solid #0000ff', // Bordure bleue pour debug
      background: 'rgba(255,255,255,0.1)'
    }}
  >
    <rect x="10" y="10" width="80" height="80" fill={color} />
  </svg>
);

const TestSvgStandard: React.FC = () => {
  useEffect(() => {
    console.log('TestSvgStandard page mounted');
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-[#ee5a01] mb-4">
            🔬 TEST SVG 1.1 STANDARD - Diagnostic Complet
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Test de la version SVG 1.1 avec métadonnées Adobe + diagnostics visuels
          </p>
          <div className="bg-[#2a2a2a] p-4 rounded-lg inline-block">
            <div className="text-sm text-gray-400 mb-2">Mission :</div>
            <div className="text-[#0195ee]">Identifier pourquoi les SVG ne s'affichent pas et les réparer</div>
          </div>
        </header>

        {/* Section 1: Test de rendu basique */}
        <section className="mb-12 bg-[#2a2a2a] p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-[#0195ee] mb-6">
            📋 1. TEST DE RENDU BASIQUE
          </h2>
          
          <div className="space-y-6">
            <div className="flex gap-8 items-center">
              <div className="text-center">
                <div className="text-sm text-gray-400 mb-3">Rectangle test (doit être visible)</div>
                <TestRectangle size={48} color="#ee5a01" />
                <div className="text-xs text-gray-500 mt-2">Bordure bleue visible ?</div>
              </div>
              
              <div className="text-center">
                <div className="text-sm text-gray-400 mb-3">SVG Standard (nouvelle version)</div>
                <StandardExcellenceIcon size={48} color="#ee5a01" />
                <div className="text-xs text-gray-500 mt-2">Bordure rouge visible ?</div>
              </div>
              
              <div className="text-center">
                <div className="text-sm text-gray-400 mb-3">SVG Simple (ancienne version)</div>
                <SimpleExcellenceIcon size={48} color="#ee5a01" />
                <div className="text-xs text-gray-500 mt-2">Bordure verte visible ?</div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-[#1a1a1a] rounded">
            <div className="text-[#0195ee] font-bold mb-2">🔍 Diagnostic visuel :</div>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Bordures colorées = SVG prend l'espace</li>
              <li>• Fond semi-transparent = zone d'affichage</li>
              <li>• Console logs = composants se montent</li>
            </ul>
          </div>
        </section>

        {/* Section 2: Test tailles multiples */}
        <section className="mb-12 bg-[#2a2a2a] p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-[#0195ee] mb-6">
            📏 2. TEST TAILLES MULTIPLES
          </h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium text-[#ee5a01] mb-4">SVG Standard (nouveau)</h3>
              <div className="flex gap-6 items-center">
                {[12, 16, 20, 24, 32, 48].map(size => (
                  <div key={size} className="text-center">
                    <div className="text-xs text-gray-400 mb-2">{size}px</div>
                    <StandardExcellenceIcon size={size} color="#ee5a01" />
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-[#ee5a01] mb-4">SVG Simple (ancien)</h3>
              <div className="flex gap-6 items-center">
                {[12, 16, 20, 24, 32, 48].map(size => (
                  <div key={size} className="text-center">
                    <div className="text-xs text-gray-400 mb-2">{size}px</div>
                    <SimpleExcellenceIcon size={size} color="#ee5a01" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Test couleurs */}
        <section className="mb-12 bg-[#2a2a2a] p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-[#0195ee] mb-6">
            🎨 3. TEST COULEURS DESIGN SYSTEM
          </h2>
          
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-[#ee5a01] mb-4">SVG Standard</h3>
              <div className="flex gap-6 items-center">
                {[
                  { name: 'Orange', color: '#ee5a01' },
                  { name: 'Bleu', color: '#0195ee' },
                  { name: 'Gris', color: '#b0b0b0' },
                  { name: 'Blanc', color: '#ffffff' }
                ].map(({ name, color }) => (
                  <div key={name} className="text-center">
                    <div className="text-xs text-gray-400 mb-2">{name}</div>
                    <StandardExcellenceIcon size={24} color={color} />
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-[#ee5a01] mb-4">SVG Simple</h3>
              <div className="flex gap-6 items-center">
                {[
                  { name: 'Orange', color: '#ee5a01' },
                  { name: 'Bleu', color: '#0195ee' },
                  { name: 'Gris', color: '#b0b0b0' },
                  { name: 'Blanc', color: '#ffffff' }
                ].map(({ name, color }) => (
                  <div key={name} className="text-center">
                    <div className="text-xs text-gray-400 mb-2">{name}</div>
                    <SimpleExcellenceIcon size={24} color={color} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Test contexte réel */}
        <section className="mb-12 bg-[#2a2a2a] p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-[#0195ee] mb-6">
            🎯 4. TEST EN CONTEXTE RÉEL (Barre de filtres)
          </h2>
          
          <div className="space-y-4">
            <div>
              <div className="text-sm text-gray-400 mb-2">Avec SVG Standard :</div>
              <div className="p-4 bg-[#1a1a1a] rounded border border-[#404040] flex gap-4 items-center">
                <div className="flex items-center gap-2">
                  <StandardExcellenceIcon size={14} color="#b0b0b0" />
                  <span className="text-sm text-gray-300">Excellences</span>
                </div>
                <div className="text-xs text-gray-500">← Icône visible ?</div>
              </div>
            </div>
            
            <div>
              <div className="text-sm text-gray-400 mb-2">Avec SVG Simple :</div>
              <div className="p-4 bg-[#1a1a1a] rounded border border-[#404040] flex gap-4 items-center">
                <div className="flex items-center gap-2">
                  <SimpleExcellenceIcon size={14} color="#b0b0b0" />
                  <span className="text-sm text-gray-300">Excellences</span>
                </div>
                <div className="text-xs text-gray-500">← Icône visible ?</div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Diagnostique technique */}
        <section className="mb-12 bg-[#333] p-6 rounded-lg">
          <h2 className="text-xl font-bold text-[#ee5a01] mb-4">
            🔧 5. DIAGNOSTIQUE TECHNIQUE
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-[#0195ee] mb-3">À vérifier :</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>✅ Bordures colorées visibles ?</li>
                <li>✅ Console logs dans DevTools ?</li>
                <li>✅ Éléments SVG dans l'inspecteur ?</li>
                <li>✅ Erreurs de chargement CSS ?</li>
                <li>✅ Taille des éléments calculée ?</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-[#0195ee] mb-3">Solutions de secours :</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>🔄 Passer aux icônes Phosphor</li>
                <li>🔄 Utiliser des émojis temporaires</li>
                <li>🔄 Créer des composants CSS purs</li>
                <li>🔄 Charger des images PNG/SVG externes</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-[#1a1a1a] rounded">
            <div className="text-[#0195ee] font-bold mb-2">📋 Instructions :</div>
            <ol className="text-gray-300 text-sm space-y-1">
              <li>1. Ouvrez DevTools (F12)</li>
              <li>2. Regardez la Console pour les logs</li>
              <li>3. Inspectez les éléments SVG</li>
              <li>4. Faites une capture d'écran</li>
              <li>5. Reportez ce que vous voyez !</li>
            </ol>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TestSvgStandard;
