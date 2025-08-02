/**
* Tailwind CSS plugin that exposes a handful of Apple Liquid Glass utilities.
*
* This is intentionally lightweight – just the base `.alg-glass` class plus
* four depth modifiers.  The goal is to unblock the first two component
* migrations (badge/avatar) and validate that tokens round-trip all the way
* through Tailwind’s pipeline.  We can iterate with additional effects once
* the foundation proves stable.
*/

import plugin from "tailwindcss/plugin";

export const appleLiquidGlassPlugin = plugin(({ addUtilities }) => {
  // Base glass effect (relies on CSS variables defined in
  // `apple-liquid-authentic.css`).
  const utilities: Record<string, Record<string, string>> = {
    '.alg-glass': {
      background: 'var(--apple-glass-bg)',
      'backdrop-filter': 'blur(16px) saturate(180%)',
      '-webkit-backdrop-filter': 'blur(16px) saturate(180%)',
      border: '1px solid var(--apple-glass-border)',
      'border-radius': '0.75rem',
      'box-shadow': 'var(--apple-glass-shadow)',
      'transition': 'var(--liquid-transition)',
    },
    '.alg-depth-1': {
      background: 'var(--liquid-depth-1)',
      'backdrop-filter': 'var(--liquid-blur-light)',
      '-webkit-backdrop-filter': 'var(--liquid-blur-light)',
    },
    '.alg-depth-2': {
      background: 'var(--liquid-depth-2)',
      'backdrop-filter': 'var(--liquid-blur-medium)',
      '-webkit-backdrop-filter': 'var(--liquid-blur-medium)',
    },
    '.alg-depth-3': {
      background: 'var(--liquid-depth-3)',
      'backdrop-filter': 'var(--liquid-blur-heavy)',
      '-webkit-backdrop-filter': 'var(--liquid-blur-heavy)',
    },
    '.alg-depth-4': {
      background: 'var(--liquid-depth-4)',
      'backdrop-filter': 'blur(32px) saturate(240%)',
      '-webkit-backdrop-filter': 'blur(32px) saturate(240%)',
    },
  };

  addUtilities(utilities, ['responsive', 'hover']);
});

export default appleLiquidGlassPlugin;
