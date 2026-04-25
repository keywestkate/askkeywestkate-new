import Link from "next/link";

const BENEFITS = [
  {
    label: "Buyer's guide",
    body: "A plain-language breakdown of buying in the Keys — flood zones, insurance, HOAs, what to look for on a boat-first property.",
  },
  {
    label: "Weekly market reports",
    body: "Island-by-island numbers every week: active listings, price shifts, days on market, and what Kate is seeing in real time.",
  },
  {
    label: "Things to do on every island",
    body: "Not the tourist version. A locals' guide to the restaurants, reefs, fishing spots, and morning routines on each island.",
  },
  {
    label: "Waterways guide",
    body: "How to read and navigate the water from each island — channels, cuts, flats, and where the depth goes shallow fast.",
  },
];

export function PortalCTA() {
  return (
    <section className="bg-gulf-700 px-8 py-28 md:px-12 md:py-36">
      <div className="mx-auto max-w-[1600px]">

        <div className="grid gap-16 md:grid-cols-12">

          {/* Left — headline */}
          <div className="md:col-span-5">
            <div className="eyebrow text-paper/50">Client portal</div>
            <h2 className="mt-6 font-display text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[0.95] tracking-[-0.03em] text-paper">
              Create an account.<br />
              Get the inside view.
            </h2>
            <p className="mt-8 max-w-sm text-base leading-relaxed text-paper/70">
              Free to join. No obligation. Everything inside is curated by Kate
              — built for people who are serious about the Keys.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/signup"
                className="bg-paper px-8 py-4 text-[0.78rem] uppercase tracking-[0.2em] text-ink-950 transition-opacity hover:opacity-85"
              >
                Create account &rarr;
              </Link>
              <Link
                href="/login"
                className="border border-paper/30 px-8 py-4 text-[0.78rem] uppercase tracking-[0.2em] text-paper/70 transition-colors hover:border-paper/60 hover:text-paper"
              >
                Log in
              </Link>
            </div>
          </div>

          {/* Right — benefit list */}
          <div className="md:col-span-7">
            <ul className="divide-y divide-paper/10">
              {BENEFITS.map((b, i) => (
                <li key={b.label} className="flex gap-8 py-8 first:pt-0 last:pb-0">
                  <span className="stat-label shrink-0 text-paper/30">
                    / 0{i + 1}
                  </span>
                  <div>
                    <div className="font-display text-[1.25rem] leading-snug text-paper">
                      {b.label}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-paper/60">
                      {b.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
