type ProjectImageGroupProps = {
  children: React.ReactNode;
};

/**
 * Two (or more) images side-by-side in a 50/50 grid; stacks vertically on
 * mobile. Individual images inside the group should NOT carry a caption.
 * Registered in the MDX provider, so use it directly inside .mdx:
 *
 *   <ProjectImageGroup>
 *     <ProjectImage src="/images/projects/design-system/a.svg" alt="…" />
 *     <ProjectImage src="/images/projects/design-system/b.svg" alt="…" />
 *   </ProjectImageGroup>
 *
 * The `[&_figure]:my-0` resets the margins ProjectImage adds so the pair sits
 * flush inside the grid.
 */
export default function ProjectImageGroup({ children }: ProjectImageGroupProps) {
  return (
    <div className="my-8 grid grid-cols-1 gap-4 md:my-10 md:grid-cols-2 md:gap-5 [&_figure]:my-0">
      {children}
    </div>
  );
}
