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
        // Warm whites / sand
        cream: {
          50: "#FAFAF8",
          100: "#F5F2EC",
          200: "#ECE7DB",
          300: "#E2DACB",
        },
        // Champagne gold accent
        gold: {
          50: "#FAF6EE",
          100: "#F2E9D6",
          200: "#E7D5B2",
          300: "#D9C091",
          400: "#C9A96E", // primary accent
          500: "#B8945A",
          600: "#9C7B45",
          700: "#7C6236",
          800: "#5F4B2A",
        },
        // Warm near-black text
        charcoal: {
          DEFAULT: "#241A18",
          light: "#5C4D48",
          muted: "#9A8C86",
        },
        // Dark rose-brown sidebar
        espresso: {
          DEFAULT: "#2D1B1B",
          900: "#241616",
          800: "#2D1B1B",
          700: "#3A2727",
          600: "#4A3434",
          500: "#5C4444",
        },
        // Muted taupe-rose (used sparingly — NOT pastel pink)
        blush: {
          50: "#F8F2F0",
          100: "#EFE3DE",
          200: "#E0CAC2",
          300: "#CDAA9F",
          400: "#B98C80",
          500: "#A6766A",
          600: "#8C5F54",
          700: "#6F4A41",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        ar: ["var(--font-cairo)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        luxe: "-0.02em",
      },
      boxShadow: {
        soft: "0 1px 3px rgba(36, 26, 24, 0.04), 0 8px 30px -16px rgba(36, 26, 24, 0.12)",
        card: "0 1px 2px rgba(36, 26, 24, 0.04)",
        glow: "0 0 0 1px rgba(201, 169, 110, 0.35), 0 12px 40px -14px rgba(201, 169, 110, 0.35)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fade-in 0.7s ease forwards",
      },
    },
  },
  plugins: [],
};
export default config;
