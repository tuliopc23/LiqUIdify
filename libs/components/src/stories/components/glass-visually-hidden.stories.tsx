import type { Meta, StoryObj } from '@storybook/react';
import { Download, Edit, Save, Trash } from 'lucide-react';
import React from 'react';
import { GlassButton } from '@/components/glass-button-refactored/glass-button';
import { GlassCard } from '@/components/glass-card-refactored/glass-card';
import { GlassInput } from '@/components/glass-input/glass-input';
import { GlassVisuallyHidden } from '@/components/glass-visually-hidden/glass-visually-hidden';

const meta = {
  title: 'Components/Glass Visually Hidden',
  component: GlassVisuallyHidden,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A component that visually hides content while keeping it accessible to screen readers. Essential for providing context and additional information to assistive technologies.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      description:
        'Content to be visually hidden but accessible to screen readers',
      control: { type: 'text' },
    },
    as: {
      description: 'The element type to render',
      control: { type: 'text' },
    },
    focusable: {
      description: 'Whether the element can receive focus',
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof GlassVisuallyHidden>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="p-8 max-w-2xl">
      <GlassCard className="p-6">
        <h2 className="text-xl font-bold mb-4">Visually Hidden Content Demo</h2>
        <p className="text-[var(--text-secondary)] mb-6">
          The following examples demonstrate content that is hidden visually but
          available to screen readers.
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-3">
              Icon Buttons with Hidden Labels
            </h3>
            <div className="flex gap-3">
              <GlassButton variant="ghost" size="sm">
                <Download className="w-4 h-4" />
                <GlassVisuallyHidden>Download file</GlassVisuallyHidden>
              </GlassButton>

              <GlassButton variant="ghost" size="sm">
                <Edit className="w-4 h-4" />
                <GlassVisuallyHidden>Edit document</GlassVisuallyHidden>
              </GlassButton>

              <GlassButton variant="ghost" size="sm">
                <Save className="w-4 h-4" />
                <GlassVisuallyHidden>Save changes</GlassVisuallyHidden>
              </GlassButton>

              <GlassButton variant="danger" size="sm">
                <Trash className="w-4 h-4" />
                <GlassVisuallyHidden>Delete item</GlassVisuallyHidden>
              </GlassButton>
            </div>
            <p className="text-sm text-[var(--text-secondary)] mt-2">
              These buttons appear as icon-only but have descriptive text for
              screen readers.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-3">Form with Hidden Labels</h3>
            <form className="space-y-3">
              <div>
                <GlassVisuallyHidden as="label" htmlFor="search">
                  Search for products
                </GlassVisuallyHidden>
                <GlassInput
                  id="search"
                  type="search"
                  placeholder="Search..."
                  aria-describedby="search-help"
                />
                <GlassVisuallyHidden id="search-help">
                  Enter product name, category, or SKU to search
                </GlassVisuallyHidden>
              </div>
            </form>
          </div>

          <div>
            <h3 className="font-medium mb-3">Skip Links</h3>
            <GlassVisuallyHidden focusable>
              <a
                href="#main-content"
                className="focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-500 focus:text-white focus:rounded"
              >
                Skip to main content
              </a>
            </GlassVisuallyHidden>
            <p className="text-sm text-[var(--text-secondary)]">
              Tab to reveal the skip link (only visible when focused).
            </p>
          </div>
        </div>
      </GlassCard>
    </div>
  ),
};

export const FormAccessibility: Story = {
  render: () => {
    const [formData, setFormData] = React.useState({
      username: '',
      email: '',
      password: '',
    });

    return (
      <div className="p-8 max-w-md">
        <GlassCard className="p-6">
          <h2 className="text-xl font-bold mb-4">
            Accessible Form
            <GlassVisuallyHidden>
              {' '}
              - All fields are required
            </GlassVisuallyHidden>
          </h2>

          <form className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium mb-1"
              >
                Username
                <GlassVisuallyHidden>
                  {' '}
                  (3-20 characters, letters and numbers only)
                </GlassVisuallyHidden>
              </label>
              <GlassInput
                id="username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                aria-required="true"
                aria-describedby="username-requirements"
              />
              <GlassVisuallyHidden id="username-requirements">
                Username must be between 3 and 20 characters and contain only
                letters and numbers
              </GlassVisuallyHidden>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
                <GlassVisuallyHidden>
                  {' '}
                  (must be a valid email address)
                </GlassVisuallyHidden>
              </label>
              <GlassInput
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                aria-required="true"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1"
              >
                Password
                <GlassVisuallyHidden>
                  {' '}
                  (minimum 8 characters)
                </GlassVisuallyHidden>
              </label>
              <GlassInput
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                aria-required="true"
                aria-describedby="password-strength"
              />
              <GlassVisuallyHidden id="password-strength" aria-live="polite">
                {formData.password.length < 8
                  ? `Password is ${formData.password.length} characters, needs ${8 - formData.password.length} more`
                  : 'Password meets minimum length requirement'}
              </GlassVisuallyHidden>
            </div>

            <GlassButton type="submit" variant="primary" fullWidth>
              Create Account
              <GlassVisuallyHidden>
                {' '}
                (all fields must be filled correctly)
              </GlassVisuallyHidden>
            </GlassButton>
          </form>
        </GlassCard>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A form with visually hidden helper text and requirements for screen readers',
      },
    },
  },
};

export const DataTable: Story = {
  render: () => {
    const data = [
      { id: 1, name: 'John Doe', role: 'Developer', status: 'Active' },
      { id: 2, name: 'Jane Smith', role: 'Designer', status: 'Away' },
      { id: 3, name: 'Bob Johnson', role: 'Manager', status: 'Active' },
    ];

    return (
      <div className="p-8">
        <GlassCard className="p-6">
          <h2 className="text-xl font-bold mb-4">Team Members</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <caption className="sr-only">
                Team member list showing name, role, and current status
              </caption>
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 px-4">Name</th>
                  <th className="text-left py-2 px-4">Role</th>
                  <th className="text-left py-2 px-4">Status</th>
                  <th className="text-left py-2 px-4">
                    <GlassVisuallyHidden>Actions</GlassVisuallyHidden>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((member) => (
                  <tr key={member.id} className="border-b border-white/5">
                    <td className="py-3 px-4">{member.name}</td>
                    <td className="py-3 px-4">{member.role}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                          member.status === 'Active'
                            ? 'bg-green-500/20 text-green-500'
                            : 'bg-yellow-500/20 text-yellow-500'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-current" />
                        {member.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-blue-500 hover:underline">
                        Edit
                        <GlassVisuallyHidden>
                          {' '}
                          {member.name}
                        </GlassVisuallyHidden>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-sm text-[var(--text-secondary)]">
            <GlassVisuallyHidden>
              Table shows {data.length} team members.
              {data.filter((m) => m.status === 'Active').length} are currently
              active.
            </GlassVisuallyHidden>
            <p>Hover over the table to see hidden accessibility features.</p>
          </div>
        </GlassCard>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'A data table with visually hidden context for screen readers',
      },
    },
  },
};

export const NavigationContext: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = React.useState('home');

    const navItems = [
      { id: 'home', label: 'Home', badge: null },
      { id: 'messages', label: 'Messages', badge: 3 },
      { id: 'notifications', label: 'Notifications', badge: 12 },
      { id: 'settings', label: 'Settings', badge: null },
    ];

    return (
      <div className="p-8 max-w-lg">
        <GlassCard className="p-6">
          <h2 className="text-xl font-bold mb-4">Navigation with Context</h2>

          <nav aria-label="Main navigation">
            <GlassVisuallyHidden as="h3">Main Menu</GlassVisuallyHidden>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setCurrentPage(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                      currentPage === item.id
                        ? 'bg-blue-500/20 text-blue-500'
                        : 'hover:bg-white/5'
                    }`}
                    aria-current={currentPage === item.id ? 'page' : undefined}
                  >
                    <span className="flex items-center justify-between">
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                          {item.badge}
                          <GlassVisuallyHidden>
                            {' '}
                            new {item.label.toLowerCase()}
                          </GlassVisuallyHidden>
                        </span>
                      )}
                    </span>
                    {currentPage === item.id && (
                      <GlassVisuallyHidden> (current page)</GlassVisuallyHidden>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-6 p-4 glass-effect rounded-lg">
            <p className="text-sm text-[var(--text-secondary)]">
              Current page:{' '}
              <strong>
                {navItems.find((i) => i.id === currentPage)?.label}
              </strong>
            </p>
          </div>
        </GlassCard>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Navigation menu with visually hidden context and status information',
      },
    },
  },
};

export const ComplexInteractions: Story = {
  render: () => {
    const [expandedCards, setExpandedCards] = React.useState<Set<number>>(
      new Set()
    );

    const toggleCard = (id: number) => {
      setExpandedCards((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });
    };

    const cards = [
      { id: 1, title: 'Project Alpha', status: 'In Progress', progress: 65 },
      { id: 2, title: 'Project Beta', status: 'Completed', progress: 100 },
      { id: 3, title: 'Project Gamma', status: 'Planning', progress: 15 },
    ];

    return (
      <div className="p-8 max-w-2xl">
        <GlassCard className="p-6">
          <h2 className="text-xl font-bold mb-4">
            Project Dashboard
            <GlassVisuallyHidden>
              {' '}
              - {cards.length} projects total
            </GlassVisuallyHidden>
          </h2>

          <div className="space-y-4">
            {cards.map((card) => (
              <div key={card.id} className="glass-effect rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">
                    {card.title}
                    <GlassVisuallyHidden>
                      , {card.status}, {card.progress}% complete
                    </GlassVisuallyHidden>
                  </h3>
                  <button
                    onClick={() => toggleCard(card.id)}
                    className="text-blue-500 text-sm"
                    aria-expanded={expandedCards.has(card.id)}
                    aria-controls={`details-${card.id}`}
                  >
                    {expandedCards.has(card.id) ? 'Hide' : 'Show'} Details
                    <GlassVisuallyHidden> for {card.title}</GlassVisuallyHidden>
                  </button>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      card.status === 'Completed'
                        ? 'bg-green-500/20 text-green-500'
                        : card.status === 'In Progress'
                          ? 'bg-blue-500/20 text-blue-500'
                          : 'bg-gray-500/20 text-gray-500'
                    }`}
                  >
                    {card.status}
                  </span>

                  <div className="flex-1">
                    <GlassVisuallyHidden>
                      Progress: {card.progress}% complete
                    </GlassVisuallyHidden>
                    <div
                      className="w-full bg-white/10 rounded-full h-2"
                      aria-hidden="true"
                    >
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all"
                        style={{ width: `${card.progress}%` }}
                      />
                    </div>
                  </div>

                  <span aria-hidden="true">{card.progress}%</span>
                </div>

                {expandedCards.has(card.id) && (
                  <div
                    id={`details-${card.id}`}
                    className="mt-4 text-sm text-[var(--text-secondary)]"
                  >
                    <p>Additional project details would appear here...</p>
                    <GlassVisuallyHidden>
                      Project {card.title} details section is now expanded
                    </GlassVisuallyHidden>
                  </div>
                )}
              </div>
            ))}
          </div>

          <GlassVisuallyHidden aria-live="polite" aria-atomic="true">
            {expandedCards.size} of {cards.length} project details are expanded
          </GlassVisuallyHidden>
        </GlassCard>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Complex UI with multiple visually hidden elements providing rich context',
      },
    },
  },
};
