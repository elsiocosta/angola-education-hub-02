
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Institution {
  id: string;
  name: string;
  description?: string;
  institution_type: 'primary' | 'secondary' | 'high_school' | 'university' | 'technical';
  province: string;
  municipality?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  video_url?: string;
  logo_url?: string;
  latitude?: number;
  longitude?: number;
  tuition_primary?: number;
  tuition_secondary?: number;
  tuition_high_school?: number;
  tuition_university?: number;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
  status?: 'pending' | 'approved' | 'rejected';
  subscription_plan?: 'free' | 'primary' | 'secondary' | 'university';
}

export const useInstitutions = () => {
  return useQuery({
    queryKey: ['institutions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('institutions')
        .select('*')
        .eq('status', 'approved')
        .order('name');
      
      if (error) throw error;
      return data as Institution[];
    }
  });
};

export const useInstitutionsByProvince = (province?: string) => {
  return useQuery({
    queryKey: ['institutions', 'province', province],
    queryFn: async () => {
      let query = supabase
        .from('institutions')
        .select('*')
        .eq('status', 'approved');
      
      if (province) {
        query = query.eq('province', province);
      }
      
      const { data, error } = await query.order('name');
      
      if (error) throw error;
      return data as Institution[];
    },
    enabled: !!province
  });
};

export const useCreateInstitution = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (institution: Omit<Institution, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('institutions')
        .insert([institution])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['institutions'] });
      toast({
        title: "Sucesso",
        description: "Instituição criada com sucesso!"
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: error.message || "Erro ao criar instituição",
        variant: "destructive"
      });
    }
  });
};
