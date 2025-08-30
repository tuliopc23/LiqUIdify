import type { Meta, StoryObj } from "@storybook/react";
import { LiquidButton } from "./liquid-button";

const meta = {
  title: "Components/LiquidButton",
  component: LiquidButton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A liquid glass button component implementing Apple's design language with interactive physics and smooth animations.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "danger", "success"],
      description: "The visual style variant of the button"
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "The size of the button"
    },
    loading: {
      control: "boolean",
      description: "Show loading spinner"
    },
    disabled: {
      control: "boolean",
      description: "Disable the button"
    },
    iconPosition: {
      control: "select",
      options: ["left", "right"],
      description: "Position of the icon"
    },
    rippleEffect: {
      control: "boolean",
      description: "Enable ripple effect on click"
    },
    hoverGlow: {
      control: "boolean", 
      description: "Enable hover glow effect"
    },
    dragPhysics: {
      control: "boolean",
      description: "Enable drag physics with jiggle animation"
    }
  },
  args: {
    children: "Button",
    variant: "primary",
    size: "md",
    loading: false,
    disabled: false,
    iconPosition: "left",
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
} satisfies Meta<typeof LiquidButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Simple arrow icon for stories
const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8.22 2.97a.75.75 0 0 1 1.06 0L14.53 8.22a.75.75 0 0 1 0 1.06L9.28 14.53a.75.75 0 0 1-1.06-1.06L12.44 9.25H2.75a.75.75 0 0 1 0-1.5h9.69L8.22 4.03a.75.75 0 0 1 0-1.06Z"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 2a.75.75 0 0 1 .75.75v4.5h4.5a.75.75 0 0 1 0 1.5h-4.5v4.5a.75.75 0 0 1-1.5 0v-4.5h-4.5a.75.75 0 0 1 0-1.5h4.5v-4.5A.75.75 0 0 1 8 2Z"/>
  </svg>
);

const HeartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 14.25s6-4.5 6-8.25A3.75 3.75 0 0 0 8 3.25 3.75 3.75 0 0 0 2 6c0 3.75 6 8.25 6 8.25Z"/>
  </svg>
);

export const Default: Story = {};

export const Variants: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Button Variants</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <LiquidButton variant="primary">Primary</LiquidButton>
          <LiquidButton variant="secondary">Secondary</LiquidButton>
          <LiquidButton variant="ghost">Ghost</LiquidButton>
          <LiquidButton variant="danger">Danger</LiquidButton>
          <LiquidButton variant="success">Success</LiquidButton>
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
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Button Sizes</h2>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <LiquidButton size="sm">Small</LiquidButton>
          <LiquidButton size="md">Medium</LiquidButton>
          <LiquidButton size="lg">Large</LiquidButton>
          <LiquidButton size="xl">Extra Large</LiquidButton>
        </div>
      </div>
    </div>
  ),
};

export const WithIcons: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Buttons with Icons</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <LiquidButton icon={<ArrowIcon />} iconPosition="left">
            Continue
          </LiquidButton>
          <LiquidButton icon={<PlusIcon />} iconPosition="left" variant="secondary">
            Add Item
          </LiquidButton>
          <LiquidButton icon={<HeartIcon />} iconPosition="right" variant="ghost">
            Like
          </LiquidButton>
          <LiquidButton icon={<ArrowIcon />} iconPosition="right" variant="danger">
            Delete
          </LiquidButton>
          <LiquidButton icon={<PlusIcon />} iconPosition="left" variant="success">
            Create
          </LiquidButton>
        </div>
      </div>
    </div>
  ),
};

export const States: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Button States</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <LiquidButton>Normal</LiquidButton>
          <LiquidButton loading>Loading</LiquidButton>
          <LiquidButton disabled>Disabled</LiquidButton>
          <LiquidButton loading icon={<PlusIcon />}>
            Loading with Icon
          </LiquidButton>
          <LiquidButton disabled icon={<HeartIcon />}>
            Disabled with Icon
          </LiquidButton>
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
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Interactive Effects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Hover & Ripple Effects</h3>
            <div className="space-y-4">
              <LiquidButton rippleEffect hoverGlow>
                Hover & Click Me
              </LiquidButton>
              <LiquidButton rippleEffect={false} hoverGlow={false} variant="secondary">
                No Effects
              </LiquidButton>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Drag Physics</h3>
            <div className="space-y-4">
              <LiquidButton dragPhysics>
                Drag Me!
              </LiquidButton>
              <LiquidButton dragPhysics variant="danger" icon={<HeartIcon />}>
                Drag with Icon
              </LiquidButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const CallToAction: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Get Started Today</h2>
        <p className="text-lg text-white/80 mb-8">
          Experience the future of web interfaces with our liquid glass components.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <LiquidButton size="lg" icon={<ArrowIcon />} iconPosition="right">
            Start Building
          </LiquidButton>
          <LiquidButton size="lg" variant="ghost">
            View Documentation
          </LiquidButton>
        </div>
      </div>
    </div>
  ),
};