
-- Tabela de perfis de usuários
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text,
  institution_type text,
  province text,
  created_at timestamp with time zone default now()
);

-- Trigger automático para criar profile no signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name)
  values (new.id, new.raw_user_meta_data ->> 'name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute procedure public.handle_new_user();

-- Tabela de convites com validade
create table public.invites (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  role text not null,
  institution text,
  token text,
  expires_at timestamp with time zone not null,
  used boolean default false,
  created_at timestamp with time zone default now()
);

-- Storage bucket para documentos
insert into storage.buckets (id, name, public)
values ('documents', 'documents', false);

-- Tabela documents para registro dos uploads
create table public.documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  file_path text not null,
  uploaded_at timestamp with time zone default now()
);

-- Policies básicas
alter table public.profiles enable row level security;
create policy "Cada user vê seu perfil" on public.profiles for select using (auth.uid() = id);
create policy "Cada user edita seu perfil" on public.profiles for update using (auth.uid() = id);

alter table public.invites enable row level security;
create policy "Admins podem ver convites" on public.invites for select using (true);
create policy "Criador convida" on public.invites for insert with check (true);
create policy "Valida convite uso apenas dono/email" on public.invites for update using (true);

alter table public.documents enable row level security;
create policy "Dono vê e registra" on public.documents for select using (auth.uid() = user_id);
create policy "Dono upa" on public.documents for insert with check (auth.uid() = user_id);

-- Policies Storage para acesso seguro
-- (Necessário criar via dashboard caso estas não funcionem conforme esperado)
