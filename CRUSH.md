# CRUSH.md - LiqUIdify Development Guide

## Build/Test Commands

```bash
bun run build:lib                    # Build component library
bun run type-check                   # TypeScript checking
bun run lint                         # Lint with qlty
bun run format                       # Format code
bun test                             # Run all tests
bun run test:coverage               # Tests with coverage
vitest run path/to/file.test.tsx     # Run single test
bun run storybook                    # Start Storybook dev server
```

## Code Style Guidelines

### TypeScript

- Strict mode enabled, explicit types required
- Components use `forwardRef<Element, Props>`
- Import types with `import type`
- No implicit `any` types

### Import Order

1. External libraries (React, Radix UI)
2. Internal utilities/hooks
3. Type imports

### Naming

- Components: PascalCase (`GlassButton`)
- Functions: camelCase (`useLiquidGlass`)
- Files: kebab-case (`glass-button.tsx`)
- Tests: `.test.tsx`, Stories: `.stories.tsx`

### Component Structure

```typescript
/** JSDoc description */
import { ... } from "...";

// Types first
interface Props extends React.HTMLAttributes<Element> { ... }

// Component with forwardRef
export const Component = forwardRef<Element, Props>((props, ref) => {
  // Implementation
});
Component.displayName = "Component";
```

### Testing

- Vitest + Testing Library
- Test accessibility, variants, edge cases
- Use `describe/it` blocks with clear descriptions

### Accessibility

- WCAG 2.1 AA compliance required
- ARIA attributes, keyboard navigation
- Screen reader support, focus management

### Performance

- Use `React.memo` for expensive components
- Tree-shaking friendly exports
- 60fps animations, minimize layout thrashing
