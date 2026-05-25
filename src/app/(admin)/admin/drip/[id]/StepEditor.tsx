"use client";

import { useRef, useState, useTransition } from "react";
import { upsertStep, deleteStep } from "../actions";

interface Step {
  id: string;
  step_number: number;
  delay_days: number;
  subject: string;
  body_html: string;
}

interface Props {
  sequenceId: string;
  step?: Step;
  defaultStepNumber?: number;
}

export function StepEditor({ sequenceId, step, defaultStepNumber = 1 }: Props) {
  const [open, setOpen] = useState(!step);
  const [isPending, startTransition] = useTransition();
  const [deleting, startDelete] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function handleSave(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await upsertStep(sequenceId, formData);
      if (result?.error) {
        setError(result.error);
      } else {
        if (!step) {
          formRef.current?.reset();
          setOpen(false);
        }
      }
    });
  }

  function handleDelete() {
    if (!step) return;
    startDelete(async () => {
      await deleteStep(sequenceId, step.id);
    });
  }

  if (step && !open) {
    return (
      <div className="flex items-start justify-between rounded-lg border border-ink-200 bg-paper px-5 py-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-[0.72rem] uppercase tracking-[0.2em] text-ink-400">
              Step {step.step_number}
            </span>
            <span className="text-[0.72rem] text-ink-400">
              Day {step.delay_days}
            </span>
          </div>
          <div className="mt-0.5 text-sm font-medium text-ink-950">{step.subject}</div>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="shrink-0 text-xs uppercase tracking-[0.16em] text-ink-400 hover:text-ink-950"
        >
          Edit
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-ink-200 bg-paper-warm/40 px-5 py-5">
      {step && (
        <div className="mb-4 flex items-center justify-between">
          <span className="text-[0.72rem] uppercase tracking-[0.2em] text-ink-400">
            Step {step.step_number}
          </span>
          <button
            onClick={() => setOpen(false)}
            className="text-xs text-ink-400 hover:text-ink-950"
          >
            Collapse
          </button>
        </div>
      )}

      <form ref={formRef} action={handleSave} className="space-y-4">
        {step && <input type="hidden" name="step_id" value={step.id} />}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-[0.16em] text-ink-400 mb-1.5">
              Step #
            </label>
            <input
              type="number"
              name="step_number"
              min={1}
              defaultValue={step?.step_number ?? defaultStepNumber}
              required
              className="w-full rounded-lg border border-ink-200 bg-paper px-3 py-2 text-sm text-ink-950 focus:border-ink-950 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-[0.16em] text-ink-400 mb-1.5">
              Send on day
            </label>
            <input
              type="number"
              name="delay_days"
              min={0}
              defaultValue={step?.delay_days ?? 0}
              required
              className="w-full rounded-lg border border-ink-200 bg-paper px-3 py-2 text-sm text-ink-950 focus:border-ink-950 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-[0.16em] text-ink-400 mb-1.5">
            Subject line
          </label>
          <input
            name="subject"
            required
            defaultValue={step?.subject}
            placeholder="Welcome to the Keys, {{first_name}}!"
            className="w-full rounded-lg border border-ink-200 bg-paper px-3 py-2 text-sm text-ink-950 placeholder:text-ink-300 focus:border-ink-950 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-[0.16em] text-ink-400 mb-1.5">
            Email body (HTML or plain text)
          </label>
          <textarea
            name="body_html"
            required
            rows={10}
            defaultValue={step?.body_html}
            placeholder="Hi {{first_name}},&#10;&#10;Welcome! I'm so excited to help you find your piece of paradise..."
            className="w-full rounded-lg border border-ink-200 bg-paper px-3 py-2 text-sm text-ink-950 placeholder:text-ink-300 focus:border-ink-950 focus:outline-none font-mono leading-relaxed"
          />
          <p className="mt-1 text-xs text-ink-400">
            Use <code className="bg-ink-100 px-1 rounded">{"{{first_name}}"}</code> and{" "}
            <code className="bg-ink-100 px-1 rounded">{"{{full_name}}"}</code> as merge tags.
          </p>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={isPending}
            className="bg-ink-950 px-5 py-2 text-[0.78rem] uppercase tracking-[0.2em] text-paper transition-opacity hover:opacity-80 disabled:opacity-50"
          >
            {isPending ? "Saving…" : step ? "Save step" : "Add step"}
          </button>
          {step && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="text-xs uppercase tracking-[0.16em] text-red-500 hover:text-red-700 disabled:opacity-50"
            >
              {deleting ? "Deleting…" : "Delete"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
