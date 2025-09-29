## 1. Implementation
- [x] 1.1 Define AccentPresetName union and preset catalog in lib/theme.ts
- [x] 1.2 Add listAccentPresets(), getAccentPreset(name), setAccentPreset(name, options) to lib/theme.ts
- [x] 1.3 Extend setAccent/getAccent to accept { persist?: boolean } and keep storageKey support
- [x] 1.4 Update ThemeProvider props: accentPreset?, accentPresets?, persistAccent? (default true), onAccentChange?
- [x] 1.5 Add setAccentPreset and accentPreset to useTheme() return shape
- [x] 1.6 Wire precedence: prop accentPreset → storage (if persistAccent) → CSS var/data-accent → defaultAccent
- [x] 1.7 Ensure SSR safety: guard window/document, prefer root dataset and inline CSS var
- [x] 1.8 Export new APIs from libs/components/src/index.ts
- [x] 1.9 Add minimal CSS token docs for --ui-accent usage and data-accent attribute

## 2. Tests
- [x] 2.1 Unit: preset catalog shape and values
- [x] 2.2 Unit: setAccentPreset updates dataset and --ui-accent
- [x] 2.3 Unit: persistAccent=false avoids localStorage writes/reads
- [x] 2.4 Unit: SSR-safe paths do not access window at import time
- [x] 2.5 Unit: precedence resolution across accentPreset prop, storage, CSS var
- [x] 2.6 A11y: contrast checks for preset foreground/background combinations (WCAG AA)

## 3. Documentation
- [x] 3.1 Update README/theming guide with preset list and API examples
- [x] 3.2 Add SSR snippet: pre-render data-accent on <html> or inline --ui-accent
- [x] 3.3 Persistence guidance and storageKey naming

## 4. CI/Release
- [x] 4.1 Update tests and coverage
- [x] 4.2 Add changeset/changelog entry
- [x] 4.3 Validate with openspec validate add-themeprovider-accent-presets-runtime-switching-api --strict
