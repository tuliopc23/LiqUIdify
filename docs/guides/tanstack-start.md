# TanStack Start Integration

Complete guide for using LiqUIdify with TanStack Start (formerly Vite SSR).

## Installation

```bash
bun add liquidify-react react react-dom @ark-ui/react framer-motion lucide-react
```

## Setup

### 1. Create TanStack Start Project (if needed)

```bash
# Create new TanStack Start project
bun create @tanstack/start my-app

cd my-app
bun install
bun add liquidify-react @ark-ui/react framer-motion lucide-react
```

### 2. Import Styles

Add the CSS import to your root router:

```tsx
// app/router.tsx
import 'liquidify-react/styles';
import { createRouter as createTanStackRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

export function createRouter() {
  return createTanStackRouter({
    routeTree,
  });
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
```

Or in your root route:

```tsx
// app/routes/__root.tsx
import 'liquidify-react/styles';
import { createRootRoute, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>LiqUIdify + TanStack Start</title>
      </head>
      <body>
        <Outlet />
      </body>
    </html>
  );
}
```

### 3. Use Components

```tsx
// app/routes/index.tsx
import { createFileRoute } from '@tanstack/react-router';
import { Button } from 'liquidify-react/button';
import { Card } from 'liquidify-react/card';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <main style={{ padding: '2rem' }}>
      <Card>
        <h1>Welcome to TanStack Start + LiqUIdify</h1>
        <Button>Click Me</Button>
      </Card>
    </main>
  );
}
```

### 4. Add Theming

Create a provider component:

```tsx
// app/components/Providers.tsx
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

Update your root route:

```tsx
// app/routes/__root.tsx
import 'liquidify-react/styles';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Providers } from '../components/Providers';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>LiqUIdify + TanStack Start</title>
      </head>
      <body>
        <Providers>
          <Outlet />
        </Providers>
      </body>
    </html>
  );
}
```

## Dark Mode Toggle

```tsx
// app/components/ThemeToggle.tsx
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

Use in your route:

```tsx
// app/routes/index.tsx
import { createFileRoute } from '@tanstack/react-router';
import { Card } from 'liquidify-react/card';
import { ThemeToggle } from '../components/ThemeToggle';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <main style={{ padding: '2rem' }}>
      <ThemeToggle />
      <Card>
        <h1>TanStack Start + LiqUIdify</h1>
      </Card>
    </main>
  );
}
```

## Data Loading with Loaders

TanStack Start's loaders work seamlessly with LiqUIdify:

```tsx
// app/routes/products.tsx
import { createFileRoute } from '@tanstack/react-router';
import { Card } from 'liquidify-react/card';
import { Badge } from 'liquidify-react/badge';

export const Route = createFileRoute('/products')({
  loader: async () => {
    const products = await fetch('https://api.example.com/products')
      .then(r => r.json());
    return { products };
  },
  component: Products,
});

function Products() {
  const { products } = Route.useLoaderData();

  return (
    <div style={{ padding: '2rem', display: 'grid', gap: '1rem' }}>
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

## Search Params

Handle search parameters with LiqUIdify:

```tsx
// app/routes/search.tsx
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { Card } from 'liquidify-react/card';

const searchSchema = z.object({
  q: z.string().optional(),
  page: z.number().optional(),
});

export const Route = createFileRoute('/search')({
  validateSearch: searchSchema,
  component: Search,
});

function Search() {
  const { q, page } = Route.useSearch();

  return (
    <main style={{ padding: '2rem' }}>
      <Card>
        <h1>Search Results</h1>
        <p>Query: {q}</p>
        <p>Page: {page || 1}</p>
      </Card>
    </main>
  );
}
```

## Navigation

Use TanStack Router's Link with LiqUIdify:

```tsx
// app/components/Navigation.tsx
import { Link } from '@tanstack/react-router';
import { Button } from 'liquidify-react/button';

export function Navigation() {
  return (
    <nav style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
      <Link to="/">
        <Button variant="ghost">Home</Button>
      </Link>
      <Link to="/about">
        <Button variant="ghost">About</Button>
      </Link>
      <Link to="/products">
        <Button variant="ghost">Products</Button>
      </Link>
    </nav>
  );
}
```

## Error Handling

Create error boundaries with LiqUIdify:

```tsx
// app/routes/__root.tsx
import { createRootRoute, Outlet, ErrorComponent } from '@tanstack/react-router';
import { Card } from 'liquidify-react/card';
import { Button } from 'liquidify-react/button';

export const Route = createRootRoute({
  component: RootComponent,
  errorComponent: ErrorBoundary,
});

function RootComponent() {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <Outlet />
      </body>
    </html>
  );
}

function ErrorBoundary({ error }: { error: Error }) {
  return (
    <main style={{ padding: '2rem' }}>
      <Card>
        <h1>Oops! Something went wrong</h1>
        <p>{error.message}</p>
        <Button onClick={() => window.location.href = '/'}>
          Go Home
        </Button>
      </Card>
    </main>
  );
}
```

## Pending States

Show loading states with TanStack Router:

```tsx
// app/routes/products.tsx
import { createFileRoute } from '@tanstack/react-router';
import { Card } from 'liquidify-react/card';
import { Progress } from 'liquidify-react/ark-ui/progress';

export const Route = createFileRoute('/products')({
  loader: async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const products = await fetch('https://api.example.com/products')
      .then(r => r.json());
    return { products };
  },
  pendingComponent: () => (
    <div style={{ padding: '2rem' }}>
      <Card>
        <Progress value={null} />
        <p>Loading products...</p>
      </Card>
    </div>
  ),
  component: Products,
});

function Products() {
  const { products } = Route.useLoaderData();
  // ... render products
}
```

## TypeScript Configuration

Ensure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": ".",
    "paths": {
      "~/*": ["./app/*"]
    }
  }
}
```

## Server Functions

Use server functions with LiqUIdify components:

```tsx
// app/routes/api/subscribe.tsx
import { createServerFn } from '@tanstack/start';
import { z } from 'zod';

const subscribeSchema = z.object({
  email: z.string().email(),
});

export const subscribe = createServerFn('POST', async (data: unknown) => {
  const { email } = subscribeSchema.parse(data);
  
  // Process subscription
  await sendEmail(email);
  
  return { success: true };
});
```

```tsx
// app/routes/subscribe.tsx
import { createFileRoute } from '@tanstack/react-router';
import { Button } from 'liquidify-react/button';
import { Card } from 'liquidify-react/card';
import { subscribe } from './api/subscribe';
import { useState } from 'react';

export const Route = createFileRoute('/subscribe')({
  component: Subscribe,
});

function Subscribe() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await subscribe({ data: { email } });
      alert('Subscribed successfully!');
    } catch (error) {
      alert('Error subscribing');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: '2rem' }}>
      <Card>
        <h1>Subscribe</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.5rem',
              marginBottom: '1rem',
            }}
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </form>
      </Card>
    </main>
  );
}
```

## Best Practices

### 1. Code Splitting

TanStack Start automatically code-splits by route. For heavy components:

```tsx
import { lazy, Suspense } from 'react';
import { Progress } from 'liquidify-react/ark-ui/progress';

const ColorPicker = lazy(() => 
  import('liquidify-react/ark-ui/colorPicker').then(m => ({ 
    default: m.ColorPicker 
  }))
);

export function Settings() {
  return (
    <Suspense fallback={<Progress value={null} />}>
      <ColorPicker />
    </Suspense>
  );
}
```

### 2. Prefetching

Use TanStack Router's prefetching:

```tsx
import { Link } from '@tanstack/react-router';
import { Button } from 'liquidify-react/button';

export function Navigation() {
  return (
    <Link to="/products" preload="intent">
      <Button>Products</Button>
    </Link>
  );
}
```

### 3. Type-Safe Routing

Leverage TanStack Router's type safety:

```tsx
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Button } from 'liquidify-react/button';

export const Route = createFileRoute('/products/$productId')({
  component: Product,
});

function Product() {
  const { productId } = Route.useParams();
  const navigate = useNavigate();

  return (
    <div>
      <h1>Product {productId}</h1>
      <Button onClick={() => navigate({ to: '/products' })}>
        Back to Products
      </Button>
    </div>
  );
}
```

## Troubleshooting

### Styles not loading

Ensure CSS is imported in your root router or root route:

```tsx
import 'liquidify-react/styles';
```

### Hydration mismatch

TanStack Start handles hydration automatically. If you get mismatches, ensure ThemeProvider is in a client component:

```tsx
// app/components/Providers.tsx
import { ThemeProvider } from 'liquidify-react/theme';

export function Providers({ children }) {
  return (
    <ThemeProvider defaultMode="system">
      {children}
    </ThemeProvider>
  );
}
```

### TypeScript errors

Install type definitions:

```bash
bun add -D @types/react @types/react-dom
```

## Complete Example

```tsx
// app/routes/__root.tsx
import 'liquidify-react/styles';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Providers } from '../components/Providers';
import { Navigation } from '../components/Navigation';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>LiqUIdify + TanStack Start</title>
      </head>
      <body>
        <Providers>
          <Navigation />
          <Outlet />
        </Providers>
      </body>
    </html>
  );
}
```

```tsx
// app/routes/index.tsx
import { createFileRoute } from '@tanstack/react-router';
import { Button } from 'liquidify-react/button';
import { Card } from 'liquidify-react/card';
import { ThemeToggle } from '../components/ThemeToggle';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <main style={{ padding: '2rem' }}>
      <ThemeToggle />
      <Card>
        <h1>Welcome to TanStack Start + LiqUIdify</h1>
        <p>100% Apple HIG compliant components</p>
        <Button>Get Started</Button>
      </Card>
    </main>
  );
}
```

---

**Next:** [Astro Integration](./astro.md) | [Component Docs](../components/overview.md)
