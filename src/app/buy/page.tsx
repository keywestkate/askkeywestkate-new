import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { ContactBlock } from "@/components/ContactBlock";
import { PortalCTA } from "@/components/PortalCTA";

const WATERFRONT = "/images/lifestyle/waterfront";
const HERO_PHOTO = `${WATERFRONT}/Key-west-florida-keys-kate-baldwin-real-estate-ocean-boat-houses-5.jpg`;
const LISTING_PHOTOS = [2, 7, 12, 17, 22, 26].map(
  (n) =>
    `${WATERFRONT}/Key-west-florida-keys-kate-baldwin-real-estate-ocean-boat-houses-${n}.jpg`,
);

export const metadata: Metadata = {
  title: "Buy a Home in the Keys",
  description:
    "Waterfront, canal, and oceanfront homes across Key West and the Florida Keys. Curated by Kate Baldwin of Bluescape Real Estate.",
};

const COLLECTIONS = [
  {
    index: "01",
    label: "Open Water",
    title: "Oceanfront & Gulf-front",
    body:
      "Unobstructed water, private beaches or seawall, open-water sunrises and sunsets from your own kitchen.",
  },
  {
    index: "02",
    label: "Canal",
    title: "Canal homes with dockage",
    body:
      "Deep-water canal homes with lifts, davits, and fast runs to open water. Built for the boat-first buyer.",
  },
  {
    index: "03",
    label: "Old Town",
    title: "Historic Key West",
    body:
      "Conch houses, Bahamian cottages, and gated compounds in Old Town, Casa Marina, and Truman Annex.",
  },
  {
    index: "04",
    label: "New Build",
    title: "New construction",
    body:
      "Modern, elevated, hurricane-code homes from Stock Island through Islamorada. Ready now or coming soon.",
  },
];

const FILTERS = [
  "Waterfront",
  "Canal dockage",
  "Oceanfront",
  "Open water",
  "Pool",
  "Guest house",
  "Elevation VE/AE",
  "STR-eligible",
];

export default function Buy() {
  return (
    <main className="bg-paper text-ink-950">
      <Nav />

      <PageHero
        metaLeft={
          <>
            Buy · Key West · Florida Keys
            <br />
            Waterfront · Boating · Fishing
          </>
        }
        metaRight={
          <>
            Curated by Kate Baldwin
            <br />
            Bluescape Real Estate
          </>
        }
        title={
          <>
            Find your
            <br />
            waterfront.
          </>
        }
        subtitle="Every home in the Keys tells you how you'll spend your Saturday. I show you the ones worth spending them in."
        rightColumn={
          <div className="flex flex-wrap gap-3 md:justify-end">
            {FILTERS.map((f) => (
              <span
                key={f}
                className="border border-ink-200 px-4 py-2 text-[0.72rem] uppercase tracking-[0.18em] text-ink-800"
              >
                {f}
              </span>
            ))}
          </div>
        }
      />

      {/* FULL-BLEED hero image */}
      <section className="px-8 md:px-12">
        <div className="relative mx-auto aspect-[16/7] w-full max-w-[1600px] overflow-hidden bg-paper-warm">
          <Image
            src={HERO_PHOTO}
            alt="Key West waterfront homes"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1600px"
            priority
          />
        </div>
      </section>

      {/* COLLECTIONS */}
      <section className="px-8 py-28 md:px-12 md:py-36">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <div className="eyebrow">The collections</div>
              <h2 className="mt-6 font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-[-0.035em] text-ink-950">
                Homes grouped by how you want to live.
              </h2>
            </div>
          </div>
          <div className="mt-20 grid gap-x-10 gap-y-14 md:grid-cols-2">
            {COLLECTIONS.map((c) => (
              <article
                key={c.index}
                className="group flex flex-col gap-5 border-t border-ink-200 pt-8"
              >
                <div className="flex items-baseline justify-between">
                  <span className="stat-label text-ink-500">/ {c.index}</span>
                  <span className="stat-label text-gulf-700">{c.label}</span>
                </div>
                <h3 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1] tracking-[-0.02em] text-ink-950">
                  {c.title}
                </h3>
                <p className="max-w-xl text-[0.98rem] leading-relaxed text-ink-800">
                  {c.body}
                </p>
                <Link
                  href="/contact"
                  className="mt-3 inline-flex text-[0.78rem] uppercase tracking-[0.22em] text-ink-950 underline-offset-8 hover:underline"
                >
                  Explore &rarr;
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED LISTINGS placeholder */}
      <section className="bg-paper-soft px-8 py-28 md:px-12 md:py-36">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <div className="eyebrow">Currently on market</div>
              <h2 className="mt-6 font-display text-[clamp(2.25rem,5vw,4rem)] leading-[0.95] tracking-[-0.035em] text-ink-950">
                This week&rsquo;s shortlist.
              </h2>
            </div>
            <span className="stat-label text-ink-500">Feed coming soon</span>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {LISTING_PHOTOS.map((src, i) => (
              <article key={src} className="group flex flex-col">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-paper-warm">
                  <Image
                    src={src}
                    alt="Key West waterfront listing"
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
                  <div className="stat-label text-ink-500">
                    / {String(i + 1).padStart(2, "0")}
                  </div>
                </div>
                <div className="mt-3 font-display text-xl leading-snug text-ink-950">
                  Waterfront · dockage
                </div>
                <div className="mt-1 text-sm text-ink-600">
                  Reserved for a buyer who knows
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <PortalCTA />
      <ContactBlock
        title="Tell me what your Saturday looks like."
        accent="I&rsquo;ll show you the home that fits it."
      />
      <Footer />
    </main>
  );
}
