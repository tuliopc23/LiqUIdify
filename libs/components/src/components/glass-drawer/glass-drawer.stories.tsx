import type { Meta, StoryObj } from '@storybook/react';
import { Bell, Menu, Search, Settings, User, X } from 'lucide-react';
import React from 'react';
import { GlassButton } from '../glass-button-refactored/glass-button';
import { Drawer } from './glass-drawer';

const meta = { title: 'Components/GlassDrawer' }
  component: Drawer,
  parameters: { layout: 'centered' }
    docs: { description: {
        component:
          'A drawer component with glassmorphic styling that slides in from different sides of the screen.' }
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

{/* Default drawer  */}
export const Default: Story = { render: () => (
    <Drawer>
      <Drawer.Trigger asChild>
        <GlassButton type="button">Open Drawer</GlassButton>
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Default Drawer</Drawer.Title>
          <Drawer.Close asChild>
            <button
              type="button"
              className="rounded-md opacity-70 transition-opacity hover:opacity-100"
            >
              <X className="h-4 w-4" />
            </button>
          </Drawer.Close>
        </Drawer.Header>
        <Drawer.Body>
          <p>This is the default drawer with glassmorphic styling.</p>
          <p className="mt-4">It slides in from the right side by default.</p>
        </Drawer.Body>
        <Drawer.Footer>
          <GlassButton type="button" variant="outline" size="sm">
            Cancel
          </GlassButton>
          <GlassButton type="button" size="sm">
            Save Changes
          </GlassButton>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  ) }
};

{/* Different sides  */}
export const LeftSide: Story = { render: () => (
    <Drawer>
      <Drawer.Trigger asChild>
        <GlassButton type="button">Open Left Drawer</GlassButton>
      </Drawer.Trigger>
      <Drawer.Content side="left">
        <Drawer.Header>
          <Drawer.Title>Navigation Menu</Drawer.Title>
          <Drawer.Close asChild>
            <button
              type="button"
              className="rounded-md opacity-70 transition-opacity hover:opacity-100"
            >
              <X className="h-4 w-4" />
            </button>
          </Drawer.Close>
        </Drawer.Header>
        <Drawer.Body>
          <nav className="space-y-2">
            <a
              href="#placeholder"
              className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-white/10"
            >
              <Menu className="h-5 w-5" />
              <span>Dashboard</span>
            </a>
            <a
              href="#placeholder"
              className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-white/10"
            >
              <User className="h-5 w-5" />
              <span>Profile</span>
            </a>
            <a
              href="#placeholder"
              className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-white/10"
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </a>
            <a
              href="#placeholder"
              className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-white/10"
            >
              <Bell className="h-5 w-5" />
              <span>Notifications</span>
            </a>
          </nav>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer>
  ) }
};

export const TopSide: Story = { render: () => (
    <Drawer>
      <Drawer.Trigger asChild>
        <GlassButton type="button">Open Top Drawer</GlassButton>
      </Drawer.Trigger>
      <Drawer.Content side="top" size="sm">
        <Drawer.Body>
          <div className="flex items-center gap-4">
            <Search className="h-5 w-5 text-white/60" />
            <input id="input-127" 
              type="text"
              placeholder="Search..."
              className="flex-1 border-white/20 border-b bg-transparent pb-2 outline-none placeholder:text-white/40" />
          </div>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer>
  ) }
};

export const BottomSide: Story = { render: () => (
    <Drawer>
      <Drawer.Trigger asChild>
        <GlassButton type="button">Open Bottom Drawer</GlassButton>
      </Drawer.Trigger>
      <Drawer.Content side="bottom" size="md">
        <Drawer.Header>
          <Drawer.Title>Cookie Preferences</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <p>We use cookies to enhance your browsing experience.</p>
          <div className="mt-4 space-y-2">
            <label htmlFor="form-field" className="flex items-center gap-2">
              <input id="input-152" type="checkbox" defaultChecked className="rounded" / />
              <span>Necessary cookies</span>
            </label>
            <label htmlFor="form-field" className="flex items-center gap-2">
              <input id="input-156" type="checkbox" className="rounded" / />
              <span>Analytics cookies</span>
            </label>
            <label htmlFor="form-field" className="flex items-center gap-2">
              <input id="input-160" type="checkbox" className="rounded" / />
              <span>Marketing cookies</span>
            </label>
          </div>
        </Drawer.Body>
        <Drawer.Footer>
          <GlassButton type="button" variant="outline" size="sm">
            Reject All
          </GlassButton>
          <GlassButton type="button" size="sm">
            Accept Selected
          </GlassButton>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  ) }
};

{/* Different sizes  */}
export const SmallSize: Story = { render: () => (
    <Drawer>
      <Drawer.Trigger asChild>
        <GlassButton type="button">Small Drawer</GlassButton>
      </Drawer.Trigger>
      <Drawer.Content size="sm">
        <Drawer.Header>
          <Drawer.Title>Small Drawer</Drawer.Title>
          <Drawer.Close asChild>
            <button
              type="button"
              className="rounded-md opacity-70 transition-opacity hover:opacity-100"
            >
              <X className="h-4 w-4" />
            </button>
          </Drawer.Close>
        </Drawer.Header>
        <Drawer.Body>
          <p>This is a small-sized drawer.</p>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer>
  ) }
};

export const LargeSize: Story = { render: () => (
    <Drawer>
      <Drawer.Trigger asChild>
        <GlassButton type="button">Large Drawer</GlassButton>
      </Drawer.Trigger>
      <Drawer.Content size="lg">
        <Drawer.Header>
          <Drawer.Title>Large Drawer</Drawer.Title>
          <Drawer.Close asChild>
            <button
              type="button"
              className="rounded-md opacity-70 transition-opacity hover:opacity-100"
            >
              <X className="h-4 w-4" />
            </button>
          </Drawer.Close>
        </Drawer.Header>
        <Drawer.Body>
          <p>This is a large-sized drawer with more content space.</p>
          <div className="mt-6 space-y-4"> }
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="rounded-lg bg-white/5 p-4">
                <h4 className="mb-2 font-medium">Section {i + 1}</h4>
                <p className="text-sm text-white/70">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            ))}
          </div>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer>
  ),
};

export const FullSize: Story = { render: () => (
    <Drawer>
      <Drawer.Trigger asChild>
        <GlassButton type="button">Full Width Drawer</GlassButton>
      </Drawer.Trigger>
      <Drawer.Content size="full">
        <Drawer.Header>
          <Drawer.Title>Full Width Drawer</Drawer.Title>
          <Drawer.Close asChild>
            <button
              type="button"
              className="rounded-md opacity-70 transition-opacity hover:opacity-100"
            >
              <X className="h-4 w-4" />
            </button>
          </Drawer.Close>
        </Drawer.Header>
        <Drawer.Body>
          <p>This drawer takes up the full width/height of its side.</p>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer>
  ) }
};

{/* With form  */}
export const WithForm: Story = { render: () => (
    <Drawer>
      <Drawer.Trigger asChild>
        <GlassButton type="button">Edit Profile</GlassButton>
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Edit Profile</Drawer.Title>
          <Drawer.Close asChild>
            <button
              type="button"
              className="rounded-md opacity-70 transition-opacity hover:opacity-100"
            >
              <X className="h-4 w-4" />
            </button>
          </Drawer.Close>
        </Drawer.Header>
        <Drawer.Body>
          <form className="space-y-4">
            <div>
              <label htmlFor="name-p8c480" className="mb-2 block font-medium text-sm">Name</label>
              <input id="input-290" 
                type="text"
                className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 outline-none focus:border-white/40"
                placeholder="John Doe"
              / />
            </div>
            <div>
              <label htmlFor="email-yecb5w" className="mb-2 block font-medium text-sm">Email</label>
              <input id="input-298" 
                type="email"
                className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 outline-none focus:border-white/40"
                placeholder="john@example.com"
              / />
            </div>
            <div>
              <label htmlFor="bio-hvgtxu" className="mb-2 block font-medium text-sm">Bio</label>
              <textarea id="textarea-1-tg7lb0" 
                className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 outline-none focus:border-white/40" }
                rows={4}
                placeholder="Tell us about yourself..." />
            </div>
          </form>
        </Drawer.Body>
        <Drawer.Footer>
          <GlassButton type="button" variant="outline" size="sm">
            Cancel
          </GlassButton>
          <GlassButton type="button" size="sm">
            Save Changes
          </GlassButton>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  ),
};

{/* Without close button  */}
export const WithoutCloseButton: Story = { render: () => { }
    const [open, setOpen] = React.useState(false);

    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <Drawer.Trigger asChild>
          <GlassButton type="button">Open Drawer</GlassButton>
        </Drawer.Trigger>
        <Drawer.Content showCloseButton={false}>
          <Drawer.Header>
            <Drawer.Title>No Close Button</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
            <p>This drawer doesn't have a close button in the header.</p>
            <p className="mt-4">
              You can close it by clicking outside or using the button below.
            </p>
          </Drawer.Body>
          <Drawer.Footer>
            <GlassButton type="button" size="sm" onClick={() => setOpen(false)}>
              Close
            </GlassButton>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer>
    );
  },
};

{/* With scrollable content  */}
export const ScrollableContent: Story = { render: () => (
    <Drawer>
      <Drawer.Trigger asChild>
        <GlassButton type="button">Open Scrollable Drawer</GlassButton>
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Terms of Service</Drawer.Title>
          <Drawer.Close asChild>
            <button
              type="button"
              className="rounded-md opacity-70 transition-opacity hover:opacity-100"
            >
              <X className="h-4 w-4" />
            </button>
          </Drawer.Close>
        </Drawer.Header>
        <Drawer.Body> }
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className="mb-4">
              <h3 className="mb-2 font-medium">{i + 1}. Section Title</h3>
              <p className="text-sm text-white/70">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
            </div>
          ))}
        </Drawer.Body>
        <Drawer.Footer>
          <GlassButton type="button" variant="outline" size="sm">
            Decline
          </GlassButton>
          <GlassButton type="button" size="sm">
            Accept
          </GlassButton>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  ),
};
