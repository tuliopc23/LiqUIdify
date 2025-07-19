# Glass UI Linting Error Report

Generated: $(date)
Command: `bunx oxlint src`

## Executive Summary
- **Total Files Analyzed**: Multiple TypeScript/React files
- **Total Errors Found**: 300+ linting violations
- **Files Affected**: 6 core files in src/

## Error Categories & Counts

### 1. Import/Export Structure Violations (67 errors)
- **Multiple named export declarations** (48 errors)
  - Should consolidate exports into single export statement
  - Files: `glass-animations.ts`, `glass-feature-showcase.tsx`, `ssr-safety.tsx`
- **Duplicate imports** (2 errors)
  - React imports duplicated in multiple files
  - framer-motion imports duplicated
- **Export statements not at end** (5 errors)
  - Interface exports appearing before component definitions
- **Import sorting violations** (12 errors)
  - Imports not in alphabetical order
  - Multiple vs Single syntax ordering issues

### 2. Filename Case Violations (6 errors)
Files requiring kebab-case renaming:
- `glass-animations.ts` → `glass-animations.ts` ✓ (already correct)
- `glass-header.tsx` → needs kebab-case conversion
- `glass-feature-showcase.tsx` → needs kebab-case conversion  
- `glass-performance-dashboard/index.ts` → needs kebab-case conversion
- `glass-switch.tsx` → needs kebab-case conversion
- `ssr-safety.tsx` → needs kebab-case conversion

### 3. React-Specific Issues (42 errors)
- **Missing React imports** (35 errors)
  - 'React' must be in scope when using JSX
  - Affects: `glass-header.tsx`, `glass-switch.tsx`, `ssr-safety.tsx`
- **Function vs expression style** (7 errors)
  - Components using function declarations instead of expressions

### 4. TypeScript Issues (14 errors)
- **Generic constructor inconsistencies** (2 errors)
  - Generic type arguments should be in constructor
  - File: `glass-animations.ts`
- **Inferrable types** (2 errors)
  - Unnecessary explicit type annotations
- **Explicit any usage** (2 errors)
  - Should use `unknown` instead of `any`
- **Identifier length violations** (8 errors)
  - Single-letter identifiers (x, y, T, e) violating minimum length

### 5. Code Style Violations (87 errors)
- **Magic numbers** (51 errors)
  - Hardcoded values: 0, 1, 2, 3, 4, 36, 50, 100, 1000, etc.
  - Common in animation values and configuration
- **Object key sorting** (15 errors)
  - Object properties not alphabetically sorted
- **Console statements** (5 errors)
  - console.warn/error statements in production code
- **Ternary expression usage** (9 errors)
  - Unexpected ternary expressions
- **Arrow body style** (1 error)
  - Block statement instead of direct return
- **Function scoping** (1 error)
  - Function not capturing parent scope variables
- **Global alias preference** (15 errors)
  - Should use `globalThis` instead of `window`

### 6. Magic Numbers and Naming Issues (84 errors)
**Common magic numbers requiring constants:**
- Animation durations: 3, 4, 6, 100, 1000
- Opacity values: 0.2, 0.3, 0.6, 0.7
- Transform values: -8, -15, -30, 10, 50
- Scale values: 1, 1.02, 1.1
- Layout numbers: 1, 2, 3, 4 (columns)
- String parsing: 36, 2, 9 (for random string generation)

## Detailed File Breakdown

### `src/lib/glass-animations.ts` (15 errors)
- Export consolidation needed
- Generic constructor issues
- Filename case violation
- Global alias preferences
- Function scoping issue

### `src/components/glass-header.tsx` (11 errors)
- Missing React import
- Import sorting
- Function declaration style
- Filename case violation

### `src/components/glass-feature-showcase.tsx` (61 errors)
- Heavy magic number usage (animation values)
- Multiple export violations
- Import sorting issues
- Object key sorting
- Ternary expression overuse
- ID length violations

### `src/components/glass-switch/glass-switch.tsx` (12 errors)
- Missing React import
- Magic numbers for random generation
- Ternary expressions
- Export positioning
- Filename case violation

### `src/core/ssr-safety.tsx` (130+ errors)
- Multiple export declarations (largest violator)
- Missing React imports throughout
- Console statement usage
- Magic numbers
- Global alias preferences
- Function declaration style
- TypeScript type issues

### `src/core/utils/color.ts` (2 errors)
- Function declaration style preference

## Priority Fixes Needed

### High Priority (Breaking/Functionality)
1. Add missing React imports to all JSX files
2. Fix duplicate imports
3. Consolidate export statements

### Medium Priority (Code Quality)
1. Convert function declarations to expressions
2. Replace magic numbers with named constants
3. Fix filename case violations
4. Replace `window` with `globalThis`

### Low Priority (Style/Consistency)
1. Sort imports alphabetically
2. Sort object keys
3. Remove console statements
4. Address ternary expression usage

## Recommended Action Plan

### Phase 1: Critical Fixes
- [ ] Add React imports to all JSX components
- [ ] Merge duplicate imports
- [ ] Consolidate export statements into single declarations

### Phase 2: Standards Compliance
- [ ] Create constants file for magic numbers
- [ ] Rename files to proper kebab-case
- [ ] Convert function declarations to expressions
- [ ] Replace `window` with `globalThis`

### Phase 3: Code Quality
- [ ] Sort all imports alphabetically
- [ ] Sort object keys consistently  
- [ ] Remove/replace console statements
- [ ] Review ternary expression usage

### Phase 4: TypeScript Improvements
- [ ] Fix generic constructor patterns
- [ ] Replace `any` with `unknown`
- [ ] Remove inferrable type annotations

## Notes
- The project uses modern React patterns but needs JSX import fixes
- Heavy use of animations creates many magic number violations
- SSR safety module has the most violations and needs major cleanup
- Consider implementing pre-commit hooks to prevent future violations
