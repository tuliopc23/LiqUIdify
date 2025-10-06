## Why
Docs site (Astro + MDX) consuming published liquidify-react shows components unstyled/partially styled or not rendering. Root cause likely CSS packaging/inclusion mismatch: Panda/styled-system CSS not reliably included via subpath imports; CSS asset name and export may not align; side-effect imports strip in build; some components depend on global.ts side-effects not guaranteed when tree-shaken.

## What Changes
- Guarantee single CSS bundle emission and mapping to package export `./styles`
- Ensure subpath entries import shared global side-effects once (no duplicates) and tree-shake safe
- Add runtime guard to auto-initialize tokens when consumer forgets `import "liquidify-react/styles"`
- Add build step validation that `liquidify.css` contains Panda tokens/recipes and styled-system
- Add docs in README: required CSS import and ThemeProvider note for MDX/Astro islands

## Impact
- Affected specs: theming
- Affected code: libs/components/vite.config.ts, libs/components/src/index.ts, libs/components/src/styles/global.ts, package.json exports, CI check script, README
