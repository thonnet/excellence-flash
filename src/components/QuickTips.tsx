
import React from 'react';

export const QuickTips: React.FC = () => {
  return (
    <section
      className="p-6 rounded-lg border"
      style={{
        backgroundColor: 'rgba(238,90,1,0.1)',
        borderColor: '#ee5a01'
      }}
    >
      <h3 className="text-lg font-semibold mb-4" style={{ color: '#ee5a01' }}>
        💡 Conseils pour une consignation efficace
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex items-start gap-3">
          <span className="text-xl" style={{ color: '#ee5a01' }}>⚡</span>
          <p className="text-sm" style={{ color: '#ccc' }}>
            Décrivez immédiatement après l'expérience pour capturer tous les détails
          </p>
        </div>
        
        <div className="flex items-start gap-3">
          <span className="text-xl" style={{ color: '#ee5a01' }}>🎯</span>
          <p className="text-sm" style={{ color: '#ccc' }}>
            Focalisez sur les excellences concrètement mobilisées
          </p>
        </div>
        
        <div className="flex items-start gap-3">
          <span className="text-xl" style={{ color: '#ee5a01' }}>🔍</span>
          <p className="text-sm" style={{ color: '#ccc' }}>
            Détaillez le contexte et les défis rencontrés
          </p>
        </div>
        
        <div className="flex items-start gap-3">
          <span className="text-xl" style={{ color: '#ee5a01' }}>💫</span>
          <p className="text-sm" style={{ color: '#ccc' }}>
            Notez ce qui vous a surpris ou marqué
          </p>
        </div>
        
        <div className="flex items-start gap-3">
          <span className="text-xl" style={{ color: '#ee5a01' }}>📈</span>
          <p className="text-sm" style={{ color: '#ccc' }}>
            Identifiez les apprentissages et points d'amélioration
          </p>
        </div>
        
        <div className="flex items-start gap-3">
          <span className="text-xl" style={{ color: '#ee5a01' }}>🚀</span>
          <p className="text-sm" style={{ color: '#ccc' }}>
            Restez concis mais précis dans vos descriptions
          </p>
        </div>
      </div>
    </section>
  );
};
