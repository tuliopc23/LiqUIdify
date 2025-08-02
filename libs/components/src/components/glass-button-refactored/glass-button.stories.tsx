import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Download,
  Heart,
  Mail,
  Plus,
  Save,
  Settings,
  Star,
  Trash2,
  User,
} from "lucide-react";
import React from "react";
import { GlassButton } from "./glass-button";

const meta = {
  title: "Components/Forms/GlassButton",
  component: GlassButton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A versatile button component with glassmorphism styling and comprehensive variants.

## Features
- Multiple visual variants (primary, secondary, tertiary, ghost, destructive, apple)
- Size variants from xs to xl
- Left and right icon support
- Loading states with animated spinner
- Full accessibility support including:
  - ARIA labels and states
  - Keyboard navigation
  - Focus management
  - Screen reader announcements
  - High contrast mode support
- Disabled state handling
- Loading state announcements
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    // Content
    children: {
      control: "text",
      description: "Button content",
      table: {
        type: { summary: "React.ReactNode" },
        category: "Content",
      },
    },
    leftIcon: {
      control: false,
      description: "Icon to display on the left side",
      table: {
        type: { summary: "React.ReactNode" },
        category: "Content",
      },
    },
    rightIcon: {
      control: false,
      description: "Icon to display on the right side",
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
      description: "Visual style variant of the button",
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
      description: "Size of the button",
      table: {
        type: { summary: "xs | sm | md | lg | xl" },
        defaultValue: { summary: "md" },
        category: "Appearance",
      },
    },

    // States
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "States",
      },
    },
    loading: {
      control: "boolean",
      description: "Whether the button is in loading state",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "States",
      },
    },

    // Behavior
    type: {
      control: "select",
      options: ["button", "submit", "reset"],
      description: "HTML button type",
      table: {
        type: { summary: "button | submit | reset" },
        defaultValue: { summary: "button" },
        category: "Behavior",
      },
    },
    onClick: {
      action: "clicked",
      description: "Click event handler",
      table: {
        type: { summary: "(event: MouseEvent) => void" },
        category: "Behavior",
      },
    },

    // Accessibility
    "aria-label": {
      control: "text",
      description: "Accessible label for screen readers",
      table: {
        type: { summary: "string" },
        category: "Accessibility",
      },
    },
    "aria-describedby": {
      control: "text",
      description: "ID of element that describes the button",
      table: {
        type: { summary: "string" },
        category: "Accessibility",
      },
    },

    // Styling
    className: {
      control: "text",
      description: "Additional CSS classes",
      table: {
        type: { summary: "string" },
        category: "Styling",
      },
    },
  },
} satisfies Meta<typeof GlassButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Examples
export const Default: Story = {
  args: {
    children: "Button",
  },
};

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Button",
  },
};

export const Tertiary: Story = {
  args: {
    variant: "tertiary",
    children: "Tertiary Button",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost Button",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Delete",
  },
};

export const Apple: Story = {
  args: {
    variant: "apple",
    children: "Apple Style",
  },
};

// Size Variants
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <GlassButton size="xs">Extra Small</GlassButton>
      <GlassButton size="sm">Small</GlassButton>
      <GlassButton size="md">Medium</GlassButton>
      <GlassButton size="lg">Large</GlassButton>
      <GlassButton size="xl">Extra Large</GlassButton>
    </div>
  ),
};

// With Icons
export const WithLeftIcon: Story = {
  args: {
    leftIcon: <Download className="h-4 w-4" />,
    children: "Download",
  },
};

export const WithRightIcon: Story = {
  args: {
    rightIcon: <Settings className="h-4 w-4" />,
    children: "Settings",
  },
};

export const WithBothIcons: Story = {
  args: {
    leftIcon: <User className="h-4 w-4" />,
    rightIcon: <Settings className="h-4 w-4" />,
    children: "Profile Settings",
  },
};

export const IconOnly: Story = {
  args: {
    leftIcon: <Heart className="h-4 w-4" />,
    "aria-label": "Like",
  },
};

// States
export const Loading: Story = {
  args: {
    loading: true,
    children: "Loading...",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled Button",
  },
};

export const LoadingWithIcon: Story = {
  args: {
    loading: true,
    leftIcon: <Save className="h-4 w-4" />,
    children: "Saving...",
  },
};

// Interactive Examples
export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      <GlassButton variant="primary">Primary</GlassButton>
      <GlassButton variant="secondary">Secondary</GlassButton>
      <GlassButton variant="tertiary">Tertiary</GlassButton>
      <GlassButton variant="ghost">Ghost</GlassButton>
      <GlassButton variant="destructive">Destructive</GlassButton>
      <GlassButton variant="apple">Apple</GlassButton>
    </div>
  ),
};

export const ButtonGroup: Story = {
  render: () => (
    <div className="flex gap-2">
      <GlassButton variant="secondary" leftIcon={<Mail className="h-4 w-4" />}>
        Email
      </GlassButton>
      <GlassButton variant="secondary" leftIcon={<Star className="h-4 w-4" />}>
        Favorite
      </GlassButton>
      <GlassButton
        variant="destructive"
        leftIcon={<Trash2 className="h-4 w-4" />}
      >
        Delete
      </GlassButton>
    </div>
  ),
};

export const LoadingStates: Story = {
  render: () => (
    <div className="flex gap-4">
      <GlassButton loading>Loading</GlassButton>
      <GlassButton loading variant="secondary">
        Processing
      </GlassButton>
      <GlassButton loading variant="destructive">
        Deleting
      </GlassButton>
    </div>
  ),
};

// Form Examples
export const FormButtons: Story = {
  render: () => (
    <form className="space-y-4">
      <div className="flex gap-2">
        <GlassButton type="submit" variant="primary">
          Submit
        </GlassButton>
        <GlassButton type="reset" variant="secondary">
          Reset
        </GlassButton>
        <GlassButton type="button" variant="ghost">
          Cancel
        </GlassButton>
      </div>
    </form>
  ),
};

// Accessibility Showcase
export const AccessibilityShowcase: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 font-semibold text-white">Accessible Labels</h3>
        <div className="flex gap-4">
          <GlassButton
            leftIcon={<Plus className="h-4 w-4" />}
            aria-label="Add new item"
          />
          <GlassButton
            leftIcon={<Heart className="h-4 w-4" />}
            aria-label="Add to favorites"
          />
          <GlassButton
            leftIcon={<Settings className="h-4 w-4" />}
            aria-label="Open settings"
          />
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-semibold text-white">
          Loading with Announcements
        </h3>
        <div className="flex gap-4">
          <GlassButton
            loading
            aria-label="Saving your changes"
            leftIcon={<Save className="h-4 w-4" />}
          >
            Save Changes
          </GlassButton>
          <GlassButton loading aria-label="Processing request">
            Processing
          </GlassButton>
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-semibold text-white">Disabled States</h3>
        <div className="flex gap-4">
          <GlassButton disabled aria-label="Feature not available">
            Unavailable
          </GlassButton>
          <GlassButton
            disabled
            variant="destructive"
            aria-label="Cannot delete at this time"
          >
            Delete
          </GlassButton>
        </div>
      </div>
    </div>
  ),
};

// Real-world Examples
export const RealWorldExamples: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 font-semibold text-white">E-commerce Actions</h3>
        <div className="flex gap-3">
          <GlassButton variant="primary" size="lg">
            Add to Cart
          </GlassButton>
          <GlassButton
            variant="secondary"
            leftIcon={<Heart className="h-4 w-4" />}
          >
            Save for Later
          </GlassButton>
          <GlassButton variant="ghost" size="sm">
            Compare
          </GlassButton>
        </div>
      </div>

      <div>
        <h3 className="mb-4 font-semibold text-white">Dashboard Actions</h3>
        <div className="flex gap-3">
          <GlassButton
            variant="primary"
            leftIcon={<Plus className="h-4 w-4" />}
          >
            Create New
          </GlassButton>
          <GlassButton
            variant="secondary"
            leftIcon={<Download className="h-4 w-4" />}
          >
            Export Data
          </GlassButton>
          <GlassButton
            variant="ghost"
            leftIcon={<Settings className="h-4 w-4" />}
          >
            Settings
          </GlassButton>
        </div>
      </div>

      <div>
        <h3 className="mb-4 font-semibold text-white">Content Management</h3>
        <div className="flex gap-3">
          <GlassButton
            variant="primary"
            leftIcon={<Save className="h-4 w-4" />}
          >
            Save Draft
          </GlassButton>
          <GlassButton variant="apple">Publish</GlassButton>
          <GlassButton
            variant="destructive"
            leftIcon={<Trash2 className="h-4 w-4" />}
            size="sm"
          >
            Delete
          </GlassButton>
        </div>
      </div>
    </div>
  ),
};

// Interactive Demo
export const InteractiveDemo: Story = {
  render: () => {
    const [loading, setLoading] = React.useState(false);
    const [count, setCount] = React.useState(0);

    const handleAsyncAction = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setCount((prev) => prev + 1);
      setLoading(false);
    };

    return (
      <div className="space-y-4">
        <div className="flex gap-4">
          <GlassButton onClick={handleAsyncAction} loading={loading}>
            {loading ? "Processing..." : "Async Action"}
          </GlassButton>
          <GlassButton variant="secondary" onClick={() => setCount(0)}>
            Reset Counter
          </GlassButton>
        </div>
        <p className="text-white">Count: {count}</p>
      </div>
    );
  },
};

// Theme Demonstration
export const ThemeDemo: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-8">
      <div className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 p-6">
        <h3 className="mb-4 font-semibold text-white">Light Theme Context</h3>
        <div className="flex gap-3">
          <GlassButton variant="primary">Primary</GlassButton>
          <GlassButton variant="secondary">Secondary</GlassButton>
          <GlassButton variant="ghost">Ghost</GlassButton>
        </div>
      </div>

      <div className="rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 p-6">
        <h3 className="mb-4 font-semibold text-white">Dark Theme Context</h3>
        <div className="flex gap-3">
          <GlassButton variant="primary">Primary</GlassButton>
          <GlassButton variant="secondary">Secondary</GlassButton>
          <GlassButton variant="apple">Apple</GlassButton>
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

// Performance Test
export const PerformanceTest: Story = {
  render: () => (
    <div className="grid grid-cols-5 gap-2">
      {Array.from({ length: 50 }, (_, index) => {
        const variants = [
          "primary",
          "secondary",
          "tertiary",
          "ghost",
          "apple",
        ] as const;
        const variant = variants[index % 5];
        return (
          <GlassButton key={`perf-test-${index}`} size="sm" variant={variant}>
            {index + 1}
          </GlassButton>
        );
      })}
    </div>
  ),
};
