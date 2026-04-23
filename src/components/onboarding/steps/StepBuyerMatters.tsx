"use client";

import type { BuyerState } from "../types";
import { Chip } from "../Chip";

interface Props {
  buyer: BuyerState;
  onChange: (updates: Partial<BuyerState>) => void;
  selectedIslands: string[];
}

const PROPERTY_STYLES = [
  "Single Family",
  "Condo",
  "Townhouse",
  "Half Duplex",
  "Duplex",
  "Multi-Units",
  "Condotel",
  "Mobile Home",
  "Off Shore Island",
  "PreConstruction",
  "Under Construction",
  "Fractional Ownership",
  "Open to anything",
];

const HOME_FEATURES = [
  "Dockage",
  "Open water",
  "Canal front",
  "Pool",
  "Pet-friendly",
  "Gated community",
  "New construction",
  "Income / rental potential",
  "Concrete construction",
  "Storm shutters / impact windows",
  "High elevation (X-zone)",
];

const BOATING_TYPES = ["Flats", "Backcountry", "Reef", "Offshore", "Sandbar", "Mix"];

const BOAT_OPTIONS: { value: BuyerState["hasBoat"]; label: string }[] = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "plan", label: "Plan to get one" },
];

export function StepBuyerMatters({ buyer, onChange, selectedIslands }: Props) {
  function togglePropertyType(style: string) {
    const next = buyer.propertyTypes.includes(style)
      ? buyer.propertyTypes.filter((s) => s !== style)
      : [...buyer.propertyTypes, style];
    onChange({ propertyTypes: next });
  }

  function toggleMustHave(item: string) {
    const next = buyer.mustHaves.includes(item)
      ? buyer.mustHaves.filter((h) => h !== item)
      : [...buyer.mustHaves, item];
    onChange({ mustHaves: next });
  }

  function toggleBoatingType(type: string) {
    const next = buyer.boatingTypes.includes(type)
      ? buyer.boatingTypes.filter((t) => t !== type)
      : [...buyer.boatingTypes, type];
    onChange({ boatingTypes: next });
  }

  const showBoatDetails = buyer.hasBoat === "yes" || buyer.hasBoat === "plan";

  return (
    <div>
      <h1 className="font-display text-[clamp(2.8rem,7vw,6rem)] text-ink-950">
        What matters?
      </h1>

      <div className="mt-10 space-y-10">
        <div>
          <div className="eyebrow mb-2 text-ink-400">Property style</div>
          <p className="mb-4 text-sm text-ink-600">
            Pick anything that could work — open to everything is fine too.
          </p>
          <div className="flex flex-wrap gap-2.5">
            {PROPERTY_STYLES.map((style) => (
              <Chip
                key={style}
                label={style}
                selected={buyer.propertyTypes.includes(style)}
                onClick={() => togglePropertyType(style)}
              />
            ))}
          </div>
        </div>

        <div className="border-t border-ink-200 pt-10">
          <div className="eyebrow mb-4 text-ink-400">The home</div>
          <div className="flex flex-wrap gap-2.5">
            {HOME_FEATURES.map((f) => (
              <Chip
                key={f}
                label={f}
                selected={buyer.mustHaves.includes(f)}
                onClick={() => toggleMustHave(f)}
              />
            ))}
          </div>
        </div>

        <div className="border-t border-ink-200 pt-10">
          <div className="eyebrow mb-4 text-ink-400">The boat</div>
          <p className="mb-5 text-sm text-ink-500">Do you have a boat?</p>
          <div className="flex flex-wrap gap-2.5">
            {BOAT_OPTIONS.map((opt) => (
              <Chip
                key={opt.value}
                label={opt.label}
                selected={buyer.hasBoat === opt.value}
                onClick={() => onChange({ hasBoat: buyer.hasBoat === opt.value ? null : opt.value })}
              />
            ))}
          </div>

          {showBoatDetails && (
            <div className="mt-8 space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="eyebrow mb-2 block text-ink-400">
                    Length (feet)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={200}
                    placeholder="e.g. 32"
                    value={buyer.boatLength}
                    onChange={(e) => onChange({ boatLength: e.target.value })}
                    className="w-full rounded-xl border border-ink-200 bg-paper px-4 py-3.5 text-ink-950 placeholder:text-ink-300 focus:border-ink-950 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="eyebrow mb-2 block text-ink-400">
                    Draft — {buyer.boatDraft === 6 ? "6+ ft" : `${buyer.boatDraft} ft`}
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={6}
                    step={0.5}
                    value={buyer.boatDraft}
                    onChange={(e) => onChange({ boatDraft: parseFloat(e.target.value) })}
                    className="mt-3 w-full accent-ink-950"
                  />
                  <div className="mt-1 flex justify-between text-xs text-ink-300">
                    <span>1 ft</span>
                    <span>6+ ft</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="eyebrow mb-2 block text-ink-400">
                  Boat type / make
                </label>
                <input
                  type="text"
                  placeholder="e.g. 32' center console, flats skiff, sailboat"
                  value={buyer.boatType}
                  onChange={(e) => onChange({ boatType: e.target.value })}
                  className="w-full rounded-xl border border-ink-200 bg-paper px-4 py-3.5 text-ink-950 placeholder:text-ink-300 focus:border-ink-950 focus:outline-none"
                />
              </div>

              <div>
                <div className="eyebrow mb-4 text-ink-400">Type of boating</div>
                <div className="flex flex-wrap gap-2.5">
                  {BOATING_TYPES.map((t) => (
                    <Chip
                      key={t}
                      label={t}
                      selected={buyer.boatingTypes.includes(t)}
                      onClick={() => toggleBoatingType(t)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {showBoatDetails && selectedIslands.includes("Key West") && (
            <p className="mt-6 border-l-2 border-gulf-700 pl-4 text-sm italic leading-relaxed text-ink-600">
              One more Key West note — most homes there don&rsquo;t have dockage.
              You&rsquo;ll likely need a marina slip for your boat. We can talk
              through marina options when we connect.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
