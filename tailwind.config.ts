import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./sections/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "hsl(var(--bg))",
        surface: "hsl(var(--surface))",
        surface2: "hsl(var(--surface-2))",
        border: "hsl(var(--border))",
        text: "hsl(var(--text))",
        "text-2": "hsl(var(--text-2))",
        "text-3": "hsl(var(--text-3))",
        accent: "hsl(var(--accent))",
        "accent-2": "hsl(var(--accent-2))",
        ring: "hsl(var(--ring))",
        danger: "hsl(var(--danger))",
        success: "hsl(var(--success))",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,.35)",
        glow: "0 0 0 1px rgba(255,255,255,.06), 0 10px 30px rgba(0,0,0,.35)",
      },
      borderRadius: {
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        "3xl": "var(--radius-3xl)",
      },
      spacing: {
        "section-y": "var(--space-section-y)",
        "gutter-x": "var(--space-gutter-x)",
      },
      letterSpacing: {
        tightish: "-0.02em",
      },
      backdropBlur: {
        glass: "12px",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        sheen: {
          "0%": { transform: "translateX(-40%)" },
          "100%": { transform: "translateX(140%)" },
        },
      },
      animation: {
        floaty: "floaty 10s ease-in-out infinite",
        sheen: "sheen 1.5s ease-out",
      },
    },
  },
  plugins: [],
} satisfies Config;

