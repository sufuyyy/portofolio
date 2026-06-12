"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type WorkItem = {
  slug: string;
  title: string;
  role: string;
  year: string;
  cover: string;
};

/**
 * Editorial project index with a cursor-following thumbnail preview.
 * The preview trails the pointer (lerp smoothing) and tilts with horizontal
 * velocity. Desktop only — mobile shows an inline thumbnail per row.
 */
export default function WorkIndex({ items }: { items: WorkItem[] }) {
  const [active, setActive] = useState<number | null>(null);
  const activeRef = useRef<number | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const ease = reduced ? 1 : 0.16;
    let raf = 0;

    const loop = () => {
      const p = pos.current;
      const t = target.current;
      const dx = (t.x - p.x) * ease;
      const dy = (t.y - p.y) * ease;
      p.x += dx;
      p.y += dy;

      const el = previewRef.current;
      if (el) {
        const shown = activeRef.current !== null;
        const tilt = reduced ? 0 : Math.max(-12, Math.min(12, dx * 0.9));
        el.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%, -50%) rotate(${tilt}deg) scale(${shown ? 1 : 0.82})`;
        el.style.opacity = shown ? "1" : "0";
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleMove = (e: React.MouseEvent) => {
    target.current = { x: e.clientX, y: e.clientY };
  };

  const enterRow = (e: React.MouseEvent, i: number) => {
    const c = { x: e.clientX, y: e.clientY };
    target.current = c;
    // snap to cursor when first appearing so it doesn't fly in from a corner
    if (activeRef.current === null) pos.current = { ...c };
    activeRef.current = i;
    setActive(i);
  };

  const leaveList = () => {
    activeRef.current = null;
    setActive(null);
  };

  return (
    <>
      <div
        onMouseMove={handleMove}
        onMouseLeave={leaveList}
        className="border-b border-line/60"
      >
        {items.map((item, i) => (
          <Link
            key={item.slug}
            href={`/works/${item.slug}`}
            onMouseEnter={(e) => enterRow(e, i)}
            className="group relative block border-t border-line/60 py-6 transition-colors duration-300 hover:bg-surface/40 md:py-8"
          >
            <div className="container-x flex items-center justify-between gap-6">
              <div className="flex min-w-0 items-baseline gap-4 md:gap-8">
                <span className="font-display text-sm tabular-nums text-muted transition-colors group-hover:text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="truncate font-display text-3xl font-bold tracking-tight text-soft transition-colors duration-300 group-hover:text-paper md:text-5xl">
                  {item.title}
                </h3>
              </div>

              <div className="flex shrink-0 items-center gap-8">
                <span className="hidden text-sm text-muted lg:block">
                  {item.role}
                </span>
                <span className="hidden text-sm tabular-nums text-muted md:block">
                  {item.year}
                </span>
                <span
                  aria-hidden="true"
                  className="text-xl text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent"
                >
                  ↗
                </span>
              </div>
            </div>

            {/* Mobile: inline thumbnail (no hover on touch) */}
            <div className="container-x mt-4 md:hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.cover}
                alt={item.title}
                className="aspect-[16/10] w-full rounded-lg border border-line object-cover"
              />
            </div>
          </Link>
        ))}
      </div>

      {/* Cursor-following preview (desktop) */}
      <div
        ref={previewRef}
        aria-hidden="true"
        style={{ opacity: 0 }}
        className="pointer-events-none fixed left-0 top-0 z-40 hidden h-52 w-80 overflow-hidden rounded-xl border border-line shadow-2xl shadow-ink/70 will-change-transform md:block"
      >
        {items.map((item, i) => (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            key={item.slug}
            src={item.cover}
            alt=""
            style={{ opacity: active === i ? 1 : 0 }}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300"
          />
        ))}
      </div>
    </>
  );
}
