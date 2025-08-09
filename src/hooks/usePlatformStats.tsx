
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface PlatformStats {
  id: string;
  total_institutions: number;
  total_students: number;
  total_courses: number;
  active_users: number;
  updated_at: string;
}

export const usePlatformStats = () => {
  return useQuery({
    queryKey: ['platform-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('platform_stats')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(1)
        .single();
      if (error) throw error;
      return data as PlatformStats;
    },
    refetchInterval: 60_000,
    staleTime: 60_000,
    retry: 1,
    retryDelay: (attempt) => Math.min(2000 * attempt, 8000),
    refetchOnWindowFocus: false,
  });
};
