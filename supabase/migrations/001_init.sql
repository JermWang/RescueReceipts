-- RescueReceipts initial schema
create extension if not exists "pgcrypto";

create table if not exists public.adoption_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  x_handle text not null,
  x_post_url text not null unique,
  wallet_address text not null,
  pet_name text not null,
  pet_type text not null,
  adoption_date date not null,
  shelter_name text,
  location text,
  story text,
  status text not null default 'pending' check (status in ('pending','approved','denied','paid')),
  approved_amount_sol numeric,
  transaction_signature text,
  admin_notes text,
  reviewed_at timestamptz,
  paid_at timestamptz,
  model_variant text,
  model_color text,
  featured boolean not null default false,
  public_notes text
);

create index if not exists adoption_submissions_status_idx on public.adoption_submissions (status);
create index if not exists adoption_submissions_created_at_idx on public.adoption_submissions (created_at desc);
create index if not exists adoption_submissions_x_post_url_idx on public.adoption_submissions (x_post_url);
create index if not exists adoption_submissions_wallet_idx on public.adoption_submissions (wallet_address);
create index if not exists adoption_submissions_featured_idx on public.adoption_submissions (featured);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_set_updated_at on public.adoption_submissions;
create trigger trg_set_updated_at
before update on public.adoption_submissions
for each row execute function public.set_updated_at();

-- Row Level Security
alter table public.adoption_submissions enable row level security;

-- Public can insert as pending only
drop policy if exists "anon_insert_pending" on public.adoption_submissions;
create policy "anon_insert_pending"
on public.adoption_submissions
for insert
to anon
with check (status = 'pending');

-- Public can select only approved/paid rows (and only safe columns via a view)
drop policy if exists "anon_select_public" on public.adoption_submissions;
create policy "anon_select_public"
on public.adoption_submissions
for select
to anon
using (status in ('approved','paid'));

-- Public ledger view (no internal fields)
create or replace view public.public_receipts as
  select
    id, created_at, x_handle, x_post_url, pet_name, pet_type, adoption_date,
    shelter_name, location, status, approved_amount_sol, transaction_signature,
    reviewed_at, paid_at, model_variant, model_color, featured, public_notes
  from public.adoption_submissions
  where status in ('approved','paid');

grant select on public.public_receipts to anon;

-- Aggregate pool stats view
create or replace view public.bounty_pool_stats as
  select
    coalesce(sum(approved_amount_sol) filter (where status = 'paid'), 0)::numeric as total_paid_sol,
    coalesce(sum(approved_amount_sol) filter (where status = 'approved'), 0)::numeric as total_approved_sol,
    count(*) filter (where status = 'pending')::int as pending_count,
    count(*) filter (where status = 'approved')::int as approved_count,
    count(*) filter (where status = 'paid')::int as paid_count,
    count(*) filter (where featured)::int as featured_count
  from public.adoption_submissions;

grant select on public.bounty_pool_stats to anon;
