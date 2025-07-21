# LiqUIdify Coding Standards & Best Practices

## Table of Contents
1. [Overview](#overview)
2. [TypeScript Standards](#typescript-standards)
3. [React Best Practices](#react-best-practices)
4. [Accessibility Requirements](#accessibility-requirements)
5. [Performance Guidelines](#performance-guidelines)
6. [Code Organization](#code-organization)
7. [Testing Requirements](#testing-requirements)
8. [Linting & Formatting](#linting--formatting)
9. [Git Workflow](#git-workflow)

---

## Overview

This document outlines the coding standards and best practices for the LiqUIdify component library. These guidelines ensure consistent, maintainable, and production-ready code that meets S-tier quality standards.

### Core Principles
- **Type Safety First**: Full TypeScript coverage with no `any` types
- **Accessibility by Default**: WCAG 2.1 AA compliance for all components
- **Performance Optimized**: Bundle size limits and runtime performance monitoring
- **Developer Experience**: Clear APIs, comprehensive documentation, and excellent tooling

---

## TypeScript Standards

### Type Definitions
```typescript
// ✅ Good: Explicit types with proper constraints
interface GlassButtonProps<T extends ElementType = 'button'> {
  as?: T;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children: ReactNode;
}

// ❌ Bad: Using any or loose types
interface ButtonProps {
  as?: any;
  variant?: string;
  size?: string;
  disabled?: boolean;
  children?: any;
}
```

### Generic Components
```typescript
// ✅ Good: Proper generic syntax with constraints
export const GlassComponent = <T extends ElementType = 'div'>(
  props: GlassComponentProps<T>
) => {
  // Implementation
};

// ❌ Bad: Missing proper generic constraints
export const Component = (props: any) => {
  // Implementation
};
```

### Event Handlers
```typescript
// ✅ Good: Properly typed event handlers
const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
  event.preventDefault();
  // Handle click
};

// ❌ Bad: Untyped or any-typed handlers
const handleClick = (e: any) => {
  // Handle click
};
```

---

## React Best Practices

### Component Structure
```typescript
// ✅ Good: Clean component with proper types and error boundaries
export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <ErrorBoundary fallback={<GlassCardFallback />}>
        <div
          ref={ref}
          className={cn(glassCardVariants(), className)}
          {...props}
        >
          {children}
        </div>
      </ErrorBoundary>
    );
  }
);

GlassCard.displayName = 'GlassCard';
```

### Hooks Usage
```typescript
// ✅ Good: Hooks called unconditionally with proper dependencies
const useGlassEffect = (enabled: boolean) => {
  const [state, setState] = useState(initialState);
  
  useEffect(() => {
    if (!enabled) return;
    
    const cleanup = setupEffect();
    return cleanup;
  }, [enabled]); // All dependencies listed
  
  return state;
};

// ❌ Bad: Conditional hooks or missing dependencies
const useBadHook = (condition: boolean) => {
  if (condition) {
    useState(); // ERROR: Conditional hook
  }
  
  useEffect(() => {
    // Missing dependencies
  }, []); // WARNING: Missing deps
};
```

### Performance Optimization
```typescript
// ✅ Good: Memoized expensive computations
const GlassAnimation = memo(({ data }: Props) => {
  const processedData = useMemo(
    () => expensiveProcessing(data),
    [data]
  );
  
  const handleInteraction = useCallback(
    (event: MouseEvent) => {
      // Handle interaction
    },
    [/* dependencies */]
  );
  
  return <AnimatedComponent data={processedData} onInteract={handleInteraction} />;
});
```

---

## Accessibility Requirements

### ARIA Labels
```typescript
// ✅ Good: Comprehensive accessibility
<button
  aria-label="Close dialog"
  aria-pressed={isPressed}
  aria-expanded={isExpanded}
  aria-describedby={helpTextId}
  role="button"
  tabIndex={0}
>
  <X className="w-4 h-4" aria-hidden="true" />
</button>

// ❌ Bad: Missing accessibility attributes
<div onClick={handleClick}>
  <X className="w-4 h-4" />
</div>
```

### Keyboard Navigation
```typescript
// ✅ Good: Full keyboard support
const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault();
      handleActivation();
      break;
    case 'Escape':
      handleClose();
      break;
    case 'ArrowDown':
      focusNext();
      break;
    case 'ArrowUp':
      focusPrevious();
      break;
  }
};
```

### Focus Management
```typescript
// ✅ Good: Proper focus management
const GlassModal = ({ isOpen, onClose }: ModalProps) => {
  const previousFocusRef = useRef<HTMLElement | null>(null);
  
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      // Focus first interactive element
    } else if (previousFocusRef.current) {
      previousFocusRef.current.focus();
    }
  }, [isOpen]);
  
  return createPortal(
    <FocusTrap active={isOpen}>
      {/* Modal content */}
    </FocusTrap>,
    document.body
  );
};
```

---

## Performance Guidelines

### Bundle Size Limits
- **Core Bundle**: < 15KB (minified + gzipped)
- **Animation Bundle**: < 10KB
- **Advanced Bundle**: < 8KB
- **Total Library**: < 30KB

### Code Splitting
```typescript
// ✅ Good: Lazy loading heavy components
const GlassChart = lazy(() => 
  import(/* webpackChunkName: "glass-chart" */ './glass-chart')
);

// Use with Suspense
<Suspense fallback={<GlassChartSkeleton />}>
  <GlassChart data={chartData} />
</Suspense>
```

### Render Optimization
```typescript
// ✅ Good: Optimized rendering
const GlassList = ({ items }: ListProps) => {
  return (
    <VirtualList
      height={600}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    >
      {({ index, style }) => (
        <div style={style} key={items[index].id}>
          {items[index].content}
        </div>
      )}
    </VirtualList>
  );
};
```

---

## Code Organization

### File Structure
```
src/
├── components/           # React components
│   ├── glass-button/
│   │   ├── index.ts     # Public API
│   │   ├── glass-button.tsx
│   │   ├── glass-button.stories.tsx
│   │   ├── glass-button.test.tsx
│   │   └── glass-button.css
│   └── ...
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
├── types/               # TypeScript type definitions
├── styles/              # Global styles
└── bundles/             # Bundle entry points
```

### Import Organization
```typescript
// 1. External imports
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// 2. Internal absolute imports
import { useGlassEffect } from '@/hooks/use-glass-effect';
import type { GlassComponentProps } from '@/types';

// 3. Relative imports
import { glassVariants } from './glass-variants';
import './glass-component.css';
```

---

## Testing Requirements

### Unit Tests
```typescript
// ✅ Good: Comprehensive component testing
describe('GlassButton', () => {
  it('renders with correct ARIA attributes', () => {
    const { getByRole } = render(
      <GlassButton aria-label="Save changes">Save</GlassButton>
    );
    
    const button = getByRole('button', { name: 'Save changes' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Save changes');
  });
  
  it('handles keyboard navigation', async () => {
    const handleClick = vi.fn();
    const { getByRole } = render(
      <GlassButton onClick={handleClick}>Click me</GlassButton>
    );
    
    const button = getByRole('button');
    button.focus();
    
    await userEvent.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalledTimes(1);
    
    await userEvent.keyboard(' ');
    expect(handleClick).toHaveBeenCalledTimes(2);
  });
});
```

### Accessibility Tests
```typescript
// ✅ Good: Automated accessibility testing
it('meets WCAG 2.1 AA standards', async () => {
  const { container } = render(<GlassCard>Content</GlassCard>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

---

## Linting & Formatting

### Pre-commit Hooks
The project uses `lint-staged` to automatically run linting and formatting on staged files:

```json
{
  "lint-staged": {
    "*.{ts,tsx}": ["bunx oxlint --fix", "prettier --write"]
  }
}
```

### ESLint Rules (via OxLint)
- No `any` types
- Exhaustive deps for hooks
- Proper import ordering
- Consistent naming conventions
- No console logs in production

### Prettier Configuration
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "bracketSpacing": true
}
```

---

## Git Workflow

### Branch Naming
- Feature: `feature/component-name`
- Bug fix: `fix/issue-description`
- Refactor: `refactor/module-name`
- Docs: `docs/topic-name`

### Commit Messages
Follow conventional commits:
```bash
feat(glass-button): add loading state animation
fix(glass-modal): correct focus trap behavior
docs(readme): update installation instructions
refactor(utils): optimize glass effect calculations
test(glass-card): add accessibility tests
```

### Pull Request Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Accessibility tests pass
- [ ] Visual regression tests pass
- [ ] Bundle size within limits

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings introduced
```

---

## Enforcement

These standards are enforced through:
1. **Pre-commit hooks**: Automatic linting and formatting
2. **CI/CD Pipeline**: Automated tests and checks
3. **Code Reviews**: Manual verification by team members
4. **Monitoring**: Bundle size and performance tracking

All code must pass these checks before merging to the main branch.
