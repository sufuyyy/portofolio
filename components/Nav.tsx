import Link from "next/link";
import { getAbout } from "@/lib/content";

export default async function Nav() {
  const { frontmatter } = await getAbout();
  return (
    <header className="sticky top-0 z-50 border-b border-line/60 bg-ink/70 backdrop-blur-md">
      <nav className="container-x flex h-16 items-center justify-between">
        <Link
          href="/"
          className="text-sm font-medium tracking-tight text-paper transition-colors hover:text-accent"
        >
          {frontmatter.name}
        </Link>
        <div className="flex items-center gap-7 text-sm text-muted">
          <Link href="/" className="transition-colors hover:text-paper">
            Work
          </Link>
          <Link href="/about" className="transition-colors hover:text-paper">
            About
          </Link>
          <a
            href={frontmatter.email}
            className="inline-flex h-12 items-center rounded-full bg-paper px-5 font-medium text-ink transition-colors hover:bg-accent hover:text-paper"
          >
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
}
