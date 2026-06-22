import { getAbout } from "@/lib/content";

export default async function Footer() {
  const { frontmatter } = await getAbout();
  const year = new Date().getFullYear();
  const email = frontmatter.email.replace("mailto:", "");

  return (
    <footer className="border-t border-line">
      {/* Big CTA */}
      <div className="container-x py-20 md:py-28">
        <p className="font-mono text-xs uppercase tracking-[0.1em] text-accent">
          Have a project in mind?
        </p>
        <a
          href={frontmatter.email}
          className="group mt-5 block font-display text-4xl uppercase leading-[0.95] tracking-tight text-paper md:text-7xl"
        >
          <span className="link-underline">Let&apos;s work together</span>
          <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-2">
            ↗
          </span>
        </a>
        <a
          href={frontmatter.email}
          className="mt-6 inline-block text-base text-muted transition-colors hover:text-paper md:text-lg"
        >
          {email}
        </a>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-4 py-6 font-mono text-xs uppercase tracking-[0.1em] text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} {frontmatter.name}
          </span>
          <div className="flex items-center gap-6">
            <a
              href={frontmatter.linkedin}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-paper"
            >
              LinkedIn
            </a>
            <a
              href={frontmatter.dribbble}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-paper"
            >
              Dribbble
            </a>
            <a href={frontmatter.email} className="transition-colors hover:text-paper">
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
