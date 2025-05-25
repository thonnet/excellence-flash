
import React from 'react';
import { Eye, BarChart3, List, Star, Zap } from 'lucide-react';

type ViewType = 'kanban' | 'list' | 'observatoire' | 'experiences';

interface NavigationProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  className?: string;
  isMobile?: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ 
  currentView, 
  onViewChange, 
  className = "",
  isMobile = false
}) => {
  const navItems = [
    {
      id: 'observatoire' as ViewType,
      label: 'Observatoire',
      icon: Eye,
      description: 'Vue d\'ensemble'
    },
    {
      id: 'kanban' as ViewType,
      label: 'Excellences',
      icon: Star,
      description: 'Vue Kanban'
    },
    {
      id: 'experiences' as ViewType,
      label: 'Expériences',
      icon: Zap,
      description: 'Toutes les expériences'
    }
  ];

  return (
    <nav className={className}>
      {isMobile ? (
        // Mobile navigation
        <>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`flex flex-col items-center space-y-1 py-2 px-3 transition-colors relative ${isActive ? 'active-nav-item' : ''}`}
                style={{ color: 'var(--text-secondary)' }}
              >
                <Icon size={20} />
                <span className="text-xs font-medium">{item.label}</span>
                {isActive && (
                  <div 
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5"
                    style={{ backgroundColor: 'var(--accent-orange)' }}
                  />
                )}
              </button>
            );
          })}
        </>
      ) : (
        // Desktop navigation
        <div className="flex items-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 relative ${isActive ? 'active-nav-item' : ''}`}
                style={{ 
                  color: 'var(--text-secondary)',
                  backgroundColor: isActive ? 'rgba(255, 255, 255, 0.05)' : 'transparent'
                }}
              >
                <Icon size={18} />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <div 
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-0.5"
                    style={{ backgroundColor: 'var(--accent-orange)' }}
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
};
