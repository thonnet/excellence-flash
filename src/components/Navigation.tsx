
import React from 'react';
import { Eye, BarChart3, List, Zap } from 'lucide-react';

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
      icon: BarChart3,
      description: 'Vue d\'ensemble'
    },
    {
      id: 'kanban' as ViewType,
      label: 'Excellences',
      icon: Eye,
      description: 'Vue Kanban'
    },
    {
      id: 'list' as ViewType,
      label: 'Liste',
      icon: List,
      description: 'Vue détaillée'
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
                className={`nav-item ${isActive ? 'nav-item-active' : ''} flex flex-col items-center space-y-1 py-2 px-3 transition-colors`}
              >
                <Icon size={20} />
                <span className="text-xs font-medium">{item.label}</span>
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
                className={`nav-item ${isActive ? 'nav-item-active' : ''} flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200`}
              >
                <Icon size={18} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
};
