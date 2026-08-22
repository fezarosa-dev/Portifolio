create table public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  url text,
  created_at timestamptz not null default now()
);

alter table public.companies enable row level security;

create policy "companies_public_read" on public.companies
  for select using (true);

create policy "companies_admin_all" on public.companies
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

grant select on public.companies to anon, authenticated;
grant insert, update, delete on public.companies to authenticated;

alter table public.projects
  add column company_id uuid references public.companies(id) on delete set null;
