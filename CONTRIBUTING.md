# Contributing to LiqUIdify

Thank you for your interest in contributing to LiqUIdify! We welcome contributions from the community and are grateful for any help you can provide.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Setup](#development-setup)
4. [Component Development](#component-development)
5. [Testing Requirements](#testing-requirements)
6. [Pull Request Process](#pull-request-process)
7. [Coding Standards](#coding-standards)
8. [Component Guidelines](#component-guidelines)
9. [Documentation](#documentation)
10. [Community](#community)

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it before contributing.

### Our Standards

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on constructive criticism
- Accept feedback gracefully
- Prioritize the community's best interests

## Getting Started

### Prerequisites

- Node.js 18+ or Bun 1.0+
- Git
- Basic knowledge of React and TypeScript
- Understanding of accessibility standards

### First-Time Contributors

1. Look for issues labeled `good first issue`
2. Comment on the issue to claim it
3. Ask questions if anything is unclear
4. Submit your PR when ready

## Development Setup

### 1. Fork and Clone

```bash
# Fork the repository on GitHub, then:
git clone https://github.com/YOUR_USERNAME/liquidify.git
cd liquidify
git remote add upstream https://github.com/liquidify/components.git
```

### 2. Install Dependencies

```bash
# Using Bun (recommended)
bun install

# Or using npm
npm install
```

### 3. Set Up Development Environment

```bash
# Copy environment template
cp .env.example .env.local

# Start development servers
bun run dev        # Component development
bun run storybook  # Storybook development
bun run docs:dev   # Documentation development
```

### 4. Verify Setup

```bash
# Run tests
bun test

# Check types
bun run type-check

# Lint code
bun run lint
```

## Component Development

### Creating a New Component

1. **Use the component generator:**

```bash
bun run generate:component GlassNewComponent
```

This creates:

```
libs/components/src/components/glass-new-component/
├── glass-new-component.tsx
├── glass-new-component.stories.tsx
├── glass-new-component.test.tsx
├── index.ts
└── README.md
```

2. **Implement the component:**

```typescript
import React from 'react';
import { cn } from '../../utils';
import { useGlassEffect } from '../../hooks';

export interface GlassNewComponentProps {
  children?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'inset';
  // Add more props
}

export const GlassNewComponent = React.forwardRef<
  HTMLDivElement,
  GlassNewComponentProps
>(({ children, className, variant = 'default', ...props }, ref) => {
  const glassClasses = useGlassEffect({ variant });

  return (
    <div
      ref={ref}
      className={cn(
        'glass-new-component',
        glassClasses,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

GlassNewComponent.displayName = 'GlassNewComponent';
```

### Component Checklist

- [ ] TypeScript types defined
- [ ] Props documented with JSDoc
- [ ] Forwarded ref when applicable
- [ ] Accessibility attributes
- [ ] Keyboard navigation
- [ ] Responsive design
- [ ] Glass effect applied
- [ ] Stories created
- [ ] Tests written
- [ ] Documentation added

## Testing Requirements

### Unit Tests

Every component must have tests:

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { GlassNewComponent } from './glass-new-component';

describe('GlassNewComponent', () => {
  it('renders children correctly', () => {
    render(<GlassNewComponent>Test Content</GlassNewComponent>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('handles user interactions', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    render(<GlassNewComponent onClick={onClick}>Click me</GlassNewComponent>);
    await user.click(screen.getByText('Click me'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('meets accessibility standards', async () => {
    const { container } = render(
      <GlassNewComponent>Accessible Component</GlassNewComponent>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### Storybook Stories

Create comprehensive stories:

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { GlassNewComponent } from './glass-new-component';

const meta = {
  title: 'Components/GlassNewComponent',
  component: GlassNewComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glassmorphic component for...',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'inset'],
    },
  },
} satisfies Meta<typeof GlassNewComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Glass Component',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Click me!',
    onClick: () => alert('Clicked!'),
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 20 }}>
      <GlassNewComponent variant="default">Default</GlassNewComponent>
      <GlassNewComponent variant="elevated">Elevated</GlassNewComponent>
      <GlassNewComponent variant="inset">Inset</GlassNewComponent>
    </div>
  ),
};
```

## Pull Request Process

### 1. Before Creating a PR

- [ ] Sync with upstream main
- [ ] Create a feature branch
- [ ] Make your changes
- [ ] Add/update tests
- [ ] Update documentation
- [ ] Run all checks locally

```bash
# Sync with upstream
git fetch upstream
git checkout main
git merge upstream/main

# Create feature branch
git checkout -b feature/glass-new-component

# Make changes, then run checks
bun test
bun run type-check
bun run lint
bun run build
```

### 2. PR Guidelines

**Title Format:**

```
feat(component): add GlassNewComponent
fix(button): resolve focus issue
docs(readme): update installation guide
```

**Description Template:**

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
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] Accessibility tested

## Screenshots

(if applicable)

## Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No console errors/warnings
```

### 3. Review Process

1. Automated checks run
2. Code review by maintainers
3. Address feedback
4. Approval and merge

## Coding Standards

### TypeScript

```typescript
// Use explicit types
interface Props {
  value: string;
  onChange: (value: string) => void;
}

// Use const assertions
const VARIANTS = ["default", "primary", "danger"] as const;
type Variant = (typeof VARIANTS)[number];

// Document complex types
/**
 * Configuration for glass effect intensity
 * @param blur - Backdrop blur amount in pixels
 * @param opacity - Glass opacity from 0 to 1
 */
interface GlassConfig {
  blur: number;
  opacity: number;
}
```

### React

```typescript
// Use function components with hooks
export const Component: React.FC<Props> = ({ value, onChange }) => {
  const [state, setState] = useState(value);

  useEffect(() => {
    setState(value);
  }, [value]);

  return <div>{state}</div>;
};

// Forward refs when needed
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => <input ref={ref} {...props} />
);
```

### CSS

```css
/* Use CSS modules or styled-components */
.glass-component {
  /* Glass effect base */
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);

  /* Responsive design */
  @media (max-width: 768px) {
    padding: 1rem;
  }
}

/* Use CSS custom properties */
.glass-component {
  background: var(--glass-bg, rgba(255, 255, 255, 0.1));
  backdrop-filter: blur(var(--glass-blur, 20px));
}
```

## Component Guidelines

### Glassmorphism Design

1. **Consistent glass effects:**

```typescript
import { useGlassEffect } from "../../hooks";

const glassClasses = useGlassEffect({
  blur: 20,
  opacity: 0.8,
  variant: "elevated",
});
```

2. **Proper contrast:**

- Ensure text is readable on glass backgrounds
- Test with different backgrounds
- Provide fallbacks for unsupported browsers

3. **Performance:**

- Limit backdrop-filter usage
- Use will-change sparingly
- Test on low-end devices

### Accessibility Requirements

1. **Keyboard Navigation:**

```typescript
<button
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
>
```

2. **ARIA Attributes:**

```typescript
<div
  role="button"
  tabIndex={0}
  aria-pressed={isPressed}
  aria-label="Toggle setting"
>
```

3. **Focus Management:**

```typescript
const { focusProps } = useFocusRing();
return <button {...focusProps} />;
```

## Documentation

### Component Documentation

Each component needs:

1. **README.md:**

````markdown
# GlassNewComponent

Brief description of the component.

## Usage

\```jsx
import { GlassNewComponent } from '@liquidify/components';

<GlassNewComponent variant="elevated">
  Content
</GlassNewComponent>
\```

## Props

| Prop    | Type   | Default   | Description    |
| ------- | ------ | --------- | -------------- |
| variant | string | 'default' | Visual variant |

## Accessibility

- Keyboard navigable
- Screen reader friendly
- WCAG 2.1 AA compliant
````

2. **JSDoc Comments:**

```typescript
/**
 * A glassmorphic component for displaying content
 *
 * @example
 * <GlassNewComponent variant="elevated">
 *   Content
 * </GlassNewComponent>
 */
export interface GlassNewComponentProps {
  /** Visual variant of the component */
  variant?: "default" | "elevated" | "inset";
}
```

## Community

### Getting Help

- 💬 [Discord](https://discord.gg/liquidify) - Real-time chat
- 🐛 [GitHub Issues](https://github.com/liquidify/components/issues) - Bug reports
- 💡 [Discussions](https://github.com/liquidify/components/discussions) - Ideas & questions
- 📧 [Email](mailto:support@liquidify.dev) - Direct support

### Ways to Contribute

1. **Code Contributions**
   - Fix bugs
   - Add features
   - Improve performance
   - Enhance accessibility

2. **Non-Code Contributions**
   - Report bugs
   - Suggest features
   - Improve documentation
   - Create examples
   - Write tutorials
   - Answer questions
   - Review PRs

### Recognition

Contributors are recognized in:

- [Contributors list](https://github.com/liquidify/components/contributors)
- Release notes
- Annual contributor spotlight

## Resources

### Learn More

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Glassmorphism Design](https://uxdesign.cc/glassmorphism-in-user-interfaces-1f39bb1308c9)

### Tools

- [React DevTools](https://react.dev/learn/react-developer-tools)
- [Storybook](https://storybook.js.org/)
- [Jest](https://jestjs.io/)
- [Testing Library](https://testing-library.com/)

---

Thank you for contributing to LiqUIdify! Your efforts help make the web more beautiful and accessible. 🎉
