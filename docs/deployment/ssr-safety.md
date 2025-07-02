# SSR-Safe Import Guidance

## Overview

LiquidUI components are designed to work seamlessly with Server-Side Rendering (SSR) frameworks like Next.js, Remix, and Gatsby. This guide covers best practices for SSR-safe usage.

## SSR Compatibility Strategy

### Core Principles

1. **No DOM Access During Initial Render**: Components avoid accessing `window`, `document`, or other browser APIs during SSR
2. **Progressive Enhancement**: Features that require browser APIs are added after hydration
3. **Graceful Degradation**: SSR renders work without client-side JavaScript
4. **Hydration Safety**: No mismatches between server and client renders

## Import Strategies

### 1. Static Imports (Recommended)

```typescript
// ✅ Safe: Standard import - components are SSR-ready
import { GlassButton, GlassCard } from '@tuliocunha23/liquidui';

export function MyComponent() {
  return (
    <GlassCard>
      <h1>Server-side rendered content</h1>
      <GlassButton>Click me</GlassButton>
    </GlassCard>
  );
}
```

### 2. Dynamic Imports for Client-Only Features

```typescript
// ✅ Safe: Dynamic import for browser-only features
import { useState, useEffect } from 'react';
import { GlassCard } from '@tuliocunha23/liquidui';

export function InteractiveComponent() {
  const [clientOnlyFeature, setClientOnlyFeature] = useState(null);

  useEffect(() => {
    // Client-only code here
    import('@tuliocunha23/liquidui/advanced').then((module) => {
      setClientOnlyFeature(module.GlassParticles);
    });
  }, []);

  return (
    <GlassCard>
      <h1>Base content (SSR safe)</h1>
      {clientOnlyFeature && <clientOnlyFeature />}
    </GlassCard>
  );
}
```

### 3. CSS-Only Imports

```typescript
// ✅ Safe: CSS imports work in SSR
import '@tuliocunha23/liquidui/css';

// Alternative: Individual component styles
import '@tuliocunha23/liquidui/components/button.css';
```

## useEffect Guards for Browser APIs

### Window Object Access

```typescript
import { useEffect, useState } from 'react';
import { GlassButton } from '@tuliocunha23/liquidui';

export function ResponsiveComponent() {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // ✅ Safe: Window access only after component mounts
    if (typeof window !== 'undefined') {
      const handleResize = () => setWindowWidth(window.innerWidth);
      
      // Set initial value
      setWindowWidth(window.innerWidth);
      
      // Add event listener
      window.addEventListener('resize', handleResize);
      
      // Cleanup
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <GlassButton size={windowWidth > 768 ? 'lg' : 'md'}>
      Responsive Button
    </GlassButton>
  );
}
```

### Local Storage Access

```typescript
import { useEffect, useState } from 'react';

export function ThemeAwareComponent() {
  const [theme, setTheme] = useState('light'); // Safe default

  useEffect(() => {
    // ✅ Safe: localStorage access only after mount
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        setTheme(savedTheme);
      }
    }
  }, []);

  useEffect(() => {
    // ✅ Safe: Save to localStorage only on client
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  return (
    <div data-theme={theme}>
      {/* Component content */}
    </div>
  );
}
```

### Intersection Observer Usage

```typescript
import { useEffect, useRef, useState } from 'react';
import { GlassCard } from '@tuliocunha23/liquidui';

export function LazyAnimationComponent() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ✅ Safe: IntersectionObserver only on client
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        ([entry]) => setIsVisible(entry.isIntersecting),
        { threshold: 0.1 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => observer.disconnect();
    } else {
      // Fallback: Show content immediately if no IntersectionObserver
      setIsVisible(true);
    }
  }, []);

  return (
    <GlassCard 
      ref={ref}
      className={isVisible ? 'animate-glass-fade-in' : 'opacity-0'}
    >
      Content appears when visible
    </GlassCard>
  );
}
```

## Framework-Specific Guidance

### Next.js App Router

```typescript
// app/components/GlassComponents.tsx
'use client'; // Mark as client component if using browser APIs

import { useEffect, useState } from 'react';
import { GlassButton } from '@tuliocunha23/liquidui';

export function ClientOnlyGlassButton() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder that matches the hydrated component
    return <button className="glass-effect">Loading...</button>;
  }

  return <GlassButton>Hydrated Button</GlassButton>;
}
```

```typescript
// app/page.tsx
import { GlassCard } from '@tuliocunha23/liquidui';
import { ClientOnlyGlassButton } from './components/GlassComponents';

export default function Page() {
  return (
    <main>
      {/* ✅ Safe: SSR-ready components */}
      <GlassCard>
        <h1>Server Rendered Title</h1>
        
        {/* ✅ Safe: Client-only component with proper hydration */}
        <ClientOnlyGlassButton />
      </GlassCard>
    </main>
  );
}
```

### Next.js Pages Router

```typescript
// pages/index.tsx
import { GetServerSideProps } from 'next';
import { GlassCard, GlassButton } from '@tuliocunha23/liquidui';

interface Props {
  serverData: any;
}

export default function HomePage({ serverData }: Props) {
  return (
    <GlassCard>
      <h1>SSR Content: {serverData.title}</h1>
      <GlassButton>Interactive Button</GlassButton>
    </GlassCard>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      serverData: { title: 'Server Generated' }
    }
  };
};
```

### Remix

```typescript
// app/routes/_index.tsx
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { GlassCard, GlassButton } from '@tuliocunha23/liquidui';

export async function loader() {
  return json({ message: 'Hello from server' });
}

export default function Index() {
  const { message } = useLoaderData<typeof loader>();

  return (
    <GlassCard>
      <h1>{message}</h1>
      <GlassButton>Remix Button</GlassButton>
    </GlassCard>
  );
}
```

### Gatsby

```typescript
// src/pages/index.tsx
import React from 'react';
import { GlassCard, GlassButton } from '@tuliocunha23/liquidui';

const HomePage: React.FC = () => {
  return (
    <main>
      <GlassCard>
        <h1>Gatsby + LiquidUI</h1>
        <GlassButton>Static Button</GlassButton>
      </GlassCard>
    </main>
  );
};

export default HomePage;

// For client-only features
export { default } from '../components/ClientOnlyPage';
```

## Common SSR Pitfalls and Solutions

### 1. Hydration Mismatches

❌ **Problem**: Different content on server vs client
```typescript
// DON'T: Will cause hydration mismatch
export function BadComponent() {
  const randomValue = Math.random(); // Different on server/client
  
  return <GlassButton>{randomValue}</GlassButton>;
}
```

✅ **Solution**: Use useEffect for client-only values
```typescript
export function GoodComponent() {
  const [randomValue, setRandomValue] = useState<number | null>(null);
  
  useEffect(() => {
    setRandomValue(Math.random());
  }, []);
  
  return (
    <GlassButton>
      {randomValue ?? 'Loading...'}
    </GlassButton>
  );
}
```

### 2. Accessing DOM During Render

❌ **Problem**: DOM access during render
```typescript
// DON'T: Will fail on server
export function BadComponent() {
  const width = window.innerWidth; // Error: window is undefined
  
  return <GlassCard width={width}>Content</GlassCard>;
}
```

✅ **Solution**: Use useEffect for DOM access
```typescript
export function GoodComponent() {
  const [width, setWidth] = useState(0);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWidth(window.innerWidth);
    }
  }, []);
  
  return <GlassCard style={{ width }}>Content</GlassCard>;
}
```

### 3. CSS Flicker Issues

❌ **Problem**: Flash of unstyled content
```typescript
// DON'T: May cause FOUC
export function BadComponent() {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => setIsClient(true), []);
  
  return isClient ? <GlassButton /> : null; // Sudden appearance
}
```

✅ **Solution**: Provide consistent fallback
```typescript
export function GoodComponent() {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => setIsClient(true), []);
  
  return (
    <button className={isClient ? 'glass-effect' : 'glass-fallback'}>
      Button
    </button>
  );
}
```

## Testing SSR Compatibility

### 1. Manual Testing

```bash
# Test in Node.js environment
node -e "
  const { JSDOM } = require('jsdom');
  global.window = new JSDOM().window;
  global.document = window.document;
  
  const React = require('react');
  const { renderToString } = require('react-dom/server');
  const { GlassButton } = require('@tuliocunha23/liquidui');
  
  const html = renderToString(React.createElement(GlassButton, {}, 'Test'));
  console.log('SSR Test:', html.includes('glass-effect'));
"
```

### 2. Automated Testing

```typescript
// __tests__/ssr.test.tsx
import { renderToString } from 'react-dom/server';
import { GlassButton } from '@tuliocunha23/liquidui';

describe('SSR Compatibility', () => {
  test('components render on server', () => {
    const html = renderToString(<GlassButton>Test</GlassButton>);
    expect(html).toContain('glass-effect');
    expect(html).toContain('Test');
  });

  test('no DOM access during SSR', () => {
    // Mock console.error to catch React warnings
    const consoleSpy = jest.spyOn(console, 'error');
    
    renderToString(<GlassButton>Test</GlassButton>);
    
    // Should not have any hydration warnings
    expect(consoleSpy).not.toHaveBeenCalled();
    
    consoleSpy.mockRestore();
  });
});
```

## Production Checklist

- [ ] All components render without errors in Node.js environment
- [ ] No `window` or `document` access during initial render
- [ ] useEffect guards protect all browser API usage
- [ ] CSS imports work correctly in SSR
- [ ] No hydration mismatches in development
- [ ] Proper fallbacks for client-only features
- [ ] Performance impact of SSR is acceptable
- [ ] Error boundaries handle SSR failures gracefully

## Performance Optimization

### Critical CSS Extraction

```typescript
// Extract critical CSS for above-the-fold content
const criticalGlassClasses = [
  'glass-effect',
  'glass-bg-primary',
  'text-text-primary'
];

// Use in your build process to inline critical styles
```

### Lazy Loading Non-Critical Features

```typescript
import { lazy, Suspense } from 'react';

const AdvancedGlassFeatures = lazy(() => 
  import('@tuliocunha23/liquidui/advanced')
);

export function OptimizedComponent() {
  return (
    <Suspense fallback={<div>Loading advanced features...</div>}>
      <AdvancedGlassFeatures />
    </Suspense>
  );
}
```

This comprehensive SSR guidance ensures that LiquidUI components work reliably across all major SSR frameworks while maintaining optimal performance and user experience.
