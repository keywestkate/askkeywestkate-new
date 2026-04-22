"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signup } from "../actions";

const initialState = { error: null };

export default function SignupPage() {
  const [state, formAction, pending] = useActionState(signup, initialState);

  return (
    <div className="mx-auto grid max-w-[1600px] gap-16 px-8 md:grid-cols-12 md:items-start md:px-12">

      {/* Left — editorial headline */}
      <div className="md:col-span-5 md:pt-4">
        <div className="eyebrow text-ink-500">Client Portal</div>
        <h1 className="mt-6 font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-[-0.035em] text-ink-950">
          Start<br />
          <span className="text-gulf-700">here.</span>
        </h1>
        <p className="mt-8 max-w-sm text-base leading-relaxed text-ink-800">
          Create a free account to save your favorite properties, receive
          curated market updates, and connect with Kate directly.
        </p>
      </div>

      {/* Right — form */}
      <div className="md:col-span-5 md:col-start-8">
        <form action={formAction} className="flex flex-col gap-6">

          {state?.error && (
            <p className="text-sm italic text-ink-800 border-l-2 border-gulf-700 pl-4">
              {state.error}
            </p>
          )}

          <div className="flex flex-col gap-2">
            <label
              htmlFor="full_name"
              className="stat-label text-ink-600"
            >
              Full Name
            </label>
            <input
              id="full_name"
              name="full_name"
              type="text"
              autoComplete="name"
              required
              className="border border-ink-200 bg-paper px-4 py-3 text-sm text-ink-950 placeholder:text-ink-300 focus:border-ink-950 focus:outline-none transition-colors"
              placeholder="Jane Smith"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="stat-label text-ink-600"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="border border-ink-200 bg-paper px-4 py-3 text-sm text-ink-950 placeholder:text-ink-300 focus:border-ink-950 focus:outline-none transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="stat-label text-ink-600"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              className="border border-ink-200 bg-paper px-4 py-3 text-sm text-ink-950 placeholder:text-ink-300 focus:border-ink-950 focus:outline-none transition-colors"
              placeholder="8+ characters"
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="mt-2 inline-flex items-center justify-center bg-ink-950 px-7 py-4 text-[0.78rem] uppercase tracking-[0.2em] text-paper transition hover:bg-gulf-700 disabled:opacity-50"
          >
            {pending ? "Creating account…" : "Create account →"}
          </button>

        </form>

        <p className="mt-8 text-sm text-ink-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-ink-950 underline underline-offset-4 hover:text-gulf-700 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>

    </div>
  );
}
