import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { ClearDraft } from "./ClearDraft";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Can't Wait to Get Started" };

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

      {/* Full-screen section with blurred background image */}
      <div className="relative flex min-h-screen items-center justify-center px-4 py-20">

        {/* Background image — absolutely fills, blurred + dimmed */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/lifestyle/waterfront/Key-west-florida-keys-kate-baldwin-real-estate-ocean-boat-houses-1.jpg"
            fill
            alt=""
            className="object-cover"
            style={{ filter: "blur(8px)", transform: "scale(1.08)" }}
            priority
          />
          <div className="absolute inset-0 bg-ink-950/20" />
        </div>

        {/* Frosted glass card */}
        <div className="relative z-10 w-full max-w-2xl rounded-lg border border-paper-warm/30 bg-paper/70 p-12 shadow-xl backdrop-blur-md md:p-20">

          <div className="eyebrow mb-6 text-ink-400">You&rsquo;re in</div>

          <h1 className="font-display text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.92] text-ink-950">
            Can&rsquo;t wait to<br />get started!
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

          {/* Contact block */}
          <div className="mt-10 border-t border-ink-200/60 pt-8">
            <div className="eyebrow mb-4 text-ink-400">Reach me anytime</div>
            <a
              href="tel:3052407828"
              className="font-display block text-[clamp(1.6rem,4vw,2.4rem)] tracking-tight text-ink-950 transition-opacity hover:opacity-70"
            >
              305.240.7828
            </a>
            <a
              href="mailto:kate@keywestkate.com"
              className="mt-1 block text-sm text-ink-600 transition-opacity hover:opacity-70"
            >
              kate@keywestkate.com
            </a>
          </div>

          <div className="mt-10">
            <Link
              href="/dashboard"
              className="inline-block bg-ink-950 px-8 py-4 text-[0.78rem] uppercase tracking-[0.2em] text-paper transition-opacity hover:opacity-80"
            >
              Take me to my dashboard &rarr;
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
