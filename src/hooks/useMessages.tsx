
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Message {
  id: string;
  sender_id: string;
  recipient_id: string;
  institution_id?: string;
  subject: string;
  content: string;
  read_at?: string;
  created_at?: string;
  sender?: {
    name: string;
  };
  recipient?: {
    name: string;
  };
}

export const useMessages = (userId?: string) => {
  return useQuery({
    queryKey: ['messages', userId],
    queryFn: async () => {
      if (!userId) return [];
      
      const { data, error } = await supabase
        .from('internal_messages')
        .select('*')
        .or(`sender_id.eq.${userId},recipient_id.eq.${userId}`)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // For now, we'll return the data without user names
      // until we implement a proper profiles system
      const transformedData = data?.map(message => ({
        ...message,
        sender: { name: 'Usuário' },
        recipient: { name: 'Usuário' }
      })) || [];
      
      return transformedData as Message[];
    },
    enabled: !!userId
  });
};

export const useSendMessage = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (message: Omit<Message, 'id' | 'created_at' | 'read_at'>) => {
      const { data, error } = await supabase
        .from('internal_messages')
        .insert([message])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      toast({
        title: "Sucesso",
        description: "Mensagem enviada com sucesso!"
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: error.message || "Erro ao enviar mensagem",
        variant: "destructive"
      });
    }
  });
};

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (messageId: string) => {
      const { data, error } = await supabase
        .from('internal_messages')
        .update({ read_at: new Date().toISOString() })
        .eq('id', messageId)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    }
  });
};
