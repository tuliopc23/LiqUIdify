# Navbar

A responsive navigation bar component with glassmorphism effects, supporting multiple layouts and interactive elements.

## Overview

The `GlassNavbar` component provides a modern, accessible navigation solution with built-in responsive behavior, theme integration, and customizable layouts. Perfect for application headers, site navigation, and dashboard top bars.

## Installation

```bash
npm install liquidify
# or
bun add liquidify
```

## Basic Usage

```tsx
import { GlassNavbar } from "liquidify";

function App() {
  return (
    <GlassNavbar>
      <GlassNavbar.Brand href="/">
        <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
        <span className="font-semibold">LiqUIdify</span>
      </GlassNavbar.Brand>

      <GlassNavbar.Menu>
        <GlassNavbar.Item href="/about">About</GlassNavbar.Item>
        <GlassNavbar.Item href="/services">Services</GlassNavbar.Item>
        <GlassNavbar.Item href="/contact">Contact</GlassNavbar.Item>
      </GlassNavbar.Menu>

      <GlassNavbar.Actions>
        <GlassButton variant="ghost">Sign In</GlassButton>
        <GlassButton>Get Started</GlassButton>
      </GlassNavbar.Actions>
    </GlassNavbar>
  );
}
```

## Responsive Mobile Navigation

```tsx
import { GlassNavbar, GlassButton } from "liquidify";
import { useState } from "react";

function ResponsiveNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <GlassNavbar>
      <GlassNavbar.Brand href="/">
        <span className="font-bold text-xl">Brand</span>
      </GlassNavbar.Brand>

      <GlassNavbar.Toggle
        isOpen={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation menu"
      />

      <GlassNavbar.Collapse isOpen={isOpen}>
        <GlassNavbar.Menu direction="vertical">
          <GlassNavbar.Item href="/home">Home</GlassNavbar.Item>
          <GlassNavbar.Item href="/products">Products</GlassNavbar.Item>
          <GlassNavbar.Item href="/pricing">Pricing</GlassNavbar.Item>
          <GlassNavbar.Item href="/about">About</GlassNavbar.Item>
        </GlassNavbar.Menu>
      </GlassNavbar.Collapse>
    </GlassNavbar>
  );
}
```

## With Dropdown Menus

```tsx
import { GlassNavbar, GlassDropdown } from "liquidify";

function NavbarWithDropdowns() {
  return (
    <GlassNavbar>
      <GlassNavbar.Brand href="/">Brand</GlassNavbar.Brand>

      <GlassNavbar.Menu>
        <GlassNavbar.Item href="/home">Home</GlassNavbar.Item>

        <GlassDropdown>
          <GlassDropdown.Trigger>
            <GlassNavbar.Item as="button">
              Products
              <ChevronDownIcon className="ml-1 h-4 w-4" />
            </GlassNavbar.Item>
          </GlassDropdown.Trigger>

          <GlassDropdown.Content>
            <GlassDropdown.Item href="/products/web">
              Web Apps
            </GlassDropdown.Item>
            <GlassDropdown.Item href="/products/mobile">
              Mobile Apps
            </GlassDropdown.Item>
            <GlassDropdown.Item href="/products/desktop">
              Desktop Apps
            </GlassDropdown.Item>
          </GlassDropdown.Content>
        </GlassDropdown>

        <GlassNavbar.Item href="/pricing">Pricing</GlassNavbar.Item>
      </GlassNavbar.Menu>
    </GlassNavbar>
  );
}
```

## Sticky Navigation

```tsx
import { GlassNavbar } from "liquidify";

function StickyNavbar() {
  return (
    <GlassNavbar position="sticky" className="top-0 z-50 backdrop-blur-lg">
      <GlassNavbar.Brand href="/">
        <span className="font-bold">Sticky Brand</span>
      </GlassNavbar.Brand>

      <GlassNavbar.Menu>
        <GlassNavbar.Item href="#section1">Section 1</GlassNavbar.Item>
        <GlassNavbar.Item href="#section2">Section 2</GlassNavbar.Item>
        <GlassNavbar.Item href="#section3">Section 3</GlassNavbar.Item>
      </GlassNavbar.Menu>
    </GlassNavbar>
  );
}
```

## API Reference

### GlassNavbar

The main navbar container component.

| Prop        | Type                                    | Default     | Description            |
| ----------- | --------------------------------------- | ----------- | ---------------------- |
| `children`  | `ReactNode`                             | -           | Navbar content         |
| `className` | `string`                                | -           | Additional CSS classes |
| `position`  | `'static' \| 'sticky' \| 'fixed'`       | `'static'`  | Navbar positioning     |
| `variant`   | `'default' \| 'transparent' \| 'solid'` | `'default'` | Visual variant         |
| `size`      | `'sm' \| 'md' \| 'lg'`                  | `'md'`      | Navbar height          |
| `bordered`  | `boolean`                               | `false`     | Show bottom border     |

### GlassNavbar.Brand

Brand/logo section of the navbar.

| Prop        | Type          | Default | Description            |
| ----------- | ------------- | ------- | ---------------------- |
| `children`  | `ReactNode`   | -       | Brand content          |
| `href`      | `string`      | -       | Brand link URL         |
| `as`        | `ElementType` | `'div'` | Component element type |
| `className` | `string`      | -       | Additional CSS classes |

### GlassNavbar.Menu

Container for navigation menu items.

| Prop        | Type                         | Default        | Description            |
| ----------- | ---------------------------- | -------------- | ---------------------- |
| `children`  | `ReactNode`                  | -              | Menu items             |
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | Menu layout direction  |
| `spacing`   | `'sm' \| 'md' \| 'lg'`       | `'md'`         | Space between items    |
| `className` | `string`                     | -              | Additional CSS classes |

### GlassNavbar.Item

Individual navigation menu item.

| Prop        | Type          | Default | Description            |
| ----------- | ------------- | ------- | ---------------------- |
| `children`  | `ReactNode`   | -       | Item content           |
| `href`      | `string`      | -       | Link URL               |
| `as`        | `ElementType` | `'a'`   | Component element type |
| `active`    | `boolean`     | `false` | Active state           |
| `disabled`  | `boolean`     | `false` | Disabled state         |
| `className` | `string`      | -       | Additional CSS classes |
| `onClick`   | `() => void`  | -       | Click handler          |

### GlassNavbar.Toggle

Mobile menu toggle button.

| Prop         | Type         | Default         | Description            |
| ------------ | ------------ | --------------- | ---------------------- |
| `isOpen`     | `boolean`    | `false`         | Toggle state           |
| `onToggle`   | `() => void` | -               | Toggle handler         |
| `className`  | `string`     | -               | Additional CSS classes |
| `aria-label` | `string`     | `'Toggle menu'` | Accessibility label    |

### GlassNavbar.Collapse

Collapsible container for mobile navigation.

| Prop        | Type        | Default | Description            |
| ----------- | ----------- | ------- | ---------------------- |
| `children`  | `ReactNode` | -       | Collapsible content    |
| `isOpen`    | `boolean`   | `false` | Collapse state         |
| `className` | `string`    | -       | Additional CSS classes |

### GlassNavbar.Actions

Container for action buttons (login, search, etc.).

| Prop        | Type        | Default | Description            |
| ----------- | ----------- | ------- | ---------------------- |
| `children`  | `ReactNode` | -       | Action elements        |
| `className` | `string`    | -       | Additional CSS classes |

## Styling

### CSS Variables

```css
.glass-navbar {
  --navbar-height: 4rem;
  --navbar-padding-x: 1rem;
  --navbar-padding-y: 0.5rem;
  --navbar-backdrop-blur: 12px;
  --navbar-background: rgba(255, 255, 255, 0.8);
  --navbar-border-color: rgba(255, 255, 255, 0.2);
  --navbar-text-color: rgb(15, 23, 42);
  --navbar-link-hover: rgba(59, 130, 246, 0.1);
}

[data-theme="dark"] .glass-navbar {
  --navbar-background: rgba(15, 23, 42, 0.8);
  --navbar-border-color: rgba(255, 255, 255, 0.1);
  --navbar-text-color: rgb(248, 250, 252);
}
```

### Custom Styles

```tsx
// Custom variant
<GlassNavbar
  className="bg-gradient-to-r from-purple-500/10 to-pink-500/10"
  variant="transparent"
>
  {/* navbar content */}
</GlassNavbar>

// Custom spacing
<GlassNavbar.Menu
  spacing="lg"
  className="gap-8"
>
  {/* menu items */}
</GlassNavbar.Menu>
```

## Accessibility

The GlassNavbar component follows WAI-ARIA guidelines:

- **Keyboard Navigation**: Full keyboard support with Tab and arrow keys
- **Screen Readers**: Proper ARIA labels and roles
- **Focus Management**: Visible focus indicators and logical tab order
- **Mobile Accessibility**: Touch-friendly targets and gestures

### Keyboard Shortcuts

| Key               | Action                           |
| ----------------- | -------------------------------- |
| `Tab`             | Navigate between navbar elements |
| `Enter` / `Space` | Activate focused item            |
| `Escape`          | Close mobile menu if open        |
| `Arrow Keys`      | Navigate within dropdown menus   |

## Examples

### Dashboard Navigation

```tsx
import { GlassNavbar, GlassAvatar, GlassDropdown } from "liquidify";

function DashboardNavbar({ user }) {
  return (
    <GlassNavbar position="sticky" className="border-b">
      <GlassNavbar.Brand href="/dashboard">
        <span className="font-bold text-xl">Dashboard</span>
      </GlassNavbar.Brand>

      <GlassNavbar.Menu>
        <GlassNavbar.Item href="/dashboard" active>
          Overview
        </GlassNavbar.Item>
        <GlassNavbar.Item href="/analytics">Analytics</GlassNavbar.Item>
        <GlassNavbar.Item href="/projects">Projects</GlassNavbar.Item>
        <GlassNavbar.Item href="/team">Team</GlassNavbar.Item>
      </GlassNavbar.Menu>

      <GlassNavbar.Actions>
        <GlassButton variant="ghost" size="sm">
          <BellIcon className="h-5 w-5" />
        </GlassButton>

        <GlassDropdown>
          <GlassDropdown.Trigger>
            <GlassAvatar src={user.avatar} alt={user.name} size="sm" />
          </GlassDropdown.Trigger>

          <GlassDropdown.Content>
            <GlassDropdown.Item>Profile</GlassDropdown.Item>
            <GlassDropdown.Item>Settings</GlassDropdown.Item>
            <GlassDropdown.Separator />
            <GlassDropdown.Item>Sign Out</GlassDropdown.Item>
          </GlassDropdown.Content>
        </GlassDropdown>
      </GlassNavbar.Actions>
    </GlassNavbar>
  );
}
```

### E-commerce Navigation

```tsx
import { GlassNavbar, GlassInput, GlassBadge } from "liquidify";

function EcommerceNavbar({ cartItems }) {
  return (
    <GlassNavbar variant="solid" size="lg">
      <GlassNavbar.Brand href="/">
        <img src="/logo.svg" alt="Store" className="h-8 w-8" />
        <span className="font-bold text-xl">Store</span>
      </GlassNavbar.Brand>

      <div className="flex-1 max-w-xl mx-8">
        <GlassInput
          placeholder="Search products..."
          type="search"
          className="w-full"
          leftIcon={<SearchIcon className="h-5 w-5" />}
        />
      </div>

      <GlassNavbar.Menu>
        <GlassNavbar.Item href="/categories">Categories</GlassNavbar.Item>
        <GlassNavbar.Item href="/deals">Deals</GlassNavbar.Item>
        <GlassNavbar.Item href="/new">New</GlassNavbar.Item>
      </GlassNavbar.Menu>

      <GlassNavbar.Actions>
        <GlassButton variant="ghost" className="relative">
          <ShoppingCartIcon className="h-6 w-6" />
          {cartItems > 0 && (
            <GlassBadge
              className="absolute -top-2 -right-2"
              variant="solid"
              color="red"
            >
              {cartItems}
            </GlassBadge>
          )}
        </GlassButton>

        <GlassButton variant="outline">Sign In</GlassButton>
      </GlassNavbar.Actions>
    </GlassNavbar>
  );
}
```

## Best Practices

1. **Keep It Simple**: Limit primary navigation to 5-7 items
2. **Responsive Design**: Always test mobile navigation patterns
3. **Accessibility**: Include proper ARIA labels and keyboard navigation
4. **Performance**: Use lazy loading for dropdown content when possible
5. **Visual Hierarchy**: Use consistent sizing and spacing
6. **Brand Consistency**: Maintain brand colors and typography

## Related Components

- [Sidebar](/components/sidebar) - Vertical navigation component
- [Breadcrumbs](/components/breadcrumbs) - Secondary navigation
- [Tabs](/components/tabs) - Content section navigation
- [Dropdown](/components/dropdown) - Menu and selection component
