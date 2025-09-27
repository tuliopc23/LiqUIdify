## Context
We are adding Apple HIG-inspired foundations: semantic color system, material tiers, accent theming, and interaction patterns while keeping SSR safety and accessibility guarantees.

## Goals / Non-Goals
- Goals: semantic tokens, accent API, dynamic type scale, motion preferences, focus ring, contrast.
- Non-Goals: platform-specific native lookalikes beyond tokens; no runtime OS detection.

## Decisions
- Accent theming via CSS custom property `--accent` with media-aware fallbacks; SSR-safe by default value in root.
- Replace custom blue with computed `SystemBlue` pair for light/dark.
- Material tiers as tokens for backdrops; avoid nested heavy blurs to preserve performance.
- Focus ring uses 2px ring + halo outline, using accent color, drawn outside for visibility.
- Enforce minimum 44px interactive target via component recipes.

## Risks / Trade-offs
- Glass/backdrop filters can be costly; constrain to surfaces and avoid nesting.
- Contrast on translucent surfaces requires overlay + text color adjustments.

## Migration Plan
- Map existing colors to new semantic tokens.
- Deprecate `blue` token; introduce `accent` with SystemBlue default.
- Roll out components incrementally behind feature flag in recipes.

## Open Questions
- Should we expose Apple HIG preset as an opt-in theme package?
