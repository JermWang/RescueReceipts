-- Public reads must go through the filtered views (public_receipts,
-- bounty_pool_stats), which expose only safe columns of approved/paid rows.
-- The direct table policy let anyone holding the anon key read every column
-- of approved/paid rows — including wallet_address and admin_notes.
drop policy if exists "anon_select_public" on public.adoption_submissions;

-- Defense in depth: client roles never read the base table directly.
-- The views keep working because they execute with the owner's privileges.
revoke select on public.adoption_submissions from anon;
revoke select on public.adoption_submissions from authenticated;

-- Pin the trigger function's search path (Supabase security lint 0011).
alter function public.set_updated_at() set search_path = '';
