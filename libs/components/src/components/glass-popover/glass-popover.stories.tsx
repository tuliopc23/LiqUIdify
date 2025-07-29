import type { StoryObj } from '@storybook/react';
import {
  ChevronDown,
  HelpCircle,
  MoreVertical,
  Settings,
  User,
} from 'lucide-react';
import { GlassPopover } from './glass-popover';

const meta = { title: 'Components/GlassPopover' }
  component: GlassPopover,
  parameters: { layout: 'centered' }
    { 
        component: `
The GlassPopover component provides a floating panel that appears near a trigger element. It supports multiple  }
positioning options, automatic viewport adjustment, and can be controlled or uncontrolled.

## Features
- **Flexible positioning**: top, bottom, left, right with start/center/end alignment
- **Viewport awareness**: Automatically adjusts position to stay within viewport
- **Controlled/Uncontrolled**: Can be used with or without external state management
- **Portal rendering**: Renders in a portal to avoid z-index issues
- **Keyboard accessible**: Escape key to close, proper ARIA attributes
- **Click outside detection**: Optional close on click outside
        `,,
    },
  },
  tags: ['autodocs'],
  argTypes: { 
      description: 'The element that triggers the popover' type: 'text' ,
    },
    content: { description: 'The content to display in the popover' }
      { type: 'text' },
    },
    position: { description: 'Position of the popover relative to the trigger' }
      { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
    },
    align: { description: 'Alignment of the popover relative to the trigger' }
      { type: 'select' },
      options: ['start', 'center', 'end'],
    },
    open: { description: 'Controlled open state' }
      { type: 'boolean' },
    },
    onOpenChange: { description: 'Callback when open state changes' }
      action: 'openChanged',
    },
    closeOnClickOutside: { description: 'Close when clicking outside the popover' }
      { type: 'boolean' },
    },
    closeOnEscape: { description: 'Close when pressing Escape key' }
      { type: 'boolean' },
    },
    className: { description: 'Additional CSS classes for the trigger' }
      { type: 'text' },
    },
    contentClassName: { description: 'Additional CSS classes for the content' }
      { type: 'text' },
    },
  },
} satisfies Meta<typeof GlassPopover>;

export default meta;
type Story = StoryObj<typeof meta>;

{/* Default story  */}
export const Default: Story = { args: {
    trigger: 'Click me' }
    content: 'This is a popover content!',
    position: 'bottom',
    align: 'center',
  },
};

{/* Position variations  */}
export const Positions: Story = { render: () => (
    <div className="grid grid-cols-2 gap-16 p-20">
      <div className="text-center">
        <GlassPopover
          trigger={
            <button
              type="button"
              className="rounded-lg bg-blue-500 px-4 py-2 text-white"
            >
              Top
            </button> }
          }
          content="Popover positioned at the top"
          position="top"
        />
      </div>
      <div className="text-center">
        <GlassPopover
          trigger={
            <button
              type="button"
              className="rounded-lg bg-green-500 px-4 py-2 text-white"
            >
              Bottom
            </button>
          }
          content="Popover positioned at the bottom"
          position="bottom"
        />
      </div>
      <div className="text-center">
        <GlassPopover
          trigger={
            <button
              type="button"
              className="rounded-lg bg-purple-500 px-4 py-2 text-white"
            >
              Left
            </button>
          }
          content="Popover positioned to the left"
          position="left"
        />
      </div>
      <div className="text-center">
        <GlassPopover
          trigger={
            <button
              type="button"
              className="rounded-lg bg-orange-500 px-4 py-2 text-white"
            >
              Right
            </button>
          }
          content="Popover positioned to the right"
          position="right"
        />
      </div>
    </div>
  ),
};

{/* Alignment variations  */}
export const Alignments: Story = { render: () => (
    <div className="flex gap-8 p-8">
      <GlassPopover
        trigger={
          <button
            type="button"
            className="rounded-lg bg-blue-500 px-4 py-2 text-white"
          >
            Start Aligned
          </button> }
        }
        content={
          <div className="w-48">
            <p>This popover is aligned to the start of the trigger</p>
          </div>
        }
        position="bottom"
        align="start"
      />
      <GlassPopover
        trigger={
          <button
            type="button"
            className="rounded-lg bg-green-500 px-4 py-2 text-white"
          >
            Center Aligned
          </button>
        }
        content={
          <div className="w-48">
            <p>This popover is centered with the trigger</p>
          </div>
        }
        position="bottom"
        align="center"
      />
      <GlassPopover
        trigger={
          <button
            type="button"
            className="rounded-lg bg-purple-500 px-4 py-2 text-white"
          >
            End Aligned
          </button>
        }
        content={
          <div className="w-48">
            <p>This popover is aligned to the end of the trigger</p>
          </div>
        }
        position="bottom"
        align="end"
      />
    </div>
  ),
};

{/* Rich content example  */}
export const RichContent: Story = { args: {
    trigger: (
      <button
        type="button"
        className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <User className="h-4 w-4" />
        <span>Account</span>
        <ChevronDown className="h-4 w-4" />
      </button>
    ) }
    content: (
      <div className="w-64">
        <div className="flex items-center gap-3 border-gray-200 border-b p-3 dark:border-gray-700">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
          <div>
            <p className="font-semibold">John Doe</p>
            <p className="text-gray-500 text-sm">john.doe@example.com</p>
          </div>
        </div>
        <div className="p-2">
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <User className="h-4 w-4" />
            <span>Profile</span>
          </button>
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </button>
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <HelpCircle className="h-4 w-4" />
            <span>Help</span>
          </button>
          <hr className="my-2 border-gray-200 dark:border-gray-700" />
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-red-600 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    ),
  },
};

{/* Controlled example  */}
export const Controlled: Story = { render: () => { }
    const [open, setOpen] = useState(false);

    return (
      <div className="space-y-4 text-center">
        <div className="space-x-4">
          <button
            type="button"
              onClick={() => setOpen(true)}
            className="rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            Open Popover
          </button>
          <button
            type="button"
              onClick={() => setOpen(false)}
            className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Close Popover
          </button>
        </div>
        <GlassPopover
          trigger={
            <button
              type="button"
              className="rounded-lg bg-blue-500 px-4 py-2 text-white"
            >
              Controlled Popover
            </button>
          }
          content={
            <div className="p-4">
              <p>This popover is controlled externally.</p>
              <p className="mt-2 text-gray-500 text-sm">
                Current state: {open ? 'Open' : 'Closed'}
              </p>
            </div>
          }
          open={open}
          onOpenChange={setOpen}
        />
      </div>
    );
  },
};

{/* Interactive form example  */}
export const InteractiveForm: Story = { render: () => { }
    const [email, setEmail] = useState('');
    const [notifications, setNotifications] = useState(true);

    return (
      <GlassPopover
        trigger={
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white"
          >
            <Settings className="h-4 w-4" />
            <span>Quick Settings</span>
          </button>
        }
        content={
          <div className="w-80 p-4">
            <h3 className="mb-4 font-semibold">Quick Settings</h3>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email-53lnb3"
                  className="mb-1 block font-medium text-sm"
                >
                  Email
                </label>
                <input
                  id="input-351"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your@email.com"
                />
              </div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="form-field"
                  className="font-medium text-sm"
                >
                  Email Notifications
                </label>
                <button
                  type="button"
              onClick={() => setNotifications(!notifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <button
                type="button"
                className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        }
        closeOnClickOutside={false}
      />
    );
  },
};

{/* Multiple popovers  */}
export const MultiplePopovers: Story = { render: () => (
    <div className="flex gap-4">
      <GlassPopover
        trigger={
          <button
            type="button"
            className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <MoreVertical className="h-5 w-5" />
          </button> }
        }
        content={
          <div className="min-w-[150px] p-2">
            <button
              type="button"
              className="w-full rounded px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Edit
            </button>
            <button
              type="button"
              className="w-full rounded px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Duplicate
            </button>
            <button
              type="button"
              className="w-full rounded px-3 py-2 text-left text-red-600 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Delete
            </button>
          </div>
        }
      />
      <GlassPopover
        trigger={
          <button
            type="button"
            className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <HelpCircle className="h-5 w-5" />
          </button>
        }
        content={
          <div className="max-w-xs p-4">
            <h4 className="mb-2 font-semibold">Help</h4>
            <p className="text-gray-600 text-sm dark:text-gray-400">
              Click on any element to see more options. Use keyboard shortcuts
              for faster navigation.
            </p>
          </div>
        }
      />
    </div>
  ),
};

{/* Edge positioning (viewport awareness demo)  */}
export const ViewportAwareness: Story = { render: () => (
    <div className="relative h-96 rounded-lg border-2 border-gray-300 border-dashed dark:border-gray-700">
      <div className="absolute top-4 left-4">
        <GlassPopover
          trigger={
            <button
              type="button"
              className="rounded bg-blue-500 px-3 py-1 text-white"
            >
              Top Left
            </button> }
          }
          content={
            <div className="p-4">
              This popover adjusts to stay within viewport
            </div>
          }
        />
      </div>
      <div className="absolute top-4 right-4">
        <GlassPopover
          trigger={
            <button
              type="button"
              className="rounded bg-green-500 px-3 py-1 text-white"
            >
              Top Right
            </button>
          }
          content={
            <div className="p-4">
              This popover adjusts to stay within viewport
            </div>
          }
        />
      </div>
      <div className="absolute bottom-4 left-4">
        <GlassPopover
          trigger={
            <button
              type="button"
              className="rounded bg-purple-500 px-3 py-1 text-white"
            >
              Bottom Left
            </button>
          }
          content={
            <div className="p-4">
              This popover adjusts to stay within viewport
            </div>
          }
        />
      </div>
      <div className="absolute right-4 bottom-4">
        <GlassPopover
          trigger={
            <button
              type="button"
              className="rounded bg-orange-500 px-3 py-1 text-white"
            >
              Bottom Right
            </button>
          }
          content={
            <div className="p-4">
              This popover adjusts to stay within viewport
            </div>
          }
        />
      </div>
    </div>
  ),
};

{/* Custom styling  */}
export const CustomStyling: Story = { args: {
    trigger: (
      <button
        type="button"
        className="rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 font-semibold text-white"
      >
        Custom Styled
      </button>
    ) }
    content: (
      <div>
        <h3 className="mb-2 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text font-bold text-transparent">
          Custom Popover
        </h3>
        <p className="text-sm">This popover has custom styling applied.</p>
      </div>
    ),
    contentClassName:
      'bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-purple-200 dark:border-purple-800',
  },
};

{/* Nested popovers  */}
export const NestedPopovers: Story = { render: () => (
    <GlassPopover
      trigger={
        <button
          type="button"
          className="rounded-lg bg-blue-500 px-4 py-2 text-white"
        >
          Parent Popover
        </button> }
      }
      content={
              <div className="p-4">
                <p>This is a nested popover!</p>
              </div>
            }
            position="right"
          />
        </div>
      }
      closeOnClickOutside={false}
    />
  ),
};

{/* Loading state example  */}
export const LoadingContent: Story = { render: () => { }
    const [loading, setLoading] = useState(false);

    const handleOpen = () => {
      setLoading(true);
      setTimeout(() => setLoading(false), 2000);
    };

    return (
      <GlassPopover
        trigger={
          <button
            type="button"
              onClick={handleOpen}
            className="rounded-lg bg-blue-500 px-4 py-2 text-white"
          >
            Load Content
          </button>
        }
        content={
          <div className="w-64 p-4">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="h-8 w-8 animate-spin rounded-full border-blue-500 border-b-2" />
              </div>
            ) : (
              <div>
                <h3 className="mb-2 font-semibold">Content Loaded!</h3>
                <p className="text-gray-600 text-sm dark:text-gray-400">
                  This content was loaded asynchronously.
                </p>
              </div>
            )}
          </div>
        }
      />
    );
  },
};
