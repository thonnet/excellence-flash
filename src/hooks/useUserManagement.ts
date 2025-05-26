import { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: string;
  created_at: string;
  last_sign_in_at?: string;
}

interface NewUser {
  email: string;
  fullName: string;
  role: string;
}

export const useUserManagement = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [message, setMessage] = useState('');

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

  const createUser = async (userData: NewUser) => {
    setIsCreating(true);
    setMessage('');
    
    // Validation basique
    if (!userData.email || !userData.fullName) {
      setMessage('Tous les champs sont obligatoires');
      setIsCreating(false);
      return;
    }
    
    try {
      // Créer directement un profil utilisateur
      // Les nouvelles politiques RLS permettent aux admins de créer des profils
      const tempUserId = crypto.randomUUID();
      
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: tempUserId,
          email: userData.email,
          full_name: userData.fullName,
          role: userData.role
        });

      if (profileError) {
        console.error('Erreur profil:', profileError);
        setMessage('Erreur lors de la création: ' + profileError.message);
        return;
      }

      setMessage(`Utilisateur créé avec succès! Un profil a été créé pour ${userData.email}.`);

      // Recharger la liste
      fetchUsers();
      
    } catch (error: any) {
      console.error('Erreur:', error);
      setMessage('Erreur lors de la création de l\'utilisateur: ' + (error.message || 'Erreur inconnue'));
    } finally {
      setIsCreating(false);
    }
  };

  const editUser = async (userId: string, updatedData: { fullName: string; role: string }) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: updatedData.fullName,
          role: updatedData.role
        })
        .eq('id', userId);

      if (error) {
        setMessage('Erreur lors de la modification: ' + error.message);
        return;
      }

      setMessage('Utilisateur modifié avec succès!');
      fetchUsers();
      
    } catch (error: any) {
      setMessage('Erreur lors de la modification: ' + error.message);
    }
  };

  const deleteUser = async (userId: string, userEmail: string, userRole: string) => {
    // Vérifier si c'est le dernier admin
    if (userRole === 'admin') {
      const adminCount = users.filter(u => u.role === 'admin').length;
      if (adminCount <= 1) {
        setMessage('Impossible de supprimer le dernier administrateur!');
        return;
      }
    }

    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur ${userEmail} ?`)) {
      return;
    }

    try {
      // Supprimer de la table profiles
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (profileError) {
        setMessage('Erreur lors de la suppression: ' + profileError.message);
        return;
      }

      setMessage('Utilisateur supprimé avec succès!');
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
