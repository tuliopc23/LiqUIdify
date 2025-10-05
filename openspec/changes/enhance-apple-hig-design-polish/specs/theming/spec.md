# Theming Specification Deltas

## ADDED Requirements

### Requirement: Apple HIG Spring Animation System
The system SHALL provide spring animation parameters compliant with Apple Human Interface Guidelines specifications.

- Spring parameters MUST be exposed as design tokens: mass, stiffness, damping
- Default spring MUST use mass: 1, stiffness: 180, damping: 20 (Apple standard)
- Animation tokens MUST include: spring.default, spring.gentle, spring.bouncy
- All interactive components MUST use spring animations for state transitions

#### Scenario: Button press animation
- **WHEN** a button is pressed
- **THEN** it animates to scale(0.97) using spring.default parameters over 0.3s
- **AND** respects prefers-reduced-motion by applying instant scale without animation

#### Scenario: Modal entrance animation
- **WHEN** a modal opens
- **THEN** it slides up from bottom with spring.gentle over 0.5s
- **AND** opacity fades from 0 to 1 simultaneously
- **AND** uses Apple-standard cubic-bezier(0.25, 0.1, 0.25, 1.0)

### Requirement: Micro-Interaction Scale Feedback
The system SHALL provide subtle scale transformations for interactive elements following Apple HIG patterns.

- Interactive elements MUST scale to 0.97 on press/active state
- Interactive elements SHOULD scale to 1.02 on hover state (when motion not reduced)
- Scale transitions MUST complete in 0.15s (instant) or 0.3s (quick) depending on element
- Touch targets >= 44pt MUST use 0.97 scale, smaller elements MAY use 0.95 for more visible feedback

#### Scenario: Button hover feedback
- **WHEN** user hovers over a button with pointer device
- **AND** prefers-reduced-motion is not set
- **THEN** button scales to 1.02 over 0.3s with ease-out timing
- **AND** shadow increases to hover elevation

#### Scenario: Button press feedback
- **WHEN** user presses button (mouse down or touch start)
- **THEN** button immediately scales to 0.97 over 0.15s
- **AND** applies active state colors
- **AND** respects reduced-motion by skipping scale animation

### Requirement: Reduced Motion Compliance
The system SHALL provide complete alternatives for all animations when prefers-reduced-motion is enabled.

- ALL animations MUST be wrapped in @media (prefers-reduced-motion: no-preference)
- Reduced-motion alternatives MUST provide instant state changes without animation
- Transitions MUST use 0ms duration when motion is reduced
- Essential motion (e.g., loading spinners) MAY continue but at reduced speed (50%)

#### Scenario: Reduced motion for modal
- **WHEN** modal opens with prefers-reduced-motion: reduce
- **THEN** modal appears instantly without slide or fade animation
- **AND** backdrop appears instantly at full opacity
- **AND** focus moves to modal content immediately

#### Scenario: Reduced motion for button
- **WHEN** button is interacted with AND prefers-reduced-motion: reduce
- **THEN** state changes (color, shadow) apply instantly
- **AND** no scale transform occurs
- **AND** accessibility is maintained

### Requirement: WCAG 2.1 AA Contrast Compliance
The system SHALL ensure all text and UI elements meet WCAG 2.1 Level AA contrast requirements.

- Body text (< 18pt or < 14pt bold) MUST have >= 4.5:1 contrast ratio
- Large text (>= 18pt or >= 14pt bold) MUST have >= 3:1 contrast ratio
- UI components and graphical objects MUST have >= 3:1 contrast ratio
- Disabled elements MUST maintain at least 2.5:1 contrast (enough to be perceivable)
- System MUST provide prefers-contrast:high support with enhanced ratios (7:1 for body text)

#### Scenario: Button text contrast
- **WHEN** button uses accent background color
- **THEN** text color MUST provide >= 4.5:1 contrast for body-sized text
- **AND** disabled button text MUST provide >= 2.5:1 contrast

#### Scenario: High contrast mode
- **WHEN** user enables prefers-contrast: high
- **THEN** all text increases to >= 7:1 contrast ratio
- **AND** borders increase to 2px width
- **AND** UI element contrast increases to >= 4.5:1

### Requirement: Elevation Shadow System
The system SHALL provide a standardized elevation system with shadows matching iOS 17/macOS 14 standards.

- Elevation levels MUST include: 0dp (none), 1dp (base), 4dp (raised), 8dp (floating), 16dp (modal), 24dp (priority)
- Each elevation MUST have defined: blur-radius, spread, offset-y, color, opacity
- Dark mode MUST use lighter shadow colors with adjusted opacity
- Shadows MUST use Apple-standard blur and spread ratios

#### Scenario: Card elevation
- **WHEN** card is at rest (elevation-1)
- **THEN** shadow MUST be 0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.06)
- **AND** in dark mode shadow color changes to rgba(0,0,0,0.24)

#### Scenario: Card hover elevation
- **WHEN** card is hovered (elevation-4)
- **THEN** shadow MUST be 0 8px 24px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.08)
- **AND** transition occurs over 0.3s with ease-out

## MODIFIED Requirements

### Requirement: Animation Duration Tokens
The system SHALL provide animation duration tokens calibrated to Apple Human Interface Guidelines specifications.

**PREVIOUS**: Duration tokens used custom values (flow: 0.8s, bounce: 0.6s, quick: 0.2s, instant: 0.1s)

**UPDATED**:
- instant: 0.15s (for immediate feedback like tooltips, switches)
- quick: 0.3s (for standard transitions like buttons, tabs)
- flow: 0.5s (for sheets, modals, page transitions)
- bounce: 0.6s (for playful elements with spring physics)
- All tokens MUST have reduced-motion alternatives that use 0ms

Duration selection rules:
- Use instant (0.15s) for: tooltips, switches, checkbox, radio, small state changes
- Use quick (0.3s) for: buttons, hover states, tabs, segment controls
- Use flow (0.5s) for: modals, sheets, drawers, page transitions
- Use bounce (0.6s) for: playful interactions requiring spring physics

#### Scenario: Button hover timing
- **WHEN** button receives hover state
- **THEN** transition duration MUST be 0.3s (quick)
- **AND** uses ease-out timing function

#### Scenario: Modal entrance timing
- **WHEN** modal opens
- **THEN** animation duration MUST be 0.5s (flow)
- **AND** uses spring easing curve

### Requirement: Typography Line Height
The system SHALL use Apple Human Interface Guidelines exact line-height specifications for optimal readability.

**PREVIOUS**: Line heights used approximations (tight: 1.1, snug: 1.2, normal: 1.25, relaxed: 1.4)

**UPDATED**:
- largeTitle, title1, title2, title3: line-height 1.2 (snug)
- headline: line-height 1.25 (normal)
- body, callout: line-height 1.25 (normal - Apple's preferred reading line-height)
- subheadline, footnote: line-height 1.4 (relaxed)
- caption1, caption2: line-height 1.6 (loose)
- Display text (hero): line-height 1.1 (tight)

All text styles MUST use these exact line-heights for HIG compliance.

#### Scenario: Body text rendering
- **WHEN** rendering paragraph text with body textStyle
- **THEN** line-height MUST be exactly 1.25 (not 1.2 or 1.3)
- **AND** font-size MUST be 17px (body token)

#### Scenario: Title rendering
- **WHEN** rendering title1, title2, or title3
- **THEN** line-height MUST be exactly 1.2
- **AND** letter-spacing MUST be -0.022em

### Requirement: Touch Target Minimum Size
The system SHALL ensure all interactive elements meet Apple HIG 44pt minimum touch target requirement.

**PREVIOUS**: Some components (e.g., icon buttons, close buttons) used 32px or 40px hit areas

**UPDATED**:
- ALL interactive elements MUST have minimum hit area of 44x44pt (44px)
- Compact buttons MUST maintain 44pt height with reduced horizontal padding
- Icon-only buttons MUST be 44x44pt minimum
- Padding or invisible hit area extension MUST be used if visual element is smaller
- Exception: elements within larger interactive containers (e.g., menu items in dropdown)

#### Scenario: Icon button dimensions
- **WHEN** rendering icon-only button
- **THEN** button MUST be at least 44x44px
- **AND** if icon is 24px, padding adjusts to reach 44px total

#### Scenario: Close button in modal
- **WHEN** rendering close button in modal header
- **THEN** button hit area MUST be 44x44px minimum
- **AND** may use padding to extend beyond visual 32px icon

### Requirement: Spacing Token 4pt/8pt Grid
The system SHALL strictly adhere to 4pt base unit and 8pt major unit grid system per Apple HIG.

**PREVIOUS**: Spacing tokens included odd values (spacing.glass.xs: 4px, sm: 8px, md: 12px, lg: 16px, xl: 20px)

**UPDATED**:
- All spacing tokens MUST be multiples of 4 (4pt base unit)
- Major spacing MUST be multiples of 8 (8pt major unit)
- Component padding and gaps MUST only use valid spacing tokens
- Updated scale: 4px (xs), 8px (sm), 12px (md), 16px (lg), 24px (xl), 32px (2xl), 48px (3xl)

#### Scenario: Button padding compliance
- **WHEN** button uses size="md"
- **THEN** padding MUST be 10px 16px (both multiples of 4)
- **AND** gap between icon and text MUST be 8px (spacing.glass.sm)

#### Scenario: Card padding
- **WHEN** card is rendered
- **THEN** internal padding MUST be 16px or 24px (never 18px or 20px)
- **AND** gap between elements MUST be 8px, 12px, or 16px

### Requirement: Border Radius Role Tokens
The system SHALL use Apple-calibrated border radius values matching iOS 17 design standards.

**PREVIOUS**: Border radii used generic values without role-based naming

**UPDATED**:
- roles.button: 9999px (full capsule for standard buttons)
- roles.buttonCompact: 10px (for compact/small buttons)
- roles.control: 10px (for controls like checkbox, switch base)
- roles.field: 12px (for input fields)
- roles.card: 16px (for cards and surfaces - updated from 26px)
- roles.sheet: 16px (for modals and sheets)
- roles.pill: 9999px (for badges and tags)

All components MUST use role-based tokens, not arbitrary radius values.

#### Scenario: Card border radius
- **WHEN** rendering a card component
- **THEN** borderRadius MUST use roles.card token (16px)
- **AND** nested elements maintain same radius for visual consistency

#### Scenario: Button border radius
- **WHEN** rendering standard button
- **THEN** borderRadius MUST use roles.button token (9999px for capsule)
- **AND** compact variant uses roles.buttonCompact (10px)
