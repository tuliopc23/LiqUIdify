// tailwind.config.ts - High-Fidelity Liquid Glass Design System
// Based on reference: previews/liquid-glass-button.html
import type { Config } from "tailwindcss";
import filters from "tailwindcss-filters";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./libs/**/*.{js,ts,jsx,tsx,mdx}",
    "./apps/**/*.{js,ts,jsx,tsx,mdx}",
    "./.storybook/**/*.{js,ts,jsx,tsx,mdx}",
    "./public/**/*.html",
  ],

  darkMode: ["class"],

  safelist: [
    // Core liquid glass system
    "liquid-glass",
    "liquid-glass-interactive",
    "liquid-theme-light",
    "liquid-theme-dark",

    // Size variants
    "liquid-glass-xs",
    "liquid-glass-sm",
    "liquid-glass-md",
    "liquid-glass-lg",
    "liquid-glass-xl",

    // Component variants
    "liquid-glass-button",
    "liquid-glass-button-xs",
    "liquid-glass-button-sm",
    "liquid-glass-button-md",
    "liquid-glass-button-lg",
    "liquid-glass-button-xl",
    "liquid-glass-button-primary",
    "liquid-glass-button-secondary",
    "liquid-glass-button-ghost",
    "liquid-glass-card",
    "liquid-glass-card-sm",
    "liquid-glass-card-lg",
    "liquid-glass-input",
    "liquid-glass-modal",
    "liquid-glass-modal-backdrop",

    // Utility classes
    "liquid-elevated",
    "liquid-surface",
  ],

  theme: {
    extend: {
      /* ============================================
         HIGH-FIDELITY LIQUID GLASS COLOR SYSTEM
         ============================================ */
      colors: {
        // Core Apple colors matching reference
        "apple-blue": {
          500: "#007aff", // Apple system blue
          400: "#5ac8fa", // Apple light blue
        },

        // Liquid glass system colors (CSS custom properties)
        liquid: {
          primary: "var(--lg-primary, #007aff)",
          "primary-light": "var(--lg-primary-light, #5ac8fa)",
          text: "var(--lg-text, #1a1d21)",
          "text-inverse": "var(--lg-text-inverse, #ffffff)",
          accent: "var(--lg-accent, #007aff)",
          bg: "var(--lg-bg-color, rgba(255, 255, 255, 0.4))",
          "bg-readable": "var(--lg-bg-readable, rgba(255, 255, 255, 0.75))",
          highlight: "var(--lg-highlight, rgba(255, 255, 255, 0.85))",
        },

        // Environment backgrounds (for pages, not components)
        background: {
          "apple-light": "#f0f9ff",
          "apple-dark": "#0f172a",
          "gradient-light":
            "radial-gradient(80rem 60rem at 20% 20%, rgba(162, 210, 255, 0.3), transparent 60%), radial-gradient(80rem 60rem at 80% 30%, rgba(255, 183, 248, 0.28), transparent 60%), linear-gradient(135deg, #c9e7ff 0%, #d9d0ff 45%, #ffc9dc 100%)",
        },
      },

      /* ============================================
         HIGH-FIDELITY TYPOGRAPHY
         ============================================ */
      fontFamily: {
        system: [
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },

      /* ============================================
         LIQUID GLASS BORDER RADIUS SYSTEM
         ============================================ */
      borderRadius: {
        "liquid-xs": "var(--lg-radius-xs, 0.75rem)", // 12px
        "liquid-sm": "var(--lg-radius-sm, 1rem)", // 16px
        "liquid-md": "var(--lg-radius-md, 1.25rem)", // 20px
        "liquid-lg": "var(--lg-radius-lg, 1.5rem)", // 24px
        "liquid-xl": "var(--lg-radius-xl, 2rem)", // 32px
      },

      /* ============================================
         HIGH-FIDELITY SHADOW SYSTEM
         ============================================ */
      boxShadow: {
        // Main glass shadow (exact from reference)
        "liquid-main":
          "var(--lg-shadow-main, 0 6px 6px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1))",

        // Shine effect shadow (exact from reference)
        "liquid-shine":
          "var(--lg-shine-shadow, inset -10px -8px 0px -11px rgba(255, 255, 255, 1), inset 0px -9px 0px -8px rgba(255, 255, 255, 1))",

        // Elevated glass shadow
        "liquid-elevated":
          "0 12px 24px rgba(0, 0, 0, 0.15), 0 0 32px rgba(0, 0, 0, 0.08)",

        // Ghost button shadows
        "liquid-ghost-light": "0 4px 10px rgba(0, 0, 0, 0.08)",
        "liquid-ghost-dark":
          "0 12px 20px rgba(0, 0, 0, 0.24), 0 2px 4px rgba(0, 0, 0, 0.14)",

        // Modal shadow
        "liquid-modal":
          "0 24px 48px rgba(0, 0, 0, 0.2), 0 0 40px rgba(0, 0, 0, 0.1)",

        // Focus shadow
        "liquid-focus":
          "var(--lg-shadow-main, 0 6px 6px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)), 0 0 0 4px rgba(0, 122, 255, 0.2)",
      },

      /* ============================================
         HIGH-FIDELITY BACKDROP FILTERS
         ============================================ */
      backdropBlur: {
        "liquid-light": "10px", // Light theme
        "liquid-main": "12px", // Main blur
        "liquid-ghost": "8px", // Ghost variant
        "liquid-ghost-dark": "12px", // Ghost dark theme
      },

      /* ============================================
         HIGH-FIDELITY TRANSITIONS (from reference)
         ============================================ */
      transitionTimingFunction: {
        liquid: "var(--lg-transition, cubic-bezier(0.175, 0.885, 0.32, 2.2))", // Exact Apple timing
        "liquid-fast": "ease-out",
        "liquid-press": "ease-in",
      },

      transitionDuration: {
        "liquid-main": "0.4s", // Main transition
        "liquid-fast": "0.2s", // Hover transition
        "liquid-press": "0.1s", // Active/press transition
      },
    },
  },

  plugins: [
    filters,

    // High-Fidelity Liquid Glass Plugin (based on reference implementation)
    function ({ addUtilities }: any) {
      const liquidUtilities = {
        // Import the complete CSS system
        "@import": "./src/styles/liquid-glass-system.css",

        // Additional utility classes for Tailwind integration
        ".liquid-theme-toggle": {
          "&.light": {
            "@apply liquid-theme-light": {},
          },
          "&.dark": {
            "@apply liquid-theme-dark": {},
          },
        },

        // Responsive utilities
        ".liquid-responsive": {
          "@media (max-width: 768px)": {
            ".liquid-glass-modal": {
              padding: "1.5rem",
              maxWidth: "95vw",
              maxHeight: "95vh",
            },
          },
        },
      };

      addUtilities(liquidUtilities);
    },
  ],
};

export default config;
