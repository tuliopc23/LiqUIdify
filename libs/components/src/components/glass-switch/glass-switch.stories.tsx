import type { Meta, StoryObj } from "@storybook/react";
import {
  Bell,
  BellOff,
  Eye,
  EyeOff,
  Lock,
  Moon,
  Sun,
  Unlock,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
} from "lucide-react";
import type React from "react";
import { useState } from "react";

import { GlassSwitch } from "./glass-switch";

const meta = {
  title: "Glass UI/GlassSwitch",
  component: GlassSwitch,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
## GlassSwitch Component

A sleek toggle switch component with glassmorphic styling and smooth animations. Perfect for binary settings and feature toggles with full accessibility support.

### Key Features
- **Glassmorphic Design**: Translucent appearance with subtle depth
- **Smooth Transitions**: Fluid animation when toggling states
- **Accessible**: Full keyboard and screen reader support
- **Flexible Labels**: Optional label text for clarity
- **Controlled/Uncontrolled**: Works in both modes
- **Focus States**: Clear visual feedback for keyboard navigation

### Usage

\`\`\`tsx
import { GlassSwitch } from '@/components/glass-switch';

function MyComponent() {
  const [isEnabled, setIsEnabled] = useState(false);
  
  return (
    <GlassSwitch
      checked={isEnabled}
      onChange={setIsEnabled}
      label="Enable notifications" />
  );
}
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
      description: "Whether the switch is checked",
    },
    onChange: {
      action: "changed",
      description: "Callback when switch state changes",
    },
    label: {
      control: "text",
      description: "Label text for the switch",
    },
    disabled: {
      control: "boolean",
      description: "Whether the switch is disabled",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
    id: {
      control: "text",
      description: "Custom ID for the input element",
    },
  },
} satisfies Meta<typeof GlassSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Story
export const Default: Story = {
  args: {
    label: "Enable feature",
  },
};

// Controlled Example
export const Controlled: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);

    return (
      <div className="space-y-4">
        <GlassSwitch
          {...args}
          checked={checked}
          onChange={setChecked}
          label="Toggle me"
        />
        <p className="text-liquid-secondary text-sm dark:text-liquid-grey">
          Switch is:{" "}
          <span className="font-semibold">{checked ? "ON" : "OFF"}</span>
        </p>
      </div>
    );
  },
};

// With Label
export const WithLabel: Story = {
  args: {
    label: "Enable notifications",
  },
};

// Without Label
export const WithoutLabel: Story = {
  args: {
    // No label prop
  },
};

// Disabled States
export const DisabledStates: Story = {
  render: () => {
    return (
      <div className="space-y-4">
        <GlassSwitch label="Disabled OFF" disabled checked={false} />
        <GlassSwitch label="Disabled ON" disabled checked />
      </div>
    );
  },
};

// Multiple Switches
export const MultipleSwitches: Story = {
  render: () => {
    const [settings, setSettings] = useState({
      notifications: true,
      darkMode: false,
      autoSave: true,
      analytics: false,
    });

    const updateSetting = (key: string, value: boolean) => {
      setSettings((prev) => ({ ...prev, [key]: value }));
    };

    return (
      <div className="space-y-4">
        <h3 className="mb-4 font-semibold text-liquid-secondary text-lg dark:text-liquid-text-inverse">
          Application Settings
        </h3>

        <GlassSwitch
          checked={settings.notifications}
          onChange={(checked) => updateSetting("notifications", checked)}
          label="Push Notifications"
        />

        <GlassSwitch
          checked={settings.darkMode}
          onChange={(checked) => updateSetting("darkMode", checked)}
          label="Dark Mode"
        />

        <GlassSwitch
          checked={settings.autoSave}
          onChange={(checked) => updateSetting("autoSave", checked)}
          label="Auto-save"
        />

        <GlassSwitch
          checked={settings.analytics}
          onChange={(checked) => updateSetting("analytics", checked)}
          label="Analytics Tracking"
        />
      </div>
    );
  },
};

// Interactive Demo
export const InteractiveDemo: Story = {
  render: () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isNotificationsOn, setIsNotificationsOn] = useState(true);
    const [isWifiOn, setIsWifiOn] = useState(true);

    return (
      <div
        className={`w-96 rounded-lg p-6 transition-colors ${
          isDarkMode ? "bg-liquid-bg text-liquid-text-inverse" : "bg-liquid-bg text-liquid-secondary"
        }`}
      >
        <h3 className="mb-6 font-semibold text-lg">System Settings</h3>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isDarkMode ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
              <span className="font-medium">Theme</span>
            </div>
            <GlassSwitch checked={isDarkMode} onChange={setIsDarkMode} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isNotificationsOn ? (
                <Bell className="h-5 w-5" />
              ) : (
                <BellOff className="h-5 w-5" />
              )}
              <span className="font-medium">Notifications</span>
            </div>
            <GlassSwitch
              checked={isNotificationsOn}
              onChange={setIsNotificationsOn}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isWifiOn ? (
                <Wifi className="h-5 w-5" />
              ) : (
                <WifiOff className="h-5 w-5" />
              )}
              <span className="font-medium">Wi-Fi</span>
            </div>
            <GlassSwitch checked={isWifiOn} onChange={setIsWifiOn} />
          </div>
        </div>

        <div
          className={`mt-6 rounded-lg p-4 ${
            isDarkMode ? "bg-liquid-bg" : "bg-liquid-bg"
          }`}
        >
          <p className="text-sm opacity-75">
            {isDarkMode ? "Dark mode is active" : "Light mode is active"}.
            Notifications are {isNotificationsOn ? "enabled" : "disabled"}.
            Wi-Fi is {isWifiOn ? "connected" : "disconnected"}.
          </p>
        </div>
      </div>
    );
  },
};

// Form Integration
export const FormIntegration: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      emailNotifications: false,
      smsNotifications: false,
      marketingEmails: false,
      dataSharing: false,
      twoFactor: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert(JSON.stringify(formData, null, 2));
    };

    const updateField = (field: string, value: boolean) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
      <form onSubmit={handleSubmit} className="w-96 space-y-6">
        <h3 className="font-semibold text-liquid-secondary text-lg dark:text-liquid-text-inverse">
          Privacy & Security Settings
        </h3>

        <div className="space-y-4">
          <div className="space-y-3">
            <h4 className="font-medium text-liquid-secondary text-sm dark:text-liquid-grey">
              Notifications
            </h4>
            <GlassSwitch
              checked={formData.emailNotifications}
              onChange={(checked) => updateField("emailNotifications", checked)}
              label="Email notifications"
            />
            <GlassSwitch
              checked={formData.smsNotifications}
              onChange={(checked) => updateField("smsNotifications", checked)}
              label="SMS notifications"
            />
            <GlassSwitch
              checked={formData.marketingEmails}
              onChange={(checked) => updateField("marketingEmails", checked)}
              label="Marketing emails"
            />
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-liquid-secondary text-sm dark:text-liquid-grey">
              Privacy
            </h4>
            <GlassSwitch
              checked={formData.dataSharing}
              onChange={(checked) => updateField("dataSharing", checked)}
              label="Share usage data"
            />
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-liquid-secondary text-sm dark:text-liquid-grey">
              Security
            </h4>
            <GlassSwitch
              checked={formData.twoFactor}
              onChange={(checked) => updateField("twoFactor", checked)}
              label="Two-factor authentication"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-liquid-accent px-4 py-2 text-liquid-text-inverse transition-colors hover:bg-liquid-accent"
        >
          Save Settings
        </button>
      </form>
    );
  },
};

// Status Indicators
export const StatusIndicators: Story = {
  render: () => {
    const [status, setStatus] = useState({
      visibility: true,
      sound: true,
      security: false,
    });

    return (
      <div className="space-y-6">
        <h3 className="font-semibold text-liquid-secondary text-lg dark:text-liquid-text-inverse">
          Quick Settings
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg bg-liquid-bg p-4 dark:bg-liquid-bg">
            <div className="flex items-center gap-3">
              {status.visibility ? (
                <Eye className="h-5 w-5 text-liquid-accent" />
              ) : (
                <EyeOff className="h-5 w-5 text-liquid-secondary" />
              )}
              <div>
                <p className="font-medium">Profile Visibility</p>
                <p className="text-liquid-secondary text-sm">
                  {status.visibility
                    ? "Visible to everyone"
                    : "Hidden from search"}
                </p>
              </div>
            </div>
            <GlassSwitch
              checked={status.visibility}
              onChange={(checked) =>
                setStatus({ ...status, visibility: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between rounded-lg bg-liquid-bg p-4 dark:bg-liquid-bg">
            <div className="flex items-center gap-3">
              {status.sound ? (
                <Volume2 className="h-5 w-5 text-liquid-accent" />
              ) : (
                <VolumeX className="h-5 w-5 text-liquid-secondary" />
              )}
              <div>
                <p className="font-medium">Sound Effects</p>
                <p className="text-liquid-secondary text-sm">
                  {status.sound ? "All sounds enabled" : "Muted"}
                </p>
              </div>
            </div>
            <GlassSwitch
              checked={status.sound}
              onChange={(checked) => setStatus({ ...status, sound: checked })}
            />
          </div>

          <div className="flex items-center justify-between rounded-lg bg-liquid-bg p-4 dark:bg-liquid-bg">
            <div className="flex items-center gap-3">
              {status.security ? (
                <Lock className="h-5 w-5 text-liquid-accent" />
              ) : (
                <Unlock className="h-5 w-5 text-liquid-accent" />
              )}
              <div>
                <p className="font-medium">Security Mode</p>
                <p className="text-liquid-secondary text-sm">
                  {status.security
                    ? "Enhanced security active"
                    : "Standard security"}
                </p>
              </div>
            </div>
            <GlassSwitch
              checked={status.security}
              onChange={(checked) =>
                setStatus({ ...status, security: checked })
              }
            />
          </div>
        </div>
      </div>
    );
  },
};

// Accessibility Demo
export const AccessibilityDemo: Story = {
  render: () => {
    const [screenReader, setScreenReader] = useState(false);
    const [highContrast, setHighContrast] = useState(false);
    const [reducedMotion, setReducedMotion] = useState(false);

    return (
      <div className="w-96 space-y-6">
        <div>
          <h3 className="mb-4 font-semibold text-liquid-secondary text-lg dark:text-liquid-text-inverse">
            Accessibility Settings
          </h3>

          <div className="space-y-4">
            <GlassSwitch
              checked={screenReader}
              onChange={setScreenReader}
              label="Screen reader optimizations"
              aria-describedby="screen-reader-desc"
            />
            <p
              id="screen-reader-desc"
              className="ml-9 text-liquid-secondary text-sm dark:text-liquid-grey"
            >
              Optimize interface for screen reader users
            </p>

            <GlassSwitch
              checked={highContrast}
              onChange={setHighContrast}
              label="High contrast mode"
              aria-describedby="high-contrast-desc"
            />
            <p
              id="high-contrast-desc"
              className="ml-9 text-liquid-secondary text-sm dark:text-liquid-grey"
            >
              Increase color contrast for better visibility
            </p>

            <GlassSwitch
              checked={reducedMotion}
              onChange={setReducedMotion}
              label="Reduce motion"
              aria-describedby="reduced-motion-desc"
            />
            <p
              id="reduced-motion-desc"
              className="ml-9 text-liquid-secondary text-sm dark:text-liquid-grey"
            >
              Minimize animations and transitions
            </p>
          </div>

          <div className="mt-6 rounded-lg bg-liquid-bg p-4 dark:bg-liquid-bg">
            <h4 className="mb-2 font-semibold text-liquid-secondary text-sm dark:text-liquid-text-inverse">
              Keyboard Navigation:
            </h4>
            <ul className="space-y-1 text-liquid-secondary text-sm dark:text-liquid-grey">
              <li>
                • <kbd>Tab</kbd> - Focus switch
              </li>
              <li>
                • <kbd>Space</kbd> - Toggle switch
              </li>
              <li>
                • <kbd>Enter</kbd> - Toggle switch
              </li>
              <li>• Screen readers announce state changes</li>
            </ul>
          </div>
        </div>
      </div>
    );
  },
};

// Theme Showcase
export const ThemeShowcase: Story = {
  render: () => {
    const [lightChecked, setLightChecked] = useState(true);
    const [darkChecked, setDarkChecked] = useState(true);

    return (
      <div className="space-y-8">
        <div className="rounded-lg bg-liquid-bg p-6">
          <h3 className="mb-4 font-semibold text-liquid-secondary text-lg">
            Light Theme
          </h3>
          <div className="space-y-3">
            <GlassSwitch
              checked={lightChecked}
              onChange={setLightChecked}
              label="Enable feature"
            />
            <GlassSwitch
              checked={!lightChecked}
              onChange={(checked) => setLightChecked(!checked)}
              label="Inverse state"
            />
          </div>
        </div>

        <div className="rounded-lg bg-liquid-bg p-6">
          <h3 className="mb-4 font-semibold text-lg text-liquid-text-inverse">Dark Theme</h3>
          <div className="space-y-3">
            <GlassSwitch
              checked={darkChecked}
              onChange={setDarkChecked}
              label="Enable feature"
            />
            <GlassSwitch
              checked={!darkChecked}
              onChange={(checked) => setDarkChecked(!checked)}
              label="Inverse state"
            />
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    backgrounds: { default: "light" },
  },
};
