import Link from "next/link";

export function ContactBlock({
  title,
  accent,
}: {
  title: string;
  accent?: string;
}) {
  return (
    <section className="bg-ink-950 px-8 py-28 text-paper md:px-12 md:py-36">
      <div className="mx-auto grid max-w-[1600px] gap-12 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <div className="eyebrow text-paper-warm">Let&rsquo;s talk</div>
          <h2 className="mt-8 font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.92] tracking-[-0.035em] text-paper">
            {title}
            {accent && (
              <span className="block text-gulf-300">{accent}</span>
            )}
          </h2>
        </div>
        <div className="flex flex-col gap-4 md:col-span-4 md:items-end">
          <a
            href="tel:3052407828"
            className="font-display text-3xl tracking-tight text-paper hover:text-gulf-300"
          >
            305.240.7828
          </a>
          <a
            href="mailto:Kate@BluescapeRealEstate.com"
            className="text-sm text-paper-warm hover:text-paper"
          >
            Kate@BluescapeRealEstate.com
          </a>
          <Link
            href="/contact"
            className="mt-4 inline-flex items-center gap-3 border border-paper/50 px-7 py-4 text-[0.78rem] uppercase tracking-[0.22em] text-paper transition hover:bg-paper hover:text-ink-950"
          >
            Book a consultation &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
