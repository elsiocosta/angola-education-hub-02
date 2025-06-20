
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Course {
  id: string;
  institution_id: string;
  name: string;
  description?: string;
  level: 'primary' | 'secondary' | 'high_school' | 'university' | 'technical';
  duration_years?: number;
  tuition?: number;
  requirements?: string;
  created_at?: string;
  updated_at?: string;
}

export const useCourses = (institutionId?: string) => {
  return useQuery({
    queryKey: ['courses', institutionId],
    queryFn: async () => {
      let query = supabase.from('courses').select('*');
      
      if (institutionId) {
        query = query.eq('institution_id', institutionId);
      }
      
      const { data, error } = await query.order('name');
      
      if (error) throw error;
      return data as Course[];
    }
  });
};

export const useCreateCourse = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (course: Omit<Course, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('courses')
        .insert([course])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      toast({
        title: "Sucesso",
        description: "Curso criado com sucesso!"
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: error.message || "Erro ao criar curso",
        variant: "destructive"
      });
    }
  });
};

export const useUpdateCourse = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...course }: Partial<Course> & { id: string }) => {
      const { data, error } = await supabase
        .from('courses')
        .update(course)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      toast({
        title: "Sucesso",
        description: "Curso atualizado com sucesso!"
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: error.message || "Erro ao atualizar curso",
        variant: "destructive"
      });
    }
  });
};

export const useDeleteCourse = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      toast({
        title: "Sucesso",
        description: "Curso removido com sucesso!"
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: error.message || "Erro ao remover curso",
        variant: "destructive"
      });
    }
  });
};
