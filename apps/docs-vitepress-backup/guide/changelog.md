# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Comprehensive GitHub Actions workflow improvements
  - Added Bun dependency caching across all workflows for faster CI/CD
  - Added OSV Scanner security scanning job to code-quality workflow
  - Set `OPTIMIZE_CSS=true` environment variable in build jobs
  - Added Playwright browser caching for E2E tests
- Husky pre-commit hooks with lint-staged for code quality
- Shared Rolldown configuration in `build/rolldown.shared.ts`
- `.lintstagedrc.json` configuration for automatic code formatting

### Changed

- Migrated all GitHub Actions workflows from npm to Bun commands
- Updated all cache keys to use `bun.lockb` instead of `bun.lock`
- Refactored `vite.config.ts` to use shared Rolldown configuration
- Simplified rollupOptions output configuration in vite.config.ts
- Updated all workflows to cache both `~/.bun/install/cache` and `node_modules`

### Fixed

- Fixed failing GitHub Actions workflows by properly configuring Bun
- Corrected import statement to use `rolldown` instead of `rollup` types
- Fixed cache key references to use correct lockfile name (`bun.lockb`)

### Security

- Added OSV Scanner for vulnerability detection in dependencies
- Configured security scanning as part of CI/CD pipeline

### Infrastructure

- Standardized on Bun as the single runtime across all workflows
- Improved CI/CD performance with comprehensive caching strategy
- Enhanced build optimization with CSS minification flag

## [0.1.0] - Previous Release

Initial release of LiqUIdify component library.
