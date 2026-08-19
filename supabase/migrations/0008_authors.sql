create table public.authors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

alter table public.authors enable row level security;

create policy "authors_public_read" on public.authors
  for select using (true);

create policy "authors_admin_all" on public.authors
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

grant select on public.authors to anon, authenticated;
grant insert, update, delete on public.authors to authenticated;

create table public.project_authors (
  project_id uuid not null references public.projects(id) on delete cascade,
  author_id uuid not null references public.authors(id) on delete cascade,
  primary key (project_id, author_id)
);

alter table public.project_authors enable row level security;

create policy "project_authors_public_read" on public.project_authors
  for select using (true);

create policy "project_authors_admin_all" on public.project_authors
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

grant select on public.project_authors to anon, authenticated;
grant insert, update, delete on public.project_authors to authenticated;
