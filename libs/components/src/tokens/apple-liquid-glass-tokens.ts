/*
* Apple Liquid Glass – design tokens
*
* A minimal subset of tokens required for the first migration step.
* These values mirror the CSS custom properties declared in
* `libs/components/src/styles/apple-liquid-authentic.css` so that Tailwind can
* reference them while still allowing the underlying theme to be driven by
* CSS variables. We intentionally keep the surface small – additional tokens
* (animation curves, saturation, etc.) can be added incrementally.
*/

/*
* Color tokens – primarily depth layers and supporting surfaces.
* Keys are flattened to simple strings so they plug straight into
* Tailwind’s `theme.colors` map (e.g. `bg-depth-1`).
*/
export const algColors = {
  /* Base */
  'glass-bg': 'var(--apple-glass-bg)',
  'glass-border': 'var(--apple-glass-border)',

  /* Depth layers */
  'depth-1': 'var(--liquid-depth-1)',
  'depth-2': 'var(--liquid-depth-2)',
  'depth-3': 'var(--liquid-depth-3)',
  'depth-4': 'var(--liquid-depth-4)',
} as const;

/*
* Backdrop-blur tokens – Tailwind expects raw `px` values. We intentionally
* strip the `blur(` wrapper so utilities like `backdrop-blur-{key}` remain
* valid. The CSS file still holds the canonical `blur()` values.
*/
export const algBlurLevels = {
  light: '10px', // corresponds to --liquid-blur-light (blur(10px))
  medium: '16px', // corresponds to --liquid-blur-medium (blur(16px))
  heavy: '24px', // corresponds to --liquid-blur-heavy (blur(24px))
} as const;

/*
* Shadow tokens – simple wrappers around the authentic Apple shadows.
*/
export const algShadows = {
  glass: 'var(--apple-glass-shadow)',
  'glass-inner': 'var(--apple-glass-inner-shadow)',
} as const;

/*
* Radius scale – rough approximation of Apple concentric radii.
* Included for completeness although not yet wired into Tailwind in this
* iteration.
*/
export const algRadiusScales = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  full: '9999px',
} as const;

/**
* Convenience re-export so downstream consumers can `import * as tokens` and
* access a strongly typed bundle.
*/
export const appleLiquidGlassTokens = {
  colors: algColors,
  blur: algBlurLevels,
  shadows: algShadows,
  radius: algRadiusScales,
};

export type AppleLiquidGlassTokens = typeof appleLiquidGlassTokens;
