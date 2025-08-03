/**
 * Canonical liquid-glass Tailwind plugin.
 * Provides `.liquid-glass` root and namespaced utilities.
 */
import type { PluginCreator } from "tailwindcss/types/config";

export const liquidGlassUtilities: PluginCreator = function ({ matchUtilities, theme, addComponents }) {
  addComponents({
    ".liquid-glass": {
      "@apply relative flex items-center rounded-lg-m overflow-hidden shadow-glass text-glass-text transition-all duration-400 ease-[cubic-bezier(.175,.885,.32,2.2)] bg-transparent": {},
      "&::before": {
        content: '""',
        "@apply absolute inset-0 z-1 bg-gradient-to-br from-white/20 to-transparent rounded-inherit opacity-50 pointer-events-none": {},
      },
      "&::after": {
        content: '""',
        "@apply absolute inset-0 z-2 bg-gradient-to-tl from-white/10 to-transparent rounded-inherit opacity-30 blur-sm pointer-events-none": {},
      },
    },
    ".liquid-glass-filter": {
      "@apply absolute inset-0 backdrop-blur-glass z-0 saturate-120 brightness-115 rounded-inherit": {},
    },
    ".liquid-glass-overlay": {
      "@apply absolute inset-0 z-1 bg-[rgba(255,255,255,.25)] rounded-inherit": {},
    },
    ".liquid-glass-specular": {
      "@apply absolute inset-0 z-2 shadow-spec rounded-inherit": {},
    },
    ".liquid-glass-content": {
      "@apply relative z-3 flex flex-wrap items-center justify-around gap-4 py-3 px-7": {},
    },
    ".liquid-glass-link": {
      "@apply transition-transform duration-200 motion-safe:hover:scale-110 motion-safe:active:scale-95": {},
    },
  });

  matchUtilities(
    { radius: (val: string) => ({ borderRadius: val }) },
    { values: theme("borderRadius") },
  );
};

export default liquidGlassUtilities;