
import React from 'react';
import { Eye, BarChart3, List, Zap } from 'lucide-react';

type ViewType = 'kanban' | 'list' | 'dashboard' | 'experiences';

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
      id: 'dashboard' as ViewType,
      label: 'Dashboard',
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
                className={`flex flex-col items-center space-y-1 py-2 px-3 transition-colors ${
                  isActive 
                    ? 'text-[#0195ee]' 
                    : 'text-gray-400 hover:text-white'
                }`}
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
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-[#0195ee]/20 text-[#0195ee] border border-[#0195ee]/30' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
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
