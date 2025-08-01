# GlassChart

GlassChart component with glassmorphism design.

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
import { GlassChart } from '@liquidify/ui'

// Or import individual component (better for tree-shaking)
import { GlassChart } from '@liquidify/ui/chart'
```

## Basic Usage

```tsx
import { GlassChart } from '@liquidify/ui'

export default function Example() {
  return <GlassChart />
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| data | `Array<ChartDataPoint>` | - | - |
| width? | `number` | - | - |
| height? | `number` | - | - |
| className? | `string` | - | - |
| animated? | `boolean` | - | - |
| showTooltip? | `boolean` | - | - |


## Examples

### Basic Example

```tsx
import { GlassChart } from '@liquidify/ui'

export default function Example() {
  return <GlassChart />
}
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

- Consider using related components from the data category
- Check the design system guide for consistent usage patterns
