type Metric = { value: string; label: string; description?: string };

/**
 * Parse the `items` string into metrics. Rows are separated by `;`, and each
 * row's fields by `|`:  "VALUE | Label | Description".
 */
function parseMetrics(items?: string): Metric[] {
  return (items ?? "")
    .split(";")
    .map((row) => row.trim())
    .filter(Boolean)
    .map((row) => {
      const [value = "", label = "", description = ""] = row
        .split("|")
        .map((part) => part.trim());
      return { value, label, description };
    })
    .filter((m) => m.value || m.label);
}

/**
 * A grid of impact/metric cards — a value pill, a label, and a short
 * description. Styled to match the Scope panels. Registered in the MDX
 * provider, so use it directly inside .mdx:
 *
 *   <Metrics items="
 *     +32% | User Satisfaction | Cleaner UI reduced overwhelm;
 *     -64% | Support Tickets | Always-visible info reduced confusion
 *   " />
 */
export default function Metrics({ items }: { items?: string }) {
  const metrics = parseMetrics(items);
  if (!metrics.length) return null;

  return (
    <div className="not-prose my-8 grid grid-cols-1 gap-4 md:my-10 md:grid-cols-2 md:gap-6">
      {metrics.map((m, i) => (
        <div
          key={i}
          className="border border-line/20 bg-transparent p-6 md:p-8"
        >
          <span className="inline-flex items-center bg-accent/15 px-3 py-1.5 font-display text-lg font-bold tracking-tight text-accent">
            {m.value}
          </span>
          <h4 className="mt-4 font-display text-lg font-bold tracking-tight text-paper">
            {m.label}
          </h4>
          {m.description ? (
            <p className="mt-1.5 text-sm leading-relaxed text-muted">
              {m.description}
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
}
