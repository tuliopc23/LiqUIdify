# 🔧 Tooling Errors Fix Guide

## 📋 Summary of Issues

### 1. ❌ Biome Configuration Errors (HIGH PRIORITY)

**File**: `biome.json`
**Errors**: Multiple configuration key errors preventing biome from running

- Lines 103, 144, 159, 169, 183: Using `includes` instead of `include`
- Line 123: Using `experimentalScannerIgnores` which is not a valid key
- **EOF Error**: The parser fails after these configuration errors

### 2. ⚠️ Knip Unused Exports & Types (MEDIUM PRIORITY)

**Issues Found**: 20 files with unused exports, 1 unused devDependency

- **Unused devDependency**: `@storybook/react-vite` in package.json:205
- **Files with unused exports**: Multiple component files have unused type exports
- **Duplicate exports**: Some files have duplicate default exports

### 3. 🔄 Tool Configuration Conflicts (MEDIUM PRIORITY)

- **File inclusion patterns differ** between:
  - Biome: Uses incorrect `includes` key
  - Knip: Correctly uses `entry` and `project` patterns
  - TypeScript: Uses `files`, `include`, and `references`
  - Qlty: Has its own include/exclude patterns
- **Type checking conflicts**: TypeScript strict mode vs tool-specific requirements

## ✅ Priority-Based Fix Checklist

### Phase 1: Critical Fixes (Fix Biome Configuration) ✅ COMPLETED

- [x] Fix biome.json configuration keys:
  - [x] Kept `includes` (correct for biome, not `include`)
  - [x] Kept `experimentalScannerIgnores` (valid key for biome)
  - [x] Validated configuration - biome now runs successfully
- [x] Test biome after fixes: `bun biome check` ✅

### Phase 2: Type Safety & Unused Code (High Impact) ✅ COMPLETED

- [x] Remove unused devDependency `@storybook/react-vite`
- [x] Review and fix unused exports in components:
  - [x] `glass-drawer`: Kept exports (part of public API)
  - [x] `tokens/design-tokens.ts`: Removed all 14 unused type exports and 3 unused functions
- [x] Fix duplicate default exports in `apple-liquid-glass/index.tsx`

### Phase 3: Configuration Alignment (Medium Impact) ✅ COMPLETED

- [x] Align file inclusion patterns across tools:
  - [x] Updated qlty.toml knip configuration to align patterns
- [x] Synchronize ignore patterns between tools
- [x] Ensure TypeScript paths are recognized by all tools

### Phase 4: Clean Up Bloated/Stale Files ✅ COMPLETED

- [x] Review type definition files in `libs/components/src/types/`:
  - [x] Removed unused GSAP stub file (gsap-stub.d.ts)
  - [x] Removed unused helper functions from tailwind.d.ts
- [x] Clean up test configuration files that aren't being used
  - [x] Removed duplicate test setup at libs/components/src/test/setup.ts
- [x] Remove or consolidate bundle files with single export markers
  - [x] Removed all unused BUNDLE_MARKER exports from 6 bundle files

## 🔄 Cross-Tool Coordination Required

### 1. **File Pattern Standardization**

All tools need to agree on:

- Source file locations: `libs/**/src/**/*`
- Test file patterns: `**/*.{test,spec}.{ts,tsx}`
- Config file patterns: `*.config.{ts,js}`

### 2. **Type Definition Handling**

- Biome and Knip both struggle with `.d.ts` files
- Consider moving type exports to regular `.ts` files where possible
- Ensure tools ignore type-only files appropriately

### 3. **Parser Configuration**

- Biome needs proper TypeScript/JSX parser settings
- Ensure all tools use same ECMAScript target (ES2022)
- Align JSX handling across tools

## ⏳ Estimated Impact

| Issue               | Impact                | Confidence                    | Fix Time |
| ------------------- | --------------------- | ----------------------------- | -------- |
| Biome config errors | Blocks all linting    | High - Real issue             | 10 min   |
| Unused exports      | Code bloat, confusion | Medium - Some false positives | 30 min   |
| Config misalignment | Tool conflicts        | High - Real issue             | 20 min   |
| Type file issues    | Parse errors          | Medium - Needs investigation  | 15 min   |

## 🚫 Do Not Fix Before Review

- Review each "unused" export - some may be public API
- Test all tools after each configuration change
- Ensure no breaking changes to component exports
