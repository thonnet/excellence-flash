
import React, { useState } from 'react';
import { User } from '../../types';
import { requireAdmin } from '../../utils/auth';

interface HeaderAdminProps {
  user: User | null;
  onModeChange?: (isAdminMode: boolean) => void;
}

export const HeaderAdmin: React.FC<HeaderAdminProps> = ({ user, onModeChange }) => {
  const [isAdminMode, setIsAdminMode] = useState(true);

  const handleModeChange = (mode: boolean) => {
    setIsAdminMode(mode);
    onModeChange?.(mode);
  };

  return (
    <div className="admin-header">
      <div className="header-content">
        <h1 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '1.5rem', fontWeight: '700' }}>
          Excellence Flash
        </h1>
        <p className="subtitle" style={{ color: 'var(--text-secondary)', margin: '4px 0 0 0', fontSize: '0.9rem' }}>
          {isAdminMode ? 'Interface d\'administration' : 'Modélez et structurez votre excellence'}
        </p>
      </div>
      
      {requireAdmin(user) && (
        <div className="role-switch">
          <button 
            className={`role-btn ${!isAdminMode ? 'active' : ''}`}
            onClick={() => handleModeChange(false)}
          >
            👤 Utilisateur
          </button>
          <button 
            className={`role-btn ${isAdminMode ? 'active' : ''}`}
            onClick={() => handleModeChange(true)}
          >
            ⚙️ Administrateur
          </button>
        </div>
      )}
    </div>
  );
};
