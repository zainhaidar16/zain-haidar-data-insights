
-- Lock down SECURITY DEFINER helpers
revoke execute on function public.has_role(uuid, public.app_role) from public, anon, authenticated;
revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.touch_updated_at() from public, anon, authenticated;

-- Replace permissive lead insert policy with a constrained one
drop policy if exists "leads public insert" on public.leads;
create policy "leads public insert" on public.leads
for insert to anon, authenticated
with check (
  length(name) between 1 and 200
  and length(email) between 3 and 320
  and length(message) between 1 and 5000
  and email like '%_@_%.__%'
);
