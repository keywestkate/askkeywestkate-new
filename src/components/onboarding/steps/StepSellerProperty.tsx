"use client";

import { KEYS_REGIONS, type SellerState } from "../types";
import { Chip } from "../Chip";

interface Props {
  seller: SellerState;
  onChange: (updates: Partial<SellerState>) => void;
}

const USE_OPTIONS = [
  { label: "Primary residence", value: "primary" },
  { label: "Vacation home", value: "vacation" },
  { label: "Rental", value: "rental" },
  { label: "Mixed", value: "mixed" },
];

function formatMoney(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  return Number(digits).toLocaleString("en-US");
}

function parseMoney(formatted: string): string {
  return formatted.replace(/\D/g, "");
}

export function StepSellerProperty({ seller, onChange }: Props) {
  return (
    <div>
      <h1 className="font-display text-[clamp(2.8rem,7vw,6rem)] text-ink-950">
        About the home.
      </h1>

      <div className="mt-10 space-y-7">
        <div>
          <label className="eyebrow mb-2 block text-ink-400">
            Property address
          </label>
          <input
            type="text"
            placeholder="123 Oceanview Dr, Key West, FL 33040"
            value={seller.address}
            onChange={(e) => onChange({ address: e.target.value })}
            className="w-full rounded-xl border border-ink-200 bg-paper px-4 py-3.5 text-ink-950 placeholder:text-ink-300 focus:border-ink-950 focus:outline-none"
          />
        </div>

        <div>
          <label className="eyebrow mb-2 block text-ink-400">Island</label>
          <select
            value={seller.island}
            onChange={(e) => onChange({ island: e.target.value })}
            className="w-full rounded-xl border border-ink-200 bg-paper px-4 py-3.5 text-ink-950 focus:border-ink-950 focus:outline-none appearance-none"
          >
            <option value="">Select an island</option>
            {KEYS_REGIONS.filter((r) => r.islands.length > 0).map((region) => (
              <optgroup key={region.id} label={region.label}>
                {(region.islands as unknown as string[]).map((island) => (
                  <option key={island} value={island}>
                    {island}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <div>
          <div className="eyebrow mb-4 text-ink-400">Currently used as</div>
          <div className="flex flex-wrap gap-2.5">
            {USE_OPTIONS.map((opt) => (
              <Chip
                key={opt.value}
                label={opt.label}
                selected={seller.currentUse === opt.value}
                onClick={() =>
                  onChange({ currentUse: seller.currentUse === opt.value ? null : opt.value })
                }
              />
            ))}
          </div>
        </div>

        <div>
          <label className="eyebrow mb-2 block text-ink-400">
            Estimated value{" "}
            <span className="normal-case tracking-normal text-ink-300">(optional)</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400 select-none">$</span>
            <input
              type="text"
              inputMode="numeric"
              placeholder="e.g. 1,200,000"
              value={seller.estimatedValue ? formatMoney(seller.estimatedValue) : ""}
              onChange={(e) => onChange({ estimatedValue: parseMoney(e.target.value) })}
              className="w-full rounded-xl border border-ink-200 bg-paper pl-8 pr-4 py-3.5 text-ink-950 placeholder:text-ink-300 focus:border-ink-950 focus:outline-none"
            />
          </div>
        </div>
      </div>

    </div>
  );
}
