"use client";

import { KEYS_REGIONS, type BuyerState } from "../types";
import { Chip } from "../Chip";

interface Props {
  buyer: BuyerState;
  onChange: (updates: Partial<BuyerState>) => void;
}

export function StepBuyerIslands({ buyer, onChange }: Props) {
  function toggleRegion(regionId: string) {
    const isNotSure = regionId === "not_sure";
    let next: string[];

    if (isNotSure) {
      next = buyer.regions.includes("not_sure") ? [] : ["not_sure"];
    } else {
      const without = buyer.regions.filter((r) => r !== "not_sure");
      next = without.includes(regionId)
        ? without.filter((r) => r !== regionId)
        : [...without, regionId];
    }

    const activeRegions = KEYS_REGIONS.filter((r) => next.includes(r.id));
    const validIslands = activeRegions.flatMap((r) => r.islands as unknown as string[]);
    const filteredIslands = buyer.islands.filter((i) => validIslands.includes(i));

    onChange({ regions: next, islands: filteredIslands });
  }

  function toggleIsland(island: string) {
    const next = buyer.islands.includes(island)
      ? buyer.islands.filter((i) => i !== island)
      : [...buyer.islands, island];
    onChange({ islands: next });
  }

  const expandedRegions = KEYS_REGIONS.filter(
    (r) => r.id !== "not_sure" && buyer.regions.includes(r.id)
  );

  return (
    <div>
      <h1 className="font-display text-[clamp(2.8rem,7vw,6rem)] text-ink-950">
        Where in<br />the Keys?
      </h1>
      <p className="mt-5 text-base text-ink-500 leading-relaxed">
        Pick the areas that interest you. You can choose more than one.
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
        {KEYS_REGIONS.map((region) => (
          <Chip
            key={region.id}
            label={region.label}
            selected={buyer.regions.includes(region.id)}
            onClick={() => toggleRegion(region.id)}
          />
        ))}
      </div>

      {expandedRegions.map((region) => (
        <div key={region.id} className="mt-8">
          <div className="eyebrow mb-4 text-ink-400">{region.label}</div>
          <div className="flex flex-wrap gap-2.5">
            {(region.islands as unknown as string[]).map((island) => (
              <Chip
                key={island}
                label={island}
                selected={buyer.islands.includes(island)}
                onClick={() => toggleIsland(island)}
              />
            ))}
          </div>
        </div>
      ))}

      {buyer.regions.includes("not_sure") && (
        <p className="mt-8 text-sm text-ink-500 italic">
          No problem — Kate will reach out to talk through the best fit for you.
        </p>
      )}

      {buyer.islands.includes("Key West") && (
        <p className="mt-8 border-l-2 border-gulf-700 pl-4 text-sm italic leading-relaxed text-ink-600">
          Heads up — open-water homes in Key West are very rare. If open water
          matters to you, we&rsquo;ll also want to look at the Lower Keys. Just
          a local note.
        </p>
      )}
    </div>
  );
}
