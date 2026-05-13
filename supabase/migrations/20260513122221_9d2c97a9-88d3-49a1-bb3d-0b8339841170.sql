
-- Roles enum + table + has_role security-definer function
create type public.app_role as enum ('admin', 'editor', 'user');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- Touch updated_at helper
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_touch before update on public.profiles
for each row execute function public.touch_updated_at();

-- Leads
create type public.lead_status as enum ('new', 'contacted', 'qualified', 'won', 'lost');
create type public.lead_budget as enum ('under_5k', '5k_15k', '15k_50k', '50k_plus', 'not_sure');

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  project_type text,
  budget public.lead_budget,
  message text not null,
  source text default 'website',
  status public.lead_status not null default 'new',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger leads_touch before update on public.leads
for each row execute function public.touch_updated_at();
create index leads_created_idx on public.leads (created_at desc);

-- Posts (Insights blog)
create type public.post_status as enum ('draft', 'published');

create table public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  cover_url text,
  body_md text not null default '',
  category text,
  tags text[] not null default '{}',
  author_id uuid references auth.users(id) on delete set null,
  status public.post_status not null default 'draft',
  published_at timestamptz,
  seo_title text,
  seo_description text,
  reading_minutes int default 5,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger posts_touch before update on public.posts
for each row execute function public.touch_updated_at();
create index posts_published_idx on public.posts (status, published_at desc);
create index posts_slug_idx on public.posts (slug);

-- RLS
alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.leads enable row level security;
alter table public.posts enable row level security;

-- profiles: users read/update own; admins read all
create policy "profiles self read" on public.profiles
for select to authenticated using (auth.uid() = id or public.has_role(auth.uid(), 'admin'));
create policy "profiles self update" on public.profiles
for update to authenticated using (auth.uid() = id);

-- user_roles: users read own; admins manage all
create policy "user_roles self read" on public.user_roles
for select to authenticated using (user_id = auth.uid() or public.has_role(auth.uid(), 'admin'));
create policy "user_roles admin manage" on public.user_roles
for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- leads: anyone can insert; only admins can read/update
create policy "leads public insert" on public.leads
for insert to anon, authenticated with check (true);
create policy "leads admin read" on public.leads
for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "leads admin update" on public.leads
for update to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "leads admin delete" on public.leads
for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

-- posts: published readable by anyone; admins/editors full access
create policy "posts public read published" on public.posts
for select to anon, authenticated using (status = 'published' or public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'editor'));
create policy "posts admin write" on public.posts
for all to authenticated using (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'editor'))
with check (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'editor'));
