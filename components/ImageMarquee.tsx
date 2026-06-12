"use client";

import { useRef } from "react";

/**
 * Infinite horizontal image scroll. Two identical tracks translate -100% in a
 * seamless loop. On hover the carousel *slows* (not stops) by lowering the
 * animation playbackRate via the Web Animations API — smooth, no position jump.
 * Full-bleed so it spans edge to edge.
 */
export default function ImageMarquee({ images }: { images: string[] }) {
  const ref = useRef<HTMLDivElement>(null);

  if (!images.length) return null;

  const setRate = (rate: number) => {
    const tracks = ref.current?.querySelectorAll("ul");
    tracks?.forEach((track) => {
      track.getAnimations().forEach((anim) => {
        anim.playbackRate = rate;
      });
    });
  };

  const Track = ({ ariaHidden = false }: { ariaHidden?: boolean }) => (
    <ul
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 animate-marquee items-stretch gap-4 pr-4 [animation-duration:180s] md:gap-6 md:pr-6"
    >
      {images.map((src, i) => (
        <li key={`${src}-${i}`} className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt=""
            aria-hidden="true"
            className="h-64 w-auto rounded-xl border border-line bg-surface transition-transform duration-500 hover:scale-[1.02] md:h-[26rem]"
          />
        </li>
      ))}
    </ul>
  );

  return (
    <div
      ref={ref}
      onMouseEnter={() => setRate(0.25)}
      onMouseLeave={() => setRate(1)}
      className="relative flex overflow-hidden py-3"
    >
      <Track />
      <Track ariaHidden />
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink to-transparent md:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink to-transparent md:w-32" />
    </div>
  );
}
