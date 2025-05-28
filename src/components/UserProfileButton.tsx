
import React from 'react';
import { User } from '../types';
import { getInitials, getPlanLabel } from '../utils/userProfileUtils';
import { AvatarIcon } from './icons/IconLibrary';

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
      className="flex items-center space-x-3 p-2 rounded-lg transition-colors"
      style={{
        backgroundColor: 'transparent'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--hover-bg)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
    >
      {/* Avatar - Utilise le pictogramme SVG */}
      <div className="w-8 h-8 bg-gradient-to-br from-[var(--blue-primary)] to-[var(--orange-primary)] rounded-full flex items-center justify-center text-white text-sm font-medium">
        {user.full_name ? getInitials(user.full_name) : <AvatarIcon size={16} />}
      </div>

      {/* User Info - Hidden on mobile */}
      <div className="hidden sm:block text-left">
        <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
          {user.full_name || 'Utilisateur'}
        </p>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          Plan {getPlanLabel(user.plan_type)}
        </p>
      </div>
    </button>
  );
};
