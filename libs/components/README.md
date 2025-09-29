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

## Theming

### CSS Custom Properties

The theming system uses CSS custom properties that can be set on any element or the document root:

- `--ui-accent` - Primary accent color (default: "#007AFF")

```css
/* Set globally */
:root {
  --ui-accent: #FF3B30; /* Apple System Red */
}

/* Set on component */
.my-card {
  --ui-accent: oklch(62% 0.2 236); /* Blue in P3 color space */
}
```

### Data Attributes

Components automatically set data attributes for styling integration:

- `data-accent` - Current accent color value on document root
- `data-theme` - Current theme ("light" or "dark") on document root

```css
/* Style based on accent */
[data-accent="#007AFF"] .custom-element {
  border-color: var(--ui-accent);
}

/* Style based on theme */
[data-theme="dark"] .glass-panel {
  backdrop-filter: blur(20px) saturate(180%);
}
```

### ThemeProvider

Use the ThemeProvider for runtime theme and accent management:

```tsx
import { ThemeProvider, useTheme } from '@liquidify/components';

function App() {
  return (
    <ThemeProvider 
      defaultTheme="light"
      defaultAccent="#007AFF"
      accentPreset="blue"
      persistAccent={true}
      onAccentChange={(color, preset) => {
        console.log(`Accent changed to ${color} via preset: ${preset}`);
      }}
    >
      <MyApp />
    </ThemeProvider>
  );
}

function MyComponent() {
  const { 
    theme, 
    setTheme, 
    accent, 
    setAccent, 
    accentPreset,
    setAccentPreset 
  } = useTheme();
  
  return (
    <div>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle Theme
      </button>
      <button onClick={() => setAccentPreset("red")}>
        Set Red Accent
      </button>
      <button onClick={() => setAccent("#FF6B6B")}>
        Set Custom Accent
      </button>
      <p>Current: {accent} {accentPreset && `(${accentPreset})`}</p>
    </div>
  );
}
```

### Accent Presets

The library includes 11 built-in Apple system color presets:

```tsx
import { 
  ACCENT_PRESETS, 
  listAccentPresets, 
  getAccentPreset, 
  setAccentPreset 
} from '@liquidify/components';

// Available presets
const presets = listAccentPresets();
/*
{
  blue: "#007AFF",     // Apple System Blue (default)
  green: "#34C759",    // Apple System Green  
  indigo: "#5856D6",   // Apple System Indigo
  orange: "#FF9500",   // Apple System Orange
  pink: "#FF2D92",     // Apple System Pink
  purple: "#AF52DE",   // Apple System Purple
  red: "#FF3B30",      // Apple System Red
  teal: "#5AC8FA",     // Apple System Teal
  yellow: "#FFCC00",   // Apple System Yellow
  brown: "#A2845E",    // Apple System Brown
  gray: "#8E8E93"      // Apple System Gray
}
*/

// Get specific preset color
const redColor = getAccentPreset("red"); // "#FF3B30"

// Apply preset globally
setAccentPreset("green"); // Returns "#34C759" and updates DOM

// Apply with options
setAccentPreset("purple", { 
  persist: false,           // Don't save to localStorage
  storageKey: "my-accent"   // Custom storage key
});

// Custom presets
const customPresets = { 
  brand: "#1A73E8",
  success: "#0D7377" 
};

const allPresets = listAccentPresets(customPresets);
// Merges custom with built-in presets
```

### ThemeProvider Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `accentPreset` | `string` | `undefined` | Initial accent preset name |
| `accentPresets` | `Record<string, string>` | `undefined` | Custom preset colors |
| `persistAccent` | `boolean` | `true` | Save accent changes to localStorage |
| `onAccentChange` | `(color: string, preset: string \| null) => void` | `undefined` | Callback when accent changes |
| `defaultAccent` | `string` | `"#007AFF"` | Fallback accent color |
| `accentStorageKey` | `string` | `"ui-accent"` | localStorage key for persistence |

### Advanced Usage

```tsx
// Runtime accent switching with custom presets
function AccentPicker() {
  const { setAccentPreset, accentPreset } = useTheme();
  
  const customPresets = {
    brand: "#1A73E8",
    success: "#0D7377",
    warning: "#FF8C00"
  };
  
  const allPresets = listAccentPresets(customPresets);
  
  return (
    <div>
      {Object.entries(allPresets).map(([name, color]) => (
        <button
          key={name}
          onClick={() => setAccentPreset(name)}
          style={{ 
            backgroundColor: color,
            border: accentPreset === name ? '2px solid black' : 'none'
          }}
        >
          {name}
        </button>
      ))}
    </div>
  );
}

// SSR-safe usage
function ServerSideApp() {
  return (
    <ThemeProvider 
      accentPreset="blue"
      persistAccent={false}  // Disable persistence for SSR
    >
      <App />
    </ThemeProvider>
  );
}

// For Next.js or other SSR frameworks, pre-render accent on HTML element:
// In your _document.js or root layout:
function Document() {
  return (
    <html data-accent="blue" style={{ "--ui-accent": "#007AFF" }}>
      <body>
        <Main />
      </body>
    </html>
  );
}

// Or use the theme library directly for server-side rendering:
import { getAccentPreset } from 'liquidify-react';

function getServerSideProps() {
  const accentColor = getAccentPreset('blue'); // "#007AFF"
  return {
    props: {
      accentColor,
      // Pass to client for hydration matching
    }
  };
}

// Precedence order (highest to lowest):
// 1. accentPreset prop
// 2. localStorage (if persistAccent=true)  
// 3. CSS var --ui-accent
// 4. data-accent attribute
// 5. defaultAccent prop
```

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