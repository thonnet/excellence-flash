
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Excellence } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

export const useExcellences = () => {
  const [excellences, setExcellences] = useState<Excellence[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchExcellences = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('excellences')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setExcellences(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExcellences();
  }, [user]);

  const addExcellence = async (excellence: Omit<Excellence, 'id' | 'created_at' | 'updated_at'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('excellences')
        .insert([{ ...excellence, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      setExcellences(prev => [data, ...prev]);
      return data;
    } catch (err) {
      throw err;
    }
  };

  const updateExcellence = async (id: string, updates: Partial<Excellence>) => {
    try {
      const { data, error } = await supabase
        .from('excellences')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setExcellences(prev => prev.map(exc => exc.id === id ? data : exc));
      return data;
    } catch (err) {
      throw err;
    }
  };

  const deleteExcellence = async (id: string) => {
    try {
      const { error } = await supabase
        .from('excellences')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setExcellences(prev => prev.filter(exc => exc.id !== id));
    } catch (err) {
      throw err;
    }
  };

  return {
    excellences,
    loading,
    error,
    addExcellence,
    updateExcellence,
    deleteExcellence,
    refetch: fetchExcellences
  };
};
