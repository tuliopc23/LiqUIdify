import type { Meta, StoryObj } from '@storybook/react';
import { designTokens } from '@/tokens/design-tokens';

const meta = {
  title: 'Design System/Design Tokens',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Comprehensive design tokens for consistent theming across the LiquidUI component library.',
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
    <div className="space-y-12 p-8">
      <div>
        <h2 className="mb-6 font-bold text-2xl">Typography Scale</h2>
        <div className="space-y-4">
          {Object.entries(designTokens.typography.fontSize).map(
            ([key, value]) => {
              const [fontSize, properties] = Array.isArray(value)
                ? value
                : [value, {}];
              return (
                <div key={key} className="flex items-baseline gap-4">
                  <span className="w-20 font-mono text-gray-500 text-sm">
                    {key}
                  </span>
                  <span
                    style={{
                      fontSize,
                      ...(typeof properties === 'object' ? properties : {}),
                    }}
                    className="font-sans"
                  >
                    The quick brown fox jumps over the lazy dog
                  </span>
                  <span className="font-mono text-gray-400 text-xs">
                    {fontSize}
                  </span>
                </div>
              );
            }
          )}
        </div>
      </div>

      <div>
        <h2 className="mb-6 font-bold text-2xl">Font Families</h2>
        <div className="space-y-4">
          {Object.entries(designTokens.typography.fontFamily).map(
            ([key, fonts]) => (
              <div key={key} className="space-y-2">
                <h3 className="font-semibold text-lg capitalize">{key}</h3>
                <p
                  style={{
                    fontFamily: Array.isArray(fonts) ? fonts.join(', ') : fonts,
                  }}
                  className="text-base"
                >
                  The quick brown fox jumps over the lazy dog - 0123456789
                </p>
                <p className="font-mono text-gray-500 text-xs">
                  {Array.isArray(fonts)
                    ? `${fonts.slice(0, 3).join(', ')}...`
                    : fonts}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  ),
};

// Spacing Scale
export const Spacing: Story = {
  render: () => (
    <div className="p-8">
      <h2 className="mb-6 font-bold text-2xl">Spacing Scale</h2>
      <div className="space-y-2">
        {Object.entries(designTokens.spacing).map(([key, value]) => (
          <div key={key} className="flex items-center gap-4">
            <span className="w-16 font-mono text-gray-500 text-sm">{key}</span>
            <div
              className="h-8 bg-blue-500 transition-all hover:bg-blue-600"
              style={{ width: value }}
            />
            <span className="font-mono text-gray-400 text-xs">{value}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};

// Color Palette
export const Colors: Story = {
  render: () => (
    <div className="space-y-12 p-8">
      <div>
        <h2 className="mb-6 font-bold text-2xl">Glass Color System</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {/* Light Theme Colors */}
          <div className="space-y-2">
            <h3 className="font-semibold">Light Theme</h3>
            <div className="space-y-2">
              <ColorSwatch color="rgba(255, 255, 255, 0.1)" label="Glass BG" />
              <ColorSwatch
                color="rgba(255, 255, 255, 0.2)"
                label="Glass Hover"
              />
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
        <h2 className="mb-6 font-bold text-2xl">Opacity Scale</h2>
        <div className="grid grid-cols-5 gap-4">
          {[10, 20, 30, 50, 70, 80, 90, 95, 100].map((opacity) => (
            <div key={opacity} className="text-center">
              <div
                className="h-20 w-full rounded-lg border"
                style={{
                  backgroundColor: `rgba(0, 122, 255, ${opacity / 100})`,
                  borderColor: 'rgba(0, 0, 0, 0.1)',
                }}
              />
              <span className="mt-2 font-mono text-sm">{opacity}%</span>
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
    <div className="space-y-12 p-8">
      <div>
        <h2 className="mb-6 font-bold text-2xl">Animation Timing</h2>
        <div className="space-y-4">
          {[
            { name: 'Fast', duration: '150ms', easing: 'ease-out' },
            { name: 'Normal', duration: '300ms', easing: 'ease-in-out' },
            { name: 'Slow', duration: '500ms', easing: 'ease-in-out' },
            {
              name: 'Spring',
              duration: '700ms',
              easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            },
          ].map(({ name, duration, easing }) => (
            <div key={name} className="flex items-center gap-4">
              <span className="w-20 font-mono text-gray-500 text-sm">
                {name}
              </span>
              <div className="relative h-12 flex-1 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                <div
                  className="absolute inset-y-0 left-0 h-12 w-12 animate-slide rounded-lg bg-blue-500"
                  style={{
                    animation: `slide ${duration} ${easing} infinite alternate`,
                  }}
                />
              </div>
              <span className="w-40 font-mono text-gray-400 text-xs">
                {duration} / {easing.split('(')[0]}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-6 font-bold text-2xl">Blur & Glass Effects</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[0, 4, 8, 12, 16, 20, 24, 32].map((blur) => (
            <div
              key={blur}
              className="flex aspect-square flex-col items-center justify-center rounded-lg p-4 text-center"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: `blur(${blur}px)`,
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <span className="font-semibold text-lg">Blur</span>
              <span className="font-mono text-sm">{blur}px</span>
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
  isGradient = false,
}: {
  color: string;
  label: string;
  isGradient?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="h-12 w-12 rounded-lg border border-gray-300 dark:border-gray-600"
        style={{
          background: color,
          ...(isGradient ? {} : { backgroundColor: color }),
        }}
      />
      <div className="flex-1">
        <p className="font-medium text-sm">{label}</p>
        <p className="truncate font-mono text-gray-500 text-xs">{color}</p>
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
