# Implementation Tasks

## 1. Pre-Implementation Analysis
- [x] 1.1 Verify current dist structure for Ark UI components
- [x] 1.2 Confirm file naming pattern (folder with index files vs flat files)
- [x] 1.3 Document current export configuration baseline
- [x] 1.4 Run existing test suite to establish baseline

## 2. Package Configuration Updates
- [x] 2.1 Add `"./ark-ui/*"` export to root `package.json`
  - [x] Add types mapping: `"types": "./libs/components/dist/components/ark-ui/*/index.d.ts"`
  - [x] Add import mapping: `"import": "./libs/components/dist/components/ark-ui/*/index.mjs"`
  - [x] Add require mapping: `"require": "./libs/components/dist/components/ark-ui/*/index.cjs"`
- [x] 2.2 Add `"./ark-ui/*"` export to `libs/components/package.json`
  - [x] Add types mapping: `"types": "./dist/components/ark-ui/*/index.d.ts"`
  - [x] Add import mapping: `"import": "./dist/components/ark-ui/*/index.mjs"`
  - [x] Add require mapping: `"require": "./dist/components/ark-ui/*/index.cjs"`
- [x] 2.3 Verify existing `"./*"` export remains for flat components
- [x] 2.4 Ensure correct placement in exports (nested before wildcard catch-all)

## 3. Build System Verification
- [x] 3.1 Verify `prebuild` script exists and runs Panda codegen
- [x] 3.2 If missing, add `"prebuild": "panda codegen"` to libs/components package.json
- [x] 3.3 Clean dist: `rm -rf libs/components/dist`
- [x] 3.4 Run build: `bun run build`
- [x] 3.5 Verify liquidify.css contains @layer declarations
- [x] 3.6 Verify liquidify.css contains button variant styles

## 4. Import Resolution Test Fixture
- [x] 4.1 Create directory structure: `libs/components/test-fixtures/consumer/`
- [x] 4.2 Create `consumer/package.json` with local liquidify-react dependency
- [x] 4.3 Create `consumer/test/imports.esm.mjs` for ESM import tests
- [x] 4.4 Create `consumer/test/imports.cjs.cjs` for CJS require tests
- [x] 4.5 Create `consumer/test/all-ark-ui.mjs` to test all 47 Ark UI imports dynamically
- [x] 4.6 Add test scripts to consumer/package.json
- [x] 4.7 Add `test:imports` script to libs/components/package.json

## 5. Button Variant Rendering Tests
- [x] 5.1 Create `libs/components/src/__tests__/button.variants.spec.tsx`
- [x] 5.2 Set up test environment with Vitest and RTL
- [x] 5.3 Implement test matrix for all variant/tone combinations:
  - [x] filled × accent
  - [x] filled × neutral
  - [x] filled × destructive
  - [x] tinted × accent
  - [x] tinted × neutral
  - [x] tinted × destructive
  - [x] plain × accent
  - [x] plain × neutral
  - [x] plain × destructive
- [x] 5.4 Implement state tests for each combination:
  - [x] default state
  - [x] hover state
  - [x] active state
  - [x] focus state
  - [x] disabled state
  - [x] loading state
- [x] 5.5 Add CSS verification checks (data attributes or class names)
- [x] 5.6 Optionally add Playwright visual regression tests (requires approval)

## 6. CSS Specificity Investigation
- [x] 6.1 Inspect CSS layer order in generated liquidify.css
- [x] 6.2 Verify button recipes are in correct layer
- [x] 6.3 If needed, adjust Panda config for CSS layers
- [x] 6.4 Re-test button rendering after CSS changes
- [x] 6.5 Document any specificity adjustments made

## 7. Version Bump
- [x] 7.1 Confirm current version is 0.6.20
- [x] 7.2 Run `bun pm version patch` in repository root
- [x] 7.3 Run `bun pm version patch` in libs/components
- [x] 7.4 Verify both package.json files show 0.6.21
- [x] 7.5 Verify version sync between root and libs/components

## 8. Validation & Testing
- [x] 8.1 Run `bun run lint` - must pass with no errors
- [x] 8.2 Run `bun run type-check` - must pass with no errors
- [x] 8.3 Run `bun run build` - must complete successfully
- [x] 8.4 Run `bun run test` - all unit tests must pass
- [x] 8.5 Run consumer fixture tests:
  - [x] ESM imports (all 47 Ark UI + flat components)
  - [x] CJS requires (all 47 Ark UI + flat components)
- [x] 8.6 Run button variant tests - all combinations must pass
- [x] 8.7 Verify no regressions in existing tests

## 9. OpenSpec Validation
- [x] 9.1 Update build-system spec delta with new requirements
- [x] 9.2 Run `openspec validate --strict`
- [x] 9.3 Fix any validation errors
- [x] 9.4 Confirm proposal.md aligns with implementation

## 10. Documentation Updates
- [x] 10.1 Update README.md with import examples:
  - [x] Flat imports: `import { Button } from "liquidify-react/button"`
  - [x] Nested imports: `import { Accordion } from "liquidify-react/ark-ui/accordion"`
- [x] 10.2 Document supported variants and tones for Button
- [x] 10.3 Note ESM and CJS support via package exports
- [x] 10.4 Add migration guide (if needed - currently backward compatible)

## 11. Final Checks & Commit
- [x] 11.1 Review all changed files
- [x] 11.2 Ensure no debug code or console.logs remain
- [x] 11.3 Run final build and test suite
- [x] 11.4 Commit with conventional message:
  ```
  feat(components): add nested Ark UI exports and fix Button variant rendering
  
  - Add ./ark-ui/* subpath exports to package.json
  - Support ESM, CJS, and TypeScript types for all 47 Ark UI components
  - Add comprehensive import resolution tests (fixture consumer)
  - Add Button variant/tone rendering tests
  - Verify Panda CSS codegen runs before build
  - Bump version to 0.6.21
  
  BREAKING CHANGE: None - fully backward compatible
  ```
- [x] 11.5 Push branch and open PR
- [x] 11.6 Reference OpenSpec change ID: fix-ark-ui-imports-and-rendering

## 12. Post-Merge Archival
- [x] 12.1 After deployment, archive the change:
  ```bash
  openspec archive fix-ark-ui-imports-and-rendering --yes
  ```
- [x] 12.2 Verify archived change passes validation
- [x] 12.3 Update specs/build-system/spec.md if needed
