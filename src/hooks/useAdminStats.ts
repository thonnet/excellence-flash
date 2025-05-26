
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
        
        // Pour l'instant, utiliser des données mockées pour excellences et expériences
        // jusqu'à ce que ces tables soient créées
        const mockExcellences = Math.floor(Math.random() * 150) + 50;
        const mockExperiences = Math.floor(Math.random() * 300) + 100;

        setStats({
          activeUsers: users?.filter(u => u.last_sign_in_at).length || 0,
          totalExcellences: mockExcellences,
          totalExperiences: mockExperiences,
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
