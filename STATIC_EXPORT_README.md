# LiquidUI Static Component Export System

This document explains the comprehensive static export system for LiquidUI components, enabling static site generation and documentation.

## Overview

The static export system provides multiple ways to export and showcase LiquidUI components as static HTML files, perfect for:

- **Documentation websites** - Complete component documentation
- **Static site generation** - Integration with static site generators like Astro, Next.js, Gatsby
- **Component galleries** - Showcase all components without JavaScript runtime
- **Design system documentation** - Comprehensive design system docs
- **API documentation** - Machine-readable component data

## Export Options

### 1. Basic Static Export (`npm run export:static`)

**Location**: `static-export/`
**Script**: `scripts/export-components-static.ts`

**Features**:
- ✅ Simple HTML pages for each component
- ✅ Basic component previews
- ✅ Theme toggle (light/dark)
- ✅ Installation instructions
- ✅ Usage examples
- ✅ Navigation between components

**Generated Files**:
```
static-export/
├── index.html              # Main overview page
├── button.html            # Button component page
├── input.html             # Input component page
├── card.html              # Card component page
├── modal.html             # Modal component page
├── [...].html             # All other components
└── README.md              # Usage instructions
```

### 2. Advanced Documentation Export (`npm run export:advanced`)

**Location**: `static-export-advanced/`
**Script**: `scripts/export-components-advanced.ts`

**Features**:
- ✅ Professional documentation pages
- ✅ Comprehensive component information
- ✅ Props tables with TypeScript types
- ✅ Multiple code examples
- ✅ Accessibility documentation
- ✅ Performance metrics
- ✅ SEO optimized pages
- ✅ Syntax highlighting
- ✅ Table of contents
- ✅ JSON API export
- ✅ Markdown documentation

**Generated Files**:
```
static-export-advanced/
├── index.html              # Main documentation hub
├── components/             # Individual component docs
│   ├── glass-button.html  # Comprehensive button docs
│   ├── glass-input.html   # Comprehensive input docs
│   └── glass-card.html    # Comprehensive card docs
├── api/                   # API documentation
│   └── README.md          # Complete API docs in Markdown
└── data/                  # Machine-readable data
    └── components.json    # Component data for programmatic use
```

### 3. Storybook Export (`npm run export:storybook`)

**Location**: `static-export/storybook/`
**Features**:
- ✅ Interactive component playground
- ✅ Component controls and variations
- ✅ Built-in accessibility testing
- ✅ Responsive design testing
- ✅ Auto-generated documentation

## Component Coverage

The export system covers all major LiquidUI components:

### Form Controls
- `glass-button` - Interactive buttons with animations
- `glass-input` - Text inputs with validation
- `glass-textarea` - Multi-line text inputs
- `glass-select` - Dropdown selections
- `glass-checkbox` - Checkboxes with glass styling
- `glass-switch` - Toggle switches
- `glass-slider` - Range controls
- `glass-radio-group` - Radio button groups

### Layout Components
- `glass-card` - Container components
- `glass-modal` - Overlay dialogs
- `glass-tabs` - Tabbed navigation
- `glass-accordion` - Collapsible content
- `glass-drawer` - Side panels

### Display Components
- `glass-badge` - Status indicators
- `glass-avatar` - User profile pictures
- `glass-table` - Data tables
- `glass-progress` - Progress indicators
- `glass-loading` - Loading states

### Navigation
- `glass-dropdown` - Action menus
- `glass-breadcrumbs` - Navigation breadcrumbs
- `glass-pagination` - Page navigation

### Feedback
- `glass-tooltip` - Contextual information
- `glass-popover` - Rich content overlays
- `glass-toast` - Notifications
- `glass-notification` - System notifications

## Usage Examples

### Basic Static Export

```bash
# Generate basic static export
npm run export:static

# Open in browser
open static-export/index.html
```

### Advanced Documentation Export

```bash
# Generate advanced documentation
npm run export:advanced

# Open documentation hub
open static-export-advanced/index.html

# View specific component
open static-export-advanced/components/glass-button.html
```

### Storybook Export

```bash
# Generate interactive Storybook
npm run export:storybook

# Open Storybook
open static-export/storybook/index.html
```

## Integration with Static Site Generators

### Astro Integration

```typescript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
  // Use exported components
  vite: {
    resolve: {
      alias: {
        '@liquidui': './node_modules/@tuliocunha23/liquidui'
      }
    }
  }
});
```

### Next.js Integration

```typescript
// next.config.js
const nextConfig = {
  // Enable static export
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;
```

### Gatsby Integration

```typescript
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-postcss',
      options: {
        postCssPlugins: [
          require('tailwindcss'),
          require('autoprefixer')
        ]
      }
    }
  ]
};
```

## API Documentation

### Component Data Structure

The advanced export generates a JSON file with comprehensive component data:

```json
{
  "metadata": {
    "generated": "2024-01-01T00:00:00.000Z",
    "version": "1.2.0",
    "totalComponents": 20
  },
  "components": {
    "glass-button": {
      "title": "Glass Button",
      "description": "Interactive buttons with glass morphism effects",
      "category": "Form Controls",
      "complexity": "Basic",
      "props": [
        {
          "name": "variant",
          "type": "string",
          "default": "primary",
          "description": "Button style variant"
        }
      ],
      "examples": [...],
      "accessibility": {...},
      "performance": {...}
    }
  }
}
```

### Programmatic Usage

```typescript
// Load component data
import componentData from './static-export-advanced/data/components.json';

// Get all components
const components = componentData.components;

// Filter by category
const formComponents = Object.entries(components)
  .filter(([_, component]) => component.category === 'Form Controls');

// Get component props
const buttonProps = components['glass-button'].props;
```

## SEO and Performance

### SEO Features

- ✅ Meta tags for social sharing
- ✅ Open Graph tags
- ✅ Twitter Card support
- ✅ Semantic HTML structure
- ✅ Proper heading hierarchy
- ✅ Structured data markup

### Performance Optimizations

- ✅ Minified HTML/CSS/JS
- ✅ Optimized images
- ✅ Lazy loading
- ✅ Critical CSS inlining
- ✅ Efficient caching headers
- ✅ Compressed assets

## Accessibility

All exported components maintain accessibility standards:

- ✅ WCAG 2.1 AA compliant
- ✅ Screen reader support
- ✅ Keyboard navigation
- ✅ High contrast mode
- ✅ Focus management
- ✅ ARIA attributes

## Customization

### Custom Themes

```typescript
// Modify theme variables in export scripts
const CUSTOM_THEME = {
  colors: {
    primary: '#your-primary-color',
    secondary: '#your-secondary-color'
  },
  gradients: {
    main: 'linear-gradient(135deg, #color1 0%, #color2 100%)'
  }
};
```

### Custom Components

```typescript
// Add custom components to export
const CUSTOM_COMPONENTS = {
  'my-component': {
    title: 'My Component',
    description: 'Custom component description',
    category: 'Custom',
    // ... other properties
  }
};
```

## Deployment

### Static Hosting

The exported files can be deployed to any static hosting service:

- **Vercel**: `vercel --prod`
- **Netlify**: `netlify deploy --prod`
- **GitHub Pages**: Push to `gh-pages` branch
- **AWS S3**: Upload to S3 bucket
- **Cloudflare Pages**: Connect to repository

### CDN Integration

```html
<!-- Include from CDN -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tuliocunha23/liquidui@latest/dist/liquidui.css">
<script src="https://cdn.jsdelivr.net/npm/@tuliocunha23/liquidui@latest/dist/liquidui.js"></script>
```

## Development

### Adding New Components

1. Add component to `COMPONENTS` array in export scripts
2. Add component metadata to `COMPONENT_METADATA`
3. Run export scripts to generate updated documentation

### Modifying Templates

1. Edit HTML templates in export scripts
2. Update CSS styles for visual improvements
3. Add new features to component rendering

### Testing

```bash
# Test static export
npm run export:static
npm run export:advanced

# Verify generated files
ls -la static-export/
ls -la static-export-advanced/

# Test in browser
open static-export/index.html
open static-export-advanced/index.html
```

## Troubleshooting

### Common Issues

1. **Missing CSS styles**: Ensure `npm run build` was executed
2. **Broken links**: Check file paths in generated HTML
3. **Component not showing**: Verify component is added to export arrays
4. **Theme not working**: Check CSS custom properties

### Debug Commands

```bash
# Clean and rebuild
npm run clean
npm run build

# Re-export
npm run export:static
npm run export:advanced

# Check file structure
tree static-export/
tree static-export-advanced/
```

## Contributing

To contribute to the static export system:

1. Fork the repository
2. Create a feature branch
3. Modify export scripts
4. Test all export options
5. Submit pull request

## License

MIT License - see LICENSE file for details.

## Links

- [GitHub Repository](https://github.com/tuliopc23/LiqUIdify)
- [Live Demo](https://liquidify-fw9pi7oj6-tulio-pinheiro-cunha-s-projects.vercel.app)
- [NPM Package](https://www.npmjs.com/package/@tuliocunha23/liquidui)
- [Documentation](https://liquidify-fw9pi7oj6-tulio-pinheiro-cunha-s-projects.vercel.app)
