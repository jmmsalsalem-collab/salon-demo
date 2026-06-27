import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        blush: {
          50: "#fdf6f4",
          100: "#fbeae6",
          200: "#f6d3cb",
          300: "#efb3a6",
          400: "#e48a78",
          500: "#d76a55",
          600: "#c2503c",
          700: "#a23f2f",
          800: "#86372b",
          900: "#703229",
        },
        gold: {
          50: "#fbf8ef",
          100: "#f5edd2",
          200: "#ecd9a3",
          300: "#e1bf6e",
          400: "#d8a948",
          500: "#c8902f",
          600: "#b07225",
          700: "#925621",
          800: "#794620",
          900: "#673b1e",
        },
        cream: {
          50: "#fdfcf9",
          100: "#faf6ee",
          200: "#f4ecd9",
        },
        charcoal: {
          DEFAULT: "#2e2a2a",
          light: "#5b5353",
          muted: "#8a807d",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(120, 70, 60, 0.18)",
        glow: "0 0 0 1px rgba(216, 169, 72, 0.25), 0 12px 40px -8px rgba(215, 106, 85, 0.25)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fade-in 0.8s ease forwards",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
