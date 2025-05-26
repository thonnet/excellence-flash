
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { UserDisplay, AuthState } from '../types/auth';

export const useAuth = (): AuthState => {
  const [user, setUser] = useState<UserDisplay | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Écouter les changements d'état d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          // Récupérer les informations du profil utilisateur
          const { data: profile } = await supabase
            .from('profiles')
            .select('role, full_name')
            .eq('id', session.user.id)
            .single();

          const userDisplay: UserDisplay = {
            id: session.user.id,
            email: session.user.email || '',
            full_name: profile?.full_name || session.user.email || '',
            role: (profile?.role as 'user' | 'admin') || 'user'
          };

          setUser(userDisplay);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    // Vérifier la session existante
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        supabase
          .from('profiles')
          .select('role, full_name')
          .eq('id', session.user.id)
          .single()
          .then(({ data: profile }) => {
            const userDisplay: UserDisplay = {
              id: session.user.id,
              email: session.user.email || '',
              full_name: profile?.full_name || session.user.email || '',
              role: (profile?.role as 'user' | 'admin') || 'user'
            };
            setUser(userDisplay);
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return {
    user,
    loading,
    isAdmin: user?.role === 'admin'
  };
};
