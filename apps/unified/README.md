# LiqUIdify Unified App

This unified app combines the LiqUIdify landing page and components gallery into a single React application. It serves as both a marketing page and an interactive showcase of the LiqUIdify component library.

## Features

- **Landing Page** (`/`): Marketing introduction to LiqUIdify with Liquid Glass design
- **Components Gallery** (`/components`): Interactive showcase of available components
- **React Router**: Client-side routing for seamless navigation
- **Live Component Source**: Components are imported directly from the library source for HMR during development

## Architecture

### File Structure

```
apps/unified/
├── src/
│   ├── App.tsx          # Main app with router setup
│   ├── main.tsx         # App entry point with style imports
│   └── pages/
│       ├── Landing.tsx   # Landing page component
│       └── Components.tsx # Components gallery
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration with path mapping
└── vite.config.ts       # Vite configuration with aliases
```

### Vite Configuration

The app uses Vite aliases to import from the component library source:

- `liquidify` → `../../libs/components/src/index.ts`
- `liquidify/styles` → `../../libs/components/src/styles/panda.css`

This enables:
- Hot Module Replacement (HMR) during development
- Direct imports from library source
- TypeScript support with proper path mapping

### Build Output

Production builds are output to `../../dist/unified/` for easy deployment.

## Development

### Prerequisites

1. Build the component library first:
   ```bash
   bun run build:lib
   ```

2. From the repository root, install dependencies:
   ```bash
   bun install
   ```

### Scripts

From the unified app directory (`apps/unified/`):

```bash
# Start development server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

From the repository root:

```bash
# Development server
bun run unified:dev

# Production build
bun run unified:build

# Preview build
bun run unified:preview
```

### URLs

- **Development**: http://localhost:5173/
- **Landing Page**: http://localhost:5173/
- **Components Gallery**: http://localhost:5173/components

## Deployment

1. Build the unified app:
   ```bash
   bun run unified:build
   ```

2. Deploy the contents of `dist/unified/` to your static hosting service.

The build output is a standard single-page application (SPA) that works with:
- Vercel
- Netlify 
- GitHub Pages
- Any static file server

### Production Considerations

- The app includes React Router for client-side routing
- Configure your hosting provider to redirect 404s to `index.html` for proper SPA behavior
- The bundle size is ~742KB minified (includes all LiqUIdify components)
- Consider implementing code splitting if bundle size becomes a concern

## Components Used

The app demonstrates the following LiqUIdify components:

- `Button` with primary and secondary variants
- `Switch` with default checked state
- Liquid Glass styling and backdrop filters
- React Router DOM for navigation

## Styling

The app uses a combination of:

- **LiqUIdify Component Styles**: Imported via `liquidify/styles`
- **Inline Styles**: For layout and liquid glass effects
- **CSS Custom Properties**: For responsive design
- **Apple-inspired Design**: Clean typography and spacing

The styling follows the Liquid Glass design language with:
- Backdrop blur effects
- Semi-transparent surfaces
- Subtle borders and shadows
- Consistent border radius (16px)
