/**
 * Liquid Glass Component Stories
 *
 * Showcases the core liquid glass system with all variants,
 * sizes, effects, and adaptive capabilities.
 */

import type { Meta, StoryObj } from "@storybook/react";
import { LiquidGlass, LiquidGlassCard, LiquidGlassButton, LiquidGlassNav, LiquidGlassHero } from "./liquid-glass";
import { LiquidGlassDefs } from "../liquid-glass-defs/liquid-glass-defs";
import { Heart, Home, Settings, User } from "lucide-react";

const meta: Meta<typeof LiquidGlass> = {
  title: "Components/Liquid Glass/Core",
  component: LiquidGlass,
  decorators: [
    (Story) => (
      <>
        <LiquidGlassDefs />
        <Story />
      </>
    ),
  ],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The Liquid Glass component is the foundation of LiqUIdify's design system, providing:

- **Adaptive Rendering**: Automatically adjusts quality based on device capabilities
- **Performance Tiers**: High, medium, and low performance modes
- **Accessibility**: Full support for reduced motion and transparency preferences
- **SVG Filters**: Advanced visual effects for capable devices
- **HDR Support**: Enhanced colors on HDR displays

## Features

- 8 visual variants (default, solid, translucent, transparent, holographic, aurora, frosted, iridescent)
- 5 size options (sm, md, lg, xl, 2xl)
- Multiple animation styles
- Interactive states with hover/focus effects
- Layered glass system for depth
- Device capability detection
        `,
      },
    },
    backgrounds: {
      default: "gradient",
      values: [
        {
          name: "gradient",
          value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        },
        {
          name: "mesh",
          value: "radial-gradient(at 40% 20%, hsla(28,100%,74%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189,100%,56%,1) 0px, transparent 50%)",
        },
        {
          name: "dark",
          value: "#0a0a0a",
        },
        {
          name: "light",
          value: "#fafafa",
        },
      ],
    },
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "solid", "translucent", "transparent", "holographic", "aurora", "frosted", "iridescent"],
      description: "Visual variant of the liquid glass effect",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl", "2xl"],
      description: "Size of the liquid glass container",
    },
    animation: {
      control: { type: "select" },
      options: ["none", "float", "shimmer", "pulse"],
      description: "Animation style",
    },
    interactive: {
      control: { type: "boolean" },
      description: "Enable interactive hover/focus states",
    },
    layered: {
      control: { type: "boolean" },
      description: "Use layered glass structure for depth",
    },
    showFilter: {
      control: { type: "boolean" },
      description: "Show filter layer",
    },
    showOverlay: {
      control: { type: "boolean" },
      description: "Show overlay layer",
    },
    showSpecular: {
      control: { type: "boolean" },
      description: "Show specular highlight layer",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LiquidGlass>;

// Default Story
export const Default: Story = {
  args: {
    children: (
      <div className="p-8">
        <h3 className="text-xl font-semibold mb-2">Liquid Glass Container</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Adaptive glass effect with automatic device optimization
        </p>
      </div>
    ),
    variant: "default",
    size: "md",
  },
};

// All Variants
export const Variants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      {(["default", "solid", "translucent", "transparent", "holographic", "aurora", "frosted", "iridescent"] as const).map((variant) => (
        <LiquidGlass key={variant} variant={variant} size="md">
          <div className="p-6">
            <h4 className="font-semibold capitalize">{variant}</h4>
            <p className="text-sm opacity-75">Variant style</p>
          </div>
        </LiquidGlass>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All available liquid glass variants with unique visual characteristics.",
      },
    },
  },
};

// Size Variations
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      {(["sm", "md", "lg", "xl", "2xl"] as const).map((size) => (
        <LiquidGlass key={size} size={size} variant="frosted">
          <div className="p-4">
            <span className="font-medium">{size.toUpperCase()}</span>
          </div>
        </LiquidGlass>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different size options for liquid glass containers.",
      },
    },
  },
};

// Interactive Elements
export const Interactive: Story = {
  render: () => (
    <div className="flex gap-4">
      <LiquidGlass variant="translucent" interactive>
        <button className="p-6 w-full text-left">
          <h4 className="font-semibold mb-1">Interactive Card</h4>
          <p className="text-sm opacity-75">Click or hover for effects</p>
        </button>
      </LiquidGlass>
      
      <LiquidGlass variant="holographic" interactive>
        <button className="p-6 w-full text-left">
          <h4 className="font-semibold mb-1">Holographic Card</h4>
          <p className="text-sm opacity-75">Advanced visual effects</p>
        </button>
      </LiquidGlass>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Interactive liquid glass elements with hover and focus states.",
      },
    },
  },
};

// Animated Variants
export const Animated: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      {(["float", "shimmer", "pulse"] as const).map((animation) => (
        <LiquidGlass key={animation} variant="aurora" animation={animation}>
          <div className="p-6">
            <h4 className="font-semibold capitalize">{animation}</h4>
            <p className="text-sm opacity-75">Animation effect</p>
          </div>
        </LiquidGlass>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different animation styles for liquid glass components.",
      },
    },
  },
};

// Layered Structure
export const LayeredGlass: Story = {
  render: () => (
    <div className="flex gap-4">
      <LiquidGlass variant="frosted" layered showFilter showOverlay showSpecular>
        <div className="p-8">
          <h4 className="font-semibold mb-2">Full Layers</h4>
          <p className="text-sm opacity-75">All glass layers enabled</p>
        </div>
      </LiquidGlass>
      
      <LiquidGlass variant="frosted" layered showFilter={false} showOverlay showSpecular={false}>
        <div className="p-8">
          <h4 className="font-semibold mb-2">Partial Layers</h4>
          <p className="text-sm opacity-75">Selected layers only</p>
        </div>
      </LiquidGlass>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Control individual glass layers for custom depth effects.",
      },
    },
  },
};

// Component Variants
export const ComponentVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <LiquidGlassCard>
        <div className="p-6">
          <h4 className="font-semibold mb-2">Glass Card Component</h4>
          <p className="text-sm opacity-75">Pre-configured card variant</p>
        </div>
      </LiquidGlassCard>
      
      <LiquidGlassNav>
        <div className="flex gap-4 p-4">
          <button className="flex items-center gap-2 px-3 py-2 hover:bg-white/10 rounded">
            <Home size={16} /> Home
          </button>
          <button className="flex items-center gap-2 px-3 py-2 hover:bg-white/10 rounded">
            <User size={16} /> Profile
          </button>
          <button className="flex items-center gap-2 px-3 py-2 hover:bg-white/10 rounded">
            <Settings size={16} /> Settings
          </button>
        </div>
      </LiquidGlassNav>
      
      <LiquidGlassHero>
        <div className="p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Hero Section</h2>
          <p className="text-lg opacity-75">Large glass container for hero content</p>
        </div>
      </LiquidGlassHero>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Pre-configured component variants for common use cases.",
      },
    },
  },
};

// Performance Modes
export const PerformanceModes: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <LiquidGlass variant="iridescent" performanceMode="high">
        <div className="p-6">
          <h4 className="font-semibold">High Performance</h4>
          <p className="text-sm opacity-75">All effects enabled</p>
        </div>
      </LiquidGlass>
      
      <LiquidGlass variant="iridescent" performanceMode="medium">
        <div className="p-6">
          <h4 className="font-semibold">Medium Performance</h4>
          <p className="text-sm opacity-75">Balanced effects</p>
        </div>
      </LiquidGlass>
      
      <LiquidGlass variant="iridescent" performanceMode="low">
        <div className="p-6">
          <h4 className="font-semibold">Low Performance</h4>
          <p className="text-sm opacity-75">Optimized for speed</p>
        </div>
      </LiquidGlass>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Manual performance mode selection for different device capabilities.",
      },
    },
  },
};

// Complex Composition
export const ComplexComposition: Story = {
  render: () => (
    <LiquidGlass variant="translucent" size="xl" layered interactive>
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold">Dashboard</h3>
          <LiquidGlassButton>
            <Settings size={16} className="mr-2" />
            Settings
          </LiquidGlassButton>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Users", value: "2,847", change: "+12%" },
            { label: "Revenue", value: "$14,250", change: "+8%" },
            { label: "Orders", value: "384", change: "+23%" },
          ].map((stat) => (
            <LiquidGlass key={stat.label} variant="frosted" size="sm" interactive>
              <div className="p-4">
                <p className="text-sm opacity-75">{stat.label}</p>
                <p className="text-xl font-bold">{stat.value}</p>
                <p className="text-sm text-green-500">{stat.change}</p>
              </div>
            </LiquidGlass>
          ))}
        </div>
      </div>
    </LiquidGlass>
  ),
  parameters: {
    docs: {
      description: {
        story: "Complex composition demonstrating nested liquid glass components.",
      },
    },
  },
};
