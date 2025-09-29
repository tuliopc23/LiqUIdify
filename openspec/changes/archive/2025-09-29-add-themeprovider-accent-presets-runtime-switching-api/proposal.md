## Why
Users need a curated set of accessible accent colors and a safe, SSR-friendly way to switch accents at runtime, optionally persisting selection across sessions.

## What Changes
- Add built-in accent preset catalog (Apple-inspired system colors)
- Extend ThemeProvider with accentPreset, accentPresets, setAccentPreset, persistAccent options
- Expose runtime API via useTheme and theme lib: listAccentPresets(), getAccentPreset(), setAccentPreset()
- Ensure SSR safety (no window at import; server-renderable defaults via data-accent or CSS var)
- Enforce contrast requirements for presets (WCAG 2.1 AA) and publish guidance
- Add tests and docs for runtime switching and persistence behaviors

## Impact
- Affected specs: theming
- Affected code:
  - /Users/tuliopinheirocunha/LiqUIdify/libs/components/src/hooks/use-theme.tsx
  - /Users/tuliopinheirocunha/LiqUIdify/libs/components/src/lib/theme.ts
  - /Users/tuliopinheirocunha/LiqUIdify/libs/components/src/index.ts
  - /Users/tuliopinheirocunha/LiqUIdify/libs/components/src/test/theme-accent.test.tsx
  - /Users/tuliopinheirocunha/LiqUIdify/libs/components/src/styles/globals.css
