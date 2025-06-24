# Contributing to Glass UI

We love your input! We want to make contributing to Glass UI as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

We use GitHub to host code, track issues and feature requests, and accept pull requests.

### Pull Request Process

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code lints
6. Issue that pull request!

## Development Setup

### Prerequisites

- Node.js 18+ 
- npm 9+

### Getting Started

```bash
# Clone your fork
git clone https://github.com/yourusername/glass-ui.git
cd glass-ui

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test
```

### Project Structure

```
src/
├── components/          # All Glass UI components
│   ├── glass-button/   
│   │   ├── glass-button.tsx
│   │   ├── glass-button.stories.tsx
│   │   ├── glass-button.test.tsx
│   │   └── index.ts
├── hooks/              # React hooks
├── lib/                # Utility functions
├── utils/              # Testing utilities
└── styles/             # CSS styles
```

## Code Style

We use ESLint and Prettier to maintain code quality:

```bash
# Check linting
npm run lint

# Fix linting issues
npm run lint:fix

# Check formatting
npm run format:check

# Fix formatting
npm run format
```

## Testing

We use Vitest for testing and jest-axe for accessibility testing:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run accessibility tests
npm run test:a11y

# Generate coverage report
npm run test:coverage
```

### Test Requirements

- All new components must have unit tests
- Accessibility tests are required
- Test coverage should be above 90%

## Component Guidelines

### Creating a New Component

1. **Component Structure**
   ```tsx
   // glass-example.tsx
   import { forwardRef } from 'react'
   import { cn } from '@/lib/glass-utils'
   
   export interface GlassExampleProps extends React.HTMLAttributes<HTMLDivElement> {
     variant?: 'primary' | 'secondary'
     size?: 'sm' | 'md' | 'lg'
   }
   
   const GlassExample = forwardRef<HTMLDivElement, GlassExampleProps>(
     ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
       return (
         <div
           ref={ref}
           className={cn(
             'glass-component-base',
             variantClasses[variant],
             sizeClasses[size],
             className
           )}
           {...props}
         />
       )
     }
   )
   
   GlassExample.displayName = 'GlassExample'
   
   export { GlassExample }
   ```

2. **Stories (Storybook)**
   ```tsx
   // glass-example.stories.tsx
   import type { Meta, StoryObj } from '@storybook/react'
   import { GlassExample } from './glass-example'
   
   const meta: Meta<typeof GlassExample> = {
     title: 'Components/GlassExample',
     component: GlassExample,
     parameters: {
       layout: 'centered',
     },
     tags: ['autodocs'],
   }
   
   export default meta
   type Story = StoryObj<typeof meta>
   
   export const Primary: Story = {
     args: {
       variant: 'primary',
     },
   }
   ```

3. **Tests**
   ```tsx
   // glass-example.test.tsx
   import { render, screen } from '@testing-library/react'
   import { axe, toHaveNoViolations } from 'jest-axe'
   import { GlassExample } from './glass-example'
   
   expect.extend(toHaveNoViolations)
   
   describe('GlassExample', () => {
     it('renders correctly', () => {
       render(<GlassExample>Test</GlassExample>)
       expect(screen.getByText('Test')).toBeInTheDocument()
     })
   
     it('should be accessible', async () => {
       const { container } = render(<GlassExample>Test</GlassExample>)
       const results = await axe(container)
       expect(results).toHaveNoViolations()
     })
   })
   ```

### Design Principles

1. **Accessibility First**: All components must be WCAG 2.1 AA compliant
2. **TypeScript**: Full type safety with proper interfaces
3. **Composability**: Components should be composable and flexible
4. **Performance**: Optimize for bundle size and runtime performance
5. **Consistency**: Follow established patterns and naming conventions

### Glass UI Design System

- **Colors**: Use CSS custom properties for theming
- **Spacing**: Follow 8pt grid system
- **Typography**: SF Pro Display/Mono with fallbacks
- **Border Radius**: 6px, 12px, 16px, 20px, 24px
- **Animations**: 300ms cubic-bezier(0.2, 0, 0, 1)

## Commit Guidelines

We follow [Conventional Commits](https://conventionalcommits.org/):

```
feat: add new glass-button component
fix: resolve focus ring issue in glass-input
docs: update installation guide
test: add accessibility tests for glass-card
refactor: optimize glass-utils performance
```

### Commit Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Test changes
- `chore`: Build/tool changes

## Release Process

We use [Changesets](https://github.com/changesets/changesets) for version management:

```bash
# Add a changeset
npx changeset

# Version packages
npx changeset version

# Publish (maintainers only)
npx changeset publish
```

## Performance Guidelines

### Bundle Size Optimization
- Use tree-shakeable exports
- Avoid large dependencies
- Implement lazy loading where appropriate
- Monitor bundle impact with `npm run build`

### Runtime Performance
- Use `React.memo` for expensive components
- Implement proper key props for lists
- Avoid inline object/function creation in render
- Use CSS transforms for animations

### Accessibility Requirements

All components must meet these standards:

1. **Keyboard Navigation**
   - All interactive elements must be keyboard accessible
   - Proper tab order and focus management
   - Support for arrow key navigation where appropriate

2. **Screen Reader Support**
   - Proper ARIA labels and descriptions
   - Semantic HTML structure
   - Live region announcements for dynamic content

3. **Color Contrast**
   - Minimum 4.5:1 contrast ratio for normal text
   - Minimum 3:1 contrast ratio for large text
   - Support for high contrast mode

4. **Focus Management**
   - Visible focus indicators
   - Proper focus trapping in modals
   - Focus restoration after interactions

### Component API Design

Follow these patterns for consistent APIs:

```tsx
// ✅ Good: Consistent prop naming
interface GlassComponentProps {
  variant?: 'primary' | 'secondary' | 'tertiary'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  disabled?: boolean
  loading?: boolean
  children?: React.ReactNode
  className?: string
}

// ❌ Avoid: Inconsistent naming
interface BadComponentProps {
  type?: string  // Use 'variant' instead
  big?: boolean  // Use 'size' instead
  isDisabled?: boolean  // Use 'disabled' instead
}
```

## Documentation Standards

### Component Documentation
Each component should include:

1. **Overview**: Brief description and use cases
2. **API Reference**: Complete prop documentation
3. **Examples**: Common usage patterns
4. **Accessibility**: ARIA patterns and keyboard shortcuts
5. **Styling**: Customization options

### Code Comments
```tsx
/**
 * GlassButton - A button component with liquid glass aesthetics
 * 
 * Features:
 * - Multiple variants (primary, secondary, tertiary, ghost, destructive)
 * - Magnetic hover effects with spring physics
 * - Built-in loading states
 * - Full accessibility support
 * 
 * @example
 * <GlassButton variant="primary" size="lg" onClick={handleClick}>
 *   Click me
 * </GlassButton>
 */
```

## Testing Strategy

### Unit Tests
- Test component rendering
- Test prop variations
- Test user interactions
- Test error states

### Integration Tests
- Test component composition
- Test theme switching
- Test responsive behavior

### Accessibility Tests
```tsx
// Required accessibility tests
describe('Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<Component />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should be keyboard navigable', () => {
    render(<Component />)
    const element = screen.getByRole('button')
    element.focus()
    expect(element).toHaveFocus()
  })

  it('should have proper ARIA attributes', () => {
    render(<Component aria-label="Test button" />)
    expect(screen.getByLabelText('Test button')).toBeInTheDocument()
  })
})
```

### Visual Regression Tests
- Storybook visual tests
- Cross-browser compatibility
- Theme variations
- Responsive breakpoints

## Getting Help

- 📖 [Documentation](https://glass-ui.dev/docs)
- 💬 [Discussions](https://github.com/tuliopc23/glass-ui/discussions)
- 🐛 [Issues](https://github.com/tuliopc23/glass-ui/issues)
- 📧 Email: tulio@example.com
- 🎨 [Figma Design System](https://figma.com/glass-ui)
- 📱 [Component Playground](https://glass-ui.dev/playground)

## Community

### Discord Server
Join our Discord for real-time discussions:
- General help and questions
- Component design discussions
- Feature requests and feedback
- Community showcase

### Office Hours
Weekly community office hours:
- **When**: Fridays 2-3 PM EST
- **Where**: Discord voice channel
- **What**: Q&A, design reviews, roadmap discussions

## Recognition

### Contributors
We recognize contributors in multiple ways:
- GitHub contributor graph
- Monthly contributor highlights
- Annual contributor awards
- Conference speaking opportunities

### Contribution Types
We value all types of contributions:
- 🐛 Bug reports and fixes
- ✨ New features and components
- 📝 Documentation improvements
- 🎨 Design and UX enhancements
- 🧪 Testing and quality assurance
- 🌍 Translations and internationalization
- 💬 Community support and mentoring

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## License

By contributing to Glass UI, you agree that your contributions will be licensed under the MIT License.
