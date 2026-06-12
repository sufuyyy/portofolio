import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");
const WORKS_DIR = path.join(CONTENT_DIR, "works");
const GALLERY_DIR = path.join(process.cwd(), "public", "images", "gallery");

const IMAGE_RE = /\.(svg|png|jpe?g|webp|avif|gif)$/i;

export type Experience = {
  company: string;
  years: string;
  position: string;
};

export type AboutFrontmatter = {
  title: string;
  name: string;
  role: string;
  tagline: string;
  bio: string;
  email: string;
  linkedin: string;
  dribbble: string;
  experience: Experience[];
};

export type WorkFrontmatter = {
  title: string;
  role: string;
  year: string | number;
  scope?: string;
  summary: string;
  cover: string;
  order?: number;
};

export type Work = {
  slug: string;
  frontmatter: WorkFrontmatter;
  content: string;
};

/** Parse the About MDX file (frontmatter + body). */
export async function getAbout(): Promise<{
  frontmatter: AboutFrontmatter;
  content: string;
}> {
  const file = await fs.readFile(path.join(CONTENT_DIR, "about.mdx"), "utf8");
  const { data, content } = matter(file);
  return { frontmatter: data as AboutFrontmatter, content };
}

/** List every work slug (used by generateStaticParams). */
export async function getWorkSlugs(): Promise<string[]> {
  const entries = await fs.readdir(WORKS_DIR);
  return entries
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

/** Load a single work by slug, or null if it doesn't exist. */
export async function getWork(slug: string): Promise<Work | null> {
  try {
    const file = await fs.readFile(
      path.join(WORKS_DIR, `${slug}.mdx`),
      "utf8"
    );
    const { data, content } = matter(file);
    return { slug, frontmatter: data as WorkFrontmatter, content };
  } catch {
    return null;
  }
}

/** All works, sorted by `order` then year (desc). */
export async function getAllWorks(): Promise<Work[]> {
  const slugs = await getWorkSlugs();
  const works = await Promise.all(slugs.map((slug) => getWork(slug)));
  return works
    .filter((w): w is Work => w !== null)
    .sort((a, b) => {
      const ao = a.frontmatter.order ?? 999;
      const bo = b.frontmatter.order ?? 999;
      if (ao !== bo) return ao - bo;
      return String(b.frontmatter.year).localeCompare(String(a.frontmatter.year));
    });
}

/**
 * Previous/next works relative to `slug`, using the same ordering as the index.
 * Cycles around the ends, so a project always has a previous and a next
 * neighbour (returns null only when there are fewer than two works).
 */
export async function getAdjacentWorks(
  slug: string
): Promise<{ prev: Work | null; next: Work | null }> {
  const works = await getAllWorks();
  const i = works.findIndex((w) => w.slug === slug);
  if (i === -1 || works.length < 2) return { prev: null, next: null };
  const prev = works[(i - 1 + works.length) % works.length];
  const next = works[(i + 1) % works.length];
  return { prev, next };
}

/**
 * Every image dropped into public/images/gallery/, returned as public paths
 * (e.g. "/images/gallery/shot-01.png"), sorted by filename. This powers the
 * horizontal gallery marquee — just add/remove files in that folder to change
 * what shows. Returns an empty array if the folder is missing or empty.
 */
export async function getGalleryImages(): Promise<string[]> {
  try {
    const files = await fs.readdir(GALLERY_DIR);
    return files
      .filter((file) => IMAGE_RE.test(file))
      .sort()
      .map((file) => `/images/gallery/${file}`);
  } catch {
    return [];
  }
}
