
import React, { useState } from 'react';
import { User } from '../types';
import { useAuth } from '../hooks/useAuth';
import { ChangePasswordModal } from './ChangePasswordModal';
import { ImportDataModal } from './ImportDataModal';
import { UserProfileButton } from './UserProfileButton';
import { UserProfileDropdown } from './UserProfileDropdown';

interface UserProfileProps {
  user: User;
  onExportData?: () => void;
  onImportData?: () => void;
  onShowImportHelp?: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ 
  user, 
  onExportData,
  onImportData,
  onShowImportHelp
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
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

  const handleImportDataClick = () => {
    setIsImportModalOpen(true);
    setIsDropdownOpen(false);
  };

  const handleImportComplete = () => {
    // Refresh data after import
    if (onImportData) {
      onImportData();
    }
  };

  const handleShowImportHelp = () => {
    setIsImportModalOpen(false);
    if (onShowImportHelp) {
      onShowImportHelp();
    }
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
        onImportData={handleImportDataClick}
      />

      <ChangePasswordModal
        isOpen={isChangePasswordModalOpen}
        onClose={() => setIsChangePasswordModalOpen(false)}
      />

      <ImportDataModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImportComplete={handleImportComplete}
        onShowHelp={handleShowImportHelp}
      />
    </div>
  );
};
