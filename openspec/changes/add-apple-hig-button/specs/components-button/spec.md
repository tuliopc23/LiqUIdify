## ADDED Requirements

### Requirement: Apple HIG Button
The system SHALL provide a primary Button aligned with Apple Human Interface Guidelines (HIG), implemented with Panda CSS tokens/recipes and exposed in the component library.

#### Scenario: Primary button default
- **WHEN** a consumer uses the Button with default props
- **THEN** it SHALL render with HIG-aligned radius, spacing, contrast, and typography
- **AND** adopt platform-appropriate elevation and motion on interaction

#### Scenario: Variants and sizes
- **WHEN** the Button is configured with `variant` (filled, tinted, plain) and `size` (compact, regular, large)
- **THEN** it SHALL map to Panda recipes that enforce consistent paddings, font metrics, icon sizing, and min-hit area (≥44×44)

#### Scenario: States
- **WHEN** the Button changes state (hover, focus-visible, pressed, disabled, loading)
- **THEN** it MUST apply tokens for colors, shadows, and opacity to reflect state
- **AND** preserve accessible contrast (WCAG AA) in all states

#### Scenario: Icon + label composition
- **WHEN** the Button is used with icon-only, leading icon, trailing icon, or both
- **THEN** it SHALL provide spacing rules, label truncation, and accessible name computation

#### Scenario: Accessibility
- **WHEN** the Button is navigated by keyboard or assistive tech
- **THEN** it MUST support focus-visible styles, ARIA attributes for loading/disabled, and respect `prefers-reduced-motion`

#### Scenario: Motion
- **WHEN** interaction occurs (press, hover, focus)
- **THEN** motion SHALL be subtle, duration 120–200ms, easing per HIG, and disabled if `prefers-reduced-motion`

#### Scenario: Theming
- **WHEN** the design tokens change (light/dark, high-contrast)
- **THEN** the Button SHALL adapt automatically via tokens and conditions without per-consumer overrides

### Requirement: Button API
The Button component MUST expose a minimal, strongly-typed API that maps to Panda recipes and ensures consistency.

#### Scenario: Props surface
- **WHEN** consuming the Button
- **THEN** available props include: `variant`, `size`, `tone` (accent, neutral, destructive), `icon`, `iconPosition`, `loading`, `disabled`, `aria-label`, `as` (polymorphic), and `onPress`

#### Scenario: Polymorphic rendering
- **WHEN** `as` is provided (e.g., `a`, `button`, `RouterLink`)
- **THEN** element semantics and accessibility SHALL be preserved (role, disabled semantics, keyboard support)

#### Scenario: Composition safety
- **WHEN** consumers pass arbitrary style props
- **THEN** component SHALL restrict styling to exposed variants; raw style overrides MUST be opt-in and discouraged

### Requirement: Migration and deprecations
The system MUST document migration paths from legacy button-like components and may deprecate components that are redundant or non-useful for the library.

#### Scenario: Deprecation plan
- **WHEN** this change is approved
- **THEN** a deprecation timeline and mapping guide SHALL be published, identifying components to remove or alias
