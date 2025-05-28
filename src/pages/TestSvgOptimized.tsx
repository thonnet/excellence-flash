
import React, { useEffect } from 'react';

// SVG Optimisé - Version finale Illustrator
const OptimizedExcellenceIcon: React.FC<{ size?: number; color?: string }> = ({ 
  size = 24, 
  color = '#ee5a01' 
}) => {
  useEffect(() => {
    console.log(`OptimizedExcellenceIcon mounted: size=${size}, color=${color}`);
  }, [size, color]);

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 427.16 495.94"
      width={size}
      height={size}
      style={{ 
        fill: color,
        border: '2px solid #00ff00', // Bordure verte pour debug
        background: 'rgba(0,255,0,0.1)' // Fond vert semi-transparent pour debug
      }}
    >
      <g>
        <path d="M226.11,97.43l41.3,127.1c1.8,5.5,6.9,9.2,12.7,9.2h133.7c12.9,0,18.3,16.5,7.8,24.1l-108.1,78.6c-4.7,3.4-6.6,9.4-4.8,14.9l41.3,127.1c4,12.3-10.1,22.5-20.5,14.9l-108.1-78.6c-4.7-3.4-11-3.4-15.7,0l-108.1,78.6c-10.4,7.6-24.5-2.6-20.5-14.9l41.3-127.1c1.8-5.5-.2-11.5-4.8-14.9L5.51,257.83c-10.4-7.6-5.1-24.1,7.8-24.1h133.7c5.8,0,10.9-3.7,12.7-9.2l41.3-127.1c4-12.3,21.4-12.3,25.4,0h-.3Z"/>
        <path d="M307.81,2.53l22.7,41.7c1,1.8,3,2.8,5,2.4l46.7-8.7c4.5-.8,7.5,4.6,4.3,7.9l-32.6,34.5c-1.4,1.5-1.7,3.7-.7,5.5l22.7,41.7c2.2,4-2,8.5-6.2,6.5l-42.9-20.4c-1.9-.9-4.1-.5-5.5,1l-32.6,34.5c-3.2,3.3-8.7.7-8.1-3.9l6.1-47.1c.3-2-.8-4-2.7-4.9l-42.9-20.4c-4.1-2-3.3-8.1,1.2-8.9l46.7-8.7c2-.4,3.6-2,3.8-4l6.1-47.1c.6-4.5,6.7-5.7,8.9-1.7v.1Z"/>
        <path d="M164.71,72.83l-7.3,25.8c-.3,1.1.1,2.3,1.1,2.9l22.3,14.9c2.2,1.4,1.2,4.8-1.4,4.9l-26.8,1c-1.2,0-2.2.8-2.5,1.9l-7.3,25.8c-.7,2.5-4.2,2.6-5.1.2l-9.3-25.1c-.4-1.1-1.5-1.8-2.6-1.7l-26.8,1c-2.6,0-3.8-3.2-1.8-4.8l21.1-16.6c.9-.7,1.3-1.9.9-3l-9.3-25.1c-.9-2.4,1.8-4.6,4-3.1l22.3,14.9c1,.6,2.2.6,3.1-.1l21.1-16.6c2-1.6,4.9.3,4.2,2.8h.1Z"/>
        <path d="M200.01,28.23l-3.7,13c-.2.6,0,1.2.5,1.5l11.3,7.5c1.1.7.6,2.4-.7,2.5l-13.5.5c-.6,0-1.1.4-1.2,1l-3.7,13c-.4,1.3-2.1,1.3-2.6,0l-4.7-12.7c-.2-.5-.7-.9-1.3-.9l-13.5.5c-1.3,0-1.9-1.6-.9-2.4l10.7-8.4c.5-.4.6-1,.4-1.5l-4.7-12.7c-.5-1.2.9-2.3,2-1.6l11.3,7.5c.5.3,1.1.3,1.6,0l10.7-8.4c1-.8,2.5.2,2.1,1.4l-.1.2Z"/>
      </g>
    </svg>
  );
};

// Version avec currentColor pour héritage CSS
const CurrentColorExcellenceIcon: React.FC<{ size?: number; className?: string }> = ({ 
  size = 24, 
  className = 'text-orange-500' 
}) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 427.16 495.94"
    width={size}
    height={size}
    className={className}
    style={{ 
      fill: 'currentColor',
      border: '2px solid #ff0000', // Bordure rouge pour debug
      background: 'rgba(255,0,0,0.1)' // Fond rouge semi-transparent pour debug
    }}
  >
    <g>
      <path d="M226.11,97.43l41.3,127.1c1.8,5.5,6.9,9.2,12.7,9.2h133.7c12.9,0,18.3,16.5,7.8,24.1l-108.1,78.6c-4.7,3.4-6.6,9.4-4.8,14.9l41.3,127.1c4,12.3-10.1,22.5-20.5,14.9l-108.1-78.6c-4.7-3.4-11-3.4-15.7,0l-108.1,78.6c-10.4,7.6-24.5-2.6-20.5-14.9l41.3-127.1c1.8-5.5-.2-11.5-4.8-14.9L5.51,257.83c-10.4-7.6-5.1-24.1,7.8-24.1h133.7c5.8,0,10.9-3.7,12.7-9.2l41.3-127.1c4-12.3,21.4-12.3,25.4,0h-.3Z"/>
      <path d="M307.81,2.53l22.7,41.7c1,1.8,3,2.8,5,2.4l46.7-8.7c4.5-.8,7.5,4.6,4.3,7.9l-32.6,34.5c-1.4,1.5-1.7,3.7-.7,5.5l22.7,41.7c2.2,4-2,8.5-6.2,6.5l-42.9-20.4c-1.9-.9-4.1-.5-5.5,1l-32.6,34.5c-3.2,3.3-8.7.7-8.1-3.9l6.1-47.1c.3-2-.8-4-2.7-4.9l-42.9-20.4c-4.1-2-3.3-8.1,1.2-8.9l46.7-8.7c2-.4,3.6-2,3.8-4l6.1-47.1c.6-4.5,6.7-5.7,8.9-1.7v.1Z"/>
      <path d="M164.71,72.83l-7.3,25.8c-.3,1.1.1,2.3,1.1,2.9l22.3,14.9c2.2,1.4,1.2,4.8-1.4,4.9l-26.8,1c-1.2,0-2.2.8-2.5,1.9l-7.3,25.8c-.7,2.5-4.2,2.6-5.1.2l-9.3-25.1c-.4-1.1-1.5-1.8-2.6-1.7l-26.8,1c-2.6,0-3.8-3.2-1.8-4.8l21.1-16.6c.9-.7,1.3-1.9.9-3l-9.3-25.1c-.9-2.4,1.8-4.6,4-3.1l22.3,14.9c1,.6,2.2.6,3.1-.1l21.1-16.6c2-1.6,4.9.3,4.2,2.8h.1Z"/>
      <path d="M200.01,28.23l-3.7,13c-.2.6,0,1.2.5,1.5l11.3,7.5c1.1.7.6,2.4-.7,2.5l-13.5.5c-.6,0-1.1.4-1.2,1l-3.7,13c-.4,1.3-2.1,1.3-2.6,0l-4.7-12.7c-.2-.5-.7-.9-1.3-.9l-13.5.5c-1.3,0-1.9-1.6-.9-2.4l10.7-8.4c.5-.4.6-1,.4-1.5l-4.7-12.7c-.5-1.2.9-2.3,2-1.6l11.3,7.5c.5.3,1.1.3,1.6,0l10.7-8.4c1-.8,2.5.2,2.1,1.4l-.1.2Z"/>
    </g>
  </svg>
);

// Fallback Unicode version (secours)
const UnicodeExcellenceIcon: React.FC<{ size?: number; color?: string }> = ({ 
  size = 24, 
  color = '#ee5a01' 
}) => (
  <span 
    style={{ 
      fontSize: `${size}px`, 
      color: color,
      lineHeight: 1,
      border: '2px solid #0000ff', // Bordure bleue pour debug
      background: 'rgba(0,0,255,0.1)', // Fond bleu semi-transparent pour debug
      display: 'inline-block',
      padding: '2px'
    }}
  >
    ⭐
  </span>
);

const TestSvgOptimized: React.FC = () => {
  useEffect(() => {
    console.log('TestSvgOptimized page mounted - Testing final optimized SVG version');
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-[#ee5a01] mb-4">
            🔬 TEST SVG OPTIMISÉ - Version finale Illustrator
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Test de la version SVG optimisée avec viewBox précis et paths propres
          </p>
          <div className="bg-[#2a2a2a] p-4 rounded-lg inline-block">
            <div className="text-sm text-gray-400 mb-2">Mission finale :</div>
            <div className="text-[#0195ee]">Valider la version optimisée ou passer définitivement aux icônes Phosphor</div>
          </div>
        </header>

        {/* Section 1: Test de rendu direct */}
        <section className="mb-12 bg-[#2a2a2a] p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-[#0195ee] mb-6">
            🎯 1. TEST DE RENDU DIRECT
          </h2>
          
          <div className="space-y-6">
            <div className="flex gap-8 items-center">
              <div className="text-center">
                <div className="text-sm text-gray-400 mb-3">SVG Optimisé (24px)</div>
                <OptimizedExcellenceIcon size={24} color="#ee5a01" />
                <div className="text-xs text-gray-500 mt-2">Bordure verte visible ?</div>
              </div>
              
              <div className="text-center">
                <div className="text-sm text-gray-400 mb-3">CurrentColor (24px)</div>
                <CurrentColorExcellenceIcon size={24} className="text-orange-500" />
                <div className="text-xs text-gray-500 mt-2">Bordure rouge visible ?</div>
              </div>
              
              <div className="text-center">
                <div className="text-sm text-gray-400 mb-3">Unicode fallback (24px)</div>
                <UnicodeExcellenceIcon size={24} color="#ee5a01" />
                <div className="text-xs text-gray-500 mt-2">Bordure bleue visible ?</div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-[#1a1a1a] rounded">
            <div className="text-[#0195ee] font-bold mb-2">🔍 Diagnostic immédiat :</div>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Bordures colorées = SVG prend l'espace (BIEN)</li>
              <li>• Pas de bordure = SVG invisible (PROBLÈME)</li>
              <li>• Console logs = composants se montent</li>
              <li>• Unicode visible = fallback fonctionne</li>
            </ul>
          </div>
        </section>

        {/* Section 2: Test tailles critiques */}
        <section className="mb-12 bg-[#2a2a2a] p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-[#0195ee] mb-6">
            📏 2. TEST TAILLES CRITIQUES
          </h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium text-[#ee5a01] mb-4">SVG Optimisé</h3>
              <div className="flex gap-6 items-center">
                {[14, 16, 20, 24, 32, 48].map(size => (
                  <div key={size} className="text-center">
                    <div className="text-xs text-gray-400 mb-2">{size}px</div>
                    <OptimizedExcellenceIcon size={size} color="#ee5a01" />
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-[#ee5a01] mb-4">CurrentColor Version</h3>
              <div className="flex gap-6 items-center">
                {[14, 16, 20, 24, 32, 48].map(size => (
                  <div key={size} className="text-center">
                    <div className="text-xs text-gray-400 mb-2">{size}px</div>
                    <CurrentColorExcellenceIcon size={size} className="text-orange-500" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Test couleurs design system */}
        <section className="mb-12 bg-[#2a2a2a] p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-[#0195ee] mb-6">
            🎨 3. TEST COULEURS DESIGN SYSTEM
          </h2>
          
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-[#ee5a01] mb-4">SVG avec couleurs directes</h3>
              <div className="flex gap-6 items-center">
                {[
                  { name: 'Orange', color: '#ee5a01' },
                  { name: 'Bleu', color: '#0195ee' },
                  { name: 'Gris', color: '#707070' },
                  { name: 'Vert', color: '#8B9657' }
                ].map(({ name, color }) => (
                  <div key={name} className="text-center">
                    <div className="text-xs text-gray-400 mb-2">{name}</div>
                    <OptimizedExcellenceIcon size={24} color={color} />
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-[#ee5a01] mb-4">CurrentColor avec classes Tailwind</h3>
              <div className="flex gap-6 items-center">
                {[
                  { name: 'Orange', className: 'text-orange-500' },
                  { name: 'Bleu', className: 'text-blue-500' },
                  { name: 'Gris', className: 'text-gray-500' },
                  { name: 'Vert', className: 'text-green-600' }
                ].map(({ name, className }) => (
                  <div key={name} className="text-center">
                    <div className="text-xs text-gray-400 mb-2">{name}</div>
                    <CurrentColorExcellenceIcon size={24} className={className} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Test en contexte réel */}
        <section className="mb-12 bg-[#2a2a2a] p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-[#0195ee] mb-6">
            🎯 4. TEST EN CONTEXTE RÉEL - Barre de filtres
          </h2>
          
          <div className="space-y-4">
            <div>
              <div className="text-sm text-gray-400 mb-2">Avec SVG Optimisé (14px) :</div>
              <div className="p-4 bg-[#1a1a1a] rounded border border-[#404040] flex gap-4 items-center">
                <div className="flex items-center gap-2">
                  <OptimizedExcellenceIcon size={14} color="#b0b0b0" />
                  <span className="text-sm text-gray-300">Excellences</span>
                </div>
                <div className="flex items-center gap-2">
                  <OptimizedExcellenceIcon size={14} color="#ee5a01" />
                  <span className="text-sm text-[#ee5a01]">Actif</span>
                </div>
                <div className="text-xs text-gray-500">← Icônes visibles ?</div>
              </div>
            </div>
            
            <div>
              <div className="text-sm text-gray-400 mb-2">Avec CurrentColor (14px) :</div>
              <div className="p-4 bg-[#1a1a1a] rounded border border-[#404040] flex gap-4 items-center">
                <div className="flex items-center gap-2 text-gray-400">
                  <CurrentColorExcellenceIcon size={14} className="text-current" />
                  <span className="text-sm">Excellences</span>
                </div>
                <div className="flex items-center gap-2 text-orange-500">
                  <CurrentColorExcellenceIcon size={14} className="text-current" />
                  <span className="text-sm">Actif</span>
                </div>
                <div className="text-xs text-gray-500">← Icônes visibles ?</div>
              </div>
            </div>
            
            <div>
              <div className="text-sm text-gray-400 mb-2">Fallback Unicode (14px) :</div>
              <div className="p-4 bg-[#1a1a1a] rounded border border-[#404040] flex gap-4 items-center">
                <div className="flex items-center gap-2">
                  <UnicodeExcellenceIcon size={14} color="#b0b0b0" />
                  <span className="text-sm text-gray-300">Excellences</span>
                </div>
                <div className="flex items-center gap-2">
                  <UnicodeExcellenceIcon size={14} color="#ee5a01" />
                  <span className="text-sm text-[#ee5a01]">Actif</span>
                </div>
                <div className="text-xs text-gray-500">← Toujours visible</div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Verdict final */}
        <section className="mb-12 bg-[#333] p-6 rounded-lg">
          <h2 className="text-xl font-bold text-[#ee5a01] mb-4">
            🏁 5. VERDICT FINAL
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-[#0195ee] mb-3">✅ Si SVG fonctionne :</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Version optimisée validée !</li>
                <li>• Intégration dans ExcellenceMenuIcon</li>
                <li>• Utilisation de currentColor recommandée</li>
                <li>• ViewBox 427.16x495.94 optimal</li>
                <li>• Paths Adobe Illustrator propres</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-[#0195ee] mb-3">❌ Si SVG ne fonctionne pas :</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Passage définitif aux icônes Phosphor</li>
                <li>• ou fallback Unicode ⭐</li>
                <li>• ou création d'icônes CSS pures</li>
                <li>• Abandon des SVG personnalisés</li>
                <li>• Focus sur la fonctionnalité</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-[#1a1a1a] rounded">
            <div className="text-[#0195ee] font-bold mb-2">📸 FAITES VOTRE RAPPORT :</div>
            <ol className="text-gray-300 text-sm space-y-1">
              <li>1. Ouvrez DevTools (F12) et vérifiez la Console</li>
              <li>2. Regardez si les bordures colorées sont visibles</li>
              <li>3. Testez le redimensionnement de la fenêtre</li>
              <li>4. Indiquez quelle version fonctionne le mieux</li>
              <li>5. Nous prendrons la décision finale !</li>
            </ol>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TestSvgOptimized;
