alter table public.companies add column name_en text;

insert into public.companies (name, name_en) values
  ('Freelancer', 'Freelancer'),
  ('Projeto pessoal', 'Personal project');
