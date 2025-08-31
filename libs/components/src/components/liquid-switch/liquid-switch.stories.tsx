import type { Meta, StoryObj } from "@storybook/react";
import { LiquidSwitch } from "./liquid-switch";

const meta = {
  title: "Components/LiquidSwitch",
  component: LiquidSwitch,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A liquid glass switch component with smooth animations and multiple variants. Supports controlled/uncontrolled modes with form integration.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "warning", "danger", "ghost"],
      description: "The visual style variant of the switch",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "The size of the switch",
    },
    checked: {
      control: "boolean",
      description: "Controlled checked state",
    },
    defaultChecked: {
      control: "boolean",
      description: "Default checked state for uncontrolled mode",
    },
    disabled: {
      control: "boolean",
      description: "Disable the switch",
    },
    loading: {
      control: "boolean",
      description: "Show loading spinner",
    },
    required: {
      control: "boolean",
      description: "Mark as required field",
    },
  },
  args: {
    variant: "default",
    size: "md",
    defaultChecked: false,
    disabled: false,
    loading: false,
    required: false,
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8 flex items-center justify-center">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LiquidSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

// Icons for stories
const WifiIcon = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
    <path d="M15.384 6.115a.485.485 0 0 0-.047-.736A13.43 13.43 0 0 0 8 3C5.259 3 2.723 3.882.663 5.379a.485.485 0 0 0-.047.736.518.518 0 0 0 .668.05A12.44 12.44 0 0 1 8 4c2.507 0 4.827.802 6.716 2.165.205.148.49.13.668-.05Z" />
    <path d="M13.229 8.271a.482.482 0 0 0-.063-.745A9.455 9.455 0 0 0 8 6c-1.905 0-3.68.56-5.166 1.526a.48.48 0 0 0-.063.745.525.525 0 0 0 .652.065A8.46 8.46 0 0 1 8 7a8.46 8.46 0 0 1 4.577 1.336c.205.132.48.108.652-.065zm-2.183 2.183c.226-.226.185-.605-.1-.75A3.5 3.5 0 0 0 8 9c-.88 0-1.663.28-2.946.704-.285.145-.326.524-.1.75l.015.015c.16.16.407.19.611.09A2.5 2.5 0 0 1 8 10c.69 0 1.12.164 1.42.559.204.1.45.07.61-.09l.016-.015zM9.06 12.44c.196-.196.198-.52-.04-.66A1.99 1.99 0 0 0 8 11.5a1.99 1.99 0 0 0-1.02.28c-.238.14-.236.464-.04.66l.706.706a.5.5 0 0 0 .708 0l.706-.706Z" />
  </svg>
);

const BellIcon = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
  </svg>
);

const MoonIcon = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
    <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
  </svg>
);

const CheckIcon = () => (
  <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor">
    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
  </svg>
);

const XIcon = () => (
  <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor">
    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
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
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Switch Variants</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <LiquidSwitch variant="default" defaultChecked />
            <p className="text-white/70 text-sm">Default</p>
          </div>
          <div className="space-y-4">
            <LiquidSwitch variant="success" defaultChecked />
            <p className="text-white/70 text-sm">Success</p>
          </div>
          <div className="space-y-4">
            <LiquidSwitch variant="warning" />
            <p className="text-white/70 text-sm">Warning</p>
          </div>
          <div className="space-y-4">
            <LiquidSwitch variant="danger" />
            <p className="text-white/70 text-sm">Danger</p>
          </div>
          <div className="space-y-4">
            <LiquidSwitch variant="ghost" defaultChecked />
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
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Switch Sizes</h2>
        <div className="flex flex-wrap items-center justify-center gap-8">
          <div className="flex flex-col items-center space-y-2">
            <LiquidSwitch size="sm" defaultChecked />
            <p className="text-white/70 text-sm">Small</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <LiquidSwitch size="md" defaultChecked />
            <p className="text-white/70 text-sm">Medium</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <LiquidSwitch size="lg" defaultChecked />
            <p className="text-white/70 text-sm">Large</p>
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
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Switches with Icons</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-4">
            <LiquidSwitch
              icon={<WifiIcon />}
              defaultChecked
              label="WiFi"
              description="Enable wireless connectivity"
            />
            <LiquidSwitch
              icon={<BellIcon />}
              label="Notifications"
              description="Receive push notifications"
            />
            <LiquidSwitch
              icon={<MoonIcon />}
              variant="ghost"
              label="Dark Mode"
              description="Switch to dark theme"
            />
          </div>
          <div className="space-y-4">
            <LiquidSwitch
              checkedIcon={<CheckIcon />}
              uncheckedIcon={<XIcon />}
              variant="success"
              label="Auto-save"
              description="Automatically save your work"
            />
            <LiquidSwitch
              checkedIcon={<CheckIcon />}
              uncheckedIcon={<XIcon />}
              variant="danger"
              defaultChecked
              label="Data Backup"
              description="Enable automatic backups"
            />
          </div>
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
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Switch States</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-6">
            <LiquidSwitch label="Normal Switch" description="Regular interactive switch" />
            <LiquidSwitch loading label="Loading Switch" description="Processing state" />
            <LiquidSwitch disabled label="Disabled Switch" description="Cannot be toggled" />
            <LiquidSwitch
              disabled
              defaultChecked
              label="Disabled Checked"
              description="Checked but disabled"
            />
          </div>
          <div className="space-y-6">
            <LiquidSwitch
              required
              label="Required Switch"
              description="Must be enabled to continue"
            />
            <LiquidSwitch
              loading
              icon={<WifiIcon />}
              label="Loading with Icon"
              description="Processing with icon"
            />
            <LiquidSwitch
              disabled
              icon={<BellIcon />}
              defaultChecked
              label="Disabled with Icon"
              description="Cannot change this setting"
            />
          </div>
        </div>
      </div>
    </div>
  ),
};

export const FormIntegration: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Form Integration</h2>
        <form className="space-y-6 bg-white/10 backdrop-blur-md rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Account Settings</h3>

          <LiquidSwitch
            name="emailNotifications"
            value="enabled"
            label="Email Notifications"
            description="Receive updates via email"
            defaultChecked
          />

          <LiquidSwitch
            name="smsAlerts"
            value="enabled"
            variant="success"
            label="SMS Alerts"
            description="Get text message alerts"
          />

          <LiquidSwitch
            name="marketingEmails"
            value="enabled"
            variant="ghost"
            label="Marketing Communications"
            description="Receive promotional content"
          />

          <LiquidSwitch
            name="dataCollection"
            value="enabled"
            variant="warning"
            label="Analytics & Data Collection"
            description="Help improve our services"
            required
          />

          <LiquidSwitch
            name="publicProfile"
            value="enabled"
            variant="danger"
            label="Public Profile"
            description="Make your profile visible to others"
          />

          <div className="pt-4">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white font-medium hover:bg-white/30 transition-colors"
            >
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => {
    const [switches, setSwitches] = React.useState({
      wifi: true,
      bluetooth: false,
      notifications: true,
      location: false,
      autoUpdate: true,
    });

    const handleChange = (key: keyof typeof switches) => (checked: boolean) => {
      setSwitches((prev) => ({ ...prev, [key]: checked }));
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">System Settings</h2>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 space-y-6">
            <h3 className="text-xl font-semibold text-white">Device Configuration</h3>

            <LiquidSwitch
              checked={switches.wifi}
              onCheckedChange={handleChange("wifi")}
              icon={<WifiIcon />}
              variant="default"
              label="WiFi"
              description={switches.wifi ? "Connected to network" : "Disconnected"}
            />

            <LiquidSwitch
              checked={switches.bluetooth}
              onCheckedChange={handleChange("bluetooth")}
              variant="success"
              label="Bluetooth"
              description={switches.bluetooth ? "Discoverable" : "Hidden"}
            />

            <LiquidSwitch
              checked={switches.notifications}
              onCheckedChange={handleChange("notifications")}
              icon={<BellIcon />}
              variant="warning"
              label="Push Notifications"
              description={switches.notifications ? "Enabled" : "Disabled"}
            />

            <LiquidSwitch
              checked={switches.location}
              onCheckedChange={handleChange("location")}
              variant="danger"
              label="Location Services"
              description={
                switches.location ? "Apps can access location" : "Location access denied"
              }
            />

            <LiquidSwitch
              checked={switches.autoUpdate}
              onCheckedChange={handleChange("autoUpdate")}
              variant="ghost"
              label="Automatic Updates"
              description={
                switches.autoUpdate ? "Apps update automatically" : "Manual updates only"
              }
            />

            <div className="pt-4 text-sm text-white/60">
              <p>Settings are saved automatically</p>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
