"use client";

import type { BuyerState } from "../types";

interface Props {
  buyer: BuyerState;
  onChange: (updates: Partial<BuyerState>) => void;
  onSkip: () => void;
}

export function StepBuyerWhy({ buyer, onChange, onSkip }: Props) {
  return (
    <div>
      <h1 className="font-display text-[clamp(2.8rem,7vw,6rem)] text-ink-950">
        Why the Keys?
      </h1>
      <p className="mt-5 text-base italic leading-relaxed text-ink-600">
        What&rsquo;s pulling you here? A friend&rsquo;s place that hooked you, a fishing trip
        you can&rsquo;t shake, a long-time dream — tell me your version.
      </p>

      <textarea
        rows={8}
        value={buyer.whyTheKeys}
        onChange={(e) => onChange({ whyTheKeys: e.target.value })}
        placeholder="Write as much or as little as you like…"
        className="mt-8 w-full resize-none rounded-2xl border border-ink-200 bg-paper px-5 py-4 text-base text-ink-950 placeholder:text-ink-300 focus:border-ink-950 focus:outline-none"
      />

      <button
        type="button"
        onClick={onSkip}
        className="mt-4 text-sm text-ink-400 underline-offset-2 hover:text-ink-600 hover:underline"
      >
        Skip
      </button>
    </div>
  );
}
