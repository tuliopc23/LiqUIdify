// tailwind.config.ts
import type { Config } from "tailwindcss";
import filters from "tailwindcss-filters";      // ⬅️ enables backdrop-blur / brightness / saturate utilities

const config: Config = {
  /** ----------------------------------------------------------------
   *  1 ▸ Files Tailwind should scan
   * ----------------------------------------------------------------*/
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./.storybook/**/*.{js,ts,jsx,tsx,mdx}",
    "./public/**/*.html",
  ],

  /** ----------------------------------------------------------------
   *  2 ▸ Strategy
   * ----------------------------------------------------------------*/
  darkMode: ["class"],                         // adds `dark:` variants guarded by .class

  /** ----------------------------------------------------------------
   *  3 ▸ Keep critical classes even if purge can’t “see” them
   * ----------------------------------------------------------------*/
  safelist: [
    // Backdrop-filter utilities for glass morphism
    "backdrop-blur-sm",
    "backdrop-blur-md",
    "backdrop-blur-lg",
    "backdrop-brightness-105",
    "backdrop-brightness-110",
    "backdrop-saturate-125",
    "backdrop-saturate-150",

    // Colours & transparency helpers
    "bg-white/5",
    "bg-white/10",

    // Custom shadow defined below
    "shadow-glass",

    // Animation key
    "animate-bg-move",
  ],

  /** ----------------------------------------------------------------
   *  4 ▸ Theme extensions
   * ----------------------------------------------------------------*/
  theme: {
    extend: {
      /* ---------- Colours ------------------------------------------------ */
      colors: {
        glass: {
          light: "rgba(255,255,255,0.08)",      // bg-glass-light
          dark:  "rgba(0,0,0,0.25)",            // bg-glass-dark
        },
      },

      /* ---------- Shadows ------------------------------------------------- */
      boxShadow: {
        glass:
          "0 0 0 2px rgba(255,255,255,0.6), 0 16px 32px rgba(0,0,0,0.12)", // shadow-glass
      },

      /* ---------- Keyframes & Animations --------------------------------- */
      keyframes: {
        "bg-move": {
          "0%":   { "background-position": "center center" },
          "100%": { "background-position": "center top"    },
        },
      },
      animation: {
        "bg-move": "bg-move 5s ease-in-out infinite alternate",
      },
    },
  },

  /** ----------------------------------------------------------------
   *  5 ▸ Plugins
   * ----------------------------------------------------------------*/
  plugins: [
    filters,                                   // backdrop-blur / brightness / saturate utilities
  ],
};

export default config;