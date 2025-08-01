# Getting Started with LiqUIdify

Welcome to **LiqUIdify** - a production-ready React component library with stunning glassmorphism design and physics-based interactions. This guide will help you get up and running quickly.

## What is LiqUIdify?

LiqUIdify is a modern React component library that brings the beauty of glassmorphism design to your applications with:

- **50+ Production-Ready Components** - From basic inputs to complex data visualizations
- **Glassmorphism Design System** - Consistent, beautiful glass effects throughout
- **Physics-Based Animations** - Smooth, natural interactions with spring physics
- **TypeScript First** - Full type safety and excellent developer experience
- **Accessibility Ready** - WCAG 2.1 compliant with keyboard navigation support
- **Framework Agnostic** - Works with React 18/19, Next.js, Vite, and more

## Quick Preview

Here's what LiqUIdify components look like in action:

```tsx
import { GlassCard, GlassButton, GlassInput } from '@liquidify/ui'

function App() {
  return (
    <GlassCard className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Welcome to LiqUIdify</h2>
      <GlassInput 
        placeholder="Enter your name" 
        className="mb-4" 
      />
      <GlassButton variant="primary" size="lg">
        Get Started
      </GlassButton>
    </GlassCard>
  )
}
```

## Installation

### Prerequisites

Before installing LiqUIdify, make sure you have:

- **Node.js** 16.0 or later
- **React** 18.0 or later
- A bundler like **Vite**, **Next.js**, or **Create React App**

### Install the Package

Choose your preferred package manager:

::: code-group

```bash [npm]
npm install @liquidify/ui
```

```bash [yarn]
yarn add @liquidify/ui
```

```bash [pnpm]
pnpm add @liquidify/ui
```

```bash [bun]
bun add @liquidify/ui
```

:::

### Add Peer Dependencies

LiqUIdify requires React as a peer dependency:

```bash
npm install react react-dom
```

## Basic Setup

### 1. Import Styles

Add the LiqUIdify CSS to your main CSS file or entry point:

```css
/* In your main CSS file (e.g., globals.css, index.css) */
@import '@liquidify/ui/styles';
```

Or import directly in your JavaScript/TypeScript entry point:

```tsx
// In your main.tsx, index.tsx, or App.tsx
import '@liquidify/ui/styles'
```

### 2. Set Up Theme Provider

Wrap your application with the `ThemeProvider` for optimal glassmorphism effects:

```tsx
import { ThemeProvider } from '@liquidify/ui'
import '@liquidify/ui/styles'

function App() {
  return (
    <ThemeProvider theme="glass">
      {/* Your app content */}
    </ThemeProvider>
  )
}

export default App
```

### 3. Use Your First Component

Now you can start using LiqUIdify components:

```tsx
import { GlassButton, GlassCard } from '@liquidify/ui'

function MyComponent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 p-8">
      <GlassCard className="p-6 max-w-sm mx-auto">
        <h1 className="text-xl font-bold mb-4">Hello LiqUIdify!</h1>
        <GlassButton 
          onClick={() => alert('Welcome to LiqUIdify!')}
          variant="primary"
        >
          Click me
        </GlassButton>
      </GlassCard>
    </div>
  )
}
```

## Tree Shaking & Bundle Optimization

LiqUIdify is built with tree shaking in mind. You can import components in several ways:

### Full Import (Convenient)
```tsx
import { GlassButton, GlassCard, GlassInput } from '@liquidify/ui'
```

### Individual Imports (Optimal Bundle Size)
```tsx
import { GlassButton } from '@liquidify/ui/button'
import { GlassCard } from '@liquidify/ui/card'
import { GlassInput } from '@liquidify/ui/input'
```

### Bundle Imports (Category-Based)
```tsx
import { GlassButton, GlassInput } from '@liquidify/ui/forms'
import { GlassCard } from '@liquidify/ui/core'
```

## Framework Integration

### Next.js Setup

1. Install LiqUIdify:
```bash
npm install @liquidify/ui
```

2. Create a `globals.css` file:
```css
@import '@liquidify/ui/styles';
@tailwind base;
@tailwind components;
@tailwind utilities;
```

3. Set up your `_app.tsx`:
```tsx
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@liquidify/ui'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme="glass">
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
```

### Vite Setup

1. Install LiqUIdify:
```bash
npm install @liquidify/ui
```

2. Update your `main.tsx`:
```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@liquidify/ui'
import '@liquidify/ui/styles'
import './index.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme="glass">
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
```

### Create React App Setup

1. Install LiqUIdify:
```bash
npm install @liquidify/ui
```

2. Update your `src/index.tsx`:
```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@liquidify/ui'
import '@liquidify/ui/styles'
import './index.css'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
  <React.StrictMode>
    <ThemeProvider theme="glass">
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
```

## Background Setup for Best Results

LiqUIdify components look best with gradient backgrounds. Here are some recommended setups:

### CSS Gradients
```css
.app-background {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}
```

### Tailwind CSS Classes
```tsx
<div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
  {/* Your content */}
</div>
```

### Dynamic Backgrounds
```tsx
import { useState } from 'react'

const backgrounds = [
  'bg-gradient-to-br from-blue-400 to-purple-600',
  'bg-gradient-to-br from-green-400 to-teal-600',
  'bg-gradient-to-br from-pink-400 to-red-600',
]

function App() {
  const [bgIndex, setBgIndex] = useState(0)
  
  return (
    <div className={`min-h-screen ${backgrounds[bgIndex]} transition-all duration-1000`}>
      {/* Your content */}
    </div>
  )
}
```

## Common Patterns

### Form with Glass Components
```tsx
import { GlassCard, GlassInput, GlassButton, GlassSelect } from '@liquidify/ui'

function ContactForm() {
  return (
    <GlassCard className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
      
      <form className="space-y-4">
        <GlassInput 
          label="Full Name"
          placeholder="Enter your name"
          required
        />
        
        <GlassInput 
          label="Email"
          type="email"
          placeholder="your@email.com"
          required
        />
        
        <GlassSelect 
          label="Subject"
          options={[
            { value: 'support', label: 'Support' },
            { value: 'sales', label: 'Sales' },
            { value: 'feedback', label: 'Feedback' }
          ]}
        />
        
        <GlassButton type="submit" variant="primary" size="lg" className="w-full">
          Send Message
        </GlassButton>
      </form>
    </GlassCard>
  )
}
```

### Dashboard Layout
```tsx
import { 
  GlassCard, 
  GlassButton, 
  GlassBadge, 
  GlassProgress,
  GlassChart 
} from '@liquidify/ui'

function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Stats Card */}
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Total Users</h3>
            <GlassBadge variant="success">+12%</GlassBadge>
          </div>
          <p className="text-3xl font-bold mt-2">12,458</p>
        </GlassCard>
        
        {/* Progress Card */}
        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold mb-4">Project Progress</h3>
          <GlassProgress value={75} className="mb-2" />
          <p className="text-sm text-gray-600">75% Complete</p>
        </GlassCard>
        
        {/* Chart Card */}
        <GlassCard className="p-6 lg:col-span-3">
          <h3 className="text-lg font-semibold mb-4">Analytics</h3>
          <GlassChart 
            data={[
              { name: 'Jan', value: 400 },
              { name: 'Feb', value: 300 },
              { name: 'Mar', value: 600 },
              { name: 'Apr', value: 800 },
            ]}
            type="line"
          />
        </GlassCard>
        
      </div>
    </div>
  )
}
```

## Development Tips

### 1. Use TypeScript for Better DX
LiqUIdify is built with TypeScript and provides excellent type safety:

```tsx
import { GlassButtonProps } from '@liquidify/ui'

// Props are fully typed
const MyButton: React.FC<GlassButtonProps> = (props) => {
  return <GlassButton {...props} />
}
```

### 2. Customize with CSS Variables
Override the default glass effect variables:

```css
:root {
  --glass-background: rgba(255, 255, 255, 0.1);
  --glass-border: rgba(255, 255, 255, 0.2);
  --glass-blur: 10px;
}
```

### 3. Test Accessibility
Use screen readers and keyboard navigation to test your components:

```tsx
<GlassButton
  aria-label="Close dialog"
  onClick={handleClose}
>
  ×
</GlassButton>
```

## Next Steps

Now that you have LiqUIdify set up, explore these resources:

1. **[Component Library](/components/)** - Browse all available components
2. **[Design System Guide](/guide/design-system)** - Understand the design principles
3. **[Theming Guide](/guide/theming)** - Customize colors and styles
4. **[Framework Integration](/guide/framework-guides)** - Detailed setup for your framework
5. **[Examples](/guide/usage-examples)** - Real-world usage patterns

## Need Help?

- **Documentation**: Browse our comprehensive [component docs](/components/)
- **GitHub Issues**: Report bugs or request features on [GitHub](https://github.com/tuliopc23/LiqUIdify/issues)
- **Community**: Join discussions and get help
- **Examples**: Check out our [Storybook](https://liquidify-storybook.vercel.app) for interactive examples

Welcome to the LiqUIdify community! 🎉