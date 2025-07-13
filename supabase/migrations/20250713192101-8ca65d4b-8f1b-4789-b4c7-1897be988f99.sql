
-- Adicionar campo role à tabela profiles
ALTER TABLE public.profiles ADD COLUMN role text DEFAULT 'visitor';

-- Adicionar campo user_type à tabela profiles para compatibilidade
ALTER TABLE public.profiles ADD COLUMN user_type text DEFAULT 'visitor';

-- Atualizar a função handle_new_user para incluir role e user_type
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
begin
  insert into public.profiles (id, name, role, user_type)
  values (
    new.id, 
    new.raw_user_meta_data ->> 'name',
    COALESCE(new.raw_user_meta_data ->> 'role', 'visitor'),
    COALESCE(new.raw_user_meta_data ->> 'user_type', 'visitor')
  );
  return new;
end;
$function$;

-- Atualizar perfis existentes se houver
UPDATE public.profiles 
SET role = 'visitor', user_type = 'visitor' 
WHERE role IS NULL OR user_type IS NULL;
