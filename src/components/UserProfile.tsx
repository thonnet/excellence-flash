
import React, { useState } from 'react';
import { UserDisplay } from '../types/auth';
import { Settings, LogOut, User as UserIcon, Download, Upload, Camera, Key } from 'lucide-react';

interface UserProfileProps {
  user: UserDisplay;
  onExportData?: () => void;
  onImportData?: () => void;
  onLogout?: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ 
  user, 
  onExportData,
  onImportData,
  onLogout
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return '#dc2626';
      default: return '#0195ee';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrateur';
      default: return 'Utilisateur';
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-3 p-2 rounded-lg transition-colors"
        style={{
          backgroundColor: 'transparent'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        {/* Avatar */}
        <div 
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
          style={{ 
            backgroundColor: user.role === 'admin' 
              ? 'linear-gradient(45deg, #dc2626, #ea580c)' 
              : 'linear-gradient(45deg, #0195ee, #ee5a01)'
          }}
        >
          {getInitials(user.full_name || 'UU')}
        </div>

        {/* User Info - Hidden on mobile */}
        <div className="hidden sm:block text-left">
          <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
            {user.full_name || 'Utilisateur'}
          </p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {getRoleLabel(user.role)}
          </p>
        </div>
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsDropdownOpen(false)}
          />
          
          {/* Dropdown */}
          <div 
            className="absolute right-0 top-full mt-2 w-64 border rounded-lg shadow-xl z-20"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              borderColor: 'var(--border-subtle)'
            }}
          >
            {/* User Info */}
            <div 
              className="p-4 border-b"
              style={{ borderColor: 'var(--border-subtle)' }}
            >
              <div className="flex items-center space-x-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium"
                  style={{ 
                    backgroundColor: user.role === 'admin' ? '#dc2626' : '#0195ee'
                  }}
                >
                  {getInitials(user.full_name || 'UU')}
                </div>
                <div className="flex-1">
                  <p className="font-medium" style={{ color: 'var(--text-primary)' }}>
                    {user.full_name || 'Utilisateur'}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    {user.email}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <div 
                      className="px-2 py-1 rounded text-xs font-medium"
                      style={{
                        backgroundColor: `${getRoleColor(user.role)}20`,
                        color: getRoleColor(user.role)
                      }}
                    >
                      {getRoleLabel(user.role)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              <button 
                className="w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors"
                style={{ color: 'var(--text-primary)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <UserIcon size={16} style={{ color: 'var(--text-muted)' }} />
                <span className="text-sm">Mon profil</span>
              </button>

              <button 
                className="w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors"
                style={{ color: 'var(--text-primary)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <Camera size={16} style={{ color: 'var(--text-muted)' }} />
                <span className="text-sm">Changer la photo</span>
              </button>

              <button 
                className="w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors"
                style={{ color: 'var(--text-primary)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <Key size={16} style={{ color: 'var(--text-muted)' }} />
                <span className="text-sm">Changer mot de passe</span>
              </button>
              
              <button 
                className="w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors"
                style={{ color: 'var(--text-primary)' }}
                onClick={onExportData}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <Download size={16} style={{ color: 'var(--text-muted)' }} />
                <span className="text-sm">Exporter mes données</span>
              </button>

              <button 
                className="w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors"
                style={{ color: 'var(--text-primary)' }}
                onClick={onImportData}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <Upload size={16} style={{ color: 'var(--text-muted)' }} />
                <span className="text-sm">Importer des données</span>
              </button>

              <button 
                className="w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors"
                style={{ color: 'var(--text-primary)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <Settings size={16} style={{ color: 'var(--text-muted)' }} />
                <span className="text-sm">Paramètres</span>
              </button>
            </div>

            {/* Logout */}
            <div 
              className="border-t py-2"
              style={{ borderColor: 'var(--border-subtle)' }}
            >
              <button 
                onClick={onLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors group"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <LogOut size={16} className="text-gray-400 group-hover:text-red-400" />
                <span className="text-sm text-gray-400 group-hover:text-red-400">Se déconnecter</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
