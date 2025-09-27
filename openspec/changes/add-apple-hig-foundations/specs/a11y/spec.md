## ADDED Requirements
### Requirement: High Contrast Mode
The system SHALL provide a high-contrast mode or tokens that increase contrast beyond defaults, especially on translucent materials.

#### Scenario: High contrast tokens
- WHEN high-contrast mode is enabled
- THEN text and separators adjust to exceed minimum WCAG contrast thresholds

### Requirement: Keyboard and ARIA Parity
Interactive components MUST provide keyboard operability and ARIA roles/names consistent with platform expectations; VoiceOver names SHOULD be intuitive.

#### Scenario: Button semantics
- WHEN a button is rendered
- THEN it exposes role=button, focusable with Tab, and appropriate label

### Requirement: Axe Audits
The project SHALL include axe-core checks in CI or local scripts to catch common a11y issues.

#### Scenario: CI a11y check
- WHEN tests run in CI
- THEN axe assertions run for critical components
