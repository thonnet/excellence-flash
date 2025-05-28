
import React from 'react';
import { User } from '../types';
import { getInitials, getPlanLabel } from '../utils/userProfileUtils';
import { Icon } from './ui/icon';

interface UserProfileButtonProps {
  user: User;
  isDropdownOpen: boolean;
  onClick: () => void;
}

export const UserProfileButton: React.FC<UserProfileButtonProps> = ({
  user,
  isDropdownOpen,
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center space-x-3 p-2 rounded-lg transition-colors btn-icon"
      style={{
        width: 'auto',
        height: 'auto',
        backgroundColor: 'transparent',
        border: 'none'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--hover-bg)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
    >
      {/* Avatar avec icône */}
      <div className="w-8 h-8 bg-gradient-to-br from-[#0195ee] to-[#ee5a01] rounded-full flex items-center justify-center text-white text-sm font-medium relative">
        {user.full_name ? (
          getInitials(user.full_name)
        ) : (
          <Icon name="avatar" size={16} />
        )}
      </div>

      {/* User Info - Hidden on mobile */}
      <div className="hidden sm:block text-left">
        <p className="text-sm font-medium text-data">
          {user.full_name || 'Utilisateur'}
        </p>
        <p className="text-help">
          Plan {getPlanLabel(user.plan_type)}
        </p>
      </div>
    </button>
  );
};
