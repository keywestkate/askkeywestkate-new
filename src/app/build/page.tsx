import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { ContactBlock } from "@/components/ContactBlock";

const BUILD_HERO =
  "/images/lifestyle/waterfront/Key-west-florida-keys-kate-baldwin-real-estate-ocean-boat-houses-22.jpg";

export const metadata: Metadata = {
  title: "Build in the Keys",
  description:
    "Everything a Florida Keys buyer or owner needs to know about ROGO, FEMA flood zones, elevation, hurricane code, and cost-to-build — straight, current, local.",
};

const TOPICS = [
  {
    index: "01",
    label: "ROGO",
    title: "The Rate of Growth Ordinance",
    body:
      "Monroe County limits new residential building permits through ROGO. Understanding the allocation system, the waitlist, and how existing tear-downs change the math is the first conversation.",
  },
  {
    index: "02",
    label: "FEMA",
    title: "Flood zones: VE, AE, X",
    body:
      "Every lot has a zone — and that zone determines your base flood elevation, your foundation, and your insurance for the life of the home.",
  },
  {
    index: "03",
    label: "Elevation",
    title: "How high you must build",
    body:
      "Base flood elevation plus Monroe County freeboard. What that means for ceiling heights, ground-level use, and views from the main floor.",
  },
  {
    index: "04",
    label: "Hurricane code",
    title: "Building for the wind",
    body:
      "Miami-Dade HVHZ-grade impact glass, tie-downs, and roof systems. The right build now is the lowest insurance premium forever.",
  },
  {
    index: "05",
    label: "Cost",
    title: "What it actually costs",
    body:
      "Per-square-foot ranges for the Lower, Middle, and Upper Keys — with the soft costs nobody quotes you up front.",
  },
  {
    index: "06",
    label: "Docks",
    title: "Dock permits & DEP",
    body:
      "What&rsquo;s permissible in your canal or open-water zone, which reviews trigger FDEP, and how to shape the build for the boat you want.",
  },
];

export default function Build() {
  return (
    <main className="bg-paper text-ink-950">
      <Nav />

      <PageHero
        eyebrow="The field guide"
        metaLeft={
          <>
            Build · Monroe County
            <br />
            ROGO · FEMA · HVHZ · DEP
          </>
        }
        metaRight={
          <>
            Written, vetted, and updated
            <br />
            by Kate Baldwin
          </>
        }
        title={
          <>
            Build in
            <br />
            the Keys.
          </>
        }
        subtitle="Building in the Keys isn't like building anywhere else. Permits are limited, zones are real, and the home you sketch on a napkin won't always be the home the county lets you build. Here's the straight version."
      />

      <section className="px-8 md:px-12">
        <div className="relative mx-auto aspect-[16/7] w-full max-w-[1600px] overflow-hidden bg-paper-warm">
          <Image
            src={BUILD_HERO}
            alt="Florida Keys waterfront build site"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1600px"
            priority
          />
        </div>
      </section>

      {/* TOPICS GRID */}
      <section className="px-8 py-28 md:px-12 md:py-36">
        <div className="mx-auto max-w-[1600px]">
          <div className="eyebrow">What you need to understand</div>
          <h2 className="mt-6 font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-[-0.035em] text-ink-950">
            Six conversations before you break ground.
          </h2>
          <div className="mt-20 grid gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {TOPICS.map((t) => (
              <article
                key={t.index}
                className="flex flex-col gap-5 border-t border-ink-200 pt-8"
              >
                <div className="flex items-baseline justify-between">
                  <span className="stat-label text-ink-500">/ {t.index}</span>
                  <span className="stat-label text-gulf-700">{t.label}</span>
                </div>
                <h3 className="font-display text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.05] tracking-[-0.02em] text-ink-950">
                  {t.title}
                </h3>
                <p className="text-[0.95rem] leading-relaxed text-ink-800">
                  {t.body}
                </p>
                <Link
                  href="/journal"
                  className="mt-2 inline-flex text-[0.78rem] uppercase tracking-[0.22em] text-ink-950 underline-offset-8 hover:underline"
                >
                  Read the article &rarr;
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* NETWORK */}
      <section className="bg-paper-soft px-8 py-28 md:px-12 md:py-36">
        <div className="mx-auto grid max-w-[1600px] gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="eyebrow">The network</div>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-800">
              Architects, engineers, general contractors, surveyors, marine
              builders, insurance brokers — the right team is the difference
              between a two-year build and a five-year build.
            </p>
          </div>
          <div className="md:col-span-7">
            <p className="font-display text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.05] tracking-[-0.025em] text-ink-950">
              I&rsquo;ll introduce you to the professionals who know how to
              build in the Keys, not the ones who just say yes.
            </p>
          </div>
        </div>
      </section>

      <ContactBlock
        title="Thinking about a lot?"
        accent="Let&rsquo;s look at it together before you buy."
      />
      <Footer />
    </main>
  );
}
