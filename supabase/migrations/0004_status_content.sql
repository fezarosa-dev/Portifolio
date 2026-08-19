insert into public.site_content (key, value) values
  ('status_text', 'disponível para novos projetos — Itajubá, BR'),
  ('status_color', 'green')
on conflict (key) do nothing;
