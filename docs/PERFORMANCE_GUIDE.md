# Performance Guide

LiqUIdify ships as a modular, tree‑shakeable library optimized for fast interactive UIs.

## Bundle Size and Tree Shaking

- Import only what you need: `import { GlassButton } from 'liquidify/button'`
- Prefer bundle entry points for categories (core, forms, navigation, feedback)
- Ensure your build tool is configured for ESM and minification (Vite/Next supported)

## Styles Loading

- Global styles: `import 'liquidify/css'`
- Only include once at your app entry; components include minimal CSS-in-CSS classes
- Utility classes are optional; components work without Tailwind

## Rendering and Animations

- Animations use GPU-accelerated transforms and reduced paints
- Respects `prefers-reduced-motion`
- Keep DOM minimal; avoid nesting many translucent layers for large scenes

## Usage Tips

- Memoize heavy lists; prefer virtualization for large tables
- Defer non-critical components with dynamic import/lazy
- Avoid unnecessary re-renders by lifting state and using `React.memo` where appropriate

## Project Scans and Inspections

- Storybook performance stories to compare variants
- Bundle analysis scripts:
  ```sh
  npm run build:analyze
  npm run build:analyze:compressed
  ```
- Storybook imports guard (ensures stories only use production imports):
  ```sh
  bun scripts/storybook-guard.ts
  ```
- Use your IDE's Project Problems/Inspections panel to surface type, lint, and broken import issues during development.

## Benchmarks

- Core bundle < 30KB gz
- Full bundle < 60KB gz
- 60fps animations under typical loads

## Learn More

- Storybook: https://liquidify-storybook.vercel.app
- Docs site (Performance): https://liquidify-docs.vercel.app/guides/performance
