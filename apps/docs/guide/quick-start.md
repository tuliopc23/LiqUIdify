# Quick Start

Get up and running with LiqUIdify in minutes!

## Installation

```bash
# Using bun (recommended)
bun add liquidify

# Using npm
npm install liquidify
```

## Basic Setup

### 1. Import Styles

```tsx
// In your main entry file (App.tsx, main.tsx, etc.)
import 'liquidify/styles'
```

### 2. Wrap Your App

```tsx
import { GlassProvider } from 'liquidify'

function App() {
  return (
    <GlassProvider>
      {/* Your app content */}
    </GlassProvider>
  )
}
```

## Your First Component

Here's a simple example using LiqUIdify components:

```tsx
import { GlassCard, GlassButton, GlassInput } from 'liquidify'
import 'liquidify/styles'

function LoginForm() {
  return (
    <GlassCard className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      
      <div className="space-y-4">
        <GlassInput
          type="email"
          placeholder="Email address"
          label="Email"
        />
        
        <GlassInput
          type="password"
          placeholder="Password"
          label="Password"
        />
        
        <GlassButton fullWidth variant="primary">
          Sign In
        </GlassButton>
      </div>
    </GlassCard>
  )
}
```

## Using with Tailwind CSS

LiqUIdify works great with Tailwind CSS. Here's how to set it up:

```js
// tailwind.config.js
module.exports = {
  content: [
    // ... your content paths
    './node_modules/liquidify/dist/**/*.{js,mjs}'
  ],
  theme: {
    extend: {
      // LiqUIdify's glass effect utilities
      backdropBlur: {
        xs: '2px',
        '2xl': '40px',
        '3xl': '64px',
      }
    }
  }
}
```

## Next Steps

- Explore the [Component Gallery](/components/)
- Learn about [Theming](/guide/theming)
- Check out [Usage Examples](/guide/usage-examples)
- Read the [API Reference](/api/)

## Need Help?

- [GitHub Issues](https://github.com/tuliopc23/LiqUIdify/issues)
- [Storybook Playground](https://liquidify-storybook.vercel.app)
- [Full Documentation](/guide/)