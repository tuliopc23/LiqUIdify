# Astro Integration

Complete guide for using LiqUIdify with Astro and React islands.

## Installation

```bash
bun add liquidify-react react react-dom @ark-ui/react framer-motion lucide-react
```

## Setup

### 1. Create Astro Project (if needed)

```bash
# Create new Astro project
bun create astro@latest my-app

cd my-app
bun install

# Add React integration
bunx astro add react

# Add LiqUIdify
bun add liquidify-react @ark-ui/react framer-motion lucide-react
```

### 2. Configure Astro

Update your `astro.config.mjs`:

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
  vite: {
    ssr: {
      noExternal: ['liquidify-react', '@ark-ui/react'],
    },
  },
});
```

### 3. Import Styles

Add the CSS import to your layout:

```astro
---
// src/layouts/Layout.astro
import 'liquidify-react/styles';

interface Props {
  title: string;
}

const { title } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>{title}</title>
  </head>
  <body>
    <slot />
  </body>
</html>
```

### 4. Use Components in React Islands

Create a React component:

```tsx
// src/components/Welcome.tsx
import { Button } from 'liquidify-react/button';
import { Card } from 'liquidify-react/card';

export function Welcome() {
  return (
    <Card>
      <h1>Welcome to Astro + LiqUIdify</h1>
      <Button onClick={() => alert('Hello from LiqUIdify!')}>
        Click Me
      </Button>
    </Card>
  );
}
```

Use it in your Astro page:

```astro
---
// src/pages/index.astro
import Layout from '../layouts/Layout.astro';
import { Welcome } from '../components/Welcome';
---

<Layout title="Home">
  <main style="padding: 2rem;">
    <Welcome client:load />
  </main>
</Layout>
```

## Client Directives

Astro's client directives control when React components hydrate:

### client:load

Hydrate immediately on page load (best for interactive components):

```astro
<Welcome client:load />
```

### client:idle

Hydrate when the browser is idle (best for lower priority components):

```astro
<SidebarMenu client:idle />
```

### client:visible

Hydrate when the component enters the viewport (best for below-the-fold content):

```astro
<CommentsSection client:visible />
```

### client:only

Skip SSR, only render on the client:

```astro
<ColorPicker client:only="react" />
```

## Theming

Create a themed provider component:

```tsx
// src/components/Providers.tsx
import { ThemeProvider } from 'liquidify-react/theme';
import type { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider defaultMode="system" accentPreset="blue">
      {children}
    </ThemeProvider>
  );
}
```

Update your layout:

```astro
---
// src/layouts/Layout.astro
import 'liquidify-react/styles';
import { Providers } from '../components/Providers';

interface Props {
  title: string;
}

const { title } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>{title}</title>
  </head>
  <body>
    <Providers client:load>
      <slot />
    </Providers>
  </body>
</html>
```

## Dark Mode Toggle

```tsx
// src/components/ThemeToggle.tsx
import { Button } from 'liquidify-react/button';
import { useTheme } from 'liquidify-react/theme';

export function ThemeToggle() {
  const { mode, setMode } = useTheme();

  return (
    <Button onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
      {mode === 'light' ? '🌙 Dark' : '☀️ Light'}
    </Button>
  );
}
```

Use in your page:

```astro
---
import Layout from '../layouts/Layout.astro';
import { ThemeToggle } from '../components/ThemeToggle';
---

<Layout title="Home">
  <ThemeToggle client:load />
</Layout>
```

## MDX Support

Install MDX:

```bash
bunx astro add mdx
```

Use LiqUIdify components in MDX:

```mdx
---
// src/pages/blog/post.mdx
title: My Blog Post
---

import { Button } from 'liquidify-react/button';
import { Card } from 'liquidify-react/card';

# My Blog Post

<Card client:load>
  This is a card in MDX!
  
  <Button client:load onClick={() => alert('Hello!')}>
    Click Me
  </Button>
</Card>
```

## Content Collections

Use LiqUIdify with Astro's content collections:

```ts
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    author: z.string(),
  }),
});

export const collections = {
  blog: blogCollection,
};
```

```astro
---
// src/pages/blog/[...slug].astro
import { getCollection, getEntry } from 'astro:content';
import Layout from '../../layouts/Layout.astro';
import { Card } from 'liquidify-react/card';
import { Badge } from 'liquidify-react/badge';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await post.render();
---

<Layout title={post.data.title}>
  <article style="padding: 2rem; max-width: 800px; margin: 0 auto;">
    <Card client:load>
      <h1>{post.data.title}</h1>
      <Badge client:load>{post.data.author}</Badge>
      <p>{post.data.date.toLocaleDateString()}</p>
      <Content />
    </Card>
  </article>
</Layout>
```

## Server-Side Data Fetching

Fetch data in Astro frontmatter and pass to React components:

```astro
---
// src/pages/products.astro
import Layout from '../layouts/Layout.astro';
import { ProductGrid } from '../components/ProductGrid';

const products = await fetch('https://api.example.com/products')
  .then(r => r.json());
---

<Layout title="Products">
  <main style="padding: 2rem;">
    <ProductGrid products={products} client:load />
  </main>
</Layout>
```

```tsx
// src/components/ProductGrid.tsx
import { Card } from 'liquidify-react/card';
import { Badge } from 'liquidify-react/badge';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
}

interface Props {
  products: Product[];
}

export function ProductGrid({ products }: Props) {
  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      {products.map((product) => (
        <Card key={product.id}>
          <h2>{product.name}</h2>
          <Badge>{product.category}</Badge>
          <p>${product.price}</p>
        </Card>
      ))}
    </div>
  );
}
```

## View Transitions

Use Astro's View Transitions with LiqUIdify:

```astro
---
// src/layouts/Layout.astro
import 'liquidify-react/styles';
import { ViewTransitions } from 'astro:transitions';

interface Props {
  title: string;
}

const { title } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>{title}</title>
    <ViewTransitions />
  </head>
  <body>
    <slot />
  </body>
</html>
```

## TypeScript Configuration

Ensure your `tsconfig.json` includes:

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"]
    }
  }
}
```

## Best Practices

### 1. Use Client Directives Wisely

```astro
<!-- ✅ Good: Only hydrate interactive components -->
<ThemeToggle client:load />
<StaticCard />

<!-- ❌ Bad: Hydrating everything -->
<Card client:load>
  <p>Static content that doesn't need JavaScript</p>
</Card>
```

### 2. Optimize Bundle Size

Use subpath imports:

```tsx
// ✅ Good
import { Button } from 'liquidify-react/button';

// ⚠️ Larger bundle
import { Button } from 'liquidify-react';
```

### 3. Lazy Load Heavy Components

```astro
---
import { ColorPicker } from '../components/ColorPicker';
---

<!-- Only load when visible -->
<ColorPicker client:visible />
```

## Static Site Generation

Build a static site with Astro + LiqUIdify:

```bash
bun run build
```

Preview:

```bash
bun run preview
```

Deploy to any static host (Vercel, Netlify, Cloudflare Pages, etc.).

## Server-Side Rendering (SSR)

Enable SSR with an adapter:

```bash
# Vercel
bunx astro add vercel

# Netlify
bunx astro add netlify

# Node
bunx astro add node
```

Update config:

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  output: 'server', // or 'hybrid'
  adapter: vercel(),
  integrations: [react()],
});
```

## Troubleshooting

### Styles not loading

Ensure CSS is imported in your layout:

```astro
---
import 'liquidify-react/styles';
---
```

### Components not hydrating

Make sure you're using a client directive:

```astro
<Welcome client:load />
```

### TypeScript errors

Install type definitions:

```bash
bun add -D @types/react @types/react-dom
```

### Build errors with peer dependencies

Add to `vite.ssr.noExternal` in `astro.config.mjs`:

```js
export default defineConfig({
  vite: {
    ssr: {
      noExternal: ['liquidify-react', '@ark-ui/react', 'framer-motion'],
    },
  },
});
```

## Complete Example

```astro
---
// src/layouts/Layout.astro
import 'liquidify-react/styles';
import { Providers } from '../components/Providers';

interface Props {
  title: string;
}

const { title } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>{title}</title>
  </head>
  <body>
    <Providers client:load>
      <slot />
    </Providers>
  </body>
</html>
```

```astro
---
// src/pages/index.astro
import Layout from '../layouts/Layout.astro';
import { Welcome } from '../components/Welcome';
import { ThemeToggle } from '../components/ThemeToggle';

const products = await fetch('https://api.example.com/products')
  .then(r => r.json());
---

<Layout title="Home">
  <main style="padding: 2rem;">
    <ThemeToggle client:load />
    <Welcome client:load />
    
    <div style="margin-top: 2rem;">
      <h2>Products</h2>
      <!-- Server-rendered, no JS needed -->
      {products.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  </main>
</Layout>
```

```tsx
// src/components/Welcome.tsx
import { Button } from 'liquidify-react/button';
import { Card } from 'liquidify-react/card';

export function Welcome() {
  return (
    <Card>
      <h1>Welcome to Astro + LiqUIdify</h1>
      <p>100% Apple HIG compliant components</p>
      <Button onClick={() => alert('Hello!')}>
        Get Started
      </Button>
    </Card>
  );
}
```

---

**Next:** [Component Documentation](../components/overview.md) | [Theming Guide](../theming/overview.md)
