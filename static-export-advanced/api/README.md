# LiquidUI Components API Documentation

Generated on 2025-07-14T03:01:50.455Z

## Overview

LiquidUI is a React component library featuring glass morphism design and physics-based interactions. This documentation covers all available components and their APIs.

## Components


### Glass Button

Interactive buttons with glass morphism effects and physics-based animations

**Category:** Form Controls  
**Complexity:** Basic  
**Bundle Size:** 2.4kB gzipped  

#### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `string` | `primary` | Button style variant |
| `size` | `string` | `md` | Button size |
| `disabled` | `boolean` | `false` | Disable button interaction |
| `loading` | `boolean` | `false` | Show loading state |
| `leftIcon` | `ReactNode` | `undefined` | Icon on the left side |
| `rightIcon` | `ReactNode` | `undefined` | Icon on the right side |

#### Usage

```typescript
import { GlassGlassGlassButton } from '@tuliocunha23/liquidui';

function App() {
  return (
    <GlassGlassGlassButton>
      Content
    </GlassGlassGlassButton>
  );
}
```

#### Accessibility

- **Features:** Keyboard navigation, Screen reader support, Focus management, ARIA attributes
- **Keyboard Shortcuts:** Enter: Activate button, Space: Activate button
- **ARIA Labels:** aria-label, aria-describedby, aria-pressed (for toggle buttons)

#### Performance

- **Bundle Size:** 2.4kB gzipped
- **Render Time:** < 1ms
- **Dependencies:** framer-motion, class-variance-authority

---

### Glass Input

Text input fields with liquid glass styling and validation

**Category:** Form Controls  
**Complexity:** Basic  
**Bundle Size:** 1.7kB gzipped  

#### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `string` | `text` | HTML input type |
| `placeholder` | `string` | `undefined` | Placeholder text |
| `value` | `string` | `undefined` | Controlled value |
| `disabled` | `boolean` | `false` | Disable input |
| `error` | `string` | `undefined` | Error message |
| `label` | `string` | `undefined` | Input label |

#### Usage

```typescript
import { GlassGlassGlassInput } from '@tuliocunha23/liquidui';

function App() {
  return (
    <GlassGlassGlassInput>
      Content
    </GlassGlassGlassInput>
  );
}
```

#### Accessibility

- **Features:** Label association, Error announcement, Keyboard navigation, Screen reader support
- **Keyboard Shortcuts:** Tab: Navigate to next input, Shift+Tab: Navigate to previous input
- **ARIA Labels:** aria-label, aria-describedby, aria-invalid, aria-required

#### Performance

- **Bundle Size:** 1.7kB gzipped
- **Render Time:** < 1ms
- **Dependencies:** framer-motion, class-variance-authority

---

### Glass Card

Container components with glass effects and flexible layouts

**Category:** Layout  
**Complexity:** Basic  
**Bundle Size:** 1.1kB gzipped  

#### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `string` | `default` | Card style variant |
| `padding` | `string` | `md` | Internal padding |
| `hover` | `boolean` | `false` | Enable hover effects |
| `clickable` | `boolean` | `false` | Make card clickable |

#### Usage

```typescript
import { GlassGlassGlassCard } from '@tuliocunha23/liquidui';

function App() {
  return (
    <GlassGlassGlassCard>
      Content
    </GlassGlassGlassCard>
  );
}
```

#### Accessibility

- **Features:** Semantic HTML, Keyboard navigation, Screen reader support, Focus management
- **Keyboard Shortcuts:** Enter: Activate clickable card, Space: Activate clickable card
- **ARIA Labels:** aria-label, role, tabindex (for clickable cards)

#### Performance

- **Bundle Size:** 1.1kB gzipped
- **Render Time:** < 1ms
- **Dependencies:** framer-motion, class-variance-authority

---


## Installation

```bash
npm install @tuliocunha23/liquidui
```

## Usage

```typescript
import { GlassButton, GlassCard } from '@tuliocunha23/liquidui';
import '@tuliocunha23/liquidui/css';

function App() {
  return (
    <GlassCard>
      <GlassButton>Click me</GlassButton>
    </GlassCard>
  );
}
```

## Links

- [GitHub Repository](https://github.com/tuliopc23/LiqUIdify)
- [Live Demo](https://liquidify-fw9pi7oj6-tulio-pinheiro-cunha-s-projects.vercel.app)
- [NPM Package](https://www.npmjs.com/package/@tuliocunha23/liquidui)

## License

MIT License - see LICENSE file for details.
