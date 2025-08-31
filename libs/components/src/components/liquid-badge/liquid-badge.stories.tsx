import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { LiquidBadge, LiquidBadgeGroup } from "./liquid-badge";

const meta = {
  title: "Components/LiquidBadge",
  component: LiquidBadge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A liquid glass badge component with various variants, sizes, and interactive features like removable badges and counters.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "success", "warning", "danger", "outline", "ghost"],
      description: "The visual style variant of the badge",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "The size of the badge",
    },
    interactive: {
      control: "boolean",
      description: "Make badge interactive (clickable)",
    },
    dot: {
      control: "boolean",
      description: "Show dot indicator",
    },
    removable: {
      control: "boolean",
      description: "Show remove button",
    },
    pulsing: {
      control: "boolean",
      description: "Enable pulsing animation",
    },
    count: {
      control: "number",
      description: "Display count value",
    },
    maxCount: {
      control: "number",
      description: "Maximum count before showing +",
    },
    showZero: {
      control: "boolean",
      description: "Show badge when count is zero",
    },
  },
  args: {
    children: "Badge",
    variant: "default",
    size: "md",
    interactive: false,
    dot: false,
    removable: false,
    pulsing: false,
    showZero: false,
    maxCount: 99,
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8 flex items-center justify-center">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LiquidBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

// Icons for stories
const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-label="Star icon"
  >
    <title>Star</title>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const HeartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-label="Heart icon"
  >
    <title>Heart</title>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const BellIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-label="Bell icon"
  >
    <title>Bell</title>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const TagIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-label="Tag icon"
  >
    <title>Tag</title>
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-label="Check icon"
  >
    <title>Check</title>
    <polyline points="20,6 9,17 4,12" />
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
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Badge Variants</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center space-y-2">
            <LiquidBadge variant="default">Default</LiquidBadge>
            <p className="text-white/70 text-sm">Default</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <LiquidBadge variant="secondary">Secondary</LiquidBadge>
            <p className="text-white/70 text-sm">Secondary</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <LiquidBadge variant="success">Success</LiquidBadge>
            <p className="text-white/70 text-sm">Success</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <LiquidBadge variant="warning">Warning</LiquidBadge>
            <p className="text-white/70 text-sm">Warning</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <LiquidBadge variant="danger">Danger</LiquidBadge>
            <p className="text-white/70 text-sm">Danger</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <LiquidBadge variant="outline">Outline</LiquidBadge>
            <p className="text-white/70 text-sm">Outline</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <LiquidBadge variant="ghost">Ghost</LiquidBadge>
            <p className="text-white/70 text-sm">Ghost</p>
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
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Badge Sizes</h2>
        <div className="flex flex-wrap justify-center items-center gap-6">
          <div className="flex flex-col items-center space-y-2">
            <LiquidBadge size="xs">XS</LiquidBadge>
            <p className="text-white/70 text-xs">Extra Small</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <LiquidBadge size="sm">SM</LiquidBadge>
            <p className="text-white/70 text-sm">Small</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <LiquidBadge size="md">MD</LiquidBadge>
            <p className="text-white/70 text-sm">Medium</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <LiquidBadge size="lg">LG</LiquidBadge>
            <p className="text-white/70 text-sm">Large</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <LiquidBadge size="xl">XL</LiquidBadge>
            <p className="text-white/70 text-sm">Extra Large</p>
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
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Badges with Icons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <LiquidBadge icon={<StarIcon />} variant="default">
              Featured
            </LiquidBadge>
            <LiquidBadge icon={<HeartIcon />} variant="danger" iconPosition="right">
              Favorite
            </LiquidBadge>
            <LiquidBadge icon={<BellIcon />} variant="warning">
              Alert
            </LiquidBadge>
          </div>
          <div className="space-y-4">
            <LiquidBadge icon={<TagIcon />} variant="success">
              Tagged
            </LiquidBadge>
            <LiquidBadge icon={<CheckIcon />} variant="success" iconPosition="right">
              Verified
            </LiquidBadge>
            <LiquidBadge icon={<StarIcon />} variant="outline">
              Premium
            </LiquidBadge>
          </div>
          <div className="space-y-4">
            <LiquidBadge icon={<BellIcon />} variant="ghost" size="lg">
              Notification
            </LiquidBadge>
            <LiquidBadge icon={<HeartIcon />} variant="secondary" size="sm">
              Like
            </LiquidBadge>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const WithDots: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Badges with Dots</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Status Indicators</h3>
            <div className="space-y-3">
              <LiquidBadge dot variant="success">
                Online
              </LiquidBadge>
              <LiquidBadge dot variant="warning">
                Away
              </LiquidBadge>
              <LiquidBadge dot variant="danger">
                Offline
              </LiquidBadge>
              <LiquidBadge dot variant="secondary">
                Idle
              </LiquidBadge>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Pulsing Status</h3>
            <div className="space-y-3">
              <LiquidBadge dot pulsing variant="success">
                Live
              </LiquidBadge>
              <LiquidBadge dot pulsing variant="danger">
                Recording
              </LiquidBadge>
              <LiquidBadge dot pulsing variant="warning">
                Processing
              </LiquidBadge>
              <LiquidBadge dot pulsing variant="default" dotColor="#ff6b35">
                Custom Color
              </LiquidBadge>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const Counters: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Counter Badges</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Basic Counters</h3>
            <div className="space-y-3">
              <LiquidBadge count={5} />
              <LiquidBadge count={12} variant="success" />
              <LiquidBadge count={99} variant="warning" />
              <LiquidBadge count={150} maxCount={99} variant="danger" />
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">With Zero Values</h3>
            <div className="space-y-3">
              <LiquidBadge count={0} showZero />
              <LiquidBadge count={0} />
              <LiquidBadge count={1} variant="success" />
              <LiquidBadge count={0} showZero variant="outline" />
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Different Sizes</h3>
            <div className="space-y-3">
              <LiquidBadge count={5} size="sm" />
              <LiquidBadge count={10} size="md" />
              <LiquidBadge count={25} size="lg" />
              <LiquidBadge count={99} size="xl" maxCount={50} />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => {
    const [badges, setBadges] = React.useState([
      { id: 1, text: "React", variant: "default" as const },
      { id: 2, text: "TypeScript", variant: "success" as const },
      { id: 3, text: "Tailwind", variant: "warning" as const },
      { id: 4, text: "Storybook", variant: "danger" as const },
    ]);

    const removeBadge = (id: number) => {
      setBadges(badges.filter((badge) => badge.id !== id));
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Interactive Badges</h2>
          <div className="space-y-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Removable Tags</h3>
              <LiquidBadgeGroup spacing="normal" wrap>
                {badges.map((badge) => (
                  <LiquidBadge
                    key={badge.id}
                    variant={badge.variant}
                    removable
                    onRemove={() => removeBadge(badge.id)}
                  >
                    {badge.text}
                  </LiquidBadge>
                ))}
              </LiquidBadgeGroup>
              {badges.length === 0 && (
                <p className="text-white/60 text-sm mt-4">All badges removed!</p>
              )}
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Clickable Badges</h3>
              <LiquidBadgeGroup spacing="normal" wrap>
                <LiquidBadge
                  interactive
                  onClick={() => alert("Filter clicked!")}
                  icon={<TagIcon />}
                >
                  Filter
                </LiquidBadge>
                <LiquidBadge
                  interactive
                  variant="success"
                  onClick={() => alert("Category clicked!")}
                >
                  Category
                </LiquidBadge>
                <LiquidBadge
                  interactive
                  variant="warning"
                  onClick={() => alert("Status clicked!")}
                  dot
                >
                  Status
                </LiquidBadge>
                <LiquidBadge
                  interactive
                  variant="danger"
                  onClick={() => alert("Priority clicked!")}
                  count={3}
                />
              </LiquidBadgeGroup>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Link Badges</h3>
              <LiquidBadgeGroup spacing="normal" wrap>
                <LiquidBadge
                  href="https://react.dev"
                  target="_blank"
                  interactive
                  icon={<StarIcon />}
                >
                  React Docs
                </LiquidBadge>
                <LiquidBadge
                  href="https://tailwindcss.com"
                  target="_blank"
                  interactive
                  variant="success"
                >
                  Tailwind CSS
                </LiquidBadge>
                <LiquidBadge
                  href="https://storybook.js.org"
                  target="_blank"
                  interactive
                  variant="outline"
                >
                  Storybook
                </LiquidBadge>
              </LiquidBadgeGroup>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const BadgeGroups: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Badge Groups</h2>
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Skills - Tight Spacing</h3>
            <LiquidBadgeGroup spacing="tight" wrap>
              <LiquidBadge variant="default">JavaScript</LiquidBadge>
              <LiquidBadge variant="success">React</LiquidBadge>
              <LiquidBadge variant="warning">TypeScript</LiquidBadge>
              <LiquidBadge variant="danger">Node.js</LiquidBadge>
              <LiquidBadge variant="outline">GraphQL</LiquidBadge>
              <LiquidBadge variant="ghost">MongoDB</LiquidBadge>
            </LiquidBadgeGroup>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Categories - Normal Spacing</h3>
            <LiquidBadgeGroup spacing="normal" wrap>
              <LiquidBadge icon={<TagIcon />} variant="default">
                Web Dev
              </LiquidBadge>
              <LiquidBadge icon={<TagIcon />} variant="success">
                Mobile
              </LiquidBadge>
              <LiquidBadge icon={<TagIcon />} variant="warning">
                Design
              </LiquidBadge>
              <LiquidBadge icon={<TagIcon />} variant="danger">
                DevOps
              </LiquidBadge>
            </LiquidBadgeGroup>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Status - Loose Spacing</h3>
            <LiquidBadgeGroup spacing="loose">
              <LiquidBadge dot pulsing variant="success">
                Live
              </LiquidBadge>
              <LiquidBadge dot variant="warning">
                Pending
              </LiquidBadge>
              <LiquidBadge dot variant="danger">
                Error
              </LiquidBadge>
              <LiquidBadge dot variant="secondary">
                Idle
              </LiquidBadge>
            </LiquidBadgeGroup>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Mixed Sizes</h3>
            <LiquidBadgeGroup spacing="normal" wrap>
              <LiquidBadge size="sm" variant="default">
                Small
              </LiquidBadge>
              <LiquidBadge size="md" variant="success">
                Medium
              </LiquidBadge>
              <LiquidBadge size="lg" variant="warning">
                Large
              </LiquidBadge>
              <LiquidBadge size="xl" variant="danger">
                Extra Large
              </LiquidBadge>
            </LiquidBadgeGroup>
          </div>
        </div>
      </div>
    </div>
  ),
};
