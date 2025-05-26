
import { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';

interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  pendingUsers: number;
  totalExcellences: number;
  totalExperiences: number;
  todayExcellences: number;
  thisWeekUsers: number;
}

export const useAdminStats = () => {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    activeUsers: 0,
    pendingUsers: 0,
    totalExcellences: 0,
    totalExperiences: 0,
    todayExcellences: 0,
    thisWeekUsers: 0
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setLoading(true);
      
      // 1. Statistiques utilisateurs
      const { data: users } = await supabase
        .from('profiles')
        .select('id, created_at, last_sign_in_at');

      // 2. Statistiques excellences (table hypothétique)
      const { data: excellences } = await supabase
        .from('excellences')
        .select('id, created_at');

      // 3. Statistiques expériences (table hypothétique)
      const { data: experiences } = await supabase
        .from('experiences')
        .select('id, created_at');

      // Calculs
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

      const totalUsers = users?.length || 0;
      const activeUsers = users?.filter(u => u.last_sign_in_at).length || 0;
      const pendingUsers = totalUsers - activeUsers;
      
      const totalExcellences = excellences?.length || 0;
      const totalExperiences = experiences?.length || 0;
      
      const todayExcellences = excellences?.filter(e => 
        new Date(e.created_at) >= today
      ).length || 0;
      
      const thisWeekUsers = users?.filter(u => 
        u.created_at && new Date(u.created_at) >= weekAgo
      ).length || 0;

      setStats({
        totalUsers,
        activeUsers,
        pendingUsers,
        totalExcellences,
        totalExperiences,
        todayExcellences,
        thisWeekUsers
      });

    } catch (error) {
      console.error('Erreur chargement stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    
    // Actualiser toutes les 30 secondes
    const interval = setInterval(fetchStats, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return { stats, loading, refreshStats: fetchStats };
};
