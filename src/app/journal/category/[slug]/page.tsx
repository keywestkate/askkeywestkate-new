import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { ContactBlock } from "@/components/ContactBlock";
import { getPostsByCategory } from "@/lib/journal";
import { CATEGORIES, getCategoryBySlug } from "@/lib/categories";

export const dynamicParams = false;

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) return { title: "Not found" };
  return {
    title: `${cat.name} · The Journal`,
    description: cat.description,
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const posts = await getPostsByCategory(slug);

  return (
    <main className="bg-paper text-ink-950">
      <Nav />

      <PageHero
        eyebrow="The Journal"
        metaLeft={
          <>
            Category
            <br />
            {category.name}
          </>
        }
        metaRight={
          <>
            {posts.length} {posts.length === 1 ? "post" : "posts"}
            <br />
            <Link href="/journal" className="hover:text-gulf-700">
              ← All categories
            </Link>
          </>
        }
        title={
          <>
            {category.name}
          </>
        }
        subtitle={category.description}
        rightColumn={
          <div className="flex flex-wrap gap-2 md:justify-end">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                href={`/journal/category/${c.slug}`}
                className={
                  c.slug === slug
                    ? "border border-gulf-700 bg-gulf-700 px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.16em] text-white"
                    : "border border-ink-200 px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.16em] text-ink-800 transition hover:border-gulf-700 hover:bg-gulf-700 hover:text-white"
                }
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
            <div className="border-y border-ink-200 py-20 text-center">
              <p className="text-ink-500">
                No posts in this category yet. Check back soon — Kate is writing.
              </p>
              <Link
                href="/journal"
                className="mt-6 inline-block border-b border-ink-300 pb-1 text-[0.78rem] uppercase tracking-[0.22em] text-ink-500 transition hover:border-ink-950 hover:text-ink-950"
              >
                Browse all posts &rarr;
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-ink-200 border-y border-ink-200">
              {posts.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/journal/${p.slug}`}
                    className="group grid gap-8 py-10 md:grid-cols-12 md:items-baseline"
                  >
                    <span className="stat-label text-gulf-700 md:col-span-2">
                      {category.name}
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
        title="Have a story idea or a question?"
        accent="Send Kate a note."
      />
      <Footer />
    </main>
  );
}
