
import { supabase } from '../integrations/supabase/client';
import type { UserProfile, NewUser } from '../types/userManagement';

export const userService = {
  async fetchUsers(): Promise<{ data: UserProfile[] | null; error: any }> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    
    return { data, error };
  },

  async createUser(userData: NewUser): Promise<{ error: any }> {
    // Validation basique
    if (!userData.email || !userData.fullName) {
      return { error: { message: 'Tous les champs sont obligatoires' } };
    }

    // Insérer directement dans la table profiles avec un UUID généré
    const tempUserId = crypto.randomUUID();
    
    const { error } = await supabase
      .from('profiles')
      .insert({
        id: tempUserId,
        email: userData.email,
        full_name: userData.fullName,
        role: userData.role
      });

    return { error };
  },

  async updateUser(userId: string, updatedData: { fullName: string; role: string }): Promise<{ error: any }> {
    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: updatedData.fullName,
        role: updatedData.role
      })
      .eq('id', userId);

    return { error };
  },

  async deleteUser(userId: string): Promise<{ error: any }> {
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', userId);

    return { error };
  },

  isLastAdmin(users: UserProfile[], userRole: string): boolean {
    if (userRole === 'admin') {
      const adminCount = users.filter(u => u.role === 'admin').length;
      return adminCount <= 1;
    }
    return false;
  }
};
