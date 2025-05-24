
import React, { useState } from 'react';
import { User } from '../types';
import { Settings, LogOut, User as UserIcon } from 'lucide-react';

interface UserProfileProps {
  user: User;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'pro': return '#0195ee';
      case 'premium': return '#ee5a01';
      default: return '#707070';
    }
  };

  const getPlanLabel = (plan: string) => {
    switch (plan) {
      case 'pro': return 'Pro';
      case 'premium': return 'Premium';
      default: return 'Gratuit';
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
      >
        {/* Avatar */}
        <div className="w-8 h-8 bg-gradient-to-br from-[#0195ee] to-[#ee5a01] rounded-full flex items-center justify-center text-white text-sm font-medium">
          {getInitials(user.full_name || 'UU')}
        </div>

        {/* User Info - Hidden on mobile */}
        <div className="hidden sm:block text-left">
          <p className="text-sm font-medium text-white">
            {user.full_name || 'Utilisateur'}
          </p>
          <p className="text-xs text-gray-400">
            Plan {getPlanLabel(user.plan_type)}
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
          <div className="absolute right-0 top-full mt-2 w-64 bg-[#2a2a3e] border border-white/10 rounded-lg shadow-xl z-20">
            {/* User Info */}
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#0195ee] to-[#ee5a01] rounded-full flex items-center justify-center text-white font-medium">
                  {getInitials(user.full_name || 'UU')}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-white">
                    {user.full_name || 'Utilisateur'}
                  </p>
                  <p className="text-sm text-gray-400">
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
              <button className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-white/5 transition-colors">
                <UserIcon size={16} className="text-gray-400" />
                <span className="text-sm text-white">Mon profil</span>
              </button>
              
              <button className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-white/5 transition-colors">
                <Settings size={16} className="text-gray-400" />
                <span className="text-sm text-white">Paramètres</span>
              </button>
            </div>

            {/* Logout */}
            <div className="border-t border-white/10 py-2">
              <button className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-red-500/10 transition-colors group">
                <LogOut size={16} className="text-gray-400 group-hover:text-red-400" />
                <span className="text-sm text-white group-hover:text-red-400">Se déconnecter</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
