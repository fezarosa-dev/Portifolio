create table public.articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  summary text not null default '',
  content_md text not null default '',
  visible boolean not null default true,
  position integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.articles enable row level security;

create policy "articles_public_read" on public.articles
  for select using (visible = true);

create policy "articles_admin_all" on public.articles
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

grant select on public.articles to anon, authenticated;
grant insert, update, delete on public.articles to authenticated;

insert into public.site_content (key, value) values ('artigos_ativo', 'true');
