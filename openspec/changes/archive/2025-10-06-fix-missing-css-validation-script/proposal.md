# Fix Missing CSS Validation Script

## Why
The `prepublishOnly` script references `bun run check:css-layers` but this script is not defined in package.json, causing npm publish to fail. The script exists as `scripts/check-css-layers.js` and validates that the built CSS contains proper Panda layers and tokens, which is critical for ensuring publish quality.

## What Changes
- **Add missing script**: Define `check:css-layers` in package.json scripts section
- **Point to existing file**: Reference the working `scripts/check-css-layers.js` validation script
- **Ensure publish workflow**: Fix the `prepublishOnly` script execution chain

## Impact
- Affected specs: build-system (publish validation)
- Affected code: package.json scripts section
- **BREAKING**: Without this fix, npm publish fails completely
- Risk mitigation: Simple script addition with existing, tested validation logic
