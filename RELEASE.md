## Release model

- The **canonical published package** is `liquidify-react`, defined in the **root** `package.json`.
- The `libs/components` workspace package (`@liquidify/components`) is **internal-only** and marked `"private": true`. It exists to drive the Vite/TypeScript build and Bun workspace tooling but is **not** published directly to npm.

When running `npm publish` (including from CI), the root manifest is used and its `exports`, `sideEffects`, and `files` shape the published artifact.

## How versions are managed

- The root `package.json` version is the **single source of truth** for what is on npm.
- The `libs/components/package.json` version may be kept in sync for clarity but is not published.
- All release tags follow semantic versioning: `vMAJOR.MINOR.PATCH` (for example, `v1.0.0`).

## Local release checklist

Before cutting a release:

1. Ensure the main branch is green:
   - `bun run lint`
   - `bun run type-check`
   - `bun run test`
   - `bun run build:lib`
2. Optionally run the release dry-run workflow locally:
   - `bun run build:lib`
   - `bunx publint`
   - `npm pack --dry-run`
3. Update the version in the root `package.json`.
4. Update `CHANGELOG.md` with notes for this version.
5. Commit with a message like `chore(release): vX.Y.Z`.
6. Tag the commit: `git tag vX.Y.Z` and push tags.

CI will then:

- Re-run tests and build.
- Publish `liquidify-react` to npm using the root manifest.
- Create a GitHub Release for `vX.Y.Z`.

