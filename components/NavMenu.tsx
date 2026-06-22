"use client";

import Link from "next/link";
import { useState } from "react";

/**
 * Nav actions. On lg+ the links sit inline; below lg they collapse into a
 * burger button that toggles a full-width dropdown panel.
 */
export default function NavMenu({ email }: { email: string }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      {/* Desktop: inline menu */}
      <div className="hidden items-center gap-7 font-mono text-xs uppercase tracking-[0.1em] lg:flex">
        <Link href="/" className="text-paper transition-opacity hover:opacity-60">
          Work
        </Link>
        <Link href="/about" className="text-paper transition-opacity hover:opacity-60">
          About
        </Link>
        <a
          href={email}
          className="inline-flex shrink-0 items-center bg-accent px-4 py-2 text-paper transition-colors hover:bg-paper hover:text-ink"
        >
          Contact
        </a>
      </div>

      {/* Mobile/tablet: burger button */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-[5px] lg:hidden"
      >
        <span
          className={`block h-0.5 w-6 bg-paper transition-transform duration-200 ${
            open ? "translate-y-[7px] rotate-45" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-paper transition-opacity duration-200 ${
            open ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-paper transition-transform duration-200 ${
            open ? "-translate-y-[7px] -rotate-45" : ""
          }`}
        />
      </button>

      {/* Mobile/tablet: dropdown panel (full-width, below the bar) */}
      {open ? (
        <div className="absolute left-0 right-0 top-16 border-b border-line bg-ink lg:hidden">
          <div className="container-x flex flex-col py-4 font-mono text-sm uppercase tracking-[0.1em]">
            <Link
              href="/"
              onClick={close}
              className="border-b border-line/20 py-4 text-paper"
            >
              Work
            </Link>
            <Link
              href="/about"
              onClick={close}
              className="border-b border-line/20 py-4 text-paper"
            >
              About
            </Link>
            <a
              href={email}
              onClick={close}
              className="mt-4 inline-flex w-fit items-center bg-accent px-4 py-2 text-paper"
            >
              Contact
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
}
