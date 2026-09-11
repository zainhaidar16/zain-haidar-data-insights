create table if not exists public.site_settings (
key text primary key, value jsonb not null, updated_at timestamptz not null default now()
);
alter table public.site_settings enable row level security;
grant select on public.site_settings to anon, authenticated;
grant insert,update,delete on public.site_settings to authenticated;
create policy "Public portfolio settings" on public.site_settings for select to anon,authenticated using (key='portfolio');
create policy "Owner manages portfolio settings" on public.site_settings for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
insert into public.site_settings(key,value) values ('portfolio','{"name":"Zain Haidar","role":"Data Analyst & Power BI Specialist","location":"Vienna, Austria","email":"zainhaider72@gmail.com","linkedin":"https://www.linkedin.com/in/zain-haidar","github":"https://github.com/zainhaidar16","resume":"/Zain%20Haidar%20Resume.pdf","calendar":"https://calendly.com/zainhaider72/30min","availability":"Open to employment & freelance projects","portrait":"/zain.jpg","headline":"Find the signal.","headline_accent":"Build what matters.","intro":"Data analysis, business intelligence, and reporting systems. I turn complex information into a clear view of what comes next.","about":"I’m Zain, a data analyst based in Vienna. I bring together business intelligence, SQL, Python, and software engineering to prepare data, investigate patterns, and build useful reporting workflows."}'::jsonb) on conflict(key) do nothing;
