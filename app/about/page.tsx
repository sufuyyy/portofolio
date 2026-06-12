import type { Metadata } from "next";
import { getAbout } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
};

export default async function AboutPage() {
  const { frontmatter } = await getAbout();

  return (
    <article className="relative overflow-hidden">
      {/* ambient glow */}
      <div className="pointer-events-none absolute -top-32 right-0 -z-10 h-[28rem] w-[28rem] rounded-full bg-accent/15 blur-[140px]" />

      <header className="container-x max-w-3xl pt-20 md:pt-28">
        <p className="text-sm uppercase tracking-[0.2em] text-accent">
          About — {frontmatter.role}
        </p>
        <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-paper md:text-6xl">
          {frontmatter.name}
        </h1>
        <p className="mt-8 text-lg leading-relaxed text-soft md:text-xl">
          {frontmatter.bio}
        </p>

        <div className="mt-8 flex flex-wrap gap-3 text-sm">
          <a
            href={frontmatter.email}
            className="rounded-full border border-line bg-surface/60 px-4 py-1.5 text-soft transition-colors hover:border-accent hover:text-paper"
          >
            Email
          </a>
          <a
            href={frontmatter.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-line bg-surface/60 px-4 py-1.5 text-soft transition-colors hover:border-accent hover:text-paper"
          >
            LinkedIn
          </a>
          <a
            href={frontmatter.dribbble}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-line bg-surface/60 px-4 py-1.5 text-soft transition-colors hover:border-accent hover:text-paper"
          >
            Dribbble
          </a>
        </div>
      </header>

      {/* Experience */}
      <section className="container-x pb-24 pt-20 md:pb-28">
        <div className="mb-2 flex items-end justify-between border-b border-line/60 pb-4">
          <h2 className="text-sm uppercase tracking-[0.2em] text-accent">
            Experience
          </h2>
          <span className="text-sm tabular-nums text-muted">
            ({String(frontmatter.experience.length).padStart(2, "0")})
          </span>
        </div>
        <dl>
          {frontmatter.experience.map((job, i) => (
            <div
              key={`${job.company}-${job.years}`}
              className="group grid grid-cols-1 items-baseline gap-1 border-b border-line/60 py-6 transition-colors hover:bg-surface/30 md:grid-cols-12 md:gap-4"
            >
              <dt className="flex items-baseline gap-4 md:col-span-6">
                <span className="font-display text-sm tabular-nums text-muted transition-colors group-hover:text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-xl font-bold tracking-tight text-paper md:text-2xl">
                  {job.company}
                </span>
              </dt>
              <dd className="text-soft md:col-span-3">{job.position}</dd>
              <dd className="text-sm tabular-nums text-muted md:col-span-3 md:text-right">
                {job.years}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </article>
  );
}
