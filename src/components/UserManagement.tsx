
import React, { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { User, UserPlus, ArrowLeft } from 'lucide-react';

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: string;
  created_at: string;
  last_sign_in_at?: string;
}

interface UserManagementProps {
  onBack: () => void;
}

const UserManagement: React.FC<UserManagementProps> = ({ onBack }) => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] = useState({
    email: '',
    fullName: '',
    role: 'user'
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Erreur lors du chargement des utilisateurs:', error);
      } else {
        setUsers(data || []);
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Pour l'instant, juste simuler la création
    console.log('Création utilisateur:', newUser);
    
    // Reset du formulaire
    setNewUser({ email: '', fullName: '', role: 'user' });
    setShowCreateForm(false);
    
    // Note: Pour l'étape 5, nous implémenterons la vraie création avec Supabase Auth
  };

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
    <div className="space-y-6">
      {/* Header avec bouton retour */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="flex items-center space-x-2"
          >
            <ArrowLeft size={16} />
            <span>Retour au dashboard</span>
          </Button>
          <div>
            <h2 className="text-2xl font-bold flex items-center space-x-2">
              <User size={24} />
              <span>Gestion des utilisateurs</span>
            </h2>
            <p className="text-muted-foreground">Gérer les comptes et permissions utilisateurs</p>
          </div>
        </div>
        <Button 
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="flex items-center space-x-2"
          style={{ backgroundColor: 'var(--accent-orange)' }}
        >
          <UserPlus size={16} />
          <span>{showCreateForm ? 'Annuler' : 'Nouvel utilisateur'}</span>
        </Button>
      </div>

      {/* Formulaire de création */}
      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <UserPlus size={20} />
              <span>Créer un nouvel utilisateur</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium mb-2">
                    Nom complet
                  </label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Prénom Nom"
                    value={newUser.fullName}
                    onChange={(e) => setNewUser({...newUser, fullName: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@exemple.com"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="role" className="block text-sm font-medium mb-2">
                    Rôle
                  </label>
                  <select
                    id="role"
                    value={newUser.role}
                    onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="user">Utilisateur</option>
                    <option value="admin">Administrateur</option>
                  </select>
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full"
                style={{ backgroundColor: 'var(--accent-orange)' }}
              >
                Créer l'utilisateur
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Liste des utilisateurs */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des utilisateurs ({users.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-4">Chargement des utilisateurs...</div>
          ) : users.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Aucun utilisateur trouvé
            </div>
          ) : (
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
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{user.full_name || 'Sans nom'}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getRoleBadgeVariant(user.role)}>
                        {user.role === 'admin' ? '⚙️ Admin' : '👤 User'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center space-x-1">
                        <span>{getStatusIcon(user.last_sign_in_at)}</span>
                        <span className="text-sm">{getStatusText(user.last_sign_in_at)}</span>
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(user.created_at).toLocaleDateString('fr-FR')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
