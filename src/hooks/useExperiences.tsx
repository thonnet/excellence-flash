
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Experience } from '@/types';
import { useToast } from '@/hooks/use-toast';

export const useExperiences = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch experiences
  const { data: experiences = [], isLoading, refetch } = useQuery({
    queryKey: ['experiences'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('date_experienced', { ascending: false });
      
      if (error) {
        console.error('Error fetching experiences:', error);
        throw error;
      }
      
      return data as Experience[];
    },
  });

  // Add experience mutation
  const addExperienceMutation = useMutation({
    mutationFn: async (newExperience: Omit<Experience, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('experiences')
        .insert([{ ...newExperience, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experiences'] });
      toast({
        title: "Expérience ajoutée",
        description: "Votre nouvelle expérience a été enregistrée avec succès.",
      });
    },
    onError: (error) => {
      console.error('Error adding experience:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter l'expérience.",
        variant: "destructive",
      });
    },
  });

  const getExperienceCount = (excellenceId: string) => {
    return experiences.filter(exp => exp.excellence_id === excellenceId).length;
  };

  return {
    experiences,
    isLoading,
    refetch,
    addExperience: addExperienceMutation.mutate,
    getExperienceCount,
  };
};
