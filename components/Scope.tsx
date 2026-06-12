type ScopeProps = {
  inScope?: string[];
  outScope?: string[];
};

function ScopeCard({
  title,
  items,
  variant,
}: {
  title: string;
  items: string[];
  variant: "in" | "out";
}) {
  const isIn = variant === "in";
  return (
    <div
      className={`rounded-xl border bg-surface/40 p-6 md:p-8 ${
        isIn ? "border-accent/40" : "border-line"
      }`}
    >
      <div className="mb-5 flex items-center gap-2.5">
        <span
          aria-hidden="true"
          className={`flex h-6 w-6 items-center justify-center rounded-full text-sm ${
            isIn ? "bg-accent/15 text-accent" : "bg-line/60 text-muted"
          }`}
        >
          {isIn ? "✓" : "✕"}
        </span>
        <h4
          className={`font-display text-sm font-bold uppercase tracking-[0.15em] ${
            isIn ? "text-accent" : "text-muted"
          }`}
        >
          {title}
        </h4>
      </div>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-soft md:text-base">
            <span
              aria-hidden="true"
              className={`mt-0.5 shrink-0 ${isIn ? "text-accent" : "text-muted"}`}
            >
              {isIn ? "✓" : "✕"}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Side-by-side "In Scope" / "Out of Scope" panels. Horizontal on desktop,
 * stacked on mobile. Registered in the MDX provider, so use it directly in
 * .mdx with array props:
 *
 *   <Scope
 *     inScope={["Item one", "Item two"]}
 *     outScope={["Item one", "Item two"]}
 *   />
 *
 * `not-prose` keeps the typography plugin from restyling the panels.
 */
export default function Scope({ inScope = [], outScope = [] }: ScopeProps) {
  return (
    <div className="not-prose my-8 grid grid-cols-1 gap-4 md:my-10 md:grid-cols-2 md:gap-6">
      <ScopeCard title="In Scope" items={inScope} variant="in" />
      <ScopeCard title="Out of Scope" items={outScope} variant="out" />
    </div>
  );
}
