
import React from 'react';
import { User } from '../types';
import { getInitials, getPlanLabel } from '../utils/userProfileUtils';

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
        e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
    >
      {/* Avatar */}
      <div className="w-8 h-8 bg-gradient-to-br from-[#0195ee] to-[#ee5a01] rounded-full flex items-center justify-center text-white text-sm font-medium">
        {getInitials(user.full_name || 'UU')}
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
