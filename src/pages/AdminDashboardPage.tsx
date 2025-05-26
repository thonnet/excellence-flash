
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { User } from '../types';
import { requireAdmin, redirectIfNotAdmin } from '../utils/auth';
import { HeaderAdmin } from '../components/admin/HeaderAdmin';
import { AdminDashboard } from '../components/admin/AdminDashboard';

const AdminDashboardPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        
        if (!authUser) {
          navigate('/');
          return;
        }

        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authUser.id)
          .single();

        if (profile) {
          setUser(profile as User);
          
          // Vérifier si l'utilisateur est admin
          if (!redirectIfNotAdmin(profile as User, navigate)) {
            return;
          }
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du profil:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [navigate]);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        color: 'var(--text-primary)'
      }}>
        Chargement...
      </div>
    );
  }

  if (!user || !requireAdmin(user)) {
    return null;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <HeaderAdmin user={user} />
      <AdminDashboard />
    </div>
  );
};

export default AdminDashboardPage;
