## ADDED Requirements
### Requirement: SF Pro Typography with Optical Sizing
The system SHALL support SF Pro Text/Display with optical sizing and dynamic type scale mapping.

#### Scenario: Optical sizing enabled
- WHEN text is rendered with SF Pro
- THEN appropriate Text/Display face and optical sizing are applied based on size

### Requirement: Spacing Grid and Targets
The system SHALL use an 8pt spacing grid and enforce minimum interactive target size ≥ 44px.

#### Scenario: Control meets target size
- WHEN a button variant is rendered
- THEN its hit area measures at least 44px in both dimensions

### Requirement: Role-based Radii
The system SHALL define role radii including pill buttons and 26px radius for sheets/modals/cards.

#### Scenario: Role radius applied
- WHEN a component declares its role (e.g., sheet)
- THEN its corner radius uses the defined role radius

### Requirement: Elevation and Shadows per Mode
The system SHALL provide tuned elevation/shadow tokens for light and dark modes.

#### Scenario: Elevation token used
- WHEN a card requests `elevation/2`
- THEN the shadow values correspond to the current color mode
