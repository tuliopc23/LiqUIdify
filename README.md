# Glass UI - Advanced Glassmorphism Library

<div align="center">
  <img src="https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1200&h=400&fit=crop" alt="Glass UI Banner" />
  
  <p align="center">
    <strong>A cutting-edge glassmorphism library with physics-based animations, WebGL shaders, and haptic feedback</strong>
  </p>
  
  <p align="center">
    <a href="#features">Features</a> •
    <a href="#installation">Installation</a> •
    <a href="#usage">Usage</a> •
    <a href="#components">Components</a> •
    <a href="#api">API</a> •
    <a href="#examples">Examples</a>
  </p>
</div>

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

## 📦 Installation

### NPM
```bash
npm install glass-ui
```

### Yarn
```bash
yarn add glass-ui
```

### CDN
```html
<!-- CSS -->
<link rel="stylesheet" href="https://unpkg.com/glass-ui/dist/glass.min.css">

<!-- JavaScript -->
<script src="https://unpkg.com/glass-ui/dist/glass.min.js"></script>
```

## 🚀 Quick Start

### Basic Setup

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="path/to/glass.css">
</head>
<body>
  <!-- Basic glass panel -->
  <div class="liquid-glass p-6 rounded-xl">
    <h2>Welcome to Glass UI</h2>
    <p>Beautiful glassmorphism effects made easy</p>
  </div>
</body>
</html>
```

### React Usage

```jsx
import { GlassProvider, GlassPanel, useGlassEffect } from 'glass-ui';
import 'glass-ui/dist/glass.css';

function App() {
  return (
    <GlassProvider>
      <GlassPanel variant="holographic" depth={3}>
        <h1>Glass UI React</h1>
      </GlassPanel>
    </GlassProvider>
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
import { GlassShader, ShaderType } from 'glass-ui';

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
import { GestureRecognizer } from 'glass-ui';

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
import { SpringPhysics, SPRING_PRESETS } from 'glass-ui';

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

### Haptic Feedback

```javascript
import { useHapticFeedback } from 'glass-ui';

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
import { useVirtualScroll } from 'glass-ui';

const { visibleItems, totalHeight, scrollTop } = useVirtualScroll({
  items: largeDataArray,
  itemHeight: 50,
  containerHeight: 600,
  overscan: 3
});
```

### Lazy Loading

```javascript
import { LazyGlass } from 'glass-ui';

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
**[Website](https://glass-ui.dev)** • **[Documentation](https://glass-ui.dev/docs)** • **[Examples](https://examples.glass-ui.dev)** • **[Brand Guidelines](https://brand.tulio.dev)**

Made with ❤️ by Tulio Cunha

</div>
