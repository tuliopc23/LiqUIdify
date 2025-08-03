// tailwind.config.ts - Unified Liquid Glass Design System
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
    // Liquid glass core classes
    "liquid-glass",
    "liquid-glass-container",
    "liquid-glass-filter",
    "liquid-glass-overlay",
    "liquid-glass-specular",
    "liquid-glass-content",

    // Size variants
    "liquid-glass-sm",
    "liquid-glass-md",
    "liquid-glass-lg",
    "liquid-glass-xl",

    // Interactive states
    "liquid-glass-interactive",
    "liquid-glass-hover",
    "liquid-glass-active",

    // Component variants
    "liquid-glass-button",
    "liquid-glass-card",
    "liquid-glass-input",
    "liquid-glass-modal",
  ],

  theme: {
    extend: {
      /* ============================================
         COLORS: Environment vs Transparent Components
         ============================================ */
      colors: {
        // Apple blue backgrounds for ENVIRONMENT (not components)
        "apple-blue": {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6", // Main Apple blue
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },

        // Liquid glass colors - TRANSPARENT (exact from your snippets)
        liquid: {
          bg: "rgba(255, 255, 255, 0.25)", // Your exact transparent white
          highlight: "rgba(255, 255, 255, 0.75)", // Your exact white highlight
          text: "#ffffff", // Your exact white text
          accent: "#fb4268", // Your exact red accent
          grey: "#444739", // Your exact grey
        },

        // Background colors for environment/pages
        background: {
          "apple-light": "#f0f9ff", // Light blue background
          "apple-dark": "#0f172a", // Dark background
          "minimal-light": "#fafafa", // Minimal light
          "minimal-dark": "#1a1a1a", // Minimal dark
        },
      },

      /* ============================================
         LIQUID GLASS TYPOGRAPHY
         ============================================ */
      fontFamily: {
        liquid: ["system-ui", "sans-serif"],
        system: [
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "sans-serif",
        ],
      },

      /* ============================================
         LIQUID GLASS SPACING & SIZING
         ============================================ */
      spacing: {
        "liquid-sm": "0.75rem", // 12px
        "liquid-md": "1rem", // 16px
        "liquid-lg": "1.5rem", // 24px
        "liquid-xl": "2rem", // 32px
        "liquid-2xl": "3rem", // 48px
      },

      /* ============================================
         LIQUID GLASS BORDER RADIUS
         ============================================ */
      borderRadius: {
        "liquid-sm": "1rem", // 16px
        "liquid-md": "1.5rem", // 24px
        "liquid-lg": "2rem", // 32px
        "liquid-xl": "2.5rem", // 40px
        "liquid-2xl": "3rem", // 48px
        "liquid-full": "50%", // Perfect circle
      },

      /* ============================================
         LIQUID GLASS SHADOWS
         ============================================ */
      boxShadow: {
        // Main glass shadow (from your examples)
        "liquid-glass":
          "0 6px 6px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)",

        // Enhanced glass shadow
        "liquid-enhanced":
          "0 0 0 2px rgba(255, 255, 255, 0.6), 0 16px 32px rgba(0, 0, 0, 0.12)",

        // Specular highlights (the liquid effect)
        "liquid-specular":
          "inset 1px 1px 0 rgba(255, 255, 255, 0.75), inset 0 0 5px rgba(255, 255, 255, 0.75)",

        // The main liquid effect (from your ::after example)
        "liquid-shine": `
          inset -10px -8px 0px -11px rgba(255, 255, 255, 1),
          inset 0px -9px 0px -8px rgba(255, 255, 255, 1)
        `,

        // Component specific shadows
        "liquid-button":
          "0 4px 8px rgba(0, 0, 0, 0.15), 0 0 12px rgba(0, 0, 0, 0.08)",
        "liquid-card":
          "0 8px 16px rgba(0, 0, 0, 0.12), 0 0 24px rgba(0, 0, 0, 0.06)",
        "liquid-modal":
          "0 24px 48px rgba(0, 0, 0, 0.2), 0 0 40px rgba(0, 0, 0, 0.1)",
      },

      /* ============================================
         LIQUID GLASS BACKDROP FILTERS
         ============================================ */
      backdropBlur: {
        "liquid-sm": "2px",
        "liquid-md": "4px",
        "liquid-lg": "8px",
        "liquid-xl": "12px",
      },

      /* ============================================
         LIQUID GLASS ANIMATIONS
         ============================================ */
      animation: {
        "liquid-hover": "liquidHover 0.2s ease-out",
        "liquid-press": "liquidPress 0.1s ease-in",
        "liquid-shine": "liquidShine 2s ease-in-out infinite",
        "liquid-float": "liquidFloat 3s ease-in-out infinite",
        "bg-move": "bgMove 5s ease-in-out infinite alternate",
      },

      keyframes: {
        liquidHover: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.05)" },
        },
        liquidPress: {
          "0%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(0.95)" },
        },
        liquidShine: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "0.8" },
        },
        liquidFloat: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-4px)" },
        },
        bgMove: {
          from: { backgroundPosition: "center center" },
          to: { backgroundPosition: "center top" },
        },
      },

      /* ============================================
         LIQUID GLASS TRANSITIONS
         ============================================ */
      transitionTimingFunction: {
        liquid: "cubic-bezier(0.175, 0.885, 0.32, 2.2)", // Your exact timing function
        "liquid-smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
        "liquid-bounce": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },

      transitionDuration: {
        "liquid-fast": "0.1s",
        "liquid-normal": "0.2s",
        "liquid-smooth": "0.4s", // Your 0.4s duration
        "liquid-slow": "0.6s",
      },

      /* ============================================
         LIQUID GLASS FILTERS
         ============================================ */
      filter: {
        "liquid-enhance": "saturate(120%) brightness(1.15)",
        "liquid-glow": "drop-shadow(0 0 3px rgba(255, 255, 255, 0.25))",
        "liquid-shine":
          "blur(1px) drop-shadow(10px 4px 6px black) brightness(115%)",
      },

      /* ============================================
         LIQUID GLASS Z-INDEX LAYERS
         ============================================ */
      zIndex: {
        "liquid-filter": "0",
        "liquid-overlay": "1",
        "liquid-specular": "2",
        "liquid-content": "3",
        "liquid-shine": "-1",
      },
    },
  },

  plugins: [
    filters,

    // Custom Liquid Glass Plugin
    function ({ addUtilities, addComponents, theme }) {
      /* ============================================
         CORE LIQUID GLASS UTILITIES
         ============================================ */
      const liquidUtilities = {
        // Base liquid glass effect
        ".liquid-glass": {
          position: "relative",
          background: "transparent",
          borderRadius: theme("borderRadius.liquid-lg"),
          overflow: "hidden",
          boxShadow: theme("boxShadow.liquid-glass"),
          color: theme("colors.liquid.text"),
          transition: `all ${theme("transitionDuration.liquid-smooth")} ${theme("transitionTimingFunction.liquid")}`,
        },

        // The liquid shine effect (your ::after trick)
        ".liquid-glass::after": {
          content: "''",
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "inherit",
          backdropFilter: "blur(1px)",
          boxShadow: theme("boxShadow.liquid-shine"),
          opacity: "0.6",
          zIndex: theme("zIndex.liquid-shine"),
          filter: "blur(1px) drop-shadow(10px 4px 6px black) brightness(115%)",
          pointerEvents: "none",
        },

        // Layered liquid glass system
        ".liquid-glass-container": {
          position: "relative",
          display: "flex",
          alignItems: "center",
          background: "transparent",
          borderRadius: theme("borderRadius.liquid-lg"),
          overflow: "hidden",
          flex: "1 1 auto",
          boxShadow: theme("boxShadow.liquid-glass"),
          color: theme("colors.liquid.text"),
          transition: `all ${theme("transitionDuration.liquid-smooth")} ${theme("transitionTimingFunction.liquid")}`,
        },

        ".liquid-glass-filter": {
          position: "absolute",
          inset: "0",
          borderRadius: "inherit",
          zIndex: theme("zIndex.liquid-filter"),
          backdropFilter: "blur(4px)",
          filter: "saturate(120%) brightness(1.15)",
        },

        ".liquid-glass-overlay": {
          position: "absolute",
          inset: "0",
          borderRadius: "inherit",
          zIndex: theme("zIndex.liquid-overlay"),
          background: theme("colors.liquid.bg"),
        },

        ".liquid-glass-specular": {
          position: "absolute",
          inset: "0",
          borderRadius: "inherit",
          zIndex: theme("zIndex.liquid-specular"),
          boxShadow: theme("boxShadow.liquid-specular"),
        },

        ".liquid-glass-content": {
          position: "relative",
          zIndex: theme("zIndex.liquid-content"),
          display: "flex",
          flex: "1 1 auto",
          alignItems: "center",
          justifyContent: "space-around",
          padding: "12px 28px",
          gap: "1rem",
          flexWrap: "wrap",
        },

        // Interactive states
        ".liquid-glass-interactive": {
          cursor: "pointer",
          transition: `all ${theme("transitionDuration.liquid-normal")} ${theme("transitionTimingFunction.liquid")}`,
        },

        ".liquid-glass-interactive:hover": {
          transform: "scale(1.05)",
        },

        ".liquid-glass-interactive:active": {
          transform: "scale(0.95)",
        },

        // Size variants
        ".liquid-glass-sm": {
          borderRadius: theme("borderRadius.liquid-sm"),
          padding: theme("spacing.liquid-sm"),
        },

        ".liquid-glass-md": {
          borderRadius: theme("borderRadius.liquid-md"),
          padding: theme("spacing.liquid-md"),
        },

        ".liquid-glass-lg": {
          borderRadius: theme("borderRadius.liquid-lg"),
          padding: theme("spacing.liquid-lg"),
        },

        ".liquid-glass-xl": {
          borderRadius: theme("borderRadius.liquid-xl"),
          padding: theme("spacing.liquid-xl"),
        },
      };

      /* ============================================
         LIQUID GLASS COMPONENTS
         ============================================ */
      const liquidComponents = {
        // Liquid Glass Button
        ".liquid-glass-button": {
          "@apply liquid-glass liquid-glass-interactive": {},
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "12px 28px",
          fontFamily: theme("fontFamily.system"),
          fontWeight: "600",
          fontSize: "1rem",
          color: theme("colors.liquid.text"),
          cursor: "pointer",
          userSelect: "none",
          textDecoration: "none",
          whiteSpace: "nowrap",
          border: "none",
          outline: "none",
        },

        // Liquid Glass Card
        ".liquid-glass-card": {
          "@apply liquid-glass": {},
          display: "flex",
          flexDirection: "column",
          padding: theme("spacing.liquid-lg"),
          gap: "1rem",
        },

        // Liquid Glass Input
        ".liquid-glass-input": {
          "@apply liquid-glass": {},
          padding: "12px 16px",
          fontFamily: theme("fontFamily.system"),
          fontSize: "1rem",
          color: theme("colors.liquid.text"),
          border: "none",
          outline: "none",
          background: "transparent",
          width: "100%",
        },

        ".liquid-glass-input::placeholder": {
          color: "rgba(255, 255, 255, 0.6)",
        },

        ".liquid-glass-input:focus": {
          boxShadow: `${theme("boxShadow.liquid-glass")}, 0 0 0 2px ${theme("colors.liquid.accent")}`,
        },

        // Liquid Glass Modal
        ".liquid-glass-modal": {
          "@apply liquid-glass": {},
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: "90vw",
          maxHeight: "90vh",
          padding: theme("spacing.liquid-xl"),
          boxShadow: theme("boxShadow.liquid-modal"),
          zIndex: "1000",
        },

        ".liquid-glass-modal-backdrop": {
          position: "fixed",
          inset: "0",
          background: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(4px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: "999",
        },
      };

      addUtilities(liquidUtilities);
      addComponents(liquidComponents);
    },
  ],
};

export default config;
