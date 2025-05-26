
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { UserPlus } from 'lucide-react';

interface NewUser {
  email: string;
  fullName: string;
  role: string;
}

interface UserFormProps {
  onCreateUser: (userData: NewUser) => Promise<void>;
  isCreating: boolean;
  message: string;
}

const UserForm: React.FC<UserFormProps> = ({ onCreateUser, isCreating, message }) => {
  const [newUser, setNewUser] = useState<NewUser>({
    email: '',
    fullName: '',
    role: 'user'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onCreateUser(newUser);
    setNewUser({ email: '', fullName: '', role: 'user' });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <UserPlus size={20} />
          <span>Créer un nouvel utilisateur</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {message && (
          <div className={`p-4 rounded-md border mb-4 ${
            message.includes('succès') 
              ? 'bg-green-50 border-green-200 text-green-800' 
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            {message}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
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
                className="border-l-4 border-l-orange-500"
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
                className="border-l-4 border-l-orange-500"
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
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border-l-4 border-l-orange-500"
              >
                <option value="user">Utilisateur</option>
                <option value="admin">Administrateur</option>
              </select>
            </div>
          </div>
          <Button 
            type="submit" 
            className="w-full"
            disabled={isCreating}
            style={{ backgroundColor: 'var(--accent-orange)' }}
          >
            {isCreating ? 'Création en cours...' : 'Créer l\'utilisateur'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UserForm;
