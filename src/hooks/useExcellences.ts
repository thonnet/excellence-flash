
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Excellence } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

export const useExcellences = () => {
  const [excellences, setExcellences] = useState<Excellence[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchExcellences = async () => {
    if (!user) return;
    
    try {
      console.log('Fetching excellences for user:', user.id);
      const { data, error } = await supabase
        .from('excellences')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching excellences:', error);
        throw error;
      }
      
      console.log('Excellences data:', data);
      
      if (data) {
        const mappedExcellences: Excellence[] = data.map(item => ({
          id: item.id,
          user_id: item.user_id,
          name: item.name,
          description: item.description || '',
          category: item.category as 'manifestee' | 'principe' | 'quete',
          created_at: item.created_at,
          updated_at: item.updated_at,
        }));
        setExcellences(mappedExcellences);
      }
    } catch (error) {
      console.error('Error fetching excellences:', error);
    } finally {
      setLoading(false);
    }
  };

  const addExcellence = async (excellence: Omit<Excellence, 'id' | 'created_at' | 'updated_at'>) => {
    if (!user) return;

    try {
      console.log('Adding excellence:', excellence);
      const { data, error } = await supabase
        .from('excellences')
        .insert([excellence])
        .select()
        .single();

      if (error) {
        console.error('Error adding excellence:', error);
        throw error;
      }
      
      if (data) {
        const mappedExcellence: Excellence = {
          id: data.id,
          user_id: data.user_id,
          name: data.name,
          description: data.description || '',
          category: data.category as 'manifestee' | 'principe' | 'quete',
          created_at: data.created_at,
          updated_at: data.updated_at,
        };
        setExcellences(prev => [mappedExcellence, ...prev]);
      }
    } catch (error) {
      console.error('Error adding excellence:', error);
    }
  };

  const updateExcellence = async (id: string, updates: Partial<Excellence>) => {
    try {
      console.log('Updating excellence:', id, updates);
      const { data, error } = await supabase
        .from('excellences')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating excellence:', error);
        throw error;
      }
      
      if (data) {
        const mappedExcellence: Excellence = {
          id: data.id,
          user_id: data.user_id,
          name: data.name,
          description: data.description || '',
          category: data.category as 'manifestee' | 'principe' | 'quete',
          created_at: data.created_at,
          updated_at: data.updated_at,
        };
        setExcellences(prev => prev.map(item => 
          item.id === id ? mappedExcellence : item
        ));
      }
    } catch (error) {
      console.error('Error updating excellence:', error);
    }
  };

  const deleteExcellence = async (id: string) => {
    try {
      console.log('Deleting excellence:', id);
      const { error } = await supabase
        .from('excellences')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting excellence:', error);
        throw error;
      }
      
      setExcellences(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting excellence:', error);
    }
  };

  useEffect(() => {
    fetchExcellences();
  }, [user]);

  return {
    excellences,
    loading,
    addExcellence,
    updateExcellence,
    deleteExcellence,
  };
};
