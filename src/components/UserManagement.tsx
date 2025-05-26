
import React, { useState } from 'react';
import { Button } from './ui/button';
import { User, UserPlus, ArrowLeft } from 'lucide-react';
import { useUserManagement } from '../hooks/useUserManagement';
import UserList from './UserList';
import UserForm from './UserForm';

interface UserManagementProps {
  onBack: () => void;
}

const UserManagement: React.FC<UserManagementProps> = ({ onBack }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { 
    users, 
    loading, 
    isCreating, 
    message, 
    createUser, 
    editUser, 
    deleteUser, 
    fetchUsers, 
    clearMessage 
  } = useUserManagement();

  const handleCreateUser = async (userData: { email: string; fullName: string; role: string }) => {
    await createUser(userData);
    setShowCreateForm(false);
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

      {/* Message d'état */}
      {message && (
        <div className={`flex justify-between items-center p-4 rounded-md border ${
          message.includes('succès') 
            ? 'bg-green-50 border-green-200 text-green-800' 
            : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          <span>{message}</span>
          <button 
            onClick={clearMessage}
            className="text-lg font-bold hover:opacity-70 ml-4"
          >
            ×
          </button>
        </div>
      )}

      {/* Formulaire de création */}
      {showCreateForm && (
        <UserForm 
          onCreateUser={handleCreateUser}
          isCreating={isCreating}
          message=""
        />
      )}

      {/* Liste des utilisateurs */}
      <UserList 
        users={users} 
        loading={loading} 
        onEdit={editUser}
        onDelete={deleteUser}
        onRefresh={fetchUsers}
      />
    </div>
  );
};

export default UserManagement;
