# GlassPerformanceDashboard

GlassPerformanceDashboard component with glassmorphism design.

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
import { GlassPerformanceDashboard } from "@liquidify/ui";

// Or import individual component (better for tree-shaking)
import { GlassPerformanceDashboard } from "@liquidify/ui/performance-dashboard";
```

## Basic Usage

```tsx
import { GlassPerformanceDashboard } from "@liquidify/ui";

export default function Example() {
  return <GlassPerformanceDashboard />;
}
```

## Props

| Prop       | Type                                                           | Default | Description |
| ---------- | -------------------------------------------------------------- | ------- | ----------- |
| className? | `string`                                                       | -       | -           |
| position?  | `"top-left" \| "top-right" \| "bottom-left" \| "bottom-right"` | -       | -           |
| collapsed? | `boolean`                                                      | -       | -           |
| onClose?   | `() => void`                                                   | -       | -           |

## Examples

### Basic Example

```tsx
import { GlassPerformanceDashboard } from "@liquidify/ui";

export default function Example() {
  return <GlassPerformanceDashboard />;
}
```

### Variants

#### LiveMetrics

```tsx
<GlassPerformanceDashboard />
```

#### CompactView

```tsx
<GlassPerformanceDashboard />
```

#### DetailedAnalytics

```tsx
<GlassPerformanceDashboard />
```

#### MultipleChartTypes

```tsx
<GlassPerformanceDashboard />
```

#### ResponsiveGrid

```tsx
<GlassPerformanceDashboard />
```

#### AlertsAndThresholds

```tsx
<GlassPerformanceDashboard />
```

#### DarkModeOptimized

```tsx
<GlassPerformanceDashboard />
```

#### MobileResponsive

```tsx
<GlassPerformanceDashboard />
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

- Consider using related components from the utility category
- Check the design system guide for consistent usage patterns
