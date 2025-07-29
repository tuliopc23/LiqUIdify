# Components Overview

LiqUIdify provides over 40 production-ready React components, each designed with glassmorphism aesthetics and accessibility in mind.

## Component Categories

### Core Components

Essential building blocks for any application:

- [Button](/components/button) - Interactive button with variants
- [Card](/components/card) - Content container with glass effect
- [Input](/components/input) - Text input with validation
- [Badge](/components/badge) - Status indicators
- [Avatar](/components/avatar) - User profile images

### Form Components

Complete form building blocks:

- [Select](/components/select) - Dropdown selection
- [Switch](/components/switch) - Toggle switches
- [Checkbox](/components/checkbox) - Multi-selection
- [Radio](/components/radio) - Single selection
- [Slider](/components/slider) - Value selection
- [Textarea](/components/textarea) - Multi-line input

### Layout Components

Structure your application:

- [Container](/components/container) - Responsive container
- [Grid](/components/grid) - Grid layout system
- [Stack](/components/stack) - Flexbox utilities
- [Divider](/components/divider) - Visual separators

### Feedback Components

User feedback and notifications:

- [Toast](/components/toast) - Notification messages
- [Alert](/components/alert) - Inline alerts
- [Progress](/components/progress) - Progress indicators
- [Skeleton](/components/skeleton) - Loading placeholders
- [Spinner](/components/spinner) - Loading spinners

### Navigation Components

Navigation and organization:

- [Tabs](/components/tabs) - Tabbed interfaces
- [Breadcrumb](/components/breadcrumb) - Navigation trails
- [Pagination](/components/pagination) - Page navigation
- [Navigation](/components/navigation) - Nav menus

### Overlay Components

Modal and overlay elements:

- [Modal](/components/modal) - Dialog windows
- [Popover](/components/popover) - Contextual overlays
- [Tooltip](/components/tooltip) - Hover tooltips
- [Drawer](/components/drawer) - Slide-out panels

### Data Display

Present data effectively:

- [Table](/components/table) - Data tables
- [DataTable](/components/data-table) - Advanced tables
- [Chart](/components/chart) - Data visualization
- [Timeline](/components/timeline) - Event timelines

## Component Features

All LiqUIdify components share these common features:

### Consistent API

```tsx
<GlassComponent
  variant="primary"
  size="medium"
  disabled={false}
  className="custom-class"
  {...props}
/>
```

### Theme Support

```tsx
<GlassButton colorScheme="blue" variant="solid" />
```

### Accessibility

- Full keyboard navigation
- ARIA attributes
- Screen reader support
- Focus management

### Customization

- CSS variables for theming
- className prop for custom styles
- Ref forwarding for direct DOM access
- Extensible with composition

## Getting Started

1. Install LiqUIdify following the [installation guide](/guide/installation)
2. Import the components you need
3. Apply the glassmorphism theme
4. Build amazing interfaces!

```tsx
import { GlassButton, GlassCard } from "liquidify";

function MyComponent() {
  return (
    <GlassCard>
      <h2>Welcome to LiqUIdify</h2>
      <GlassButton>Click me</GlassButton>
    </GlassCard>
  );
}
```
