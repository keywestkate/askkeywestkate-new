"use client";

import type { SellerState } from "../types";
import { Chip } from "../Chip";

interface Props {
  seller: SellerState;
  onChange: (updates: Partial<SellerState>) => void;
}

const TIMELINE_OPTIONS = [
  { label: "0–3 months", value: "0-3mo" },
  { label: "3–6 months", value: "3-6mo" },
  { label: "6–12 months", value: "6-12mo" },
  { label: "Exploring", value: "exploring" },
];

export function StepSellerStory({ seller, onChange }: Props) {
  return (
    <div>
      <h1 className="font-display text-[clamp(2.8rem,7vw,6rem)] text-ink-950">
        The story.
      </h1>

      <div className="mt-10 space-y-8">
        <div>
          <div className="eyebrow mb-4 text-ink-400">When are you looking to sell?</div>
          <div className="flex flex-wrap gap-2.5">
            {TIMELINE_OPTIONS.map((opt) => (
              <Chip
                key={opt.value}
                label={opt.label}
                selected={seller.timelineToSell === opt.value}
                onClick={() =>
                  onChange({
                    timelineToSell: seller.timelineToSell === opt.value ? null : opt.value,
                  })
                }
              />
            ))}
          </div>
        </div>

        <div>
          <label className="eyebrow mb-2 block text-ink-400">
            What&rsquo;s your favorite memory in this home?{" "}
            <span className="normal-case tracking-normal text-ink-300">(optional)</span>
          </label>
          <p className="mb-3 text-sm italic text-ink-500">
            A Sunday on the water, the morning the kids caught their first fish out back — whatever comes to mind.
          </p>
          <textarea
            rows={4}
            value={seller.favoriteMemory}
            onChange={(e) => onChange({ favoriteMemory: e.target.value })}
            placeholder="A morning I'll never forget…"
            className="w-full resize-none rounded-2xl border border-ink-200 bg-paper px-5 py-4 text-base text-ink-950 placeholder:text-ink-300 focus:border-ink-950 focus:outline-none"
          />
        </div>

        <div>
          <label className="eyebrow mb-2 block text-ink-400">
            What&rsquo;s making you ready to pass it on?{" "}
            <span className="normal-case tracking-normal text-ink-300">(optional)</span>
          </label>
          <p className="mb-3 text-sm italic text-ink-500">
            Upgrading, relocating, simplifying — no wrong answer.
          </p>
          <textarea
            rows={4}
            value={seller.reasonForSelling}
            onChange={(e) => onChange({ reasonForSelling: e.target.value })}
            placeholder="Honestly, it's time because…"
            className="w-full resize-none rounded-2xl border border-ink-200 bg-paper px-5 py-4 text-base text-ink-950 placeholder:text-ink-300 focus:border-ink-950 focus:outline-none"
          />
        </div>

        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={seller.needsConsultation}
            onChange={(e) => onChange({ needsConsultation: e.target.checked })}
            className="mt-0.5 h-4 w-4 accent-ink-950"
          />
          <span className="text-sm text-ink-700 leading-snug">
            I&rsquo;d like a free pre-listing consultation
          </span>
        </label>
      </div>
    </div>
  );
}
