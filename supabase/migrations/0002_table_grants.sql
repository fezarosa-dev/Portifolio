-- Task 8's migration created RLS policies but never granted the underlying
-- table privileges to the anon/authenticated roles, so every SSR read fails
-- with "permission denied for table X" (Postgres 42501) regardless of RLS.
-- Grants below mirror the existing RLS policies in 0001_init.sql.

grant select on public.projects to anon, authenticated;
grant insert, update, delete on public.projects to authenticated;

grant select on public.site_content to anon, authenticated;
grant insert, update, delete on public.site_content to authenticated;

grant select on public.resume to anon, authenticated;
grant insert, update, delete on public.resume to authenticated;

grant insert on public.messages to anon, authenticated;
grant select, update, delete on public.messages to authenticated;
