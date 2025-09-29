# CRUSH: Repo quick reference
- Dev: bun run dev (library playground via libs/components/vite.config.ts)
- Build (root): bun run build
- Build lib only: bun run --filter @liquidify/components build
- Clean: bun run clean
- Typecheck: bun run type-check | Watch: bun run type-check:watch
- Lint: bun run lint | Fix: bun run lint:fix
- Format check/fix: bun run format:check | bun run format
- Test (all): bun run test
- Test (watch): bunx vitest -c vitest.config.mts
- Test (single file): bunx vitest -c vitest.config.mts run path/to/file.test.tsx
- Test (single name): bunx vitest -c vitest.config.mts run -t "pattern"
- Test UI: bunx vitest -c vitest.config.mts --ui
- Coverage: bunx vitest -c vitest.config.mts run --coverage

## Code style
- Formatting: Biome (tabs, double quotes). Run format before commits.
- Imports: use path aliases (@, @/components, etc.); prefer named exports; maintain index.ts barrels.
- Types: TS strict; no implicit any; export Props interfaces; add explicit return types for public APIs.
- Components: PascalCase component and file names; hooks camelCase with use*; set Component.displayName.
- CSS: Use Panda CSS tokens/recipes; import "liquidify-react/styles" once; no inline styles (style={{}}).
- Accessibility: Follow Ark UI patterns; include ARIA roles/labels; respect prefers-reduced-motion.
- Error handling: Fail fast with thrown Errors; avoid console logs/warns in library code.
- SSR: No window access at import time; guard browser-only code; use SSR-safe hooks.
- Testing: Vitest + RTL; call setupDOM() in beforeAll for React tests; prefer container queries.
- Exports: Keep peers external (react, react-dom, @ark-ui/react, framer-motion, lucide-react); CSS is side-effect.
- Bans/guards: No Storybook/Tailwind refs; avoid legacy “liquid-glass” artifacts; no inline styles.
- Monorepo: Artifacts to libs/components/dist; subpath imports supported.
- Cursor/Copilot: none detected in repo.
