
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
      // 1. Créer l'utilisateur avec Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: userData.email,
        password: 'TempPassword123!',
        email_confirm: true,
        user_metadata: {
          full_name: userData.fullName,
          role: userData.role
        }
      });

      if (authError) {
        console.error('Erreur création auth:', authError);
        setMessage('Erreur lors de la création: ' + authError.message);
        return;
      }

      // 2. Mettre à jour le profil avec les informations
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            full_name: userData.fullName,
            role: userData.role
          })
          .eq('id', authData.user.id);

        if (profileError) {
          console.error('Erreur profil:', profileError);
        }
      }

      // 3. Succès
      setMessage(`Utilisateur créé avec succès! Email: ${userData.email} - Mot de passe temporaire: TempPassword123!`);
      
      // Recharger la liste
      fetchUsers();
      
    } catch (error: any) {
      console.error('Erreur:', error);
      setMessage('Erreur lors de la création de l\'utilisateur: ' + (error.message || 'Erreur inconnue'));
    } finally {
      setIsCreating(false);
    }
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
    fetchUsers
  };
};
