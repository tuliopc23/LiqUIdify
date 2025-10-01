## 1. Implementation
- [ ] 1.1 Extend ThemeProvider to support mode: "light" | "dark" | "system" and compute effectiveTheme
- [ ] 1.2 Add media query listener for prefers-color-scheme changes with SSR guards
- [ ] 1.3 Add persistence for mode/effectiveTheme under ui-theme-mode and ui-theme
- [ ] 1.4 Update data-theme and class synchronization to use effectiveTheme
- [ ] 1.5 Unit tests for SSR safety, mode switching, and live system updates
- [ ] 1.6 Docs: README theming section and examples

## 2. Spec & Validation
- [ ] 2.1 Write theming spec deltas
- [ ] 2.2 Run `openspec validate add-theme-system-sync --strict`
