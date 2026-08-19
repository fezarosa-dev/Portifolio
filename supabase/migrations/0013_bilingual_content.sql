alter table public.projects
  add column title_en text,
  add column summary_en text,
  add column content_md_en text;

alter table public.articles
  add column title_en text,
  add column summary_en text,
  add column content_md_en text;

alter table public.resume
  add column content_md_en text;

alter table public.resume_links
  add column label_en text;

alter table public.contact_links
  add column label_en text;
