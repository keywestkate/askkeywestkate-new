"use client";

import type { BuyerState } from "../types";
import { Chip } from "../Chip";

interface Props {
  buyer: BuyerState;
  onChange: (updates: Partial<BuyerState>) => void;
}

const TIMELINE_OPTIONS = [
  { label: "0–3 months", value: "0-3mo" },
  { label: "3–6 months", value: "3-6mo" },
  { label: "6–12 months", value: "6-12mo" },
  { label: "Just looking", value: "just_looking" },
];

const PURPOSE_OPTIONS = [
  { label: "Primary residence", value: "primary" },
  { label: "Second home", value: "second_home" },
  { label: "Investment", value: "investment" },
];

const FINANCING_OPTIONS = [
  { label: "Cash", value: "cash" },
  { label: "Conventional", value: "conventional" },
  { label: "VA", value: "va" },
  { label: "FHA", value: "fha" },
  { label: "I need a lender", value: "needs_lender" },
];

export function StepBuyerTimeline({ buyer, onChange }: Props) {
  return (
    <div>
      <h1 className="font-display text-[clamp(2.8rem,7vw,6rem)] text-ink-950">
        Timeline.
      </h1>

      <div className="mt-10 space-y-10">
        <div>
          <div className="eyebrow mb-4 text-ink-400">When are you buying?</div>
          <div className="flex flex-wrap gap-2.5">
            {TIMELINE_OPTIONS.map((opt) => (
              <Chip
                key={opt.value}
                label={opt.label}
                selected={buyer.timeline === opt.value}
                onClick={() => onChange({ timeline: buyer.timeline === opt.value ? null : opt.value })}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="eyebrow mb-4 text-ink-400">Primary / Second home / Investment</div>
          <div className="flex flex-wrap gap-2.5">
            {PURPOSE_OPTIONS.map((opt) => (
              <Chip
                key={opt.value}
                label={opt.label}
                selected={buyer.purchasePurpose === opt.value}
                onClick={() =>
                  onChange({ purchasePurpose: buyer.purchasePurpose === opt.value ? null : opt.value })
                }
              />
            ))}
          </div>
        </div>

        <div>
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={buyer.isFirstTimeBuyer}
              onChange={(e) => onChange({ isFirstTimeBuyer: e.target.checked })}
              className="mt-0.5 h-4 w-4 accent-ink-950"
            />
            <span className="text-sm text-ink-700 leading-snug">
              This is my first home purchase
            </span>
          </label>
        </div>

        <div>
          <div className="eyebrow mb-4 text-ink-400">How are you financing?</div>
          <div className="flex flex-wrap gap-2.5">
            {FINANCING_OPTIONS.map((opt) => (
              <Chip
                key={opt.value}
                label={opt.label}
                selected={buyer.financing === opt.value}
                onClick={() => onChange({ financing: buyer.financing === opt.value ? null : opt.value })}
              />
            ))}
          </div>

          {buyer.financing === "needs_lender" && (
            <label className="mt-5 flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={buyer.needsLenderReferral}
                onChange={(e) => onChange({ needsLenderReferral: e.target.checked })}
                className="mt-0.5 h-4 w-4 accent-ink-950"
              />
              <span className="text-sm text-ink-700 leading-snug">
                ✓ Yes, send me Kate&rsquo;s preferred lenders
              </span>
            </label>
          )}
        </div>
      </div>
    </div>
  );
}
