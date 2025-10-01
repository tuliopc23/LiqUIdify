# Implementation Tasks

## 1. Path Audit and Discovery
- [x] 1.1 Search all files for `dist/libs/components` references using grep/ripgrep
- [x] 1.2 Search all files for conflicted `/components` directory mentions
- [x] 1.3 Identify all configuration files requiring path updates
- [x] 1.4 Document current vs target path structure

## 2. Configuration Files Update
- [x] 2.1 Update package.json main/module/types/style fields
- [x] 2.2 Update package.json exports configuration
- [x] 2.3 Update package.json files array
- [x] 2.4 Update package.json typesVersions mapping
- [x] 2.5 Fix tsconfig.lib.json outDir path
- [x] 2.6 Update any other tsconfig references

## 3. Build and Script Files
- [x] 3.1 Update build scripts in package.json
- [x] 3.2 Verify Vite configuration output paths
- [x] 3.3 Update test import paths in test files
- [x] 3.4 Fix script files (ssr-smoke.mjs, check-css-layers.js)
- [x] 3.5 Update CI/CD workflow paths if needed

## 4. Documentation and Examples
- [x] 4.1 Update README.md build output references
- [x] 4.2 Fix preview HTML files CSS link paths
- [x] 4.3 Update OpenSpec documentation paths
- [x] 4.4 Fix test-imports.js example paths

## 5. CSS and Styling Validation
- [x] 5.1 Verify liquidify.css contains all Panda layers (@layer reset,base,tokens,recipes,utilities)
- [x] 5.2 Confirm CSS file size and content integrity (441.48 kB expected)
- [x] 5.3 Validate tokens and recipes are properly included
- [x] 5.4 Test CSS import resolution from correct path

## 6. Import Resolution Testing
- [x] 6.1 Test main package import (`import { Button } from 'liquidify-react'`)
- [x] 6.2 Test subpath imports (`import { Button } from 'liquidify-react/button'`)
- [x] 6.3 Test CSS import (`import 'liquidify-react/styles'`)
- [x] 6.4 Verify TypeScript declaration file resolution
- [x] 6.5 Test both ESM and CJS import scenarios

## 7. Build Validation
- [x] 7.1 Run full build and verify output structure
- [x] 7.2 Confirm TypeScript compilation to correct directory
- [x] 7.3 Validate component count (54 expected)
- [x] 7.4 Test build artifacts integrity
- [x] 7.5 Run CSS validation script

## 8. Final Verification
- [x] 8.1 Search for any remaining old path references
- [x] 8.2 Test import scenarios in clean environment
- [x] 8.3 Verify no broken links or missing files
- [x] 8.4 Confirm publish-ready state with correct paths
