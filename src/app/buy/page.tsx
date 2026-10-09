import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { ContactBlock } from "@/components/ContactBlock";
import { PortalCTA } from "@/components/PortalCTA";
import { ListingCard } from "@/components/ListingCard";
import { ListingFilters } from "@/components/ListingFilters";
import { getListings, type ListingSearchParams } from "@/lib/spark";

const WATERFRONT = "/images/lifestyle/waterfront";
const HERO_PHOTO = `${WATERFRONT}/Key-west-florida-keys-kate-baldwin-real-estate-ocean-boat-houses-5.jpg`;

export const metadata: Metadata = {
  title: "Buy a Home in the Keys",
  description:
    "Waterfront, canal, and oceanfront homes across Key West and the Florida Keys. Curated by Kate Baldwin of Coastal Collection Real Estate.",
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

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function sp(val: string | string[] | undefined): string | undefined {
  return Array.isArray(val) ? val[0] : val;
}

export default async function Buy({ searchParams }: PageProps) {
  const params = await searchParams;

  const filterParams: ListingSearchParams = {
    limit: 24,
    status: "Active",
  };

  const minPrice = sp(params.minPrice);
  const maxPrice = sp(params.maxPrice);
  const minBeds = sp(params.minBeds);
  const waterfrontType = sp(params.waterfrontType) as ListingSearchParams["waterfrontType"];
  const hasDockage = sp(params.hasDockage);
  const minMM = sp(params.minMM);
  const maxMM = sp(params.maxMM);
  const rentalsAllowed = sp(params.rentalsAllowed);
  const hasPool = sp(params.hasPool);

  if (minPrice) filterParams.minPrice = Number(minPrice);
  if (maxPrice) filterParams.maxPrice = Number(maxPrice);
  if (minBeds) filterParams.minBeds = Number(minBeds);
  if (waterfrontType) filterParams.waterfrontType = waterfrontType;
  if (hasDockage === "1") filterParams.hasDockage = true;
  if (minMM) filterParams.minMileMarker = Number(minMM);
  if (maxMM) filterParams.maxMileMarker = Number(maxMM);
  if (rentalsAllowed === "1") filterParams.rentalsAllowed = true;
  if (hasPool === "1") filterParams.hasPool = true;

  const hasFilters = Object.keys(filterParams).length > 2; // beyond limit+status

  const { listings } = await getListings(filterParams);

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
            Coastal Collection Real Estate
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
            {["Waterfront", "Canal dockage", "Oceanfront", "Open water", "Pool", "Guest house", "Elevation VE/AE", "STR-eligible"].map((f) => (
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

      {/* LIVE LISTINGS */}
      <section className="bg-paper-soft px-8 py-28 md:px-12 md:py-36">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <div className="eyebrow">Currently on market</div>
              <h2 className="mt-6 font-display text-[clamp(2.25rem,5vw,4rem)] leading-[0.95] tracking-[-0.035em] text-ink-950">
                This week&rsquo;s shortlist.
              </h2>
            </div>
            <span className="stat-label text-ink-500">
              {listings.length} listing{listings.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Filters */}
          <div className="mt-10">
            <ListingFilters currentParams={params} />
          </div>

          {listings.length > 0 ? (
            <div className="mt-12 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
              {listings.map((listing, i) => (
                <ListingCard key={listing.ListingKey} listing={listing} index={i} />
              ))}
            </div>
          ) : (
            <div className="mt-12 rounded-lg border border-ink-200 bg-paper px-8 py-16 text-center">
              <p className="text-ink-500">
                {hasFilters
                  ? "No listings match your filters. Try adjusting your search."
                  : "Check back soon — new listings are updated daily."}
              </p>
              <div className="mt-6 flex justify-center gap-4">
                {hasFilters && (
                  <Link
                    href="/buy"
                    className="inline-block border border-ink-950 px-8 py-3 text-[0.78rem] uppercase tracking-[0.2em] text-ink-950 hover:opacity-60"
                  >
                    Clear filters
                  </Link>
                )}
                <Link
                  href="/contact"
                  className="inline-block bg-ink-950 px-8 py-3 text-[0.78rem] uppercase tracking-[0.2em] text-paper hover:opacity-80"
                >
                  Tell me what you&rsquo;re looking for &rarr;
                </Link>
              </div>
            </div>
          )}
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
