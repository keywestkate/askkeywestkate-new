-- ============================================================
-- Migration: 0002_admin_access.sql
-- Project:   AskKeyWestKate.com — Client Portal
-- Created:   2026-04-23
--
-- Adds:
--   - public.is_admin() helper function
--   - Admin SELECT policies on all user-data tables
--   - Admin UPDATE on profiles
--   - admin_notes column on profiles (Kate-only)
--   - protect_admin_notes trigger
-- ============================================================


-- ============================================================
-- SECTION 1 — is_admin() helper
--
-- Checks whether the currently authenticated user is Kate.
-- security definer + set search_path = '' prevents privilege
-- escalation and search_path injection.
--
-- Policies use (select public.is_admin()) — the SELECT wrapper
-- ensures this is evaluated once per query, not once per row.
-- ============================================================

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from auth.users
    where id = auth.uid()
      and lower(email) = 'kate@keywestkate.com'
  );
$$;


-- ============================================================
-- SECTION 2 — Admin SELECT policies on all user-data tables
-- ============================================================

-- ---------- profiles ----------
create policy "profiles: admin can select all"
  on public.profiles for select
  to authenticated
  using ((select public.is_admin()));

-- ---------- buyer_preferences ----------
create policy "buyer_preferences: admin can select all"
  on public.buyer_preferences for select
  to authenticated
  using ((select public.is_admin()));

-- ---------- seller_properties ----------
create policy "seller_properties: admin can select all"
  on public.seller_properties for select
  to authenticated
  using ((select public.is_admin()));

-- ---------- favorites ----------
create policy "favorites: admin can select all"
  on public.favorites for select
  to authenticated
  using ((select public.is_admin()));

-- ---------- saved_searches ----------
create policy "saved_searches: admin can select all"
  on public.saved_searches for select
  to authenticated
  using ((select public.is_admin()));

-- ---------- newsletter_subscriptions ----------
create policy "newsletter_subscriptions: admin can select all"
  on public.newsletter_subscriptions for select
  to authenticated
  using ((select public.is_admin()));

-- ---------- contracts ----------
create policy "contracts: admin can select all"
  on public.contracts for select
  to authenticated
  using ((select public.is_admin()));

-- ---------- important_dates ----------
create policy "important_dates: admin can select all"
  on public.important_dates for select
  to authenticated
  using ((select public.is_admin()));

-- ---------- activity_log ----------
create policy "activity_log: admin can select all"
  on public.activity_log for select
  to authenticated
  using ((select public.is_admin()));


-- ============================================================
-- SECTION 3 — Admin UPDATE on profiles
-- Kate can edit any profile (e.g. correct a phone number,
-- set user_type manually).  The admin_notes guard is handled
-- separately by the trigger below.
-- ============================================================

create policy "profiles: admin can update all"
  on public.profiles for update
  to authenticated
  using  ((select public.is_admin()))
  with check ((select public.is_admin()));


-- ============================================================
-- SECTION 4 — admin_notes column on profiles
-- Visible only to Kate. The trigger below prevents any
-- non-admin from writing to this column.
-- ============================================================

alter table public.profiles
  add column admin_notes text;


-- ============================================================
-- SECTION 5 — protect_admin_notes trigger
--
-- Fires BEFORE UPDATE on profiles.
-- If the calling user is NOT the admin AND they are trying to
-- change admin_notes, raise an exception and abort the update.
-- Runs as security definer so it can call is_admin() safely.
-- ============================================================

create or replace function public.protect_admin_notes()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  -- Non-admins must not be able to modify admin_notes
  if not (select public.is_admin()) then
    if new.admin_notes is distinct from old.admin_notes then
      raise exception 'permission denied: admin_notes is read-only for non-admin users';
    end if;
  end if;
  return new;
end;
$$;

create trigger profiles_protect_admin_notes
  before update on public.profiles
  for each row execute function public.protect_admin_notes();
