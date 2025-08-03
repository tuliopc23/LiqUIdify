/**
 * Liquid Glass Button Stories
 * 
 * Demonstrates the unified liquid glass system with all variants,
 * sizes, and interactive states.
 */

import type { Meta, StoryObj } from "@storybook/react";
import { GlassButton } from "./glass-button";
import { Heart, Download, ArrowRight, Loader2 } from "lucide-react";

const meta: Meta<typeof GlassButton> = {
  title: "Components/Liquid Glass/Button",
  component: GlassButton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The Liquid Glass Button implements the signature liquid glass effect with:

- **Layered glass system**: Multiple layers create depth and realism
- **Specular highlights**: Inset shadows simulate light reflection
- **Smooth interactions**: Scale transforms with cubic-bezier timing
- **Liquid shine effect**: The ::after pseudo-element creates the liquid appearance

## Features

- 4 sizes (sm, md, lg, xl)
- 4 variants (primary, secondary, ghost, destructive)
- Loading states with spinner
- Icon support (left/right)
- Full accessibility support
- Responsive design
        `,
      },
    },
    backgrounds: {
      default: "liquid-glass",
      values: [
        {
          name: "liquid-glass",
          value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        },
        {
          name: "dark",
          value: "#1a1a1a",
        },
        {
          name: "light",
          value: "#f0f0f0",
        },
      ],
    },
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "ghost", "destructive"],
      description: "Button variant style",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl"],
      description: "Button size",
    },
    loading: {
      control: { type: "boolean" },
      description: "Show loading state",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disable the button",
    },
    fullWidth: {
      control: { type: "boolean" },
      description: "Make button full width",
    },
    iconOnly: {
      control: { type: "boolean" },
      description: "Icon only button (square)",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof GlassButton>;

// Default Story
export const Default: Story = {
  args: {
    children: "Liquid Glass Button",
    variant: "primary",
    size: "md",
  },
};

// All Variants
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <GlassButton variant="primary">Primary</GlassButton>
      <GlassButton variant="secondary">Secondary</GlassButton>
      <GlassButton variant="ghost">Ghost</GlassButton>
      <GlassButton variant="destructive">Destructive</GlassButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All available button variants with the liquid glass effect.",
      },
    },
  },
};

// All Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <GlassButton size="sm">Small</GlassButton>
      <GlassButton size="md">Medium</GlassButton>
      <GlassButton size="lg">Large</GlassButton>
      <GlassButton size="xl">Extra Large</GlassButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All available button sizes with consistent liquid glass styling.",
      },
    },
  },
};

// With Icons
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <GlassButton leftIcon={<Heart />}>Like</GlassButton>
      <GlassButton rightIcon={<Download />}>Download</GlassButton>
      <GlassButton leftIcon={<Heart />} rightIcon={<ArrowRight />}>
        Continue
      </GlassButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Buttons with left and right icons using Lucide React icons.",
      },
    },
  },
};

// Icon Only
export const IconOnly: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <GlassButton iconOnly size="sm">
        <Heart />
      </GlassButton>
      <GlassButton iconOnly size="md">
        <Download />
      </GlassButton>
      <GlassButton iconOnly size="lg">
        <ArrowRight />
      </GlassButton>
      <GlassButton iconOnly size="xl">
        <Heart />
      </GlassButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Icon-only buttons with square aspect ratio and liquid glass effect.",
      },
    },
  },
};

// Loading States
export const Loading: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <GlassButton loading>Loading...</GlassButton>
      <GlassButton loading loadingText="Processing...">
        Process
      </GlassButton>
      <GlassButton loading variant="secondary">
        Secondary Loading
      </GlassButton>
      <GlassButton loading iconOnly>
        <Heart />
      </GlassButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Loading states with spinner animation and optional loading text.",
      },
    },
  },
};

// Interactive States
export const InteractiveStates: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <GlassButton>Normal</GlassButton>
      <GlassButton disabled>Disabled</GlassButton>
      <GlassButton className="hover:scale-110 active:scale-95">
        Custom Hover
      </GlassButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different interactive states showing the liquid glass hover and active effects.",
      },
    },
  },
};

// Full Width
export const FullWidth: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-4">
      <GlassButton fullWidth>Full Width Primary</GlassButton>
      <GlassButton fullWidth variant="secondary">
        Full Width Secondary
      </GlassButton>
      <GlassButton fullWidth variant="ghost">
        Full Width Ghost
      </GlassButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Full width buttons that expand to fill their container.",
      },
    },
  },
};

// Playground
export const Playground: Story = {
  args: {
    children: "Customize Me",
    variant: "primary",
    size: "md",
    loading: false,
    disabled: false,
    fullWidth: false,
    iconOnly: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive playground to test all button properties and see the liquid glass effect in action.",
      },
    },
  },
};

// Dark Mode
export const DarkMode: Story = {
  render: () => (
    <div className="dark p-8 bg-gray-900 rounded-lg">
      <div className="flex flex-wrap gap-4 items-center">
        <GlassButton variant="primary">Primary Dark</GlassButton>
        <GlassButton variant="secondary">Secondary Dark</GlassButton>
        <GlassButton variant="ghost">Ghost Dark</GlassButton>
        <GlassButton variant="destructive">Destructive Dark</GlassButton>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Liquid glass buttons in dark mode with adjusted colors and effects.",
      },
    },
    backgrounds: {
      default: "dark",
    },
  },
};

// Complex Example
export const ComplexExample: Story = {
  render: () => (
    <div className="space-y-6 p-6 max-w-md">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Liquid Glass Demo</h2>
        <p className="text-white/80">
          Experience the signature liquid glass effect with realistic depth and shine.
        </p>
      </div>
      
      <div className="space-y-3">
        <GlassButton fullWidth leftIcon={<Heart />} size="lg">
          Add to Favorites
        </GlassButton>
        
        <div className="flex gap-3">
          <GlassButton variant="secondary" className="flex-1">
            Cancel
          </GlassButton>
          <GlassButton variant="primary" className="flex-1" rightIcon={<ArrowRight />}>
            Continue
          </GlassButton>
        </div>
        
        <GlassButton fullWidth variant="ghost" leftIcon={<Download />}>
          Download Now
        </GlassButton>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "A complex example showing multiple buttons in a realistic interface layout with the liquid glass effect.",
      },
    },
  },
};
