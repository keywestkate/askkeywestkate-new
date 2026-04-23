"use client";

import type { BuyerState } from "../types";
import { Chip } from "../Chip";

interface Props {
  buyer: BuyerState;
  onChange: (updates: Partial<BuyerState>) => void;
}

const BEDROOM_OPTIONS: { label: string; value: number }[] = [
  { label: "Studio", value: 0 },
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4", value: 4 },
  { label: "5+", value: 5 },
];

function formatMoney(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  return Number(digits).toLocaleString("en-US");
}

function parseMoney(formatted: string): string {
  return formatted.replace(/\D/g, "");
}

export function StepBuyerRange({ buyer, onChange }: Props) {
  return (
    <div>
      <h1 className="font-display text-[clamp(2.8rem,7vw,6rem)] text-ink-950">
        What&rsquo;s your<br />range?
      </h1>

      <div className="mt-10 space-y-8">
        <div>
          <div className="eyebrow mb-4 text-ink-400">Price range</div>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400 select-none">$</span>
              <input
                type="text"
                inputMode="numeric"
                placeholder="Minimum"
                value={buyer.priceMin ? formatMoney(buyer.priceMin) : ""}
                onChange={(e) => onChange({ priceMin: parseMoney(e.target.value) })}
                className="w-full rounded-xl border border-ink-200 bg-paper pl-8 pr-4 py-3.5 text-ink-950 placeholder:text-ink-300 focus:border-ink-950 focus:outline-none"
              />
            </div>
            <span className="text-ink-300">—</span>
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400 select-none">$</span>
              <input
                type="text"
                inputMode="numeric"
                placeholder="Maximum"
                value={buyer.priceMax ? formatMoney(buyer.priceMax) : ""}
                onChange={(e) => onChange({ priceMax: parseMoney(e.target.value) })}
                className="w-full rounded-xl border border-ink-200 bg-paper pl-8 pr-4 py-3.5 text-ink-950 placeholder:text-ink-300 focus:border-ink-950 focus:outline-none"
              />
            </div>
          </div>
          <p className="mt-4 text-sm italic leading-relaxed text-ink-500">
            Kate&rsquo;s stretch: I&rsquo;ll also show you homes up to 33%
            above your max. Sometimes the right home is right above your number,
            and you&rsquo;d never see it otherwise.
          </p>
        </div>

        <div>
          <div className="eyebrow mb-4 text-ink-400">Bedrooms minimum</div>
          <div className="flex flex-wrap gap-2.5">
            {BEDROOM_OPTIONS.map((opt) => (
              <Chip
                key={opt.label}
                label={opt.label}
                selected={buyer.bedroomsMin === opt.value}
                onClick={() =>
                  onChange({
                    bedroomsMin: buyer.bedroomsMin === opt.value ? null : opt.value,
                  })
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
