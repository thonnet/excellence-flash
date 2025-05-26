
import { useState, useEffect } from 'react';
import { useToast } from './use-toast';
import { userService } from '../services/userService';
import type { UserProfile, NewUser } from '../types/userManagement';

export const useUserManagement = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await userService.fetchUsers();
      
      if (error) {
        console.error('Erreur lors du chargement des utilisateurs:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les utilisateurs",
          variant: "destructive",
        });
      } else {
        setUsers(data || []);
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (userData: NewUser) => {
    setIsCreating(true);
    setMessage('');
    
    try {
      const { error } = await userService.createUser(userData);

      if (error) {
        console.error('Erreur insertion directe:', error);
        setMessage('Erreur lors de la création: ' + error.message);
        toast({
          title: "Erreur de création",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      setMessage(`Profil créé avec succès pour ${userData.email}.`);
      toast({
        title: "Profil créé",
        description: `Profil créé pour ${userData.email}`,
      });

      // Recharger la liste
      fetchUsers();
      
    } catch (error: any) {
      console.error('Erreur:', error);
      setMessage('Erreur lors de la création de l\'utilisateur: ' + (error.message || 'Erreur inconnue'));
      toast({
        title: "Erreur",
        description: error.message || 'Erreur inconnue',
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const editUser = async (userId: string, updatedData: { fullName: string; role: string }) => {
    try {
      const { error } = await userService.updateUser(userId, updatedData);

      if (error) {
        setMessage('Erreur lors de la modification: ' + error.message);
        return;
      }

      setMessage('Utilisateur modifié avec succès!');
      toast({
        title: "Modification réussie",
        description: "L'utilisateur a été modifié avec succès",
      });
      fetchUsers();
      
    } catch (error: any) {
      setMessage('Erreur lors de la modification: ' + error.message);
    }
  };

  const deleteUser = async (userId: string, userEmail: string, userRole: string) => {
    // Vérifier si c'est le dernier admin
    if (userService.isLastAdmin(users, userRole)) {
      setMessage('Impossible de supprimer le dernier administrateur!');
      return;
    }

    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur ${userEmail} ?`)) {
      return;
    }

    try {
      const { error } = await userService.deleteUser(userId);

      if (error) {
        setMessage('Erreur lors de la suppression: ' + error.message);
        return;
      }

      setMessage('Utilisateur supprimé avec succès!');
      toast({
        title: "Suppression réussie",
        description: "L'utilisateur a été supprimé avec succès",
      });
      fetchUsers();
      
    } catch (error: any) {
      setMessage('Erreur lors de la suppression: ' + error.message);
    }
  };

  const clearMessage = () => {
    setMessage('');
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    isCreating,
    message,
    createUser,
    editUser,
    deleteUser,
    fetchUsers,
    clearMessage
  };
};
