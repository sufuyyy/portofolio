import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getAbout } from "@/lib/content";
import { mdxComponents } from "@/components/mdx-components";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About",
};

export default async function AboutPage() {
  const { frontmatter, content } = await getAbout();
  const exp = frontmatter.experience;
  const expCols =
    exp.length > 3
      ? "md:grid-cols-2"
      : exp.length === 3
        ? "md:grid-cols-3"
        : exp.length === 2
          ? "md:grid-cols-2"
          : "md:grid-cols-1";

  return (
    <article>
      {/* ── HERO — poster layout, anchored to the bottom of the viewport ── */}
      <section className="relative flex min-h-[calc(100svh-4rem)] items-end border-b border-line">
        {frontmatter.heroAccent ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={frontmatter.heroAccent}
            alt=""
            aria-hidden
            className="pointer-events-none absolute right-6 top-20 z-10 w-28 md:right-10 md:top-24 md:w-40 lg:w-52"
          />
        ) : null}
        <div className="container-x w-full py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_24rem] lg:gap-0">
            <div className="flex flex-col justify-end lg:pr-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent">
                About — {frontmatter.role}
              </p>
              <h1 className="mt-6 font-display text-6xl uppercase leading-[0.92] text-paper sm:text-7xl lg:text-[92px]">
                {frontmatter.name}
              </h1>
            </div>

            <div className="flex flex-col justify-end border-line lg:border-l lg:pl-10">
              <p className="text-[15px] leading-relaxed text-soft">
                {frontmatter.bio}
              </p>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.1em]">
                <a
                  href={frontmatter.email}
                  className="text-muted underline-offset-4 hover:text-paper hover:underline"
                >
                  Email
                </a>
                <a
                  href={frontmatter.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted underline-offset-4 hover:text-paper hover:underline"
                >
                  LinkedIn
                </a>
                <a
                  href={frontmatter.dribbble}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted underline-offset-4 hover:text-paper hover:underline"
                >
                  Dribbble
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTENT — free text from the About MDX body (optional) ── */}
      {content.trim() ? (
        <section className="border-b border-line">
          <Reveal className="container-x max-w-3xl py-20 md:py-28">
            <div className="prose prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight">
              <MDXRemote
                source={content}
                components={mdxComponents}
                options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
              />
            </div>
          </Reveal>
        </section>
      ) : null}

      {/* ── EXPERIENCE — card grid (same treatment as Selected Work) ── */}
      <section className="container-x pb-24 pt-20 md:pb-28">
        <div className="mb-8 flex items-end justify-between border-b border-line pb-4">
          <h2 className="font-mono text-xs uppercase tracking-[0.1em] text-accent">
            Experience
          </h2>
          <span className="font-mono text-xs tabular-nums text-muted">
            ({String(exp.length).padStart(2, "0")})
          </span>
        </div>

        <Reveal>
        <dl className={`grid grid-cols-1 gap-px bg-line ${expCols}`}>
          {exp.map((job, i) => (
            <div
              key={`${job.company}-${job.years}`}
              className="flex flex-col bg-ink p-6 md:p-8"
            >
              <span className="font-mono text-xs tabular-nums text-muted">
                [{String(i + 1).padStart(2, "0")}]
              </span>
              <dt className="mt-6 font-display text-xl uppercase leading-tight tracking-tight text-paper md:text-2xl">
                {job.company}
              </dt>
              <dd className="mt-3 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                {job.position} · {job.years}
              </dd>
              {job.description ? (
                <dd className="mt-4 text-sm leading-relaxed text-soft">
                  {job.description}
                </dd>
              ) : null}
            </div>
          ))}
        </dl>
        </Reveal>
      </section>
    </article>
  );
}
