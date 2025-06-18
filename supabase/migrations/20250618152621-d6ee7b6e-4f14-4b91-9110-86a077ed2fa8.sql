
-- Criar tabela para armazenar códigos de verificação
CREATE TABLE public.verification_codes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  code TEXT NOT NULL,
  user_type TEXT NOT NULL, -- 'visitor' ou 'institution'
  user_data JSONB NOT NULL, -- dados do usuário para criar conta após verificação
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + interval '10 minutes'),
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Adicionar índice para consultas rápidas por email e código
CREATE INDEX idx_verification_codes_email_code ON public.verification_codes(email, code);
CREATE INDEX idx_verification_codes_expires_at ON public.verification_codes(expires_at);

-- RLS policies
ALTER TABLE public.verification_codes ENABLE ROW LEVEL SECURITY;

-- Permitir inserção e consulta por qualquer usuário (necessário para o processo de registro)
CREATE POLICY "Allow insert verification codes" 
  ON public.verification_codes 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow select verification codes" 
  ON public.verification_codes 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow update verification codes" 
  ON public.verification_codes 
  FOR UPDATE 
  USING (true);
