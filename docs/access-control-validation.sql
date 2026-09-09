begin;
select set_config('portfolio.test_lead',gen_random_uuid()::text,true);
select set_config('portfolio.owner_id',(select id::text from auth.users where raw_app_meta_data->>'portfolio_role'='admin'),true);
set local role anon;
insert into public.leads(id,name,email,message,project_type,budget,status)
values(current_setting('portfolio.test_lead')::uuid,'Internal validation','validation@example.invalid','Transactional contact validation; rolled back.','Freelance project','under_5k','new');
do $$ begin
 if exists(select 1 from public.leads where id=current_setting('portfolio.test_lead')::uuid) then raise exception 'Anonymous lead read exposed';end if;
end $$;
reset role;
select set_config('request.jwt.claims',jsonb_build_object('sub',gen_random_uuid(),'role','authenticated','app_metadata','{}'::jsonb,'user_metadata','{"portfolio_role":"admin"}'::jsonb)::text,true);
set local role authenticated;
do $$ begin
 if public.has_role(auth.uid(),'admin') then raise exception 'Editable metadata granted admin';end if;
 if exists(select 1 from public.leads) then raise exception 'Ordinary account can read leads';end if;
 update public.leads set status='contacted' where id=current_setting('portfolio.test_lead')::uuid;
 if found then raise exception 'Ordinary account can update leads';end if;
 begin
  insert into public.projects(slug,title) values ('internal-rls-test','Internal access test');
  raise exception 'Ordinary account can insert content';
 exception when insufficient_privilege then null;
 end;
end $$;
reset role;
select set_config('request.jwt.claims',jsonb_build_object('sub',current_setting('portfolio.owner_id'),'role','authenticated','app_metadata','{"portfolio_role":"admin"}'::jsonb)::text,true);
set local role authenticated;
do $$ begin
 if not public.has_role(auth.uid(),'admin') then raise exception 'Owner denied';end if;
 if not exists(select 1 from public.leads where id=current_setting('portfolio.test_lead')::uuid) then raise exception 'Owner cannot read enquiries';end if;
 update public.leads set status='contacted' where id=current_setting('portfolio.test_lead')::uuid;
 if not found then raise exception 'Owner cannot update enquiries';end if;
end $$;
reset role;
rollback;
select 'Passed: public insert, private read, non-owner denial, editable-metadata denial, owner read/update. Test data rolled back.' as result;