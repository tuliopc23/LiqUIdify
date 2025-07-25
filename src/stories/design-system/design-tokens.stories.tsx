import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { designTokens } from '@/tokens/design-tokens';

const meta = {
  title: 'Design System/Design Tokens',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Comprehensive design tokens for consistent theming across the LiquidUI component library.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Typography Showcase
export const Typography: Story = {
  render: () => (
    <div className="p-8 space-y-12">
      <div>
        <h2 className="text-2xl font-bold mb-6">Typography Scale</h2>
        <div className="space-y-4">
          {Object.entries(designTokens.typography.fontSize).map(([key, value]) => {
            const [fontSize, properties] = Array.isArray(value) ? value : [value, {}];
            return (
              <div key={key} className="flex items-baseline gap-4">
                <span className="text-sm font-mono text-gray-500 w-20">{key}</span>
                <span 
                  style={{ 
                    fontSize, 
                    ...(typeof properties === 'object' ? properties : {})
                  }}
                  className="font-sans"
                >
                  The quick brown fox jumps over the lazy dog
                </span>
                <span className="text-xs text-gray-400 font-mono">{fontSize}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Font Families</h2>
        <div className="space-y-4">
          {Object.entries(designTokens.typography.fontFamily).map(([key, fonts]) => (
            <div key={key} className="space-y-2">
              <h3 className="text-lg font-semibold capitalize">{key}</h3>
              <p 
                style={{ fontFamily: Array.isArray(fonts) ? fonts.join(', ') : fonts }}
                className="text-base"
              >
                The quick brown fox jumps over the lazy dog - 0123456789
              </p>
              <p className="text-xs text-gray-500 font-mono">
                {Array.isArray(fonts) ? fonts.slice(0, 3).join(', ') + '...' : fonts}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

// Spacing Scale
export const Spacing: Story = {
  render: () => (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Spacing Scale</h2>
      <div className="space-y-2">
        {Object.entries(designTokens.spacing).map(([key, value]) => (
          <div key={key} className="flex items-center gap-4">
            <span className="text-sm font-mono text-gray-500 w-16">
              {key}
            </span>
            <div 
              className="bg-blue-500 h-8 transition-all hover:bg-blue-600"
              style={{ width: value }}
            />
            <span className="text-xs text-gray-400 font-mono">{value}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};

// Color Palette
export const Colors: Story = {
  render: () => (
    <div className="p-8 space-y-12">
      <div>
        <h2 className="text-2xl font-bold mb-6">Glass Color System</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Light Theme Colors */}
          <div className="space-y-2">
            <h3 className="font-semibold">Light Theme</h3>
            <div className="space-y-2">
              <ColorSwatch color="rgba(255, 255, 255, 0.1)" label="Glass BG" />
              <ColorSwatch color="rgba(255, 255, 255, 0.2)" label="Glass Hover" />
              <ColorSwatch color="rgba(0, 0, 0, 0.1)" label="Border" />
              <ColorSwatch color="#1a1a1a" label="Text" />
            </div>
          </div>
          
          {/* Dark Theme Colors */}
          <div className="space-y-2">
            <h3 className="font-semibold">Dark Theme</h3>
            <div className="space-y-2">
              <ColorSwatch color="rgba(0, 0, 0, 0.1)" label="Glass BG" />
              <ColorSwatch color="rgba(0, 0, 0, 0.2)" label="Glass Hover" />
              <ColorSwatch color="rgba(255, 255, 255, 0.1)" label="Border" />
              <ColorSwatch color="#f1f5f9" label="Text" />
            </div>
          </div>

          {/* Brand Colors */}
          <div className="space-y-2">
            <h3 className="font-semibold">Brand Colors</h3>
            <div className="space-y-2">
              <ColorSwatch color="#007AFF" label="Primary" />
              <ColorSwatch color="#5856D6" label="Secondary" />
              <ColorSwatch color="#FF3B30" label="Danger" />
              <ColorSwatch color="#34C759" label="Success" />
            </div>
          </div>

          {/* Gradient Presets */}
          <div className="space-y-2">
            <h3 className="font-semibold">Gradients</h3>
            <div className="space-y-2">
              <ColorSwatch 
                color="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" 
                label="Primary" 
                isGradient 
              />
              <ColorSwatch 
                color="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" 
                label="Danger" 
                isGradient 
              />
              <ColorSwatch 
                color="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" 
                label="Info" 
                isGradient 
              />
              <ColorSwatch 
                color="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)" 
                label="Success" 
                isGradient 
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Opacity Scale</h2>
        <div className="grid grid-cols-5 gap-4">
          {[10, 20, 30, 50, 70, 80, 90, 95, 100].map(opacity => (
            <div key={opacity} className="text-center">
              <div 
                className="w-full h-20 rounded-lg border"
                style={{ 
                  backgroundColor: `rgba(0, 122, 255, ${opacity / 100})`,
                  borderColor: 'rgba(0, 0, 0, 0.1)'
                }}
              />
              <span className="text-sm font-mono mt-2">{opacity}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

// Animation & Motion
export const Motion: Story = {
  render: () => (
    <div className="p-8 space-y-12">
      <div>
        <h2 className="text-2xl font-bold mb-6">Animation Timing</h2>
        <div className="space-y-4">
          {[
            { name: 'Fast', duration: '150ms', easing: 'ease-out' },
            { name: 'Normal', duration: '300ms', easing: 'ease-in-out' },
            { name: 'Slow', duration: '500ms', easing: 'ease-in-out' },
            { name: 'Spring', duration: '700ms', easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' },
          ].map(({ name, duration, easing }) => (
            <div key={name} className="flex items-center gap-4">
              <span className="text-sm font-mono text-gray-500 w-20">{name}</span>
              <div className="flex-1 h-12 relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                <div 
                  className="absolute inset-y-0 left-0 w-12 h-12 bg-blue-500 rounded-lg animate-slide"
                  style={{
                    animation: `slide ${duration} ${easing} infinite alternate`,
                  }}
                />
              </div>
              <span className="text-xs text-gray-400 font-mono w-40">
                {duration} / {easing.split('(')[0]}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Blur & Glass Effects</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[0, 4, 8, 12, 16, 20, 24, 32].map(blur => (
            <div 
              key={blur}
              className="aspect-square rounded-lg p-4 flex flex-col items-center justify-center text-center"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: `blur(${blur}px)`,
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <span className="text-lg font-semibold">Blur</span>
              <span className="text-sm font-mono">{blur}px</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

// Helper Components
function ColorSwatch({ 
  color, 
  label, 
  isGradient = false 
}: { 
  color: string; 
  label: string; 
  isGradient?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <div 
        className="w-12 h-12 rounded-lg border border-gray-300 dark:border-gray-600"
        style={{ 
          background: color,
          ...(isGradient ? {} : { backgroundColor: color })
        }}
      />
      <div className="flex-1">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-gray-500 font-mono truncate">
          {color}
        </p>
      </div>
    </div>
  );
}

// Add keyframes for animation demo
const style = document.createElement('style');
style.textContent = `
  @keyframes slide {
    from { transform: translateX(0); }
    to { transform: translateX(calc(100% - 3rem)); }
  }
`;
document.head.appendChild(style);