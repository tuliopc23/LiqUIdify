# Glass UI

<div align="center">

![Glass UI Logo](https://glass-ui.dev/logo.png)

**A comprehensive React component library with Apple-inspired liquid glass aesthetics**

[![npm version](https://badge.fury.io/js/%40tuliopc23%2Fglass-ui.svg)](https://www.npmjs.com/package/@tuliopc23/glass-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg)](https://glass-ui.dev)
[![Build Status](https://github.com/tuliopc23/glass-ui/workflows/CI/badge.svg)](https://github.com/tuliopc23/glass-ui/actions)
[![Coverage](https://codecov.io/gh/tuliopc23/glass-ui/branch/main/graph/badge.svg)](https://codecov.io/gh/tuliopc23/glass-ui)

[**Documentation**](https://glass-ui.dev) • [**Storybook**](https://storybook.glass-ui.dev) • [**Examples**](https://examples.glass-ui.dev)

</div>

## ✨ Features

- 🎨 **Liquid Glass Design** - Apple-inspired glassmorphism effects with backdrop blur
- 🌓 **Light/Dark Mode** - Seamless theme switching with smooth transitions  
- ⚡ **Modern Stack** - Built with React 18, TypeScript, and Tailwind CSS
- 🧩 **70+ Components** - Comprehensive set of UI primitives and composed components
- 📱 **Responsive Design** - Mobile-first approach with adaptive layouts
- ♿ **Accessibility First** - WCAG 2.1 AA compliant with comprehensive keyboard navigation
- 🎭 **Micro-interactions** - SwiftUI-inspired hover effects and animations
- 🔧 **Developer Experience** - Full TypeScript support with intelligent autocomplete
- 📦 **Tree Shakeable** - Optimized bundle size with ES modules
- 🧪 **Battle Tested** - Comprehensive test suite with 95%+ coverage

## 🚀 Quick Start

### Installation

```bash
# npm
npm install @tuliopc23/glass-ui

# yarn
yarn add @tuliopc23/glass-ui

# pnpm
pnpm add @tuliopc23/glass-ui
```

### Setup

Add the CSS to your app:

```tsx
// Import the styles in your app root
import '@tuliopc23/glass-ui/styles'

// Or in your CSS file
@import '@tuliopc23/glass-ui/styles';
```

Wrap your app with the theme provider:

```tsx
import { ThemeProvider } from '@tuliopc23/glass-ui'

function App() {
  return (
    <ThemeProvider>
      {/* Your app components */}
    </ThemeProvider>
  )
}
```

### Basic Usage

```tsx
import { GlassButton, GlassCard, GlassInput } from '@tuliopc23/glass-ui'

function MyComponent() {
  return (
    <GlassCard variant="elevated" className="p-6">
      <h2 className="text-2xl font-bold mb-4">Welcome to Glass UI</h2>
      <GlassInput 
        placeholder="Enter your email..." 
        variant="search"
        className="mb-4"
      />
      <GlassButton variant="primary" size="lg">
        Get Started
      </GlassButton>
    </GlassCard>
  )
}
```

### Advanced Examples

#### Form with Glass Components
```tsx
import { 
  GlassCard, 
  GlassInput, 
  GlassButton, 
  GlassSelect,
  GlassCheckbox,
  GlassTextarea 
} from '@tuliopc23/glass-ui'

function ContactForm() {
  return (
    <GlassCard variant="elevated" className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
      
      <div className="space-y-4">
        <GlassInput
          placeholder="Your name"
          variant="default"
        />
        
        <GlassInput
          type="email"
          placeholder="your@email.com"
          variant="search"
        />
        
        <GlassSelect>
          <option>Select a topic</option>
          <option>General Inquiry</option>
          <option>Support</option>
          <option>Partnership</option>
        </GlassSelect>
        
        <GlassTextarea
          placeholder="Your message..."
          rows={4}
        />
        
        <GlassCheckbox>
          I agree to the terms and conditions
        </GlassCheckbox>
        
        <GlassButton variant="primary" className="w-full">
          Send Message
        </GlassButton>
      </div>
    </GlassCard>
  )
}
```

#### Dashboard with Navigation
```tsx
import { 
  GlassNavbar, 
  GlassSidebar, 
  GlassCard,
  GlassChart,
  GlassBadge,
  GlassProgress 
} from '@tuliopc23/glass-ui'

function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <GlassNavbar>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <GlassBadge variant="success">Online</GlassBadge>
        </div>
      </GlassNavbar>
      
      <div className="flex">
        <GlassSidebar className="w-64">
          {/* Sidebar content */}
        </GlassSidebar>
        
        <main className="flex-1 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold mb-2">Revenue</h3>
              <p className="text-3xl font-bold text-green-600">$12,345</p>
              <GlassProgress value={75} className="mt-4" />
            </GlassCard>
            
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold mb-4">Analytics</h3>
              <GlassChart type="line" data={chartData} />
            </GlassCard>
          </div>
        </main>
      </div>
    </div>
  )
}
```

#### Interactive Modal Example
```tsx
import { 
  GlassButton, 
  GlassModal, 
  GlassInput,
  useToast 
} from '@tuliopc23/glass-ui'
import { useState } from 'react'

function ModalExample() {
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()
  
  const handleSubmit = () => {
    toast({
      title: "Success!",
      description: "Your data has been saved.",
      variant: "success"
    })
    setIsOpen(false)
  }
  
  return (
    <>
      <GlassButton onClick={() => setIsOpen(true)}>
        Open Modal
      </GlassButton>
      
      <GlassModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        title="Edit Profile"
      >
        <div className="space-y-4">
          <GlassInput placeholder="Full name" />
          <GlassInput placeholder="Email address" type="email" />
          
          <div className="flex gap-3 pt-4">
            <GlassButton 
              variant="ghost" 
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </GlassButton>
            <GlassButton 
              variant="primary" 
              onClick={handleSubmit}
            >
              Save Changes
            </GlassButton>
          </div>
        </div>
      </GlassModal>
    </>
  )
}
```

## 📚 Components

<details>
<summary><strong>Form Components</strong></summary>

- **GlassButton** - Primary, secondary, ghost, and destructive variants
- **GlassInput** - Text, search, password inputs with glass effects  
- **GlassTextarea** - Multi-line text input with glassmorphism
- **GlassSelect** - Dropdown selection with glass styling
- **GlassCheckbox** - Custom styled checkboxes
- **GlassSwitch** - iOS-style toggle switches
- **GlassSlider** - Range input with glass track
- **GlassRadioGroup** - Radio button groups

</details>

<details>
<summary><strong>Layout Components</strong></summary>

- **GlassCard** - Content containers with liquid glass effects
- **GlassModal** - Overlay dialogs with glassmorphism backdrop
- **GlassSheet** - Sliding panels and drawers
- **GlassTabs** - Tab navigation with smooth transitions
- **GlassAccordion** - Collapsible content sections
- **GlassSeparator** - Visual dividers with glass styling

</details>

<details>
<summary><strong>Navigation Components</strong></summary>

- **GlassNavbar** - Top navigation with glass morphism
- **GlassSidebar** - Collapsible navigation sidebar
- **GlassBreadcrumb** - Navigation breadcrumbs
- **GlassPagination** - Page navigation controls
- **GlassDropdownMenu** - Context menus and dropdowns

</details>

<details>
<summary><strong>Data Display</strong></summary>

- **GlassTable** - Interactive tables with glass styling
- **GlassAvatar** - User profile images with glass frames
- **GlassBadge** - Status indicators and labels
- **GlassProgress** - Progress bars and loading indicators
- **GlassChart** - Data visualization components
- **GlassTooltip** - Contextual information overlays

</details>

<details>
<summary><strong>Feedback Components</strong></summary>

- **GlassToast** - Notification messages
- **GlassAlert** - Important announcements
- **GlassNotification** - System notifications
- **GlassLoading** - Loading states and spinners

</details>

## 🎨 Theming & Customization

Glass UI uses CSS custom properties for theming:

```css
:root {
  --glass-bg: rgba(255, 255, 255, 0.1);
  --glass-border: rgba(255, 255, 255, 0.2);
  --glass-primary: #007AFF;
  --glass-radius: 12px;
  /* ... more variables */
}
```

### Dark Mode

```tsx
import { useTheme } from '@tuliopc23/glass-ui'

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  
  return (
    <GlassButton
      variant="ghost"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </GlassButton>
  )
}
```

## 📖 Documentation

- [**Getting Started**](https://glass-ui.dev/docs/getting-started) - Installation and setup guide
- [**Components**](https://glass-ui.dev/docs/components) - Complete component reference
- [**Theming**](https://glass-ui.dev/docs/theming) - Customization and styling guide
- [**Examples**](https://glass-ui.dev/examples) - Real-world usage examples
- [**Migration Guide**](https://glass-ui.dev/docs/migration) - Upgrading between versions

## 🧪 Testing

Glass UI includes comprehensive testing utilities:

```tsx
import { render } from '@testing-library/react'
import { expectAccessible } from '@tuliopc23/glass-ui/testing'

test('button is accessible', async () => {
  const { container } = render(<GlassButton>Click me</GlassButton>)
  await expectAccessible(container)
})
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/tuliopc23/glass-ui.git
cd glass-ui

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test
```

## 📄 License

MIT © [Tulio Pinheiro Cunha](https://tulio.dev)

---

<div align="center">

**[Website](https://glass-ui.dev)** • **[Documentation](https://glass-ui.dev/docs)** • **[Examples](https://examples.glass-ui.dev)** • **[Brand Guidelines](https://brand.tulio.dev)**

Made with ❤️ by [Tulio Pinheiro Cunha](https://tulio.dev)

</div>
