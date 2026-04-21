import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { ContactBlock } from "@/components/ContactBlock";

const NEIGHBORHOODS_HERO =
  "/images/lifestyle/waterfront/Key-west-florida-keys-kate-baldwin-real-estate-ocean-boat-houses-27.jpg";

export const metadata: Metadata = {
  title: "Neighborhoods",
  description:
    "Key West, the Lower Keys, the Middle Keys, and the Upper Keys — island by island, lifestyle by lifestyle.",
};

const GROUPS = [
  {
    region: "Key West",
    kicker: "Mile 0",
    places: [
      {
        name: "Old Town",
        note: "Conch houses, gas lanterns, and a walk to everything.",
      },
      {
        name: "Casa Marina",
        note: "Beachside quiet a few blocks from Duval, ocean out your door.",
      },
      {
        name: "Truman Annex",
        note: "Gated, manicured, steps from the seaport.",
      },
      {
        name: "Key Haven",
        note: "Boating community of Key West. Canals, lifts, quick runs.",
      },
    ],
  },
  {
    region: "Lower Keys",
    kicker: "Mile 9–29",
    places: [
      {
        name: "Stock Island",
        note: "Working-waterfront energy turning into new-build luxury.",
      },
      {
        name: "Big Coppitt · Shark Key",
        note: "Family neighborhoods with deep-water dockage options.",
      },
      {
        name: "Sugarloaf · Summerland · Cudjoe",
        note: "Open-water, flats-adjacent, quiet island living.",
      },
      {
        name: "Big Pine · No Name",
        note: "Key deer, old Keys feel, value per waterfront foot.",
      },
    ],
  },
  {
    region: "Middle Keys",
    kicker: "Mile 40–63",
    places: [
      {
        name: "Marathon",
        note: "Airport, marinas, and Sombrero Beach — the Keys&rsquo; hub.",
      },
      {
        name: "Duck Key · Hawks Cay",
        note: "Resort-adjacent living with private island character.",
      },
      {
        name: "Key Colony Beach",
        note: "Walkable grid, canals, and a beach club feel.",
      },
    ],
  },
  {
    region: "Upper Keys",
    kicker: "Mile 72–112",
    places: [
      {
        name: "Islamorada",
        note: "The sport-fishing capital. World-class flats and offshore.",
      },
      {
        name: "Plantation Key · Windley",
        note: "Classic Keys estates, generational families, deep-water.",
      },
      {
        name: "Key Largo",
        note: "Fastest drive from Miami, reef diving, Everglades access.",
      },
    ],
  },
];

export default function Neighborhoods() {
  return (
    <main className="bg-paper text-ink-950">
      <Nav />

      <PageHero
        eyebrow="Island by island"
        metaLeft={
          <>
            Key West · Lower · Middle · Upper Keys
            <br />
            Mile 0 to Mile 112
          </>
        }
        metaRight={
          <>
            Curated field guide
            <br />
            by Kate Baldwin
          </>
        }
        title={
          <>
            The Keys,
            <br />
            island by island.
          </>
        }
        subtitle="Every island has its own rhythm. Old Town is a walk to coffee; Sugarloaf is a morning on the flats; Islamorada is a world-class sport-fishing address. Here's how to think about each one."
      />

      <section className="px-8 md:px-12">
        <div className="relative mx-auto aspect-[16/7] w-full max-w-[1600px] overflow-hidden bg-paper-warm">
          <Image
            src={NEIGHBORHOODS_HERO}
            alt="The Florida Keys chain from above"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1600px"
            priority
          />
        </div>
      </section>

      <section className="px-8 py-28 md:px-12 md:py-36">
        <div className="mx-auto max-w-[1600px] space-y-24">
          {GROUPS.map((g) => (
            <div key={g.region}>
              <div className="flex items-baseline justify-between border-b border-ink-200 pb-6">
                <h2 className="font-display text-[clamp(2rem,5vw,3.75rem)] leading-[0.95] tracking-[-0.03em] text-ink-950">
                  {g.region}
                </h2>
                <span className="stat-label text-gulf-700">{g.kicker}</span>
              </div>
              <div className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
                {g.places.map((p, i) => (
                  <article key={p.name} className="flex flex-col gap-4">
                    <span className="stat-label text-ink-500">
                      / 0{i + 1}
                    </span>
                    <h3 className="font-display text-[1.4rem] leading-tight text-ink-950">
                      {p.name}
                    </h3>
                    <p className="text-sm leading-relaxed text-ink-800">
                      {p.note}
                    </p>
                    <Link
                      href="/contact"
                      className="mt-1 text-[0.72rem] uppercase tracking-[0.22em] text-ink-950 underline-offset-8 hover:underline"
                    >
                      Ask Kate &rarr;
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <ContactBlock
        title="Not sure which island is yours?"
        accent="Let me help you feel them out."
      />
      <Footer />
    </main>
  );
}
