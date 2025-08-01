# GlassNotification

GlassNotification component with glassmorphism design.

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
import { GlassNotification } from '@liquidify/ui'

// Or import individual component (better for tree-shaking)
import { GlassNotification } from '@liquidify/ui/notification'
```

## Basic Usage

```tsx
import { GlassNotification } from '@liquidify/ui'

export default function Example() {
  return <GlassNotification />
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| notifications | `Array<NotificationItem>` | - | - |
| onMarkAsRead? | `(id: string) => void` | - | - |
| onMarkAllAsRead? | `() => void` | - | - |
| onDismiss? | `(id: string) => void` | - | - |
| className? | `string` | - | - |


## Examples

### Basic Example

```tsx
import { GlassNotification } from '@liquidify/ui'

export default function Example() {
  return <GlassNotification />
}
```

### Variants

#### EmptyState

```tsx
<GlassNotification  />
```

#### AllRead

```tsx
<GlassNotification  />
```

#### OnlyUnread

```tsx
<GlassNotification  />
```

#### Interactive

```tsx
<GlassNotification  />
```

#### NotificationTypes

```tsx
<GlassNotification  />
```

#### LongContent

```tsx
<GlassNotification  />
```

#### ManyNotifications

```tsx
<GlassNotification  />
```

#### RealTimeUpdates

```tsx
<GlassNotification  />
```

#### DarkTheme

```tsx
<GlassNotification  />
```

#### CustomStyling

```tsx
<GlassNotification  />
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

- Consider using related components from the feedback category
- Check the design system guide for consistent usage patterns
