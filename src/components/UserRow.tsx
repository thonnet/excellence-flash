
import React, { useState } from 'react';
import { Badge } from './ui/badge';

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: string;
  created_at: string;
  last_sign_in_at?: string;
}

interface UserRowProps {
  user: UserProfile;
  onEdit: (userId: string, updatedData: { fullName: string; role: string }) => Promise<void>;
  onDelete: (userId: string, userEmail: string, userRole: string) => Promise<void>;
}

const UserRow: React.FC<UserRowProps> = ({ user, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    fullName: user.full_name || '',
    role: user.role || 'user'
  });

  const getRoleBadgeVariant = (role: string) => {
    return role === 'admin' ? 'destructive' : 'secondary';
  };

  const getStatusIcon = (lastSignIn?: string) => {
    return lastSignIn ? '🟢' : '🟡';
  };

  const getStatusText = (lastSignIn?: string) => {
    return lastSignIn ? 'Actif' : 'En attente';
  };

  const handleSaveEdit = async () => {
    await onEdit(user.id, editData);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditData({
      fullName: user.full_name || '',
      role: user.role || 'user'
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <tr className="border-b transition-colors hover:bg-muted/50 bg-orange-50 border-l-4 border-l-orange-500">
        <td className="p-4">
          <div>
            <input
              type="text"
              value={editData.fullName}
              onChange={(e) => setEditData({...editData, fullName: e.target.value})}
              placeholder="Nom complet"
              className="w-full p-2 border border-orange-300 rounded-md bg-white text-sm font-medium mb-1"
            />
            <div className="text-sm text-muted-foreground">{user.email}</div>
          </div>
        </td>
        <td className="p-4">
          <select
            value={editData.role}
            onChange={(e) => setEditData({...editData, role: e.target.value})}
            className="w-full p-2 border border-orange-300 rounded-md bg-white text-sm"
          >
            <option value="user">👤 User</option>
            <option value="admin">⚙️ Admin</option>
          </select>
        </td>
        <td className="p-4">
          <div>
            <span className="flex items-center space-x-1">
              <span>{getStatusIcon(user.last_sign_in_at)}</span>
              <span className="text-sm">{getStatusText(user.last_sign_in_at)}</span>
            </span>
            {user.last_sign_in_at && (
              <div className="text-xs text-muted-foreground mt-1">
                Dernière connexion: {new Date(user.last_sign_in_at).toLocaleDateString('fr-FR')}
              </div>
            )}
          </div>
        </td>
        <td className="p-4">
          <div className="flex space-x-2">
            <button 
              onClick={handleSaveEdit}
              className="w-8 h-8 border border-green-300 bg-transparent rounded hover:bg-green-50 flex items-center justify-center transition-colors"
              title="Sauvegarder"
            >
              ✅
            </button>
            <button 
              onClick={handleCancelEdit}
              className="w-8 h-8 border border-orange-300 bg-transparent rounded hover:bg-orange-50 flex items-center justify-center transition-colors"
              title="Annuler"
            >
              ❌
            </button>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <tr className="border-b transition-colors hover:bg-muted/50">
      <td className="p-4">
        <div>
          <div className="font-medium">{user.full_name || 'Sans nom'}</div>
          <div className="text-sm text-muted-foreground">{user.email}</div>
        </div>
      </td>
      <td className="p-4">
        <Badge variant={getRoleBadgeVariant(user.role)}>
          {user.role === 'admin' ? '⚙️ Admin' : '👤 User'}
        </Badge>
      </td>
      <td className="p-4">
        <div>
          <span className="flex items-center space-x-1">
            <span>{getStatusIcon(user.last_sign_in_at)}</span>
            <span className="text-sm">{getStatusText(user.last_sign_in_at)}</span>
          </span>
          {user.last_sign_in_at && (
            <div className="text-xs text-muted-foreground mt-1">
              Dernière connexion: {new Date(user.last_sign_in_at).toLocaleDateString('fr-FR')}
            </div>
          )}
        </div>
      </td>
      <td className="p-4">
        <div className="flex space-x-2">
          <button 
            onClick={() => setIsEditing(true)}
            className="w-8 h-8 border border-blue-300 bg-transparent rounded hover:bg-blue-50 flex items-center justify-center transition-colors"
            title="Modifier"
          >
            ✏️
          </button>
          <button 
            onClick={() => onDelete(user.id, user.email, user.role)}
            className="w-8 h-8 border border-red-300 bg-transparent rounded hover:bg-red-50 flex items-center justify-center transition-colors"
            title="Supprimer"
          >
            🗑️
          </button>
        </div>
      </td>
    </tr>
  );
};

export default UserRow;
