import Link from "next/link";
import Image from "next/image";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PortalCTA } from "@/components/PortalCTA";
import { VideoCard } from "@/components/VideoCard";

const WATERFRONT = "/images/lifestyle/waterfront";
const FEATURED = [
  `${WATERFRONT}/Key-west-florida-keys-kate-baldwin-real-estate-ocean-boat-houses-1.jpg`,
  `${WATERFRONT}/Key-west-florida-keys-kate-baldwin-real-estate-ocean-boat-houses-10.jpg`,
  `${WATERFRONT}/Key-west-florida-keys-kate-baldwin-real-estate-ocean-boat-houses-20.jpg`,
];

const PILLARS = [
  {
    index: "01",
    label: "Waterfront",
    title: "Homes on the water",
    body:
      "Open-water, canal, and oceanfront homes chosen for the view, the dockage, and the daily ritual of saltwater steps from the kitchen.",
  },
  {
    index: "02",
    label: "Boating",
    title: "A life on the water",
    body:
      "Deep-water dockage, lifts, and boat-ready lots from Key West to Islamorada — matched to the run you want to make on a Sunday morning.",
  },
  {
    index: "03",
    label: "Fishing",
    title: "Flats, reef, offshore",
    body:
      "Homes placed for the fishery you love — bonefish at sunrise, the reef at noon, mahi on the Gulf Stream by afternoon.",
  },
  {
    index: "04",
    label: "Sand Bar Life",
    title: "Your Sunday, waiting",
    body:
      "The Keys is a chain of sand bars, sunsets, and friends you haven\u2019t met yet. I find the home that makes all of it feel effortless.",
  },
];

const JOURNAL = [
  {
    kicker: "Build",
    title: "ROGO, simply explained",
    read: "6 min read",
  },
  {
    kicker: "Market",
    title: "What sold on the water this week",
    read: "3 min read",
  },
  {
    kicker: "Buy",
    title: "Flood insurance in the Keys — real costs",
    read: "8 min read",
  },
];

export default function Home() {
  return (
    <main className="bg-paper text-ink-950">
      <Nav theme="light" />

      {/* HERO — full-bleed video only */}
      <section className="relative h-screen min-h-[600px] w-full overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          playsInline
          poster="/images/hero-poster.jpg"
          loop
        >
          <source src="/api/video/lifestyle/islamorada.mp4" type="video/mp4" />
        </video>

        {/* Left-side headline */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-8 md:px-16">
          <div className="mx-auto max-w-[1600px]">
            <h1 className="font-display text-[clamp(3.5rem,10vw,9rem)] leading-[0.92] tracking-[-0.04em] text-paper [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]">
              Selling a<br />lifestyle.
            </h1>
            <p className="mt-6 max-w-sm text-[1rem] uppercase tracking-[0.12em] font-semibold text-paper [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]">
              You don&rsquo;t move to the Keys for a house.<br />
              You move for the life waiting out your back door.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/buy"
                className="inline-flex items-center gap-3 bg-paper px-7 py-4 text-[0.78rem] uppercase tracking-[0.2em] text-ink-950 transition hover:bg-gulf-100"
              >
                Browse listings &rarr;
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 border border-paper/60 px-7 py-4 text-[0.78rem] uppercase tracking-[0.2em] text-paper transition hover:bg-paper/10"
              >
                Start a conversation
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom row: VideoCard · CTA · Quote */}
        <div className="absolute inset-x-0 bottom-8 px-8 md:bottom-10 md:px-12">
          <div className="mx-auto flex max-w-[1600px] items-end justify-between gap-6">
            {/* Video card — bottom left */}
            <VideoCard label="A day in the Keys" caption="View video" />

            {/* Oval CTA — bottom center */}
            <Link
              href="/buy"
              className="inline-flex items-center justify-center rounded-full border border-paper/60 px-8 py-3 text-[0.78rem] uppercase tracking-[0.2em] text-paper backdrop-blur-sm transition hover:bg-paper hover:text-ink-950"
            >
              Browse listings
            </Link>

            {/* Quote — bottom right */}
            <p className="hidden max-w-[22rem] text-right text-[0.82rem] leading-relaxed text-paper [text-shadow:0_1px_6px_rgba(0,0,0,0.5)] md:block">
              A home on the water is a posture, not a purchase &mdash; a way of
              standing in the world that you&rsquo;ll feel every morning.
            </p>
          </div>
        </div>
      </section>

      {/* ABOUT KATE — homepage teaser */}
      <section className="px-8 py-28 md:px-12 md:py-36">
        <div className="mx-auto grid max-w-[1600px] gap-16 md:grid-cols-12 md:items-center">
          <div className="md:col-span-5">
            <div className="eyebrow">About Kate</div>
            <h2 className="mt-6 font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-[-0.035em] text-ink-950">
              A Key West native.<br />
              <span className="text-gulf-700">Local roots.<br />Global results.</span>
            </h2>
            <Link
              href="/about"
              className="mt-10 inline-flex items-center gap-3 text-[0.78rem] uppercase tracking-[0.22em] text-ink-950 underline-offset-8 hover:underline"
            >
              Read the full story &rarr;
            </Link>
          </div>
          <div className="md:col-span-7">
            <p className="text-base leading-relaxed text-ink-800 md:text-[1.05rem]">
              As a Key West native with over 20 years of local business
              experience, I provide a level of island expertise that is lived,
              not learned. My career spans <strong>41 closings and $43.5M in
              volume</strong> — built on waterfront estates, repeat clients, and
              a deep knowledge of every key from Key West to Marathon.
            </p>
            <p className="mt-6 text-base leading-relaxed text-ink-800 md:text-[1.05rem]">
              Currently a Luxury Specialist at Bluescape Real Estate, I focus
              on the homes that match the life you actually want to live here —
              on the water, close to the boat, with sunsets that never get old.
            </p>
            <div className="mt-12 grid grid-cols-3 gap-8 border-t border-ink-200 pt-10">
              {[
                { label: "Career Volume", value: "$43.5M+" },
                { label: "Closings", value: "41" },
                { label: "Avg. Sale", value: "$1.1M+" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col gap-2">
                  <span className="stat-label text-ink-500">{s.label}</span>
                  <span className="font-display text-[2rem] leading-tight tracking-tight text-ink-950">
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="px-8 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid gap-10 border-t border-ink-200 pt-10 md:grid-cols-4">
            {[
              { label: "Market", value: "Key West · Lower, Middle, Upper" },
              { label: "Niche", value: "Waterfront · Boating · Fishing" },
              { label: "Brokerage", value: "Bluescape Real Estate" },
              { label: "Promise", value: "Selling a lifestyle" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-3">
                <span className="stat-label text-ink-500">{s.label}</span>
                <span className="font-display text-xl leading-tight text-ink-950 md:text-[1.6rem]">
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY — asymmetric, editorial */}
      <section className="bg-paper-soft px-8 py-28 md:px-12 md:py-40">
        <div className="mx-auto grid max-w-[1600px] gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="eyebrow">A note from Kate</div>
            <div className="mt-8 font-display text-[0.85rem] uppercase tracking-[0.22em] text-ink-500">
              / Philosophy
            </div>
          </div>
          <div className="md:col-span-7">
            <p className="font-display text-[clamp(2.25rem,5vw,4.25rem)] leading-[1.02] tracking-[-0.025em] text-ink-950">
              The Keys isn&rsquo;t a zip code. It&rsquo;s a way of living &mdash;
              slower, saltier, surrounded by the people and water you love most.
            </p>
            <p className="mt-10 max-w-2xl text-base leading-relaxed text-ink-800">
              I specialize in homes on the water, built for boating, fishing,
              and family time — the kind of place where weekends stretch into
              weeks and every evening ends with the sky on fire.
            </p>
          </div>
        </div>
      </section>

      {/* PILLARS — numbered, editorial grid */}
      <section className="px-8 py-28 md:px-12 md:py-36">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <div className="eyebrow">What I specialize in</div>
              <h2 className="mt-6 font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-[-0.035em] text-ink-950">
                A home chosen for the life you&rsquo;ll actually live.
              </h2>
            </div>
            <Link
              href="/about"
              className="text-[0.78rem] uppercase tracking-[0.22em] text-ink-800 underline-offset-8 hover:underline"
            >
              How I work &rarr;
            </Link>
          </div>

          <div className="mt-20 grid gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p) => (
              <article key={p.index} className="flex flex-col gap-5">
                <div className="flex items-baseline justify-between">
                  <span className="stat-label text-ink-500">/ {p.index}</span>
                  <span className="stat-label text-gulf-700">{p.label}</span>
                </div>
                <div className="h-px w-full bg-ink-200" />
                <h3 className="font-display text-[1.6rem] leading-[1] tracking-[-0.02em] text-ink-950">
                  {p.title}
                </h3>
                <p className="text-[0.95rem] leading-relaxed text-ink-800">
                  {p.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED LISTINGS — editorial cards */}
      <section className="bg-paper-soft px-8 py-28 md:px-12 md:py-36">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <div className="eyebrow">Currently on market</div>
              <h2 className="mt-6 font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.035em] text-ink-950">
                A curated look at what&rsquo;s available now.
              </h2>
            </div>
            <Link
              href="/buy"
              className="text-[0.78rem] uppercase tracking-[0.22em] text-ink-800 underline-offset-8 hover:underline"
            >
              See all listings &rarr;
            </Link>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {FEATURED.map((src, i) => (
              <article key={src} className="group flex flex-col">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-paper-warm">
                  <Image
                    src={src}
                    alt="Key West waterfront home"
                    fill
                    className="object-cover transition duration-700 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
                  />
                  <div className="absolute inset-0 flex items-end p-6">
                    <span className="stat-label bg-paper/95 px-3 py-1 text-ink-950">
                      Coming soon
                    </span>
                  </div>
                </div>
                <div className="mt-5 flex items-baseline justify-between">
                  <div className="stat-label text-ink-500">Key West</div>
                  <div className="stat-label text-ink-500">/ 0{i + 1}</div>
                </div>
                <div className="mt-3 font-display text-xl leading-snug text-ink-950">
                  Waterfront · dockage
                </div>
                <div className="mt-1 text-sm text-ink-600">
                  Listing reserved for a buyer who knows
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNAL */}
      <section className="px-8 py-28 md:px-12 md:py-36">
        <div className="mx-auto grid max-w-[1600px] gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="eyebrow">The Journal</div>
            <h2 className="mt-6 font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.035em] text-ink-950">
              Build in the Keys.
              <br />
              Buy in the Keys.
              <br />
              <span className="text-gulf-700">Live in the Keys.</span>
            </h2>
            <p className="mt-8 max-w-md text-base leading-relaxed text-ink-800">
              A daily field guide for buyers, builders, and owners. Real numbers
              from the MLS, the honest truth about ROGO and flood zones, and
              the stories that make the Keys the Keys.
            </p>
            <Link
              href="/journal"
              className="mt-10 inline-flex items-center gap-3 text-[0.78rem] uppercase tracking-[0.22em] text-ink-950 underline-offset-8 hover:underline"
            >
              Read the Journal &rarr;
            </Link>
          </div>

          <ul className="md:col-span-7">
            {JOURNAL.map((p, i) => (
              <li
                key={p.title}
                className={`flex items-baseline gap-8 py-8 ${
                  i === 0 ? "border-t border-ink-200" : ""
                } border-b border-ink-200`}
              >
                <span className="stat-label w-24 shrink-0 text-gulf-700">
                  {p.kicker}
                </span>
                <span className="flex-1 font-display text-[1.6rem] leading-[1.05] text-ink-950 md:text-[2rem]">
                  {p.title}
                </span>
                <span className="hidden shrink-0 text-[0.72rem] uppercase tracking-[0.2em] text-ink-500 md:block">
                  {p.read}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CONTACT CTA — asymmetric, oversized */}
      <section className="bg-ink-950 px-8 py-28 text-paper md:px-12 md:py-40">
        <div className="mx-auto grid max-w-[1600px] gap-12 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <div className="eyebrow text-paper-warm">Let&rsquo;s talk</div>
            <h2 className="mt-8 font-display text-[clamp(3rem,8vw,7rem)] leading-[0.92] tracking-[-0.035em] text-paper">
              Tell me the life you want to live.
              <span className="block text-gulf-300">
                I&rsquo;ll help you find it.
              </span>
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

      <PortalCTA />
      <Footer />
    </main>
  );
}
