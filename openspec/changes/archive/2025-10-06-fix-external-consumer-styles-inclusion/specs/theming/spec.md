## ADDED Requirements

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

## MODIFIED Requirements

### Requirement: SSR Safety and Hydration
Accent and theme resolution SHALL be safe during SSR and consistent through hydration.

- The CSS export MUST NOT require DOM access; importing `"liquidify-react/styles"` MUST be SSR-safe in Astro/MDX

#### Scenario: SSR import in Astro layout
- **WHEN** the styles file is imported in an Astro layout during SSR
- **THEN** no runtime errors occur and styles are applied on first paint
