
import React from 'react';
import { User } from '../types';
import { Settings, LogOut, User as UserIcon, Upload, Camera, Key } from 'lucide-react';
import { getInitials, getPlanColor, getPlanLabel } from '../utils/userProfileUtils';

interface UserProfileDropdownProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onSignOut: () => void;
  onChangePassword: () => void;
  onExportData?: () => void;
  onImportData?: () => void;
}

export const UserProfileDropdown: React.FC<UserProfileDropdownProps> = ({
  user,
  isOpen,
  onClose,
  onSignOut,
  onChangePassword,
  onExportData,
  onImportData
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-10" 
        onClick={onClose}
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
            <div className="w-10 h-10 bg-gradient-to-br from-[#0195ee] to-[#ee5a01] rounded-full flex items-center justify-center text-white font-medium">
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
                    backgroundColor: `${getPlanColor(user.plan_type)}20`,
                    color: getPlanColor(user.plan_type)
                  }}
                >
                  {getPlanLabel(user.plan_type)}
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
            onClick={onChangePassword}
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
            onClick={onSignOut}
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
  );
};
