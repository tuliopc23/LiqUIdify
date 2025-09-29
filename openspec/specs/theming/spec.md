# theming Specification

## Purpose
TBD - created by archiving change add-themeprovider-accent-presets-runtime-switching-api. Update Purpose after archive.
## Requirements
### Requirement: Accent Preset Catalog
The system SHALL provide a built-in catalog of accessible accent presets exposed to consumers.

- Preset keys MUST include: blue, green, red, orange, yellow, pink, purple, indigo, teal, cyan, mint.
- Preset values MUST be CSS color strings with these defaults:
  - blue: #007AFF
  - green: #34C759
  - red: #FF3B30
  - orange: #FF9500
  - yellow: #FFCC00
  - pink: #FF2D55
  - purple: #AF52DE
  - indigo: #5856D6
  - teal: #30B0C7
  - cyan: #32ADE6
  - mint: #00C7BE
- The CSS variable used for the active accent MUST be --ui-accent on the root element, and the data attribute MUST be data-accent with the same value.

#### Scenario: Retrieve preset catalog
- **WHEN** a consumer calls listAccentPresets()
- **THEN** it returns the keys listed above with the exact default color values

#### Scenario: CSS var and data attribute alignment
- **WHEN** a preset is applied
- **THEN** documentElement.dataset.accent and documentElement.style['--ui-accent'] are both set to the preset color

### Requirement: Runtime Accent Switching API
The theming API SHALL allow switching accent colors at runtime using either a preset key or a custom color.

- useTheme() MUST expose: accent (string), setAccent(accent: string), accentPreset (string|null), setAccentPreset(name: AccentPresetName)
- ThemeProvider MUST accept optional props:
  - accentPreset?: AccentPresetName
  - accentPresets?: Record<string, string> to override/add presets (keys kebab-case)
  - defaultAccent?: string (fallback color)
  - accentStorageKey?: string (default "ui-accent")
  - persistAccent?: boolean (default true)
  - onAccentChange?: (next: { color: string; preset: string|null }) => void
- The lib/theme helpers MUST expose: listAccentPresets(), getAccentPreset(name), setAccentPreset(name, options?), setAccent(color, options?), getAccent(options?)
- Calling setAccentPreset(name) MUST set both data-accent and --ui-accent to the preset value.

#### Scenario: Switch using preset name
- **WHEN** setAccentPreset("green") is invoked
- **THEN** the current accent becomes "#34C759" and accentPreset becomes "green"

#### Scenario: Switch using custom color
- **WHEN** setAccent("#123456") is invoked
- **THEN** the current accent becomes "#123456" and accentPreset becomes null

#### Scenario: Provider prop precedence
- **WHEN** ThemeProvider receives accentPreset="purple"
- **THEN** initial accent is "#AF52DE" regardless of stored or computed values

### Requirement: Optional Persistence
Accent persistence SHALL be configurable and SSR-safe.

- If persistAccent is true, the system MUST read/write the accent to localStorage under accentStorageKey on the client only.
- If persistAccent is false, the system MUST NOT read from nor write to localStorage and the accent MUST reset on reload.
- Storage access MUST be guarded so no window/localStorage is referenced at import time.

#### Scenario: Persistence disabled
- **WHEN** ThemeProvider is mounted with persistAccent=false and setAccentPreset("blue") is called
- **THEN** localStorage is not written and a page reload reverts to the initial accent

#### Scenario: Persistence enabled
- **WHEN** persistAccent=true and setAccent("#34C759") is called
- **THEN** localStorage[accentStorageKey] is set to "#34C759" and subsequent mounts read it

### Requirement: Accessibility Contrast
Preset accents SHALL meet WCAG 2.1 AA color contrast for text and UI indicators against primary surfaces in both light and dark themes.

- For body text on accent backgrounds, contrast ratio MUST be >= 4.5:1
- For large text (>=18pt or >=14pt bold) on accent backgrounds, contrast ratio MUST be >= 3:1
- Documentation MUST provide guidance on pairing --ui-accent with foreground tokens to maintain contrast

#### Scenario: Contrast validation for presets
- **WHEN** validating the shipped preset palette
- **THEN** each preset passes the stated AA thresholds for small and large text against default foreground tokens in light and dark themes

### Requirement: SSR Safety and Hydration
Accent resolution SHALL be safe during SSR and consistent through hydration.

- No browser globals (window, document) MUST be accessed at import time
- On the server, the active accent MAY be provided via <html data-accent="..."> or inline --ui-accent; the client MUST respect those values on first paint
- On hydration, the client MUST keep the SSR-provided accent unless overridden by ThemeProvider props or persistence rules

#### Scenario: SSR-provided accent retained
- **WHEN** the SSR HTML includes <html data-accent="#FF9500"> and ThemeProvider mounts without accentPreset and with persistAccent=false
- **THEN** the client keeps "#FF9500" as the accent after hydration

#### Scenario: SSR with persistence override
- **WHEN** the SSR HTML includes data-accent="#FF9500" and localStorage has "#34C759" with persistAccent=true
- **THEN** the client resolves to "#34C759" after hydration following persistence precedence

### Requirement: API Type Safety and Extensibility
The API SHALL provide typed preset names while allowing custom extensions.

- AccentPresetName MUST be a string union of built-in keys; ThemeProvider.accentPresets MAY accept additional keys
- Overridden presets MUST take precedence over built-ins when keys collide
- All APIs MUST accept any valid CSS color string for custom accents

#### Scenario: Extend preset catalog
- **WHEN** ThemeProvider is provided accentPresets={{ "brand-blue": "#0050FF" }} and setAccentPreset("brand-blue") is called
- **THEN** the accent becomes "#0050FF" and accentPreset becomes "brand-blue"

