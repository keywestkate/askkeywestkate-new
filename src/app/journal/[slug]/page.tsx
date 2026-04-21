import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ContactBlock } from "@/components/ContactBlock";
import { MdxContent } from "@/components/MdxContent";
import { getAllSlugs, getPostBySlug } from "@/lib/journal";

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Not found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function JournalPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const date = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="bg-paper text-ink-950">
      <Nav />

      <article>
        {/* HERO */}
        <header className="relative px-8 pt-32 pb-16 md:px-12 md:pt-40 md:pb-20">
          <div className="mx-auto max-w-4xl">
            <div className="mb-10 flex flex-wrap items-center justify-between gap-3 text-[0.72rem] uppercase tracking-[0.22em] text-ink-500">
              <span className="text-gulf-700">{post.kicker}</span>
              <span>{date}</span>
              {post.readMinutes && <span>{post.readMinutes} min read</span>}
              {post.author && <span>{post.author}</span>}
            </div>
            <h1 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] tracking-[-0.035em] text-ink-950">
              {post.title}
            </h1>
            <p className="mt-8 max-w-2xl text-[1.1rem] leading-relaxed text-ink-700">
              {post.excerpt}
            </p>
          </div>
        </header>

        {/* BODY */}
        <div className="px-8 pb-28 md:px-12 md:pb-36">
          <div className="mx-auto max-w-2xl">
            <MdxContent source={post.content} />
          </div>
        </div>

        {/* FOOTER LINKS */}
        <div className="border-t border-ink-200 px-8 py-16 md:px-12">
          <div className="mx-auto flex max-w-4xl items-center justify-between">
            <Link
              href="/journal"
              className="text-[0.78rem] uppercase tracking-[0.22em] text-ink-800 underline-offset-8 hover:underline"
            >
              &larr; Back to The Journal
            </Link>
            <Link
              href="/contact"
              className="text-[0.78rem] uppercase tracking-[0.22em] text-ink-800 underline-offset-8 hover:underline"
            >
              Work with Kate &rarr;
            </Link>
          </div>
        </div>
      </article>

      <ContactBlock
        title="Have a question this didn&rsquo;t answer?"
        accent="Send it my way."
      />
      <Footer />
    </main>
  );
}
