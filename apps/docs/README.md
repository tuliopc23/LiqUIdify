# LiqUIdify Documentation

This is the official documentation site for LiqUIdify, built with VitePress.

## Development

```bash
# Start dev server
nx dev docs

# Or using npm scripts
bun run docs:dev
```

## Build

```bash
# Build documentation
nx build docs

# Or using npm scripts
bun run docs:build
```

## Preview

```bash
# Preview built documentation
nx preview docs

# Or using npm scripts
bun run docs:preview
```

## Structure

- `.vitepress/` - VitePress configuration and theme
- `guide/` - Getting started and guides
- `components/` - Component documentation
- `api/` - API reference
- `advanced/` - Advanced topics

## Adding Documentation

1. Create a new `.md` file in the appropriate directory
2. Add it to the sidebar in `.vitepress/config.ts`
3. Use Vue components for interactive demos

## Features

- ✅ Integrated with existing LiqUIdify documentation
- ✅ Live component demos
- ✅ Local search
- ✅ Responsive design
- ✅ Dark mode support
- ✅ Glassmorphism theme matching LiqUIdify
