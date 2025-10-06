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
Accent and theme resolution SHALL be safe during SSR and consistent through hydration.

- No browser globals (window, document) MUST be accessed at import time
- On the server, the active theme MAY be provided via <html data-theme="..."> and the client MUST respect it on first paint
- On hydration, the client MUST keep the SSR-provided theme unless overridden by ThemeProvider props or persistence rules

#### Scenario: SSR-provided theme retained
- **WHEN** SSR HTML includes <html data-theme="light"> and ThemeProvider mounts with defaultMode="system"
- **THEN** the client keeps "light" after hydration unless the system preference requires an update and followSystem/system mode is active

### Requirement: API Type Safety and Extensibility
The API SHALL provide typed preset names while allowing custom extensions.

- AccentPresetName MUST be a string union of built-in keys; ThemeProvider.accentPresets MAY accept additional keys
- Overridden presets MUST take precedence over built-ins when keys collide
- All APIs MUST accept any valid CSS color string for custom accents

#### Scenario: Extend preset catalog
- **WHEN** ThemeProvider is provided accentPresets={{ "brand-blue": "#0050FF" }} and setAccentPreset("brand-blue") is called
- **THEN** the accent becomes "#0050FF" and accentPreset becomes "brand-blue"

### Requirement: External Consumer Styles Inclusion
The library SHALL provide a reliable, single-step way for external consumers (Astro/MDX, Next.js, Vite, etc.) to include all required CSS (tokens, recipes, utilities, globals) so components render fully styled in any environment.

- The package export `"liquidify-react/styles"` MUST resolve to a single CSS file that contains: Panda reset/base/tokens/recipes/utilities and library-global overrides (new-design-system)
- Subpath component imports (e.g., `liquidify-react/button`) MUST NOT require additional CSS imports beyond the root styles import
- The root JS entry MUST NOT rely on CSS side-effects for styling in a way that varies with tree-shaking; styling MUST be obtainable via the `./styles` export alone

#### Scenario: Astro MDX consumer
- **WHEN** a consumer project imports `import "liquidify-react/styles"` once in its layout
- **THEN** all components render fully styled within MDX pages and Astro islands

#### Scenario: Subpath-only import
- **WHEN** a consumer imports `import { Button } from "liquidify-react/button"` and also imports `"liquidify-react/styles"`
- **THEN** Button is fully styled without needing JS entry side-effects

### Requirement: CSS Bundle Integrity Check
The build process SHALL validate the emitted CSS bundle contains essential token/recipe layers.

- A CI/script MUST confirm that `libs/components/dist/liquidify.css` contains `@layer tokens` and `@layer recipes`
- The script MUST fail the build if layers are missing

#### Scenario: CI catches missing layers
- **WHEN** Panda generation fails or styles are omitted
- **THEN** CI fails with a message identifying missing layers

### Requirement: System Theme Synchronization
The theming system SHALL support a "system" mode that follows the operating system color scheme and updates live.

- Theme mode MUST accept: "light" | "dark" | "system"
- The effective theme MUST be derived as:
  - If mode=="light" -> light
  - If mode=="dark" -> dark
  - If mode=="system" -> match prefers-color-scheme media query
- A change in prefers-color-scheme MUST update the effective theme without page reload
- SSR: On first paint, the client MUST respect an SSR-provided data-theme if present; otherwise compute from mode and media query

#### Scenario: Follow system to dark
- **WHEN** mode is set to "system" and the OS switches to dark
- **THEN** data-theme becomes "dark" and root classes include "dark" and "theme-dark"

#### Scenario: Force light mode
- **WHEN** mode is set to "light"
- **THEN** data-theme remains "light" regardless of OS preference

#### Scenario: SSR provided theme retained
- **WHEN** SSR sets <html data-theme="dark"> and provider mounts in system mode
- **THEN** hydration keeps "dark" until the first evaluation, then aligns with system if not overridden by props

### Requirement: Theme Mode Persistence
Theme mode persistence SHALL be configurable and SSR-safe.

- ThemeProvider MUST accept: defaultMode?: "light"|"dark"|"system" (default "light")
- ThemeProvider MUST accept: persistTheme?: boolean (default true)
- When persistence is enabled, the selected mode MUST be stored under localStorage key "ui-theme-mode"
- The effective theme MAY be stored under key "ui-theme" for compatibility

#### Scenario: Persistence disabled
- **WHEN** persistTheme=false and mode is changed to dark
- **THEN** a page reload reverts to defaultMode

