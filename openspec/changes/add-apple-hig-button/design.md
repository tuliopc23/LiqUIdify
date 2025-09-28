# Design: Apple HIG Button (add-apple-hig-button)

## Context
We’re introducing an Apple HIG–aligned Button as the canonical control, enforced by Panda CSS tokens/recipes. This ensures visual and interaction consistency across components while keeping the API minimal and strongly typed. This design focuses on three areas:
- Token namespaces to standardize visual primitives (color, radius, spacing, typography, elevation, motion).
- A single `button` recipe that encodes variants, sizes, tones, states, and conditions.
- Accessibility and motion decisions that align with HIG and WCAG while supporting platform preferences (e.g., `prefers-reduced-motion`).

References (normative sources):
- Buttons: https://developer.apple.com/design/human-interface-guidelines/buttons
- Controls and Menus (interaction, sizes, focus): https://developer.apple.com/design/human-interface-guidelines/controls
- Typography: https://developer.apple.com/design/human-interface-guidelines/typography
- Color and Contrast: https://developer.apple.com/design/human-interface-guidelines/color
- Motion: https://developer.apple.com/design/human-interface-guidelines/animation
- Accessibility: https://developer.apple.com/design/human-interface-guidelines/accessibility

## Goals
- Canonical HIG-aligned Button with consistent behavior across all button-like affordances.
- Recipe-driven styling: variants, sizes, tones, and states defined centrally and consumed everywhere.
- Strong a11y defaults: focus-visible ring, 44×44 min targets, semantic/ARIA correctness.
- Motion that feels native to Apple platforms, and that respects `prefers-reduced-motion`.
- High-contrast, light/dark, and theme-accent support via tokens and conditions.

## Non-Goals
- Building a toggle button in this change (separate control; would introduce pressed/selected ARIA semantics).
- Introducing ripple/ink effects (not a HIG pattern).
- Replacing every legacy button-like component in one step (handled gradually via migration helpers).

---

## Decisions

### 1) Token Namespaces
We define or extend the following namespaces. Tokens are used by the `button` recipe (and optionally by other controls) to encode HIG-aligned visuals. Token names intentionally mirror the conceptual model below; specific values may be tuned without changing the names.

- colors
  - accent.dynamic: dynamic platform accent color for focus and primary emphasis.
  - button.{variant}.{tone}.{state}[.subpart]
    - variant: filled | tinted | plain
    - tone: accent | neutral | destructive
    - state: default | hover | active | disabled | focus | loading
    - subpart (optional): text | bg | border | icon
  - Examples:
    - colors.button.filled.accent.bg.default
    - colors.button.filled.accent.text.default
    - colors.button.tinted.neutral.border.hover
    - colors.button.plain.destructive.text.active

- radii
  - roles.button: main button radius (capsule where appropriate).
  - roles.buttonCompact: tighter rounding for compact size when capsule is visually heavy.
  - roles.control: generic small control radius (for secondary controls).
  - Note: these build on core radii tokens; roles.* enables semantic evolution.

- spacing
  - button.pad.{size}: horizontal padding by size (compact|regular|large).
  - button.gap.icon.{size}: space between icon and label per size.
  - button.hit.min: minimum interactive target; enforces ≥44×44 via padding + line-height.

- typography
  - button.font.{size}.{property}: size-specific font metrics (size, weight, line-height, letter-spacing).
  - button.icon.{size}: icon dimension per size; vertically centers with text.

- elevation/shadows
  - button.shadow.{state}: shadow/elevation per state and theme (e.g., default|hover|active).
  - glass-aware overlays for translucent contexts are separate tokens and selectively applied by variant/condition.

- opacity
  - button.disabled: alpha for disabled visuals where needed (prefer separate color tokens over global alpha when possible).

- motion
  - duration: motion.duration.button.{event} (hover|press|focus)
  - easing: motion.easing.glass.flow / spring for small, friendly interactions (must feel native and subtle)
  - transform thresholds: motion.transform.button.hover (e.g., translateY(-1px)) for hover cues

- conditions (theming & media)
  - color-scheme: light | dark | high-contrast
  - media: hover, focus-visible, active, disabled, reduced-motion
  - data attributes: [data-loading], [data-icon], [data-icon-position], etc.

Notes:
- We already rely on a dynamic accent (e.g., colors.accent.dynamic) used for focus rings and primary emphasis.
- All color tokens MUST satisfy WCAG AA contrast for text in default and interactive states on their respective backgrounds.

### 2) Recipe Structure: `button`
A single-part Panda recipe named `button` encodes all visual states and conditions. It does not own behavior; the component wires events and accessibility.

- Variants
  - variant: filled | tinted | plain
  - tone: accent | neutral | destructive
  - size: compact | regular | large
  - state conditions are expressed via selectors and data attributes:
    - &:disabled, &[aria-disabled="true"], &[data-loading="true"]
    - &:hover, &:active, &:focus-visible
    - @media (prefers-reduced-motion: reduce)

- Base style (applies to all variants)
  - display: inline-flex; align-items: center; justify-content: center
  - min-inline-size/height to ensure ≥44×44 target (computed via size + spacing.button.hit.min)
  - border-radius: radii.roles.button (or roles.buttonCompact for compact)
  - typographic tokens: typography.button.font.{size}.*
  - icon rules: svg or icon slot sized by typography.button.icon.{size}
  - pointer: cursor: pointer unless disabled; consistent disabled cursor
  - gap: spacing.button.gap.icon.{size} when icon + label
  - outline: none; rely on focus-visible styles

- Variant: filled
  - Background/text/border from colors.button.filled.{tone}.{state}
  - Strong emphasis; primary actions usually tone=accent
  - Shadows: button.shadow.{state} (hover slightly elevated, active reduced)

- Variant: tinted
  - Subtle background tint with visible outline in neutral/destructive tones
  - Hover/active deepen tint and border; keep contrast AA compliant

- Variant: plain
  - No solid bg, transparent or subtle text emphasis
  - Hover/active use subtle bg/underline and color shifts to indicate affordance

- Sizes
  - compact | regular | large adjust:
    - Horizontal/vertical padding: spacing.button.pad.{size}
    - Font metrics: typography.button.font.{size}.*
    - Icon size: typography.button.icon.{size}
    - Radius: roles.buttonCompact for compact if needed

- Focus-visible
  - Box ring using accent.dynamic (platform accent), e.g., 2–3px halo
  - Must respect high-contrast condition (increase visibility) and not rely solely on color
  - Implemented via focus-visible condition, using tokens not raw values

- Loading state
  - [data-loading="true"]:
    - Suppress hover/active transforms
    - Show a spinner or progress affordance (slot or inline)
    - Update accessible name/ARIA (see a11y)

- Disabled state
  - &:disabled, &[aria-disabled="true"]:
    - Reduce contrast according to colors.button.*.disabled tokens
    - Remove pointer/events and animations
    - Preserve readable text (avoid sub-AA contrast)

- Reduced motion
  - @media (prefers-reduced-motion: reduce):
    - Remove transforms and opacity transitions
    - Keep instantaneous focus-visible ring; no animated ring

### 3) Component API Mapping
The React `Button` component exposes a minimal prop surface and maps directly to the recipe:

- Props
  - variant: "filled" | "tinted" | "plain" (default: "filled")
  - tone: "accent" | "neutral" | "destructive" (default: "accent")
  - size: "compact" | "regular" | "large" (default: "regular")
  - loading?: boolean → sets [data-loading="true"], disables pointer, announces busy
  - disabled?: boolean → sets disabled or aria-disabled depending on rendered element
  - icon?: ReactNode (icon-only if no children)
  - iconPosition?: "start" | "end" (default: "start")
  - as?: polymorphic primitive (e.g., "button" | "a" | RouterLink)
  - aria-label?: required for icon-only
  - onPress?: unified click/keyboard press handler (maps to onClick + key handlers)

- Behavior Notes
  - While the recipe owns visuals, the component is responsible for:
    - Enforcing 44×44 minimum target with size + padding tokens
    - Setting disabled vs aria-disabled depending on `as`
    - Announcing loading with appropriate ARIA
    - Keyboard semantics parity (Enter/Space activation when not a native <button>)

- Legacy compatibility
  - Existing variants ("primary" | "secondary" | "ghost" | "danger" | "success" | "warning") are mapped via a temporary shim:
    - primary → filled + accent
    - secondary → tinted + neutral
    - ghost → plain + neutral
    - danger → filled + destructive
    - success/warning → temporarily map to tinted + neutral with informative color tweaks where available; document deprecation in migration
  - Deprecation warnings in development; docs provide migration guidance.

---

## Accessibility Decisions

- Focus-visible
  - 2–3px halo using accent.dynamic and a subtle outer glow; must be clearly visible on light/dark/glass and in high-contrast.
  - No animation under reduced motion; instantaneous.

- Minimum target size
  - Enforced via size-specific padding + line-height to meet ≥44×44 for all configurations (including icon-only).

- Name computation
  - Label text content or `aria-label` for icon-only.
  - If both are present, `aria-label` overrides in accessible name.

- Disabled semantics
  - If rendered as native <button>, use `disabled` attribute.
  - If rendered as a link or custom element via `as`, use `aria-disabled="true"` and prevent activation handlers.

- Loading semantics
  - When `loading`, set `aria-busy="true"` on the control and disable activation.
  - Provide `aria-live="polite"` feedback only if content within the button changes meaningfully (generally avoid; prefer nearby status).

- Contrast
  - All text vs bg combinations meet AA contrast in default/hover/active states.
  - Disabled may loosen contrast slightly but remains legible.

- Keyboard support
  - Enter/Space activate (if not native <button>).
  - Focus order preserved; focus-visible ring indicates focus.

---

## Motion Decisions

- Durations
  - hover: 120–160ms
  - press/active: 120–160ms
  - focus ring: 120–160ms (no animation under reduced motion)

- Easing
  - Subtle cubic-bezier curves consistent with glass tokens (e.g., “flow”); no overshoot on press.
  - Avoid large transforms; prefer opacity/shadow for emphasis.

- Reduced Motion
  - Disable transitions for hover/press/focus
  - No transform-based micro-interactions; keep state changes instantaneous

- Transform budget
  - Hover: translateY(-1px) maximum for non-reduced motion; no scale on text to avoid reflow artifacts.

---

## Theming & Conditions

- Light/Dark/High-Contrast
  - All colors.button.* tokens resolve per scheme; high-contrast increases ring thickness or contrast where necessary.
- Accent Theming
  - Primary emphasis aligns to accent.dynamic; tone=accent variants derive from accent dynamic tokens.
- Glass Context
  - Where the UI uses translucent surfaces, colors and shadows are composed with glass tokens for consistent depth and readability.

---

## Implementation Plan (excerpt from tasks 3.1–3.2)

- 3.1 Tokens & Recipes
  - Add/extend tokens:
    - colors.button.filled|tinted|plain for accent/neutral/destructive across states
    - radii.roles.button and radii.roles.buttonCompact (ensure already present or tune)
    - spacing.button.pad.{compact,regular,large}, spacing.button.gap.icon.{size}, spacing.button.hit.min
    - typography.button.font.{size}.{size,weight,lineHeight,letterSpacing}, typography.button.icon.{size}
    - button.shadow.{default,hover,active}
    - motion.duration.button.{hover,press,focus}, motion.easing.glass.flow (reuse existing easing tokens if present)
  - Define Panda recipe `button` with:
    - variants: variant, tone, size
    - compoundVariants to enforce AA contrast rules or special casing for destructive
    - state selectors: hover/active/focus-visible/disabled/loading
    - media conditions: reduced-motion
    - data attrs: [data-loading], [data-icon], [data-icon-position]

- 3.2 Component & Stories/Previews
  - Implement React Button:
    - Polymorphic `as`
    - Map props to recipe; forward refs
    - Icon-only guard: require `aria-label` in dev
    - Loading: add spinner slot, set aria-busy, disable pointer
    - Disabled semantics based on element
  - Add visual stories/previews:
    - All variants × tones × sizes
    - Icon-only/leading/trailing icon composition
    - States (hover, focus-visible, active, disabled, loading)
    - Light/dark/high-contrast; reduced-motion

---

## Risks / Trade-offs

- Variant/tone expansion increases token surface area; mitigated by consistent naming and shared state rules.
- Backward compatibility with legacy variants adds temporary complexity; mitigated by a clear deprecation timeline and codemods/migration docs.
- Enforcing 44×44 can affect dense layouts; mitigated by “compact” size tuned to meet the minimum while conserving space.

---

## Migration Plan (high-level)
- Provide a mapping table from legacy variants to new variant+tone.
- Add a development-time warning when using legacy props.
- Update library docs and examples to use new API.
- Schedule deprecation removal after one minor release cycle or per project policy.

---

## Acceptance Criteria

- Visual: Recipes produce HIG-aligned buttons across variants/sizes/tones with AA contrast in default/interactive states.
- A11y: 44×44 min target, proper focus-visible ring, correct disabled/loading semantics, icon-only requires accessible name.
- Motion: Subtle, native-feeling; disabled under reduced motion.
- Theming: Light/dark/high-contrast handled via tokens/conditions; primary emphasis uses accent.dynamic.
- Implementation: Single `button` recipe consumed by the Button component and by other button-like controls via shared recipes.