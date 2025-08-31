import type { Meta, StoryObj } from "@storybook/react";
import { LiquidButton } from "../liquid-button";
import {
  LiquidCard,
  LiquidCardContent,
  LiquidCardDescription,
  LiquidCardFooter,
  LiquidCardHeader,
  LiquidCardTitle,
} from "./liquid-card";

const meta = {
  title: "Components/LiquidCard",
  component: LiquidCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A flexible liquid glass card component with sub-components for structured content layout following Apple's design principles.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "elevated", "interactive", "navigation", "feature", "glass"],
      description: "The visual style variant of the card",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "The size/padding of the card",
    },
    spacing: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl"],
      description: "Internal spacing between content elements",
    },
    rippleEffect: {
      control: "boolean",
      description: "Enable ripple effect on click",
    },
    hoverGlow: {
      control: "boolean",
      description: "Enable hover glow effect",
    },
    dragPhysics: {
      control: "boolean",
      description: "Enable drag physics with jiggle animation",
    },
  },
  args: {
    variant: "default",
    size: "md",
    spacing: "md",
    rippleEffect: false,
    hoverGlow: true,
    dragPhysics: false,
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof LiquidCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Icons for stories
const StarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const RocketIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10.75 2.567a.25.25 0 0 0-.5 0L8.717 6.34a1.25 1.25 0 0 1-.65.65L4.433 8.25a.25.25 0 0 0 0 .5l3.634 1.26a1.25 1.25 0 0 1 .65.65l1.533 3.634a.25.25 0 0 0 .5 0l1.533-3.634a1.25 1.25 0 0 1 .65-.65l3.634-1.533a.25.25 0 0 0 0-.5L12.933 6.99a1.25 1.25 0 0 1-.65-.65L10.75 2.567Z" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M9.661 2.237a.531.531 0 01.678 0 11.947 11.947 0 007.078 2.749.5.5 0 01.031.893 11.676 11.676 0 00-2.708 15.147.5.5 0 01-.165.55c-1.045.8-2.213 1.374-3.495 1.374S7.898 22.426 6.853 21.626a.5.5 0 01-.165-.55 11.676 11.676 0 00-2.708-15.147.5.5 0 01.031-.893A11.947 11.947 0 009.661 2.237zM13.4 11.957a.75.75 0 10-1.061-1.061L9.75 13.485l-1.22-1.22a.75.75 0 00-1.06 1.061l1.75 1.75a.75.75 0 001.06 0l3.12-3.119z"
      clipRule="evenodd"
    />
  </svg>
);

export const Default: Story = {
  render: (args) => (
    <LiquidCard {...args}>
      <LiquidCardHeader>
        <LiquidCardTitle>Card Title</LiquidCardTitle>
        <LiquidCardDescription>
          A beautiful liquid glass card with Apple's signature aesthetic.
        </LiquidCardDescription>
      </LiquidCardHeader>
      <LiquidCardContent>
        <p className="text-white/80 text-sm">
          This is the main content area of the card. You can put any content here.
        </p>
      </LiquidCardContent>
    </LiquidCard>
  ),
};

export const Variants: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Card Variants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <LiquidCard variant="default">
            <LiquidCardHeader>
              <LiquidCardTitle>Default</LiquidCardTitle>
              <LiquidCardDescription>Standard glass card</LiquidCardDescription>
            </LiquidCardHeader>
          </LiquidCard>

          <LiquidCard variant="elevated">
            <LiquidCardHeader>
              <LiquidCardTitle>Elevated</LiquidCardTitle>
              <LiquidCardDescription>Enhanced shadow and depth</LiquidCardDescription>
            </LiquidCardHeader>
          </LiquidCard>

          <LiquidCard variant="interactive">
            <LiquidCardHeader>
              <LiquidCardTitle>Interactive</LiquidCardTitle>
              <LiquidCardDescription>Hover effects and cursor pointer</LiquidCardDescription>
            </LiquidCardHeader>
          </LiquidCard>

          <LiquidCard variant="navigation">
            <LiquidCardHeader>
              <LiquidCardTitle>Navigation</LiquidCardTitle>
              <LiquidCardDescription>Subtle style for nav elements</LiquidCardDescription>
            </LiquidCardHeader>
          </LiquidCard>

          <LiquidCard variant="feature">
            <LiquidCardHeader>
              <LiquidCardTitle>Feature</LiquidCardTitle>
              <LiquidCardDescription>Gradient background highlight</LiquidCardDescription>
            </LiquidCardHeader>
          </LiquidCard>

          <LiquidCard variant="glass">
            <LiquidCardHeader>
              <LiquidCardTitle>Glass</LiquidCardTitle>
              <LiquidCardDescription>Ultra-subtle glass effect</LiquidCardDescription>
            </LiquidCardHeader>
          </LiquidCard>
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
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Card Sizes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <LiquidCard size="sm">
            <LiquidCardTitle className="text-base">Small</LiquidCardTitle>
            <LiquidCardDescription>Compact card</LiquidCardDescription>
          </LiquidCard>

          <LiquidCard size="md">
            <LiquidCardTitle>Medium</LiquidCardTitle>
            <LiquidCardDescription>Default size card</LiquidCardDescription>
          </LiquidCard>

          <LiquidCard size="lg">
            <LiquidCardTitle className="text-xl">Large</LiquidCardTitle>
            <LiquidCardDescription>Spacious card</LiquidCardDescription>
          </LiquidCard>

          <LiquidCard size="xl">
            <LiquidCardTitle className="text-2xl">Extra Large</LiquidCardTitle>
            <LiquidCardDescription>Maximum space card</LiquidCardDescription>
          </LiquidCard>
        </div>
      </div>
    </div>
  ),
};

export const WithActions: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Cards with Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LiquidCard variant="elevated">
            <LiquidCardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                <RocketIcon />
              </div>
              <LiquidCardTitle>Launch Your Project</LiquidCardTitle>
              <LiquidCardDescription>
                Get started with our premium components and build amazing interfaces.
              </LiquidCardDescription>
            </LiquidCardHeader>
            <LiquidCardContent>
              <ul className="text-white/80 text-sm space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  60+ Components
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  TypeScript Support
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  A11Y Compliant
                </li>
              </ul>
            </LiquidCardContent>
            <LiquidCardFooter>
              <LiquidButton size="sm" variant="ghost">
                Learn More
              </LiquidButton>
              <LiquidButton size="sm">Get Started</LiquidButton>
            </LiquidCardFooter>
          </LiquidCard>

          <LiquidCard variant="feature">
            <LiquidCardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center mb-4">
                <ShieldIcon />
              </div>
              <LiquidCardTitle>Enterprise Ready</LiquidCardTitle>
              <LiquidCardDescription>
                Built for scale with enterprise-grade security and performance.
              </LiquidCardDescription>
            </LiquidCardHeader>
            <LiquidCardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">99.9%</div>
                  <div className="text-white/60">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">&lt;100ms</div>
                  <div className="text-white/60">Response</div>
                </div>
              </div>
            </LiquidCardContent>
            <LiquidCardFooter>
              <span className="text-white/60 text-sm">Starting at $99/mo</span>
              <LiquidButton size="sm" variant="secondary">
                Contact Sales
              </LiquidButton>
            </LiquidCardFooter>
          </LiquidCard>
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
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Interactive Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LiquidCard variant="interactive" rippleEffect>
            <LiquidCardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-red-400 rounded-xl flex items-center justify-center mb-4">
                <StarIcon />
              </div>
              <LiquidCardTitle>Interactive Card</LiquidCardTitle>
              <LiquidCardDescription>Click me to see the ripple effect!</LiquidCardDescription>
            </LiquidCardHeader>
            <LiquidCardContent>
              <p className="text-white/80 text-sm">
                This card responds to clicks with beautiful ripple animations.
              </p>
            </LiquidCardContent>
          </LiquidCard>

          <LiquidCard dragPhysics hoverGlow>
            <LiquidCardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl flex items-center justify-center mb-4">
                🎭
              </div>
              <LiquidCardTitle>Drag Physics</LiquidCardTitle>
              <LiquidCardDescription>Drag me around and watch the jiggle!</LiquidCardDescription>
            </LiquidCardHeader>
            <LiquidCardContent>
              <p className="text-white/80 text-sm">
                This card has physics-based drag interactions with smooth animations.
              </p>
            </LiquidCardContent>
          </LiquidCard>
        </div>
      </div>
    </div>
  ),
};

export const ContentShowcase: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Content Showcase</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature Card */}
          <LiquidCard variant="elevated" size="lg">
            <LiquidCardHeader>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <LiquidCardTitle>Premium Features</LiquidCardTitle>
              <LiquidCardDescription>
                Unlock the full potential of our component library
              </LiquidCardDescription>
            </LiquidCardHeader>
            <LiquidCardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-white/80 text-sm">Advanced animations</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-white/80 text-sm">Premium support</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-white/80 text-sm">Custom themes</span>
                </div>
              </div>
            </LiquidCardContent>
            <LiquidCardFooter>
              <div className="text-white/60 text-sm">
                <span className="line-through">$199</span>{" "}
                <span className="text-white font-semibold">$99</span>
              </div>
              <LiquidButton size="sm">Upgrade</LiquidButton>
            </LiquidCardFooter>
          </LiquidCard>

          {/* Status Card */}
          <LiquidCard variant="glass">
            <LiquidCardHeader>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">System Status</h3>
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </LiquidCardHeader>
            <LiquidCardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/70 text-sm">API</span>
                  <span className="text-green-300 text-sm font-medium">Online</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70 text-sm">Database</span>
                  <span className="text-green-300 text-sm font-medium">Connected</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70 text-sm">CDN</span>
                  <span className="text-yellow-300 text-sm font-medium">Degraded</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70 text-sm">Analytics</span>
                  <span className="text-green-300 text-sm font-medium">Online</span>
                </div>
              </div>
            </LiquidCardContent>
          </LiquidCard>

          {/* Metric Card */}
          <LiquidCard variant="navigation">
            <LiquidCardContent>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">94%</span>
                </div>
                <LiquidCardTitle className="mb-2">Performance Score</LiquidCardTitle>
                <LiquidCardDescription>
                  Your app is running smoothly with excellent performance metrics.
                </LiquidCardDescription>
                <div className="mt-4 w-full bg-white/10 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-emerald-400 to-teal-500 h-2 rounded-full"
                    style={{ width: "94%" }}
                  ></div>
                </div>
              </div>
            </LiquidCardContent>
          </LiquidCard>
        </div>
      </div>
    </div>
  ),
};
