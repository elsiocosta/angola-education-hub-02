
import { useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export const useUserSession = () => {
  const { user } = useAuth();

  const updateSession = useMutation({
    mutationFn: async () => {
      if (!user) return;

      const { error } = await supabase
        .from('user_sessions')
        .upsert({
          user_id: user.id,
          last_seen: new Date().toISOString(),
          is_active: true
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;
    }
  });

  // Atualizar sessão a cada 5 minutos para usuários logados
  useEffect(() => {
    if (!user) return;

    // Atualizar imediatamente
    updateSession.mutate();

    // Configurar intervalo
    const interval = setInterval(() => {
      updateSession.mutate();
    }, 5 * 60 * 1000); // 5 minutos

    return () => clearInterval(interval);
  }, [user]);

  // Marcar como inativo ao sair
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (user) {
        navigator.sendBeacon('/api/mark-inactive', JSON.stringify({ userId: user.id }));
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [user]);

  return { updateSession: updateSession.mutate };
};
