
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Experience } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

export const useExperiences = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchExperiences = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('date_experienced', { ascending: false });

      if (error) throw error;
      
      if (data) {
        setExperiences(data.map(item => ({
          id: item.id,
          user_id: item.user_id,
          excellence_id: item.excellence_id,
          title: item.title,
          description: item.description || '',
          image_url: item.image_url,
          image_caption: item.image_caption,
          date_experienced: item.date_experienced,
          created_at: item.created_at,
          updated_at: item.updated_at,
        })));
      }
    } catch (error) {
      console.error('Error fetching experiences:', error);
    } finally {
      setLoading(false);
    }
  };

  const addExperience = async (experience: Omit<Experience, 'id' | 'created_at' | 'updated_at'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('experiences')
        .insert([experience])
        .select()
        .single();

      if (error) throw error;
      
      if (data) {
        setExperiences(prev => [data, ...prev]);
      }
    } catch (error) {
      console.error('Error adding experience:', error);
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
      
      if (data) {
        setExperiences(prev => prev.map(item => 
          item.id === id ? data : item
        ));
      }
    } catch (error) {
      console.error('Error updating experience:', error);
    }
  };

  const deleteExperience = async (id: string) => {
    try {
      const { error } = await supabase
        .from('experiences')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setExperiences(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting experience:', error);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, [user]);

  return {
    experiences,
    loading,
    addExperience,
    updateExperience,
    deleteExperience,
  };
};
