import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableHead, TableHeader, TableRow } from './ui/table';
import UserRow from './UserRow';
import type { UserProfile } from '../types/userManagement';

interface UserListProps {
  users: UserProfile[];
  loading: boolean;
  onEdit: (userId: string, updatedData: { fullName: string; role: string }) => Promise<void>;
  onDelete: (userId: string, userEmail: string, userRole: string) => Promise<void>;
  onRefresh: () => void;
}

const UserList: React.FC<UserListProps> = ({ users, loading, onEdit, onDelete, onRefresh }) => {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Liste des utilisateurs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">Chargement des utilisateurs...</div>
        </CardContent>
      </Card>
    );
  }

  if (users.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Liste des utilisateurs (0)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            Aucun utilisateur trouvé
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Liste des utilisateurs ({users.length})</CardTitle>
          <button 
            onClick={onRefresh}
            className="px-3 py-2 text-sm border border-gray-300 bg-white rounded hover:border-orange-500 hover:text-orange-600 transition-colors flex items-center space-x-1"
          >
            <span>🔄</span>
            <span>Actualiser</span>
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Utilisateur</TableHead>
              <TableHead>Rôle</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <UserRow 
                key={user.id} 
                user={user} 
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default UserList;
