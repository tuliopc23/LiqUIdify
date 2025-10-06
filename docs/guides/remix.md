# Remix Integration

Complete guide for using LiqUIdify with Remix.

## Installation

```bash
bun add liquidify-react react react-dom @ark-ui/react framer-motion lucide-react
```

## Setup

### 1. Import Styles

Add the CSS import to your root layout:

```tsx
// app/root.tsx
import 'liquidify-react/styles';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
```

### 2. Use Components

```tsx
// app/routes/_index.tsx
import { Button } from 'liquidify-react/button';
import { Card } from 'liquidify-react/card';

export default function Index() {
  return (
    <main style={{ padding: '2rem' }}>
      <Card>
        <h1>Welcome to LiqUIdify + Remix</h1>
        <Button>Click Me</Button>
      </Card>
    </main>
  );
}
```

### 3. Add Theming

Create a client-only theme provider:

```tsx
// app/components/providers.tsx
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

Update your root to use the provider:

```tsx
// app/root.tsx
import 'liquidify-react/styles';
import { Providers } from './components/providers';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Providers>
          <Outlet />
        </Providers>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
```

## Dark Mode Toggle

```tsx
// app/components/theme-toggle.tsx
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
// app/routes/_index.tsx
import { ThemeToggle } from '~/components/theme-toggle';
import { Card } from 'liquidify-react/card';

export default function Index() {
  return (
    <main style={{ padding: '2rem' }}>
      <ThemeToggle />
      <Card>
        <h1>Welcome to Remix + LiqUIdify</h1>
      </Card>
    </main>
  );
}
```

## Using with Loaders

Remix's loader data works seamlessly with LiqUIdify:

```tsx
// app/routes/products.tsx
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Card } from 'liquidify-react/card';
import { Badge } from 'liquidify-react/badge';
import type { LoaderFunctionArgs } from '@remix-run/node';

export async function loader({ request }: LoaderFunctionArgs) {
  const products = await fetch('https://api.example.com/products').then(r => r.json());
  return json({ products });
}

export default function Products() {
  const { products } = useLoaderData<typeof loader>();

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

## Using with Actions

Forms with LiqUIdify components:

```tsx
// app/routes/contact.tsx
import { json, redirect } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import { Button } from 'liquidify-react/button';
import { Card } from 'liquidify-react/card';
import type { ActionFunctionArgs } from '@remix-run/node';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get('email');
  
  // Validate
  if (!email || typeof email !== 'string') {
    return json({ error: 'Email is required' }, { status: 400 });
  }

  // Process form
  await sendEmail(email);
  
  return redirect('/success');
}

export default function Contact() {
  const actionData = useActionData<typeof action>();

  return (
    <main style={{ padding: '2rem' }}>
      <Card>
        <h1>Contact Us</h1>
        <Form method="post">
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              style={{
                width: '100%',
                padding: '0.5rem',
                marginTop: '0.5rem'
              }}
            />
            {actionData?.error && (
              <p style={{ color: 'red', fontSize: '0.875rem' }}>
                {actionData.error}
              </p>
            )}
          </div>
          <Button type="submit">Send</Button>
        </Form>
      </Card>
    </main>
  );
}
```

## TypeScript Configuration

Ensure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
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

## Progressive Enhancement

LiqUIdify works great with Remix's progressive enhancement:

```tsx
// app/routes/subscribe.tsx
import { Form, useNavigation } from '@remix-run/react';
import { Button } from 'liquidify-react/button';
import { Progress } from 'liquidify-react/ark-ui/progress';

export default function Subscribe() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Form method="post">
      <input type="email" name="email" required />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Subscribing...' : 'Subscribe'}
      </Button>
      {isSubmitting && <Progress value={null} />}
    </Form>
  );
}
```

## Error Boundaries

Use LiqUIdify components in error boundaries:

```tsx
// app/root.tsx
import { isRouteErrorResponse, useRouteError } from '@remix-run/react';
import { Card } from 'liquidify-react/card';
import { Button } from 'liquidify-react/button';

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <html lang="en">
        <head>
          <title>{error.status} {error.statusText}</title>
          <Meta />
          <Links />
        </head>
        <body>
          <main style={{ padding: '2rem' }}>
            <Card>
              <h1>{error.status} {error.statusText}</h1>
              <p>{error.data}</p>
              <Button onClick={() => window.location.href = '/'}>
                Go Home
              </Button>
            </Card>
          </main>
          <Scripts />
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <head>
        <title>Error!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <main style={{ padding: '2rem' }}>
          <Card>
            <h1>Oops! Something went wrong</h1>
            <Button onClick={() => window.location.href = '/'}>
              Go Home
            </Button>
          </Card>
        </main>
        <Scripts />
      </body>
    </html>
  );
}
```

## Best Practices

### 1. Code Splitting

Remix automatically code-splits by route. Use dynamic imports for heavy components:

```tsx
import { lazy, Suspense } from 'react';

const ColorPicker = lazy(() => 
  import('liquidify-react/ark-ui/colorPicker').then(m => ({ default: m.ColorPicker }))
);

export default function Settings() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ColorPicker />
    </Suspense>
  );
}
```

### 2. Prefetching

Use Remix's prefetch with LiqUIdify:

```tsx
import { Link } from '@remix-run/react';

export default function Navigation() {
  return (
    <nav>
      <Link to="/products" prefetch="intent">
        Products
      </Link>
    </nav>
  );
}
```

### 3. Optimistic UI

Combine Remix's optimistic UI with LiqUIdify:

```tsx
import { useFetcher } from '@remix-run/react';
import { Button } from 'liquidify-react/button';
import { Toast } from 'liquidify-react/ark-ui/toast';

export function LikeButton({ postId, initialLikes }) {
  const fetcher = useFetcher();
  const likes = fetcher.formData 
    ? Number(fetcher.formData.get('likes'))
    : initialLikes;

  return (
    <fetcher.Form method="post" action={`/posts/${postId}/like`}>
      <input type="hidden" name="likes" value={likes + 1} />
      <Button type="submit">
        ❤️ {likes}
      </Button>
    </fetcher.Form>
  );
}
```

## Troubleshooting

### Styles not loading

Make sure CSS is imported in `app/root.tsx`:

```tsx
import 'liquidify-react/styles';
```

### Hydration mismatch

This can happen with ThemeProvider. Ensure it's client-only:

```tsx
// app/components/providers.tsx
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
// app/root.tsx
import 'liquidify-react/styles';
import { Providers } from './components/providers';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Providers>
          <Outlet />
        </Providers>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
```

```tsx
// app/components/providers.tsx
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

```tsx
// app/routes/_index.tsx
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Button } from 'liquidify-react/button';
import { Card } from 'liquidify-react/card';
import { ThemeToggle } from '~/components/theme-toggle';

export async function loader() {
  return json({ message: 'Welcome to Remix + LiqUIdify!' });
}

export default function Index() {
  const { message } = useLoaderData<typeof loader>();

  return (
    <main style={{ padding: '2rem' }}>
      <ThemeToggle />
      <Card>
        <h1>{message}</h1>
        <p>100% Apple HIG compliant components</p>
        <Button>Get Started</Button>
      </Card>
    </main>
  );
}
```

---

**Next:** [Vite Integration](./vite.md) | [TanStack Start](./tanstack-start.md)
