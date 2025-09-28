## ADDED Requirements

### Requirement: Panda Tokenization and Recipes
The design system SHALL define Panda CSS tokens and recipes that guarantee button consistency across all components.

#### Scenario: Tokens
- **WHEN** defining design tokens
- **THEN** include radius, spacing, typography scale, elevation, opacity, and motion tokens required by HIG

#### Scenario: Recipes
- **WHEN** implementing the Button
- **THEN** variants and sizes SHALL be encoded as Panda recipes (e.g., `button` recipe) with conditions for light/dark/high-contrast

#### Scenario: Conditions and selectors
- **WHEN** styling states and media preferences
- **THEN** use Panda conditions for `hover`, `focus-visible`, `active`, `disabled`, `reduced-motion`, and data attributes (e.g., `[data-loading]`)

### Requirement: Cross-Component Button Style Alignment
All components that render button-like affordances MUST either use the shared Button or its recipes to ensure uniform look and behavior.

#### Scenario: Shared recipe usage
- **WHEN** a component needs a button-like control (e.g., menu trigger, dialog confirm)
- **THEN** it MUST consume the shared `button` recipe or the Button component; custom styling is prohibited unless explicitly justified in spec

#### Scenario: Accessibility invariants
- **WHEN** components use the shared recipe
- **THEN** they SHALL inherit focus-visible ring, min-target size, and ARIA semantics consistent with Button

#### Scenario: Theming invariants
- **WHEN** theme context changes
- **THEN** all recipe consumers SHALL update consistently without per-component overrides
