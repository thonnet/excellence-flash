
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AdminStats {
  activeUsers: number;
  totalExcellences: number;
  totalExperiences: number;
  pendingUsers: number;
  loading: boolean;
}

export const useAdminStats = () => {
  const [stats, setStats] = useState<AdminStats>({
    activeUsers: 0,
    totalExcellences: 0,
    totalExperiences: 0,
    pendingUsers: 0,
    loading: true
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Récupérer les utilisateurs
        const { data: users } = await supabase
          .from('profiles')
          .select('*');
        
        // Récupérer les excellences
        const { data: excellences } = await supabase
          .from('excellences')
          .select('*');
          
        // Récupérer les expériences
        const { data: experiences } = await supabase
          .from('experiences')
          .select('*');

        setStats({
          activeUsers: users?.filter(u => u.last_sign_in_at).length || 0,
          totalExcellences: excellences?.length || 0,
          totalExperiences: experiences?.length || 0,
          pendingUsers: users?.filter(u => !u.last_sign_in_at).length || 0,
          loading: false
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des statistiques:', error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };

    fetchStats();
  }, []);

  return stats;
};
