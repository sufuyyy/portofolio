type ProjectImageProps = {
  src: string;
  alt?: string;
  caption?: string;
};

/**
 * Full-width image with an optional caption below.
 * Usable directly inside .mdx files (registered in the MDX provider).
 *
 *   <ProjectImage src="/images/projects/design-system/cover.svg" alt="…" caption="…" />
 */
export default function ProjectImage({ src, alt = "", caption }: ProjectImageProps) {
  return (
    <figure className="my-8 md:my-10">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="w-full rounded-xl"
      />
      {caption ? (
        <figcaption className="mt-3 text-sm text-muted">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
