## Why
Adopt an Apple Human Interface Guidelines (HIG)–compliant button design across the component library to improve consistency, accessibility, and platform affinity. This enables a coherent design language and simplifies implementation.

## What Changes
- Introduce a comprehensive Apple HIG–style Button as the canonical button.
- Define shared Panda tokens, recipes, and patterns to ensure uniform styling and behavior.
- Provide variants (size, emphasis, prominence), states (hover, focus, pressed, disabled, loading), and icon/label composition.
- Specify interaction, motion, and accessibility requirements per HIG.
- Add migration guidance for deprecating or discarding non-useful button-like components.
- Do not implement code until proposal approval.

## HIG Reference Alignment
The following HIG areas are the normative sources for this proposal. Specs and implementation MUST align with these:

- Buttons: https://developer.apple.com/design/human-interface-guidelines/buttons
- Controls and Menus (interaction, sizes, focus): https://developer.apple.com/design/human-interface-guidelines/controls
- Typography: https://developer.apple.com/design/human-interface-guidelines/typography
- Color and Contrast: https://developer.apple.com/design/human-interface-guidelines/color
- Motion: https://developer.apple.com/design/human-interface-guidelines/animation
- Accessibility: https://developer.apple.com/design/human-interface-guidelines/accessibility

Alignment notes:
- Minimum target size ≥ 44×44 pt; button sizes map to compact/regular/large with consistent paddings and font metrics.
- Variants: filled/tinted/plain map to HIG emphasis levels; tones include accent/neutral/destructive with WCAG AA contrast in all states.
- States: hover, focus-visible (macOS focus ring), pressed/active, disabled, loading; respect prefers-reduced-motion.
- Motion parameters: subtle easing/duration (120–200ms), disabled under reduced motion.
- Tokenization: radius, spacing, elevation/shadow, opacity, typography scales encoded as Panda tokens/recipes with light/dark/high-contrast conditions.

Traceability:
- Each requirement in `components/button/spec.md` and `design-system/button-consistency/spec.md` references these HIG areas; validation and reviews will check for divergence.

## Impact
- Affected specs: components/button; design-system/button-consistency
- Affected code: styled-system/recipes/button.*, libs/components/src/button/*, token files in panda.config.ts, styles.css
