"use client";

import { useState, useTransition } from "react";
import { updateSequence, deleteSequence } from "../actions";
import { useRouter } from "next/navigation";

interface Sequence {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
}

export function SequenceSettings({ sequence }: { sequence: Sequence }) {
  const [editing, setEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  function handleSave(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await updateSequence(sequence.id, formData);
      if (result?.error) setError(result.error);
      else setEditing(false);
    });
  }

  function handleDelete() {
    if (!confirm(`Delete "${sequence.name}"? This will cancel all enrollments.`)) return;
    startTransition(async () => {
      await deleteSequence(sequence.id);
      router.push("/admin/drip");
    });
  }

  return (
    <div className="rounded-lg border border-ink-200 bg-paper px-5 py-5">
      <div className="eyebrow mb-4 text-ink-400">Settings</div>

      {editing ? (
        <form action={handleSave} className="space-y-3">
          <div>
            <label className="block text-xs uppercase tracking-[0.16em] text-ink-400 mb-1">
              Name
            </label>
            <input
              name="name"
              required
              defaultValue={sequence.name}
              className="w-full rounded-lg border border-ink-200 bg-paper px-3 py-2 text-sm text-ink-950 focus:border-ink-950 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-[0.16em] text-ink-400 mb-1">
              Description
            </label>
            <input
              name="description"
              defaultValue={sequence.description ?? ""}
              className="w-full rounded-lg border border-ink-200 bg-paper px-3 py-2 text-sm text-ink-950 focus:border-ink-950 focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_active"
              name="is_active"
              value="true"
              defaultChecked={sequence.is_active}
              className="rounded"
            />
            <label htmlFor="is_active" className="text-sm text-ink-700">
              Active (can enroll clients)
            </label>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isPending}
              className="bg-ink-950 px-4 py-1.5 text-[0.75rem] uppercase tracking-[0.2em] text-paper hover:opacity-80 disabled:opacity-50"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="text-xs text-ink-400 hover:text-ink-950"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-ink-400">Status</span>
            <span className={sequence.is_active ? "text-gulf-700" : "text-ink-400"}>
              {sequence.is_active ? "Active" : "Inactive"}
            </span>
          </div>
          {sequence.description && (
            <div className="flex justify-between gap-4">
              <span className="text-ink-400">Description</span>
              <span className="text-ink-700 text-right">{sequence.description}</span>
            </div>
          )}
          <div className="flex gap-4 pt-2">
            <button
              onClick={() => setEditing(true)}
              className="text-xs uppercase tracking-[0.16em] text-ink-500 hover:text-ink-950"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="text-xs uppercase tracking-[0.16em] text-red-500 hover:text-red-700"
            >
              Delete sequence
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
