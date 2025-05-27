
import React, { useState } from 'react';
import { User } from '../types';
import { useAuth } from '../hooks/useAuth';
import { ChangePasswordModal } from './ChangePasswordModal';
import { UserProfileButton } from './UserProfileButton';
import { UserProfileDropdown } from './UserProfileDropdown';

interface UserProfileProps {
  user: User;
  onExportData?: () => void;
  onImportData?: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ 
  user, 
  onExportData,
  onImportData 
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsDropdownOpen(false);
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  const handleChangePasswordClick = () => {
    setIsChangePasswordModalOpen(true);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative">
      <UserProfileButton
        user={user}
        isDropdownOpen={isDropdownOpen}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      />

      <UserProfileDropdown
        user={user}
        isOpen={isDropdownOpen}
        onClose={() => setIsDropdownOpen(false)}
        onSignOut={handleSignOut}
        onChangePassword={handleChangePasswordClick}
        onExportData={onExportData}
        onImportData={onImportData}
      />

      <ChangePasswordModal
        isOpen={isChangePasswordModalOpen}
        onClose={() => setIsChangePasswordModalOpen(false)}
      />
    </div>
  );
};
