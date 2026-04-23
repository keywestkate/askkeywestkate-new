"use client";

import { useState, useTransition, useEffect, useRef } from "react";
import {
  type OnboardingState,
  type Intent,
  type StepId,
  getStepSequence,
  INITIAL_BUYER_STATE,
  INITIAL_SELLER_STATE,
  INITIAL_NEWSLETTER_STATE,
} from "@/components/onboarding/types";
import { StepProgress } from "@/components/onboarding/StepProgress";
import { StepIntro } from "@/components/onboarding/steps/StepIntro";
import { StepIntent } from "@/components/onboarding/steps/StepIntent";
import { StepBuyerIslands } from "@/components/onboarding/steps/StepBuyerIslands";
import { StepBuyerRange } from "@/components/onboarding/steps/StepBuyerRange";
import { StepBuyerMatters } from "@/components/onboarding/steps/StepBuyerMatters";
import { StepBuyerTimeline } from "@/components/onboarding/steps/StepBuyerTimeline";
import { StepBuyerWhy } from "@/components/onboarding/steps/StepBuyerWhy";
import { StepSellerProperty } from "@/components/onboarding/steps/StepSellerProperty";
import { StepSellerStory } from "@/components/onboarding/steps/StepSellerStory";
import { StepNewsletter } from "@/components/onboarding/steps/StepNewsletter";
import { completeOnboarding } from "../actions";

const DRAFT_KEY = "onboarding_draft";

const INITIAL_STATE: OnboardingState = {
  intent: null,
  buyer: INITIAL_BUYER_STATE,
  seller: INITIAL_SELLER_STATE,
  newsletter: INITIAL_NEWSLETTER_STATE,
};

export default function OnboardingPage() {
  const [state, setState] = useState<OnboardingState>(INITIAL_STATE);
  const [stepIndex, setStepIndex] = useState(0);
  // showIntro = true until the user clicks "Let's start →"
  const [showIntro, setShowIntro] = useState(true);
  const [visible, setVisible] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Gate that prevents the save effect from firing before the initial
  // localStorage restore has run — otherwise it would overwrite the draft.
  const restoredRef = useRef(false);

  // ── Restore from localStorage on mount ──────────────────────────────────
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as {
          formState: OnboardingState;
          step: number;
          introSeen?: boolean;
        };
        if (parsed.formState) {
          setState(parsed.formState);
          const maxStep = getStepSequence(parsed.formState.intent).length - 1;
          setStepIndex(Math.min(parsed.step ?? 0, maxStep));
          // If they previously clicked "Let's start", skip the intro on restore
          if (parsed.introSeen) setShowIntro(false);
        }
      }
    } catch {
      // Ignore parse errors or private-browsing restrictions
    }
    restoredRef.current = true;
  }, []);

  // ── Persist to localStorage after every meaningful change ────────────────
  useEffect(() => {
    if (!restoredRef.current) return;
    try {
      localStorage.setItem(
        DRAFT_KEY,
        JSON.stringify({
          formState: state,
          step: stepIndex,
          introSeen: !showIntro,
        })
      );
    } catch {
      // Ignore private-browsing or quota errors
    }
  }, [state, stepIndex, showIntro]);

  // ── Pre-populate newsletter island subscriptions when buyer islands change
  useEffect(() => {
    if (state.intent === "buying" || state.intent === "both") {
      setState((prev) => ({
        ...prev,
        newsletter: {
          ...prev.newsletter,
          islandSubscriptions: prev.buyer.islands,
        },
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.buyer.islands]);

  const steps = getStepSequence(state.intent);
  const currentStepId: StepId = steps[stepIndex] ?? "intent";
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === steps.length - 1;

  function transition(nextIndex: number) {
    setVisible(false);
    setTimeout(() => {
      setStepIndex(nextIndex);
      setVisible(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 180);
  }

  function goForward() {
    if (isLast) {
      handleSubmit();
    } else {
      transition(stepIndex + 1);
    }
  }

  function goBack() {
    if (!isFirst) transition(stepIndex - 1);
  }

  function skipToNewsletter() {
    const newsletterIndex = steps.indexOf("newsletter");
    if (newsletterIndex !== -1) transition(newsletterIndex);
  }

  function handleIntentChange(intent: Intent) {
    setState((prev) => ({ ...prev, intent }));
    if (intent === "browsing") {
      setTimeout(() => transition(1), 80);
    }
  }

  function handleSubmit() {
    setError(null);
    startTransition(async () => {
      const result = await completeOnboarding(state);
      if (result?.error) {
        setError(result.error);
        return;
      }
      // Server action redirects to /onboarding/complete on success.
      // The complete page clears the draft via its own useEffect.
    });
  }

  function canAdvance(): boolean {
    switch (currentStepId) {
      case "intent":
        return state.intent !== null;
      case "buyer_islands":
        return state.buyer.regions.length > 0;
      case "buyer_matters":
        return state.buyer.hasBoat !== null;
      default:
        return true;
    }
  }

  const continueLabel = isLast ? "Finish" : "Continue";

  // ── Intro screen (pre-flow, no step counter) ─────────────────────────────
  if (showIntro) {
    return (
      <div className="mx-auto max-w-2xl px-6 pb-28 pt-36 md:px-8 md:pt-44">
        <div
          className="transition-opacity duration-[180ms]"
          style={{ opacity: visible ? 1 : 0 }}
        >
          <StepIntro onStart={() => setShowIntro(false)} />
        </div>
      </div>
    );
  }

  // ── Multi-step flow ──────────────────────────────────────────────────────
  return (
    <div className="mx-auto max-w-2xl px-6 pb-28 pt-36 md:px-8 md:pt-44">
      <div
        className="transition-opacity duration-[180ms]"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {/* Step progress — counts the flow steps, not the intro */}
        <div className="mb-10">
          <StepProgress current={stepIndex + 1} total={steps.length} />
        </div>

        {/* Step content */}
        {currentStepId === "intent" && (
          <StepIntent state={state} onChange={handleIntentChange} />
        )}
        {currentStepId === "buyer_islands" && (
          <StepBuyerIslands
            buyer={state.buyer}
            onChange={(updates) =>
              setState((prev) => ({ ...prev, buyer: { ...prev.buyer, ...updates } }))
            }
          />
        )}
        {currentStepId === "buyer_range" && (
          <StepBuyerRange
            buyer={state.buyer}
            onChange={(updates) =>
              setState((prev) => ({ ...prev, buyer: { ...prev.buyer, ...updates } }))
            }
          />
        )}
        {currentStepId === "buyer_matters" && (
          <StepBuyerMatters
            buyer={state.buyer}
            onChange={(updates) =>
              setState((prev) => ({ ...prev, buyer: { ...prev.buyer, ...updates } }))
            }
          />
        )}
        {currentStepId === "buyer_timeline" && (
          <StepBuyerTimeline
            buyer={state.buyer}
            onChange={(updates) =>
              setState((prev) => ({ ...prev, buyer: { ...prev.buyer, ...updates } }))
            }
          />
        )}
        {currentStepId === "buyer_why" && (
          <StepBuyerWhy
            buyer={state.buyer}
            onChange={(updates) =>
              setState((prev) => ({ ...prev, buyer: { ...prev.buyer, ...updates } }))
            }
            onSkip={skipToNewsletter}
          />
        )}
        {currentStepId === "seller_property" && (
          <StepSellerProperty
            seller={state.seller}
            onChange={(updates) =>
              setState((prev) => ({ ...prev, seller: { ...prev.seller, ...updates } }))
            }
          />
        )}
        {currentStepId === "seller_story" && (
          <StepSellerStory
            seller={state.seller}
            onChange={(updates) =>
              setState((prev) => ({ ...prev, seller: { ...prev.seller, ...updates } }))
            }
          />
        )}
        {currentStepId === "newsletter" && (
          <StepNewsletter
            state={state}
            newsletter={state.newsletter}
            onChange={(updates) =>
              setState((prev) => ({
                ...prev,
                newsletter: { ...prev.newsletter, ...updates },
              }))
            }
            onAlertFrequencyChange={(value) =>
              setState((prev) => ({
                ...prev,
                buyer: { ...prev.buyer, alertFrequency: value },
              }))
            }
          />
        )}

        {/* Error message */}
        {error && (
          <p className="mt-6 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        {/* Navigation — all steps except intent */}
        {currentStepId !== "intent" && (
          <div className="mt-14 flex items-center justify-between">
            <button
              type="button"
              onClick={goBack}
              disabled={isFirst || isPending}
              className="text-[0.78rem] uppercase tracking-[0.2em] text-ink-500 transition-colors hover:text-ink-950 disabled:opacity-30"
            >
              Back
            </button>

            <button
              type="button"
              onClick={goForward}
              disabled={!canAdvance() || isPending}
              className="bg-ink-950 px-8 py-3.5 text-[0.78rem] uppercase tracking-[0.2em] text-paper transition-opacity hover:opacity-80 disabled:opacity-30"
            >
              {isPending ? "Saving…" : continueLabel}
            </button>
          </div>
        )}

        {/* Intent step — show Continue only after a selection is made */}
        {currentStepId === "intent" &&
          state.intent !== null &&
          state.intent !== "browsing" && (
            <div className="mt-10 flex justify-end">
              <button
                type="button"
                onClick={goForward}
                className="bg-ink-950 px-8 py-3.5 text-[0.78rem] uppercase tracking-[0.2em] text-paper transition-opacity hover:opacity-80"
              >
                Continue
              </button>
            </div>
          )}
      </div>
    </div>
  );
}
