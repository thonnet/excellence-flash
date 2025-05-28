
import React from 'react';

// Test de vos icônes SVG originales du design system
const TestExcellenceMenuIcon: React.FC<{ size?: number; color?: string }> = ({ 
  size = 20, 
  color = '#b0b0b0' 
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

const TestSearchIcon: React.FC<{ size?: number; color?: string }> = ({ 
  size = 20, 
  color = '#b0b0b0' 
}) => (
  <svg 
    viewBox="0 0 500 500" 
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    style={{ fill: color }}
  >
    <path d="M325,75c69.1,0,125,55.9,125,125s-55.9,125-125,125c-28.8,0-55.3-9.8-76.4-26.2L173.2,374.2c-9.8,9.8-25.6,9.8-35.4,0s-9.8-25.6,0-35.4L213.2,263.4C196.8,242.3,187,215.8,187,187C187,117.9,242.9,75,325,75z M325,125c-41.4,0-75,33.6-75,75s33.6,75,75,75s75-33.6,75-75S366.4,125,325,125z"/>
  </svg>
);

const TestCustomPlusIcon: React.FC<{ size?: number; color?: string }> = ({ 
  size = 20, 
  color = '#ee5a01' 
}) => (
  <svg 
    viewBox="0 0 500 500" 
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    style={{ fill: color }}
  >
    <path d="M461.8,211.3H288.5V38.6c0-21.2-17.4-38.6-38.6-38.6h0c-21.2,0-38.6,17.4-38.6,38.6v172.8H38.9c-21.2,0-38.6,17.4-38.6,38.6 v0c0,21.2,17.4,38.6,38.6,38.6h172.4v173c0,21.2,17.4,38.6,38.6,38.6h0c21.2,0,38.6-17.4,38.6-38.6v-173h173.3 c21.2,0,38.6-17.4,38.6-38.6v0C500.3,228.7,483,211.3,461.8,211.3z"/>
  </svg>
);

// Versions alternatives pour comparaison
const SimpleSearchIcon: React.FC<{ size?: number; color?: string }> = ({ 
  size = 20, 
  color = '#b0b0b0' 
}) => (
  <svg 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    style={{ fill: 'none', stroke: color, strokeWidth: '2' }}
  >
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.35-4.35"/>
  </svg>
);

export const TestIconsPage: React.FC = () => {
  return (
    <div style={{ 
      padding: '40px', 
      background: '#1a1a1a', 
      minHeight: '100vh',
      color: 'white',
      fontFamily: 'Inter, sans-serif'
    }}>
      <h1 style={{ marginBottom: '40px', color: '#ee5a01' }}>
        🧪 TEST DES ICÔNES SVG - Design System
      </h1>

      {/* Test 1: Icônes originales */}
      <section style={{ marginBottom: '40px', padding: '20px', background: '#2a2a2a', borderRadius: '8px' }}>
        <h2 style={{ marginBottom: '20px', color: '#0195ee' }}>
          1. ICÔNES ORIGINALES (viewBox 500x500)
        </h2>
        
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>ExcellenceMenu 14px:</span>
            <TestExcellenceMenuIcon size={14} color="#b0b0b0" />
            <span style={{ background: '#333', padding: '2px 6px', fontSize: '12px' }}>
              {/* Indicateur si visible */}
              ←
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>Search 14px:</span>
            <TestSearchIcon size={14} color="#b0b0b0" />
            <span style={{ background: '#333', padding: '2px 6px', fontSize: '12px' }}>
              ←
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>Plus 18px:</span>
            <TestCustomPlusIcon size={18} color="#ee5a01" />
            <span style={{ background: '#333', padding: '2px 6px', fontSize: '12px' }}>
              ←
            </span>
          </div>
        </div>
      </section>

      {/* Test 2: Tailles différentes */}
      <section style={{ marginBottom: '40px', padding: '20px', background: '#2a2a2a', borderRadius: '8px' }}>
        <h2 style={{ marginBottom: '20px', color: '#0195ee' }}>
          2. TEST TAILLES MULTIPLES
        </h2>
        
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div>12px</div>
            <TestExcellenceMenuIcon size={12} color="#ee5a01" />
          </div>
          <div style={{ textAlign: 'center' }}>
            <div>16px</div>
            <TestExcellenceMenuIcon size={16} color="#ee5a01" />
          </div>
          <div style={{ textAlign: 'center' }}>
            <div>24px</div>
            <TestExcellenceMenuIcon size={24} color="#ee5a01" />
          </div>
          <div style={{ textAlign: 'center' }}>
            <div>32px</div>
            <TestExcellenceMenuIcon size={32} color="#ee5a01" />
          </div>
          <div style={{ textAlign: 'center' }}>
            <div>48px</div>
            <TestExcellenceMenuIcon size={48} color="#ee5a01" />
          </div>
        </div>
      </section>

      {/* Test 3: Couleurs différentes */}
      <section style={{ marginBottom: '40px', padding: '20px', background: '#2a2a2a', borderRadius: '8px' }}>
        <h2 style={{ marginBottom: '20px', color: '#0195ee' }}>
          3. TEST COULEURS DESIGN SYSTEM
        </h2>
        
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '12px', marginBottom: '5px' }}>Orange</div>
            <TestSearchIcon size={24} color="#ee5a01" />
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '12px', marginBottom: '5px' }}>Bleu</div>
            <TestSearchIcon size={24} color="#0195ee" />
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '12px', marginBottom: '5px' }}>Gris</div>
            <TestSearchIcon size={24} color="#707070" />
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '12px', marginBottom: '5px' }}>Vert Excellence</div>
            <TestSearchIcon size={24} color="#8B9657" />
          </div>
        </div>
      </section>

      {/* Test 4: Comparaison avec alternative */}
      <section style={{ marginBottom: '40px', padding: '20px', background: '#2a2a2a', borderRadius: '8px' }}>
        <h2 style={{ marginBottom: '20px', color: '#0195ee' }}>
          4. COMPARAISON AVEC ALTERNATIVE (viewBox 24x24)
        </h2>
        
        <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '12px', marginBottom: '10px' }}>Original (500x500)</div>
            <TestSearchIcon size={24} color="#ee5a01" />
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '12px', marginBottom: '10px' }}>Alternative (24x24)</div>
            <SimpleSearchIcon size={24} color="#ee5a01" />
          </div>
        </div>
      </section>

      {/* Test 5: Dans un contexte réel */}
      <section style={{ padding: '20px', background: '#2a2a2a', borderRadius: '8px' }}>
        <h2 style={{ marginBottom: '20px', color: '#0195ee' }}>
          5. TEST EN CONTEXTE RÉEL (comme dans la barre de filtres)
        </h2>
        
        <div style={{
          padding: '9px 18px',
          background: '#2a2a2a',
          borderBottom: '1px solid #404040',
          display: 'flex',
          gap: '14px',
          alignItems: 'center',
          height: '51px',
          border: '1px solid #404040',
          borderRadius: '4px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
            <TestExcellenceMenuIcon size={14} color="#b0b0b0" />
            <span style={{ fontSize: '14px', color: '#b0b0b0' }}>Excellences</span>
          </div>
          
          <div style={{ marginLeft: 'auto', position: 'relative' }}>
            <TestSearchIcon size={14} color="#b0b0b0" />
            <span style={{ fontSize: '14px', color: '#b0b0b0', marginLeft: '8px' }}>Rechercher...</span>
          </div>
        </div>
      </section>

      {/* Instructions */}
      <div style={{ 
        marginTop: '40px', 
        padding: '20px', 
        background: '#333', 
        borderRadius: '8px',
        fontSize: '14px',
        lineHeight: '1.6'
      }}>
        <h3 style={{ color: '#ee5a01', marginBottom: '15px' }}>📋 INSTRUCTIONS DE TEST :</h3>
        <p><strong>1.</strong> Regardez si vous voyez les icônes dans chaque section</p>
        <p><strong>2.</strong> Comparez les tailles et couleurs</p>
        <p><strong>3.</strong> Vérifiez si l'alternative (section 4) est plus visible</p>
        <p><strong>4.</strong> Testez le contexte réel (section 5)</p>
        <p style={{ color: '#0195ee', marginTop: '15px' }}>
          <strong>📸 Faites une capture d'écran et dites-moi quelles icônes vous voyez !</strong>
        </p>
      </div>
    </div>
  );
};
