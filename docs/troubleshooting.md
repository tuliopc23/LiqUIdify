# Troubleshooting

Common issues and solutions for LiqUIdify.

## Installation Issues

### "Cannot find module 'liquidify-react'"

**Cause:** Package not installed or wrong package name.

**Solution:**
```bash
bun add liquidify-react
```

Make sure you're importing from the correct package name:
```tsx
// ✅ Correct
import { Button } from 'liquidify-react/button';

// ❌ Wrong
import { Button } from 'liquidify';
import { Button } from '@liquidify/react';
```

---

### "Cannot find module '@ark-ui/react'"

**Cause:** Missing peer dependency.

**Solution:** Install all peer dependencies:
```bash
bun add react react-dom @ark-ui/react framer-motion lucide-react
```

---

### "Module not found: Can't resolve 'liquidify-react/styles'"

**Cause:** Typo in CSS import path.

**Solution:** Correct import statement:
```tsx
// ✅ Correct
import 'liquidify-react/styles';

// ❌ Wrong
import 'liquidify-react/style';
import 'liquidify-react/css';
import from 'liquidify-react/dist/liquidify.css';
```

---

## Styling Issues

### Styles Not Applied

**Cause:** CSS not imported.

**Solution:** Import the stylesheet once at your app's entry point:

**Next.js App Router:**
```tsx
// app/layout.tsx
import 'liquidify-react/styles';
```

**Next.js Pages Router:**
```tsx
// pages/_app.tsx
import 'liquidify-react/styles';
```

**Vite:**
```tsx
// src/main.tsx
import 'liquidify-react/styles';
```

**Remix:**
```tsx
// app/root.tsx
import 'liquidify-react/styles';
```

**Astro:**
```astro
---
// src/layouts/Layout.astro
import 'liquidify-react/styles';
---
```

---

### Components Have No Visual Styling

**Symptoms:** Components render but look unstyled (no background, borders, etc.)

**Causes & Solutions:**

1. **CSS not imported**
   ```tsx
   // Add to your app entry
   import 'liquidify-react/styles';
   ```

2. **CSS import order issue**
   ```tsx
   // ✅ Correct: LiqUIdify styles first
   import 'liquidify-react/styles';
   import './my-styles.css';

   // ❌ Wrong: LiqUIdify styles overridden
   import './my-styles.css';
   import 'liquidify-react/styles';
   ```

3. **Build tool not processing CSS**
   
   Ensure your bundler processes CSS files. For Vite/Next.js/Remix this works by default.

---

### Backdrop Blur Not Working

**Cause:** Browser doesn't support `backdrop-filter` or GPU acceleration disabled.

**Browser Support:**
- Chrome/Edge: ✅ 76+
- Safari: ✅ 9+
- Firefox: ✅ 103+

**Solutions:**

1. **Update browser** to a supported version

2. **Check for CSS overrides:**
   ```css
   /* Make sure nothing is disabling backdrop-filter */
   .my-class {
     backdrop-filter: none; /* ❌ This breaks glass effects */
   }
   ```

3. **Use sRGB fallback** (automatic in LiqUIdify)

---

## TypeScript Errors

### "Could not find a declaration file for module 'liquidify-react'"

**Cause:** Missing type definitions or TypeScript not configured.

**Solution:**

1. **Install type definitions:**
   ```bash
   bun add -D @types/react @types/react-dom
   ```

2. **Update tsconfig.json:**
   ```json
   {
     "compilerOptions": {
       "jsx": "react-jsx",
       "esModuleInterop": true,
       "skipLibCheck": true
     }
   }
   ```

---

### "Property 'X' does not exist on type 'ButtonProps'"

**Cause:** Passing invalid props or outdated types.

**Solution:**

1. **Check component API:**
   ```tsx
   import type { ButtonProps } from 'liquidify-react/button';
   ```

2. **Reinstall package:**
   ```bash
   rm -rf node_modules
   bun install
   ```

---

## React/Framework Issues

### Hydration Mismatch (Next.js)

**Error:** "Hydration failed because the initial UI does not match what was rendered on the server."

**Cause:** Client/server rendering mismatch, often with ThemeProvider.

**Solution:**

1. **Make ThemeProvider client-only:**
   ```tsx
   // app/providers.tsx
   'use client';
   
   import { ThemeProvider } from 'liquidify-react/theme';
   
   export function Providers({ children }) {
     return (
       <ThemeProvider defaultMode="system">
         {children}
       </ThemeProvider>
     );
   }
   ```

2. **Use in layout:**
   ```tsx
   // app/layout.tsx
   import 'liquidify-react/styles';
   import { Providers } from './providers';
   
   export default function RootLayout({ children }) {
     return (
       <html>
         <body>
           <Providers>{children}</Providers>
         </body>
       </html>
     );
   }
   ```

---

### "use client" Directive Required (Next.js)

**Error:** Components with hooks/event handlers fail in Server Components.

**Cause:** Using interactive components in Server Components.

**Solution:** Add `'use client'` directive:

```tsx
'use client';

import { Button } from 'liquidify-react/button';
import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <Button onClick={() => setCount(count + 1)}>
      Count: {count}
    </Button>
  );
}
```

---

### Components Not Hydrating (Astro)

**Cause:** Missing client directive.

**Solution:** Add client directive to React components:

```astro
---
import { Button } from 'liquidify-react/button';
---

<!-- ✅ Correct: Will hydrate and be interactive -->
<Button client:load>Click Me</Button>

<!-- ❌ Wrong: Will not be interactive -->
<Button>Click Me</Button>
```

**Client Directives:**
- `client:load` - Hydrate immediately
- `client:idle` - Hydrate when browser idle
- `client:visible` - Hydrate when visible
- `client:only="react"` - Client-only, skip SSR

---

## Build Errors

### "export * from" Syntax Error

**Error:** Build fails with barrel export syntax errors.

**Cause:** Bundler doesn't support barrel exports.

**Solution:** Use subpath imports:

```tsx
// ✅ Good: Direct imports
import { Button } from 'liquidify-react/button';
import { Card } from 'liquidify-react/card';

// ⚠️ May cause issues in older bundlers
import { Button, Card } from 'liquidify-react';
```

---

### Large Bundle Size

**Symptoms:** Bundle size larger than expected.

**Solutions:**

1. **Use subpath imports:**
   ```tsx
   // ✅ ~30KB (only Button)
   import { Button } from 'liquidify-react/button';

   // ⚠️ ~45KB (entire library)
   import { Button } from 'liquidify-react';
   ```

2. **Lazy load heavy components:**
   ```tsx
   import { lazy, Suspense } from 'react';

   const ColorPicker = lazy(() => 
     import('liquidify-react/ark-ui/colorPicker').then(m => ({ 
       default: m.ColorPicker 
     }))
   );

   function Settings() {
     return (
       <Suspense fallback={<div>Loading...</div>}>
         <ColorPicker />
       </Suspense>
     );
   }
   ```

3. **Analyze bundle:**
   ```bash
   # Next.js
   ANALYZE=true npm run build

   # Vite with rollup-plugin-visualizer
   bun add -D rollup-plugin-visualizer
   bun run build
   ```

---

### "Cannot use import statement outside a module"

**Cause:** Incorrect module resolution or package not in ESM format.

**Solution:**

1. **Vite config:**
   ```ts
   // vite.config.ts
   export default defineConfig({
     optimizeDeps: {
       include: [
         'liquidify-react',
         '@ark-ui/react',
         'framer-motion',
       ],
     },
   });
   ```

2. **Next.js config:**
   ```js
   // next.config.js
   module.exports = {
     transpilePackages: ['liquidify-react'],
   };
   ```

---

## Theme Issues

### Dark Mode Not Working

**Symptoms:** Theme doesn't change when toggling dark mode.

**Solutions:**

1. **Ensure ThemeProvider is wrapping your app:**
   ```tsx
   import { ThemeProvider } from 'liquidify-react/theme';
   
   function App() {
     return (
       <ThemeProvider defaultMode="system">
         {children}
       </ThemeProvider>
     );
   }
   ```

2. **Use useTheme hook correctly:**
   ```tsx
   import { useTheme } from 'liquidify-react/theme';
   
   function ThemeToggle() {
     const { mode, setMode } = useTheme();
     
     return (
       <button onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
         Toggle
       </button>
     );
   }
   ```

3. **Check localStorage persistence:**
   ```tsx
   <ThemeProvider persistTheme={true}>
     {children}
   </ThemeProvider>
   ```

---

### Accent Color Not Changing

**Cause:** Using wrong preset name or not updating state.

**Solution:**

1. **Use correct preset names:**
   ```tsx
   // ✅ Correct presets
   accentPreset="blue"
   accentPreset="green"
   accentPreset="purple"

   // ❌ Invalid presets
   accentPreset="lightBlue"  // No such preset
   accentPreset="#007AFF"    // Use defaultAccent instead
   ```

2. **For custom colors, use defaultAccent:**
   ```tsx
   <ThemeProvider defaultAccent="#FF6B35">
     {children}
   </ThemeProvider>
   ```

---

## Performance Issues

### Slow Page Load

**Cause:** Loading too many components upfront.

**Solution:**

1. **Lazy load heavy components:**
   ```tsx
   const DatePicker = lazy(() => 
     import('liquidify-react/ark-ui/datePicker')
   );
   ```

2. **Use code splitting by route** (Next.js/Remix do this automatically)

3. **Check bundle size** and use subpath imports

---

### Janky Animations

**Cause:** Not using GPU acceleration or too many animations.

**Solutions:**

1. **Use performance tokens:**
   ```tsx
   import { css } from 'styled-system/css';

   const optimized = css({
     willChange: 'token(performance.willChange.glass)',
     transform: 'token(performance.transform.gpuAccel)',
   });
   ```

2. **Respect reduced motion:**
   ```css
   @media (prefers-reduced-motion: reduce) {
     * {
       animation-duration: 0.01ms !important;
       transition-duration: 0.01ms !important;
     }
   }
   ```

---

## Still Having Issues?

1. **Check version:**
   ```bash
   bun list | grep liquidify-react
   ```

2. **Update to latest:**
   ```bash
   bun update liquidify-react
   ```

3. **Clear cache:**
   ```bash
   # Bun
   rm -rf node_modules/.cache

   # Next.js
   rm -rf .next

   # Vite
   rm -rf node_modules/.vite
   ```

4. **Reinstall dependencies:**
   ```bash
   rm -rf node_modules bun.lock
   bun install
   ```

5. **Open an issue:**
   [GitHub Issues](https://github.com/tuliopc23/LiqUIdify/issues)

---

**Related:**
- [FAQ](./faq.md) - Frequently asked questions
- [Installation Guide](./getting-started/installation.md) - Detailed setup
- [Framework Guides](./guides/) - Framework-specific troubleshooting
