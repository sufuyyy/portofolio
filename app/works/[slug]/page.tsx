import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getAdjacentWorks, getWork, getWorkSlugs } from "@/lib/content";
import { mdxComponents } from "@/components/mdx-components";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const slugs = await getWorkSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const work = await getWork(params.slug);
  if (!work) return {};
  return {
    title: work.frontmatter.title,
    description: work.frontmatter.summary,
  };
}

export default async function WorkPage({ params }: { params: Params }) {
  const work = await getWork(params.slug);
  if (!work) notFound();

  const { frontmatter, content } = work;
  const { prev, next } = await getAdjacentWorks(params.slug);

  return (
    <article className="relative overflow-hidden">
      {/* ambient glow */}
      <div className="pointer-events-none absolute -top-32 left-1/4 -z-10 h-[26rem] w-[26rem] rounded-full bg-accent/15 blur-[140px]" />

      <div className="container-x py-16 md:py-24">
      <Link
        href="/"
        className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
      >
        <span className="transition-transform duration-300 group-hover:-translate-x-1">
          ←
        </span>
        All work
      </Link>

      <header className="mt-8 max-w-3xl">
        <p className="mb-4 text-sm uppercase tracking-[0.2em] text-accent">
          Case Study
        </p>
        <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-paper md:text-6xl">
          {frontmatter.title}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-soft">
          {frontmatter.summary}
        </p>
        <dl className="mt-8 flex flex-wrap gap-x-12 gap-y-6 border-t border-line/60 pt-6 text-sm md:gap-x-16">
          <div className="min-w-[100px]">
            <dt className="text-xs uppercase tracking-[0.15em] text-muted">Role</dt>
            <dd className="mt-1.5 text-paper">{frontmatter.role}</dd>
          </div>
          <div className="min-w-[100px]">
            <dt className="text-xs uppercase tracking-[0.15em] text-muted">Year</dt>
            <dd className="mt-1.5 text-paper">{frontmatter.year}</dd>
          </div>
          {frontmatter.scope ? (
            <div className="max-w-[350px]">
              <dt className="text-xs uppercase tracking-[0.15em] text-muted">Scope</dt>
              <dd className="mt-1.5 text-paper">{frontmatter.scope}</dd>
            </div>
          ) : null}
        </dl>
      </header>

      {/* MDX body — text stays at a readable measure; figures/groups fill the container */}
      <div className="prose prose-invert mt-12 max-w-none prose-headings:max-w-3xl prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight prose-p:max-w-3xl prose-ul:max-w-3xl prose-ol:max-w-3xl prose-blockquote:max-w-3xl prose-img:rounded-xl">
        <MDXRemote
          source={content}
          components={mdxComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>

      {/* Previous / Next project navigation */}
      {(prev || next) && (
        <nav className="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line md:mt-24 md:grid-cols-2">
          {prev ? (
            <Link
              href={`/works/${prev.slug}`}
              className="group flex flex-col gap-2 bg-ink p-6 transition-colors hover:bg-surface/60 md:p-8"
            >
              <span className="text-sm text-muted transition-colors group-hover:text-accent">
                ← Previous
              </span>
              <span className="font-display text-xl font-bold tracking-tight text-soft transition-colors group-hover:text-paper md:text-2xl">
                {prev.frontmatter.title}
              </span>
            </Link>
          ) : (
            <span className="bg-ink" />
          )}
          {next ? (
            <Link
              href={`/works/${next.slug}`}
              className="group flex flex-col items-end gap-2 bg-ink p-6 text-right transition-colors hover:bg-surface/60 md:p-8"
            >
              <span className="text-sm text-muted transition-colors group-hover:text-accent">
                Next →
              </span>
              <span className="font-display text-xl font-bold tracking-tight text-soft transition-colors group-hover:text-paper md:text-2xl">
                {next.frontmatter.title}
              </span>
            </Link>
          ) : (
            <span className="bg-ink" />
          )}
        </nav>
      )}
      </div>
    </article>
  );
}
