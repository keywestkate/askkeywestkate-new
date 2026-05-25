-- ============================================================
-- Migration: 0003_drip_campaigns.sql
-- Project:   AskKeyWestKate.com — Drip Email Campaigns
-- Created:   2026-05-22
--
-- Tables: drip_sequences, drip_steps, drip_enrollments, drip_sends
-- ============================================================


-- ============================================================
-- drip_sequences — named email sequences Kate creates
-- ============================================================

create table public.drip_sequences (
  id          uuid        primary key default gen_random_uuid(),
  name        text        not null,
  description text,
  is_active   boolean     not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create trigger drip_sequences_updated_at
  before update on public.drip_sequences
  for each row execute function public.handle_updated_at();


-- ============================================================
-- drip_steps — individual emails within a sequence
-- delay_days: days after enrollment to send this step (0 = same day)
-- ============================================================

create table public.drip_steps (
  id          uuid        primary key default gen_random_uuid(),
  sequence_id uuid        not null references public.drip_sequences(id) on delete cascade,
  step_number integer     not null,
  delay_days  integer     not null default 0 check (delay_days >= 0),
  subject     text        not null,
  body_html   text        not null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  unique (sequence_id, step_number)
);

create index drip_steps_sequence_id_idx on public.drip_steps (sequence_id);

create trigger drip_steps_updated_at
  before update on public.drip_steps
  for each row execute function public.handle_updated_at();


-- ============================================================
-- drip_enrollments — a client enrolled in a sequence
-- ============================================================

create table public.drip_enrollments (
  id              uuid        primary key default gen_random_uuid(),
  user_id         uuid        not null references public.profiles(id) on delete cascade,
  sequence_id     uuid        not null references public.drip_sequences(id) on delete cascade,
  status          text        not null default 'active'
                              check (status in ('active','paused','completed','cancelled')),
  enrolled_at     timestamptz not null default now(),
  next_send_at    timestamptz,
  next_step_number integer    not null default 1,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  unique (user_id, sequence_id)
);

create index drip_enrollments_user_id_idx     on public.drip_enrollments (user_id);
create index drip_enrollments_status_idx      on public.drip_enrollments (status);
create index drip_enrollments_next_send_at_idx on public.drip_enrollments (next_send_at)
  where status = 'active';

create trigger drip_enrollments_updated_at
  before update on public.drip_enrollments
  for each row execute function public.handle_updated_at();


-- ============================================================
-- drip_sends — log of every email sent
-- ============================================================

create table public.drip_sends (
  id            uuid        primary key default gen_random_uuid(),
  enrollment_id uuid        not null references public.drip_enrollments(id) on delete cascade,
  step_id       uuid        not null references public.drip_steps(id) on delete cascade,
  user_id       uuid        not null references public.profiles(id) on delete cascade,
  sent_at       timestamptz not null default now(),
  resend_id     text,
  status        text        not null default 'sent'
                            check (status in ('sent','failed'))
);

create index drip_sends_enrollment_id_idx on public.drip_sends (enrollment_id);
create index drip_sends_user_id_idx       on public.drip_sends (user_id);


-- ============================================================
-- RLS — Kate's admin uses service_role; no authenticated policies
-- needed (these tables are admin-only)
-- ============================================================

alter table public.drip_sequences  enable row level security;
alter table public.drip_steps      enable row level security;
alter table public.drip_enrollments enable row level security;
alter table public.drip_sends      enable row level security;

alter table public.drip_sequences  force row level security;
alter table public.drip_steps      force row level security;
alter table public.drip_enrollments force row level security;
alter table public.drip_sends      force row level security;
