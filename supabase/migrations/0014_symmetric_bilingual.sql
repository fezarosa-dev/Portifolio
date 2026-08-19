alter table public.projects
  alter column title drop not null,
  alter column summary drop not null,
  alter column content_md drop not null;

alter table public.articles
  alter column title drop not null,
  alter column summary drop not null,
  alter column content_md drop not null;

alter table public.resume
  alter column content_md drop not null;

alter table public.resume_links
  alter column label drop not null;

alter table public.contact_links
  alter column label drop not null;
