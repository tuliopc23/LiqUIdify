# Accessibility Guide (WCAG 2.1 AA)

LiqUIdify is designed with accessibility as a first‑class concern. Components aim to meet WCAG 2.1 AA by default and include sensible ARIA attributes, keyboard interactions, and focus management.

## Principles

- Keyboard operability for all interactive components (Tab/Shift+Tab, Arrow keys, Enter/Space as appropriate)
- Programmatic labels via aria-label/aria-labelledby
- Roles and relationships for composite widgets (tabs, combobox, dialog, listbox)
- Visible focus indicators with sufficient contrast
- Live region announcements for dynamic content where needed
- Prefers-reduced-motion friendly animations

## Color and Contrast

- Token system exposes readable versus decorative surfaces.
- Use `.bg-liquid-readable` or components that apply readable surfaces for text to ensure ≥ 4.5:1 contrast.

## Semantics by Component

- Dialogs/Modals: `role="dialog"`, `aria-modal="true"`, focus trap and return
- Tabs: `role="tablist"`, `role="tab"`, `aria-controls` and roving tabindex
- Combobox/Select: `role="combobox"` with popup listbox (`role="listbox"`) and active descendant patterns
- Checkbox/Radio: native inputs or ARIA parity with proper state reflection
- Breadcrumbs: `nav` landmark and `aria-label="Breadcrumb"`
- Progress: use `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`

## Keyboard Support (Examples)

- Tabs: ArrowLeft/Right to switch, Home/End to jump, Enter/Space to activate
- Combobox: ArrowDown/Up to navigate options, Enter to select, Esc to close
- Dialog: Esc to close, focus locked inside while open

## Testing

- Automated checks via `npm run test:a11y` (Vitest + axe)
- Storybook a11y addon and manual screen reader checks
- Visual focus ring verification in light and dark themes

## Best Practices for Consumers

- Always provide meaningful labels
- Avoid using decorative glass surfaces for long body text
- Use provided provider components to inherit correct semantics and focus styles
- Test with keyboard and a screen reader (NVDA/JAWS/VoiceOver)

## Learn More

- Storybook Playground: https://liquidify-storybook.vercel.app
- Documentation site (Accessibility): https://liquidify-docs.vercel.app/guides/accessibility
