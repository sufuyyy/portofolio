/**
 * `template.tsx` remounts on every navigation (unlike `layout.tsx`), so the
 * `animate-page-in` entrance animation replays on each route change — a
 * Framer-Motion-style fade + rise transition between pages. Uses a CSS keyframe
 * with `backwards` fill so no transform is retained afterwards (keeps `fixed`
 * descendants like the cursor-follow preview positioned to the viewport).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-page-in">{children}</div>;
}
