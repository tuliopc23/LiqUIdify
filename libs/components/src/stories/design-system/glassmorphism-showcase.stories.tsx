import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";

const meta = {
  title: "Design System/Glassmorphism",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
# High-Fidelity Liquid Glass Design System

## Apple-Quality Implementation

### **Layered Glass Architecture**
Our system uses sophisticated pseudo-element layers to create true depth and realism:
- **::before** - Advanced backdrop filter with saturation
- **::after** - Specular highlights and shine effects

### **Dynamic Theming**
CSS custom properties enable seamless light/dark theme transitions:
- **Light Theme**: Reduced opacity, enhanced saturation
- **Dark Theme**: Stronger contrast, deeper shadows

### **Hardware Acceleration**
All effects are GPU-optimized for smooth 60fps performance:
- **transform: translateZ(0)** for layer promotion
- **will-change** optimization where needed

## High-Fidelity Design Tokens

### **Core CSS Variables**
- **--lg-bg-color**: Dynamic background transparency
- **--lg-primary**: Apple system blue (#007aff)
- **--lg-transition**: cubic-bezier(0.175, 0.885, 0.32, 2.2)

### **Advanced Blur System**
- **Light Theme**: blur(10px) saturate(160%)
- **Dark Theme**: blur(12px) saturate(180%)
- **Ghost Light**: blur(8px) saturate(140%)
- **Ghost Dark**: blur(12px) saturate(185%)

### **Shadow Stacks**
- **Main**: 0 6px 6px rgba(0,0,0,0.2), 0 0 20px rgba(0,0,0,0.1)
- **Shine**: inset -10px -8px 0 -11px white, inset 0 -9px 0 -8px white
- **Focus**: Main + 0 0 0 4px rgba(0,122,255,0.2)
        `,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => (
    <div
      className="min-h-screen p-8"
      style={{
        fontFamily:
          "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
        background: `
          radial-gradient(80rem 60rem at 20% 20%, rgba(162, 210, 255, 0.3), transparent 60%),
          radial-gradient(80rem 60rem at 80% 30%, rgba(255, 183, 248, 0.28), transparent 60%), 
          linear-gradient(135deg, #c9e7ff 0%, #d9d0ff 45%, #ffc9dc 100%)
        `,
      }}
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Hero Section */}
        <div className="text-center text-white mb-12">
          <h1 className="text-5xl font-bold mb-4">
            High-Fidelity Liquid Glass System
          </h1>
          <p className="text-xl opacity-90">
            Apple-quality glassmorphism with advanced layered effects
          </p>
        </div>

        {/* High-Fidelity Glass Showcase */}
        <section className="theme-dark">
          <div
            style={{
              color: "#d7dbffcc",
              fontWeight: 600,
              letterSpacing: "0.02em",
              marginBottom: "1.5rem",
            }}
          >
            Dark Mode - High-Fidelity Implementation
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="liquid-glass liquid-glass-card liquid-glass-lg">
              <h3 className="text-lg font-semibold mb-2">Primary Button</h3>
              <p className="text-sm opacity-75 mb-4">
                Blue gradient with layered glass effects
              </p>
              <button className="liquid-glass liquid-glass-interactive liquid-glass-button liquid-glass-md liquid-glass-button-primary">
                Primary
              </button>
              <div className="mt-4 text-xs opacity-75">
                <code>liquid-glass-button-primary</code>
              </div>
            </div>

            <div className="liquid-glass liquid-glass-card liquid-glass-lg">
              <h3 className="text-lg font-semibold mb-2">Secondary Glass</h3>
              <p className="text-sm opacity-75 mb-4">
                Pure glass with backdrop blur and shine
              </p>
              <button className="liquid-glass liquid-glass-interactive liquid-glass-button liquid-glass-md liquid-glass-button-secondary">
                Secondary
              </button>
              <div className="mt-4 text-xs opacity-75">
                <code>liquid-glass-button-secondary</code>
              </div>
            </div>

            <div className="liquid-glass liquid-glass-card liquid-glass-lg">
              <h3 className="text-lg font-semibold mb-2">Ghost Glass</h3>
              <p className="text-sm opacity-75 mb-4">
                Ultra-transparent with enhanced depth
              </p>
              <button className="liquid-glass liquid-glass-interactive liquid-glass-button liquid-glass-md liquid-glass-button-ghost">
                Ghost
              </button>
              <div className="mt-4 text-xs opacity-75">
                <code>liquid-glass-button-ghost</code>
              </div>
            </div>
          </div>
        </section>

        {/* Light Theme Showcase */}
        <section className="theme-light">
          <div
            style={{
              color: "#64748b",
              fontWeight: 600,
              letterSpacing: "0.02em",
              marginBottom: "1.5rem",
            }}
          >
            Light Mode - Adaptive Transparency
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="liquid-glass liquid-glass-card liquid-glass-lg">
              <h3 className="text-lg font-semibold mb-2">Primary Light</h3>
              <p className="text-sm opacity-75 mb-4">
                Apple blue with light theme adaptation
              </p>
              <button className="liquid-glass liquid-glass-interactive liquid-glass-button liquid-glass-md liquid-glass-button-primary">
                Primary
              </button>
            </div>

            <div className="liquid-glass liquid-glass-card liquid-glass-lg">
              <h3 className="text-lg font-semibold mb-2">Secondary Light</h3>
              <p className="text-sm opacity-75 mb-4">
                Reduced opacity for light backgrounds
              </p>
              <button className="liquid-glass liquid-glass-interactive liquid-glass-button liquid-glass-md liquid-glass-button-secondary">
                Secondary
              </button>
            </div>

            <div className="liquid-glass liquid-glass-card liquid-glass-lg">
              <h3 className="text-lg font-semibold mb-2">Ghost Light</h3>
              <p className="text-sm opacity-75 mb-4">
                Barely-there transparency
              </p>
              <button className="liquid-glass liquid-glass-interactive liquid-glass-button liquid-glass-md liquid-glass-button-ghost">
                Ghost
              </button>
            </div>
          </div>
        </section>

        {/* Apple Color System */}
        <section className="theme-dark">
          <div
            style={{
              color: "#d7dbffcc",
              fontWeight: 600,
              letterSpacing: "0.02em",
              marginBottom: "1.5rem",
            }}
          >
            Apple Color System
          </div>
          <div className="liquid-glass liquid-glass-card liquid-glass-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div
                  className="h-24 rounded-lg mb-3"
                  style={{
                    background:
                      "linear-gradient(135deg, #007aff 0%, #5ac8fa 100%)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                />
                <h4 className="font-medium mb-1">Primary System</h4>
                <code className="text-xs opacity-75">#007aff → #5ac8fa</code>
              </div>
              <div>
                <div
                  className="h-24 rounded-lg mb-3"
                  style={{
                    background: "var(--lg-bg-color)",
                    backdropFilter: "blur(12px) saturate(180%)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  }}
                />
                <h4 className="font-medium mb-1">Glass Background</h4>
                <code className="text-xs opacity-75">--lg-bg-color</code>
              </div>
              <div>
                <div
                  className="h-24 rounded-lg mb-3"
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    boxShadow:
                      "inset -10px -8px 0 -11px rgba(255,255,255,1), inset 0 -9px 0 -8px rgba(255,255,255,1)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  }}
                />
                <h4 className="font-medium mb-1">Shine Effect</h4>
                <code className="text-xs opacity-75">--lg-shine-shadow</code>
              </div>
              <div>
                <div
                  className="h-24 rounded-lg mb-3"
                  style={{
                    background: "transparent",
                    backdropFilter: "blur(12px) saturate(180%)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                />
                <h4 className="font-medium mb-1">Pure Glass</h4>
                <code className="text-xs opacity-75">transparent</code>
              </div>
            </div>
          </div>
        </section>

        {/* Size Variants */}
        <section className="theme-dark">
          <div
            style={{
              color: "#d7dbffcc",
              fontWeight: 600,
              letterSpacing: "0.02em",
              marginBottom: "1.5rem",
            }}
          >
            Size Variants - Consistent Scaling
          </div>
          <div className="liquid-glass liquid-glass-card liquid-glass-lg">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <button className="liquid-glass liquid-glass-interactive liquid-glass-button liquid-glass-xs liquid-glass-button-xs liquid-glass-button-primary">
                XS
              </button>
              <button className="liquid-glass liquid-glass-interactive liquid-glass-button liquid-glass-sm liquid-glass-button-sm liquid-glass-button-primary">
                Small
              </button>
              <button className="liquid-glass liquid-glass-interactive liquid-glass-button liquid-glass-md liquid-glass-button-md liquid-glass-button-primary">
                Medium
              </button>
              <button className="liquid-glass liquid-glass-interactive liquid-glass-button liquid-glass-lg liquid-glass-button-lg liquid-glass-button-primary">
                Large
              </button>
              <button className="liquid-glass liquid-glass-interactive liquid-glass-button liquid-glass-xl liquid-glass-button-xl liquid-glass-button-primary">
                XL
              </button>
            </div>

            <div className="text-sm opacity-75 space-y-2">
              <div>
                <code>.liquid-glass-button-xs</code> - Extra small button (8px
                16px)
              </div>
              <div>
                <code>.liquid-glass-button-sm</code> - Small button (10px 20px)
              </div>
              <div>
                <code>.liquid-glass-button-md</code> - Medium button (12px 28px)
              </div>
              <div>
                <code>.liquid-glass-button-lg</code> - Large button (16px 36px)
              </div>
              <div>
                <code>.liquid-glass-button-xl</code> - Extra large button (20px
                44px)
              </div>
            </div>
          </div>
        </section>

        {/* Border Radius System */}
        <section className="theme-dark">
          <div
            style={{
              color: "#d7dbffcc",
              fontWeight: 600,
              letterSpacing: "0.02em",
              marginBottom: "1.5rem",
            }}
          >
            Border Radius System
          </div>
          <div className="liquid-glass liquid-glass-card liquid-glass-lg">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div
                className="liquid-glass liquid-glass-xs"
                style={{
                  height: "60px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <code className="text-xs">xs: 12px</code>
              </div>
              <div
                className="liquid-glass liquid-glass-sm"
                style={{
                  height: "60px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <code className="text-xs">sm: 16px</code>
              </div>
              <div
                className="liquid-glass liquid-glass-md"
                style={{
                  height: "60px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <code className="text-xs">md: 20px</code>
              </div>
              <div
                className="liquid-glass liquid-glass-lg"
                style={{
                  height: "60px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <code className="text-xs">lg: 24px</code>
              </div>
              <div
                className="liquid-glass liquid-glass-xl"
                style={{
                  height: "60px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <code className="text-xs">xl: 32px</code>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  ),
};

export const ComponentShowcase: Story = {
  render: () => (
    <div
      className="min-h-screen p-8"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-white mb-8">
          Component Showcase
        </h1>

        {/* Buttons */}
        <GlassCard className="p-8">
          <h2 className="text-2xl font-semibold mb-6">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <GlassButton variant="primary">Primary Button</GlassButton>
            <GlassButton variant="secondary">Secondary Button</GlassButton>
            <GlassButton variant="ghost">Ghost Button</GlassButton>
            <GlassButton variant="danger">Danger Button</GlassButton>
            <GlassButton disabled>Disabled Button</GlassButton>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10">
            <h3 className="text-lg font-medium mb-4">Button Sizes</h3>
            <div className="flex flex-wrap items-center gap-4">
              <GlassButton size="sm">Small</GlassButton>
              <GlassButton size="md">Medium</GlassButton>
              <GlassButton size="lg">Large</GlassButton>
            </div>
          </div>
        </GlassCard>

        {/* Badges */}
        <GlassCard className="p-8">
          <h2 className="text-2xl font-semibold mb-6">Badges</h2>
          <div className="flex flex-wrap gap-4">
            <GlassBadge variant="default">Default</GlassBadge>
            <GlassBadge variant="primary">Primary</GlassBadge>
            <GlassBadge variant="success">Success</GlassBadge>
            <GlassBadge variant="warning">Warning</GlassBadge>
            <GlassBadge variant="danger">Danger</GlassBadge>
            <GlassBadge variant="info">Info</GlassBadge>
          </div>
        </GlassCard>

        {/* Interactive States */}
        <GlassCard className="p-8">
          <h2 className="text-2xl font-semibold mb-6">Interactive States</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium mb-3">Default State</h3>
              <div className="p-4 rounded-lg bg-white/10 border border-white/20">
                Resting state with base glass effect
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-3">Hover State</h3>
              <div className="p-4 rounded-lg bg-white/15 border border-white/30 transition-all hover:bg-white/20">
                Enhanced glass effect on hover
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-3">Active State</h3>
              <div className="p-4 rounded-lg bg-white/20 border border-white/40">
                Pressed state with stronger effect
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  ),
};

export const DesignGuidelines: Story = {
  render: () => (
    <div
      className="min-h-screen p-8"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-white mb-8">
          Design Guidelines
        </h1>

        {/* Do's and Don'ts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <GlassCard className="p-8">
            <h2 className="text-2xl font-semibold mb-6 text-green-400">
              ✓ Do's
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-green-400 mt-1">✓</span>
                <div>
                  <strong>Use consistent blur values</strong>
                  <p className="text-sm opacity-75 mt-1">
                    Maintain the same blur intensity across similar components
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 mt-1">✓</span>
                <div>
                  <strong>Layer glass effects thoughtfully</strong>
                  <p className="text-sm opacity-75 mt-1">
                    Create depth with multiple glass layers at different
                    opacities
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 mt-1">✓</span>
                <div>
                  <strong>Ensure sufficient contrast</strong>
                  <p className="text-sm opacity-75 mt-1">
                    Always test readability against various backgrounds
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 mt-1">✓</span>
                <div>
                  <strong>Use subtle animations</strong>
                  <p className="text-sm opacity-75 mt-1">
                    Enhance interactions with smooth, minimal transitions
                  </p>
                </div>
              </li>
            </ul>
          </GlassCard>

          <GlassCard className="p-8">
            <h2 className="text-2xl font-semibold mb-6 text-red-400">
              ✗ Don'ts
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <div>
                  <strong>Overuse glass effects</strong>
                  <p className="text-sm opacity-75 mt-1">
                    Too many glass layers can reduce clarity and performance
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <div>
                  <strong>Use on busy backgrounds</strong>
                  <p className="text-sm opacity-75 mt-1">
                    Glass effects work best on simple, gradient backgrounds
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <div>
                  <strong>Ignore accessibility</strong>
                  <p className="text-sm opacity-75 mt-1">
                    Always ensure WCAG compliance for contrast ratios
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span>
                <div>
                  <strong>Mix different design languages</strong>
                  <p className="text-sm opacity-75 mt-1">
                    Keep the glassmorphism style consistent throughout
                  </p>
                </div>
              </li>
            </ul>
          </GlassCard>
        </div>

        {/* Best Practices */}
        <GlassCard className="p-8">
          <h2 className="text-2xl font-semibold mb-6">Best Practices</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium mb-3">Performance</h3>
              <ul className="space-y-2 text-sm opacity-75">
                <li>• Use CSS backdrop-filter for GPU acceleration</li>
                <li>• Limit the number of blur layers</li>
                <li>• Optimize for mobile devices</li>
                <li>• Test on various devices</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-3">Accessibility</h3>
              <ul className="space-y-2 text-sm opacity-75">
                <li>• Maintain WCAG AA contrast ratios</li>
                <li>• Provide focus indicators</li>
                <li>• Support keyboard navigation</li>
                <li>• Test with screen readers</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-3">Consistency</h3>
              <ul className="space-y-2 text-sm opacity-75">
                <li>• Use design tokens consistently</li>
                <li>• Follow spacing guidelines</li>
                <li>• Maintain visual hierarchy</li>
                <li>• Apply effects uniformly</li>
              </ul>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  ),
};
