-- Owner bootstrap was applied privately. The authorization role lives in server-managed app_metadata.
create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security invoker set search_path = ''
as $$
  select coalesce(
    (select auth.uid()) = _user_id
    and (select auth.jwt()) -> 'app_metadata' ->> 'portfolio_role' = _role::text,
    false
  );
$$;
revoke execute on function public.has_role(uuid, public.app_role) from public, anon;
grant execute on function public.has_role(uuid, public.app_role) to authenticated, service_role;

do $$
declare t text; p record;
begin
  foreach t in array array['projects','posts','experience','skills','certifications','services','leads']
  loop
    execute format('alter table public.%I enable row level security', t);
    for p in select policyname from pg_policies where schemaname='public'
      and tablename=t and cmd='ALL' and 'authenticated'=any(roles)
    loop
      execute format('drop policy %I on public.%I', p.policyname, t);
    end loop;
    execute format('create policy "Owner manages content" on public.%I for all to authenticated using ((select public.has_role(auth.uid(), ''admin''::public.app_role))) with check ((select public.has_role(auth.uid(), ''admin''::public.app_role)))', t);
  end loop;
end $$;