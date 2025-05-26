import { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';
import { useToast } from './use-toast';

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
  const { toast } = useToast();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
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
    
    // Validation basique
    if (!userData.email || !userData.fullName) {
      setMessage('Tous les champs sont obligatoires');
      setIsCreating(false);
      return;
    }
    
    try {
      // Vérifier d'abord si l'utilisateur actuel est admin
      const { data: currentUser } = await supabase.auth.getUser();
      if (!currentUser.user) {
        setMessage('Vous devez être connecté pour créer un utilisateur');
        setIsCreating(false);
        return;
      }

      // Vérifier le rôle de l'utilisateur actuel
      const { data: currentProfile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', currentUser.user.id)
        .single();

      if (profileError || !currentProfile) {
        console.error('Erreur profile:', profileError);
        setMessage('Impossible de vérifier vos permissions');
        setIsCreating(false);
        return;
      }

      if (currentProfile.role !== 'admin') {
        setMessage('Seuls les administrateurs peuvent créer des utilisateurs');
        setIsCreating(false);
        return;
      }

      // Maintenant essayer de créer l'utilisateur via l'API d'authentification
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: userData.email,
        password: 'TempPassword123!', // Mot de passe temporaire
        options: {
          data: {
            full_name: userData.fullName,
            role: userData.role
          }
        }
      });

      if (signUpError) {
        console.error('Erreur signUp:', signUpError);
        
        // Si l'API signUp ne fonctionne pas, essayons l'approche directe
        const tempUserId = crypto.randomUUID();
        
        const { error: directInsertError } = await supabase
          .from('profiles')
          .insert({
            id: tempUserId,
            email: userData.email,
            full_name: userData.fullName,
            role: userData.role
          });

        if (directInsertError) {
          console.error('Erreur insertion directe:', directInsertError);
          setMessage('Erreur lors de la création: ' + directInsertError.message);
          toast({
            title: "Erreur de création",
            description: directInsertError.message,
            variant: "destructive",
          });
          return;
        }

        setMessage(`Profil créé avec succès pour ${userData.email}. L'utilisateur devra s'inscrire via l'interface normale.`);
        toast({
          title: "Profil créé",
          description: `Profil créé pour ${userData.email}`,
        });
      } else {
        setMessage(`Utilisateur créé avec succès! ${userData.email} peut maintenant se connecter.`);
        toast({
          title: "Utilisateur créé",
          description: `${userData.email} peut maintenant se connecter`,
        });
      }

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
