import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { GlassCard } from '@/components/glass-card-refactored/glass-card';
import { GlassButton } from '@/components/glass-button-refactored/glass-button';
import { GlassBadge } from '@/components/glass-badge/glass-badge';

const meta = {
  title: 'Design System/Glassmorphism',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# LiqUIdify Glassmorphism Design System

## Core Principles

### 1. **Transparency & Blur**
Our glassmorphism effect creates depth through carefully balanced transparency and backdrop blur, 
creating a sophisticated layered interface.

### 2. **Subtle Borders**
Semi-transparent borders enhance the glass effect while maintaining clear component boundaries.

### 3. **Responsive Effects**
All glassmorphism effects adapt to different backgrounds and color schemes automatically.

### 4. **Performance Optimized**
Uses GPU-accelerated CSS properties for smooth, efficient rendering.

## Design Tokens

### Glass Effects
- **Base Glass**: \`rgba(255, 255, 255, 0.1)\` with \`backdrop-blur: 12px\`
- **Glass Border**: \`rgba(255, 255, 255, 0.2)\`
- **Glass Hover**: \`rgba(255, 255, 255, 0.15)\`

### Blur Levels
- **Subtle**: \`8px\` - For minimal glass effect
- **Standard**: \`12px\` - Default for most components
- **Strong**: \`20px\` - For prominent overlays
- **Maximum**: \`40px\` - For full-screen modals

### Border Radius
- **Small**: \`8px\` - Compact components
- **Medium**: \`12px\` - Standard components
- **Large**: \`16px\` - Cards and containers
- **Extra Large**: \`24px\` - Hero sections
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
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Hero Section */}
        <div className="text-center text-white mb-12">
          <h1 className="text-5xl font-bold mb-4">Glassmorphism Design System</h1>
          <p className="text-xl opacity-90">
            Beautiful, modern UI components with liquid glass effects
          </p>
        </div>

        {/* Glass Effect Showcase */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Glass Effect Variations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold mb-2">Subtle Glass</h3>
              <p className="text-sm opacity-75 mb-4">
                Light transparency with minimal blur for subtle depth
              </p>
              <div 
                className="h-20 rounded-lg mb-4"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              />
              <code className="text-xs">blur: 8px, opacity: 0.05</code>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold mb-2">Standard Glass</h3>
              <p className="text-sm opacity-75 mb-4">
                Balanced transparency and blur for most use cases
              </p>
              <div 
                className="h-20 rounded-lg mb-4"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              />
              <code className="text-xs">blur: 12px, opacity: 0.1</code>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold mb-2">Strong Glass</h3>
              <p className="text-sm opacity-75 mb-4">
                Heavy blur with higher opacity for prominent elements
              </p>
              <div 
                className="h-20 rounded-lg mb-4"
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                }}
              />
              <code className="text-xs">blur: 20px, opacity: 0.15</code>
            </GlassCard>
          </div>
        </section>

        {/* Color System */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Color System</h2>
          <GlassCard className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div 
                  className="h-24 rounded-lg mb-3"
                  style={{ background: '#007AFF' }}
                />
                <h4 className="font-medium mb-1">Primary</h4>
                <code className="text-xs opacity-75">#007AFF</code>
              </div>
              <div>
                <div 
                  className="h-24 rounded-lg mb-3"
                  style={{ background: '#34C759' }}
                />
                <h4 className="font-medium mb-1">Success</h4>
                <code className="text-xs opacity-75">#34C759</code>
              </div>
              <div>
                <div 
                  className="h-24 rounded-lg mb-3"
                  style={{ background: '#FF9500' }}
                />
                <h4 className="font-medium mb-1">Warning</h4>
                <code className="text-xs opacity-75">#FF9500</code>
              </div>
              <div>
                <div 
                  className="h-24 rounded-lg mb-3"
                  style={{ background: '#FF3B30' }}
                />
                <h4 className="font-medium mb-1">Error</h4>
                <code className="text-xs opacity-75">#FF3B30</code>
              </div>
            </div>
          </GlassCard>
        </section>

        {/* Typography Scale */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Typography Scale</h2>
          <GlassCard className="p-8 space-y-4">
            <div className="text-4xl font-bold">Display Heading</div>
            <div className="text-3xl font-semibold">Page Title</div>
            <div className="text-2xl font-semibold">Section Heading</div>
            <div className="text-xl font-medium">Subsection</div>
            <div className="text-lg">Large Body Text</div>
            <div className="text-base">Default Body Text</div>
            <div className="text-sm opacity-75">Small Text</div>
            <div className="text-xs opacity-50">Caption Text</div>
          </GlassCard>
        </section>

        {/* Spacing System */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Spacing System</h2>
          <GlassCard className="p-8">
            <div className="space-y-4">
              {[1, 2, 4, 6, 8, 12, 16, 20, 24].map((spacing) => (
                <div key={spacing} className="flex items-center gap-4">
                  <code className="text-sm w-16">{spacing * 4}px</code>
                  <div 
                    className="bg-blue-500/30 rounded"
                    style={{ 
                      width: `${spacing * 4}px`, 
                      height: '24px' 
                    }}
                  />
                  <span className="text-sm opacity-75">
                    {spacing === 1 && 'Micro'}
                    {spacing === 2 && 'Tiny'}
                    {spacing === 4 && 'Small'}
                    {spacing === 6 && 'Medium'}
                    {spacing === 8 && 'Large'}
                    {spacing === 12 && 'Extra Large'}
                    {spacing === 16 && 'Huge'}
                    {spacing === 20 && 'Gigantic'}
                    {spacing === 24 && 'Massive'}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>
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
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-white mb-8">Component Showcase</h1>
        
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
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-white mb-8">Design Guidelines</h1>
        
        {/* Do's and Don'ts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <GlassCard className="p-8">
            <h2 className="text-2xl font-semibold mb-6 text-green-400">✓ Do's</h2>
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
                    Create depth with multiple glass layers at different opacities
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
            <h2 className="text-2xl font-semibold mb-6 text-red-400">✗ Don'ts</h2>
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
