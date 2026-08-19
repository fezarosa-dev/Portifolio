create extension if not exists pgcrypto;

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  summary text not null default '',
  content_md text not null default '',
  cover_image text,
  repo_url text,
  site_url text,
  click_mode text not null default 'detail' check (click_mode in ('detail', 'link')),
  click_url text,
  visible boolean not null default true,
  position integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.projects enable row level security;

create policy "projects_public_read" on public.projects
  for select using (visible = true);

create policy "projects_admin_all" on public.projects
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create table public.site_content (
  key text primary key,
  value text not null default ''
);

alter table public.site_content enable row level security;

create policy "site_content_public_read" on public.site_content
  for select using (true);

create policy "site_content_admin_write" on public.site_content
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create table public.resume (
  id uuid primary key default gen_random_uuid(),
  content_md text not null default '',
  updated_at timestamptz not null default now()
);

alter table public.resume enable row level security;

create policy "resume_public_read" on public.resume
  for select using (true);

create policy "resume_admin_write" on public.resume
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

insert into public.resume (id, content_md) values
  ('00000000-0000-0000-0000-000000000001', '# Currículo\n\nEdite esta página pelo painel admin.');

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.messages enable row level security;

create policy "messages_public_insert" on public.messages
  for insert with check (true);

create policy "messages_admin_manage" on public.messages
  for select using (auth.role() = 'authenticated');

create policy "messages_admin_update" on public.messages
  for update using (auth.role() = 'authenticated');

create policy "messages_admin_delete" on public.messages
  for delete using (auth.role() = 'authenticated');

insert into public.site_content (key, value) values
  ('hero_title', 'Olá, meu nome é Felipe'),
  ('hero_subtitle', 'Eu sou desenvolvedor WEB'),
  ('sobre_texto', ''),
  ('sobre_foto', ''),
  ('servicos_texto', ''),
  ('contato_email', 'fezarosa@gmail.com'),
  ('contato_telefone', ''),
  ('drive_folder_url', '');
