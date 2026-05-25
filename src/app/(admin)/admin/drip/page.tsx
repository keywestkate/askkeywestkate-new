import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import type { Metadata } from "next";
import { createSequence } from "./actions";

export const metadata: Metadata = { title: "Admin — Drip Campaigns" };

export default async function DripPage() {
  const supabase = await createClient();

  const { data: sequences } = await supabase
    .from("drip_sequences")
    .select("id, name, description, is_active, created_at")
    .order("created_at", { ascending: false });

  // Enrollment counts per sequence
  const { data: enrollmentCounts } = await supabase
    .from("drip_enrollments")
    .select("sequence_id, status");

  const countBySeq = (sequences ?? []).reduce<Record<string, { active: number; total: number }>>(
    (acc, s) => {
      const rows = (enrollmentCounts ?? []).filter((e) => e.sequence_id === s.id);
      acc[s.id] = {
        active: rows.filter((e) => e.status === "active").length,
        total: rows.length,
      };
      return acc;
    },
    {}
  );

  return (
    <div className="px-8 pt-36 pb-28 md:px-12 md:pt-44">
      <div className="mx-auto max-w-[1400px]">

        <div className="eyebrow text-ink-400">Admin</div>
        <h1 className="mt-4 font-display text-[clamp(2.4rem,6vw,5rem)] leading-[0.92] text-ink-950">
          Drip Campaigns
        </h1>

        {/* Sequences list */}
        <div className="mt-10 space-y-3">
          {(sequences ?? []).map((seq) => {
            const counts = countBySeq[seq.id] ?? { active: 0, total: 0 };
            return (
              <Link
                key={seq.id}
                href={`/admin/drip/${seq.id}`}
                className="flex items-center justify-between rounded-lg border border-ink-200 bg-paper px-6 py-5 transition-colors hover:bg-paper-warm/60"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-ink-950">{seq.name}</span>
                    {!seq.is_active && (
                      <span className="rounded-full bg-ink-100 px-2 py-0.5 text-[0.68rem] uppercase tracking-[0.16em] text-ink-400">
                        Inactive
                      </span>
                    )}
                  </div>
                  {seq.description && (
                    <div className="mt-0.5 text-sm text-ink-500">{seq.description}</div>
                  )}
                </div>
                <div className="flex items-center gap-6 text-sm text-ink-400">
                  <span>
                    <span className="font-medium text-ink-950">{counts.active}</span> active
                  </span>
                  <span>
                    <span className="font-medium text-ink-950">{counts.total}</span> total enrolled
                  </span>
                  <span className="text-ink-300">&rarr;</span>
                </div>
              </Link>
            );
          })}
          {(sequences ?? []).length === 0 && (
            <p className="text-sm text-ink-400">No sequences yet. Create one below.</p>
          )}
        </div>

        {/* Create new sequence */}
        <div className="mt-12 rounded-lg border border-ink-200 bg-paper-warm/40 px-6 py-7">
          <div className="eyebrow mb-4 text-ink-400">New sequence</div>
          <form action={createSequence} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-[0.16em] text-ink-400 mb-1.5">
                Name
              </label>
              <input
                name="name"
                required
                placeholder="e.g. New Buyer Welcome"
                className="w-full max-w-md rounded-lg border border-ink-200 bg-paper px-3 py-2 text-sm text-ink-950 placeholder:text-ink-300 focus:border-ink-950 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.16em] text-ink-400 mb-1.5">
                Description (optional)
              </label>
              <input
                name="description"
                placeholder="Short description"
                className="w-full max-w-md rounded-lg border border-ink-200 bg-paper px-3 py-2 text-sm text-ink-950 placeholder:text-ink-300 focus:border-ink-950 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="bg-ink-950 px-6 py-2.5 text-[0.78rem] uppercase tracking-[0.2em] text-paper transition-opacity hover:opacity-80"
            >
              Create sequence
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
