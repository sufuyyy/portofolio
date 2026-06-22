import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getAdjacentWorks, getWork, getWorkSlugs } from "@/lib/content";
import { mdxComponents } from "@/components/mdx-components";
import Reveal from "@/components/Reveal";

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
    <article>
      <div className="container-x py-16 md:py-24">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-muted transition-colors hover:text-paper"
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-1">
            ←
          </span>
          All work
        </Link>

        {/* Poster-style hero: title bottom-left, summary/scope in a right
            column split off by a vertical divider. */}
        <header className="mt-8 grid gap-10 border-b border-line pb-12 md:mt-10 md:min-h-[60svh] md:pb-16 lg:grid-cols-[1fr_20rem] lg:gap-0">
          <div className="flex flex-col justify-end lg:pr-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent">
              {frontmatter.role} · {String(frontmatter.year)}
            </p>
            <h1 className="mt-4 font-display text-[44px] uppercase leading-[0.92] text-paper md:text-[84px]">
              {frontmatter.title}
            </h1>
          </div>

          <div className="flex flex-col justify-end border-line lg:border-l lg:pl-12">
            <p className="max-w-sm text-[15px] leading-relaxed text-paper opacity-80">
              {frontmatter.summary}
            </p>
            {frontmatter.scope ? (
              <div className="mt-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                  Scope
                </p>
                <p className="mt-2 max-w-xs text-[14px] text-paper">
                  {frontmatter.scope}
                </p>
              </div>
            ) : null}

            {frontmatter.links && frontmatter.links.length > 0 ? (
              <div className="mt-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                  Link
                </p>
                <div className="mt-2 flex flex-col gap-1.5">
                  {frontmatter.links.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="w-fit text-[14px] text-accent underline-offset-4 hover:underline"
                    >
                      {link.label} ↗
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </header>

        {/* Cover hero image — same asset as the Selected Work card */}
        <Reveal className="mt-12 md:mt-16">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={frontmatter.cover} alt={frontmatter.title} className="w-full" />
        </Reveal>

        {/* MDX body — text stays at a readable measure; figures/groups fill the container */}
        <div className="prose prose-invert mt-12 max-w-none prose-headings:max-w-3xl prose-headings:font-bold prose-headings:tracking-tight prose-p:max-w-3xl prose-ul:max-w-3xl prose-ol:max-w-3xl prose-blockquote:max-w-3xl">
          <MDXRemote
            source={content}
            components={mdxComponents}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </div>

        {/* Previous / Next — divider between cells, hover invert */}
        {(prev || next) && (
          <Reveal>
          <nav className="mt-20 grid grid-cols-1 gap-px bg-line md:mt-24 md:grid-cols-2">
            {prev ? (
              <Link
                href={`/works/${prev.slug}`}
                className="flex flex-col gap-2 bg-ink p-6 text-paper transition-colors duration-150 hover:bg-accent hover:text-ink md:p-8"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.1em]">
                  ← Previous
                </span>
                <span className="font-display text-[22px] uppercase md:text-[26px]">
                  {prev.frontmatter.title}
                </span>
              </Link>
            ) : (
              <span className="bg-ink" />
            )}
            {next ? (
              <Link
                href={`/works/${next.slug}`}
                className="flex flex-col items-end gap-2 bg-ink p-6 text-right text-paper transition-colors duration-150 hover:bg-accent hover:text-ink md:p-8"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.1em]">
                  Next →
                </span>
                <span className="font-display text-[22px] uppercase md:text-[26px]">
                  {next.frontmatter.title}
                </span>
              </Link>
            ) : (
              <span className="bg-ink" />
            )}
          </nav>
          </Reveal>
        )}
      </div>
    </article>
  );
}
