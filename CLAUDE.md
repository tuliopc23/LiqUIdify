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
</UnifiedGlassProvider>
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