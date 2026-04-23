"use client";

import { useState, useTransition } from "react";
import { updateAdminNotes } from "./actions";

interface Props {
  clientId: string;
  initialNotes: string;
}

export function AdminNotes({ clientId, initialNotes }: Props) {
  const [notes, setNotes] = useState(initialNotes);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSave() {
    setError(null);
    setSaved(false);
    startTransition(async () => {
      const result = await updateAdminNotes(clientId, notes);
      if (result?.error) {
        setError(result.error);
      } else {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      }
    });
  }

  const dirty = notes !== initialNotes;

  return (
    <div className="sticky top-28 rounded-lg border border-ink-200 bg-paper-warm p-6">
      <div className="eyebrow mb-3 text-ink-400">Kate&rsquo;s notes</div>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={10}
        placeholder="Private notes — only visible to you…"
        className="w-full resize-none rounded-lg border border-ink-200 bg-paper px-4 py-3 text-sm text-ink-950 placeholder:text-ink-300 focus:border-ink-950 focus:outline-none"
      />
      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-ink-400">
          {saved ? "Saved." : dirty ? "Unsaved changes" : ""}
        </span>
        <button
          type="button"
          onClick={handleSave}
          disabled={!dirty || isPending}
          className="bg-ink-950 px-5 py-2 text-[0.72rem] uppercase tracking-[0.2em] text-paper transition-opacity hover:opacity-80 disabled:opacity-30"
        >
          {isPending ? "Saving…" : "Save"}
        </button>
      </div>
      {error && (
        <p className="mt-2 text-xs text-red-600">{error}</p>
      )}
    </div>
  );
}
