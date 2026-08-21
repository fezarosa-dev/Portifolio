alter table public.messages add column ip text;

create or replace function public.count_recent_messages_by_ip(check_ip text, window_minutes int)
returns int
language sql
security definer
set search_path = public
as $$
  select count(*)::int
  from public.messages
  where ip = check_ip
    and created_at > now() - (window_minutes || ' minutes')::interval
$$;

grant execute on function public.count_recent_messages_by_ip(text, int) to anon, authenticated;
