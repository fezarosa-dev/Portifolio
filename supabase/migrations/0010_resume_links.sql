create table public.resume_links (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  url text not null,
  position integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.resume_links enable row level security;

create policy "resume_links_public_read" on public.resume_links
  for select using (true);

create policy "resume_links_admin_all" on public.resume_links
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

grant select on public.resume_links to anon, authenticated;
grant insert, update, delete on public.resume_links to authenticated;
