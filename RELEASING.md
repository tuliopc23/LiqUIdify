# Releasing Liquidify

This project follows semver. Releases are manual to avoid blocking CI gates.

## Verify locally

- bun install --frozen-lockfile
- bun run type-check
- bun run test
- bun run build:lib

Optional checks:

- In libs/components (or project root if publishing from root), run:
  - bunx publint
  - npm pack --dry-run

## Publish to npm

If publishing from the root package ("liquidify"):

- npm login
- npm publish --access public --provenance

Note: Do not add pre-commit or pre-push hooks. CI remains advisory and non-blocking for release.
