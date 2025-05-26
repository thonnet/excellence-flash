
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableHead, TableHeader, TableRow } from './ui/table';
import UserRow from './UserRow';

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: string;
  created_at: string;
  last_sign_in_at?: string;
}

interface UserListProps {
  users: UserProfile[];
  loading: boolean;
}

const UserList: React.FC<UserListProps> = ({ users, loading }) => {
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
        <CardTitle>Liste des utilisateurs ({users.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Utilisateur</TableHead>
              <TableHead>Rôle</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Créé le</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <UserRow key={user.id} user={user} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default UserList;
