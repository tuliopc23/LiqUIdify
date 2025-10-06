# Next.js Integration

Complete guide for using LiqUIdify with Next.js 13+ (App Router) and Next.js 12 (Pages Router).

## App Router (Next.js 13+)

### 1. Installation

```bash
bun add liquidify-react react react-dom @ark-ui/react framer-motion lucide-react
```

### 2. Import Styles

Add the CSS import to your root layout:

```tsx
// app/layout.tsx
import 'liquidify-react/styles';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My App',
  description: 'Built with LiqUIdify',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### 3. Use Components

```tsx
// app/page.tsx
import { Button } from 'liquidify-react/button';
import { Card } from 'liquidify-react/card';

export default function Home() {
  return (
    <main style={{ padding: '2rem' }}>
      <Card>
        <h1>Welcome to LiqUIdify + Next.js</h1>
        <Button>Click Me</Button>
      </Card>
    </main>
  );
}
```

### 4. Add Theming (Optional)

LiqUIdify's `ThemeProvider` needs client-side state, so create a client component:

```tsx
// app/providers.tsx
'use client';

import { ThemeProvider } from 'liquidify-react/theme';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultMode="system" accentPreset="blue">
      {children}
    </ThemeProvider>
  );
}
```

Update your layout to use the provider:

```tsx
// app/layout.tsx
import 'liquidify-react/styles';
import { Providers } from './providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

### 5. Interactive Components

For components with client-side interactions, use the `'use client'` directive:

```tsx
// app/components/counter.tsx
'use client';

import { Button } from 'liquidify-react/button';
import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <Button onClick={() => setCount(count + 1)}>
        Increment
      </Button>
    </div>
  );
}
```

Use in your page:

```tsx
// app/page.tsx
import { Counter } from './components/counter';

export default function Home() {
  return (
    <main>
      <Counter />
    </main>
  );
}
```

## Pages Router (Next.js 12)

### 1. Installation

```bash
bun add liquidify-react react react-dom @ark-ui/react framer-motion lucide-react
```

### 2. Import Styles

Add the CSS import to `_app.tsx`:

```tsx
// pages/_app.tsx
import 'liquidify-react/styles';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
```

### 3. Use Components

```tsx
// pages/index.tsx
import { Button } from 'liquidify-react/button';
import { Card } from 'liquidify-react/card';

export default function Home() {
  return (
    <main style={{ padding: '2rem' }}>
      <Card>
        <h1>Welcome to LiqUIdify + Next.js</h1>
        <Button>Click Me</Button>
      </Card>
    </main>
  );
}
```

### 4. Add Theming (Optional)

```tsx
// pages/_app.tsx
import 'liquidify-react/styles';
import { ThemeProvider } from 'liquidify-react/theme';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider defaultMode="system" accentPreset="blue">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
```

## Dark Mode Toggle

Create a client component for theme toggling:

```tsx
// components/theme-toggle.tsx
'use client';

import { Button } from 'liquidify-react/button';
import { useTheme } from 'liquidify-react/theme';

export function ThemeToggle() {
  const { mode, setMode } = useTheme();

  return (
    <Button onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
      {mode === 'light' ? '🌙' : '☀️'}
    </Button>
  );
}
```

Use in your page:

```tsx
// app/page.tsx (App Router)
import { ThemeToggle } from '@/components/theme-toggle';

export default function Home() {
  return (
    <main>
      <ThemeToggle />
      {/* rest of your page */}
    </main>
  );
}
```

## Server Components vs Client Components

### Server Components (Default in App Router)

Use for:
- Static content
- Data fetching
- SEO-optimized pages

```tsx
// app/products/page.tsx (Server Component)
import { Card } from 'liquidify-react/card';
import { Badge } from 'liquidify-react/badge';

export default async function ProductsPage() {
  const products = await fetch('https://api.example.com/products').then(r => r.json());

  return (
    <div>
      {products.map(product => (
        <Card key={product.id}>
          <h2>{product.name}</h2>
          <Badge>{product.category}</Badge>
          <p>{product.price}</p>
        </Card>
      ))}
    </div>
  );
}
```

### Client Components

Use for:
- Interactive components (onClick, onChange, etc.)
- React hooks (useState, useEffect, etc.)
- Browser APIs (window, localStorage, etc.)

```tsx
// app/components/search.tsx
'use client';

import { useState } from 'react';
import { Combobox } from 'liquidify-react/ark-ui/combobox';

export function Search() {
  const [value, setValue] = useState('');

  return (
    <Combobox
      value={value}
      onChange={(e) => setValue(e.value)}
      // ... other props
    />
  );
}
```

## TypeScript Configuration

Ensure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

## Best Practices

### 1. Code Splitting

Use dynamic imports for heavy components:

```tsx
import dynamic from 'next/dynamic';

const ColorPicker = dynamic(() => 
  import('liquidify-react/ark-ui/colorPicker').then(m => ({ default: m.ColorPicker })),
  { ssr: false }
);

export default function Page() {
  return <ColorPicker />;
}
```

### 2. Font Optimization

Use Next.js font optimization with SF Pro:

```tsx
// app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
```

### 3. Image Optimization

Use Next.js Image component with LiqUIdify:

```tsx
import Image from 'next/image';
import { Card } from 'liquidify-react/card';

export default function ProductCard({ product }) {
  return (
    <Card>
      <Image
        src={product.image}
        alt={product.name}
        width={300}
        height={200}
        style={{ borderRadius: '12px' }}
      />
      <h3>{product.name}</h3>
    </Card>
  );
}
```

## Troubleshooting

### "use client" directive errors

Make sure interactive components have `'use client'` at the top:

```tsx
'use client';

import { Button } from 'liquidify-react/button';
// ... rest of component
```

### Styles not loading

Ensure CSS is imported in the root layout (App Router) or `_app.tsx` (Pages Router):

```tsx
import 'liquidify-react/styles';
```

### Hydration errors

This usually happens with theme providers. Make sure the provider is in a client component:

```tsx
// app/providers.tsx
'use client';

import { ThemeProvider } from 'liquidify-react/theme';

export function Providers({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
```

### Build errors with barrel exports

Next.js 13.4+ automatically handles barrel exports. If you're on an older version, use subpath imports:

```tsx
// ✅ Works on all versions
import { Button } from 'liquidify-react/button';

// ⚠️ Requires Next.js 13.4+
import { Button } from 'liquidify-react';
```

## Example: Complete App Router Setup

```tsx
// app/layout.tsx
import 'liquidify-react/styles';
import { Providers } from './providers';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My LiqUIdify App',
  description: '100% Apple HIG compliant',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

```tsx
// app/providers.tsx
'use client';

import { ThemeProvider } from 'liquidify-react/theme';

export function Providers({ children }) {
  return (
    <ThemeProvider defaultMode="system" accentPreset="blue">
      {children}
    </ThemeProvider>
  );
}
```

```tsx
// app/page.tsx
import { Button } from 'liquidify-react/button';
import { Card } from 'liquidify-react/card';
import { ThemeToggle } from '@/components/theme-toggle';

export default function Home() {
  return (
    <main style={{ padding: '2rem' }}>
      <ThemeToggle />
      <Card>
        <h1>Welcome to LiqUIdify</h1>
        <p>100% Apple HIG compliant components</p>
        <Button>Get Started</Button>
      </Card>
    </main>
  );
}
```

```tsx
// components/theme-toggle.tsx
'use client';

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

---

**Next:** [Remix Integration](./remix.md) | [Component Docs](../components/overview.md)
