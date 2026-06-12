import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-x flex min-h-[50vh] flex-col items-start justify-center py-24">
      <p className="text-sm uppercase tracking-[0.2em] text-muted">404</p>
      <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-paper">
        Page not found.
      </h1>
      <Link
        href="/"
        className="mt-6 text-sm text-muted underline-offset-4 transition-colors hover:text-paper hover:underline"
      >
        ← Back to work
      </Link>
    </div>
  );
}
