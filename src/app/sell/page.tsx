import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { ContactBlock } from "@/components/ContactBlock";
import { PortalCTA } from "@/components/PortalCTA";

const SELL_HERO =
  "/images/lifestyle/waterfront/Key-west-florida-keys-kate-baldwin-real-estate-ocean-boat-houses-15.jpg";

export const metadata: Metadata = {
  title: "Sell Your Home in the Keys",
  description:
    "A tailored, private-market-aware approach to selling waterfront and luxury homes in Key West and the Florida Keys.",
};

const PROCESS = [
  {
    index: "01",
    label: "Discover",
    title: "Learn the home",
    body:
      "A walk-through together — the good, the quirky, the history. I want to know why you loved it before I tell the world.",
  },
  {
    index: "02",
    label: "Price",
    title: "Price with the market, not against it",
    body:
      "A full CMA against recent comparable waterfront sales — active, pending, and closed. Honest, current, data-backed.",
  },
  {
    index: "03",
    label: "Story",
    title: "Build the story",
    body:
      "Photo, video, drone, twilight, and lifestyle — so buyers don&rsquo;t see a listing, they see a life.",
  },
  {
    index: "04",
    label: "Launch",
    title: "Launch where buyers actually look",
    body:
      "MLS, luxury syndication, private network, social, and targeted outreach to qualified buyers we already know.",
  },
  {
    index: "05",
    label: "Close",
    title: "Close with care",
    body:
      "From inspections to insurance and flood-zone nuance, I quarterback the details so you stay focused on what&rsquo;s next.",
  },
];

export default function Sell() {
  return (
    <main className="bg-paper text-ink-950">
      <Nav />

      <PageHero
        metaLeft={
          <>
            Sell · Key West · Florida Keys
            <br />
            Luxury Waterfront Specialists
          </>
        }
        metaRight={
          <>
            Kate Baldwin
            <br />
            Bluescape Real Estate
          </>
        }
        title={
          <>
            Tell the story
            <br />
            of your home.
          </>
        }
        subtitle="A listing is a transaction. A story is what sells. I price carefully, market quietly when it helps, and tell the story of your home so the right buyer recognizes it immediately."
        rightColumn={
          <div className="flex flex-col gap-3 md:items-end">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-gulf-700 px-7 py-4 text-[0.78rem] uppercase tracking-[0.2em] text-paper transition hover:opacity-80"
            >
              Request a valuation &rarr;
            </Link>
            <span className="stat-label text-ink-500">
              Typically within 48 hours
            </span>
          </div>
        }
      />

      {/* Feature image */}
      <section className="px-8 md:px-12">
        <div className="relative mx-auto aspect-[16/7] w-full max-w-[1600px] overflow-hidden bg-paper-warm">
          <Image
            src={SELL_HERO}
            alt="Key West waterfront estate"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1600px"
            priority
          />
        </div>
      </section>

      {/* PROCESS */}
      <section className="px-8 py-28 md:px-12 md:py-36">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <div className="eyebrow">How I work</div>
              <h2 className="mt-6 font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-[-0.035em] text-ink-950">
                Five steps. No rush. No drama.
              </h2>
            </div>
          </div>
          <ol className="mt-20 divide-y divide-ink-200">
            {PROCESS.map((p) => (
              <li
                key={p.index}
                className="grid gap-8 py-10 md:grid-cols-12 md:items-baseline"
              >
                <div className="md:col-span-2">
                  <span className="stat-label text-ink-500">/ {p.index}</span>
                </div>
                <div className="md:col-span-2">
                  <span className="stat-label text-gulf-700">{p.label}</span>
                </div>
                <h3 className="font-display text-[clamp(1.6rem,3vw,2.5rem)] leading-[1] tracking-[-0.02em] text-ink-950 md:col-span-4">
                  {p.title}
                </h3>
                <p className="text-[0.98rem] leading-relaxed text-ink-800 md:col-span-4">
                  {p.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* VALUE PROPOSITION */}
      <section className="bg-paper-soft px-8 py-28 md:px-12 md:py-36">
        <div className="mx-auto grid max-w-[1600px] gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="eyebrow">The quiet market</div>
          </div>
          <div className="md:col-span-7">
            <p className="font-display text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.05] tracking-[-0.025em] text-ink-950">
              Some of the best sales in the Keys never hit the MLS. When a
              quiet sale serves you, I know who to call.
            </p>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink-800">
              Private-network buyers, pre-launch introductions, and a
              discreet, invitation-only tier for owners who want exposure
              without a sign in the yard.
            </p>
          </div>
        </div>
      </section>

      <PortalCTA />
      <ContactBlock
        title="Ready to talk about what your home is worth?"
        accent="Start here."
      />
      <Footer />
    </main>
  );
}
