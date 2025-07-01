
-- Criar tabela para rastrear estatísticas da plataforma em tempo real
CREATE TABLE IF NOT EXISTS public.platform_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  total_institutions INTEGER DEFAULT 0,
  total_students INTEGER DEFAULT 0,
  total_courses INTEGER DEFAULT 0,
  active_users INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Inserir registro inicial se não existir
INSERT INTO public.platform_stats (total_institutions, total_students, total_courses, active_users)
SELECT 0, 0, 0, 0
WHERE NOT EXISTS (SELECT 1 FROM public.platform_stats);

-- Criar tabela para rastrear usuários online se não existir
CREATE TABLE IF NOT EXISTS public.user_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  last_seen TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN DEFAULT true,
  UNIQUE(user_id)
);

-- Habilitar RLS nas tabelas
ALTER TABLE public.platform_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;

-- Políticas para platform_stats
DROP POLICY IF EXISTS "Anyone can view platform stats" ON public.platform_stats;
DROP POLICY IF EXISTS "Only authenticated users can update stats" ON public.platform_stats;

CREATE POLICY "Anyone can view platform stats" ON public.platform_stats FOR SELECT USING (true);
CREATE POLICY "Only authenticated users can update stats" ON public.platform_stats FOR UPDATE USING (auth.role() = 'authenticated');

-- Políticas para user_sessions
DROP POLICY IF EXISTS "Users can view their own session" ON public.user_sessions;
DROP POLICY IF EXISTS "Users can manage their own session" ON public.user_sessions;

CREATE POLICY "Users can view their own session" ON public.user_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own session" ON public.user_sessions FOR ALL USING (auth.uid() = user_id);

-- Criar função para atualizar estatísticas automaticamente
CREATE OR REPLACE FUNCTION update_platform_stats()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.platform_stats SET
    total_institutions = (SELECT COUNT(*) FROM public.institutions WHERE status = 'approved'),
    total_students = (SELECT COUNT(*) FROM auth.users WHERE raw_user_meta_data->>'user_type' = 'student'),
    total_courses = (SELECT COUNT(*) FROM public.courses),
    active_users = (SELECT COUNT(*) FROM public.user_sessions WHERE last_seen > now() - interval '1 hour'),
    updated_at = now()
  WHERE id = (SELECT id FROM public.platform_stats ORDER BY updated_at DESC LIMIT 1);
END;
$$;

-- Criar função trigger
CREATE OR REPLACE FUNCTION trigger_update_stats()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  PERFORM update_platform_stats();
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Criar triggers
DROP TRIGGER IF EXISTS institutions_stats_trigger ON public.institutions;
DROP TRIGGER IF EXISTS courses_stats_trigger ON public.courses;

CREATE TRIGGER institutions_stats_trigger
  AFTER INSERT OR DELETE OR UPDATE ON public.institutions
  FOR EACH ROW EXECUTE FUNCTION trigger_update_stats();

CREATE TRIGGER courses_stats_trigger
  AFTER INSERT OR DELETE OR UPDATE ON public.courses
  FOR EACH ROW EXECUTE FUNCTION trigger_update_stats();

-- Atualizar stats iniciais
SELECT update_platform_stats();
