# Fix Ark UI Imports and Button Variant Rendering

## Why

The library's `package.json` exports configuration uses a wildcard pattern `./*` that only captures single-level paths (e.g., `button`, `badge`, `card`). This fails for nested Ark UI component paths like `ark-ui/accordion`, preventing 47+ Ark UI components from being imported via their intended subpaths in consuming applications.

Additionally, Button component variants (filled/tinted/plain) and tones (accent/neutral/destructive) may not render properly due to potential CSS specificity conflicts between Panda CSS recipes and component styles.

**Impact**: Without this fix, documentation sites and consumer applications cannot import or render Ark UI components using the documented import paths, significantly limiting library usability.

## What Changes

### Package Exports Configuration
- Add **`"./ark-ui/*"`** nested subpath export pattern to both:
  - Root `package.json` (liquidify-react)
  - `libs/components/package.json` (@liquidify/components)
- Support all module formats: TypeScript types (`.d.ts`), ESM (`.mjs`), CJS (`.cjs`)
- Maintain backward compatibility with existing flat imports (`./button`, `./badge`, etc.)
- Pattern will match actual dist structure: `./libs/components/dist/components/ark-ui/*/index.{mjs,cjs,d.ts}`

### Build System
- Ensure Panda CSS `codegen` runs **before** Vite build in prebuild hook
- Verify CSS layer ordering: `@layer reset, base, tokens, recipes, utilities`
- Validate CSS output contains all button variant/tone styles

### Testing Infrastructure
- **Import Resolution Tests**: Create consumer fixture to test ESM and CJS import resolution for:
  - Flat imports (button, badge, card)
  - All 47 nested Ark UI component imports
- **Button Variant Tests**: Add comprehensive rendering tests for:
  - Variants: filled, tinted, plain
  - Tones: accent, neutral, destructive  
  - States: default, hover, active, focus, disabled, loading
- **CSS Verification**: Validate that component styles apply correctly and variant/tone markers are present

### Version Bump
- Patch version: `0.6.20` → `0.6.21`
- No breaking changes; purely additive exports

## Impact

### Affected Specs
- `build-system` - Added nested export requirements and testing requirements

### Affected Code
- `/package.json` - Added ark-ui/* export pattern
- `/libs/components/package.json` - Added ark-ui/* export pattern
- `/libs/components/test-fixtures/consumer/` - New import resolution test fixture
- `/libs/components/src/__tests__/button.variants.spec.tsx` - New variant/tone rendering tests

### Breaking Changes
**None** - This change is fully backward compatible. Existing flat imports continue to work unchanged.

### Migration Path
**Not Required** - Consumers can opt into nested imports when ready. No action needed for existing code.

## Non-Goals

- API redesign or component interface changes
- Theming system overhaul
- Changes to Panda CSS token structure
- Documentation site updates (separate follow-up task)

## Risks & Mitigations

### Risk: Export Pattern Mismatch
**Issue**: Wildcard pattern might not match actual dist file structure  
**Mitigation**: Build and inspect dist structure first; adjust pattern (`/*` vs `/*/index`) accordingly  
**Verification**: Consumer fixture tests will fail if resolution is incorrect

### Risk: JSDOM Style Computation Limitations
**Issue**: JSDOM may not compute CSS styles in unit tests  
**Mitigation**:  
- Primary: Verify component renders with correct data attributes and class names
- Secondary: Check CSS file contains expected variant/tone selectors
- Optional: Add lightweight Playwright visual tests if needed

### Risk: CSS Specificity Conflicts
**Issue**: Panda recipes might be overridden by component styles or vice versa  
**Mitigation**:  
- Enforce CSS layer ordering in Panda config
- Test button rendering in isolation
- Adjust recipe specificity if needed (minimal changes only)

### Risk: Build Performance
**Issue**: Adding codegen to prebuild might slow build times  
**Mitigation**: Panda codegen is already fast (<1s); negligible impact

## Rollback Plan

1. Revert package.json exports changes:
   ```bash
   git checkout HEAD~1 -- package.json libs/components/package.json
   ```

2. Disable new tests (comment out or skip):
   ```bash
   git checkout HEAD~1 -- libs/components/test-fixtures
   git checkout HEAD~1 -- libs/components/src/__tests__/button.variants.spec.tsx
   ```

3. Revert version bump:
   ```bash
   bun pm version 0.6.20
   ```

4. Rebuild and verify:
   ```bash
   bun run build && bun run test
   ```

## Success Criteria

1. ✅ All 47 Ark UI components import successfully in both ESM and CJS
2. ✅ Button component renders all variant/tone combinations correctly
3. ✅ State tests pass (hover, active, focus, disabled, loading)
4. ✅ Build completes with no TypeScript or lint errors
5. ✅ OpenSpec validation passes in strict mode
6. ✅ No breaking changes for existing consumers
