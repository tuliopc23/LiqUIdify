import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { GlassSwitch } from "./glass-switch";
import { 
  Sun, 
  Moon, 
  Bell, 
  BellOff, 
  Wifi, 
  WifiOff,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Volume2,
  VolumeX
} from "lucide-react";

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
      label="Enable notifications"
    />
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
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Switch is: <span className="font-semibold">{checked ? "ON" : "OFF"}</span>
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
        <GlassSwitch label="Disabled ON" disabled checked={true} />
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
      setSettings(prev => ({ ...prev, [key]: value }));
    };
    
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Application Settings
        </h3>
        
        <GlassSwitch
          checked={settings.notifications}
          onChange={(checked) => updateSetting('notifications', checked)}
          label="Push Notifications"
        />
        
        <GlassSwitch
          checked={settings.darkMode}
          onChange={(checked) => updateSetting('darkMode', checked)}
          label="Dark Mode"
        />
        
        <GlassSwitch
          checked={settings.autoSave}
          onChange={(checked) => updateSetting('autoSave', checked)}
          label="Auto-save"
        />
        
        <GlassSwitch
          checked={settings.analytics}
          onChange={(checked) => updateSetting('analytics', checked)}
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
      <div className={`w-96 p-6 rounded-lg transition-colors ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}>
        <h3 className="text-lg font-semibold mb-6">
          System Settings
        </h3>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              <span className="font-medium">Theme</span>
            </div>
            <GlassSwitch
              checked={isDarkMode}
              onChange={setIsDarkMode}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isNotificationsOn ? <Bell className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
              <span className="font-medium">Notifications</span>
            </div>
            <GlassSwitch
              checked={isNotificationsOn}
              onChange={setIsNotificationsOn}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isWifiOn ? <Wifi className="w-5 h-5" /> : <WifiOff className="w-5 h-5" />}
              <span className="font-medium">Wi-Fi</span>
            </div>
            <GlassSwitch
              checked={isWifiOn}
              onChange={setIsWifiOn}
            />
          </div>
        </div>
        
        <div className={`mt-6 p-4 rounded-lg ${
          isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
        }`}>
          <p className="text-sm opacity-75">
            {isDarkMode ? 'Dark mode is active' : 'Light mode is active'}. 
            Notifications are {isNotificationsOn ? 'enabled' : 'disabled'}.
            Wi-Fi is {isWifiOn ? 'connected' : 'disconnected'}.
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
      setFormData(prev => ({ ...prev, [field]: value }));
    };
    
    return (
      <form onSubmit={handleSubmit} className="w-96 space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Privacy & Security Settings
        </h3>
        
        <div className="space-y-4">
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Notifications
            </h4>
            <GlassSwitch
              checked={formData.emailNotifications}
              onChange={(checked) => updateField('emailNotifications', checked)}
              label="Email notifications"
            />
            <GlassSwitch
              checked={formData.smsNotifications}
              onChange={(checked) => updateField('smsNotifications', checked)}
              label="SMS notifications"
            />
            <GlassSwitch
              checked={formData.marketingEmails}
              onChange={(checked) => updateField('marketingEmails', checked)}
              label="Marketing emails"
            />
          </div>
          
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Privacy
            </h4>
            <GlassSwitch
              checked={formData.dataSharing}
              onChange={(checked) => updateField('dataSharing', checked)}
              label="Share usage data"
            />
          </div>
          
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Security
            </h4>
            <GlassSwitch
              checked={formData.twoFactor}
              onChange={(checked) => updateField('twoFactor', checked)}
              label="Two-factor authentication"
            />
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
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
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Quick Settings
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center gap-3">
              {status.visibility ? (
                <Eye className="w-5 h-5 text-green-600" />
              ) : (
                <EyeOff className="w-5 h-5 text-gray-400" />
              )}
              <div>
                <p className="font-medium">Profile Visibility</p>
                <p className="text-sm text-gray-500">
                  {status.visibility ? 'Visible to everyone' : 'Hidden from search'}
                </p>
              </div>
            </div>
            <GlassSwitch
              checked={status.visibility}
              onChange={(checked) => setStatus({ ...status, visibility: checked })}
            />
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center gap-3">
              {status.sound ? (
                <Volume2 className="w-5 h-5 text-green-600" />
              ) : (
                <VolumeX className="w-5 h-5 text-gray-400" />
              )}
              <div>
                <p className="font-medium">Sound Effects</p>
                <p className="text-sm text-gray-500">
                  {status.sound ? 'All sounds enabled' : 'Muted'}
                </p>
              </div>
            </div>
            <GlassSwitch
              checked={status.sound}
              onChange={(checked) => setStatus({ ...status, sound: checked })}
            />
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center gap-3">
              {status.security ? (
                <Lock className="w-5 h-5 text-green-600" />
              ) : (
                <Unlock className="w-5 h-5 text-orange-500" />
              )}
              <div>
                <p className="font-medium">Security Mode</p>
                <p className="text-sm text-gray-500">
                  {status.security ? 'Enhanced security active' : 'Standard security'}
                </p>
              </div>
            </div>
            <GlassSwitch
              checked={status.security}
              onChange={(checked) => setStatus({ ...status, security: checked })}
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
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Accessibility Settings
          </h3>
          
          <div className="space-y-4">
            <GlassSwitch
              checked={screenReader}
              onChange={setScreenReader}
              label="Screen reader optimizations"
              aria-describedby="screen-reader-desc"
            />
            <p id="screen-reader-desc" className="text-sm text-gray-600 dark:text-gray-400 ml-9">
              Optimize interface for screen reader users
            </p>
            
            <GlassSwitch
              checked={highContrast}
              onChange={setHighContrast}
              label="High contrast mode"
              aria-describedby="high-contrast-desc"
            />
            <p id="high-contrast-desc" className="text-sm text-gray-600 dark:text-gray-400 ml-9">
              Increase color contrast for better visibility
            </p>
            
            <GlassSwitch
              checked={reducedMotion}
              onChange={setReducedMotion}
              label="Reduce motion"
              aria-describedby="reduced-motion-desc"
            />
            <p id="reduced-motion-desc" className="text-sm text-gray-600 dark:text-gray-400 ml-9">
              Minimize animations and transitions
            </p>
          </div>
          
          <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <h4 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">
              Keyboard Navigation:
            </h4>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <li>• <kbd>Tab</kbd> - Focus switch</li>
              <li>• <kbd>Space</kbd> - Toggle switch</li>
              <li>• <kbd>Enter</kbd> - Toggle switch</li>
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
        <div className="p-6 bg-white rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">
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
        
        <div className="p-6 bg-gray-900 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-white">
            Dark Theme
          </h3>
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