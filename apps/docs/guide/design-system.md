# Design System

LiquidUI's design system is built on glassmorphism principles, creating a modern, elegant interface with depth and transparency.

## Design Principles

### 1. Glassmorphism

Our core design philosophy centers on glass-like aesthetics:

- **Transparency**: Subtle see-through effects
- **Blur**: Background blur for depth perception
- **Borders**: Light borders for definition
- **Shadows**: Soft shadows for elevation

### 2. Consistency

- Unified visual language across all components
- Predictable interaction patterns
- Consistent spacing and sizing

### 3. Accessibility

- WCAG 2.1 AA compliance
- High contrast ratios
- Clear focus indicators
- Keyboard navigation

### 4. Performance

- Optimized animations
- GPU-accelerated effects
- Minimal repaints

## Color System

### Base Colors

```css
:root {
  /* Primary Colors */
  --glass-primary: rgba(99, 102, 241, 0.2);
  --glass-primary-hover: rgba(99, 102, 241, 0.3);
  --glass-primary-active: rgba(99, 102, 241, 0.4);

  /* Secondary Colors */
  --glass-secondary: rgba(168, 85, 247, 0.2);
  --glass-secondary-hover: rgba(168, 85, 247, 0.3);
  --glass-secondary-active: rgba(168, 85, 247, 0.4);

  /* Semantic Colors */
  --glass-success: rgba(34, 197, 94, 0.2);
  --glass-warning: rgba(251, 146, 60, 0.2);
  --glass-error: rgba(239, 68, 68, 0.2);
  --glass-info: rgba(59, 130, 246, 0.2);
}
```

### Glass Effects

```css
:root {
  /* Glass Properties */
  --glass-bg: rgba(255, 255, 255, 0.1);
  --glass-border: rgba(255, 255, 255, 0.2);
  --glass-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  --glass-blur: 12px;

  /* Dark Mode */
  --glass-bg-dark: rgba(0, 0, 0, 0.2);
  --glass-border-dark: rgba(255, 255, 255, 0.1);
}
```

## Typography

### Font Stack

```css
:root {
  --font-sans:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
    Arial, sans-serif;
  --font-mono:
    "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}
```

### Type Scale

| Level   | Size     | Line Height | Weight | Usage            |
| ------- | -------- | ----------- | ------ | ---------------- |
| Display | 3.5rem   | 1.1         | 700    | Hero headings    |
| H1      | 2.5rem   | 1.2         | 700    | Page titles      |
| H2      | 2rem     | 1.3         | 600    | Section headings |
| H3      | 1.5rem   | 1.4         | 600    | Subsections      |
| H4      | 1.25rem  | 1.5         | 500    | Card titles      |
| Body    | 1rem     | 1.6         | 400    | Default text     |
| Small   | 0.875rem | 1.5         | 400    | Helper text      |
| Tiny    | 0.75rem  | 1.4         | 400    | Labels           |

## Spacing System

Using an 8-point grid system:

```css
:root {
  --space-1: 0.25rem; /* 4px */
  --space-2: 0.5rem; /* 8px */
  --space-3: 0.75rem; /* 12px */
  --space-4: 1rem; /* 16px */
  --space-5: 1.5rem; /* 24px */
  --space-6: 2rem; /* 32px */
  --space-8: 3rem; /* 48px */
  --space-10: 4rem; /* 64px */
}
```

## Component Sizing

### Button Sizes

| Size | Height | Padding   | Font Size |
| ---- | ------ | --------- | --------- |
| xs   | 24px   | 8px 12px  | 12px      |
| sm   | 32px   | 8px 16px  | 14px      |
| md   | 40px   | 12px 24px | 16px      |
| lg   | 48px   | 16px 32px | 18px      |
| xl   | 56px   | 20px 40px | 20px      |

### Input Sizes

| Size | Height | Padding   | Font Size |
| ---- | ------ | --------- | --------- |
| sm   | 32px   | 8px 12px  | 14px      |
| md   | 40px   | 12px 16px | 16px      |
| lg   | 48px   | 16px 20px | 18px      |

## Elevation System

```css
:root {
  /* Elevation Levels */
  --elevation-0: none;
  --elevation-1: 0 2px 4px rgba(0, 0, 0, 0.1);
  --elevation-2: 0 4px 8px rgba(0, 0, 0, 0.12);
  --elevation-3: 0 8px 16px rgba(0, 0, 0, 0.14);
  --elevation-4: 0 16px 32px rgba(0, 0, 0, 0.16);

  /* Glass Elevation */
  --glass-elevation-1: 0 4px 16px rgba(31, 38, 135, 0.2);
  --glass-elevation-2: 0 8px 32px rgba(31, 38, 135, 0.37);
  --glass-elevation-3: 0 16px 48px rgba(31, 38, 135, 0.5);
}
```

## Animation System

### Timing Functions

```css
:root {
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

### Durations

```css
:root {
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
  --duration-slower: 700ms;
}
```

## Breakpoints

```css
/* Mobile First */
--breakpoint-sm: 640px; /* Small devices */
--breakpoint-md: 768px; /* Tablets */
--breakpoint-lg: 1024px; /* Desktops */
--breakpoint-xl: 1280px; /* Large screens */
--breakpoint-2xl: 1536px; /* Extra large */
```

## Glass Component Recipe

### Basic Glass Component

```css
.glass-component {
  /* Background */
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));

  /* Border */
  border: 1px solid var(--glass-border);
  border-radius: 12px;

  /* Shadow */
  box-shadow: var(--glass-shadow);

  /* Transition */
  transition: all var(--duration-normal) var(--ease-in-out);
}

/* Hover State */
.glass-component:hover {
  background: var(--glass-bg-hover);
  transform: translateY(-2px);
  box-shadow: var(--glass-elevation-2);
}
```

### Interactive Glass

```css
.glass-interactive {
  /* Base styles */
  @apply glass-component;

  /* Interactive states */
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.glass-interactive::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
    circle at var(--mouse-x) var(--mouse-y),
    rgba(255, 255, 255, 0.1) 0%,
    transparent 50%
  );
  opacity: 0;
  transition: opacity var(--duration-fast);
}

.glass-interactive:hover::before {
  opacity: 1;
}
```

## Best Practices

### 1. Contrast

- Ensure sufficient contrast between glass elements and backgrounds
- Test with different background images/colors
- Provide fallbacks for older browsers

### 2. Performance

- Limit the number of blur effects on screen
- Use `will-change` sparingly
- Optimize animations with `transform` and `opacity`

### 3. Accessibility

- Always provide focus indicators
- Ensure interactive elements are keyboard accessible
- Test with screen readers
- Maintain WCAG compliance

### 4. Responsive Design

- Test glass effects on different screen sizes
- Adjust blur intensity for mobile devices
- Consider reducing effects on low-end devices

## Theme Customization

### Creating Custom Themes

```tsx
const customTheme = {
  colors: {
    primary: "rgba(139, 92, 246, 0.2)",
    secondary: "rgba(236, 72, 153, 0.2)",
  },
  glass: {
    blur: "16px",
    border: "rgba(255, 255, 255, 0.15)",
    bg: "rgba(255, 255, 255, 0.08)",
  },
  spacing: {
    unit: 4, // Base unit in px
  },
};

<ThemeProvider theme={customTheme}>
  <App />
</ThemeProvider>;
```

### CSS Variables Override

```css
/* Custom theme override */
[data-theme="custom"] {
  --glass-primary: rgba(139, 92, 246, 0.2);
  --glass-blur: 16px;
  --glass-border: rgba(255, 255, 255, 0.15);
  --glass-bg: rgba(255, 255, 255, 0.08);
}
```
