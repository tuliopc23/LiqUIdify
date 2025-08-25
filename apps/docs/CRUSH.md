# CRUSH.md - Liquidify Documentation

## Build/Dev Commands

- **Start dev server**: `mintlify dev` (runs on http://localhost:3000)
- **Start on custom port**: `mintlify dev --port 3001`
- **Build site**: `mintlify build`

## Apple HIG Integration Complete ✅

### Enhanced Features

- **SF Pro Typography**: Complete Apple HIG type scale with SF Pro Display/Text fonts
- **Apple Color System**: Semantic colors with proper light/dark mode support
- **8pt Grid System**: Consistent spacing following Apple's design principles
- **SF Symbols Icons**: CSS-based icon system with weights and sizes
- **Glass Components**: Backdrop blur effects with physics-based interactions
- **Enhanced Mintlify**: Cards, Accordions, Frames with Apple styling

### File Structure

- **MDX files**: Component docs in `/components/`, guides in `/guides/`
- **Snippet components**: JSX files in `/snippets/components/` for visual previews
- **Documentation helpers**: Moved to `/components/docs/` (not used in MDX)
- **Configuration**: `docs.json` for Mintlify, `styles.css` for Apple HIG styling

### Code Style Guidelines

- **Typography**: Use Apple HIG classes (`text-display`, `text-title1`, etc.)
- **Icons**: SF Symbols with `sf-icon sf-[name]` classes and `sf-icon-text` wrapper
- **Glass Effects**: `glass-card`, `glass-button` classes with backdrop-blur
- **Spacing**: 8pt grid variables (`--space-1` to `--space-16`)
- **Colors**: Apple Blue (#0071e3) primary, semantic color variables

### Component Patterns

- **Mintlify Components**: Use `<Card>`, `<Frame>`, `<Accordion>`, `<Tip>`, `<Check>`
- **SF Icons**: `<span className="sf-icon sf-star"></span>` for inline icons
- **Glass Styling**: Apply `glass-card`, `glass-button` classes for morphism effects
- **Responsive**: Mobile-first approach with proper touch targets (44px min)

### Documentation Style

- **Headers**: Use SF icon text pattern: `<span className="sf-icon-text"><span className="sf-icon sf-star"></span>Section Title</span>`
- **Code blocks**: Use `<Frame>` for enhanced code presentation
- **Callouts**: Use `<Tip>`, `<Info>`, `<Warning>`, `<Check>` for different message types
- **Navigation**: CardGroup for related links, proper semantic structure
