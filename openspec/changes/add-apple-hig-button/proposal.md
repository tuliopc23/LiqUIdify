## Why
Adopt an Apple Human Interface Guidelines (HIG)–compliant button design across the component library to improve consistency, accessibility, and platform affinity. This enables a coherent design language and simplifies implementation.

## What Changes
- Introduce a comprehensive Apple HIG–style Button as the canonical button.
- Define shared Panda tokens, recipes, and patterns to ensure uniform styling and behavior.
- Provide variants (size, emphasis, prominence), states (hover, focus, pressed, disabled, loading), and icon/label composition.
- Specify interaction, motion, and accessibility requirements per HIG.
- Add migration guidance for deprecating or discarding non-useful button-like components.
- Do not implement code until proposal approval.

## Impact
- Affected specs: components/button; design-system/button-consistency
- Affected code: styled-system/recipes/button.*, libs/components/src/button/*, token files in panda.config.ts, styles.css
