import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ClearDraft } from "./ClearDraft";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Welcome to the Keys" };

export default async function OnboardingCompletePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("onboarding_completed")
    .eq("id", user.id)
    .single();

  if (!profile?.onboarding_completed) redirect("/onboarding");

  return (
    <>
      <ClearDraft />

      <div className="mx-auto max-w-2xl px-6 pb-28 pt-36 md:px-8 md:pt-44">
        <div className="eyebrow mb-6 text-ink-400">You&rsquo;re in</div>

        <h1 className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.92] text-ink-950">
          Welcome to<br />the Keys.
        </h1>

        <div className="mt-8 max-w-xl space-y-5">
          <p className="text-base leading-relaxed text-ink-700">
            I&rsquo;ll start sending you listings that match within 24 hours.
            Your first market reports go out the first of next month. If
            something comes up that I think you should see before then &mdash;
            you&rsquo;ll hear from me directly.
          </p>
          <p className="text-base italic text-ink-600">&mdash; Kate</p>
        </div>

        <div className="mt-12">
          <Link
            href="/dashboard"
            className="inline-block bg-ink-950 px-8 py-4 text-[0.78rem] uppercase tracking-[0.2em] text-paper transition-opacity hover:opacity-80"
          >
            Take me to my dashboard &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}
