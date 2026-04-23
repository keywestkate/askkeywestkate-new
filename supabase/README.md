# Supabase — AskKeyWestKate Client Portal

## Applying Migrations

Migrations are plain SQL files. Apply them in order via the Supabase Dashboard:

1. Open [supabase.com](https://supabase.com) → your project → **SQL Editor**
2. Click **New query**
3. Paste the contents of the migration file
4. Click **Run**
5. Verify no errors in the output panel

### Migrations

| File | Description |
|---|---|
| `migrations/0001_initial_schema.sql` | All 11 tables, RLS policies, indexes, and triggers |

---

## Table Reference

### `profiles`
Mirror of `auth.users`. Auto-created via trigger when a user signs up. Stores display name, email, phone, and onboarding state. The `user_type` field drives which sections of the portal the user sees.

### `buyer_preferences`
One row per user (unique on `user_id`). Stores what the buyer is looking for: islands, property types, price range, bedrooms, must-haves, timeline, financing type, and alert frequency. Drives listing alerts and search defaults.

### `seller_properties`
Properties a user is considering selling. Multiple rows per user allowed. Stores address, island, use, timeline, and estimated value. Triggers consultation request flow.

### `favorites`
Saved MLS listings. Stores a snapshot of `listing_data` (jsonb) at the time of favoriting so the card still renders even if the listing goes off-market. Unique on `(user_id, mls_listing_id)`.

### `saved_searches`
Named search presets with a jsonb `criteria` blob. Each search has its own `alert_frequency`. When new listings match, the alert pipeline reads this table.

### `newsletter_subscriptions`
Per-island market report subscriptions. Unique on `(user_id, island)`. When Kate publishes a new `island_market_reports` row, the subscription table determines who gets notified.

### `contracts`
Active and historical purchase/listing contracts. One row per transaction. Stores all key dates, price, Form Simplicity document ID, and a storage path for the signed PDF. Users cannot delete contracts — only Kate via service_role.

### `important_dates`
Calendar events derived from contract deadlines (inspection, financing, title, walkthrough, closing) plus custom entries. Links to both `contracts` and `profiles`. Tracks Google Calendar sync state.

### `vendor_directory`
Kate's curated list of inspectors, insurers, title companies, lenders, utilities, and contractors. Shown to clients post-contract. Read-only via the public API — managed by Kate via service_role or the admin panel.

### `island_market_reports`
Monthly market stats per island (median price, DOM, inventory months, sold count). Kate publishes these; clients read them. Drives the newsletter digest. Unique on `(island, month)`.

### `activity_log`
Append-only engagement log. Tracks signups, logins, favorites, contract events, email opens. Used by Kate's admin view to understand client activity. Entries are immutable.

---

## Security Notes

- RLS is **enabled and forced** on every table. Even the table owner cannot bypass it.
- All user-owned tables use `(select auth.uid()) = user_id` — the `select` wrapper means the expression is evaluated once per query, not once per row (significant performance difference on large tables).
- `vendor_directory` and `island_market_reports` have SELECT-only policies for authenticated users. There are no INSERT/UPDATE/DELETE policies — writes require the `service_role` key, which is never exposed to the browser.
- The `handle_new_user()` trigger reads `raw_user_meta_data` only to populate display fields (name, email). It is **never** used in RLS policies — `raw_user_meta_data` is user-editable and unsafe for authorization.
- The `service_role` key bypasses all RLS. It lives only in server-side env vars (`SUPABASE_SERVICE_ROLE_KEY`) and is never prefixed with `NEXT_PUBLIC_`.
