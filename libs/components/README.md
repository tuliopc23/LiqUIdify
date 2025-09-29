# LiqUIdify Component Library

## Apple Design Language for Web

LiqUIdify is a production-ready React component library that brings Apple's post-WWDC 2025 design language to web applications. Built with glassmorphism UI components featuring liquid glass aesthetics, blur effects, and Apple HIG-compliant design patterns.

## Features

- 48+ accessible components built on Ark UI primitives
- Apple HIG-compliant with 26px premium radii and SF Pro typography
- P3 adaptive colors with liquid glass glassmorphism
- Physics-based spring animations (350 stiffness, 22 damping)
- TypeScript-first with comprehensive type definitions
- Tree-shakeable ESM/CJS dual format
- SSR-safe with proper hydration
- WCAG 2.1 AA compliant

## Installation

```bash
# npm
npm install @liquidify/components

# yarn  
yarn add @liquidify/components

# bun
bun add @liquidify/components
```

## Quick Start

```tsx
import { Button, Card } from '@liquidify/components';
import '@liquidify/components/styles';

function App() {
  return (
    <Card variant="glass" padded>
      <h1>Welcome to LiqUIdify</h1>
      <Button variant="primary" tone="glass">
        Get Started
      </Button>
    </Card>
  );
}
```

## Tree-Shaking Support

Import only the components you need for optimal bundle size:

```tsx
// Import individual components
import { Button } from '@liquidify/components/button';
import { Card } from '@liquidify/components/card';
import '@liquidify/components/styles';
```

## Component List

### Core Components
- Button - Enhanced with magnetic hover and spring physics
- Card - Glass morphology with tilt effects
- Badge - Status indicators with glass effects
- IconButton - Icon-only buttons with touch feedback

### Form Components  
- Checkbox - Spring-enhanced selection control
- Switch - Toggle with fluid physics
- Slider - Range input with animated thumb
- RadioGroup - Single selection control
- RatingGroup - Star rating input
- Select - Dropdown selection
- Combobox - Searchable dropdown
- DatePicker - Calendar date selector
- ColorPicker - Color selection tool
- NumberInput - Numeric input with steppers
- PinInput - OTP/PIN entry
- TagsInput - Multi-tag input

### Input Components
- Field - Form field wrapper
- Fieldset - Field grouping
- Editable - Inline editing
- FileUpload - File selection
- PasswordInput - Secure text input

### Layout Components
- Accordion - Collapsible panels
- Collapsible - Expandable content
- Splitter - Resizable panels
- Tabs - Tabbed interface
- ScrollArea - Custom scrollbars
- FloatingPanel - Draggable panels

### Display Components
- Avatar - User images
- Carousel - Image slider  
- Progress - Linear progress bar
- ProgressCircular - Circular progress
- QrCode - QR code generator
- Tooltip - Hover hints
- HoverCard - Rich hover content

### Overlay Components
- Dialog - Modal dialog
- Popover - Floating content
- Toast - Notifications
- Tour - Guided tours
- Menu - Context menus

### Interactive Components
- AngleSlider - Radial input
- Clipboard - Copy to clipboard
- SignaturePad - Signature drawing
- Timer - Countdown timer
- Toggle - Toggle button
- ToggleGroup - Multi-toggle
- TreeView - Tree hierarchy

### Navigation Components
- Pagination - Page navigation
- SegmentGroup - Segmented control  
- Steps - Multi-step process
- Listbox - List selection

## Design System

### Typography
- SF Pro Display for headings
- SF Pro Text for body content
- SF Mono for code

### Colors
- P3 adaptive color space
- Dynamic glass blur effects
- Semantic color tokens

### Motion
- Apple-like spring physics
- Respects prefers-reduced-motion
- Smooth 60fps animations

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+
- Chrome Android 90+

## Accessibility

All components are WCAG 2.1 AA compliant with:
- Full keyboard navigation
- Screen reader support
- Focus management
- ARIA attributes

## Performance

- Bundle size: ~21KB (main) + 431KB CSS
- Tree-shakeable imports
- Code splitting support
- SSR compatible

## License

MIT © LiqUIdify Team

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development setup and guidelines.

## Credits

Built with:
- [Ark UI](https://ark-ui.com) - Headless UI primitives
- [Panda CSS](https://panda-css.com) - CSS-in-JS framework
- [Framer Motion](https://www.framer.com/motion) - Animation library