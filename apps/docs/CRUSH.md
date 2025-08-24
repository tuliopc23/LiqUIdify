# CRUSH.md - LiqUIdify Documentation

## Build/Test Commands
- `bun run dev` - Start development server with CSS build and Mintlify preview
- `bun run build` - Build CSS and check for broken links
- `bun run build:css` - Build component library CSS and bundle docs styles
- `bun run build:lib` - Build component library (from project root)
- `bun run type-check` - TypeScript type checking across workspace
- `bun run preview` - Alias for dev command
- `bun run links` - Check for broken links only
- `node scripts/build-css.mjs --include-lib --minify` - Build CSS with library inclusion and minification

## Glass UI Design System Standards

### Color Consistency Issues Found
**CRITICAL:** Several components have hardcoded gray colors instead of using the liquid glass system:
- `text-white`, `text-white/70`, `text-white/60` should use `text-liquid-primary`, `text-liquid-text`, `text-liquid-secondary`
- `text-gray-600`, `text-gray-400` should use `text-liquid-grey`, `text-liquid-tertiary`
- `bg-gray-100`, `bg-gray-800` should use `bg-liquid-bg`, `bg-liquid-bg-readable`
- Story files contain hardcoded grays for demo purposes only (acceptable)

### Proper Color Token Usage
- **Primary text**: `text-liquid-primary` (main content)
- **Secondary text**: `text-liquid-text` (body text)
- **Tertiary text**: `text-liquid-tertiary` (muted text)
- **Grey text**: `text-liquid-grey` (placeholder, disabled)
- **Backgrounds**: `bg-liquid-bg`, `bg-liquid-bg-readable`
- **Borders**: `border-liquid-highlight`, `border-liquid-glass-hl`
- **Accents**: `text-liquid-accent`, `border-liquid-accent`

### Typography Standards
- Ensure proper text alignment and spacing
- Use system fonts that match Apple's design language
- Maintain consistent font weights and sizes across components
- Test typography rendering across different screen densities

### Component Quality Checklist
- [ ] Use liquid glass color tokens (NOT hardcoded grays)
- [ ] Proper backdrop blur and transparency effects
- [ ] Consistent spacing and padding
- [ ] Accessible keyboard navigation
- [ ] Screen reader compatibility
- [ ] Responsive behavior across breakpoints
- [ ] Dark/light mode support
- [ ] Proper focus states and visual feedback

## Code Style Guidelines

### File Structure
- Documentation pages: `.mdx` files in organized directories
- Glass components: Prefixed with `glass-` in filenames
- Snippets: Reusable code examples in `snippets/components/`
- Scripts: Build and utility scripts in `scripts/`
- Templates: Component documentation templates in `.templates/`

### Naming Conventions
- Files: kebab-case for MDX files (`glass-button.mdx`, `glass-combobox.mdx`)
- Components: PascalCase with Glass prefix (`GlassButton`, `GlassTextArea`)
- Props: camelCase with descriptive names (`variant`, `iconOnly`, `loadingText`)
- CSS classes: Use `liquid-glass` prefix for glass system styles

### Glass Component Patterns
- Always include backdrop blur effects: `backdrop-blur-md`
- Use consistent glass transparency: `bg-white/10 dark:bg-black/10`
- Include proper border styling: `border border-white/20`
- Implement hover states with subtle transitions
- Ensure proper layering with z-index management

### Documentation Requirements
- Include Apple HIG compliance section for each component
- Document accessibility features (WCAG 2.1 AA compliance)
- Provide keyboard navigation instructions
- Include screen reader behavior descriptions
- Show responsive behavior examples
- Document glass effect implementation details

### Error Handling
- Graceful fallbacks for missing glass effects
- Default variants when invalid options provided
- Non-breaking component behavior with sensible defaults
- Proper error boundaries for complex glass components

### Import Organization
- External libraries first
- Glass UI system components
- Internal utilities and helpers
- Relative imports last