import type { Meta, StoryObj } from '@storybook/react';
import { AlertCircle, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import React from 'react';
import { GlassButton } from '@/components/glass-button-refactored/glass-button';
import { GlassCard } from '@/components/glass-card-refactored/glass-card';
import { GlassInput } from '@/components/glass-input/glass-input';
import {
  announcer,
  GlassLiveRegion,
} from '@/components/glass-live-region/glass-live-region';

const meta = {
  title: 'Components/Glass Live Region',
  component: GlassLiveRegion,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A live region component for screen reader announcements. Provides real-time updates to assistive technologies without disrupting user focus.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    politeness: {
      description: 'The politeness level of announcements',
      control: { type: 'select' },
      options: ['polite', 'assertive', 'off'],
    },
    atomic: {
      description: 'Whether to announce the entire region or just changes',
      control: { type: 'boolean' },
    },
    relevant: {
      description: 'Which changes to announce',
      control: { type: 'select' },
      options: ['additions', 'removals', 'text', 'all'],
    },
    className: {
      description: 'Additional CSS classes',
      control: { type: 'text' },
    },
  },
} satisfies Meta<typeof GlassLiveRegion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [message, setMessage] = React.useState('');
    const [inputValue, setInputValue] = React.useState('');

    const announce = (
      text: string,
      priority: 'low' | 'medium' | 'high' = 'medium'
    ) => {
      announcer.announce(text, { priority });
      setMessage(text);
    };

    return (
      <div className="space-y-6 p-8 max-w-2xl">
        <GlassCard className="p-6">
          <h2 className="text-xl font-bold mb-4">Live Region Demo</h2>
          <p className="text-[var(--text-secondary)] mb-6">
            Click the buttons below to trigger screen reader announcements. The
            messages will be announced without moving focus.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <GlassButton
              variant="primary"
              onClick={() =>
                announce('Success! Your changes have been saved.', 'high')
              }
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Success Message
            </GlassButton>

            <GlassButton
              variant="danger"
              onClick={() => announce('Error! Unable to save changes.', 'high')}
            >
              <AlertCircle className="w-4 h-4 mr-2" />
              Error Message
            </GlassButton>

            <GlassButton
              variant="ghost"
              onClick={() =>
                announce('Warning: This action cannot be undone.', 'medium')
              }
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Warning Message
            </GlassButton>

            <GlassButton
              variant="ghost"
              onClick={() =>
                announce('Info: New features are available.', 'low')
              }
            >
              <Info className="w-4 h-4 mr-2" />
              Info Message
            </GlassButton>
          </div>

          <div className="glass-effect rounded-lg p-4">
            <h3 className="font-medium mb-2">Last Announcement:</h3>
            <p className="text-[var(--text-secondary)]">
              {message || 'No announcements yet'}
            </p>
          </div>
        </GlassCard>

        <GlassLiveRegion politeness="polite" />
      </div>
    );
  },
};

export const FormValidation: Story = {
  render: () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errors, setErrors] = React.useState<Record<string, string>>({});

    const validateEmail = (value: string) => {
      if (!value) {
        setErrors((prev) => ({ ...prev, email: 'Email is required' }));
        announcer.announce('Error: Email is required', { priority: 'high' });
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        setErrors((prev) => ({ ...prev, email: 'Invalid email format' }));
        announcer.announce('Error: Invalid email format', { priority: 'high' });
      } else {
        setErrors((prev) => ({ ...prev, email: '' }));
        announcer.announce('Email field is valid', { priority: 'low' });
      }
    };

    const validatePassword = (value: string) => {
      if (!value) {
        setErrors((prev) => ({ ...prev, password: 'Password is required' }));
        announcer.announce('Error: Password is required', { priority: 'high' });
      } else if (value.length < 8) {
        setErrors((prev) => ({
          ...prev,
          password: 'Password must be at least 8 characters',
        }));
        announcer.announce('Error: Password must be at least 8 characters', {
          priority: 'high',
        });
      } else {
        setErrors((prev) => ({ ...prev, password: '' }));
        announcer.announce('Password field is valid', { priority: 'low' });
      }
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!errors.email && !errors.password && email && password) {
        announcer.announce('Form submitted successfully!', {
          priority: 'high',
        });
      } else {
        announcer.announce('Please fix the errors before submitting', {
          priority: 'high',
        });
      }
    };

    return (
      <div className="p-8 max-w-md">
        <GlassCard className="p-6">
          <h2 className="text-xl font-bold mb-4">Form with Live Validation</h2>
          <p className="text-sm text-[var(--text-secondary)] mb-6">
            Form validation errors are announced to screen readers in real-time.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <GlassInput
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => validateEmail(email)}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id="email-error" className="text-sm text-red-500 mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1"
              >
                Password
              </label>
              <GlassInput
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => validatePassword(password)}
                aria-invalid={!!errors.password}
                aria-describedby={
                  errors.password ? 'password-error' : undefined
                }
              />
              {errors.password && (
                <p id="password-error" className="text-sm text-red-500 mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            <GlassButton type="submit" variant="primary" fullWidth>
              Submit
            </GlassButton>
          </form>
        </GlassCard>

        <GlassLiveRegion politeness="assertive" />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Live region announcing form validation errors in real-time',
      },
    },
  },
};

export const ProgressUpdates: Story = {
  render: () => {
    const [progress, setProgress] = React.useState(0);
    const [isRunning, setIsRunning] = React.useState(false);

    React.useEffect(() => {
      if (isRunning && progress < 100) {
        const timer = setTimeout(() => {
          const newProgress = Math.min(progress + 10, 100);
          setProgress(newProgress);

          // Announce progress at key milestones
          if (newProgress === 25 || newProgress === 50 || newProgress === 75) {
            announcer.announce(`Progress: ${newProgress}% complete`, {
              priority: 'low',
            });
          } else if (newProgress === 100) {
            announcer.announce('Task completed successfully!', {
              priority: 'high',
            });
            setIsRunning(false);
          }
        }, 500);

        return () => clearTimeout(timer);
      }
    }, [isRunning, progress]);

    const startTask = () => {
      setProgress(0);
      setIsRunning(true);
      announcer.announce('Task started', { priority: 'medium' });
    };

    return (
      <div className="p-8 max-w-md">
        <GlassCard className="p-6">
          <h2 className="text-xl font-bold mb-4">Progress Updates</h2>
          <p className="text-sm text-[var(--text-secondary)] mb-6">
            Progress updates are announced at 25%, 50%, 75%, and completion.
          </p>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                  role="progressbar"
                  aria-valuenow={progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
            </div>

            <GlassButton
              onClick={startTask}
              disabled={isRunning}
              variant="primary"
              fullWidth
            >
              {isRunning ? 'Running...' : 'Start Task'}
            </GlassButton>
          </div>
        </GlassCard>

        <GlassLiveRegion politeness="polite" />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Announcing progress updates for long-running tasks',
      },
    },
  },
};

export const NotificationCenter: Story = {
  render: () => {
    const [notifications, setNotifications] = React.useState<
      Array<{
        id: number;
        type: 'success' | 'error' | 'warning' | 'info';
        message: string;
      }>
    >([]);

    const addNotification = (
      type: 'success' | 'error' | 'warning' | 'info',
      message: string
    ) => {
      const id = Date.now();
      const notification = { id, type, message };

      setNotifications((prev) => [...prev, notification]);
      announcer.announce(message, {
        priority:
          type === 'error' ? 'high' : type === 'warning' ? 'medium' : 'low',
        context: type,
      });

      // Auto-remove after 5 seconds
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      }, 5000);
    };

    const iconMap = {
      success: <CheckCircle className="w-5 h-5 text-green-500" />,
      error: <AlertCircle className="w-5 h-5 text-red-500" />,
      warning: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
      info: <Info className="w-5 h-5 text-blue-500" />,
    };

    return (
      <div className="p-8 max-w-lg">
        <GlassCard className="p-6">
          <h2 className="text-xl font-bold mb-4">Notification Center</h2>
          <p className="text-sm text-[var(--text-secondary)] mb-6">
            All notifications are announced to screen readers with appropriate
            priority.
          </p>

          <div className="grid grid-cols-2 gap-2 mb-6">
            <GlassButton
              size="sm"
              onClick={() =>
                addNotification('success', 'File uploaded successfully')
              }
            >
              Success
            </GlassButton>
            <GlassButton
              size="sm"
              onClick={() => addNotification('error', 'Failed to save changes')}
            >
              Error
            </GlassButton>
            <GlassButton
              size="sm"
              onClick={() => addNotification('warning', 'Low disk space')}
            >
              Warning
            </GlassButton>
            <GlassButton
              size="sm"
              onClick={() => addNotification('info', 'New update available')}
            >
              Info
            </GlassButton>
          </div>

          <div className="space-y-2">
            {notifications.length === 0 ? (
              <p className="text-center text-[var(--text-secondary)] py-4">
                No notifications
              </p>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="glass-effect rounded-lg p-3 flex items-center gap-3 animate-in slide-in-from-right"
                >
                  {iconMap[notification.type]}
                  <span className="text-sm flex-1">{notification.message}</span>
                </div>
              ))
            )}
          </div>
        </GlassCard>

        <GlassLiveRegion politeness="polite" />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A notification system with automatic screen reader announcements',
      },
    },
  },
};

export const MultipleRegions: Story = {
  render: () => {
    const [criticalMessage, setCriticalMessage] = React.useState('');
    const [statusMessage, setStatusMessage] = React.useState('');

    return (
      <div className="p-8 max-w-2xl space-y-6">
        <GlassCard className="p-6">
          <h2 className="text-xl font-bold mb-4">Multiple Live Regions</h2>
          <p className="text-sm text-[var(--text-secondary)] mb-6">
            Different types of messages use different live regions with
            appropriate politeness levels.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-3">
                Critical Messages (Assertive)
              </h3>
              <div className="space-y-2">
                <GlassButton
                  variant="danger"
                  size="sm"
                  fullWidth
                  onClick={() => {
                    const msg = 'Critical: System error detected!';
                    setCriticalMessage(msg);
                    announcer.announce(msg, { priority: 'high' });
                  }}
                >
                  System Error
                </GlassButton>
                <GlassButton
                  variant="danger"
                  size="sm"
                  fullWidth
                  onClick={() => {
                    const msg = 'Critical: Connection lost!';
                    setCriticalMessage(msg);
                    announcer.announce(msg, { priority: 'high' });
                  }}
                >
                  Connection Lost
                </GlassButton>
              </div>
              <div className="mt-3 p-3 glass-effect rounded min-h-[60px]">
                <p className="text-sm text-red-500">
                  {criticalMessage || 'No critical messages'}
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Status Updates (Polite)</h3>
              <div className="space-y-2">
                <GlassButton
                  variant="ghost"
                  size="sm"
                  fullWidth
                  onClick={() => {
                    const msg = 'Status: File saved';
                    setStatusMessage(msg);
                    announcer.announce(msg, { priority: 'low' });
                  }}
                >
                  File Saved
                </GlassButton>
                <GlassButton
                  variant="ghost"
                  size="sm"
                  fullWidth
                  onClick={() => {
                    const msg = 'Status: Settings updated';
                    setStatusMessage(msg);
                    announcer.announce(msg, { priority: 'low' });
                  }}
                >
                  Settings Updated
                </GlassButton>
              </div>
              <div className="mt-3 p-3 glass-effect rounded min-h-[60px]">
                <p className="text-sm text-blue-500">
                  {statusMessage || 'No status updates'}
                </p>
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassLiveRegion politeness="assertive" />
        <GlassLiveRegion politeness="polite" />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Using multiple live regions for different types of announcements',
      },
    },
  },
};
