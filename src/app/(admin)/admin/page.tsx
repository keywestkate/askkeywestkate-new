import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin — Overview" };

export default async function AdminPage() {
  const supabase = await createClient();

  // Parallel queries — stats + recent signups
  const [
    { count: totalClients },
    { count: buyers },
    { count: sellers },
    { count: newsletters },
    { data: recentSignups },
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .in("user_type", ["buyer", "both"]),
    supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .in("user_type", ["seller", "both"]),
    supabase
      .from("newsletter_subscriptions")
      .select("*", { count: "exact", head: true })
      .eq("island", "__newsletter__"),
    supabase
      .from("profiles")
      .select("id, full_name, email, user_type, onboarding_completed, created_at")
      .order("created_at", { ascending: false })
      .limit(10),
  ]);

  const stats = [
    { label: "Total clients", value: totalClients ?? 0 },
    { label: "Buyers", value: buyers ?? 0 },
    { label: "Sellers", value: sellers ?? 0 },
    { label: "Newsletter", value: newsletters ?? 0 },
  ];

  return (
    <div className="px-8 pt-36 pb-28 md:px-12 md:pt-44">
      <div className="mx-auto max-w-[1400px]">

        <div className="eyebrow text-ink-400">Admin</div>
        <h1 className="mt-4 font-display text-[clamp(2.4rem,6vw,5rem)] leading-[0.92] text-ink-950">
          Overview
        </h1>

        {/* Stats */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-lg border border-ink-200 bg-paper-warm px-6 py-5"
            >
              <div className="font-display text-[2.4rem] leading-none text-ink-950">
                {s.value}
              </div>
              <div className="mt-1 text-[0.72rem] uppercase tracking-[0.2em] text-ink-400">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/admin/clients"
            className="bg-ink-950 px-6 py-3 text-[0.78rem] uppercase tracking-[0.2em] text-paper transition-opacity hover:opacity-80"
          >
            View all clients &rarr;
          </Link>
        </div>

        {/* Recent signups */}
        <div className="mt-14">
          <div className="eyebrow mb-5 text-ink-400">Recent signups</div>
          <div className="overflow-x-auto">
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
                {(recentSignups ?? []).map((p) => (
                  <tr
                    key={p.id}
                    className="border-b border-ink-100 transition-colors hover:bg-paper-warm/60"
                  >
                    <td className="py-3.5 pr-6">
                      <Link
                        href={`/admin/clients/${p.id}`}
                        className="font-medium text-ink-950 hover:underline"
                      >
                        {p.full_name ?? "—"}
                      </Link>
                    </td>
                    <td className="py-3.5 pr-6 text-ink-600">{p.email ?? "—"}</td>
                    <td className="py-3.5 pr-6">
                      <span className="rounded-full bg-ink-100 px-2.5 py-0.5 text-[0.72rem] uppercase tracking-[0.16em] text-ink-600">
                        {p.user_type}
                      </span>
                    </td>
                    <td className="py-3.5 pr-6 text-ink-500">
                      {p.onboarding_completed ? "Yes" : "No"}
                    </td>
                    <td className="py-3.5 text-ink-400">
                      {new Date(p.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
                {(recentSignups ?? []).length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-ink-400">
                      No clients yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
