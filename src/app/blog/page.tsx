import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { ContactBlock } from "@/components/ContactBlock";
import { getAllPosts } from "@/lib/blog";
import { CATEGORIES, getCategoryBySlug } from "@/lib/categories";

export const metadata: Metadata = {
  title: "The Blog",
  description:
    "Field notes from Kate Baldwin — Florida Keys real estate, architecture, culture, market trends, listings, and life on the islands.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function Blog() {
  const posts = await getAllPosts();

  return (
    <main className="bg-paper text-ink-950">
      <Nav />

      <PageHero
        eyebrow="Field notes"
        metaLeft={
          <>
            The Blog
            <br />
            Florida Keys, daily
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
        subtitle="A record of the market, the build code, the neighborhoods, and the life — written for people who take the Keys seriously."
        rightColumn={
          <div className="flex flex-wrap gap-2 md:justify-end">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                href={`/blog/category/${c.slug}`}
                className="border border-ink-200 px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.16em] text-ink-800 transition hover:border-gulf-700 hover:bg-gulf-700 hover:text-white"
              >
                {c.name}
              </Link>
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
                    href={`/blog/${p.slug}`}
                    className="group grid gap-8 py-10 md:grid-cols-12 md:items-baseline"
                  >
                    <span className="stat-label text-gulf-700 md:col-span-2">
                      {getCategoryBySlug(p.category)?.name ?? p.kicker}
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
        title="Want the Blog in your inbox?"
        accent="I&rsquo;ll send you the good ones."
      />
      <Footer />
    </main>
  );
}
