import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin — Clients" };

const USER_TYPE_OPTIONS = [
  { value: "", label: "All" },
  { value: "buyer", label: "Buyers" },
  { value: "seller", label: "Sellers" },
  { value: "both", label: "Both" },
  { value: "browsing", label: "Browsing" },
];

const ONBOARDED_OPTIONS = [
  { value: "", label: "All" },
  { value: "true", label: "Onboarded" },
  { value: "false", label: "Not yet" },
];

interface PageProps {
  searchParams: Promise<{ type?: string; onboarded?: string; q?: string }>;
}

export default async function AdminClientsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const typeFilter = params.type ?? "";
  const onboardedFilter = params.onboarded ?? "";
  const query = params.q ?? "";

  const supabase = await createClient();

  let dbQuery = supabase
    .from("profiles")
    .select("id, full_name, email, phone, user_type, onboarding_completed, created_at")
    .order("created_at", { ascending: false });

  if (typeFilter) {
    dbQuery = dbQuery.eq("user_type", typeFilter);
  }
  if (onboardedFilter === "true") {
    dbQuery = dbQuery.eq("onboarding_completed", true);
  } else if (onboardedFilter === "false") {
    dbQuery = dbQuery.eq("onboarding_completed", false);
  }
  if (query) {
    dbQuery = dbQuery.or(
      `full_name.ilike.%${query}%,email.ilike.%${query}%`
    );
  }

  const { data: clients } = await dbQuery;

  function filterUrl(overrides: Record<string, string>) {
    const p = new URLSearchParams({
      ...(typeFilter && { type: typeFilter }),
      ...(onboardedFilter && { onboarded: onboardedFilter }),
      ...(query && { q: query }),
      ...overrides,
    });
    // Remove empty values
    Array.from(p.keys()).forEach((k) => { if (!p.get(k)) p.delete(k); });
    const str = p.toString();
    return `/admin/clients${str ? `?${str}` : ""}`;
  }

  return (
    <div className="px-8 pt-36 pb-28 md:px-12 md:pt-44">
      <div className="mx-auto max-w-[1400px]">

        <div className="eyebrow text-ink-400">Admin</div>
        <h1 className="mt-4 font-display text-[clamp(2.4rem,6vw,5rem)] leading-[0.92] text-ink-950">
          Clients
          <span className="ml-4 font-sans text-xl font-normal text-ink-400">
            {clients?.length ?? 0}
          </span>
        </h1>

        {/* Filters */}
        <div className="mt-8 flex flex-wrap items-center gap-3">

          {/* Search */}
          <form method="GET" action="/admin/clients" className="flex items-center">
            {typeFilter && <input type="hidden" name="type" value={typeFilter} />}
            {onboardedFilter && <input type="hidden" name="onboarded" value={onboardedFilter} />}
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Search name or email…"
              className="h-9 w-56 rounded-lg border border-ink-200 bg-paper px-3 text-sm text-ink-950 placeholder:text-ink-300 focus:border-ink-950 focus:outline-none"
            />
          </form>

          {/* Type filter */}
          <div className="flex items-center gap-1.5">
            {USER_TYPE_OPTIONS.map((opt) => (
              <Link
                key={opt.value}
                href={filterUrl({ type: opt.value })}
                className={`rounded-full px-3 py-1 text-[0.72rem] uppercase tracking-[0.16em] transition-colors ${
                  typeFilter === opt.value
                    ? "bg-ink-950 text-paper"
                    : "bg-ink-100 text-ink-600 hover:bg-ink-200"
                }`}
              >
                {opt.label}
              </Link>
            ))}
          </div>

          {/* Onboarded filter */}
          <div className="flex items-center gap-1.5">
            {ONBOARDED_OPTIONS.map((opt) => (
              <Link
                key={opt.value}
                href={filterUrl({ onboarded: opt.value })}
                className={`rounded-full px-3 py-1 text-[0.72rem] uppercase tracking-[0.16em] transition-colors ${
                  onboardedFilter === opt.value
                    ? "bg-ink-950 text-paper"
                    : "bg-ink-100 text-ink-600 hover:bg-ink-200"
                }`}
              >
                {opt.label}
              </Link>
            ))}
          </div>

        </div>

        {/* Table */}
        <div className="mt-8 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink-200 text-left">
                <th className="pb-3 pr-6 text-[0.72rem] uppercase tracking-[0.2em] font-normal text-ink-400">
                  Name
                </th>
                <th className="pb-3 pr-6 text-[0.72rem] uppercase tracking-[0.2em] font-normal text-ink-400">
                  Email
                </th>
                <th className="pb-3 pr-6 text-[0.72rem] uppercase tracking-[0.2em] font-normal text-ink-400">
                  Phone
                </th>
                <th className="pb-3 pr-6 text-[0.72rem] uppercase tracking-[0.2em] font-normal text-ink-400">
                  Type
                </th>
                <th className="pb-3 pr-6 text-[0.72rem] uppercase tracking-[0.2em] font-normal text-ink-400">
                  Onboarded
                </th>
                <th className="pb-3 text-[0.72rem] uppercase tracking-[0.2em] font-normal text-ink-400">
                  Joined
                </th>
              </tr>
            </thead>
            <tbody>
              {(clients ?? []).map((c) => (
                <tr
                  key={c.id}
                  className="border-b border-ink-100 transition-colors hover:bg-paper-warm/60"
                >
                  <td className="py-3.5 pr-6">
                    <Link
                      href={`/admin/clients/${c.id}`}
                      className="font-medium text-ink-950 hover:underline"
                    >
                      {c.full_name ?? "—"}
                    </Link>
                  </td>
                  <td className="py-3.5 pr-6 text-ink-600">{c.email ?? "—"}</td>
                  <td className="py-3.5 pr-6 text-ink-500">{c.phone ?? "—"}</td>
                  <td className="py-3.5 pr-6">
                    <span className="rounded-full bg-ink-100 px-2.5 py-0.5 text-[0.72rem] uppercase tracking-[0.16em] text-ink-600">
                      {c.user_type}
                    </span>
                  </td>
                  <td className="py-3.5 pr-6 text-ink-500">
                    {c.onboarding_completed ? "Yes" : "No"}
                  </td>
                  <td className="py-3.5 text-ink-400">
                    {new Date(c.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
              {(clients ?? []).length === 0 && (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-ink-400">
                    No clients match these filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
