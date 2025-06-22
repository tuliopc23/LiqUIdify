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

## Getting Help

- 📖 [Documentation](https://glass-ui.dev/docs)
- 💬 [Discussions](https://github.com/tuliopc23/glass-ui/discussions)
- 🐛 [Issues](https://github.com/tuliopc23/glass-ui/issues)
- 📧 Email: tulio@example.com

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## License

By contributing to Glass UI, you agree that your contributions will be licensed under the MIT License.