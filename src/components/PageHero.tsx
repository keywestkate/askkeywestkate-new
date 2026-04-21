import type { ReactNode } from "react";

type PageHeroProps = {
  eyebrow?: string;
  metaLeft?: ReactNode;
  metaRight?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  rightColumn?: ReactNode;
};

export function PageHero({
  eyebrow,
  metaLeft,
  metaRight,
  title,
  subtitle,
  rightColumn,
}: PageHeroProps) {
  return (
    <section className="relative px-8 pt-32 pb-16 md:px-12 md:pt-40 md:pb-24">
      <div className="mx-auto max-w-[1600px]">
        {(metaLeft || metaRight) && (
          <div className="mb-14 flex flex-wrap items-start justify-between gap-6 text-[0.72rem] uppercase tracking-[0.22em] text-ink-600">
            <div className="max-w-[22rem]">{metaLeft}</div>
            <div className="text-right">{metaRight}</div>
          </div>
        )}
        {eyebrow && <div className="eyebrow mb-8">{eyebrow}</div>}
        <h1 className="font-display text-[clamp(3rem,10vw,9rem)] leading-[0.92] tracking-[-0.04em] text-ink-950">
          {title}
        </h1>
        {(subtitle || rightColumn) && (
          <div className="mt-14 grid gap-10 md:grid-cols-12 md:items-end">
            {subtitle && (
              <div className="md:col-span-6">
                <p className="max-w-xl text-base leading-relaxed text-ink-800 md:text-[1.05rem]">
                  {subtitle}
                </p>
              </div>
            )}
            {rightColumn && (
              <div className="md:col-span-6 md:justify-self-end">
                {rightColumn}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
