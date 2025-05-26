
import React from 'react';
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
}

const UserRow: React.FC<UserRowProps> = ({ user }) => {
  const getRoleBadgeVariant = (role: string) => {
    return role === 'admin' ? 'destructive' : 'secondary';
  };

  const getStatusIcon = (lastSignIn?: string) => {
    return lastSignIn ? '🟢' : '🟡';
  };

  const getStatusText = (lastSignIn?: string) => {
    return lastSignIn ? 'Actif' : 'En attente';
  };

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
      <td className="p-4 text-sm text-muted-foreground">
        {new Date(user.created_at).toLocaleDateString('fr-FR')}
      </td>
    </tr>
  );
};

export default UserRow;
