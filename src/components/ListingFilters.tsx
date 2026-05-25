"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface Props {
  currentParams: Record<string, string | string[] | undefined>;
}

function sp(val: string | string[] | undefined): string {
  return Array.isArray(val) ? val[0] : val ?? "";
}

export function ListingFilters({ currentParams }: Props) {
  const router = useRouter();

  const update = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams();
      for (const [k, v] of Object.entries(currentParams)) {
        const s = sp(v);
        if (s) next.set(k, s);
      }
      if (value) {
        next.set(key, value);
      } else {
        next.delete(key);
      }
      router.push(`/buy?${next.toString()}`);
    },
    [currentParams, router]
  );

  const toggle = useCallback(
    (key: string) => {
      const current = sp(currentParams[key]);
      update(key, current === "1" ? "" : "1");
    },
    [currentParams, update]
  );

  const waterfrontType = sp(currentParams.waterfrontType);
  const minPrice = sp(currentParams.minPrice);
  const maxPrice = sp(currentParams.maxPrice);
  const minBeds = sp(currentParams.minBeds);
  const minMM = sp(currentParams.minMM);
  const maxMM = sp(currentParams.maxMM);
  const hasDockage = sp(currentParams.hasDockage) === "1";
  const rentalsAllowed = sp(currentParams.rentalsAllowed) === "1";
  const hasPool = sp(currentParams.hasPool) === "1";

  const WATERFRONT_TYPES = [
    { label: "Oceanfront", value: "Oceanfront" },
    { label: "Gulf Front", value: "Gulf Front" },
    { label: "Canal Front", value: "Canal Front" },
    { label: "Open Water", value: "Open Water" },
    { label: "Bay Front", value: "Bay Front" },
  ];

  const PRICE_OPTIONS = [
    { label: "Any", value: "" },
    { label: "$500K", value: "500000" },
    { label: "$750K", value: "750000" },
    { label: "$1M", value: "1000000" },
    { label: "$1.5M", value: "1500000" },
    { label: "$2M", value: "2000000" },
    { label: "$3M", value: "3000000" },
  ];

  const BED_OPTIONS = [
    { label: "Any", value: "" },
    { label: "2+", value: "2" },
    { label: "3+", value: "3" },
    { label: "4+", value: "4" },
    { label: "5+", value: "5" },
  ];

  const hasAnyFilter =
    waterfrontType || minPrice || maxPrice || minBeds || minMM || maxMM || hasDockage || rentalsAllowed || hasPool;

  return (
    <div className="space-y-5">
      {/* Row 1: Waterfront type chips */}
      <div>
        <div className="mb-2 text-[0.68rem] uppercase tracking-[0.2em] text-ink-400">Waterfront type</div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => update("waterfrontType", "")}
            className={`px-4 py-2 text-[0.72rem] uppercase tracking-[0.16em] border transition-colors ${
              !waterfrontType
                ? "bg-ink-950 text-paper border-ink-950"
                : "border-ink-200 text-ink-700 hover:border-ink-400"
            }`}
          >
            All water
          </button>
          {WATERFRONT_TYPES.map((t) => (
            <button
              key={t.value}
              onClick={() => update("waterfrontType", waterfrontType === t.value ? "" : t.value)}
              className={`px-4 py-2 text-[0.72rem] uppercase tracking-[0.16em] border transition-colors ${
                waterfrontType === t.value
                  ? "bg-gulf-700 text-white border-gulf-700"
                  : "border-ink-200 text-ink-700 hover:border-ink-400"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Row 2: Price, Beds, Mile Marker */}
      <div className="flex flex-wrap gap-6">
        <div>
          <label className="mb-1 block text-[0.68rem] uppercase tracking-[0.2em] text-ink-400">Min price</label>
          <select
            value={minPrice}
            onChange={(e) => update("minPrice", e.target.value)}
            className="border border-ink-200 bg-paper px-3 py-2 text-[0.78rem] text-ink-950 focus:outline-none focus:border-ink-400"
          >
            {PRICE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-[0.68rem] uppercase tracking-[0.2em] text-ink-400">Max price</label>
          <select
            value={maxPrice}
            onChange={(e) => update("maxPrice", e.target.value)}
            className="border border-ink-200 bg-paper px-3 py-2 text-[0.78rem] text-ink-950 focus:outline-none focus:border-ink-400"
          >
            {PRICE_OPTIONS.slice(1).concat({ label: "No max", value: "" }).map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-[0.68rem] uppercase tracking-[0.2em] text-ink-400">Beds</label>
          <select
            value={minBeds}
            onChange={(e) => update("minBeds", e.target.value)}
            className="border border-ink-200 bg-paper px-3 py-2 text-[0.78rem] text-ink-950 focus:outline-none focus:border-ink-400"
          >
            {BED_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-[0.68rem] uppercase tracking-[0.2em] text-ink-400">Mile marker from</label>
          <input
            type="number"
            min="0"
            max="112"
            value={minMM}
            onChange={(e) => update("minMM", e.target.value)}
            placeholder="0"
            className="w-20 border border-ink-200 bg-paper px-3 py-2 text-[0.78rem] text-ink-950 focus:outline-none focus:border-ink-400"
          />
        </div>
        <div>
          <label className="mb-1 block text-[0.68rem] uppercase tracking-[0.2em] text-ink-400">Mile marker to</label>
          <input
            type="number"
            min="0"
            max="112"
            value={maxMM}
            onChange={(e) => update("maxMM", e.target.value)}
            placeholder="112"
            className="w-20 border border-ink-200 bg-paper px-3 py-2 text-[0.78rem] text-ink-950 focus:outline-none focus:border-ink-400"
          />
        </div>
      </div>

      {/* Row 3: Toggle chips */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => toggle("hasDockage")}
          className={`px-4 py-2 text-[0.72rem] uppercase tracking-[0.16em] border transition-colors ${
            hasDockage ? "bg-ink-950 text-paper border-ink-950" : "border-ink-200 text-ink-700 hover:border-ink-400"
          }`}
        >
          Dockage
        </button>
        <button
          onClick={() => toggle("hasPool")}
          className={`px-4 py-2 text-[0.72rem] uppercase tracking-[0.16em] border transition-colors ${
            hasPool ? "bg-ink-950 text-paper border-ink-950" : "border-ink-200 text-ink-700 hover:border-ink-400"
          }`}
        >
          Pool
        </button>
        <button
          onClick={() => toggle("rentalsAllowed")}
          className={`px-4 py-2 text-[0.72rem] uppercase tracking-[0.16em] border transition-colors ${
            rentalsAllowed ? "bg-ink-950 text-paper border-ink-950" : "border-ink-200 text-ink-700 hover:border-ink-400"
          }`}
        >
          Rentals allowed
        </button>

        {hasAnyFilter && (
          <a
            href="/buy"
            className="ml-4 px-4 py-2 text-[0.72rem] uppercase tracking-[0.16em] text-ink-400 hover:text-ink-700 transition-colors"
          >
            Clear all ×
          </a>
        )}
      </div>
    </div>
  );
}
