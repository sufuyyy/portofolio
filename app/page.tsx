import Link from "next/link";
import { getAbout, getAllWorks, getGalleryImages } from "@/lib/content";
import ImageMarquee from "@/components/ImageMarquee";
import Reveal from "@/components/Reveal";
import ShinyText from "@/components/ShinyText";

export default async function HomePage() {
  const [{ frontmatter }, works, gallery] = await Promise.all([
    getAbout(),
    getAllWorks(),
    getGalleryImages(),
  ]);

  // ≤3 works fit in one horizontal row; more than 3 spills into a 2-up grid.
  const colClass =
    works.length > 3
      ? "md:grid-cols-2"
      : works.length === 3
        ? "md:grid-cols-3"
        : works.length === 2
          ? "md:grid-cols-2"
          : "md:grid-cols-1";

  return (
    <>
      {/* ── HERO — poster layout, anchored to the bottom of the viewport ── */}
      <section className="flex min-h-[calc(100svh-4rem)] items-end border-b border-line">
        <div className="container-x w-full py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_18rem] lg:gap-0">
            <div className="flex flex-col justify-end lg:pr-10">
              <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.1em]">
                <span aria-hidden className="inline-block h-2 w-2 bg-accent" />
                <ShinyText
                  text="Available for freelance & full-time"
                  speed={3}
                  spread={120}
                  color="#6f6e6a"
                  shineColor="#f2f1ed"
                />
              </p>
              <h1 className="mt-6 font-display text-6xl uppercase leading-[0.92] text-paper sm:text-7xl lg:text-[92px]">
                {frontmatter.name}
              </h1>
            </div>

            <div className="flex flex-col justify-end border-line lg:border-l lg:pl-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent">
                {frontmatter.role}
              </p>
              <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-paper">
                {frontmatter.tagline}
              </p>
              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                3+ years experience
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

      {/* ── SELECTED WORK — inverted strip + horizontal card grid ── */}
      <div className="flex items-center justify-between bg-paper px-6 py-3 font-mono text-[11px] uppercase tracking-[0.1em] text-ink md:px-10">
        <span>Selected Work</span>
        <span className="tabular-nums">
          ({String(works.length).padStart(2, "0")})
        </span>
      </div>

      <section className="border-b border-line pt-10 pb-20 md:pt-14 md:pb-28">
        <Reveal className={`grid grid-cols-1 gap-px bg-line ${colClass}`}>
          {works.map((w, i) => (
            <Link
              key={w.slug}
              href={`/works/${w.slug}`}
              className="group flex flex-col bg-ink p-6 text-paper transition-colors duration-150 hover:bg-accent hover:text-ink md:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span aria-hidden className="text-lg">
                  ↗
                </span>
              </div>

              <div className="relative mt-6 aspect-[16/10] w-full overflow-hidden bg-ink">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={w.frontmatter.cover}
                  alt={w.frontmatter.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-ink/0 transition-colors duration-150 group-hover:bg-ink/25" />
              </div>

              <h2 className="mt-6 font-display text-[26px] uppercase md:text-[30px]">
                {w.frontmatter.title}
              </h2>
              {w.frontmatter.subtitle ? (
                <p className="mt-3 max-w-md text-[14px] opacity-80">
                  {w.frontmatter.subtitle}
                </p>
              ) : null}
              <div className="mt-6 flex gap-5 font-mono text-[11px] uppercase tracking-[0.1em] opacity-70">
                <span>{w.frontmatter.role}</span>
                <span className="tabular-nums">{String(w.frontmatter.year)}</span>
              </div>
            </Link>
          ))}
        </Reveal>
      </section>

      {/* ── GALLERY — inverted strip + marquee (only when images exist) ── */}
      {gallery.length > 0 && (
        <>
          <div className="flex items-center bg-paper px-6 py-3 font-mono text-[11px] uppercase tracking-[0.1em] text-ink md:px-10">
            <span>In Motion</span>
          </div>
          <section className="border-b border-line py-10 md:py-14">
            <Reveal>
              <ImageMarquee images={gallery} />
            </Reveal>
          </section>
        </>
      )}
    </>
  );
}
