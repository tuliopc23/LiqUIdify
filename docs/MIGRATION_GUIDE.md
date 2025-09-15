# Migration Guide

This guide helps you migrate to LiqUIdify from other UI libraries. The goals:

- Keep bundle size small using modular imports
- Preserve or improve accessibility (WCAG 2.1 AA)
- Map common components with minimal refactors

## General Strategy

1. Install the package and global styles:
   ```ts
   import "liquidify/css";
   ```
2. Wrap your app with the provider if needed:
   ```tsx
   import { UnifiedGlassProvider } from "liquidify";
   ```
3. Replace components incrementally; start with low‑risk ones (Button, Card, Skeleton).

## Mapping Examples

- Button → `GlassButton`
- Card/Panel → `GlassCard`
- Modal/Dialog → `GlassModal`
- Tabs → `GlassTabs`
- Breadcrumbs → `GlassBreadcrumbs`
- Toast/Notification → `GlassToast` / `GlassNotification`
- Spinner/Loader → `GlassLoading`
- Switch/Checkbox/Radio → `GlassSwitch` / `GlassCheckbox` / `GlassRadioGroup`
- Select/Autocomplete → `GlassSelect` / `GlassCombobox`

Use modular imports to limit bundle growth:

```ts
import { GlassButton } from "liquidify/button";
import { GlassCard } from "liquidify/card";
```

## Theming

- Default theme provides glass tokens for decorative vs readable surfaces.
- Use `ThemeProvider` or `UnifiedGlassProvider` and override tokens via `createTheme`.

## Accessibility Considerations

- Verify keyboard flows for Tabs, Dialogs, Combobox
- Ensure labels are present for form controls
- Prefer `.bg-liquid-readable` surfaces for text-heavy areas

## Common Pitfalls

- Importing the entire library unnecessarily: prefer per-component or per-bundle imports
- Forgetting to include global CSS once at app root
- Custom CSS that reduces contrast on readable surfaces

## Learn More

- Storybook: https://liquidify-storybook.vercel.app
- Docs site (Getting Started): https://liquidify-docs.vercel.app/getting-started/project-setup
