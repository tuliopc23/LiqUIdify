# build-system Specification

## Purpose
TBD - created by archiving change fix-import-paths-audit. Update Purpose after archive.
## Requirements
### Requirement: Import Path Consistency
The build system SHALL ensure all import paths consistently reference the correct `libs/components/dist/` directory structure and contain no references to conflicted directory paths.

#### Scenario: Package.json path resolution
- **WHEN** package.json is parsed by package managers
- **THEN** all main, module, types, style, and exports fields SHALL point to `libs/components/dist/` paths
- **AND** no references to `dist/libs/components/` SHALL exist

#### Scenario: TypeScript compilation paths
- **WHEN** TypeScript compiles the library
- **THEN** output SHALL be generated in `libs/components/dist/` directory
- **AND** declaration files SHALL be accessible via configured paths

#### Scenario: Build script execution
- **WHEN** build scripts are executed
- **THEN** all output paths SHALL target `libs/components/dist/`
- **AND** no conflicted directory references SHALL cause build failures

### Requirement: CSS Integration Validation
The build system SHALL ensure Panda CSS tokens, recipes, and layers are properly integrated in the distributed CSS file, with specific ordering requirements for cascade layer precedence.

#### Scenario: CSS layer structure validation
- **WHEN** liquidify.css is generated
- **THEN** it SHALL contain `@layer reset,base,tokens,recipes,utilities` in that specific order
- **AND** file size SHALL be approximately 441.48 kB (±10%)
- **AND** all glass morphism tokens and recipes SHALL be included
- **AND** button variant recipes SHALL be emitted in the recipes layer

#### Scenario: CSS import resolution
- **WHEN** users import CSS via `liquidify-react/styles`
- **THEN** the CSS file SHALL be resolved from `libs/components/dist/liquidify.css`
- **AND** all styling layers SHALL be properly applied
- **AND** cascade layer ordering SHALL prevent unintended specificity conflicts

#### Scenario: Panda CSS codegen execution
- **WHEN** the build process runs
- **THEN** Panda CSS codegen SHALL execute before Vite build
- **AND** this SHALL be enforced via a prebuild script hook
- **AND** the generated CSS SHALL include all component recipes before bundling begins

### Requirement: Import Resolution Testing
The build system SHALL validate that all import scenarios work correctly with the updated path structure.

#### Scenario: Main package import validation
- **WHEN** users import `import { Button } from 'liquidify-react'`
- **THEN** components SHALL be resolved from `libs/components/dist/index.mjs`
- **AND** TypeScript types SHALL be resolved from `libs/components/dist/index.d.ts`

#### Scenario: Subpath import validation
- **WHEN** users import `import { Button } from 'liquidify-react/button'`
- **THEN** component SHALL be resolved from `libs/components/dist/components/button/index.mjs`
- **AND** TypeScript types SHALL be resolved correctly

#### Scenario: Cross-format compatibility
- **WHEN** both ESM and CJS imports are used
- **THEN** both formats SHALL resolve to correct paths in `libs/components/dist/`
- **AND** no import errors SHALL occur in either format

### Requirement: Nested Subpath Export Support
The build system SHALL support nested subpath exports for Ark UI components via the `"./ark-ui/*"` pattern in package.json exports field.

#### Scenario: Ark UI component import via nested path
- **WHEN** a consumer imports an Ark UI component using nested path syntax (e.g., `import { Accordion } from "liquidify-react/ark-ui/accordion"`)
- **THEN** the package export SHALL resolve to the correct module file
- **AND** TypeScript types SHALL be available at the corresponding `.d.ts` path
- **AND** both ESM (`.mjs`) and CJS (`.cjs`) formats SHALL be supported

#### Scenario: Multiple module format resolution
- **WHEN** the same Ark UI component is imported via ESM and required via CJS
- **THEN** both module formats SHALL resolve to their respective compiled outputs
- **AND** no module resolution errors SHALL occur
- **AND** the component functionality SHALL be identical across formats

#### Scenario: Nested export pattern placement
- **WHEN** package.json exports are evaluated by Node.js module resolver
- **THEN** the `"./ark-ui/*"` pattern SHALL be placed before the generic `"./*"` wildcard pattern
- **AND** specific nested paths SHALL match before falling through to the catch-all pattern
- **AND** flat component imports (e.g., `liquidify-react/button`) SHALL continue to work via the `"./*"` pattern

### Requirement: Comprehensive Import Resolution Testing
The build system SHALL include automated tests that verify all component import paths resolve correctly in both ESM and CJS environments.

#### Scenario: Consumer fixture ESM import validation
- **WHEN** a consumer fixture package imports components via ESM dynamic imports
- **THEN** all flat component imports (button, badge, card, etc.) SHALL resolve successfully
- **AND** all 47 Ark UI nested imports SHALL resolve successfully
- **AND** no module resolution errors SHALL be thrown

#### Scenario: Consumer fixture CJS require validation
- **WHEN** a consumer fixture package requires components via CJS require()
- **THEN** all flat component imports SHALL be loadable via require()
- **AND** all 47 Ark UI nested imports SHALL be loadable via require()
- **AND** the loaded modules SHALL be functionally equivalent to ESM imports

#### Scenario: Automated discovery of Ark UI components
- **WHEN** the import resolution test suite runs
- **THEN** it SHALL dynamically discover all Ark UI components from the built dist directory
- **AND** it SHALL attempt to import each discovered component
- **AND** it SHALL fail the test if any component import fails
- **AND** the test SHALL report which specific component paths failed (if any)

### Requirement: Button Variant and Tone Rendering Validation
The build system SHALL include comprehensive tests for Button component variants, tones, and states to ensure correct rendering and styling.

#### Scenario: Button variant/tone combination rendering
- **WHEN** a Button component is rendered with a specific variant (filled, tinted, plain) and tone (accent, neutral, destructive)
- **THEN** the component SHALL render without errors
- **AND** the component SHALL have the appropriate variant marker (data attribute or class name)
- **AND** the component SHALL have the appropriate tone marker (data attribute or class name)
- **AND** all 9 variant/tone combinations SHALL be tested

#### Scenario: Button state transitions
- **WHEN** a Button component transitions through different states (hover, active, focus, disabled, loading)
- **THEN** each state SHALL apply the correct attributes or class names
- **AND** disabled state SHALL prevent hover and active state changes
- **AND** loading state SHALL display appropriate loading indicator
- **AND** focus state SHALL apply focus-visible outline or ring

#### Scenario: CSS style verification
- **WHEN** Button variant/tone tests execute
- **THEN** the test SHALL verify that the generated liquidify.css file contains the expected variant/tone selectors
- **AND** the test SHALL verify that CSS custom properties (e.g., `--colors-button-hig-filled-accent-*`) are present
- **AND** if JSDOM cannot compute styles, the test SHALL at minimum verify marker attributes or class names are present

### Requirement: CSS Validation Script
The build system SHALL provide a CSS validation script that verifies the integrity of generated CSS before publishing.

#### Scenario: CSS validation script execution
- **WHEN** `bun run check:css-layers` is executed
- **THEN** the script SHALL validate that `libs/components/dist/liquidify.css` exists
- **AND** the CSS SHALL contain `@layer reset,base,tokens,recipes,utilities`
- **AND** the CSS SHALL contain `--made-with-panda` token
- **AND** the script SHALL exit with code 0 on success or code 1 on failure

#### Scenario: Publish workflow validation
- **WHEN** `prepublishOnly` script is executed
- **THEN** CSS validation SHALL be included in the workflow
- **AND** publish SHALL fail if CSS validation fails
- **AND** all validation steps SHALL complete successfully before publish

