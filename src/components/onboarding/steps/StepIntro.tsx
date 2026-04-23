"use client";

interface Props {
  onStart: () => void;
}

export function StepIntro({ onStart }: Props) {
  return (
    <div>
      <div className="eyebrow mb-6 text-ink-400">Before we start</div>
      <h1 className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.92] text-ink-950">
        This is a process.<br />Let&rsquo;s enjoy it.
      </h1>

      <div className="mt-8 max-w-xl space-y-5">
        <p className="text-base leading-relaxed text-ink-700">
          I know this is a lot to ask up front. But it&rsquo;s how I can send
          you properties that actually fit your life — not just whatever matches
          a price filter. Areas can be tricky. If you don&rsquo;t know the Keys
          yet, no problem — that&rsquo;s what I&rsquo;m here for.
        </p>
        <p className="text-sm italic leading-relaxed text-ink-700">
          Together, we&rsquo;ll find the perfect fit — the right home, the right
          island. This isn&rsquo;t a game. It&rsquo;s a process. And we&rsquo;ll
          enjoy it.
        </p>
        <p className="text-sm italic text-ink-600">&mdash; Kate</p>
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
