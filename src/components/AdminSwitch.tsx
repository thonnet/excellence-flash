
import React from 'react';

interface AdminSwitchProps {
  isAdminMode: boolean;
  onModeChange: (isAdmin: boolean) => void;
}

export const AdminSwitch: React.FC<AdminSwitchProps> = ({ 
  isAdminMode, 
  onModeChange 
}) => {
  return (
    <div className="admin-switch">
      <span className="switch-label">Mode :</span>
      <button 
        className={`switch-btn ${!isAdminMode ? 'active' : ''}`}
        onClick={() => onModeChange(false)}
      >
        Utilisateur
      </button>
      <button 
        className={`switch-btn ${isAdminMode ? 'active' : ''}`}
        onClick={() => onModeChange(true)}
      >
        Admin
      </button>
    </div>
  );
};
