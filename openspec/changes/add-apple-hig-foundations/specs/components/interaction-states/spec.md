## ADDED Requirements
### Requirement: Segmented Control Parity
The library SHALL provide a segmented control with behavior and visuals consistent with Apple HIG parity where feasible.

#### Scenario: Keyboard navigation
- WHEN a user presses ArrowLeft/Right
- THEN focus moves between segments and selection updates with Enter/Space

### Requirement: Button State Easing
Buttons SHALL implement hover/pressed/disabled states with spring-based easing tuned for responsiveness and motion preference.

#### Scenario: Spring on press
- WHEN a user presses a button
- THEN a spring-scale or elevation response occurs unless reduced motion is enabled

### Requirement: macOS Focus Ring
Focusable components SHALL render a 2px accent-colored focus ring with halo, drawn outside the component, consistent with macOS focus indication.

#### Scenario: Focus ring visible
- WHEN a button receives keyboard focus
- THEN a 2px ring plus halo appears using accent color

### Requirement: Translucent Menus and Sheets
Menus, sheets, and popovers MAY use platform-appropriate translucency and vibrancy where performance allows.

#### Scenario: Popover translucency
- WHEN a popover opens on supported devices
- THEN it renders with a material overlay matching the selected tier

### Requirement: Consistent Glass Pseudo-elements
Components using glass effects SHALL use consistent pseudo-elements for overlays and avoid nested heavy blurs.

#### Scenario: Single overlay element
- WHEN a card uses material/regular
- THEN it renders one overlay element and avoids nested blurs

### Requirement: Form Placeholder and Selection Colors
Form controls SHALL expose tokens for placeholder and selection colors aligned with semantic tokens.

#### Scenario: Selection token applied
- WHEN text is selected in an input
- THEN selection background uses the designated token with sufficient contrast

### Requirement: Prefers Reduced Motion
All animated components MUST respect `prefers-reduced-motion` by disabling non-essential motion and using gentler transitions.

#### Scenario: Reduced motion honored
- WHEN OS setting reduces motion
- THEN button springs are replaced with minimal opacity/position changes
