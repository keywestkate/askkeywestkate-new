import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { CheckYourEmailContent } from "./CheckYourEmailContent";

export const metadata: Metadata = { title: "Check Your Email" };

export default function CheckYourEmailPage() {
  return (
    <div className="mx-auto grid max-w-[1600px] gap-16 px-8 md:grid-cols-12 md:items-start md:px-12">

      {/* Left — editorial headline */}
      <div className="md:col-span-5 md:pt-4">
        <div className="eyebrow text-ink-500">Almost there</div>
        <h1 className="mt-6 font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-[-0.035em] text-ink-950">
          Check your<br />
          <span className="text-gulf-700">email.</span>
        </h1>
      </div>

      {/* Right — message (reads ?email query param) */}
      <div className="md:col-span-5 md:col-start-8">
        <Suspense fallback={<CheckYourEmailFallback />}>
          <CheckYourEmailContent />
        </Suspense>

        <p className="mt-10 text-sm text-ink-600">
          Wrong address?{" "}
          <Link
            href="/signup"
            className="text-ink-950 underline underline-offset-4 hover:text-gulf-700 transition-colors"
          >
            Start over
          </Link>
        </p>
      </div>

    </div>
  );
}

function CheckYourEmailFallback() {
  return (
    <div className="space-y-5">
      <p className="text-base leading-relaxed text-ink-700">
        I sent a confirmation link to your email address. Click it to verify
        your account and you&rsquo;ll land straight in the onboarding flow.
      </p>
      <p className="text-base leading-relaxed text-ink-700">
        Don&rsquo;t see it? Check your spam folder — it can take a minute or
        two to arrive.
      </p>
    </div>
  );
}
