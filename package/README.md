# LiquidiUI - The Future of Glassmorphism

<div align="center">
  <img src="https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1200&h=400&fit=crop" alt="LiquidiUI Banner" />
  
  <h3>🚀 Physics-based glassmorphism with content-aware adaptation</h3>
  <p><strong>The only library that automatically adapts glass effects to your content</strong></p>
  
  <p align="center">
    <a href="https://liquidui.dev"><img src="https://img.shields.io/badge/Demo-Live-brightgreen" alt="Demo"></a>
    <a href="#"><img src="https://img.shields.io/npm/v/@tuliopc23/liquidui?color=blue" alt="NPM Version"></a>
    <a href="#"><img src="https://img.shields.io/npm/dm/@tuliopc23/liquidui" alt="Downloads"></a>
    <a href="#"><img src="https://img.shields.io/github/stars/tuliopc23/liquidui" alt="GitHub Stars"></a>
    <a href="#"><img src="https://img.shields.io/badge/TypeScript-Ready-blue" alt="TypeScript"></a>
  </p>
  
  <p align="center">
    <a href="#-quick-start">Quick Start</a> •
    <a href="#-features">Features</a> •
    <a href="#-examples">Examples</a> •
    <a href="#-documentation">Docs</a> •
    <a href="https://storybook-static-or3ttelxf-tulio-pinheiro-cunha-s-projects.vercel.app">Storybook</a>
  </p>
</div>

## 🎯 Why LiquidiUI?

```tsx
// Other libraries: Static glass effects
<div className="backdrop-blur-md bg-white/10">Static</div>

// LiquidiUI: Content-aware adaptation + physics
<GlassCard>
  Content automatically adapts glass opacity, blur, and color
  Plus magnetic hover with realistic spring physics
</GlassCard>
```

**What makes LiquidiUI unique:**
- 🧠 **Content-aware adaptation** - Automatically analyzes background and adjusts glass effects
- ⚡ **Physics engine** - Realistic spring animations and magnetic interactions  
- 🎨 **30+ glass variants** - From basic frost to holographic and aurora effects
- 🔧 **TypeScript-first** - Complete type safety with excellent IntelliSense
- ♿ **Accessibility-first** - WCAG compliant with comprehensive testing
- 📱 **Mobile-optimized** - Touch-friendly with haptic feedback support

## ✨ Features

### 🎨 Advanced Visual Effects
- **30+ Glass Variants** - From basic frosted glass to holographic and iridescent effects
- **WebGL Shaders** - GPU-accelerated visual effects for stunning performance
- **Dynamic Lighting** - Real-time lighting calculations and reflections
- **Depth Layers** - Multi-layered glass effects with customizable depth

### 🎯 Interactive Components
- **Gesture Recognition** - Multi-touch support with custom gesture creation
- **Haptic Feedback** - Vibration patterns with audio and visual coordination
- **Physics Engine** - Spring dynamics, fluid simulation, and particle systems
- **Magnetic Interactions** - Elements that respond to cursor proximity

### 🚀 Performance Optimized
- **Virtual Scrolling** - Efficiently render large lists
- **Lazy Loading** - Load components only when needed
- **GPU Acceleration** - Leverage WebGL for smooth animations
- **Memory Management** - Automatic cleanup and optimization

### 📱 Cross-Platform
- **Responsive Design** - Works seamlessly across all devices
- **Touch Support** - Optimized for mobile interactions
- **Accessibility** - WCAG compliant with screen reader support
- **Progressive Enhancement** - Graceful degradation for older browsers

## 🚀 Quick Start

### Installation

```bash
# npm
npm install @tuliopc23/liquidui

# yarn  
yarn add @tuliopc23/liquidui

# pnpm
pnpm add @tuliopc23/liquidui
```

### Basic React Setup (2 minutes)

```tsx
// 1. Install and import
import { LiquidGlassProvider, GlassButton } from '@tuliopc23/liquidui'
import '@tuliopc23/liquidui/dist/liquidui.css'

// 2. Wrap your app
function App() {
  return (
    <LiquidGlassProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <GlassButton variant="primary" size="lg">
          Beautiful glass button with physics! 
        </GlassButton>
      </div>
    </LiquidGlassProvider>
  )
}
```

### CSS-Only Usage

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://unpkg.com/@tuliopc23/liquidui/dist/liquidui.css">
</head>
<body style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
  <div class="liquid-glass p-6 rounded-xl">
    <h2>Pure CSS Glass Effect</h2>
    <p>No JavaScript required!</p>
  </div>
</body>
</html>
```

> **💡 Pro tip:** Place glass components over colorful backgrounds for the best visual effect!

### Basic Setup

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="path/to/liquidui.css">
</head>
<body>
  <!-- Basic glass panel -->
  <div class="liquid-glass p-6 rounded-xl">
    <h2>Welcome to LiquidiUI</h2>
    <p>Beautiful glassmorphism effects made easy</p>
  </div>
</body>
</html>
```

### React Usage

```jsx
import { LiquidGlassProvider, GlassPanel, useGlassEffect } from '@tuliopc23/liquidui';
import '@tuliopc23/liquidui/dist/liquidui.css';

function App() {
  return (
    <LiquidGlassProvider>
      <GlassPanel variant="holographic" depth={3}>
        <h1>LiquidiUI React</h1>
      </GlassPanel>
    </LiquidGlassProvider>
  );
}
```

## 🎨 Glass Variants

### Basic Variants
- `liquid-glass` - Standard glassmorphism
- `liquid-glass-light` - Light frosted effect
- `liquid-glass-heavy` - Heavy blur effect
- `liquid-glass-ultra` - Maximum blur

### Special Effects
- `liquid-glass-holographic` - Animated rainbow effect
- `liquid-glass-iridescent` - Color-shifting surface
- `liquid-glass-aurora` - Northern lights animation
- `liquid-glass-plasma` - Flowing plasma effect
- `liquid-glass-crystal` - Crystalline reflections
- `liquid-glass-metal` - Liquid metal surface

### Neon Variants
- `liquid-glass-neon-blue`
- `liquid-glass-neon-pink`
- `liquid-glass-neon-green`
- `liquid-glass-neon-purple`

## 🧩 Components

### Buttons
```html
<button class="liquid-glass-button">
  Click Me
</button>

<button class="liquid-glass-button liquid-glass-magnetic">
  Magnetic Button
</button>

<button class="liquid-glass-button liquid-glass-ripple">
  Ripple Effect
</button>
```

### Forms
```html
<!-- Input -->
<input type="text" class="liquid-glass-input" placeholder="Enter text">

<!-- Select -->
<select class="liquid-glass-select">
  <option>Option 1</option>
  <option>Option 2</option>
</select>

<!-- Checkbox -->
<input type="checkbox" class="liquid-glass-checkbox">

<!-- Toggle -->
<label class="liquid-glass-toggle">
  <input type="checkbox">
  <span class="slider"></span>
</label>
```

### Cards
```html
<div class="liquid-glass-card">
  <div class="liquid-glass-card-header">
    <h3>Card Title</h3>
  </div>
  <div class="liquid-glass-card-body">
    <p>Card content goes here</p>
  </div>
</div>
```

### Progress Bars
```html
<div class="liquid-glass-progress">
  <div class="liquid-glass-progress-bar" style="width: 70%"></div>
</div>
```

## 🔧 Advanced Features

### WebGL Shaders

```javascript
import { GlassShader, ShaderType } from '@tuliopc23/liquidui';

// Create custom shader
const customShader = new GlassShader({
  type: ShaderType.REFRACTION,
  uniforms: {
    refractionRatio: 0.98,
    dispersion: 0.05
  }
});

// Apply to element
customShader.apply(document.querySelector('.my-glass-element'));
```

### Gesture Recognition

```javascript
import { GestureRecognizer } from '@tuliopc23/liquidui';

const element = document.querySelector('.gesture-area');
const recognizer = new GestureRecognizer(element);

recognizer.on('swipe', (event) => {
  console.log(`Swiped ${event.direction}`);
});

recognizer.on('pinch', (event) => {
  console.log(`Scale: ${event.scale}`);
});

recognizer.on('rotate', (event) => {
  console.log(`Rotation: ${event.angle}°`);
});
```

### Physics Engine

```javascript
import { SpringPhysics, SPRING_PRESETS } from '@tuliopc23/liquidui';

// Create spring animation
const spring = new SpringPhysics(SPRING_PRESETS.wobbly);

// Animate element
function animate() {
  const position = spring.update(targetPosition, deltaTime);
  element.style.transform = `translateX(${position}px)`;
  requestAnimationFrame(animate);
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
} from '@tuliopc23/liquidui'

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
} from '@tuliopc23/liquidui'

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
} from '@tuliopc23/liquidui'
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

### Haptic Feedback

```javascript
import { useHapticFeedback } from '@tuliopc23/liquidui';

const haptic = useHapticFeedback({
  vibration: true,
  audio: { enabled: true, volume: 0.5 },
  visual: { enabled: true, duration: 200 }
});

// Trigger feedback
button.addEventListener('click', () => {
  haptic.trigger('success');
});
```

## 📊 Performance Optimization

### Virtual Scrolling

```javascript
import { useVirtualScroll } from '@tuliopc23/liquidui';

const { visibleItems, totalHeight, scrollTop } = useVirtualScroll({
  items: largeDataArray,
  itemHeight: 50,
  containerHeight: 600,
  overscan: 3
});
```

### Lazy Loading

```javascript
import { LazyGlass } from '@tuliopc23/liquidui';

// Lazy load glass components
<LazyGlass
  variant="holographic"
  placeholder={<div>Loading...</div>}
  onLoad={() => console.log('Loaded!')}
>
  <ExpensiveComponent />
</LazyGlass>
```

## 🎯 Best Practices

1. **Performance**
   - Use `will-change` sparingly
   - Prefer `transform` over `top/left`
   - Batch DOM updates
   - Use virtual scrolling for long lists

2. **Accessibility**
   - Ensure sufficient contrast
   - Provide focus indicators
   - Add ARIA labels
   - Test with screen readers

3. **Mobile Optimization**
   - Use touch-friendly tap targets
   - Optimize for 60fps
   - Reduce blur on low-end devices
   - Test on real devices

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by Apple's design philosophy
- WebGL shaders based on Three.js
- Physics engine inspired by Matter.js
- Gesture recognition adapted from Hammer.js


---

<div align="center">
**[Documentation](https://docs-site-hch63l7kd-tulio-pinheiro-cunha-s-projects.vercel.app)** • **[Storybook](https://storybook-static-or3ttelxf-tulio-pinheiro-cunha-s-projects.vercel.app)** • **[Examples](https://github.com/tuliopc23/liquidui/tree/main/examples)** • **[NPM Package](https://www.npmjs.com/package/@tuliopc23/liquidui)**

Made with ❤️ by Tulio Cunha

</div>
