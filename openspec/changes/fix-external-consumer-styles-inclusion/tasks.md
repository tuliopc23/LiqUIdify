## 1. Investigation
- [ ] 1.1 Verify libs/components/dist/liquidify.css contains Panda layers and styled-system
- [ ] 1.2 Verify package.json exports.styles points to libs/components/dist/liquidify.css and is published
- [ ] 1.3 Confirm subpath entries do not depend on import-order for CSS (global.ts path)
- [ ] 1.4 Reproduce in Astro MDX minimal repo and capture failures

## 2. Fixes
- [ ] 2.1 Ensure global.ts is imported only from root index and removed from subpath barrels
- [ ] 2.2 Keep CSS only in emitted CSS bundle; remove JS-side CSS imports from root to avoid duplication
- [ ] 2.3 Add CI script to assert CSS layers present
- [ ] 2.4 Update README with explicit styles import recipe for Astro/MDX

## 3. Validation
- [ ] 3.1 bun run build; test-imports.js ESM require in Node
- [ ] 3.2 Install tarball in Astro example; verify Button styled in MDX
- [ ] 3.3 openspec validate fix-external-consumer-styles-inclusion --strict
