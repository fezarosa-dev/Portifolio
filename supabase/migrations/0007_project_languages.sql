create table public.project_languages (
  project_id uuid not null references public.projects(id) on delete cascade,
  language_id uuid not null references public.languages(id) on delete cascade,
  primary key (project_id, language_id)
);

alter table public.project_languages enable row level security;

create policy "project_languages_public_read" on public.project_languages
  for select using (true);

create policy "project_languages_admin_all" on public.project_languages
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

grant select on public.project_languages to anon, authenticated;
grant insert, update, delete on public.project_languages to authenticated;
