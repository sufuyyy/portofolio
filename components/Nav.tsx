import Link from "next/link";
import { getAbout } from "@/lib/content";
import NavMenu from "./NavMenu";

export default async function Nav() {
  const { frontmatter } = await getAbout();
  const words = frontmatter.name.trim().split(/\s+/);
  const wordmark = words[words.length - 1];

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink">
      <nav className="container-x flex h-16 items-center justify-between gap-3">
        <Link
          href="/"
          className="shrink-0 font-display text-xl uppercase leading-none text-paper sm:text-2xl"
        >
          {wordmark}
          <span className="text-accent">.</span>
        </Link>
        <NavMenu email={frontmatter.email} />
      </nav>
    </header>
  );
}
