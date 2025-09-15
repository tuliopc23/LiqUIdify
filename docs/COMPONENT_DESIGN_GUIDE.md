# Component Design Guide — Liquid Glass High Fidelity

This guide summarizes the practical rules we apply across components to align with Apple’s Liquid Glass aesthetic and the Human Interface Guidelines (HIG).

Note: The Glass* primitives (GlassButton, GlassCard, GlassSwitch) are experimental/demo patterns and are not exported by the public library entry. The official API focuses on Ark UI components wrapped and styled with Panda CSS. Use Glass* only for prototypes or copy the styling patterns into Ark-wrapped components as needed.

Core principles

- Dynamic transparency and blur
  - Prefer semi‑transparent surfaces with backdrop blur and slight saturation for depth and legibility.
  - Increase blur on complex backgrounds; reduce blur on simple backgrounds.
  - Provide an accessibility fallback to solid surfaces via:
    - Component prop: `reduceTransparency`
    - Global opt-out: set `data-reduce-transparency="true"` on `<html>`
    - User preference: respect `(prefers-reduced-transparency: reduce)` when available.

- Soft, generous corner radii
  - Use larger radii to evoke softness and coherence.
  - Defaults (from Panda tokens): `radii.md = 16px`, `radii.xl = 24px`, `radii.2xl = 32px`, `radii.full` for pills.

- Subtle borders and shadows
  - 1px inner/outer borders with low-opacity tints lift glass from background.
  - Use existing tokens: `colors.glass.medium.border`, `shadows.glass.sm|hover|lg`.

- Accessible contrast
  - Text on translucent surfaces should meet 4.5:1 contrast; use `colors.text.glass.primary|secondary|muted`.
  - When transparency is reduced, switch to near‑solid backgrounds to preserve contrast.

- Minimal, crisp typography
  - Prefer system UI fonts with clear hierarchy. Use consistent spacing and line-height.

New glass components

- GlassButton
  - Variants: `primary` (gradient) and `secondary` (subtle tint).
  - Large radius (2xl), thin border, dynamic blur, hover lift, press settle.
  - Accessibility: `reduceTransparency` prop + global opt-out + media query.

- GlassCard
  - Container with radius xl, deeper blur, optional `elevated` shadow.
  - Same transparency controls as above.

- GlassSwitch
  - Frosted track with thin border; crisp thumb with subtle shadow.
  - Uses `data-state=checked` styling for accent activation.

Usage examples

```tsx
import { GlassButton, GlassCard, GlassSwitch } from "liquidify";

export function Example() {
  return (
    <GlassCard elevated className="p-6">
      <h3 className="text-lg">Welcome</h3>
      <GlassButton variant="primary" className="mt-4">Continue</GlassButton>
      <div className="mt-4">
        <GlassSwitch label="Enable feature" />
      </div>
    </GlassCard>
  );
}
```

Accessibility and preferences

- Set `<html data-reduce-transparency="true">` to disable blur globally.
- Components also accept a `reduceTransparency` prop for targeted overrides.
- We attempt to respect `(prefers-reduced-transparency: reduce)` when supported by the platform.

Related docs

- See docs/DESIGN_GUIDELINES.md for broader design language and rationale.
