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
          DEFAULT: "#0a0e16",
          soft: "#0f1420",
        },
        surface: {
          DEFAULT: "#141a26",
          elevated: "#1a2130",
          border: "rgba(255,255,255,0.08)",
        },
        ember: {
          50: "#eaf1ff",
          200: "#a9c6fb",
          400: "#5b93f2",
          500: "#3b82f6",
          600: "#2f6ad1",
          700: "#1f4c9e",
        },
        cream: "#eef1f6",
        smoke: "#8a93a3",
      },
      backgroundImage: {
        "mesh-glow":
          "radial-gradient(60% 50% at 15% 0%, rgba(59,130,246,0.22) 0%, rgba(59,130,246,0) 60%), radial-gradient(45% 40% at 100% 15%, rgba(99,155,241,0.14) 0%, rgba(99,155,241,0) 60%)",
        grain: "url('/noise.png')",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(59,130,246,0.35), 0 8px 40px -8px rgba(59,130,246,0.35)",
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
