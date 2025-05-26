
import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(() => {
    // Vérifier d'abord le localStorage, sinon utiliser le thème sombre par défaut
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    console.log('ThemeToggle: Applying theme', isDark ? 'dark' : 'light');
    
    // Appliquer le thème via l'attribut data-theme
    const root = document.documentElement;
    
    if (isDark) {
      root.setAttribute('data-theme', 'dark');
      root.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      root.setAttribute('data-theme', 'light');
      root.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
    
    // Forcer un recalcul des styles CSS
    root.style.setProperty('--theme-applied', Math.random().toString());
    
    // Déclencher un événement de redimensionnement pour forcer le re-render
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 10);
  }, [isDark]);

  const toggleTheme = () => {
    console.log('ThemeToggle: Switching from', isDark ? 'dark' : 'light', 'to', !isDark ? 'dark' : 'light');
    setIsDark(!isDark);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg transition-all duration-200 border"
      style={{ 
        backgroundColor: 'var(--color-bg-tertiary)',
        color: 'var(--color-text-secondary)',
        borderColor: 'var(--color-border-subtle)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--color-bg-hover)';
        e.currentTarget.style.borderColor = 'var(--color-primary-orange)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--color-bg-tertiary)';
        e.currentTarget.style.borderColor = 'var(--color-border-subtle)';
      }}
      title={isDark ? 'Passer au mode clair' : 'Passer au mode sombre'}
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};
