"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { OnboardingState } from "@/components/onboarding/types";

export async function completeOnboarding(
  state: OnboardingState
): Promise<{ error: string } | void> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (!user) {
    // Log the full auth state server-side so we can see what happened.
    // Check the terminal running `npm run dev` for these lines.
    console.error("[completeOnboarding] getUser returned no user.", {
      hasAuthError: !!authError,
      authErrorMessage: authError?.message ?? null,
      authErrorStatus: authError?.status ?? null,
    });
    // Redirect to login with returnTo so the user comes back after re-auth.
    // Their form data is preserved in localStorage (see onboarding page).
    redirect("/login?returnTo=/onboarding");
  }

  const { intent, buyer, seller, newsletter } = state;

  try {
    // ── 1. Update profile ──────────────────────────────────────────────────
    const userType =
      intent === "buying"
        ? "buyer"
        : intent === "selling"
          ? "seller"
          : intent === "both"
            ? "both"
            : "browsing";

    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        user_type: userType,
        onboarding_completed: true,
      })
      .eq("id", user.id);

    if (profileError) throw profileError;

    // ── 2. Buyer preferences ───────────────────────────────────────────────
    if (intent === "buying" || intent === "both") {
      const boatNotes =
        buyer.hasBoat && buyer.hasBoat !== "no"
          ? {
              has_boat: buyer.hasBoat,
              length_ft: buyer.boatLength ? Number(buyer.boatLength) : null,
              draft_ft: buyer.boatDraft,
              type: buyer.boatType || null,
              boating_types: buyer.boatingTypes,
            }
          : { has_boat: buyer.hasBoat };

      const notesPayload = JSON.stringify({
        why_the_keys: buyer.whyTheKeys || null,
        boat: boatNotes,
        needs_lender_referral:
          buyer.financing === "needs_lender" ? buyer.needsLenderReferral : false,
        region_notes:
          buyer.regions.includes("not_sure")
            ? "needs region guidance"
            : buyer.regions.join(", ") || null,
      });

      const { error: buyerError } = await supabase
        .from("buyer_preferences")
        .upsert(
          {
            user_id: user.id,
            islands: buyer.islands.length > 0 ? buyer.islands : null,
            price_min: buyer.priceMin ? parseInt(buyer.priceMin, 10) : null,
            price_max: buyer.priceMax ? parseInt(buyer.priceMax, 10) : null,
            bedrooms_min: buyer.bedroomsMin,
            must_haves: buyer.mustHaves.length > 0 ? buyer.mustHaves : null,
            timeline: buyer.timeline,
            financing: buyer.financing,
            purchase_purpose: buyer.purchasePurpose,
            is_first_time_buyer: buyer.isFirstTimeBuyer,
            alert_frequency: buyer.alertFrequency,
            notes: notesPayload,
          },
          { onConflict: "user_id" }
        );

      if (buyerError) throw buyerError;
    }

    // ── 3. Seller properties ───────────────────────────────────────────────
    if (intent === "selling" || intent === "both") {
      const estimatedCents = seller.estimatedValue
        ? Math.round(parseFloat(seller.estimatedValue) * 100)
        : null;

      const { error: sellerError } = await supabase
        .from("seller_properties")
        .insert({
          user_id: user.id,
          address: seller.address || null,
          island: seller.island || null,
          current_use: seller.currentUse,
          timeline_to_sell: seller.timelineToSell,
          estimated_value_cents: estimatedCents,
          reason_for_selling: seller.reasonForSelling || null,
          needs_consultation: seller.needsConsultation,
          notes: seller.favoriteMemory
            ? JSON.stringify({ favorite_memory: seller.favoriteMemory })
            : null,
        });

      if (sellerError) throw sellerError;
    }

    // ── 4. Newsletter subscriptions ────────────────────────────────────────
    const subscriptionRows: {
      user_id: string;
      island: string;
      frequency: string;
    }[] = [];

    if (newsletter.subscribeTideNews) {
      subscriptionRows.push({
        user_id: user.id,
        island: "__newsletter__",
        frequency: newsletter.frequency,
      });
    }

    for (const island of newsletter.islandSubscriptions) {
      subscriptionRows.push({
        user_id: user.id,
        island,
        frequency: newsletter.frequency,
      });
    }

    if (subscriptionRows.length > 0) {
      const { error: newsletterError } = await supabase
        .from("newsletter_subscriptions")
        .upsert(subscriptionRows, { onConflict: "user_id,island" });

      if (newsletterError) throw newsletterError;
    }

    // ── 5. Activity log ────────────────────────────────────────────────────
    await supabase.from("activity_log").insert({
      user_id: user.id,
      event_type: "onboarding_completed",
      metadata: {
        user_type: userType,
        has_buyer_prefs: intent === "buying" || intent === "both",
        has_seller_prop: intent === "selling" || intent === "both",
      },
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Something went wrong. Please try again.";
    console.error("[completeOnboarding] DB write failed:", err);
    return { error: message };
  }

  redirect("/dashboard");
}
