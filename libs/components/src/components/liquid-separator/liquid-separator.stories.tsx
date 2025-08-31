import type { Meta, StoryObj } from "@storybook/react";
import { LiquidSectionSeparator, LiquidSeparator } from "./liquid-separator";

const meta = {
  title: "Components/LiquidSeparator",
  component: LiquidSeparator,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A liquid glass separator component for dividing content with various styles, orientations, and decorative options.",
      },
    },
  },
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Orientation of the separator",
    },
    variant: {
      control: "select",
      options: ["default", "subtle", "bold", "gradient", "dashed", "dotted", "glass"],
      description: "Visual style of the separator",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Thickness of the separator",
    },
    spacing: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl"],
      description: "Space around the separator",
    },
    animated: {
      control: "boolean",
      description: "Enable animations",
    },
    labelPosition: {
      control: "select",
      options: ["center", "start", "end"],
      description: "Position of the label",
    },
  },
  args: {
    orientation: "horizontal",
    variant: "default",
    size: "md",
    spacing: "md",
    animated: false,
    labelPosition: "center",
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8 flex items-center justify-center">
        <div className="w-80">
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof LiquidSeparator>;

export default meta;
type Story = StoryObj<typeof meta>;

// Icons for stories
const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const DiamondIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M6 3h12l4 6-10 12L2 9l4-6z" />
  </svg>
);

const CircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <circle cx="12" cy="12" r="10" />
  </svg>
);

const FlowerIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9C21 10.1 20.1 11 19 11C17.9 11 17 10.1 17 9C17 7.9 17.9 7 19 7C20.1 7 21 7.9 21 9ZM6 9C6 10.1 5.1 11 4 11C2.9 11 2 10.1 2 9C2 7.9 2.9 7 4 7C5.1 7 6 7.9 6 9ZM14 15C14 16.1 13.1 17 12 17C10.9 17 10 16.1 10 15C10 13.9 10.9 13 12 13C13.1 13 14 13.9 14 15ZM19 14C20.1 14 21 14.9 21 16C21 17.1 20.1 18 19 18C17.9 18 17 17.1 17 16C17 14.9 17.9 14 19 14ZM5 14C6.1 14 7 14.9 7 16C7 17.1 6.1 18 5 18C3.9 18 3 17.1 3 16C3 14.9 3.9 14 5 14Z" />
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
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Separator Variants</h2>
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Default</h3>
            <LiquidSeparator variant="default" />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Subtle</h3>
            <LiquidSeparator variant="subtle" />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Bold</h3>
            <LiquidSeparator variant="bold" />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Gradient</h3>
            <LiquidSeparator variant="gradient" />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Dashed</h3>
            <LiquidSeparator variant="dashed" />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Dotted</h3>
            <LiquidSeparator variant="dotted" />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Glass Effect</h3>
            <LiquidSeparator variant="glass" />
          </div>
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
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Separator Sizes</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-white mb-2">Extra Small</h3>
            <LiquidSeparator size="xs" />
          </div>

          <div>
            <h3 className="text-sm font-medium text-white mb-2">Small</h3>
            <LiquidSeparator size="sm" />
          </div>

          <div>
            <h3 className="text-sm font-medium text-white mb-2">Medium</h3>
            <LiquidSeparator size="md" />
          </div>

          <div>
            <h3 className="text-sm font-medium text-white mb-2">Large</h3>
            <LiquidSeparator size="lg" />
          </div>

          <div>
            <h3 className="text-sm font-medium text-white mb-2">Extra Large</h3>
            <LiquidSeparator size="xl" />
          </div>
        </div>
      </div>
    </div>
  ),
};

export const WithLabels: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Separators with Labels</h2>
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Center Label</h3>
            <LiquidSeparator label="OR" labelPosition="center" />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Start Label</h3>
            <LiquidSeparator label="Beginning" labelPosition="start" variant="gradient" />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">End Label</h3>
            <LiquidSeparator label="End" labelPosition="end" variant="bold" />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Long Label</h3>
            <LiquidSeparator
              label="Continue Reading Below"
              labelPosition="center"
              variant="glass"
            />
          </div>
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
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Separators with Icons</h2>
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Icon Only</h3>
            <LiquidSeparator decorativeIcon={<StarIcon />} variant="gradient" />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Icon with Label</h3>
            <LiquidSeparator
              decorativeIcon={<DiamondIcon />}
              label="Premium Content"
              variant="bold"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Simple Circle</h3>
            <LiquidSeparator decorativeIcon={<CircleIcon />} variant="default" />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Decorative Flower</h3>
            <LiquidSeparator
              decorativeIcon={<FlowerIcon />}
              label="Section Break"
              variant="glass"
            />
          </div>
        </div>
      </div>
    </div>
  ),
};

export const VerticalSeparators: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Vertical Separators</h2>
        <div className="flex items-center justify-center space-x-8" style={{ height: "300px" }}>
          <div className="text-center">
            <p className="text-white mb-4">Content A</p>
            <div className="bg-white/10 p-4 rounded-lg">
              <p className="text-white/70 text-sm">Left section content</p>
            </div>
          </div>

          <LiquidSeparator orientation="vertical" variant="default" spacing="lg" />

          <div className="text-center">
            <p className="text-white mb-4">Content B</p>
            <div className="bg-white/10 p-4 rounded-lg">
              <p className="text-white/70 text-sm">Middle section content</p>
            </div>
          </div>

          <LiquidSeparator
            orientation="vertical"
            variant="gradient"
            label="OR"
            labelPosition="center"
            spacing="lg"
          />

          <div className="text-center">
            <p className="text-white mb-4">Content C</p>
            <div className="bg-white/10 p-4 rounded-lg">
              <p className="text-white/70 text-sm">Right section content</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const Spacing: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Separator Spacing</h2>
        <div className="space-y-4">
          <div className="bg-white/10 p-4 rounded-lg">
            <p className="text-white text-center">Content Above</p>
          </div>

          <LiquidSeparator spacing="none" label="No Spacing" variant="bold" />

          <div className="bg-white/10 p-4 rounded-lg">
            <p className="text-white text-center">Content Below</p>
          </div>

          <LiquidSeparator spacing="sm" label="Small Spacing" variant="gradient" />

          <div className="bg-white/10 p-4 rounded-lg">
            <p className="text-white text-center">Content Below</p>
          </div>

          <LiquidSeparator spacing="md" label="Medium Spacing" variant="default" />

          <div className="bg-white/10 p-4 rounded-lg">
            <p className="text-white text-center">Content Below</p>
          </div>

          <LiquidSeparator spacing="lg" label="Large Spacing" variant="glass" />

          <div className="bg-white/10 p-4 rounded-lg">
            <p className="text-white text-center">Content Below</p>
          </div>

          <LiquidSeparator spacing="xl" label="Extra Large Spacing" variant="bold" />

          <div className="bg-white/10 p-4 rounded-lg">
            <p className="text-white text-center">Content Below</p>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const SectionSeparators: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Section Separators</h2>

        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Introduction</h3>
          <p className="text-white/80">
            This is the introduction section of our content. It provides context and sets up the
            main topics that will be covered.
          </p>
        </div>

        <LiquidSectionSeparator
          title="Chapter 1"
          subtitle="Getting Started"
          icon={<StarIcon />}
          variant="default"
        />

        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Getting Started</h3>
          <p className="text-white/80">
            In this chapter, we'll cover the basics and help you get up and running quickly with our
            platform.
          </p>
        </div>

        <LiquidSectionSeparator
          title="Chapter 2"
          subtitle="Advanced Features"
          icon={<DiamondIcon />}
          variant="prominent"
        />

        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Advanced Features</h3>
          <p className="text-white/80">
            Now that you're familiar with the basics, let's explore some of the more advanced
            capabilities available.
          </p>
        </div>

        <LiquidSectionSeparator title="Conclusion" variant="subtle" spacing="lg" />

        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Wrap Up</h3>
          <p className="text-white/80">
            Thank you for reading! We hope this guide has been helpful in your journey.
          </p>
        </div>
      </div>
    </div>
  ),
};

export const ContentDivision: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Content Division Examples
        </h2>

        {/* Login Form Example */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8">
          <h3 className="text-xl font-semibold text-white mb-6 text-center">Sign In</h3>

          <div className="space-y-4 mb-6">
            <button className="w-full py-3 bg-white/20 rounded-lg text-white hover:bg-white/30">
              Continue with Google
            </button>
            <button className="w-full py-3 bg-white/20 rounded-lg text-white hover:bg-white/30">
              Continue with GitHub
            </button>
          </div>

          <LiquidSeparator label="OR" variant="gradient" spacing="lg" />

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50"
            />
            <button className="w-full py-3 bg-blue-500/30 rounded-lg text-white hover:bg-blue-500/40">
              Sign In
            </button>
          </div>
        </div>

        {/* Article Layout */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
          <article>
            <h3 className="text-2xl font-bold text-white mb-4">The Future of Web Design</h3>
            <p className="text-white/80 mb-6">
              Web design continues to evolve at a rapid pace, with new technologies and
              methodologies emerging regularly...
            </p>

            <LiquidSeparator decorativeIcon={<FlowerIcon />} variant="glass" spacing="xl" />

            <h4 className="text-xl font-semibold text-white mb-4">Key Trends to Watch</h4>
            <p className="text-white/80 mb-6">
              Several trends are shaping the future of web design, from glassmorphism to voice
              interfaces...
            </p>

            <LiquidSeparator label="Continue Reading" variant="gradient" spacing="lg" />

            <h4 className="text-xl font-semibold text-white mb-4">Implementation Strategies</h4>
            <p className="text-white/80">
              To stay ahead of the curve, designers and developers should focus on these practical
              approaches...
            </p>
          </article>
        </div>
      </div>
    </div>
  ),
};
