import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { ContactBlock } from "@/components/ContactBlock";
import { getAllPosts } from "@/lib/journal";

export const metadata: Metadata = {
  title: "The Journal",
  description:
    "Daily field notes for Florida Keys buyers, builders, and owners. Market numbers, ROGO and flood-zone explainers, listings, and Keys life.",
};

const CATEGORIES = ["Market", "Build", "Buy", "Sell", "Neighborhoods", "Life"];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function Journal() {
  const posts = await getAllPosts();

  return (
    <main className="bg-paper text-ink-950">
      <Nav />

      <PageHero
        eyebrow="Field notes"
        metaLeft={
          <>
            The Journal
            <br />
            Daily for buyers, builders, owners
          </>
        }
        metaRight={
          <>
            Written by Kate Baldwin
            <br />
            Bluescape Real Estate
          </>
        }
        title={
          <>
            Field notes
            <br />
            from the Keys.
          </>
        }
        subtitle="A daily record of the market, the build code, the neighborhoods, and the life — written for people who take the Keys seriously."
        rightColumn={
          <div className="flex flex-wrap gap-3 md:justify-end">
            {CATEGORIES.map((c) => (
              <span
                key={c}
                className="border border-ink-200 px-4 py-2 text-[0.72rem] uppercase tracking-[0.18em] text-ink-800"
              >
                {c}
              </span>
            ))}
          </div>
        }
      />

      <section className="px-8 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-[1600px]">
          {posts.length === 0 ? (
            <p className="text-ink-500">
              No posts yet. Drafts land in <code>content/journal/</code>.
            </p>
          ) : (
            <ul className="divide-y divide-ink-200 border-y border-ink-200">
              {posts.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/journal/${p.slug}`}
                    className="group grid gap-8 py-10 md:grid-cols-12 md:items-baseline"
                  >
                    <span className="stat-label text-gulf-700 md:col-span-2">
                      {p.kicker}
                    </span>
                    <h2 className="font-display text-[clamp(1.75rem,3.2vw,2.75rem)] leading-[1.02] tracking-[-0.02em] text-ink-950 transition group-hover:text-ink-700 md:col-span-6">
                      {p.title}
                    </h2>
                    <p className="text-sm leading-relaxed text-ink-800 md:col-span-3">
                      {p.excerpt}
                    </p>
                    <div className="flex flex-col gap-1 md:col-span-1 md:items-end">
                      {p.readMinutes && (
                        <span className="stat-label text-ink-500">
                          {p.readMinutes} min
                        </span>
                      )}
                      <span className="stat-label text-ink-500">
                        {formatDate(p.date)}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <ContactBlock
        title="Want the Journal in your inbox?"
        accent="I&rsquo;ll send you the good ones."
      />
      <Footer />
    </main>
  );
}
