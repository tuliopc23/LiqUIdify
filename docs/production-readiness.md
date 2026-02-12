## Production readiness checklist

This document summarizes the quality gates and definition of done for shipping `liquidify-react` as a production-ready Apple HIG-aligned component library.

### Quality gates (must-pass)

- Code style and correctness:
  - `bun run lint`
  - `bun run type-check`
- Unit tests:
  - `bun run test` (Vitest) with coverage enabled in CI and thresholds enforced.
- Build and packaging:
  - `bun run build:lib`
  - `bunx publint`
  - `npm pack --dry-run`
- Security and hygiene:
  - `security-audit` workflow (dependency audit + secret scanning).
- Design system guardrails:
  - `bun run ci:guard:banned`
  - `bun run ci:guard:inline-styles`

### Definition of Done for a release

A version is considered production-ready when:

- All components use Panda tokens/recipes and the documented CSS layering.
- Accessibility basics are covered for each core component type (roles, keyboard, focus, labeling) and reduced motion is respected across motion-enabled components.
- The Vitest suite is green with coverage meeting configured thresholds.
- The published package passes publint and pack checks and the consumer fixture app can import and render key components.
- Critical security audits are addressed and there are no known breaking changes that are not reflected in the semantic version.

See `RELEASE.md` for the detailed release flow and `README.md` / `docs/getting-started` for integration guidance.

