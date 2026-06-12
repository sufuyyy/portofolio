import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#08080a",
        surface: "#121214",
        line: "#26262b",
        muted: "#85858f",
        soft: "#c4c4cd",
        paper: "#f7f7f5",
        accent: "#3574B2",
        accent2: "#22d3ee",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "76rem",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
        "marquee-reverse": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        spinSlow: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        rise: {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        pageIn: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.4", transform: "scale(0.85)" },
        },
        bounceY: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(4px)" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        "marquee-reverse": "marquee-reverse 30s linear infinite",
        "spin-slow": "spinSlow 7s linear infinite",
        rise: "rise 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        "page-in": "pageIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) backwards",
        "pulse-dot": "pulseDot 2s ease-in-out infinite",
        "bounce-y": "bounceY 1.6s ease-in-out infinite",
      },
      typography: ({ theme }: { theme: (path: string) => string }) => ({
        invert: {
          css: {
            "--tw-prose-body": theme("colors.soft"),
            "--tw-prose-headings": theme("colors.paper"),
            "--tw-prose-bold": theme("colors.paper"),
            "--tw-prose-links": theme("colors.accent"),
            "--tw-prose-bullets": theme("colors.accent"),
            "--tw-prose-hr": theme("colors.line"),
            "--tw-prose-quotes": theme("colors.soft"),
            "--tw-prose-quote-borders": theme("colors.accent"),
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
