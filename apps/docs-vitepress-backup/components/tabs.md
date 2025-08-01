# GlassTabs

GlassTabs component with glassmorphism design.

## Installation

```bash
npm install @liquidify/ui
```

Or install just this component:

```bash
npm install @liquidify/ui
```

```tsx
// Import the full library
import { GlassTabs } from "@liquidify/ui";

// Or import individual component (better for tree-shaking)
import { GlassTabs } from "@liquidify/ui/tabs";
```

## Basic Usage

```tsx
import { GlassTabs } from "@liquidify/ui";

export default function Example() {
  return <GlassTabs />;
}
```

## Props

| Prop                        | Type                         | Default | Description |
| --------------------------- | ---------------------------- | ------- | ----------- |
| tabs                        | `Array<GlassTabItem>`        | -       | -           |
| defaultTab?                 | `string`                     | -       | -           |
| className?                  | `string`                     | -       | -           |
| tabListClassName?           | `string`                     | -       | -           |
| tabButtonClassName?         | `string`                     | -       | -           |
| activeTabButtonClassName?   | `string`                     | -       | -           |
| inactiveTabButtonClassName? | `string`                     | -       | -           |
| tabPanelClassName?          | `string`                     | -       | -           |
| orientation?                | `"horizontal" \| "vertical"` | -       | -           |

## Examples

### Basic Example

```tsx
import { GlassTabs } from "@liquidify/ui";

export default function Example() {
  return <GlassTabs />;
}
```

### Variants

#### WithDefaultTab

```tsx
<GlassTabs />
```

#### WithIcons

```tsx
<GlassTabs />
```

#### WithDisabledTabs

```tsx
<GlassTabs />
```

#### InteractiveDemo

```tsx
<GlassTabs />
```

#### SettingsExample

```tsx
<GlassTabs />
```

#### DocumentationExample

```tsx
<GlassTabs />
```

#### CustomStyling

```tsx
<GlassTabs />
```

#### AccessibilityDemo

```tsx
<GlassTabs />
```

## Accessibility

- Follows WAI-ARIA guidelines
- Keyboard navigation support
- Screen reader compatible
- Focus management
- Color contrast compliant

## Best Practices

- Use semantic HTML elements
- Provide appropriate labels and descriptions
- Consider color contrast ratios
- Test with keyboard navigation
- Verify screen reader compatibility

## Related Components

- Consider using related components from the navigation category
- Check the design system guide for consistent usage patterns
