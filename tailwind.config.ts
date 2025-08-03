import type { Config } from "tailwindcss";
import filters from "tailwindcss-filters";
import { liquidGlassUtilities } from "./tailwind/plugins/liquid-glass";

const config: Config = {
  // 1 ▸ Files Tailwind should scan (mirrors root JS config)
  content: [
    "./libs/components/src/**/*.{js,ts,jsx,tsx,mdx}",
    "./apps/storybook/**/*.{js,ts,jsx,tsx,mdx}",
    "./apps/docs/**/*.{js,ts,jsx,tsx,mdx}",
    "./examples/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  // 2 ▸ Strategy
  darkMode: ["class"],

  // 3 ▸ Safelist (unchanged unless legacy glass classes)
  safelist: [
    "backdrop-blur-sm",
    "backdrop-blur-md",
    "backdrop-blur-lg",
    "backdrop-brightness-105",
    "backdrop-brightness-110",
    "backdrop-saturate-125",
    "backdrop-saturate-150",
    "bg-white/5",
    "bg-white/10",
    "shadow-glass",
    "animate-bg-move",
  ],

  // 4 ▸ Theme extensions (remove all glass/glass-effect duplicates, keep only unique needed values)
  theme: {
    extend: {
      // Add unique theme values here if needed
    },
  },

  // 5 ▸ Plugins: canonical liquidGlassUtilities first, then filters
  plugins: [
    liquidGlassUtilities,
    filters,
  ],
};

export default config;