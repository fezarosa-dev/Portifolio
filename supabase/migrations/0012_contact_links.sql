create table public.contact_links (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  url text not null,
  position integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.contact_links enable row level security;

create policy "contact_links_public_read" on public.contact_links
  for select using (true);

create policy "contact_links_admin_all" on public.contact_links
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

grant select on public.contact_links to anon, authenticated;
grant insert, update, delete on public.contact_links to authenticated;
