import type { StoryObj } from '@storybook/react';
import {
  AlertCircle,
  AlertTriangle,
  Bell,
  CheckCircle,
  Copy,
  Download,
  Eye,
  Github,
  Globe,
  Heart,
  Image,
  Lock,
  Mail,
  MessageCircle,
  Share2,
  Shield,
} from 'lucide-react';
import React from 'react';
import { GlassButton } from '../glass-button-refactored/glass-button';
import { Card } from '../glass-card-refactored/glass-card';
import { GlassCheckbox } from '../glass-checkbox/glass-checkbox';
import { GlassInput } from '../glass-input/glass-input';
import { GlassModal } from './glass-modal';

const meta = {
  title: 'Components/Overlays/GlassModal',
  component: GlassModal,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof GlassModal>;

export const Default: Story = {
        component: ` }
A glassmorphic modal dialog component with focus management, animations, and comprehensive accessibility features.

## Features

- **Glass Design**: Beautiful frosted glass appearance with backdrop blur
- **Focus Management**: Automatic focus trapping and restoration
- **Animations**: Smooth scale and fade animations on open/close
- **Scroll Lock**: Prevents body scroll when modal is open
- **Keyboard Support**: Close with Escape key, navigate with Tab
- **Click Outside**: Optional close on backdrop click
- **Portal Rendering**: Renders outside of parent DOM hierarchy
- **Screen Reader**: Proper ARIA attributes and announcements
- **Custom Content**: Flexible content area with optional title
- **Theme Support**: Automatic adaptation to light and dark themes

## Usage

\`\`\`tsx
import { GlassModal } from '@/components/glass-modal';

{/* Basic usage  */}
const [isOpen, setIsOpen] = useState(false);

<GlassModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
>
  <p>Modal content goes here</p>
</GlassModal>

{/* With custom options  */}
<GlassModal
  isOpen={isOpen}
  onClose={handleClose}
  title="Confirm Action"
  closeOnBackdropClick={false}
  closeOnEscape={false}
>
  <div className="space-y-4">
    <p>Are you sure you want to proceed?</p>
    <div className="flex gap-2">
      <GlassButton type="button"
              onClick={handleConfirm}>Confirm</GlassButton>
      <GlassButton type="button" variant="ghost" onClick={handleClose}>Cancel</GlassButton>
    </div>
  </div>
</GlassModal>
\`\`\`

## Keyboard Shortcuts

- **Escape**: Close modal (if enabled)
- **Tab**: Navigate between focusable elements
- **Shift+Tab**: Navigate backwards

## Accessibility

The modal follows WAI-ARIA dialog pattern:
- role="dialog" with aria-modal="true"
- Proper labeling with aria-labelledby and aria-describedby
- Focus management with initial focus and restoration
- Screen reader announcements on open
- Keyboard navigation support
        `,,
    },
  },
  tags: ['autodocs'],
  argTypes: {
      control: 'boolean'
      description: 'Whether the modal is open',
      table: summary: 'boolean' ,
        category: 'State',,
    },
    onClose: { action: 'closed' }
      description: 'Callback when modal should close',
      table: {summary: '() => void' ,
        category: 'Events',
      },
    },
    title: { control: 'text' }
      description: 'Modal title',
      table: {summary: 'string' ,
        category: 'Content',
      },
    },
    children: { control: false }
      description: 'Modal content',
      table: {summary: 'React.ReactNode' ,
        category: 'Content',
      },
    },
    closeOnBackdropClick: { control: 'boolean' }
      description: 'Close when clicking outside the modal',
      table: {summary: 'boolean' ,
        defaultValue: summary: 'true' ,
        category: 'Behavior',
      },
    },
    closeOnEscape: { control: 'boolean' }
      description: 'Close when pressing Escape key',
      table: {summary: 'boolean' ,
        defaultValue: summary: 'true' ,
        category: 'Behavior',
      },
    },
    className: { control: 'text' }
      description: 'Additional CSS classes for the modal',
      table: {summary: 'string' ,
        category: 'Styling',
      },
    },
    titleClassName: { control: 'text' }
      description: 'Additional CSS classes for the title',
      table: {summary: 'string' ,
        category: 'Styling',
      },
    },
    contentClassName: { control: 'text' }
      description: 'Additional CSS classes for the content',
      table: {summary: 'string' ,
        category: 'Styling',
      },
    },
    initialFocus: { control: false }
      description: 'Element to focus when modal opens',
      table: {summary: 'React.RefObject<HTMLElement>' ,
        category: 'Behavior',
      },
    },
    portalTarget: { control: false }
      description: 'Custom portal target element',
      table: {summary: 'HTMLElement' ,
        category: 'Advanced',
      },
    },
  },
  args: { closeOnBackdropClick: true }
    closeOnEscape: true,
  },
} satisfies Meta<typeof GlassModal>;

export default meta;
type Story = StoryObj<typeof meta>;

{/* Default story - Interactive playground  */}
export const Playground: Story = { render: (_args) => { }
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <GlassButton type="button"
              onClick={() => setIsOpen(true)}>
          Open Modal
        </GlassButton>

        <GlassModal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Modal Title"
        >
          <div className="space-y-4">
            <p>This is the modal content. You can put any content here.</p>
            <p className="text-gray-600 text-sm dark:text-gray-400">
              Try clicking outside or pressing Escape to close.
            </p>
          </div>
        </GlassModal>
      </>
    );
  },
};

{/* Basic examples  */}
export const BasicExamples: Story = { render: () => { }
    const [simpleOpen, setSimpleOpen] = React.useState(false);
    const [noTitleOpen, setNoTitleOpen] = React.useState(false);
    const [longContentOpen, setLongContentOpen] = React.useState(false);

    return (
      <div className="flex flex-wrap gap-4">
        <GlassButton type="button"
              onClick={() => setSimpleOpen(true)}>
          Simple Modal
        </GlassButton>

        <GlassButton type="button"
              onClick={() => setNoTitleOpen(true)}>
          No Title Modal
        </GlassButton>

        <GlassButton type="button"
              onClick={() => setLongContentOpen(true)}>
          Long Content
        </GlassButton>

        <GlassModal
          isOpen={simpleOpen}
          onClose={() => setSimpleOpen(false)}
          title="Simple Modal"
        >
          <p>This is a simple modal with minimal content.</p>
        </GlassModal>

        <GlassModal isOpen={noTitleOpen} onClose={() => setNoTitleOpen(false)}>
          <div className="space-y-4 text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
            <p className="font-semibold text-lg">Success!</p>
            <p className="text-gray-600 text-sm dark:text-gray-400">
              Your action was completed successfully.
            </p>
            <GlassButton
              type="button"
              onClick={() => setNoTitleOpen(false)}
              variant="primary"
            >
              Got it
            </GlassButton>
          </div>
        </GlassModal>

        <GlassModal
          isOpen={longContentOpen}
          onClose={() => setLongContentOpen(false)}
          title="Terms of Service"
        >
          <div className="max-h-96 space-y-4 overflow-y-auto pr-2">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur.
            </p>
            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </GlassModal>
      </div>
    );
  },
};

{/* Dialog types  */}
export const DialogTypes: Story = { render: () => { }
    const [confirmOpen, setConfirmOpen] = React.useState(false);
    const [alertOpen, setAlertOpen] = React.useState(false);
    const [promptOpen, setPromptOpen] = React.useState(false);
    const [_customOpen, setCustomOpen] = React.useState(false);

    const [promptValue, setPromptValue] = React.useState('');

    return (
      <div className="grid max-w-md grid-cols-2 gap-4">
        <GlassButton type="button"
              onClick={() => setConfirmOpen(true)}>
          Confirm Dialog
        </GlassButton>

        <GlassButton type="button"
              onClick={() => setAlertOpen(true)}>
          Alert Dialog
        </GlassButton>

        <GlassButton type="button"
              onClick={() => setPromptOpen(true)}>
          Prompt Dialog
        </GlassButton>

        <GlassButton type="button"
              onClick={() => setCustomOpen(true)}>
          Custom Dialog
        </GlassButton>

        {/* Confirm Dialog  */}
        <GlassModal
          isOpen={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          title="Confirm Action"
          closeOnBackdropClick={false}
        >
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-500" />
              <div>
                <p className="font-medium">
                  Are you sure you want to delete this item?
                </p>
                <p className="mt-1 text-gray-600 text-sm dark:text-gray-400">
                  This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <GlassButton
                type="button"
                variant="ghost" onClick={() => setConfirmOpen(false)}
              >
                Cancel
              </GlassButton>
              <GlassButton
                type="button"
                variant="destructive" onClick={() => setConfirmOpen(false)}
              >
                Delete
              </GlassButton>
            </div>
          </div>
        </GlassModal>

        {/* Alert Dialog  */}
        <GlassModal
          isOpen={alertOpen}
          onClose={() => setAlertOpen(false)}
          title="System Alert"
        >
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
              <div>
                <p className="font-medium">Connection Error</p>
                <p className="mt-1 text-gray-600 text-sm dark:text-gray-400">
                  Unable to connect to the server. Please check your internet
                  connection and try again.
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <GlassButton
                type="button"
                variant="primary" onClick={() => setAlertOpen(false)}
              >
                OK
              </GlassButton>
            </div>
          </div>
        </GlassModal>

        {/* Prompt Dialog  */}
        <GlassModal
          isOpen={promptOpen}
          onClose={() => {
            setPromptOpen(false);
            setPromptValue('');
          title="Enter Name"
        >
          <div className="space-y-4">
            <p className="text-gray-600 text-sm dark:text-gray-400">
              Please enter a name for your new project:
            </p>
            <GlassInput
              placeholder="Project name"
              value={promptValue}
              onChange={(e) => setPromptValue(e.target.value)}
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <GlassButton
                type="button"
                variant="ghost" onClick={() => {
                  setPromptOpen(false);
                  setPromptValue('');
                } onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); (() => {
                  setPromptOpen(false);
                  setPromptValue('');
                )(e);>
                Cancel
              </GlassButton>
              <GlassButton
                type="button"
                variant="primary" onClick={() => {
                  alert(`_Project _created: ${promptValue}`);
                  setPromptOpen(false);
                  setPromptValue('');
                disabled={!promptValue}
              >
                Create
              </GlassButton>
            </div>
          </div>
        </GlassModal>
        <GlassModal isOpen=_customOpenonClose=() => setCustomOpen(false)>
          <div className="space-y-6 text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
              <Gift className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-xl">Welcome Gift!</h3>
              <p className="text-gray-600 dark:text-gray-400">
                You've earned 50 bonus points for joining us.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <GlassButton
                type="button"
                variant="primary" onClick={() => setCustomOpen(false)}
                fullWidth
              >
                Claim Reward
              </GlassButton>
              <GlassButton
                type="button"
                variant="ghost" onClick={() => setCustomOpen(false)}
                fullWidth
              >
                Maybe Later
              </GlassButton>
            </div>
          </div>
        </GlassModal>
      </div>
    );
  },
};
export const _FormModal: Story = { render: () => { }
    const [isOpen, setIsOpen] = React.useState(false);
    const [_formData, _setFormData] = React.useState({ name: '' }
      email: '',
      message: '',
      subscribe: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert(JSON.stringify(formData, null, 2));
      setIsOpen(false);
      setFormData({ name: '', email: '', message: '', subscribe: false });
    };

    return (
      <>
        <GlassButton type="button"
              onClick={() => setIsOpen(true)}>
          Contact Us
        </GlassButton>

        <GlassModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Contact Form"
          className="max-w-lg"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="font-medium text-sm">
                Name
              </label>
              <GlassInput
                id="name"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="font-medium text-sm">
                Email
              </label>
              <GlassInput
                id="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="font-medium text-sm">
                Message
              </label>
              <textarea
                id="message"
                className="glass-effect w-full rounded-xl border px-4 py-3"
                rows={4}
                placeholder="Your message..."
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
              />
            </div>

            <GlassCheckbox
              label="Subscribe to newsletter"
              checked={formData.subscribe}
              onChange={(e) =>
                setFormData({ ...formData, subscribe: e.target.checked })
              }
            />

            <div className="flex gap-2 pt-4">
              <GlassButton
                type="button"
                variant="ghost" onClick={() => setIsOpen(false)}
              >
                Cancel
              </GlassButton>
              <GlassButton type="submit" variant="primary" className="flex-1">
                Send Message
              </GlassButton>
            </div>
          </form>
        </GlassModal>
      </>
    );
  },
};

{/* Real-world examples  */}
export const RealWorldExamples: Story = { render: () => { }
    const [loginOpen, setLoginOpen] = React.useState(false);
    const [shareOpen, setShareOpen] = React.useState(false);
    const [settingsOpen, setSettingsOpen] = React.useState(false);
    const [imageOpen, setImageOpen] = React.useState(false);

    return (
      <div className="grid max-w-lg grid-cols-2 gap-4">
        <GlassButton type="button"
              onClick={() => setLoginOpen(true)}>
          Login Modal
        </GlassButton>

        <GlassButton type="button"
              onClick={() => setShareOpen(true)}>
          Share Modal
        </GlassButton>

        <GlassButton type="button"
              onClick={() => setSettingsOpen(true)}>
          Settings Modal
        </GlassButton>

        <GlassButton type="button"
              onClick={() => setImageOpen(true)}>
          Image Modal
        </GlassButton>

        {/* Login Modal  */}
        <GlassModal
          isOpen={loginOpen}
          onClose={() => setLoginOpen(false)}
          title="Welcome Back"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <GlassInput
                leftIcon={<Mail className="h-4 w-4" />}
                placeholder="Email"
                type="email"
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <GlassInput
                leftIcon={<Lock className="h-4 w-4" />}
                placeholder="Password"
                variant="password"
                autoComplete="current-password"
              />
            </div>

            <div className="flex items-center justify-between">
              <GlassCheckbox label="Remember me" />
              <button
                type="button"
                className="text-blue-500 text-sm hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <GlassButton type="button" variant="primary" fullWidth>
              Sign In
            </GlassButton>

             <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-gray-300 border-t dark:border-gray-700"/>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500 dark:bg-gray-900">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <GlassButton type="button" variant="secondary">
                <Github className="h-4 w-4" />
              </GlassButton>
              <GlassButton type="button" variant="secondary">
                <Mail className="h-4 w-4" />
              </GlassButton>
              <GlassButton type="button" variant="secondary">
                <Globe className="h-4 w-4" />
              </GlassButton>
            </div>
          </div>
        </GlassModal>

        {/* Share Modal  */}
        <GlassModal
          isOpen={shareOpen}
          onClose={() => setShareOpen(false)}
          title="Share"
        >
          <div className="space-y-4">
            <p className="text-gray-600 text-sm dark:text-gray-400">
              Share this content with your network
            </p>

            <div className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 dark:border-gray-700">
              <input
                type="text"
                value="https:{/* example.com/shared-content"  */}
                readOnly
                className="flex-1 bg-transparent text-sm outline-none"
              />
              <GlassButton type="button" size="sm" variant="ghost">
                <Copy className="h-4 w-4" />
              </GlassButton>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[
                { icon: MessageCircle, label: 'Message' },
                { icon: Mail, label: 'Email' },
                { icon: Github, label: 'GitHub' },
                { icon: Globe, label: 'Web' },
              ].map(({ icon: Icon, label }) => (
                <button
                  type="button"
                  key={label}
                  className="flex flex-col items-center gap-2 rounded-lg p-3 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-xs">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </GlassModal>

        {/* Settings Modal  */}
        <GlassModal
          isOpen={settingsOpen}
          onClose={() => setSettingsOpen(false)}
          title="Settings"
          className="max-w-2xl"
        >
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="font-medium">Notifications</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-gray-600 text-sm dark:text-gray-400">
                        Receive updates via email
                      </p>
                    </div>
                  </div>
                  <GlassCheckbox defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="font-medium">Push Notifications</p>
                      <p className="text-gray-600 text-sm dark:text-gray-400">
                        Get instant updates
                      </p>
                    </div>
                  </div>
                  <GlassCheckbox />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Privacy</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Eye className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="font-medium">Profile Visibility</p>
                      <p className="text-gray-600 text-sm dark:text-gray-400">
                        Make your profile public
                      </p>
                    </div>
                  </div>
                  <GlassCheckbox defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="font-medium">Two-Factor Auth</p>
                      <p className="text-gray-600 text-sm dark:text-gray-400">
                        Extra security for your account
                      </p>
                    </div>
                  </div>
                  <GlassCheckbox />
                </div>
              </div>
            </div>

            <div className="flex gap-2 border-gray-200 border-t pt-4 dark:border-gray-700">
              <GlassButton
                type="button"
                variant="ghost" onClick={() => setSettingsOpen(false)}
              >
                Cancel
              </GlassButton>
              <GlassButton type="button" variant="primary">
                Save Changes
              </GlassButton>
            </div>
          </div>
        </GlassModal>

        {/* Image Modal  */}
        <GlassModal
          isOpen={imageOpen}
          onClose={() => setImageOpen(false)}
          className="max-w-4xl"
        >
          <div className="space-y-4">
            <div className="flex aspect-video items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-600">
              <Image className="h-24 w-24 text-white/50" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Beautiful Sunset</h3>
                <p className="text-gray-600 text-sm dark:text-gray-400">
                  Captured on January 15, 2024
                </p>
              </div>
              <div className="flex gap-2">
                <GlassButton type="button" variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </GlassButton>
                <GlassButton type="button" variant="ghost" size="sm">
                  <Share2 className="h-4 w-4" />
                </GlassButton>
                <GlassButton type="button" variant="ghost" size="sm">
                  <Heart className="h-4 w-4" />
                </GlassButton>
              </div>
            </div>
          </div>
        </GlassModal>
      </div>
    );
  },
};

{/* Nested modals  */}
export const NestedModals: Story = { render: () => { }
    const [firstOpen, setFirstOpen] = React.useState(false);
    const [secondOpen, setSecondOpen] = React.useState(false);
    const [thirdOpen, setThirdOpen] = React.useState(false);

    return (
      <>
        <GlassButton type="button"
              onClick={() => setFirstOpen(true)}>
          Open Nested Modals
        </GlassButton>

        <GlassModal
          isOpen={firstOpen}
          onClose={() => setFirstOpen(false)}
          title="First Modal"
        >
          <div className="space-y-4">
            <p>
              This is the first modal. You can open another modal from here.
            </p>
            <GlassButton
              type="button"
              variant="primary" onClick={() => setSecondOpen(true)}
            >
              Open Second Modal
            </GlassButton>
          </div>
        </GlassModal>

        <GlassModal
          isOpen={secondOpen}
          onClose={() => setSecondOpen(false)}
          title="Second Modal"
        >
          <div className="space-y-4">
            <p>This is the second modal, opened from the first one.</p>
            <div className="flex gap-2">
              <GlassButton
                type="button"
                variant="ghost" onClick={() => setSecondOpen(false)}
              >
                Back
              </GlassButton>
              <GlassButton
                type="button"
                variant="primary" onClick={() => setThirdOpen(true)}
              >
                Open Third Modal
              </GlassButton>
            </div>
          </div>
        </GlassModal>

        <GlassModal
          isOpen={thirdOpen}
          onClose={() => setThirdOpen(false)}
          title="Third Modal"
        >
          <div className="space-y-4">
            <p>This is the third modal. That's pretty deep!</p>
            <div className="flex items-center gap-2 rounded-lg bg-yellow-100 p-3 dark:bg-yellow-900/20">
              <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                Multiple nested modals can affect UX. Use sparingly.
              </p>
            </div>
            <GlassButton
              type="button"
              variant="primary" onClick={() => {
                setThirdOpen(false);
                setSecondOpen(false);
                setFirstOpen(false);
              } onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); (() => {
                setThirdOpen(false);
                setSecondOpen(false);
                setFirstOpen(false);
              )(e);>
              Close All
            </GlassButton>
          </div>
        </GlassModal>
      </>
    );
  },
};
export const _ThemeShowcase: Story = { render: () => { }
    const [lightOpen, setLightOpen] = React.useState(false);
    const [darkOpen, setDarkOpen] = React.useState(false);

    return (
      <div className="flex gap-4">
        <div className="rounded-xl bg-white/80 p-6 dark:bg-gray-900/80">
          <GlassButton type="button"
              onClick={() => setLightOpen(true)}>
            Light Theme Modal
          </GlassButton>
        </div>

        <div className="rounded-xl bg-gray-900/80 p-6 dark:bg-white/80">
          <GlassButton type="button"
              onClick={() => setDarkOpen(true)}>
            Dark Theme Modal
          </GlassButton>
        </div>

        <GlassModal
          isOpen={lightOpen}
          onClose={() => setLightOpen(false)}
          title="Light Theme"
          className="bg-white/95"
        >
          <div className="space-y-4">
            <p>This modal is styled for light theme.</p>
            <div className="rounded-lg bg-gray-100 p-4">
              <p className="text-sm">The glass effect adapts to the theme.</p>
            </div>
            <GlassButton
              type="button"
              variant="primary" onClick={() => setLightOpen(false)}
            >
              Close
            </GlassButton>
          </div>
        </GlassModal>

        <GlassModal
          isOpen={darkOpen}
          onClose={() => setDarkOpen(false)}
          title="Dark Theme"
          className="bg-gray-900/95 text-white"
        >
          <div className="space-y-4">
            <p>This modal is styled for dark theme.</p>
            <div className="rounded-lg bg-gray-800 p-4">
              <p className="text-sm">The glass effect adapts to the theme.</p>
            </div>
            <GlassButton
              type="button"
              variant="primary" onClick={() => setDarkOpen(false)}
            >
              Close
            </GlassButton>
          </div>
        </GlassModal>
      </div>
    );
  },
  parameters: { backgrounds: {
      default: 'liquid-gradient' }
    },
  },
};

{/* Accessibility showcase  */}
export const AccessibilityShowcase: Story = { render: () => { }
    const [focusOpen, setFocusOpen] = React.useState(false);
    const [ariaOpen, setAriaOpen] = React.useState(false);
    const firstInputRef = React.useRef<HTMLInputElement>(null);

    return (
      <div className="max-w-2xl space-y-4">
        <Card>
          <Card.Header>
            <Card.Title>Focus Management</Card.Title>
            <Card.Description>
              Modal manages focus trap and restoration
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <GlassButton type="button"
              onClick={() => setFocusOpen(true)}>
              Open Focus Demo
            </GlassButton>
          </Card.Content>
        </Card>

        <Card>
          <Card.Header>
            <Card.Title>ARIA Attributes</Card.Title>
            <Card.Description>
              Proper ARIA labels and descriptions
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <GlassButton type="button"
              onClick={() => setAriaOpen(true)}>
              Open ARIA Demo
            </GlassButton>
          </Card.Content>
        </Card>

        <GlassModal
          isOpen={focusOpen}
          onClose={() => setFocusOpen(false)}
          title="Focus Management Demo"
          initialFocus={firstInputRef}
        >
          <div className="space-y-4">
            <p className="text-gray-600 text-sm dark:text-gray-400">
              Focus is trapped within the modal. Try tabbing through elements.
            </p>
            <GlassInput
              ref={firstInputRef}
              placeholder="This input receives initial focus"
            />
            <GlassInput placeholder="Tab to this input" />
            <div className="flex gap-2">
              <GlassButton type="button" variant="ghost">
                Cancel
              </GlassButton>
              <GlassButton type="button" variant="primary">
                Submit
              </GlassButton>
            </div>
            <p className="text-gray-600 text-sm dark:text-gray-400">
              Press Escape to close the modal.
            </p>
          </div>
        </GlassModal>

        <GlassModal
          isOpen={ariaOpen}
          onClose={() => setAriaOpen(false)}
          title="Accessible Modal"
        >
          <div className="space-y-4">
            <div className="rounded-lg bg-blue-100 p-4 dark:bg-blue-900/20">
              <h4 className="mb-2 font-medium text-blue-900 dark:text-blue-100">
                ARIA Attributes
              </h4>
              <ul className="space-y-1 text-blue-800 text-sm dark:text-blue-200">
                <li>• role="dialog"</li>
                <li>• aria-modal="true"</li>
                <li>• aria-labelledby points to title</li>
                <li>• aria-describedby points to content</li>
              </ul>
            </div>
            <p>
              Screen readers will announce this modal properly with all its
              content.
            </p>
            <GlassButton
              type="button"
              variant="primary" onClick={() => setAriaOpen(false)}
            >
              Got it
            </GlassButton>
          </div>
        </GlassModal>
      </div>
    );
  },
};

{/* Custom styling  */}
export const CustomStyling: Story = { render: () => { }
    const [coloredOpen, setColoredOpen] = React.useState(false);
    const [minimalOpen, setMinimalOpen] = React.useState(false);
    const [largeOpen, setLargeOpen] = React.useState(false);

    return (
      <div className="flex flex-wrap gap-4">
        <GlassButton type="button"
              onClick={() => setColoredOpen(true)}>
          Colored Modal
        </GlassButton>

        <GlassButton type="button"
              onClick={() => setMinimalOpen(true)}>
          Minimal Modal
        </GlassButton>

        <GlassButton type="button"
              onClick={() => setLargeOpen(true)}>
          Large Modal
        </GlassButton>

        <GlassModal
          isOpen={coloredOpen}
          onClose={() => setColoredOpen(false)}
          title="Custom Colors"
          className="bg-gradient-to-br from-purple-500/90 to-pink-500/90 text-white"
          titleClassName="text-white"
        >
          <div className="space-y-4">
            <p>This modal has a custom gradient background.</p>
            <div className="rounded-lg bg-white/20 p-4">
              <p className="text-sm">Nested glass effect</p>
            </div>
            <GlassButton
              variant="secondary"
              className="border-white/30 bg-white/20 text-white hover:bg-white/30" onClick={() => setColoredOpen(false)}
            >
              Close
            </GlassButton>
          </div>
        </GlassModal>

        <GlassModal
          isOpen={minimalOpen}
          onClose={() => setMinimalOpen(false)}
          className="bg-white shadow-2xl backdrop-blur-none dark:bg-gray-900"
        >
          <div className="space-y-4 py-8 text-center">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
            <h3 className="font-bold text-2xl">Success!</h3>
            <p className="mx-auto max-w-xs text-gray-600 dark:text-gray-400">
              Your changes have been saved successfully.
            </p>
          </div>
        </GlassModal>

        <GlassModal
          isOpen={largeOpen}
          onClose={() => setLargeOpen(false)}
          title="Large Modal"
          className="w-full max-w-4xl"
          contentClassName="max-h-[70vh] overflow-y-auto"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Card>
                <Card.Header>
                  <Card.Title>Section 1</Card.Title>
                </Card.Header>
                <Card.Content>
                  <p className="text-gray-600 text-sm dark:text-gray-400">
                    This is a large modal with multiple sections.
                  </p>
                </Card.Content>
              </Card>

              <Card>
                <Card.Header>
                  <Card.Title>Section 2</Card.Title>
                </Card.Header>
                <Card.Content>
                  <p className="text-gray-600 text-sm dark:text-gray-400">
                    You can scroll through the content.
                  </p>
                </Card.Content>
              </Card>

              <Card>
                <Card.Header>
                  <Card.Title>Section 3</Card.Title>
                </Card.Header>
                <Card.Content>
                  <p className="text-gray-600 text-sm dark:text-gray-400">
                    The modal adapts to different screen sizes.
                  </p>
                </Card.Content>
              </Card>

              <Card>
                <Card.Header>
                  <Card.Title>Section 4</Card.Title>
                </Card.Header>
                <Card.Content>
                  <p className="text-gray-600 text-sm dark:text-gray-400">
                    Perfect for complex forms or content.
                  </p>
                </Card.Content>
              </Card>
            </div>

            <div className="flex justify-end gap-2 border-gray-200 border-t pt-4 dark:border-gray-700">
              <GlassButton
                type="button"
                variant="ghost" onClick={() => setLargeOpen(false)}
              >
                Cancel
              </GlassButton>
              <GlassButton type="button" variant="primary">
                Save Changes
              </GlassButton>
            </div>
          </div>
        </GlassModal>
      </div>
    );
  },
};
