import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getAbout } from "@/lib/content";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = await getAbout();
  const name = frontmatter.name ?? "Portfolio";
  const role = frontmatter.role ?? "UI Designer";
  return {
    title: {
      default: `${name} — ${role}`,
      template: `%s — ${name}`,
    },
    description: frontmatter.bio,
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${spaceGrotesk.variable}`}>
      <body className="flex min-h-screen flex-col font-sans">
        {/* Film-grain texture overlay */}
        <div
          aria-hidden="true"
          className="grain pointer-events-none fixed inset-0 z-[100] opacity-[0.035] mix-blend-soft-light"
        />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
