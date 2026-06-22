"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * `template.tsx` remounts on every navigation (unlike `layout.tsx`), so this
 * entrance animation replays on each route change — a subtle fade + rise
 * transition between pages. Enter-only (App Router doesn't expose route exit
 * cleanly). Disabled when the user prefers reduced motion.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
