"use client";

import type { NewsletterState, OnboardingState } from "../types";
import { Chip } from "../Chip";

interface Props {
  state: OnboardingState;
  newsletter: NewsletterState;
  onChange: (updates: Partial<NewsletterState>) => void;
  onAlertFrequencyChange: (value: string) => void;
}

const ALERT_OPTIONS = [
  { label: "The moment they go live", value: "instant" },
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Every two weeks", value: "biweekly" },
  { label: "Don't send me listings", value: "none" },
];

export function StepNewsletter({ state, newsletter, onChange, onAlertFrequencyChange }: Props) {
  const isBuyer = state.intent === "buying" || state.intent === "both";
  const buyerIslands = state.buyer.islands;

  function toggleIsland(island: string) {
    const next = newsletter.islandSubscriptions.includes(island)
      ? newsletter.islandSubscriptions.filter((i) => i !== island)
      : [...newsletter.islandSubscriptions, island];
    onChange({ islandSubscriptions: next });
  }

  return (
    <div>
      <h1 className="font-display text-[clamp(2.8rem,7vw,6rem)] text-ink-950">
        Stay in the loop.
      </h1>

      <div className="mt-10 space-y-10">
        {/* Tide News */}
        <div>
          <div className="eyebrow mb-2 text-ink-400">The Newsletter</div>
          <p className="mb-5 text-base text-ink-700 leading-relaxed">
            Get Tide News in your inbox — local stories, market signal, and the unfiltered Keys.
          </p>
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={newsletter.subscribeTideNews}
              onChange={(e) => onChange({ subscribeTideNews: e.target.checked })}
              className="mt-0.5 h-4 w-4 accent-ink-950"
            />
            <span className="text-sm text-ink-700">Send me Tide News</span>
          </label>
        </div>

        {/* Per-island market reports */}
        <div className="border-t border-ink-200 pt-10">
          <div className="eyebrow mb-2 text-ink-400">Island Market Reports</div>
          <p className="mb-5 text-base text-ink-700 leading-relaxed">
            Monthly market reports for the islands you care about.
          </p>

          {buyerIslands.length > 0 ? (
            <div className="flex flex-wrap gap-2.5">
              {buyerIslands.map((island) => (
                <Chip
                  key={island}
                  label={island}
                  selected={newsletter.islandSubscriptions.includes(island)}
                  onClick={() => toggleIsland(island)}
                />
              ))}
            </div>
          ) : (
            <p className="text-sm italic text-ink-400">
              You&rsquo;ll be able to subscribe to island reports from the dashboard.
            </p>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="eyebrow text-ink-400">Frequency</div>
            <div className="flex gap-2.5">
              {(["monthly", "weekly"] as const).map((f) => (
                <Chip
                  key={f}
                  label={f.charAt(0).toUpperCase() + f.slice(1)}
                  selected={newsletter.frequency === f}
                  onClick={() => onChange({ frequency: f })}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Listing alerts — buyers only */}
        {isBuyer && (
          <div className="border-t border-ink-200 pt-10">
            <div className="eyebrow mb-2 text-ink-400">New Listing Alerts</div>
            <p className="mb-5 text-base text-ink-700 leading-relaxed">
              How often do you want new listings?
            </p>
            <div className="flex flex-wrap gap-2.5">
              {ALERT_OPTIONS.map((opt) => (
                <Chip
                  key={opt.value}
                  label={opt.label}
                  selected={state.buyer.alertFrequency === opt.value}
                  onClick={() => onAlertFrequencyChange(opt.value)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
