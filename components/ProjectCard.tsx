import Link from "next/link";
import type { Work } from "@/lib/content";

export default function ProjectCard({ work }: { work: Work }) {
  const { slug, frontmatter } = work;
  return (
    <Link href={`/works/${slug}`} className="group block">
      <div className="aspect-[4/3] overflow-hidden rounded-xl border border-line bg-surface">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={frontmatter.cover}
          alt={frontmatter.title}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="text-base font-medium text-paper">{frontmatter.title}</h3>
        <span className="shrink-0 text-sm text-muted">{frontmatter.year}</span>
      </div>
      <p className="mt-1 text-sm text-muted">{frontmatter.role}</p>
    </Link>
  );
}
