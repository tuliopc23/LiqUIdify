# Installation

Get started with LiqUIdify in your React project in under 2 minutes.

## Prerequisites

- **Node.js**: 18.x or later
- **React**: 18.x or 19.x
- **Package Manager**: npm, yarn, pnpm, or bun

## Installation Methods

### Bun (Recommended)

Bun is the fastest way to install LiqUIdify and all peer dependencies:

```bash
bun add liquidify-react react react-dom @ark-ui/react framer-motion lucide-react
```

### npm

```bash
npm install liquidify-react react react-dom @ark-ui/react framer-motion lucide-react
```

### yarn

```bash
yarn add liquidify-react react react-dom @ark-ui/react framer-motion lucide-react
```

### pnpm

```bash
pnpm add liquidify-react react react-dom @ark-ui/react framer-motion lucide-react
```

## Peer Dependencies

LiqUIdify requires the following peer dependencies:

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^18 \|\| ^19 | Core React library |
| `react-dom` | ^18 \|\| ^19 | React DOM renderer |
| `@ark-ui/react` | ^5.25.1 | Headless UI primitives |
| `framer-motion` | ^12.23.22 | Animation library |
| `lucide-react` | ^0.544.0 | Icon library |

### Why Peer Dependencies?

We keep these as peer dependencies (not bundled) to:
- **Prevent version conflicts** in your project
- **Reduce bundle duplication** (you don't get two copies of React)
- **Give you control** over versions and updates

## Import Styles

After installation, you need to import the CSS once in your app's entry point:

### App Router (Next.js 13+)

```tsx
// app/layout.tsx
import 'liquidify-react/styles';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
```

### Pages Router (Next.js 12)

```tsx
// pages/_app.tsx
import 'liquidify-react/styles';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
```

### Vite

```tsx
// src/main.tsx
import 'liquidify-react/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### Remix

```tsx
// app/root.tsx
import 'liquidify-react/styles';
import { Links, LiveReload, Meta, Outlet, Scripts } from '@remix-run/react';

export default function App() {
  return (
    <html>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
```

### Astro

```astro
---
// src/layouts/Layout.astro
import 'liquidify-react/styles';
---

<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>{Astro.props.title}</title>
  </head>
  <body>
    <slot />
  </body>
</html>
```

## Verify Installation

Test that everything is working:

```tsx
import { Button } from 'liquidify-react/button';

export default function TestPage() {
  return (
    <Button onClick={() => alert('LiqUIdify works!')}>
      Click Me
    </Button>
  );
}
```

If you see a styled button that shows an alert when clicked, you're all set! 🎉

## Next Steps

- **[Quick Start](./quick-start.md)** - Build your first component
- **[Framework Guides](../guides/)** - Framework-specific setup
- **[Theming](../theming/overview.md)** - Customize the design system

## Troubleshooting

### "Cannot find module 'liquidify-react'"

Make sure you've installed the package:
```bash
bun add liquidify-react
```

### Styles not showing

Ensure you've imported the CSS at your app's entry point:
```tsx
import 'liquidify-react/styles';
```

### TypeScript errors with peer dependencies

Install all peer dependencies and their type definitions:
```bash
bun add -D @types/react @types/react-dom
```

### Build errors with "export * from"

This is usually a bundler configuration issue. See the [framework-specific guides](../guides/) for your setup.

---

**Need more help?** Check the [Troubleshooting Guide](../troubleshooting.md) or [open an issue](https://github.com/tuliopc23/LiqUIdify/issues).
