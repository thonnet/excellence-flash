
import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(() => {
    // Initialiser à partir du localStorage ou par défaut sombre
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    console.log('ThemeToggle: Applying theme', isDark ? 'dark' : 'light');
    
    // Appliquer le thème
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
    
    // Forcer un rafraîchissement des styles
    document.documentElement.style.setProperty('--force-refresh', Math.random().toString());
  }, [isDark]);

  const toggleTheme = () => {
    console.log('ThemeToggle: Switching from', isDark ? 'dark' : 'light', 'to', !isDark ? 'dark' : 'light');
    setIsDark(!isDark);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg transition-colors"
      style={{ 
        backgroundColor: 'var(--color-bg-tertiary)',
        color: 'var(--color-text-secondary)',
        border: '1px solid var(--color-border-subtle)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--color-bg-hover)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--color-bg-tertiary)';
      }}
      title={isDark ? 'Passer au mode clair' : 'Passer au mode sombre'}
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};
