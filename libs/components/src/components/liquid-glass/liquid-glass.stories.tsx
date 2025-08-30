import type { Meta, StoryObj } from "@storybook/react";
import { LiquidGlass } from "./liquid-glass";

const meta = {
  title: "Foundation/LiquidGlass",
  component: LiquidGlass,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "The foundational LiquidGlass component implementing Apple's Liquid Glass design language with physics-based interactions.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["button", "card", "panel", "floating", "navigation"],
      description: "The visual variant of the glass component"
    },
    intensity: {
      control: "select", 
      options: ["subtle", "medium", "strong"],
      description: "The intensity of the glass effect"
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "The size of the component"
    },
    radius: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "full"],
      description: "The border radius of the component"
    },
    rippleEffect: {
      control: "boolean",
      description: "Enable ripple effect on click/touch"
    },
    hoverGlow: {
      control: "boolean",
      description: "Enable hover glow effect that follows cursor"
    },
    dragPhysics: {
      control: "boolean", 
      description: "Enable drag physics with jiggle animation"
    }
  },
  args: {
    variant: "card",
    intensity: "medium",
    size: "md",
    radius: "lg",
    rippleEffect: true,
    hoverGlow: true,
    dragPhysics: false,
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8 flex items-center justify-center">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LiquidGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <LiquidGlass {...args}>
      <div className="text-white font-medium">
        <h3 className="text-lg font-semibold mb-2">Liquid Glass</h3>
        <p className="text-sm opacity-80">Apple's revolutionary material design</p>
      </div>
    </LiquidGlass>
  ),
};

export const Variants: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Variants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <LiquidGlass variant="button" className="justify-center">
            <span className="text-white font-medium">Button Variant</span>
          </LiquidGlass>
          <LiquidGlass variant="card">
            <div className="text-white">
              <h3 className="font-semibold mb-2">Card Variant</h3>
              <p className="text-sm opacity-80">Perfect for content containers</p>
            </div>
          </LiquidGlass>
          <LiquidGlass variant="panel">
            <div className="text-white">
              <h3 className="font-semibold mb-2">Panel Variant</h3>
              <p className="text-sm opacity-80">Ideal for larger content areas</p>
            </div>
          </LiquidGlass>
          <LiquidGlass variant="floating" className="w-fit mx-auto">
            <span className="text-white font-medium px-2">Float</span>
          </LiquidGlass>
          <LiquidGlass variant="navigation" className="w-fit">
            <span className="text-white font-medium">Navigation</span>
          </LiquidGlass>
        </div>
      </div>
    </div>
  ),
};

export const Intensities: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Glass Intensities</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <LiquidGlass intensity="subtle">
            <div className="text-white text-center">
              <h3 className="font-semibold mb-2">Subtle</h3>
              <p className="text-sm opacity-80">Light glass effect</p>
            </div>
          </LiquidGlass>
          <LiquidGlass intensity="medium">
            <div className="text-white text-center">
              <h3 className="font-semibold mb-2">Medium</h3>
              <p className="text-sm opacity-80">Balanced glass effect</p>
            </div>
          </LiquidGlass>
          <LiquidGlass intensity="strong">
            <div className="text-white text-center">
              <h3 className="font-semibold mb-2">Strong</h3>
              <p className="text-sm opacity-80">Intense glass effect</p>
            </div>
          </LiquidGlass>
        </div>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Sizes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          <LiquidGlass size="sm" variant="button" className="justify-center">
            <span className="text-white font-medium">Small</span>
          </LiquidGlass>
          <LiquidGlass size="md" variant="button" className="justify-center">
            <span className="text-white font-medium">Medium</span>
          </LiquidGlass>
          <LiquidGlass size="lg" variant="button" className="justify-center">
            <span className="text-white font-medium">Large</span>
          </LiquidGlass>
          <LiquidGlass size="xl" variant="button" className="justify-center">
            <span className="text-white font-medium">Extra Large</span>
          </LiquidGlass>
        </div>
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Interactive Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Hover & Click Effects</h3>
            <LiquidGlass 
              variant="button" 
              className="justify-center cursor-pointer"
              rippleEffect={true}
              hoverGlow={true}
            >
              <span className="text-white font-medium">Hover & Click Me</span>
            </LiquidGlass>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Drag Physics</h3>
            <LiquidGlass 
              variant="card"
              dragPhysics={true}
              className="cursor-move"
            >
              <div className="text-white text-center">
                <h4 className="font-semibold mb-2">Drag Me!</h4>
                <p className="text-sm opacity-80">Watch the jiggle animation</p>
              </div>
            </LiquidGlass>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const WithoutEffects: Story = {
  args: {
    rippleEffect: false,
    hoverGlow: false,
    dragPhysics: false,
  },
  render: (args) => (
    <LiquidGlass {...args}>
      <div className="text-white font-medium">
        <h3 className="text-lg font-semibold mb-2">Static Glass</h3>
        <p className="text-sm opacity-80">No interactive effects</p>
      </div>
    </LiquidGlass>
  ),
};

export const CustomContent: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Custom Content Examples</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LiquidGlass variant="card">
            <div className="text-white">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-red-400 rounded-xl mb-4 flex items-center justify-center">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Feature Card</h3>
              <p className="text-sm opacity-80 mb-4">
                Beautiful glass cards that showcase your content with Apple's signature aesthetic.
              </p>
              <button className="text-blue-200 text-sm font-medium hover:text-blue-100 transition-colors">
                Learn more →
              </button>
            </div>
          </LiquidGlass>

          <LiquidGlass variant="panel">
            <div className="text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
                  <span className="text-lg">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold">Status Panel</h3>
                  <p className="text-xs opacity-70">All systems operational</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="opacity-80">API Status</span>
                  <span className="text-green-300">Online</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="opacity-80">Database</span>
                  <span className="text-green-300">Connected</span>
                </div>
              </div>
            </div>
          </LiquidGlass>
        </div>
      </div>
    </div>
  ),
};