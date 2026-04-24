import type { Metadata } from "next";
import Image from "next/image";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { ContactBlock } from "@/components/ContactBlock";
import { PortalCTA } from "@/components/PortalCTA";

const ABOUT_HERO =
  "/images/lifestyle/waterfront/Key-west-florida-keys-kate-baldwin-real-estate-ocean-boat-houses-11.jpg";
const KATE_PORTRAIT = "/images/kate/kate-baldwin-1.jpg";

export const metadata: Metadata = {
  title: "About Kate",
  description:
    "Kate Baldwin — Luxury Real Estate Agent with Bluescape Real Estate in Key West and the Florida Keys. I live the life I sell.",
};

const VALUES = [
  {
    index: "01",
    label: "Bold",
    title: "Bold, never loud",
    body:
      "Confidence without volume. I&rsquo;ll tell you the honest answer and we&rsquo;ll move faster for it.",
  },
  {
    index: "02",
    label: "Clear",
    title: "Shaped by clear thinking",
    body:
      "Every decision has a reason. Nothing on autopilot, nothing dressed up.",
  },
  {
    index: "03",
    label: "Systems",
    title: "Smart systems beat theatrics",
    body:
      "Data-led pricing, checklists that don&rsquo;t miss, and a network I call on every week.",
  },
  {
    index: "04",
    label: "Timeless",
    title: "Ideas that outlast trends",
    body:
      "The Keys was the Keys before anyone discovered it. I work the same way — slowly, locally, for keeps.",
  },
];

export default function About() {
  return (
    <main className="bg-paper text-ink-950">
      <Nav />

      <PageHero
        eyebrow="About Kate"
        metaLeft={
          <>
            Kate Baldwin
            <br />
            Luxury Real Estate Agent
          </>
        }
        metaRight={
          <>
            Bluescape Real Estate
            <br />
            FL #SL3428748
          </>
        }
        title={
          <>
            I live the life
            <br />
            I sell.
          </>
        }
        subtitle="Key West has been home long enough that I don&rsquo;t think of it as home anymore — I just think of it as the water, the boat, the neighbors, and the pace. When I sell a home here, I&rsquo;m selling the same life I wake up to."
      />

      <section className="px-8 md:px-12">
        <div className="relative mx-auto aspect-[16/7] w-full max-w-[1600px] overflow-hidden bg-paper-warm">
          <Image
            src={ABOUT_HERO}
            alt="Kate Baldwin's Key West"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1600px"
            priority
          />
        </div>
      </section>

      {/* STORY */}
      <section className="px-8 py-28 md:px-12 md:py-36">
        <div className="mx-auto grid max-w-[1600px] gap-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="eyebrow">The story</div>
            <div className="mt-8 relative aspect-[4/5] w-full max-w-sm overflow-hidden bg-paper-warm">
              <Image
                src={KATE_PORTRAIT}
                alt="Kate Baldwin"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
          </div>
          <div className="md:col-span-8">
            <p className="font-display text-[clamp(2rem,4.2vw,3.5rem)] leading-[1.05] tracking-[-0.025em] text-ink-950">
              Local roots. Global results.
            </p>
            <div className="mt-10 max-w-2xl space-y-6 text-base leading-relaxed text-ink-800">
              <p>
                As a Key West native with over 20 years of local business
                experience, I provide a level of island expertise that is lived,
                not learned. This is home &mdash; the water, the pace, the
                neighbors, the way the light hits the flats at 6am. When I sell
                a property here, I&rsquo;m selling the life I wake up to every
                morning.
              </p>
              <p>
                My real estate career is defined by a rapid and consistent climb
                into the luxury market: <strong>41 closings and a career volume
                exceeding $43.5 million</strong>, with an average transaction
                now exceeding $1.1M. I currently serve as a Luxury Specialist at{" "}
                <strong>Bluescape Real Estate</strong>, focusing on high-tier
                waterfront estates and lifestyle properties from Key West to
                Marathon.
              </p>
              <p>
                My success is built on repeat client trust. Clients come back
                &mdash; not just for a second opinion, but to hand me the same
                address twice. I&rsquo;ve guided clients through both the
                strategic acquisition and the high-yield exit on the same
                property. That kind of relationship is earned over years of
                straight talk, local knowledge, and deals that close the way
                they were supposed to.
              </p>
              <p>
                Before Bluescape, I built my foundation at{" "}
                <strong>Berkshire Hathaway HomeServices (Knight &amp; Gardner)</strong>,
                where I developed the data-driven negotiation skills and
                referral network that define my practice today. Every deal I
                take on gets the same thing: full attention, honest numbers, and
                a clear path forward.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-paper-soft px-8 py-28 md:px-12 md:py-36">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <div className="eyebrow">How I work</div>
              <h2 className="mt-6 font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-[-0.035em] text-ink-950">
                Principles over scripts.
              </h2>
            </div>
          </div>
          <div className="mt-20 grid gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <article
                key={v.index}
                className="flex flex-col gap-5 border-t border-ink-200 pt-8"
              >
                <div className="flex items-baseline justify-between">
                  <span className="stat-label text-ink-500">/ {v.index}</span>
                  <span className="stat-label text-gulf-700">{v.label}</span>
                </div>
                <h3 className="font-display text-[1.5rem] leading-snug text-ink-950">
                  {v.title}
                </h3>
                <p className="text-[0.95rem] leading-relaxed text-ink-800">
                  {v.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CREDENTIALS */}
      <section className="px-8 py-28 md:px-12 md:py-36">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid gap-10 border-t border-ink-200 pt-10 md:grid-cols-4">
            {[
              { label: "Career Volume", value: "$43.5M+" },
              { label: "Transactions", value: "41 Closings" },
              { label: "Avg. Transaction", value: "$1.1M+" },
              { label: "License", value: "FL #SL3428748" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-3">
                <span className="stat-label text-ink-500">{s.label}</span>
                <span className="font-display text-[1.4rem] leading-tight text-ink-950">
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PortalCTA />
      <ContactBlock
        title="Coffee, a walk-through, or a phone call."
        accent="Pick the one that suits you."
      />
      <Footer />
    </main>
  );
}
