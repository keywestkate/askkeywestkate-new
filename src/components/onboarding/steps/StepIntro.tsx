"use client";

interface Props {
  onStart: () => void;
}

export function StepIntro({ onStart }: Props) {
  return (
    <div>
      <div className="eyebrow mb-6 text-ink-400">Before we start</div>
      <h1 className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.92] text-ink-950">
        Three minutes.<br />Then we&rsquo;re off.
      </h1>

      <div className="mt-8 max-w-xl space-y-5">
        <p className="text-base leading-relaxed text-ink-700">
          The more honest you are about what you want — and what you might love
          that you don&rsquo;t know you want yet — the better I can find it for
          you. The questions are specific because the homes I&rsquo;ll send you
          will be too.
        </p>
        <p className="text-base leading-relaxed text-ink-700">
          You&rsquo;ll get listings the moment they hit the market, market
          reports for the islands you care about, and a quiet inbox the rest of
          the time.
        </p>
      </div>

      <div className="mt-12">
        <button
          type="button"
          onClick={onStart}
          className="bg-ink-950 px-8 py-4 text-[0.78rem] uppercase tracking-[0.2em] text-paper transition-opacity hover:opacity-80"
        >
          Let&rsquo;s start &rarr;
        </button>
      </div>
    </div>
  );
}
