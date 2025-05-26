
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, User } from 'lucide-react';

interface AdminToggleProps {
  isAdminMode: boolean;
  onToggle: (isAdmin: boolean) => void;
}

export const AdminToggle: React.FC<AdminToggleProps> = ({ isAdminMode, onToggle }) => {
  const { isAdmin } = useAuth();

  if (!isAdmin) return null;

  return (
    <button
      onClick={() => onToggle(!isAdminMode)}
      className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors"
      style={{
        backgroundColor: isAdminMode ? 'var(--accent-orange)' : 'var(--bg-tertiary)',
        color: isAdminMode ? 'white' : 'var(--text-primary)',
        border: `1px solid ${isAdminMode ? 'var(--accent-orange)' : 'var(--border-subtle)'}`
      }}
      title={isAdminMode ? 'Mode Administrateur actif' : 'Activer le mode Administrateur'}
    >
      {isAdminMode ? <Shield size={16} /> : <User size={16} />}
      <span className="text-sm font-medium">
        {isAdminMode ? 'Admin' : 'Utilisateur'}
      </span>
    </button>
  );
};
