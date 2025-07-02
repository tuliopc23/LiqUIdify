# Contributing to Glass UI

Thank you for your interest in contributing to Glass UI! 🎉

## Development Setup

### Prerequisites
- Node.js 16+ 
- npm/yarn/pnpm

### Quick Start
```bash
# 1. Fork and clone the repo
git clone https://github.com/your-username/glass-ui.git
cd glass-ui

# 2. Install dependencies
npm install

# 3. Start development
npm run dev
npm run storybook  # In another terminal
```

## Development Workflow

### Making Changes
1. **Create a branch** from `main`
   ```bash
   git checkout -b feature/awesome-glass-effect
   ```

2. **Make your changes**
   - Follow existing code patterns
   - Add proper TypeScript types
   - Include accessibility attributes
   - Test on multiple devices

3. **Test your changes**
   ```bash
   npm run test
   npm run lint
   npm run type-check
   ```

4. **Update documentation**
   - Add/update component stories
   - Update JSDoc comments
   - Add examples if needed

5. **Submit a pull request**

### Code Style
- **TypeScript-first** - All components must have proper types
- **Accessibility-first** - WCAG 2.1 AA compliance required
- **Performance-focused** - Consider bundle size and runtime performance
- **Mobile-optimized** - Test on touch devices

### Component Guidelines

#### Creating New Components
```tsx
// 1. Use forwardRef for DOM components
export const GlassAwesome = forwardRef<HTMLDivElement, GlassAwesomeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(getGlassClass(variant), className)}
        {...props}
      />
    )
  }
)

// 2. Add proper display name
GlassAwesome.displayName = "GlassAwesome"

// 3. Export from index
export { GlassAwesome } from './glass-awesome'
```

#### Writing Stories
```tsx
// Every component needs comprehensive stories
export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4">
      {variants.map(variant => (
        <GlassAwesome key={variant} variant={variant}>
          {variant}
        </GlassAwesome>
      ))}
    </div>
  )
}
```

### Component Standards

When developing components for Glass UI, please adhere to the following standards:

- **Accessibility & Keyboard Navigation**:  
  Utilize **Radix UI primitives** to ensure your components are accessible and support comprehensive keyboard navigation.

- **Styling**:  
  Use **Tailwind CSS** along with the `getGlassClass()` utility for maintaining consistent glass variants across components.

- **Props and Patterns**:  
  - Follow consistent **props naming conventions**.
  - Implement both **controlled and uncontrolled** component patterns where applicable.

- **Unit Testing**:  
  Write unit tests using **Vitest**, **Testing Library**, and **axe** for accessibility checks. Ensure tests cover all scenarios, especially edge cases.

- **Storybook**:  
  Create **Storybook stories** for each component. Include stories for ARIA usage and mobile scenarios to demonstrate accessibility and responsiveness.

- **Compatibility Considerations**:  
  Ensure your component:
  - Is **responsive** and works well on various screen sizes.
  - Supports **dark mode**.
  - Is compatible with **RTL layouts**.
  - Works with **Server-Side Rendering (SSR)** frameworks.

This section will help maintain consistency and quality across all components in the Glass UI library.

#### Testing Requirements
```tsx
// Accessibility testing is mandatory
test('should be accessible', async () => {
  render(<GlassAwesome>Test</GlassAwesome>)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})

// Responsive testing encouraged
test('should work on mobile', () => {
  // Touch interaction tests
})
```

## Project Structure

```
src/
├── components/           # React components
│   ├── glass-button/    # Component folder
│   │   ├── glass-button.tsx
│   │   ├── glass-button.stories.tsx
│   │   ├── glass-button.test.tsx
│   │   └── index.ts
├── hooks/               # Custom hooks
├── lib/                 # Utilities and physics
├── styles/              # CSS and design tokens
└── tokens/              # Design system tokens
```

## Commit Guidelines

Use [Conventional Commits](https://conventionalcommits.org/):

```bash
feat: add holographic glass effect
fix: resolve mobile touch issues  
docs: update component examples
style: improve glass blur performance
test: add accessibility tests
refactor: simplify physics calculations
```

## What We're Looking For

### High Priority
- **New glass effects** - Creative visual variants
- **Performance improvements** - Faster animations, smaller bundles
- **Accessibility enhancements** - Better screen reader support
- **Mobile optimizations** - Touch-friendly interactions
- **Framework adapters** - Vue, Svelte, Angular support

### Medium Priority  
- **Documentation improvements** - Better examples, guides
- **Testing enhancements** - More comprehensive test coverage
- **Developer experience** - Better error messages, debugging
- **Advanced animations** - Physics-based interactions

### Examples of Good Contributions
- Adding new glass variants with proper physics
- Improving component accessibility
- Adding comprehensive tests
- Creating framework adapters
- Performance optimizations
- Better error handling

## Pull Request Process

1. **Fill out the PR template** completely
2. **Add/update tests** for your changes
3. **Update documentation** if needed
4. **Ensure CI passes** - tests, linting, type checking
5. **Get review approval** from maintainers
6. **Squash and merge** when approved

## Need Help?

- 📖 **Documentation**: [glass-ui.dev](https://glass-ui.dev)
- 💬 **Discussions**: GitHub Discussions
- 🐛 **Bug Reports**: GitHub Issues
- 💡 **Feature Requests**: GitHub Issues with `enhancement` label

## Recognition

Contributors get:
- 🏆 **Credit in releases** and documentation
- 🎯 **Contributor badge** on GitHub
- 🚀 **Early access** to new features
- 🤝 **Mentorship opportunities** for significant contributions

---

**Happy contributing!** 🚀 Every contribution, no matter how small, helps make Glass UI better for everyone.