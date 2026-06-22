import Link from "next/link";
import { getAbout } from "@/lib/content";

export default async function Nav() {
  const { frontmatter } = await getAbout();
  const words = frontmatter.name.trim().split(/\s+/);
  const wordmark = words[words.length - 1];

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink">
      <nav className="container-x flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-display text-2xl uppercase leading-none text-paper"
        >
          {wordmark}
          <span className="text-accent">.</span>
        </Link>
        <div className="flex items-center gap-7 font-mono text-xs uppercase tracking-[0.1em]">
          <Link href="/" className="text-paper transition-opacity hover:opacity-60">
            Work
          </Link>
          <Link
            href="/about"
            className="text-paper transition-opacity hover:opacity-60"
          >
            About
          </Link>
          <a
            href={frontmatter.email}
            className="inline-flex items-center bg-accent px-4 py-2 text-ink transition-colors hover:bg-paper"
          >
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
}
