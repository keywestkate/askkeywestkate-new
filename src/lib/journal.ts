import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type PostFrontmatter = {
  title: string;
  kicker: string;
  excerpt: string;
  date: string; // ISO
  readMinutes?: number;
  hero?: string;
  author?: string;
  draft?: boolean;
};

export type PostSummary = PostFrontmatter & {
  slug: string;
};

export type PostFull = PostSummary & {
  content: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "journal");

async function readAllFiles(): Promise<string[]> {
  try {
    const files = await fs.readdir(CONTENT_DIR);
    return files.filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
  } catch {
    return [];
  }
}

function slugFromFilename(filename: string): string {
  return filename.replace(/\.(mdx|md)$/, "");
}

export async function getAllPosts(): Promise<PostSummary[]> {
  const files = await readAllFiles();
  const posts = await Promise.all(
    files.map(async (filename) => {
      const raw = await fs.readFile(path.join(CONTENT_DIR, filename), "utf-8");
      const { data } = matter(raw);
      return {
        slug: slugFromFilename(filename),
        ...(data as PostFrontmatter),
      };
    }),
  );
  return posts
    .filter((p) => !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<PostFull | null> {
  const files = await readAllFiles();
  const filename = files.find((f) => slugFromFilename(f) === slug);
  if (!filename) return null;
  const raw = await fs.readFile(path.join(CONTENT_DIR, filename), "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    content,
    ...(data as PostFrontmatter),
  };
}

export async function getAllSlugs(): Promise<string[]> {
  const files = await readAllFiles();
  return files.map(slugFromFilename);
}
