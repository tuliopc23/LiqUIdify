## ADDED Requirements
### Requirement: System Semantic Colors
The design system SHALL provide semantic color tokens aligned with Apple HIG, including `label`, `secondaryLabel`, `tertiaryLabel`, `quaternaryLabel`, `systemBackground`, `secondarySystemBackground`, `tertiarySystemBackground`, `separator`, and `fill` variants. These tokens MUST adapt for light and dark modes.

#### Scenario: Semantic tokens available
- WHEN a consumer requests a color token by semantic name
- THEN the token resolves to mode-aware color values

### Requirement: Dynamic SystemBlue Accent
The design system SHALL expose an accent color token `accent` defaulting to an Apple-like `SystemBlue` pair that adapts between light and dark. Custom `blue` brand token SHALL be removed in favor of `accent`.

#### Scenario: Accent resolves per mode
- WHEN the theme is light or dark
- THEN `accent` resolves to the corresponding SystemBlue value

### Requirement: Material Tiers and Vibrancy
The system SHALL define material tier tokens: `material/ultraThin`, `material/thin`, `material/regular`, `material/thick`, suitable for translucent surfaces with vibrancy overlays.

#### Scenario: Apply material overlay
- WHEN a component opts into `material/regular`
- THEN it applies a backdrop/overlay combination appropriate for the mode

### Requirement: Hairline Separators
The system SHALL provide a `separator/hairline` style for 1px device-independent separators with appropriate contrast.

#### Scenario: Render hairline
- WHEN a divider requests hairline
- THEN a 1px line is rendered with sufficient contrast on the background

### Requirement: Contrast on Glass
Text and essential UI on glassy/translucent surfaces MUST maintain WCAG contrast ≥ 4.5:1 via overlays or color adjustments.

#### Scenario: Glass contrast maintained
- WHEN text appears over a `material/*` surface
- THEN text color or overlay ensures ≥ 4.5:1 contrast
