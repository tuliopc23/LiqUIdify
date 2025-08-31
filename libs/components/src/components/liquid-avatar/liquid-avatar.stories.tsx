import type { Meta, StoryObj } from "@storybook/react";
import { LiquidAvatar, LiquidAvatarGroup } from "./liquid-avatar";

const meta = {
  title: "Components/LiquidAvatar",
  component: LiquidAvatar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A liquid glass avatar component with image loading, fallbacks, status indicators, and grouping support.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "square", "rounded"],
      description: "The shape variant of the avatar",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "2xl"],
      description: "The size of the avatar",
    },
    src: {
      control: "text",
      description: "Image source URL",
    },
    alt: {
      control: "text",
      description: "Alt text for the image",
    },
    fallback: {
      control: "text",
      description: "Custom fallback content",
    },
    status: {
      control: "select",
      options: ["online", "offline", "away", "busy"],
      description: "Status indicator",
    },
    showStatus: {
      control: "boolean",
      description: "Show status indicator",
    },
    loading: {
      control: "select",
      options: ["lazy", "eager"],
      description: "Image loading strategy",
    },
  },
  args: {
    variant: "default",
    size: "md",
    alt: "User Avatar",
    status: "online",
    showStatus: false,
    loading: "lazy",
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8 flex items-center justify-center">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LiquidAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample avatar URLs for stories
const avatarUrls = [
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1494790108755-2616b45b7b25?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
];

export const Default: Story = {
  args: {
    src: avatarUrls[0],
  },
};

export const Variants: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Avatar Variants</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="flex flex-col items-center space-y-2">
            <LiquidAvatar variant="default" src={avatarUrls[0]} alt="John Doe" />
            <p className="text-white/70 text-sm">Default (Circle)</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <LiquidAvatar variant="square" src={avatarUrls[1]} alt="Jane Smith" />
            <p className="text-white/70 text-sm">Square</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <LiquidAvatar variant="rounded" src={avatarUrls[2]} alt="Alex Johnson" />
            <p className="text-white/70 text-sm">Rounded</p>
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
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Avatar Sizes</h2>
        <div className="flex flex-wrap justify-center items-end gap-6">
          <div className="flex flex-col items-center space-y-2">
            <LiquidAvatar size="xs" src={avatarUrls[0]} alt="Extra Small" />
            <p className="text-white/70 text-xs">XS</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <LiquidAvatar size="sm" src={avatarUrls[1]} alt="Small" />
            <p className="text-white/70 text-sm">SM</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <LiquidAvatar size="md" src={avatarUrls[2]} alt="Medium" />
            <p className="text-white/70 text-sm">MD</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <LiquidAvatar size="lg" src={avatarUrls[3]} alt="Large" />
            <p className="text-white/70 text-sm">LG</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <LiquidAvatar size="xl" src={avatarUrls[4]} alt="Extra Large" />
            <p className="text-white/70 text-sm">XL</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <LiquidAvatar size="2xl" src={avatarUrls[0]} alt="2X Large" />
            <p className="text-white/70 text-sm">2XL</p>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const WithStatus: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Avatars with Status</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center space-y-2">
            <LiquidAvatar
              src={avatarUrls[0]}
              alt="Online User"
              showStatus
              status="online"
              size="lg"
            />
            <p className="text-white/70 text-sm">Online</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <LiquidAvatar
              src={avatarUrls[1]}
              alt="Offline User"
              showStatus
              status="offline"
              size="lg"
            />
            <p className="text-white/70 text-sm">Offline</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <LiquidAvatar src={avatarUrls[2]} alt="Away User" showStatus status="away" size="lg" />
            <p className="text-white/70 text-sm">Away</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <LiquidAvatar src={avatarUrls[3]} alt="Busy User" showStatus status="busy" size="lg" />
            <p className="text-white/70 text-sm">Busy</p>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const Fallbacks: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Avatar Fallbacks</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center space-y-2">
            <LiquidAvatar alt="John Doe" size="lg" />
            <p className="text-white/70 text-sm">Initials (JD)</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <LiquidAvatar alt="Jane Smith Wilson" size="lg" />
            <p className="text-white/70 text-sm">Initials (JS)</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <LiquidAvatar fallback="👤" size="lg" />
            <p className="text-white/70 text-sm">Custom Emoji</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <LiquidAvatar size="lg" />
            <p className="text-white/70 text-sm">Default Icon</p>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const LoadingStates: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => {
    // Simulate slow loading images
    const slowImageUrl =
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&delay=3000";

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Loading States</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex flex-col items-center space-y-2">
              <LiquidAvatar src={slowImageUrl} alt="Loading Avatar" size="lg" />
              <p className="text-white/70 text-sm">Loading Image</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <LiquidAvatar src="https://invalid-url-404.jpg" alt="Failed to Load" size="lg" />
              <p className="text-white/70 text-sm">Failed Load</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <LiquidAvatar src={avatarUrls[0]} alt="Loaded Successfully" size="lg" />
              <p className="text-white/70 text-sm">Loaded</p>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const AvatarGroups: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Avatar Groups</h2>
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-white mb-4">Team Members (Normal Spacing)</h3>
            <LiquidAvatarGroup max={4} spacing="normal">
              <LiquidAvatar src={avatarUrls[0]} alt="John Doe" />
              <LiquidAvatar src={avatarUrls[1]} alt="Jane Smith" />
              <LiquidAvatar src={avatarUrls[2]} alt="Alex Johnson" />
              <LiquidAvatar src={avatarUrls[3]} alt="Emily Davis" />
              <LiquidAvatar src={avatarUrls[4]} alt="Michael Brown" />
              <LiquidAvatar alt="Sarah Wilson" />
              <LiquidAvatar alt="David Lee" />
            </LiquidAvatarGroup>
          </div>

          <div className="text-center">
            <h3 className="text-xl font-semibold text-white mb-4">Project Team (Tight Spacing)</h3>
            <LiquidAvatarGroup max={3} spacing="tight">
              <LiquidAvatar src={avatarUrls[0]} alt="Lead Developer" size="lg" />
              <LiquidAvatar src={avatarUrls[1]} alt="Designer" size="lg" />
              <LiquidAvatar src={avatarUrls[2]} alt="Product Manager" size="lg" />
              <LiquidAvatar alt="QA Engineer" size="lg" />
              <LiquidAvatar alt="DevOps Engineer" size="lg" />
            </LiquidAvatarGroup>
          </div>

          <div className="text-center">
            <h3 className="text-xl font-semibold text-white mb-4">Collaborators (Loose Spacing)</h3>
            <LiquidAvatarGroup max={6} spacing="loose">
              <LiquidAvatar src={avatarUrls[0]} alt="Collaborator 1" showStatus status="online" />
              <LiquidAvatar src={avatarUrls[1]} alt="Collaborator 2" showStatus status="away" />
              <LiquidAvatar src={avatarUrls[2]} alt="Collaborator 3" showStatus status="online" />
              <LiquidAvatar src={avatarUrls[3]} alt="Collaborator 4" showStatus status="offline" />
              <LiquidAvatar alt="Collaborator 5" showStatus status="busy" />
            </LiquidAvatarGroup>
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
    const [selectedUser, setSelectedUser] = React.useState<string | null>(null);

    const users = [
      { id: "1", name: "John Doe", avatar: avatarUrls[0], status: "online" as const },
      { id: "2", name: "Jane Smith", avatar: avatarUrls[1], status: "away" as const },
      { id: "3", name: "Alex Johnson", avatar: avatarUrls[2], status: "online" as const },
      { id: "4", name: "Emily Davis", avatar: avatarUrls[3], status: "busy" as const },
      { id: "5", name: "Michael Brown", avatar: avatarUrls[4], status: "offline" as const },
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Interactive User Selection
          </h2>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-white mb-6">Select a Team Member</h3>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              {users.map((user) => (
                <div
                  key={user.id}
                  className={`p-4 rounded-lg cursor-pointer transition-all ${
                    selectedUser === user.id
                      ? "bg-white/20 ring-2 ring-white/50"
                      : "bg-white/5 hover:bg-white/10"
                  }`}
                  onClick={() => setSelectedUser(user.id)}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <LiquidAvatar
                      src={user.avatar}
                      alt={user.name}
                      showStatus
                      status={user.status}
                      size="lg"
                    />
                    <p className="text-white text-sm font-medium text-center">{user.name}</p>
                    <p className="text-white/60 text-xs capitalize">{user.status}</p>
                  </div>
                </div>
              ))}
            </div>

            {selectedUser && (
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-white">
                  Selected:{" "}
                  <span className="font-semibold">
                    {users.find((u) => u.id === selectedUser)?.name}
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
};

export const UserProfiles: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">User Profile Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center">
            <LiquidAvatar
              src={avatarUrls[0]}
              alt="John Doe"
              size="xl"
              showStatus
              status="online"
              className="mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold text-white mb-1">John Doe</h3>
            <p className="text-white/70 text-sm mb-2">Senior Developer</p>
            <p className="text-green-400 text-xs">● Online</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center">
            <LiquidAvatar
              src={avatarUrls[1]}
              alt="Jane Smith"
              size="xl"
              showStatus
              status="away"
              variant="square"
              className="mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold text-white mb-1">Jane Smith</h3>
            <p className="text-white/70 text-sm mb-2">UI/UX Designer</p>
            <p className="text-yellow-400 text-xs">● Away</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center">
            <LiquidAvatar
              alt="Alex Johnson"
              size="xl"
              showStatus
              status="busy"
              variant="rounded"
              className="mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold text-white mb-1">Alex Johnson</h3>
            <p className="text-white/70 text-sm mb-2">Product Manager</p>
            <p className="text-red-400 text-xs">● Busy</p>
          </div>
        </div>
      </div>
    </div>
  ),
};
