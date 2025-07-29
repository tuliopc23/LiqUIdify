import type { Meta, StoryObj } from "@storybook/react";
import {
  Activity,
  Bookmark,
  Check,
  DollarSign,
  Eye,
  Heart,
  MessageCircle,
  MoreVertical,
  Share2,
  ShoppingCart,
  Star,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import React from "react";
import { GlassButton } from "../glass-button-refactored/glass-button";
import { Card, GlassCard } from "./glass-card";

const meta = {
  title: "Components/Layout/GlassCard",
  component: GlassCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A premium card component with advanced glassmorphism effects and compound component architecture for maximum flexibility.

## Features

- **Compound Components**: Card.Header, Card.Title, Card.Description, Card.Content, Card.Footer, Card.Actions
- **Multiple Variants**: Primary, secondary, tertiary, ghost, destructive, and apple-style designs
- **Flexible Sizing**: Extra small to extra large with responsive padding
- **Glass Effects**: Customizable blur, backdrop, and intensity settings
- **Interactive States**: Hoverable, clickable, and selectable cards
- **Elevation Levels**: None to extra large shadows for depth
- **Orientation Support**: Vertical and horizontal layouts
- **Accessibility**: Full keyboard navigation and screen reader support
- **Theme Support**: Automatic adaptation to light and dark themes
- **Performance**: Optimized with React.memo and context API

## Usage

\`\`\`tsx
import { Card } from '@/components/glass-card';

// Basic usage
<Card>
  <Card.Header>
    <Card.Title>Card Title</Card.Title>
    <Card.Description>Card description</Card.Description>
  </Card.Header>
  <Card.Content>
    Content goes here
  </Card.Content>
</Card>

// Interactive card
<Card interactive onCardClick={handleClick}>
  <Card.Content>
    Click me!
  </Card.Content>
</Card>

// Selectable card
<Card selectable selected={isSelected} onCardSelect={setSelected}>
  <Card.Content>
    Select this card
  </Card.Content>
</Card>
\`\`\`

## Compound Components

- **Card.Header**: Container for title and description
- **Card.Title**: Main heading of the card
- **Card.Description**: Subtitle or brief description
- **Card.Content**: Main content area
- **Card.Footer**: Bottom section for metadata or actions
- **Card.Actions**: Container for action buttons

## Accessibility

The card component follows WAI-ARIA guidelines:
- Interactive cards have role="button"
- Keyboard navigation with Tab/Enter/Space
- Proper focus indicators
- Screen reader announcements for state changes
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    // Content
    children: {
      control: false,
      description: "Card content using compound components",
      table: {
        type: { summary: "React.ReactNode" },
        category: "Content",
      },
    },

    // Appearance
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "tertiary",
        "ghost",
        "destructive",
        "apple",
      ],
      description: "Visual style variant",
      table: {
        type: {
          summary:
            "primary | secondary | tertiary | ghost | destructive | apple",
        },
        defaultValue: { summary: "primary" },
        category: "Appearance",
      },
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Card size",
      table: {
        type: { summary: "xs | sm | md | lg | xl" },
        defaultValue: { summary: "md" },
        category: "Appearance",
      },
    },
    padding: {
      control: "select",
      options: ["none", "xs", "sm", "md", "lg", "xl"],
      description: "Internal padding",
      table: {
        type: { summary: "none | xs | sm | md | lg | xl" },
        defaultValue: { summary: "md" },
        category: "Appearance",
      },
    },
    radius: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl", "full"],
      description: "Border radius",
      table: {
        type: { summary: "none | sm | md | lg | xl | full" },
        defaultValue: { summary: "md" },
        category: "Appearance",
      },
    },
    elevation: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl"],
      description: "Shadow elevation",
      table: {
        type: { summary: "none | sm | md | lg | xl" },
        defaultValue: { summary: "md" },
        category: "Appearance",
      },
    },
    orientation: {
      control: "radio",
      options: ["vertical", "horizontal"],
      description: "Card layout orientation",
      table: {
        type: { summary: "vertical | horizontal" },
        defaultValue: { summary: "vertical" },
        category: "Appearance",
      },
    },
    bordered: {
      control: "boolean",
      description: "Show card border",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
        category: "Appearance",
      },
    },

    // Interactive
    hover: {
      control: "boolean",
      description: "Enable hover effects",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
        category: "Interactive",
      },
    },
    interactive: {
      control: "boolean",
      description: "Make card clickable",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "Interactive",
      },
    },
    selectable: {
      control: "boolean",
      description: "Make card selectable",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "Interactive",
      },
    },
    selected: {
      control: "boolean",
      description: "Selected state (when selectable)",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "Interactive",
      },
    },

    // Glass Effects
    glassEffect: {
      control: "object",
      description: "Glass effect configuration",
      table: {
        type: { summary: "GlassEffect" },
        defaultValue: {
          summary: '{ intensity: "medium", blur: true, backdrop: true }',
        },
        category: "Glass Effects",
      },
    },

    // Animation
    animation: {
      control: "select",
      options: ["none", "subtle", "normal", "energetic"],
      description: "Animation intensity",
      table: {
        type: { summary: "none | subtle | normal | energetic" },
        defaultValue: { summary: "normal" },
        category: "Animation",
      },
    },
    disableAnimations: {
      control: "boolean",
      description: "Disable all animations",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "Animation",
      },
    },

    // Events
    onCardClick: {
      action: "card clicked",
      description: "Card click handler",
      table: {
        type: { summary: "(event: MouseEvent) => void" },
        category: "Events",
      },
    },
    onCardSelect: {
      action: "card selected",
      description: "Card selection handler",
      table: {
        type: { summary: "(selected: boolean) => void" },
        category: "Events",
      },
    },
  },
  args: {
    variant: "primary",
    size: "md",
    padding: "md",
    radius: "md",
    elevation: "md",
    orientation: "vertical",
    bordered: true,
    hover: true,
    interactive: false,
    selectable: false,
    selected: false,
    disableAnimations: false,
  },
} satisfies Meta<typeof GlassCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story - Interactive playground
export const Playground: Story = {
  args: {
    children: (
      <>
        <Card.Header>
          <Card.Title>Glass Card</Card.Title>
          <Card.Description>
            This is a glass card with compound components
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <p>
            Customize this card using the controls panel to explore different
            variants, sizes, and effects.
          </p>
        </Card.Content>
        <Card.Footer>
          <GlassButton type="button" size="sm" variant="ghost">
            Learn More
          </GlassButton>
        </Card.Footer>
      </>
    ),
  },
};

// Variants showcase
export const Variants: Story = {
  render: () => (
    <div className="grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card variant="primary">
        <Card.Header>
          <Card.Title>Primary</Card.Title>
          <Card.Description>Default glass effect</Card.Description>
        </Card.Header>
        <Card.Content>
          <p className="text-sm">
            Standard glass appearance with white/gray background.
          </p>
        </Card.Content>
      </Card>

      <Card variant="secondary">
        <Card.Header>
          <Card.Title>Secondary</Card.Title>
          <Card.Description>Subtle glass effect</Card.Description>
        </Card.Header>
        <Card.Content>
          <p className="text-sm">
            Lighter background for nested or secondary content.
          </p>
        </Card.Content>
      </Card>

      <Card variant="tertiary">
        <Card.Header>
          <Card.Title>Tertiary</Card.Title>
          <Card.Description>Minimal glass effect</Card.Description>
        </Card.Header>
        <Card.Content>
          <p className="text-sm">Transparent background with subtle border.</p>
        </Card.Content>
      </Card>

      <Card variant="ghost">
        <Card.Header>
          <Card.Title>Ghost</Card.Title>
          <Card.Description>No background</Card.Description>
        </Card.Header>
        <Card.Content>
          <p className="text-sm">Completely transparent with no borders.</p>
        </Card.Content>
      </Card>

      <Card variant="destructive">
        <Card.Header>
          <Card.Title>Destructive</Card.Title>
          <Card.Description>Danger variant</Card.Description>
        </Card.Header>
        <Card.Content>
          <p className="text-sm">
            Red-tinted glass for warnings or destructive actions.
          </p>
        </Card.Content>
      </Card>

      <Card variant="apple">
        <Card.Header>
          <Card.Title>Apple Style</Card.Title>
          <Card.Description>macOS-inspired</Card.Description>
        </Card.Header>
        <Card.Content>
          <p className="text-sm">
            Premium glass effect inspired by Apple's design language.
          </p>
        </Card.Content>
      </Card>
    </div>
  ),
};

// Sizes showcase
export const Sizes: Story = {
  render: () => (
    <div className="flex w-full max-w-4xl flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card size="xs" padding="xs">
          <Card.Header>
            <Card.Title>Extra Small</Card.Title>
          </Card.Header>
          <Card.Content>
            <p className="text-xs">Minimal space usage</p>
          </Card.Content>
        </Card>

        <Card size="sm" padding="sm">
          <Card.Header>
            <Card.Title>Small</Card.Title>
          </Card.Header>
          <Card.Content>
            <p className="text-sm">Compact card size</p>
          </Card.Content>
        </Card>

        <Card size="md" padding="md">
          <Card.Header>
            <Card.Title>Medium</Card.Title>
          </Card.Header>
          <Card.Content>
            <p>Default card size</p>
          </Card.Content>
        </Card>

        <Card size="lg" padding="lg">
          <Card.Header>
            <Card.Title>Large</Card.Title>
          </Card.Header>
          <Card.Content>
            <p className="text-lg">Spacious card layout</p>
          </Card.Content>
        </Card>

        <Card size="xl" padding="xl">
          <Card.Header>
            <Card.Title>Extra Large</Card.Title>
          </Card.Header>
          <Card.Content>
            <p className="text-xl">Maximum space for content</p>
          </Card.Content>
        </Card>
      </div>
    </div>
  ),
};

// Interactive states
export const InteractiveStates: Story = {
  render: () => {
    const [selected1, setSelected1] = React.useState(false);
    const [selected2, setSelected2] = React.useState(false);
    const [_selected3, _setSelected3] = React.useState(false);

    return (
      <div className="grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
        <Card hover>
          <Card.Header>
            <Card.Title>Hoverable Card</Card.Title>
            <Card.Description>Hover to see effect</Card.Description>
          </Card.Header>
          <Card.Content>
            <p className="mb-4 text-sm">
              This card has hover effects enabled. Move your mouse over it.
            </p>
            <div className="flex gap-2">
              <GlassButton type="button" size="sm" variant="primary">
                Action
              </GlassButton>
              <GlassButton type="button" size="sm" variant="ghost">
                Cancel
              </GlassButton>
            </div>
          </Card.Content>
        </Card>

        <Card interactive onCardClick={() => alert("Card clicked!")}>
          <Card.Header>
            <Card.Title>Clickable Card</Card.Title>
            <Card.Description>Click anywhere on the card</Card.Description>
          </Card.Header>
          <Card.Content>
            <p className="mb-4 text-sm">
              This entire card is clickable. Try clicking it!
            </p>
            <div className="flex items-center gap-2 text-gray-600 text-sm dark:text-gray-400">
              <Eye className="h-4 w-4" />
              <span>1.2k views</span>
            </div>
          </Card.Content>
        </Card>

        <Card selectable selected={selected1} onCardSelect={setSelected1}>
          <Card.Header>
            <Card.Title>Selectable Card 1</Card.Title>
            <Card.Description>Click to select/deselect</Card.Description>
          </Card.Header>
          <Card.Content>
            <p className="text-sm">
              This card can be selected.{" "}
              {selected1 ? "Selected!" : "Not selected"}
            </p>
          </Card.Content>
        </Card>

        <Card
          selectable
          selected={selected2}
          onCardSelect={setSelected2}
          variant="secondary"
        >
          <Card.Header>
            <Card.Title>Selectable Card 2</Card.Title>
            <Card.Description>Another selectable option</Card.Description>
          </Card.Header>
          <Card.Content>
            <p className="text-sm">
              Multiple cards can be selected.{" "}
              {selected2 ? "Selected!" : "Not selected"}
            </p>
          </Card.Content>
        </Card>
      </div>
    );
  },
};

// Glass effects showcase
export const GlassEffects: Story = {
  render: () => (
    <div className="grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
      <Card glassEffect={{ intensity: "weak", blur: true, backdrop: true }}>
        <Card.Header>
          <Card.Title>Weak Glass</Card.Title>
          <Card.Description>Subtle transparency</Card.Description>
        </Card.Header>
        <Card.Content>
          <p className="text-sm">
            Low intensity glass effect for minimal visual impact.
          </p>
        </Card.Content>
      </Card>

      <Card glassEffect={{ intensity: "medium", blur: true, backdrop: true }}>
        <Card.Header>
          <Card.Title>Medium Glass</Card.Title>
          <Card.Description>Balanced transparency</Card.Description>
        </Card.Header>
        <Card.Content>
          <p className="text-sm">Default glass intensity for most use cases.</p>
        </Card.Content>
      </Card>

      <Card glassEffect={{ intensity: "strong", blur: true, backdrop: true }}>
        <Card.Header>
          <Card.Title>Strong Glass</Card.Title>
          <Card.Description>High transparency</Card.Description>
        </Card.Header>
        <Card.Content>
          <p className="text-sm">
            Maximum glass effect for dramatic visual impact.
          </p>
        </Card.Content>
      </Card>

      <Card glassEffect={{ intensity: "medium", blur: false, backdrop: true }}>
        <Card.Header>
          <Card.Title>No Blur</Card.Title>
          <Card.Description>Clear background</Card.Description>
        </Card.Header>
        <Card.Content>
          <p className="text-sm">Glass effect without background blur.</p>
        </Card.Content>
      </Card>
    </div>
  ),
  parameters: {
    backgrounds: {
      default: "liquid-gradient",
    },
  },
};

// Elevation showcase
export const Elevations: Story = {
  render: () => (
    <div className="grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card elevation="none">
        <Card.Header>
          <Card.Title>No Shadow</Card.Title>
        </Card.Header>
        <Card.Content>
          <p className="text-sm">Flat appearance without elevation</p>
        </Card.Content>
      </Card>

      <Card elevation="sm">
        <Card.Header>
          <Card.Title>Small Shadow</Card.Title>
        </Card.Header>
        <Card.Content>
          <p className="text-sm">Subtle elevation for minimal depth</p>
        </Card.Content>
      </Card>

      <Card elevation="md">
        <Card.Header>
          <Card.Title>Medium Shadow</Card.Title>
        </Card.Header>
        <Card.Content>
          <p className="text-sm">Default elevation for standard cards</p>
        </Card.Content>
      </Card>

      <Card elevation="lg">
        <Card.Header>
          <Card.Title>Large Shadow</Card.Title>
        </Card.Header>
        <Card.Content>
          <p className="text-sm">Prominent elevation for important content</p>
        </Card.Content>
      </Card>

      <Card elevation="xl">
        <Card.Header>
          <Card.Title>Extra Large Shadow</Card.Title>
        </Card.Header>
        <Card.Content>
          <p className="text-sm">Maximum elevation for floating elements</p>
        </Card.Content>
      </Card>
    </div>
  ),
};

// Real-world examples
export const RealWorldExamples: Story = {
  render: () => (
    <div className="w-full max-w-6xl space-y-8">
      {/* Dashboard Cards */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Dashboard Metrics</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card variant="primary" hover>
            <Card.Content>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm dark:text-gray-400">
                    Total Revenue
                  </p>
                  <p className="font-bold text-2xl">$48,250</p>
                  <p className="mt-1 flex items-center gap-1 text-green-600 text-sm">
                    <TrendingUp className="h-3 w-3" />
                    12.5%
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-gray-400" />
              </div>
            </Card.Content>
          </Card>

          <Card variant="secondary" hover>
            <Card.Content>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm dark:text-gray-400">
                    Active Users
                  </p>
                  <p className="font-bold text-2xl">2,845</p>
                  <p className="mt-1 flex items-center gap-1 text-green-600 text-sm">
                    <TrendingUp className="h-3 w-3" />
                    8.2%
                  </p>
                </div>
                <Users className="h-8 w-8 text-gray-400" />
              </div>
            </Card.Content>
          </Card>

          <Card variant="secondary" hover>
            <Card.Content>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm dark:text-gray-400">
                    Orders
                  </p>
                  <p className="font-bold text-2xl">184</p>
                  <p className="mt-1 flex items-center gap-1 text-red-600 text-sm">
                    <TrendingDown className="h-3 w-3" />
                    3.1%
                  </p>
                </div>
                <ShoppingCart className="h-8 w-8 text-gray-400" />
              </div>
            </Card.Content>
          </Card>

          <Card variant="secondary" hover>
            <Card.Content>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm dark:text-gray-400">
                    Conversion
                  </p>
                  <p className="font-bold text-2xl">3.24%</p>
                  <p className="mt-1 flex items-center gap-1 text-green-600 text-sm">
                    <TrendingUp className="h-3 w-3" />
                    1.8%
                  </p>
                </div>
                <Activity className="h-8 w-8 text-gray-400" />
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>

      {/* Product Card */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">E-commerce Product</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card hover interactive padding="none" className="overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-purple-500 to-pink-600" />
            <Card.Header>
              <div className="flex items-start justify-between">
                <div>
                  <Card.Title>Premium Headphones</Card.Title>
                  <Card.Description>Wireless Noise Cancelling</Card.Description>
                </div>
                <GlassButton
                  type="button"
                  size="sm"
                  variant="ghost"
                  iconOnly
                  aria-label="Save"
                >
                  <Heart className="h-4 w-4" />
                </GlassButton>
              </div>
            </Card.Header>
            <Card.Content>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="font-bold text-2xl">$299</p>
                  <p className="text-gray-500 text-sm line-through">$349</p>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <span className="text-sm">4.8</span>
                </div>
              </div>
              <GlassButton
                type="button"
                variant="primary"
                fullWidth
                leftIcon={<ShoppingCart className="h-4 w-4" />}
              >
                Add to Cart
              </GlassButton>
            </Card.Content>
          </Card>

          <Card hover interactive padding="none" className="overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-blue-500 to-cyan-600" />
            <Card.Header>
              <div className="flex items-start justify-between">
                <div>
                  <Card.Title>Smart Watch Pro</Card.Title>
                  <Card.Description>Fitness & Health Tracking</Card.Description>
                </div>
                <GlassButton
                  type="button"
                  size="sm"
                  variant="ghost"
                  iconOnly
                  aria-label="Save"
                >
                  <Heart className="h-4 w-4" />
                </GlassButton>
              </div>
            </Card.Header>
            <Card.Content>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="font-bold text-2xl">$449</p>
                  <p className="text-gray-500 text-sm line-through">$499</p>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <span className="text-sm">4.9</span>
                </div>
              </div>
              <GlassButton
                type="button"
                variant="primary"
                fullWidth
                leftIcon={<ShoppingCart className="h-4 w-4" />}
              >
                Add to Cart
              </GlassButton>
            </Card.Content>
          </Card>
        </div>
      </div>

      {/* Social Media Post */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Social Media Post</h3>
        <Card className="max-w-2xl">
          <Card.Header>
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Sarah Johnson</p>
                    <p className="text-gray-600 text-sm dark:text-gray-400">
                      @sarahjohnson • 2h
                    </p>
                  </div>
                  <GlassButton type="button" size="sm" variant="ghost" iconOnly>
                    <MoreVertical className="h-4 w-4" />
                  </GlassButton>
                </div>
              </div>
            </div>
          </Card.Header>
          <Card.Content>
            <p className="mb-4">
              Just launched our new glassmorphism design system! The combination
              of transparency, blur, and subtle shadows creates such a premium
              feel. What do you think? 🎨✨
            </p>
            <div className="mb-4 h-64 rounded-lg bg-gradient-to-br from-blue-500 via-purple-500 to-pink-600" />
            <div className="flex items-center justify-between text-gray-600 text-sm dark:text-gray-400">
              <button
                type="button"
                className="flex items-center gap-2 transition-colors hover:text-blue-500"
              >
                <Heart className="h-5 w-5" />
                <span>483</span>
              </button>
              <button
                type="button"
                className="flex items-center gap-2 transition-colors hover:text-blue-500"
              >
                <MessageCircle className="h-5 w-5" />
                <span>52</span>
              </button>
              <button
                type="button"
                className="flex items-center gap-2 transition-colors hover:text-blue-500"
              >
                <Share2 className="h-5 w-5" />
                <span>Share</span>
              </button>
              <button
                type="button"
                className="flex items-center gap-2 transition-colors hover:text-blue-500"
              >
                <Bookmark className="h-5 w-5" />
              </button>
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  ),
};

// Compound components demo
export const CompoundComponents: Story = {
  render: () => (
    <div className="grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
      <Card>
        <Card.Header>
          <Card.Title>Using All Components</Card.Title>
          <Card.Description>Complete card structure</Card.Description>
        </Card.Header>
        <Card.Content>
          <p className="mb-4 text-sm">
            This card uses all available compound components to create a
            complete structure.
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>Card.Header</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>Card.Title</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>Card.Description</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>Card.Content</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>Card.Footer</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>Card.Actions</span>
            </div>
          </div>
        </Card.Content>
        <Card.Footer>
          <p className="text-gray-600 text-sm dark:text-gray-400">
            Footer content here
          </p>
        </Card.Footer>
        <Card.Actions>
          <GlassButton type="button" size="sm" variant="ghost">
            Cancel
          </GlassButton>
          <GlassButton type="button" size="sm" variant="primary">
            Confirm
          </GlassButton>
        </Card.Actions>
      </Card>

      <Card>
        <Card.Header>
          <Card.Title>Flexible Composition</Card.Title>
          <Card.Description>Mix and match components</Card.Description>
        </Card.Header>
        <Card.Content>
          <p className="text-sm">
            You can use only the components you need. This card omits the Footer
            and Actions.
          </p>
        </Card.Content>
      </Card>

      <Card padding="none">
        <Card.Header>
          <Card.Title>Custom Padding</Card.Title>
        </Card.Header>
        <Card.Content>
          <p className="px-6 text-sm">
            The padding prop controls the card's internal spacing, but
            individual components maintain their own padding for consistency.
          </p>
        </Card.Content>
      </Card>

      <Card variant="secondary">
        <Card.Content>
          <p className="text-sm">
            You can even skip the header entirely and just use the content area.
          </p>
        </Card.Content>
        <Card.Actions>
          <GlassButton type="button" size="sm" fullWidth>
            Action Button
          </GlassButton>
        </Card.Actions>
      </Card>
    </div>
  ),
};

// Theme showcase
export const ThemeShowcase: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-4 rounded-xl bg-white/80 p-6 dark:bg-gray-900/80">
          <h3 className="font-semibold text-lg">Light Theme</h3>
          <div className="space-y-4">
            <Card variant="primary">
              <Card.Header>
                <Card.Title>Primary Card</Card.Title>
                <Card.Description>Light theme appearance</Card.Description>
              </Card.Header>
              <Card.Content>
                <p className="text-sm">
                  Glass effects adapt to light backgrounds
                </p>
              </Card.Content>
            </Card>

            <Card variant="secondary">
              <Card.Header>
                <Card.Title>Secondary Card</Card.Title>
              </Card.Header>
              <Card.Content>
                <p className="text-sm">Subtle variations for hierarchy</p>
              </Card.Content>
            </Card>
          </div>
        </div>

        <div className="space-y-4 rounded-xl bg-gray-900/80 p-6 dark:bg-white/80">
          <h3 className="font-semibold text-lg text-white dark:text-gray-900">
            Dark Theme
          </h3>
          <div className="space-y-4">
            <Card variant="primary">
              <Card.Header>
                <Card.Title>Primary Card</Card.Title>
                <Card.Description>Dark theme appearance</Card.Description>
              </Card.Header>
              <Card.Content>
                <p className="text-sm">Enhanced glass effects in dark mode</p>
              </Card.Content>
            </Card>

            <Card variant="secondary">
              <Card.Header>
                <Card.Title>Secondary Card</Card.Title>
              </Card.Header>
              <Card.Content>
                <p className="text-sm">Maintains readability in all themes</p>
              </Card.Content>
            </Card>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    backgrounds: {
      default: "liquid-gradient",
    },
  },
};

// Accessibility showcase
export const AccessibilityShowcase: Story = {
  render: () => {
    const [selected, setSelected] = React.useState(false);

    return (
      <div className="max-w-4xl space-y-8">
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Keyboard Navigation</h3>
          <p className="text-gray-600 text-sm dark:text-gray-400">
            Interactive cards can be navigated with keyboard. Try pressing Tab
            to focus cards.
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card interactive onCardClick={() => alert("Card 1 activated!")}>
              <Card.Header>
                <Card.Title>Interactive Card 1</Card.Title>
                <Card.Description>
                  Press Enter or Space to activate
                </Card.Description>
              </Card.Header>
              <Card.Content>
                <p className="text-sm">
                  This card is fully keyboard accessible.
                </p>
              </Card.Content>
            </Card>

            <Card interactive onCardClick={() => alert("Card 2 activated!")}>
              <Card.Header>
                <Card.Title>Interactive Card 2</Card.Title>
                <Card.Description>Tab navigation supported</Card.Description>
              </Card.Header>
              <Card.Content>
                <p className="text-sm">
                  Focus indicators show the active element.
                </p>
              </Card.Content>
            </Card>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Screen Reader Support</h3>
          <Card selectable selected={selected} onCardSelect={setSelected}>
            <Card.Header>
              <Card.Title>Selectable Card</Card.Title>
              <Card.Description>ARIA attributes included</Card.Description>
            </Card.Header>
            <Card.Content>
              <p className="text-sm">
                This card has role="button" and aria-pressed=
                {selected ? "true" : "false"}. Screen readers will announce its
                interactive state.
              </p>
            </Card.Content>
          </Card>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Focus Management</h3>
          <Card variant="primary">
            <Card.Header>
              <Card.Title>Card with Interactive Elements</Card.Title>
              <Card.Description>Multiple focusable items</Card.Description>
            </Card.Header>
            <Card.Content>
              <p className="mb-4 text-sm">
                When a card contains interactive elements, each element is
                individually focusable.
              </p>
              <div className="flex gap-2">
                <GlassButton type="button" size="sm" variant="primary">
                  Primary
                </GlassButton>
                <GlassButton type="button" size="sm" variant="ghost">
                  Secondary
                </GlassButton>
                <GlassButton
                  type="button"
                  size="sm"
                  variant="ghost"
                  iconOnly
                  aria-label="More options"
                >
                  <MoreVertical className="h-4 w-4" />
                </GlassButton>
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>
    );
  },
};
