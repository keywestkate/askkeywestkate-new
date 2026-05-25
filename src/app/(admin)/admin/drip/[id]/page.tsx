import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { StepEditor } from "./StepEditor";
import { SequenceSettings } from "./SequenceSettings";

export const metadata: Metadata = { title: "Admin — Edit Sequence" };

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SequencePage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: sequence }, { data: steps }, { data: enrollments }] = await Promise.all([
    supabase
      .from("drip_sequences")
      .select("id, name, description, is_active")
      .eq("id", id)
      .single(),
    supabase
      .from("drip_steps")
      .select("id, step_number, delay_days, subject, body_html")
      .eq("sequence_id", id)
      .order("step_number", { ascending: true }),
    supabase
      .from("drip_enrollments")
      .select("id, user_id, status, enrolled_at, next_send_at, next_step_number, profiles(full_name, email)")
      .eq("sequence_id", id)
      .order("enrolled_at", { ascending: false }),
  ]);

  if (!sequence) notFound();

  const nextStepNumber = steps && steps.length > 0
    ? Math.max(...steps.map((s) => s.step_number)) + 1
    : 1;

  return (
    <div className="px-8 pt-36 pb-28 md:px-12 md:pt-44">
      <div className="mx-auto max-w-[1400px]">

        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.2em] text-ink-400">
          <Link href="/admin/drip" className="hover:text-ink-950 transition-colors">
            Drip
          </Link>
          <span>/</span>
          <span className="text-ink-950">{sequence.name}</span>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_340px]">

          {/* LEFT — steps */}
          <div>
            <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-[0.95] text-ink-950">
              {sequence.name}
            </h1>
            {sequence.description && (
              <p className="mt-2 text-sm text-ink-500">{sequence.description}</p>
            )}

            <div className="mt-10">
              <div className="eyebrow mb-6 text-ink-400">Email steps</div>

              {/* Existing steps */}
              <div className="space-y-4">
                {(steps ?? []).map((step) => (
                  <StepEditor
                    key={step.id}
                    sequenceId={id}
                    step={step}
                  />
                ))}
              </div>

              {/* New step */}
              <div className="mt-6">
                <div className="eyebrow mb-4 text-ink-400">Add step {nextStepNumber}</div>
                <StepEditor sequenceId={id} defaultStepNumber={nextStepNumber} />
              </div>
            </div>
          </div>

          {/* RIGHT — settings + enrollments */}
          <div className="space-y-8">

            {/* Settings */}
            <SequenceSettings sequence={sequence} />

            {/* Enrollments */}
            <div className="rounded-lg border border-ink-200 bg-paper px-5 py-5">
              <div className="eyebrow mb-4 text-ink-400">
                Enrollments
                <span className="ml-2 font-sans normal-case text-ink-950 tracking-normal">
                  {enrollments?.length ?? 0}
                </span>
              </div>
              <div className="space-y-3 text-sm">
                {(enrollments ?? []).map((e) => {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const profile = (e.profiles as any) as { full_name: string | null; email: string | null } | null;
                  return (
                    <div key={e.id} className="flex items-start justify-between gap-3">
                      <div>
                        <Link
                          href={`/admin/clients/${e.user_id}`}
                          className="font-medium text-ink-950 hover:underline"
                        >
                          {profile?.full_name ?? profile?.email ?? "Unknown"}
                        </Link>
                        <div className="text-xs text-ink-400">
                          Step {e.next_step_number}
                          {e.next_send_at && (
                            <> · Next {new Date(e.next_send_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</>
                          )}
                        </div>
                      </div>
                      <span className={`shrink-0 rounded-full px-2 py-0.5 text-[0.68rem] uppercase tracking-[0.14em] ${
                        e.status === "active" ? "bg-gulf-100 text-gulf-800" :
                        e.status === "paused" ? "bg-amber-50 text-amber-700" :
                        "bg-ink-100 text-ink-400"
                      }`}>
                        {e.status}
                      </span>
                    </div>
                  );
                })}
                {(enrollments ?? []).length === 0 && (
                  <p className="text-ink-400">No enrollments yet.</p>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
