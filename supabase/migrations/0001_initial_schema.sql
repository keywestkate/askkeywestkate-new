-- ============================================================
-- Migration: 0001_initial_schema.sql
-- Project:   AskKeyWestKate.com — Client Portal
-- Created:   2026-04-22
--
-- Tables: profiles, buyer_preferences, seller_properties,
--         favorites, saved_searches, newsletter_subscriptions,
--         contracts, important_dates, vendor_directory,
--         island_market_reports, activity_log
--
-- Apply via: Supabase Dashboard → SQL Editor → paste & run
-- ============================================================


-- ============================================================
-- SECTION 0 — Shared trigger function: updated_at
-- ============================================================

create or replace function public.handle_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;


-- ============================================================
-- SECTION 1 — profiles
-- Mirror of auth.users, auto-created via trigger on signup.
-- ============================================================

create table public.profiles (
  id                   uuid        primary key references auth.users(id) on delete cascade,
  full_name            text,
  email                text,
  phone                text,
  user_type            text        not null default 'browsing'
                                   check (user_type in ('buyer','seller','both','browsing')),
  onboarding_completed boolean     not null default false,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.handle_updated_at();

-- Auto-create a profile row whenever a new user signs up via Supabase Auth.
-- Reads full_name and email from the auth.users row.
--
-- SECURITY NOTE: raw_user_meta_data is user-editable — it is used here only
-- to pre-populate display fields, never for authorization logic or RLS policies.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


-- ============================================================
-- SECTION 2 — buyer_preferences
-- One row per user (unique constraint on user_id).
-- ============================================================

create table public.buyer_preferences (
  id                  uuid        primary key default gen_random_uuid(),
  user_id             uuid        not null unique references public.profiles(id) on delete cascade,
  islands             text[],
  property_types      text[],
  price_min           integer,
  price_max           integer,
  bedrooms_min        integer,
  bathrooms_min       numeric(3,1),
  must_haves          text[],
  timeline            text        check (timeline in ('0-3mo','3-6mo','6-12mo','just_looking')),
  financing           text        check (financing in ('cash','conventional','va','fha','needs_lender')),
  purchase_purpose    text        check (purchase_purpose in ('primary','second_home','investment')),
  is_first_time_buyer boolean,
  alert_frequency     text        not null default 'weekly'
                                  check (alert_frequency in ('instant','daily','weekly','biweekly','none')),
  notes               text,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create index buyer_preferences_user_id_idx
  on public.buyer_preferences (user_id);

create trigger buyer_preferences_updated_at
  before update on public.buyer_preferences
  for each row execute function public.handle_updated_at();


-- ============================================================
-- SECTION 3 — seller_properties
-- ============================================================

create table public.seller_properties (
  id                    uuid        primary key default gen_random_uuid(),
  user_id               uuid        not null references public.profiles(id) on delete cascade,
  address               text,
  island                text,
  current_use           text        check (current_use in ('primary','vacation','rental','mixed')),
  timeline_to_sell      text        check (timeline_to_sell in ('0-3mo','3-6mo','6-12mo','exploring')),
  estimated_value_cents bigint,
  reason_for_selling    text,
  needs_consultation    boolean     not null default true,
  notes                 text,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

create index seller_properties_user_id_idx
  on public.seller_properties (user_id);

create trigger seller_properties_updated_at
  before update on public.seller_properties
  for each row execute function public.handle_updated_at();


-- ============================================================
-- SECTION 4 — favorites
-- ============================================================

create table public.favorites (
  id             uuid        primary key default gen_random_uuid(),
  user_id        uuid        not null references public.profiles(id) on delete cascade,
  mls_listing_id text        not null,
  listing_data   jsonb,
  notes          text,
  created_at     timestamptz not null default now(),
  unique (user_id, mls_listing_id)
);

create index favorites_user_id_idx
  on public.favorites (user_id);
create index favorites_mls_listing_id_idx
  on public.favorites (mls_listing_id);


-- ============================================================
-- SECTION 5 — saved_searches
-- ============================================================

create table public.saved_searches (
  id              uuid        primary key default gen_random_uuid(),
  user_id         uuid        not null references public.profiles(id) on delete cascade,
  name            text        not null,
  criteria        jsonb       not null,
  alert_frequency text        not null default 'weekly'
                              check (alert_frequency in ('instant','daily','weekly','biweekly','none')),
  last_alerted_at timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index saved_searches_user_id_idx
  on public.saved_searches (user_id);

create trigger saved_searches_updated_at
  before update on public.saved_searches
  for each row execute function public.handle_updated_at();


-- ============================================================
-- SECTION 6 — newsletter_subscriptions
-- ============================================================

create table public.newsletter_subscriptions (
  id            uuid        primary key default gen_random_uuid(),
  user_id       uuid        not null references public.profiles(id) on delete cascade,
  island        text        not null,
  frequency     text        not null default 'monthly'
                            check (frequency in ('weekly','monthly')),
  subscribed    boolean     not null default true,
  subscribed_at timestamptz not null default now(),
  unique (user_id, island)
);

create index newsletter_subscriptions_user_id_idx
  on public.newsletter_subscriptions (user_id);
create index newsletter_subscriptions_island_idx
  on public.newsletter_subscriptions (island);


-- ============================================================
-- SECTION 7 — contracts
-- ============================================================

create table public.contracts (
  id                          uuid        primary key default gen_random_uuid(),
  user_id                     uuid        not null references public.profiles(id) on delete cascade,
  property_address            text,
  mls_listing_id              text,
  status                      text        not null default 'under_contract'
                                          check (status in ('under_contract','pending','closed','cancelled')),
  contract_type               text        check (contract_type in ('purchase','listing')),
  effective_date              date,
  inspection_deadline         date,
  financing_deadline          date,
  title_deadline              date,
  walkthrough_date            date,
  closing_date                date,
  closing_time                text,
  closing_location            text,
  purchase_price_cents        bigint,
  form_simplicity_document_id text,
  signed_contract_url         text,
  notes                       text,
  created_at                  timestamptz not null default now(),
  updated_at                  timestamptz not null default now()
);

create index contracts_user_id_idx
  on public.contracts (user_id);
create index contracts_mls_listing_id_idx
  on public.contracts (mls_listing_id);

create trigger contracts_updated_at
  before update on public.contracts
  for each row execute function public.handle_updated_at();


-- ============================================================
-- SECTION 8 — important_dates
-- Calendar events derived from contract deadlines.
-- ============================================================

create table public.important_dates (
  id                        uuid        primary key default gen_random_uuid(),
  contract_id               uuid        not null references public.contracts(id) on delete cascade,
  user_id                   uuid        not null references public.profiles(id) on delete cascade,
  event_type                text        not null
                                        check (event_type in ('inspection','financing','title','walkthrough','closing','custom')),
  event_date                date        not null,
  event_time                text,
  title                     text        not null,
  description               text,
  synced_to_google_calendar boolean     not null default false,
  google_event_id           text,
  created_at                timestamptz not null default now(),
  updated_at                timestamptz not null default now()
);

create index important_dates_contract_id_idx
  on public.important_dates (contract_id);
create index important_dates_user_id_idx
  on public.important_dates (user_id);
create index important_dates_event_date_idx
  on public.important_dates (event_date);

create trigger important_dates_updated_at
  before update on public.important_dates
  for each row execute function public.handle_updated_at();


-- ============================================================
-- SECTION 9 — vendor_directory
-- Kate-managed. Read-only for authenticated users via RLS.
-- INSERT/UPDATE/DELETE only via service_role (admin panel).
-- ============================================================

create table public.vendor_directory (
  id              uuid        primary key default gen_random_uuid(),
  category        text        not null
                              check (category in ('inspector','insurance','title','lender','utility','contractor','other')),
  subcategory     text,
  name            text        not null,
  contact_name    text,
  phone           text,
  email           text,
  website         text,
  address         text,
  island_coverage text[],
  notes           text,
  is_active       boolean     not null default true,
  display_order   integer     not null default 0,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index vendor_directory_category_idx
  on public.vendor_directory (category);
-- Partial index — only active vendors are ever queried in the UI
create index vendor_directory_active_idx
  on public.vendor_directory (display_order)
  where is_active = true;

create trigger vendor_directory_updated_at
  before update on public.vendor_directory
  for each row execute function public.handle_updated_at();


-- ============================================================
-- SECTION 10 — island_market_reports
-- Kate-managed. Read-only for all authenticated users.
-- One row per island per month (unique constraint).
-- ============================================================

create table public.island_market_reports (
  id                 uuid        primary key default gen_random_uuid(),
  island             text        not null,
  month              date        not null,
  active_listings    integer,
  sold_count         integer,
  median_price_cents bigint,
  median_dom         integer,
  inventory_months   numeric(4,1),
  summary_markdown   text,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now(),
  unique (island, month)
);

create index island_market_reports_island_idx
  on public.island_market_reports (island);
create index island_market_reports_month_idx
  on public.island_market_reports (month desc);

create trigger island_market_reports_updated_at
  before update on public.island_market_reports
  for each row execute function public.handle_updated_at();


-- ============================================================
-- SECTION 11 — activity_log
-- Append-only. Users can read/insert their own rows.
-- No update or delete — Kate's admin uses service_role.
-- ============================================================

create table public.activity_log (
  id         uuid        primary key default gen_random_uuid(),
  user_id    uuid        not null references public.profiles(id) on delete cascade,
  event_type text        not null,
  metadata   jsonb,
  created_at timestamptz not null default now()
);

create index activity_log_user_id_idx
  on public.activity_log (user_id);
create index activity_log_event_type_idx
  on public.activity_log (event_type);
create index activity_log_created_at_idx
  on public.activity_log (created_at desc);


-- ============================================================
-- SECTION 12 — Enable & force RLS on all tables
-- ============================================================

alter table public.profiles                 enable row level security;
alter table public.buyer_preferences        enable row level security;
alter table public.seller_properties        enable row level security;
alter table public.favorites                enable row level security;
alter table public.saved_searches           enable row level security;
alter table public.newsletter_subscriptions enable row level security;
alter table public.contracts                enable row level security;
alter table public.important_dates          enable row level security;
alter table public.vendor_directory         enable row level security;
alter table public.island_market_reports    enable row level security;
alter table public.activity_log             enable row level security;

-- force row level security prevents table owners from bypassing policies
alter table public.profiles                 force row level security;
alter table public.buyer_preferences        force row level security;
alter table public.seller_properties        force row level security;
alter table public.favorites                force row level security;
alter table public.saved_searches           force row level security;
alter table public.newsletter_subscriptions force row level security;
alter table public.contracts                force row level security;
alter table public.important_dates          force row level security;
alter table public.vendor_directory         force row level security;
alter table public.island_market_reports    force row level security;
alter table public.activity_log             force row level security;


-- ============================================================
-- SECTION 13 — RLS Policies
--
-- Pattern: (select auth.uid()) — wrapping in SELECT means the
-- expression is evaluated once per query, not once per row.
-- 5-10x faster on large tables per Supabase best practices.
--
-- Separate policies per operation so each is auditable.
-- UPDATE policies include both USING and WITH CHECK so the
-- row must pass the check before AND after the update.
-- ============================================================

-- ---------- profiles ----------
-- INSERT is handled by the handle_new_user() trigger (runs as
-- security definer / service_role), so no INSERT policy needed
-- for the authenticated role.

create policy "profiles: owner can select"
  on public.profiles for select
  to authenticated
  using ((select auth.uid()) = id);

create policy "profiles: owner can update"
  on public.profiles for update
  to authenticated
  using  ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);


-- ---------- buyer_preferences ----------

create policy "buyer_preferences: owner can select"
  on public.buyer_preferences for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "buyer_preferences: owner can insert"
  on public.buyer_preferences for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "buyer_preferences: owner can update"
  on public.buyer_preferences for update
  to authenticated
  using  ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "buyer_preferences: owner can delete"
  on public.buyer_preferences for delete
  to authenticated
  using ((select auth.uid()) = user_id);


-- ---------- seller_properties ----------

create policy "seller_properties: owner can select"
  on public.seller_properties for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "seller_properties: owner can insert"
  on public.seller_properties for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "seller_properties: owner can update"
  on public.seller_properties for update
  to authenticated
  using  ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "seller_properties: owner can delete"
  on public.seller_properties for delete
  to authenticated
  using ((select auth.uid()) = user_id);


-- ---------- favorites ----------

create policy "favorites: owner can select"
  on public.favorites for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "favorites: owner can insert"
  on public.favorites for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "favorites: owner can update"
  on public.favorites for update
  to authenticated
  using  ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "favorites: owner can delete"
  on public.favorites for delete
  to authenticated
  using ((select auth.uid()) = user_id);


-- ---------- saved_searches ----------

create policy "saved_searches: owner can select"
  on public.saved_searches for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "saved_searches: owner can insert"
  on public.saved_searches for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "saved_searches: owner can update"
  on public.saved_searches for update
  to authenticated
  using  ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "saved_searches: owner can delete"
  on public.saved_searches for delete
  to authenticated
  using ((select auth.uid()) = user_id);


-- ---------- newsletter_subscriptions ----------

create policy "newsletter_subscriptions: owner can select"
  on public.newsletter_subscriptions for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "newsletter_subscriptions: owner can insert"
  on public.newsletter_subscriptions for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "newsletter_subscriptions: owner can update"
  on public.newsletter_subscriptions for update
  to authenticated
  using  ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "newsletter_subscriptions: owner can delete"
  on public.newsletter_subscriptions for delete
  to authenticated
  using ((select auth.uid()) = user_id);


-- ---------- contracts ----------
-- No DELETE policy for authenticated — contracts are not user-deletable.
-- Kate manages deletions via service_role in the admin panel.

create policy "contracts: owner can select"
  on public.contracts for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "contracts: owner can insert"
  on public.contracts for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "contracts: owner can update"
  on public.contracts for update
  to authenticated
  using  ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);


-- ---------- important_dates ----------

create policy "important_dates: owner can select"
  on public.important_dates for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "important_dates: owner can insert"
  on public.important_dates for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "important_dates: owner can update"
  on public.important_dates for update
  to authenticated
  using  ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "important_dates: owner can delete"
  on public.important_dates for delete
  to authenticated
  using ((select auth.uid()) = user_id);


-- ---------- vendor_directory — read-only for authenticated ----------
-- No INSERT/UPDATE/DELETE policies. Kate manages this via service_role.

create policy "vendor_directory: authenticated users can read"
  on public.vendor_directory for select
  to authenticated
  using (true);


-- ---------- island_market_reports — read-only for authenticated ----------

create policy "island_market_reports: authenticated users can read"
  on public.island_market_reports for select
  to authenticated
  using (true);


-- ---------- activity_log — append-only for owner ----------
-- No UPDATE or DELETE. Log entries are immutable once written.

create policy "activity_log: owner can select"
  on public.activity_log for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "activity_log: owner can insert"
  on public.activity_log for insert
  to authenticated
  with check ((select auth.uid()) = user_id);
