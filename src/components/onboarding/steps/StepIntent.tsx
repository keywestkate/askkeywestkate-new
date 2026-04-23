"use client";

import type { Intent, OnboardingState } from "../types";

interface Props {
  state: OnboardingState;
  onChange: (intent: Intent) => void;
}

const OPTIONS: { value: Intent; label: string; sub: string }[] = [
  { value: "buying", label: "Buying", sub: "I'm looking for a home in the Keys" },
  { value: "selling", label: "Selling", sub: "I have a property I'm considering listing" },
  { value: "both", label: "Both", sub: "I'm buying and selling" },
  { value: "browsing", label: "Just browsing", sub: "I'm exploring — no rush" },
];

export function StepIntent({ state, onChange }: Props) {
  return (
    <div>
      <div className="eyebrow mb-6 text-ink-400">01 / Onboarding</div>
      <h1 className="font-display text-[clamp(2.8rem,7vw,6rem)] text-ink-950">
        Let&rsquo;s start<br />at the top.
      </h1>
      <p className="mt-6 text-base text-ink-500 leading-relaxed">
        Are you here to buy, sell, or both?
      </p>

      <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {OPTIONS.map((opt) => {
          const selected = state.intent === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={[
                "group rounded-2xl border p-6 text-left transition-colors duration-150 focus:outline-none",
                selected
                  ? "border-ink-950 bg-ink-950 text-paper"
                  : "border-ink-200 bg-paper hover:border-ink-500",
              ].join(" ")}
            >
              <div className={`font-display text-2xl tracking-[-0.03em] ${selected ? "text-paper" : "text-ink-950"}`}>
                {opt.label}
              </div>
              <div className={`mt-1 text-sm leading-snug ${selected ? "text-paper/70" : "text-ink-500"}`}>
                {opt.sub}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
