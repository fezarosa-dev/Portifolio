insert into public.site_content (key, value) values
  ('link_github', 'https://github.com/fezarosa-dev'),
  ('link_linkedin', 'https://www.linkedin.com/in/felipe-zanoni/')
on conflict (key) do nothing;
