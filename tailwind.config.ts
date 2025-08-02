import type { Config } from "tailwindcss";

// Apple Liquid Glass token + plugin imports (first-phase scaffolding)
import {
  algColors,
  algBlurLevels,
} from "./libs/components/src/tokens/apple-liquid-glass-tokens";

import appleLiquidGlassPlugin from "./libs/components/src/styles/tailwind-alg-plugin";

// Minimal config for S-tier performance
const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./.storybook/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  // Performance optimization: drastically reduce bundle size
  safelist: [
    // Only the most essential glass effects
    "backdrop-blur-md",
    "backdrop-blur-lg",
    "bg-white/5",
    "bg-white/10",
    "bg-black/5",
    "bg-black/10",
    "border-white/10",
    "border-black/10",
  ],
  theme: {
    // Extend minimal palette with Apple Liquid Glass depth colors.
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      black: "#000000",
      // legacy glass placeholders retained for backward compatibility
      glass: {
        light: "rgba(255, 255, 255, 0.1)",
        dark: "rgba(0, 0, 0, 0.1)",
      },
      // semantic colors remain
      primary: "var(--primary)",
      secondary: "var(--secondary)",
      background: "var(--background)",
      foreground: "var(--foreground)",

      // 🚀 NEW: Apple Liquid Glass depth layers
      ...algColors,
    },
    // Minimal spacing scale
    spacing: {
      "0": "0px",
      "1": "0.25rem",
      "2": "0.5rem",
      "3": "0.75rem",
      "4": "1rem",
      "6": "1.5rem",
      "8": "2rem",
      "12": "3rem",
      "16": "4rem",
    },
    // Essential border radius
    borderRadius: {
      none: "0",
      sm: "0.125rem",
      md: "0.375rem",
      lg: "0.5rem",
      xl: "0.75rem",
      full: "9999px",
    },
    // Extend backdropBlur scale with ALG specific levels
    backdropBlur: {
      none: "0",
      sm: "4px",
      md: "12px",
      lg: "16px",
      xl: "24px",
      ...algBlurLevels,
    },
    // Minimal font sizes
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
    },
    // Essential shadows
    boxShadow: {
      none: "0 0 #0000",
      sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
      lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
      glass: "0 8px 32px rgba(0, 0, 0, 0.1)",
    },
    // Essential animations only
    animation: {
      none: "none",
      pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      "fade-in": "fadeIn 0.3s ease-in-out",
    },
    keyframes: {
      pulse: {
        "0%, 100%": { opacity: "1" },
        "50%": { opacity: ".5" },
      },
      fadeIn: {
        "0%": { opacity: "0" },
        "100%": { opacity: "1" },
      },
    },
  },
  plugins: [appleLiquidGlassPlugin],
};

export default config;
