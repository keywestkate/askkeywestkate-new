"use client";

import { useState, useTransition } from "react";
import { enrollClient, updateEnrollmentStatus } from "../../drip/actions";

interface Sequence {
  id: string;
  name: string;
  is_active: boolean;
}

interface Enrollment {
  id: string;
  sequence_id: string;
  status: string;
  enrolled_at: string;
  next_send_at: string | null;
  next_step_number: number;
  drip_sequences: { name: string } | null;
}

interface Props {
  userId: string;
  sequences: Sequence[];
  enrollments: Enrollment[];
}

export function DripPanel({ userId, sequences, enrollments }: Props) {
  const [selectedSeq, setSelectedSeq] = useState("");
  const [enrolling, startEnroll] = useTransition();
  const [updating, startUpdate] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const activeSequenceIds = enrollments.map((e) => e.sequence_id);
  const availableSequences = sequences.filter(
    (s) => s.is_active && !activeSequenceIds.includes(s.id)
  );

  function handleEnroll() {
    if (!selectedSeq) return;
    setError(null);
    startEnroll(async () => {
      const result = await enrollClient(userId, selectedSeq);
      if (result?.error) setError(result.error);
      else setSelectedSeq("");
    });
  }

  function handleStatus(enrollmentId: string, status: "active" | "paused" | "cancelled") {
    startUpdate(async () => {
      await updateEnrollmentStatus(enrollmentId, userId, status);
    });
  }

  return (
    <section className="border-t border-ink-200 pt-8">
      <div className="eyebrow mb-5 text-ink-400">Drip campaigns</div>

      {/* Active enrollments */}
      {enrollments.length > 0 && (
        <div className="mb-6 space-y-3">
          {enrollments.map((e) => (
            <div
              key={e.id}
              className="flex items-start justify-between rounded-lg border border-ink-200 bg-paper px-4 py-3"
            >
              <div>
                <div className="text-sm font-medium text-ink-950">
                  {e.drip_sequences?.name ?? "Unknown sequence"}
                </div>
                <div className="mt-0.5 text-xs text-ink-400">
                  Step {e.next_step_number}
                  {e.next_send_at && (
                    <> · Next email {new Date(e.next_send_at).toLocaleDateString("en-US", {
                      month: "short", day: "numeric", year: "numeric",
                    })}</>
                  )}
                  {e.status === "completed" && " · Completed"}
                  {e.status === "cancelled" && " · Cancelled"}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2 py-0.5 text-[0.68rem] uppercase tracking-[0.14em] ${
                  e.status === "active" ? "bg-gulf-100 text-gulf-800" :
                  e.status === "paused" ? "bg-amber-50 text-amber-700" :
                  "bg-ink-100 text-ink-400"
                }`}>
                  {e.status}
                </span>
                {e.status === "active" && (
                  <button
                    onClick={() => handleStatus(e.id, "paused")}
                    disabled={updating}
                    className="text-[0.7rem] uppercase tracking-[0.14em] text-ink-400 hover:text-ink-950 disabled:opacity-40"
                  >
                    Pause
                  </button>
                )}
                {e.status === "paused" && (
                  <button
                    onClick={() => handleStatus(e.id, "active")}
                    disabled={updating}
                    className="text-[0.7rem] uppercase tracking-[0.14em] text-gulf-700 hover:text-gulf-900 disabled:opacity-40"
                  >
                    Resume
                  </button>
                )}
                {(e.status === "active" || e.status === "paused") && (
                  <button
                    onClick={() => handleStatus(e.id, "cancelled")}
                    disabled={updating}
                    className="text-[0.7rem] uppercase tracking-[0.14em] text-red-400 hover:text-red-600 disabled:opacity-40"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {enrollments.length === 0 && (
        <p className="mb-5 text-sm text-ink-400">Not enrolled in any drip campaign.</p>
      )}

      {/* Enroll in a new sequence */}
      {availableSequences.length > 0 && (
        <div className="flex items-center gap-3">
          <select
            value={selectedSeq}
            onChange={(e) => setSelectedSeq(e.target.value)}
            className="rounded-lg border border-ink-200 bg-paper px-3 py-2 text-sm text-ink-950 focus:border-ink-950 focus:outline-none"
          >
            <option value="">Select a sequence…</option>
            {availableSequences.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
          <button
            onClick={handleEnroll}
            disabled={!selectedSeq || enrolling}
            className="bg-ink-950 px-5 py-2 text-[0.75rem] uppercase tracking-[0.18em] text-paper transition-opacity hover:opacity-80 disabled:opacity-40"
          >
            {enrolling ? "Enrolling…" : "Enroll"}
          </button>
        </div>
      )}

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </section>
  );
}
