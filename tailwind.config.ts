import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        base: {
          DEFAULT: "#0a0a0c",
          soft: "#111114",
        },
        surface: {
          DEFAULT: "#16161a",
          elevated: "#1c1c21",
          border: "rgba(255,255,255,0.08)",
        },
        ember: {
          50: "#fff2ea",
          200: "#f7b988",
          400: "#ef8b45",
          500: "#e2672b",
          600: "#c1501d",
          700: "#973e18",
        },
        cream: "#f3ede1",
        smoke: "#8f8a86",
      },
      backgroundImage: {
        "mesh-glow":
          "radial-gradient(60% 50% at 15% 0%, rgba(226,103,43,0.22) 0%, rgba(226,103,43,0) 60%), radial-gradient(45% 40% at 100% 15%, rgba(247,185,136,0.14) 0%, rgba(247,185,136,0) 60%)",
        grain: "url('/noise.png')",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(226,103,43,0.35), 0 8px 40px -8px rgba(226,103,43,0.35)",
        card: "0 1px 0 0 rgba(255,255,255,0.05) inset, 0 20px 50px -20px rgba(0,0,0,0.6)",
      },
      transitionTimingFunction: {
        signature: "cubic-bezier(0.21, 0.47, 0.32, 0.98)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
      },
      animation: {
        shimmer: "shimmer 1.6s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
