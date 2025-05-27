
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Excellence } from '@/types';
import { useToast } from '@/hooks/use-toast';

export const useExcellences = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch excellences
  const { data: excellences = [], isLoading, refetch } = useQuery({
    queryKey: ['excellences'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('excellences')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching excellences:', error);
        throw error;
      }
      
      return data as Excellence[];
    },
  });

  // Add excellence mutation
  const addExcellenceMutation = useMutation({
    mutationFn: async (newExcellence: Omit<Excellence, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('excellences')
        .insert([{ ...newExcellence, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['excellences'] });
      toast({
        title: "Excellence créée",
        description: "Votre nouvelle excellence a été ajoutée avec succès.",
      });
    },
    onError: (error) => {
      console.error('Error adding excellence:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter l'excellence.",
        variant: "destructive",
      });
    },
  });

  // Update excellence mutation
  const updateExcellenceMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Excellence> }) => {
      const { data, error } = await supabase
        .from('excellences')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['excellences'] });
      toast({
        title: "Excellence mise à jour",
        description: "Vos modifications ont été sauvegardées.",
      });
    },
    onError: (error) => {
      console.error('Error updating excellence:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour l'excellence.",
        variant: "destructive",
      });
    },
  });

  // Delete excellence mutation
  const deleteExcellenceMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('excellences')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['excellences'] });
      queryClient.invalidateQueries({ queryKey: ['experiences'] });
      toast({
        title: "Excellence supprimée",
        description: "L'excellence a été supprimée avec succès.",
      });
    },
    onError: (error) => {
      console.error('Error deleting excellence:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'excellence.",
        variant: "destructive",
      });
    },
  });

  return {
    excellences,
    isLoading,
    refetch,
    addExcellence: addExcellenceMutation.mutate,
    updateExcellence: updateExcellenceMutation.mutate,
    deleteExcellence: deleteExcellenceMutation.mutate,
  };
};
