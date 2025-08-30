# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Development Commands

### Installation

```bash
# Install dependencies (preferred)
bun install

# Alternative package managers
npm install
```

### Development

```bash
# Start development server (component development)
bun run dev

# Start Storybook (component playground)
bun run storybook

# Start documentation site
bun run docs:dev
```

### Building

```bash
# Build everything
bun run build

# Build just the component library
bun run build:lib

# Build Storybook site
bun run build:storybook

# Build documentation site
bun run docs:build
```

### Testing

```bash
# Run all tests
bun test

# Run specific test types
bun run test:a11y        # Accessibility tests
bun run test:integration # Integration tests
bun run test:e2e         # E2E tests
bun run test:performance # Performance tests
bun run test:build       # Build validation tests

# Run tests with coverage
bun run test:coverage
```

### Linting and Type Checking

```bash
# Check types
bun run type-check

# Run linter
bun run lint

# Format code
bun run format

# Format and fix
bun run format:fix
```

### Analysis

```bash
# Analyze bundle size
bun run build:analyze

# Check bundle size budget
bun run bundle:budget:check

# Audit contrast ratios
bun run audit:contrast
```

## Architecture Overview

LiqUIdify is a React component library with a focus on glassmorphism design and accessibility. The repository is structured as a Bun workspace monorepo:

### Repository Structure

```
LiqUIdify/
├── apps/                     # Applications
│   ├── docs/                # Documentation (Mintlify)
│   └── storybook/           # Component playground
├── libs/                    # Core libraries
│   └── components/          # Main component library
│       ├── src/
│       │   ├── components/  # Component implementations
│       │   ├── hooks/       # Custom React hooks
│       │   ├── core/        # Core utilities
│       │   ├── styles/      # Global styles
│       │   └── index.ts     # Main export
├── scripts/                 # Build and utility scripts
└── docs/                    # Documentation guides
```

### Component Architecture

Each component follows a consistent structure:

```
glass-component/
├── index.ts                 # Public exports
├── glass-component.tsx      # Main component
├── glass-component.test.tsx # Unit tests
├── glass-component.stories.tsx # Storybook stories
```

Components use a combination of:

- TypeScript for type safety
- React hooks for state management
- CSS variables for theming
- ARIA attributes for accessibility

### Build System

- Vite with Rolldown for bundling
- LightningCSS for CSS optimization
- TypeScript for type checking
- Multiple entry points for tree-shaking

### Testing Strategy

- Unit tests with Vitest and Testing Library
- Accessibility tests with axe-core
- Integration tests for component interactions
- E2E tests with Playwright
- Performance and bundle size tests

### Documentation System

- Mintlify for the documentation site
- MDX files for content with rich components
- Configuration in docs.json (navigation, theming)
- Interactive code snippets with live previews
- Component documentation in /apps/docs/components/

## Important Patterns and Practices

1. **TypeScript-First Development**:
   - Always use proper type definitions
   - Components use forwardRef with explicit types
   - Utilize TypeScript utility types

2. **Accessibility Requirements**:
   - WCAG 2.1 AA compliance required
   - Keyboard navigation support
   - ARIA attributes and roles
   - Focus management
   - Screen reader announcements

3. **Component Patterns**:
   - Compound components for complex UIs
   - Provider pattern for context
   - Controlled vs. uncontrolled components
   - Forwarding refs for DOM access

4. **CSS Approach**:
   - CSS variables for theming
   - Glass effects via backdrop-filter
   - Responsive design with media queries
   - Proper contrast for readability

5. **Performance Considerations**:
   - Memoization for expensive renders
   - Code splitting for large components
   - Bundle size optimization
   - Animation performance (60fps target)

## Working with Glass Effects

The library uses a LiquidGlass system for creating glass effects:

```jsx
import { GlassButton, LiquidGlassDefs, UnifiedGlassProvider } from "liquidify";

// Always include LiquidGlassDefs once in your app
<UnifiedGlassProvider>
  <LiquidGlassDefs />
  <GlassButton variant="primary" className="liquid-glass">
    Click Me
  </GlassButton>
</UnifiedGlassProvider>;
```

When implementing glass effects:

- Use the `liquid-glass` class for decorative surfaces
- Use `liquid-glass-readable` for text content to ensure contrast
- Test on various backgrounds
- Consider prefers-reduced-motion support

## Documentation Development

The documentation site uses Mintlify and is located in the `/apps/docs` directory:

### File Structure

```
apps/docs/
├── components/         # Component documentation (.mdx)
├── guides/             # Usage guides and recipes
├── core-concepts/      # Core architectural concepts
├── development/        # Development documentation
├── getting-started/    # Onboarding documentation
├── docs.json           # Configuration for navigation and theme
└── styles/             # Custom styles for the docs site
```

### Working with MDX Files

- Documentation is written in MDX (Markdown + JSX)
- Each component has its own .mdx file in the components/ directory
- Code examples can be interactive using Mintlify snippets
- Use the built-in components for callouts, tabs, and other UI elements

### Docs Commands

```bash
# Build CSS for documentation
bun run docs:css

# Start documentation dev server
bun run docs:dev

# Check for broken links
bun run docs:links

# Build documentation site
bun run docs:build
```

## Contribution Guidelines

When contributing new code:

1. Follow TypeScript practices with proper types
2. Ensure WCAG 2.1 AA compliance
3. Include unit tests and Storybook stories
4. Test performance and bundle size impact
5. Follow existing patterns and conventions
6. Update documentation for new components or features
7. Add Storybook stories for visual testing

## Apple-Inspired Documentation Style Guide

To match the Apple Developer Documentation style in our Mintlify docs:

### Typography

- Use SF Pro font family (or close alternative like Inter)
- Large, bold headings with generous spacing
- Clean, readable body text with increased line height (1.5-1.6)
- Hierarchical heading structure (H1, H2, H3) with consistent sizing

### Color Scheme

- Light theme: Clean white background with subtle gray accents (#f5f5f7)
- Dark theme: Rich dark background (#1d1d1f) with soft contrasts
- Accent colors: Use Apple's blue (#0066cc), purple (#5e5ce6) for links/buttons
- Support high contrast mode for accessibility

### Component Design

- Cards with subtle shadows and rounded corners (border-radius: 12px)
- Glass effect with backdrop-filter: blur(20px)
- Minimal borders, using light gray separators (#e5e5e5)
- Clean spacing system (8pt grid) with consistent margins

### Navigation

- Sidebar navigation with collapsible groups
- Hierarchical organization mirroring Apple's docs
- Filter/search functionality with instant results

### Content Layout

- Use 3-column card grids for feature showcases
- Implement "Steps" component for sequential instructions
- Create focused content blocks with plenty of whitespace
- Include visual dividers between major sections

### Code Examples

- Syntax highlighting with Apple-like color scheme
- Copy code button functionality
- Tabbed code examples for different use cases
- Interactive code snippets where possible

### Interactive Elements

- Subtle hover effects with scale/opacity changes
- Smooth transitions for interactive elements (0.2s ease)
- Consistent button styling with rounded corners
- Support for light/dark mode toggle

### Custom Components

- Implement CardGroup and Card components with Apple styling
- Create Apple-styled Accordion components
- Design custom callouts/notes with Apple's information hierarchy
- Add Apple-style tooltips and popovers

# Apple Liquid Glass UI Implementation Documentation

## Overview

LiqUIdify is implementing a comprehensive component library based on Apple's Human Interface Guidelines (HIG) Liquid Glass design language. This implementation aims to bring authentic Apple aesthetics to the web, leveraging the new design system that creates a unified experience across Apple platforms.

## Apple Liquid Glass Design Language

### Core Principles

**Liquid Glass** is Apple's dynamic material system that:
- Creates a distinct functional layer for controls and navigation elements
- Floats above the content layer, establishing clear visual hierarchy
- Allows content to scroll and peek through from beneath elements
- Maintains legibility while providing dynamism and depth
- Unifies design language across all Apple platforms

### Key Characteristics

1. **Visual Hierarchy**: Liquid Glass forms a functional layer that separates interactive elements from content
2. **Dynamic Transparency**: Content shows through with blur and vibrancy effects
3. **Depth and Layering**: Creates sense of floating elements above background
4. **Interactive Feedback**: Responds to user interaction with subtle animations
5. **Contextual Adaptation**: Adapts to background content and lighting conditions

### Usage Guidelines (from Apple HIG)

- **DO**: Use for controls and navigation elements (tab bars, sidebars, toolbars)
- **DON'T**: Use in the content layer (can cause visual hierarchy confusion)
- **EXCEPTION**: Transient interactive elements like sliders and toggles in content layer
- **SPARINGLY**: Limit to most important functional elements to avoid distraction

## Current Implementation Analysis

### JavaScript Implementation Pattern

**File**: `/Users/tuliopinheirocunha/Liqduidglasssnippet.js`

```javascript
window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('[liquidglass="true"]').forEach((el) => {
    el.classList.add("liquid-glass");
  });
});
```

**Pattern**: Simple attribute-based activation system
- Uses declarative HTML attribute `liquidglass="true"`
- Automatically applies CSS class on DOM load
- Minimal JavaScript footprint

### CSS Foundation

**File**: `/Users/tuliopinheirocunha/Liquidglasssnippet.css`

```css
:root {
  --lg-bg-color: rgba(255, 255, 255, 0.25);
  --lg-highlight: rgba(255, 255, 255, 0.75);
  --lg-text: #ffffff;
  --lg-red: #fb4268;
  --lg-grey: #444739;
}

.liquid-glass {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--lg-bg-color);
  backdrop-filter: blur(30px) saturate(180%);
  -webkit-backdrop-filter: blur(30px) saturate(180%);
  border-radius: 2rem;
  overflow: hidden;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25), 0 0 30px rgba(0, 0, 0, 0.1);
  color: var(--lg-text);
  padding: 1.5rem 2rem;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

**Key Features**:
- Strong blur effect (30px) with saturation boost (180%)
- Semi-transparent background (25% opacity)
- Multiple shadow layers for depth
- Subtle border with transparency
- CSS custom properties for theming

### React Implementation (Liquid-glass-imp folder)

#### Core Component Architecture

**LiquidGlass Component** (`/Liquid-glass-imp/app/components/liquid-glass.tsx`):

**Features**:
- **Variant System**: button, card, panel, floating
- **Intensity Levels**: subtle, medium, strong 
- **Interactive Effects**: ripple, hover flow, drag stretch
- **Touch Support**: Full mobile touch event handling
- **Physics Simulation**: Wobble, jiggle, elastic animations
- **Performance**: useCallback hooks, ref-based event handling

**Key Interaction States**:
- `isJiggling`: Post-interaction wobble animation
- `isDragging`: Active drag state with transform
- `isHovering`: Cursor-following glow effect
- `isPressed`: Button press feedback
- `ripples`: Click/touch ripple effects

#### Button Implementation

**LiquidButton Component** (`/Liquid-glass-imp/app/components/liquid-button.tsx`):

**Variant System**:
- **Primary**: Blue gradient with purple accent
- **Secondary**: White/gray with subtle transparency
- **Ghost**: Transparent with minimal background
- **Danger**: Red gradient with pink accent

**Size System**: sm, md, lg, xl with corresponding padding/text scaling

**Interactive Features**:
- Loading states with spinner
- Icon positioning (left/right)
- Disabled state handling
- Ripple effect toggle

#### CSS System Integration

**Global Styles** (`/Liquid-glass-imp/app/globals.css`):

```css
:root {
  --liquid-glass-bg: rgba(255, 255, 255, 0.1);
  --liquid-glass-border: rgba(255, 255, 255, 0.2);
  --liquid-glass-shadow: rgba(0, 0, 0, 0.1);
  --liquid-ripple-color: rgba(255, 255, 255, 0.3);
  --liquid-flow-duration: 0.8s;
  --liquid-bounce-duration: 0.6s;
}

body {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif;
  touch-action: none; /* Prevent mobile scroll interference */
}
```

## Technical Implementation Strategy

### 1. Component Architecture

```
LiquidGlass (Base Component)
├── LiquidButton
├── LiquidCard  
├── LiquidPanel
├── LiquidNavbar
├── LiquidSidebar
├── LiquidModal
└── LiquidTooltip
```

### 2. Material System

Following Apple's material hierarchy:
- **Liquid Glass**: Primary interactive layer
- **Standard Materials**: Content layer (thin, regular, thick, ultraThin, ultraThick)
- **Vibrancy Effects**: Label, fill, separator variations

### 3. CSS Variable System

```css
:root {
  /* Liquid Glass Core */
  --lg-blur-radius: 30px;
  --lg-saturation: 180%;
  --lg-opacity-base: 0.1;
  --lg-opacity-hover: 0.15;
  --lg-opacity-active: 0.2;
  
  /* Apple HIG Colors */
  --ios-blue: 0 122 255;
  --material-regular: rgba(255, 255, 255, 0.8);
  --material-thick: rgba(255, 255, 255, 0.9);
  --material-thin: rgba(255, 255, 255, 0.6);
  --material-ultra-thin: rgba(255, 255, 255, 0.4);
  
  /* Vibrancy Levels */
  --label-primary: rgba(0, 0, 0, 0.85);
  --label-secondary: rgba(60, 60, 67, 0.6);
  --label-tertiary: rgba(60, 60, 67, 0.3);
  --label-quaternary: rgba(60, 60, 67, 0.18);
}
```

### 4. Animation System

**Physics-Based Animations**:
- Spring animations for natural feel
- Elastic bounce for interactive feedback
- Liquid flow effects for smooth transitions
- Parallax effects for depth

**Performance Optimizations**:
- CSS transforms over layout changes
- `will-change` property for animated elements
- `useCallback` for event handlers
- Debounced resize/scroll handlers

## Implementation Roadmap

### Phase 1: Foundation (Current)
- ✅ Core LiquidGlass component
- ✅ Basic button implementation  
- ✅ CSS variable system
- ✅ shadcn/ui integration

### Phase 2: Core Components
- [ ] LiquidCard with variants
- [ ] LiquidInput with focus states
- [ ] LiquidSelect with dropdown
- [ ] LiquidModal with backdrop
- [ ] LiquidTooltip with positioning

### Phase 3: Navigation Components
- [ ] LiquidNavbar with sections
- [ ] LiquidSidebar with collapsing
- [ ] LiquidTabs with smooth transitions
- [ ] LiquidBreadcrumb with separators

### Phase 4: Advanced Features
- [ ] Theme system (light/dark/auto)
- [ ] Accessibility compliance (WCAG 2.1 AA)
- [ ] RTL language support
- [ ] Reduced motion preferences
- [ ] High contrast mode support

### Phase 5: Developer Experience
- [ ] Storybook integration
- [ ] TypeScript definitions
- [ ] Unit test coverage
- [ ] Performance benchmarks
- [ ] Documentation site

## Design Token System

### Spacing Scale (Apple HIG Compliant)
```css
--spacing-xs: 4px;   /* 0.25rem */
--spacing-sm: 8px;   /* 0.5rem */  
--spacing-md: 16px;  /* 1rem */
--spacing-lg: 24px;  /* 1.5rem */
--spacing-xl: 32px;  /* 2rem */
--spacing-2xl: 48px; /* 3rem */
```

### Border Radius Scale
```css
--radius-sm: 8px;    /* Small elements */
--radius-md: 12px;   /* Default */
--radius-lg: 16px;   /* Cards */
--radius-xl: 24px;   /* Large panels */
--radius-2xl: 32px;  /* Full rounded */
```

### Shadow System
```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);
--shadow-glass: 0 6px 16px rgba(0, 0, 0, 0.25), 0 0 30px rgba(0, 0, 0, 0.1);
```

## Browser Support & Fallbacks

### Backdrop Filter Support
- Modern browsers: Full support
- Safari 9+: `-webkit-backdrop-filter`
- Fallback: Solid background with reduced opacity

### Touch Events
- iOS Safari: Full support
- Android Chrome: Full support
- Desktop: Mouse event fallback

### CSS Custom Properties
- All modern browsers: Full support
- IE11: Fallback values provided

## Performance Considerations

1. **GPU Acceleration**: Use `transform3d()` for hardware acceleration
2. **Blur Optimization**: Limit blur radius to prevent performance issues
3. **Event Delegation**: Use event delegation for better performance
4. **Memory Management**: Clean up event listeners and timers
5. **Bundle Size**: Tree-shaking friendly exports

## Accessibility Features

1. **Focus Management**: Visible focus indicators
2. **Screen Readers**: Proper ARIA labels and roles
3. **Keyboard Navigation**: Full keyboard support
4. **Color Contrast**: WCAG AA compliant contrast ratios
5. **Motion Sensitivity**: Respect `prefers-reduced-motion`

## Testing Strategy

1. **Unit Tests**: Component behavior and props
2. **Integration Tests**: Component interactions
3. **Visual Regression**: Screenshot comparison
4. **Accessibility Tests**: axe-core integration
5. **Performance Tests**: Bundle size and runtime performance

This documentation serves as the foundation for implementing a comprehensive Apple Liquid Glass UI component library that brings authentic Apple design language to web applications.
