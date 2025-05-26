
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Experience } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

export const useExperiences = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchExperiences = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setExperiences(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, [user]);

  const addExperience = async (experience: Omit<Experience, 'id' | 'created_at' | 'updated_at'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('experiences')
        .insert([{ ...experience, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      setExperiences(prev => [data, ...prev]);
      return data;
    } catch (err) {
      throw err;
    }
  };

  const updateExperience = async (id: string, updates: Partial<Experience>) => {
    try {
      const { data, error } = await supabase
        .from('experiences')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setExperiences(prev => prev.map(exp => exp.id === id ? data : exp));
      return data;
    } catch (err) {
      throw err;
    }
  };

  const deleteExperience = async (id: string) => {
    try {
      const { error } = await supabase
        .from('experiences')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setExperiences(prev => prev.filter(exp => exp.id !== id));
    } catch (err) {
      throw err;
    }
  };

  const getExperienceCount = (excellenceId: string) => {
    return experiences.filter(exp => exp.excellence_id === excellenceId).length;
  };

  return {
    experiences,
    loading,
    error,
    addExperience,
    updateExperience,
    deleteExperience,
    getExperienceCount,
    refetch: fetchExperiences
  };
};
