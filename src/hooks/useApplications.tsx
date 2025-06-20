
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Application {
  id: string;
  student_id: string;
  institution_id: string;
  course_id?: string;
  status: 'pending' | 'approved' | 'rejected' | 'waiting_list';
  documents: any[];
  personal_data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    birthDate: string;
  };
  submitted_at?: string;
  reviewed_at?: string;
  reviewed_by?: string;
  notes?: string;
  course?: {
    name: string;
    level: string;
  };
  institution?: {
    name: string;
  };
}

export const useApplications = (filters?: { studentId?: string; institutionId?: string }) => {
  return useQuery({
    queryKey: ['applications', filters],
    queryFn: async () => {
      let query = supabase
        .from('applications')
        .select(`
          *,
          courses (name, level),
          institutions (name)
        `);
      
      if (filters?.studentId) {
        query = query.eq('student_id', filters.studentId);
      }
      
      if (filters?.institutionId) {
        query = query.eq('institution_id', filters.institutionId);
      }
      
      const { data, error } = await query.order('submitted_at', { ascending: false });
      
      if (error) throw error;
      return data as Application[];
    }
  });
};

export const useCreateApplication = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (application: Omit<Application, 'id' | 'submitted_at' | 'status'>) => {
      const { data, error } = await supabase
        .from('applications')
        .insert([{ ...application, status: 'pending' }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      toast({
        title: "Sucesso",
        description: "Candidatura submetida com sucesso!"
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: error.message || "Erro ao submeter candidatura",
        variant: "destructive"
      });
    }
  });
};

export const useUpdateApplicationStatus = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      id, 
      status, 
      notes, 
      reviewedBy 
    }: { 
      id: string; 
      status: Application['status']; 
      notes?: string;
      reviewedBy: string;
    }) => {
      const { data, error } = await supabase
        .from('applications')
        .update({ 
          status, 
          notes,
          reviewed_by: reviewedBy,
          reviewed_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      toast({
        title: "Sucesso",
        description: "Status da candidatura atualizado!"
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: error.message || "Erro ao atualizar candidatura",
        variant: "destructive"
      });
    }
  });
};
