create table public.languages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  devicon_slug text,
  devicon_variant text,
  position integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.languages enable row level security;

create policy "languages_public_read" on public.languages
  for select using (true);

create policy "languages_admin_all" on public.languages
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

grant select on public.languages to anon, authenticated;
grant insert, update, delete on public.languages to authenticated;
