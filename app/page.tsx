import { getAbout, getAllWorks, getGalleryImages } from "@/lib/content";
import WorkIndex, { type WorkItem } from "@/components/WorkIndex";
import ImageMarquee from "@/components/ImageMarquee";

export default async function HomePage() {
  const [{ frontmatter }, works, gallery] = await Promise.all([
    getAbout(),
    getAllWorks(),
    getGalleryImages(),
  ]);

  const words = frontmatter.name.trim().split(/\s+/);
  const firstName = words[0];
  const restName = words.slice(1).join(" ");

  const workItems: WorkItem[] = works.map((w) => ({
    slug: w.slug,
    title: w.frontmatter.title,
    role: w.frontmatter.role,
    year: String(w.frontmatter.year),
    cover: w.frontmatter.cover,
  }));

  return (
    <>
      {/* Hero — fills the viewport (minus the 4rem sticky nav) */}
      <section className="relative flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden">
        {/* ambient glow */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-accent/25 blur-[140px]" />
        <div className="pointer-events-none absolute -top-24 right-[8%] -z-10 h-[22rem] w-[22rem] rounded-full bg-accent2/15 blur-[130px]" />

        <div className="container-x flex flex-1 flex-col py-10 md:py-14">
          {/* badge + name + tagline, centered together so the chip sits right above the title */}
          <div className="flex flex-1 flex-col justify-center gap-8">
            {/* status badge */}
            <div className="inline-flex animate-rise items-center gap-2.5 self-start rounded-full border border-line bg-surface/60 px-3.5 py-1.5 text-xs text-soft backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-accent" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Available for freelance &amp; full-time
            </div>

            <div className="flex w-full flex-col gap-10 md:flex-row md:items-end md:justify-between md:gap-12">
              <h1 className="animate-rise font-display text-6xl font-bold leading-[0.9] tracking-tight text-paper [animation-delay:80ms] md:text-8xl">
                <span className="block">{firstName}</span>
                {restName ? (
                  <span className="mt-1 flex items-center gap-4 md:mt-2 md:gap-6">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/new_logo.svg"
                      alt=""
                      aria-hidden="true"
                      className="h-[0.74em] w-[0.74em] shrink-0"
                    />
                    <span>{restName}</span>
                  </span>
                ) : null}
              </h1>

              <div className="max-w-sm animate-rise [animation-delay:160ms] md:pb-4 md:text-right">
                <p className="text-base leading-relaxed text-soft md:text-lg">
                  {frontmatter.tagline}
                </p>
                <p className="mt-3 text-sm text-muted">
                  {frontmatter.role} · 3+ years experience
                </p>
              </div>
            </div>
          </div>

          {/* hero footer row — pinned to the bottom of the viewport */}
          <div className="flex animate-rise items-center justify-between border-t border-line/60 pt-6 text-sm text-muted [animation-delay:240ms]">
            <span className="hidden sm:inline">
              Scroll to explore{" "}
              <span className="ml-1 inline-block animate-bounce-y">↓</span>
            </span>
            <div className="flex items-center gap-6">
              <a href={frontmatter.email} className="link-underline transition-colors hover:text-paper">
                Email
              </a>
              <a
                href={frontmatter.linkedin}
                target="_blank"
                rel="noreferrer"
                className="link-underline transition-colors hover:text-paper"
              >
                LinkedIn
              </a>
              <a
                href={frontmatter.dribbble}
                target="_blank"
                rel="noreferrer"
                className="link-underline transition-colors hover:text-paper"
              >
                Dribbble
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Selected work — editorial index */}
      <section className="py-20 md:py-28">
        <div className="container-x mb-6 flex items-end justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-accent">
              Selected Work
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-paper md:text-4xl">
              Projects
            </h2>
          </div>
          <span className="text-sm tabular-nums text-muted">
            ({String(works.length).padStart(2, "0")})
          </span>
        </div>

        <WorkIndex items={workItems} />
      </section>

      {/* Gallery — infinite horizontal scroll (only when images exist) */}
      {gallery.length > 0 && (
        <section className="border-t border-line/60 py-20 md:py-28">
          <div className="container-x mb-10">
            <p className="text-sm uppercase tracking-[0.2em] text-accent">In Motion</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-paper md:text-4xl">
              Gallery
            </h2>
          </div>
          <ImageMarquee images={gallery} />
        </section>
      )}
    </>
  );
}
