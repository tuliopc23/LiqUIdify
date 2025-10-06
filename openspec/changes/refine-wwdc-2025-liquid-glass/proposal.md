# Refine WWDC 2025 Liquid Glass Design System Compliance

## Why
Apple introduced significant enhancements to the Liquid Glass design language at WWDC 2025, including lensing effects, frostiness properties, motion-responsive materials, and adaptive contrast. The current implementation is at ~95% parity but lacks these key WWDC 2025 innovations that define the modern Apple design aesthetic.

## What Changes
- Add lensing effect tokens (edge highlights, refraction, optical depth) to Panda CSS
- Add frostiness tokens distinct from blur (opacity gradients, frosted glass appearance)
- Add motion-responsive property tokens (device tilt response, light reflection angles)
- Refine adaptive contrast tokens for context-aware vibrancy adjustments
- Add GPU-optimized performance tokens (will-change, transform optimizations)
- Update liquid-glass recipe to incorporate all WWDC 2025 specifications
- Ensure all new tokens use P3 color space with sRGB fallbacks for maximum vibrancy

## Impact
- Affected specs: theming
- Affected code: 
  - `panda.config.ts` (extend tokens.colors.glass with lensing, frostiness, motion)
  - `styled-system/recipes/liquid-glass.*` (regenerated from Panda)
  - No breaking changes - purely additive enhancements to existing token system
  - All existing components benefit automatically through token inheritance
