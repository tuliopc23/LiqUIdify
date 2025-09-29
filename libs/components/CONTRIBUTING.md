# Contributing to LiqUIdify

## Development Setup

### Prerequisites
- Bun 1.0+ (or Node 18+/npm 9+)
- Git

### Getting Started

```bash
# Clone the repository
git clone https://github.com/your-org/liquidify.git
cd liquidify

# Install dependencies
bun install

# Start development server
cd demo
bun run dev
```

### Project Structure

```
liquidify/
├── libs/
│   └── components/           # Component library source
│       ├── src/
│       │   ├── components/   # React components
│       │   ├── hooks/        # Custom React hooks
│       │   └── styles/       # CSS and design tokens
│       └── styled-system/    # Panda CSS generated files
└── demo/                     # Development demo app
```

## Development Guidelines

### Component Development

1. **Create Component Structure**
```tsx
// src/components/[name]/[Name].tsx
import { forwardRef } from "react";
import { motion } from "framer-motion";
import { useInteractiveGlass } from "../../hooks/useInteractiveGlass";

export interface [Name]Props {
  // Props definition
}

export const [Name] = forwardRef<HTMLElement, [Name]Props>(
  ({ ...props }, ref) => {
    // Component logic
  }
);

[Name].displayName = "[Name]";
```

2. **Export Component**
```tsx
// src/components/[name]/index.ts
export * from "./[Name]";
```

3. **Add to Main Export**
```tsx
// src/index.ts
export * from "./components/[name]";
```

### Adding Glass Effects

Components should use the glass design tokens:

```css
.my-component {
  background: var(--colors-glass-bg);
  border: 1px solid var(--colors-glass-border);
  backdrop-filter: blur(var(--blurs-glass-md));
  box-shadow: var(--shadows-glass-base);
}
```

### Adding Spring Physics

Use the `useInteractiveGlass` hook for consistent interactions:

```tsx
const spring = useInteractiveGlass({ 
  intensity: "subtle" // or "medium", "strong"
});

return (
  <motion.div
    style={{ scale: spring.scale, y: spring.y }}
    {...spring.interactions}
  >
    {/* Component content */}
  </motion.div>
);
```

## Code Style

### TypeScript
- Use explicit types for all props
- Export interfaces for component props
- Add JSDoc comments for public APIs

### CSS
- Use Panda CSS tokens and utilities
- Follow BEM naming for custom classes
- Keep specificity low

### Accessibility
- Include proper ARIA attributes
- Support keyboard navigation
- Test with screen readers
- Maintain focus indicators

## Testing

```bash
# Run unit tests
bun test

# Run accessibility tests  
bun run test:a11y

# Type checking
bun run type-check
```

## Pull Request Process

1. Fork the repository
2. Create feature branch (`git checkout -b feat/my-feature`)
3. Make your changes
4. Add/update tests
5. Update documentation
6. Commit with conventional commits
7. Push to your fork
8. Open pull request

### Commit Convention

```
feat: Add new component
fix: Resolve issue with component
docs: Update README
style: Format code
refactor: Restructure component
test: Add test cases
chore: Update dependencies
```

## Release Process

We use semantic versioning:
- MAJOR: Breaking changes
- MINOR: New features
- PATCH: Bug fixes

Releases are automated via GitHub Actions when merging to main.

## Questions?

Open an issue or reach out in discussions!