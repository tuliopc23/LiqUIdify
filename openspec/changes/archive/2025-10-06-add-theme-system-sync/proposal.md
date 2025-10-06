## Why
Users expect the UI to follow their OS light/dark preference and update live. The library currently requires an explicit theme and does not expose a "system" mode.

## What Changes
- Add System Theme Sync capability: a provider + hook API to follow prefers-color-scheme and react to OS changes
- New concept of mode ("light" | "dark" | "system") with a derived effectiveTheme
- Provider props for defaultMode, followSystem, persistTheme, onThemeChange
- SSR compatibility: respect <html data-theme> or CSS prefers-color-scheme on first paint

## Impact
- Affected specs: theming
- Affected code: libs/components/src/hooks/use-theme.tsx, libs/components/src/lib/theme.ts, tests, docs
