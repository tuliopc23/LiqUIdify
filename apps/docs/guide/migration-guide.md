# Migration Guide

This guide helps you migrate to LiqUIdify from other UI libraries or upgrade between major versions of LiqUIdify.

## Migrating from Other Libraries

### From Material-UI (MUI)

LiqUIdify provides similar components to Material-UI with glassmorphism design. Here's how to migrate:

#### Component Mapping

| Material-UI | LiqUIdify | Notes |
|-------------|-----------|-------|
| `Button` | `GlassButton` | Similar API, different visual style |
| `Card` | `GlassCard` | Glass effect replaces elevation |
| `TextField` | `GlassInput` | Built-in glass styling |
| `Select` | `GlassSelect` | Dropdown with glass effects |
| `Checkbox` | `GlassCheckbox` | Custom glass styling |
| `Switch` | `GlassSwitch` | Smooth glass animations |
| `Dialog` | `GlassModal` | Glass backdrop and content |
| `AppBar` | `GlassNavbar` | Translucent navigation |
| `Drawer` | `GlassDrawer` | Side panel with glass |
| `Progress` | `GlassProgress` | Glass progress indicators |

#### Before (Material-UI)
```tsx
import { Button, Card, TextField, ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Card elevation={3} sx={{ p: 2 }}>
        <TextField label="Email" variant="outlined" />
        <Button variant="contained" color="primary">
          Submit
        </Button>
      </Card>
    </ThemeProvider>
  )
}
```

#### After (LiqUIdify)
```tsx
import { GlassButton, GlassCard, GlassInput, ThemeProvider } from '@liquidify/ui'
import '@liquidify/ui/styles'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 p-8">
      <ThemeProvider theme="glass">
        <GlassCard className="p-6 max-w-sm mx-auto">
          <GlassInput label="Email" placeholder="Enter your email" className="mb-4" />
          <GlassButton variant="primary">
            Submit
          </GlassButton>
        </GlassCard>
      </ThemeProvider>
    </div>
  )
}
```

### From Ant Design

#### Component Mapping

| Ant Design | LiqUIdify | Notes |
|------------|-----------|-------|
| `Button` | `GlassButton` | Similar variants (primary, default) |
| `Card` | `GlassCard` | Glass effects instead of shadows |
| `Input` | `GlassInput` | Built-in validation styling |
| `Select` | `GlassSelect` | Dropdown with glass backdrop |
| `Checkbox` | `GlassCheckbox` | Custom glass checkmark |
| `Switch` | `GlassSwitch` | Smooth glass toggle |
| `Modal` | `GlassModal` | Glass overlay effects |
| `Menu` | `GlassNavbar` | Navigation with transparency |
| `Drawer` | `GlassDrawer` | Side panel with blur |
| `Progress` | `GlassProgress` | Glass progress bars |

#### Before (Ant Design)
```tsx
import { Button, Card, Input, ConfigProvider } from 'antd'
import 'antd/dist/antd.css'

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
        },
      }}
    >
      <Card title="Login Form" style={{ width: 300, margin: '0 auto' }}>
        <Input placeholder="Username" style={{ marginBottom: 16 }} />
        <Button type="primary" block>
          Login
        </Button>
      </Card>
    </ConfigProvider>
  )
}
```

#### After (LiqUIdify)
```tsx
import { GlassButton, GlassCard, GlassInput, ThemeProvider } from '@liquidify/ui'
import '@liquidify/ui/styles'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-400 to-blue-600 p-8">
      <ThemeProvider theme="glass">
        <GlassCard className="p-6 max-w-sm mx-auto">
          <h2 className="text-xl font-semibold mb-4">Login Form</h2>
          <GlassInput placeholder="Username" className="mb-4" />
          <GlassButton variant="primary" size="lg" className="w-full">
            Login
          </GlassButton>
        </GlassCard>
      </ThemeProvider>
    </div>
  )
}
```

### From Chakra UI

#### Component Mapping

| Chakra UI | LiqUIdify | Notes |
|-----------|-----------|-------|
| `Button` | `GlassButton` | Similar size and variant props |
| `Box` | `GlassCard` | Glass container component |
| `Input` | `GlassInput` | Form input with glass styling |
| `Select` | `GlassSelect` | Dropdown with glass effects |
| `Checkbox` | `GlassCheckbox` | Custom glass styling |
| `Switch` | `GlassSwitch` | Toggle with glass animation |
| `Modal` | `GlassModal` | Overlay with glass backdrop |
| `Drawer` | `GlassDrawer` | Side panel with blur |
| `Progress` | `GlassProgress` | Glass progress indicators |

#### Before (Chakra UI)
```tsx
import { 
  Button, 
  Box, 
  Input, 
  ChakraProvider,
  extendTheme 
} from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    brand: {
      100: '#f7fafc',
      500: '#718096',
      900: '#1a202c',
    },
  },
})

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box p={6} maxW="sm" mx="auto" bg="white" rounded="lg" shadow="md">
        <Input placeholder="Enter text" mb={4} />
        <Button colorScheme="brand" size="lg">
          Submit
        </Button>
      </Box>
    </ChakraProvider>
  )
}
```

#### After (LiqUIdify)
```tsx
import { GlassButton, GlassCard, GlassInput, ThemeProvider } from '@liquidify/ui'
import '@liquidify/ui/styles'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-400 to-slate-600 p-8">
      <ThemeProvider theme="glass">
        <GlassCard className="p-6 max-w-sm mx-auto">
          <GlassInput placeholder="Enter text" className="mb-4" />
          <GlassButton variant="primary" size="lg">
            Submit
          </GlassButton>
        </GlassCard>
      </ThemeProvider>
    </div>
  )
}
```

## Version Migration

### Upgrading from v1.x to v2.x

#### Breaking Changes

1. **Theme Provider is Required**
   ```tsx
   // Before (v1.x)
   import { GlassButton } from '@liquidify/ui'
   
   // After (v2.x)
   import { GlassButton, ThemeProvider } from '@liquidify/ui'
   
   function App() {
     return (
       <ThemeProvider theme="glass">
         <GlassButton>Click me</GlassButton>
       </ThemeProvider>
     )
   }
   ```

2. **CSS Import Changes**
   ```tsx
   // Before (v1.x)
   import '@liquidify/ui/dist/styles.css'
   
   // After (v2.x)
   import '@liquidify/ui/styles'
   ```

3. **Component Name Updates**
   ```tsx
   // Before (v1.x)
   import { Button, Card, Input } from '@liquidify/ui'
   
   // After (v2.x)
   import { GlassButton, GlassCard, GlassInput } from '@liquidify/ui'
   ```

4. **Props Standardization**
   ```tsx
   // Before (v1.x)
   <Button color="primary" size="large">Click</Button>
   
   // After (v2.x)
   <GlassButton variant="primary" size="lg">Click</GlassButton>
   ```

#### Migration Script

Use this script to help automate the migration:

```bash
#!/bin/bash
# migration-script.sh

# Update imports
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/@liquidify\/ui\/dist\/styles.css/@liquidify\/ui\/styles/g'
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/import { Button/import { GlassButton/g'
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/import { Card/import { GlassCard/g'
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/import { Input/import { GlassInput/g'

# Update component usage
find src -name "*.tsx" | xargs sed -i 's/<Button/<GlassButton/g'
find src -name "*.tsx" | xargs sed -i 's/<\/Button>/<\/GlassButton>/g'
find src -name "*.tsx" | xargs sed -i 's/<Card/<GlassCard/g'
find src -name "*.tsx" | xargs sed -i 's/<\/Card>/<\/GlassCard>/g'

# Update props
find src -name "*.tsx" | xargs sed -i 's/color="primary"/variant="primary"/g'
find src -name "*.tsx" | xargs sed -i 's/size="large"/size="lg"/g'
find src -name "*.tsx" | xargs sed -i 's/size="small"/size="sm"/g'

echo "Migration complete! Please review and test your changes."
```

## Common Migration Patterns

### Form Migration

#### Before (Generic)
```tsx
function ContactForm() {
  return (
    <form>
      <input type="text" placeholder="Name" />
      <input type="email" placeholder="Email" />
      <textarea placeholder="Message"></textarea>
      <button type="submit">Send</button>
    </form>
  )
}
```

#### After (LiqUIdify)
```tsx
import { GlassInput, GlassTextarea, GlassButton, GlassCard } from '@liquidify/ui'

function ContactForm() {
  return (
    <GlassCard className="p-6 max-w-md mx-auto">
      <form className="space-y-4">
        <GlassInput label="Name" placeholder="Enter your name" />
        <GlassInput label="Email" type="email" placeholder="your@email.com" />
        <GlassTextarea label="Message" placeholder="Your message" rows={4} />
        <GlassButton type="submit" variant="primary" size="lg" className="w-full">
          Send
        </GlassButton>
      </form>
    </GlassCard>
  )
}
```

### Navigation Migration

#### Before (Generic)
```tsx
function Navigation() {
  return (
    <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </nav>
  )
}
```

#### After (LiqUIdify)
```tsx
import { GlassNavbar } from '@liquidify/ui'

function Navigation() {
  return (
    <GlassNavbar
      brand={{ name: "MyApp", href: "/" }}
      items={[
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" }
      ]}
    />
  )
}
```

### Dashboard Migration

#### Before (Generic)
```tsx
function Dashboard() {
  return (
    <div className="dashboard">
      <div className="card">
        <h3>Users</h3>
        <p>1,234</p>
      </div>
      <div className="card">
        <h3>Sales</h3>
        <p>$12,345</p>
      </div>
    </div>
  )
}
```

#### After (LiqUIdify)
```tsx
import { GlassCard, GlassBadge } from '@liquidify/ui'

function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Users</h3>
            <GlassBadge variant="success">+5%</GlassBadge>
          </div>
          <p className="text-3xl font-bold mt-2">1,234</p>
        </GlassCard>
        
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Sales</h3>
            <GlassBadge variant="info">+12%</GlassBadge>
          </div>
          <p className="text-3xl font-bold mt-2">$12,345</p>
        </GlassCard>
      </div>
    </div>
  )
}
```

## Styling Migration

### CSS-in-JS to Tailwind + Glass

#### Before (Styled Components)
```tsx
import styled from 'styled-components'

const StyledCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 24px;
`

const StyledButton = styled.button`
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 12px 24px;
  font-weight: 600;
`
```

#### After (LiqUIdify)
```tsx
import { GlassCard, GlassButton } from '@liquidify/ui'

// Built-in glassmorphism styling
function MyComponent() {
  return (
    <GlassCard className="p-6">
      <GlassButton variant="primary" className="font-semibold">
        Click me
      </GlassButton>
    </GlassCard>
  )
}
```

### Custom CSS to Glass Variables

#### Before (Custom CSS)
```css
.my-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
}
```

#### After (LiqUIdify Variables)
```css
:root {
  --glass-background: rgba(255, 255, 255, 0.1);
  --glass-border: rgba(255, 255, 255, 0.2);
  --glass-blur: 10px;
  --glass-radius: 12px;
}
```

## Testing Migration

### Update Test Utilities

#### Before
```tsx
import { render, screen } from '@testing-library/react'
import { Button } from '@my-old-library'

test('button renders', () => {
  render(<Button>Click me</Button>)
  expect(screen.getByRole('button')).toBeInTheDocument()
})
```

#### After
```tsx
import { render, screen } from '@testing-library/react'
import { GlassButton, ThemeProvider } from '@liquidify/ui'

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme="glass">
      {component}
    </ThemeProvider>
  )
}

test('glass button renders', () => {
  renderWithTheme(<GlassButton>Click me</GlassButton>)
  expect(screen.getByRole('button')).toBeInTheDocument()
})
```

## TypeScript Migration

### Type Imports

#### Before
```tsx
import { ButtonProps } from '@my-old-library'

interface MyButtonProps extends ButtonProps {
  customProp?: string
}
```

#### After
```tsx
import { GlassButtonProps } from '@liquidify/ui'

interface MyButtonProps extends GlassButtonProps {
  customProp?: string
}
```

## Bundle Size Optimization

### Tree Shaking Setup

Update your bundler configuration to enable tree shaking:

#### Webpack
```js
// webpack.config.js
module.exports = {
  optimization: {
    usedExports: true,
    sideEffects: false
  }
}
```

#### Vite
```js
// vite.config.js
export default {
  build: {
    rollupOptions: {
      treeshake: true
    }
  }
}
```

### Import Optimization

```tsx
// Instead of
import { GlassButton, GlassCard, GlassInput } from '@liquidify/ui'

// Use specific imports for better tree shaking
import { GlassButton } from '@liquidify/ui/button'
import { GlassCard } from '@liquidify/ui/card'
import { GlassInput } from '@liquidify/ui/input'
```

## Performance Considerations

### Background Optimization

LiqUIdify works best with gradient backgrounds. Optimize for performance:

```css
/* Optimize gradient rendering */
.app-background {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-attachment: fixed;
  will-change: transform;
}
```

### Animation Performance

```tsx
// Enable hardware acceleration for smooth animations
<GlassButton 
  className="transform-gpu"
  style={{ willChange: 'transform' }}
>
  Optimized Button
</GlassButton>
```

## Troubleshooting

### Common Issues

1. **Glass effects not visible**
   - Ensure gradient background is applied
   - Check CSS import order
   - Verify ThemeProvider is wrapping components

2. **TypeScript errors**
   - Update @types/react to latest version
   - Check component prop types
   - Ensure proper imports

3. **Bundle size increased**
   - Use individual component imports
   - Enable tree shaking
   - Check for duplicate dependencies

### Getting Help

- **Migration Issues**: Open an issue on [GitHub Issues](https://github.com/tuliopc23/LiqUIdify/issues)
- **Component Questions**: Check our [Component Documentation](/components/)
- **Performance**: See our [Performance Guide](/guide/performance)

## Migration Checklist

- [ ] Update package.json dependencies
- [ ] Add ThemeProvider wrapper
- [ ] Update CSS imports
- [ ] Rename components (Button → GlassButton)
- [ ] Update component props
- [ ] Add gradient backgrounds
- [ ] Update tests with ThemeProvider
- [ ] Verify TypeScript types
- [ ] Test accessibility
- [ ] Optimize bundle size
- [ ] Performance testing
- [ ] Update documentation

Welcome to LiqUIdify! The migration effort is worth the beautiful glassmorphism experience you'll provide to your users. 🎉