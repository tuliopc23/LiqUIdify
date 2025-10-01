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
The build system SHALL ensure Panda CSS tokens, recipes, and layers are properly integrated in the distributed CSS file.

#### Scenario: CSS layer structure validation
- **WHEN** liquidify.css is generated
- **THEN** it SHALL contain `@layer reset,base,tokens,recipes,utilities`
- **AND** file size SHALL be approximately 441.48 kB
- **AND** all glass morphism tokens and recipes SHALL be included

#### Scenario: CSS import resolution
- **WHEN** users import CSS via `liquidify-react/styles`
- **THEN** the CSS file SHALL be resolved from `libs/components/dist/liquidify.css`
- **AND** all styling layers SHALL be properly applied

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

