"use client";

import { useSearchParams } from "next/navigation";

export function CheckYourEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";

  return (
    <div className="space-y-5">
      <p className="text-base leading-relaxed text-ink-700">
        I sent a confirmation link to{" "}
        {email ? (
          <strong className="text-ink-950">{email}</strong>
        ) : (
          "your email address"
        )}
        . Click it to verify your account and you&rsquo;ll land straight in
        the onboarding flow.
      </p>
      <p className="text-base leading-relaxed text-ink-700">
        Don&rsquo;t see it? Check your spam folder — it can take a minute or
        two to arrive.
      </p>
    </div>
  );
}
