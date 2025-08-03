import type { Meta, StoryObj } from "@storybook/react-vite";
import { Download, Edit, Save, Trash } from "lucide-react";
import React from "react";
import { GlassButton } from "@/components/glass-button-refactored/glass-button";
import { GlassCard } from "@/components/glass-card-refactored/glass-card";
import { GlassInput } from "@/components/glass-input/glass-input";
import { GlassVisuallyHidden } from "@/components/glass-visually-hidden/glass-visually-hidden";

const meta = {
  title: "Components/Glass Visually Hidden",
  component: GlassVisuallyHidden,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A component that visually hides content while keeping it accessible to screen readers. Essential for providing context and additional information to assistive technologies.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      description:
        "Content to be visually hidden but accessible to screen readers",
      control: { type: "text" },
    },
    as: {
      description: "The element type to render",
      control: { type: "text" },
    },
    focusable: {
      description: "Whether the element can receive focus",
      control: { type: "boolean" },
    },
  },
} satisfies Meta<typeof GlassVisuallyHidden>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="max-w-2xl p-8">
      <GlassCard className="p-6">
        <h2 className="mb-4 font-bold text-xl">Visually Hidden Content Demo</h2>
        <p className="mb-6 text-[var(--text-secondary)]">
          The following examples demonstrate content that is hidden visually but
          available to screen readers.
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="mb-3 font-medium">
              Icon Buttons with Hidden Labels
            </h3>
            <div className="flex gap-3">
              <GlassButton type="button" variant="ghost" size="sm">
                <Download className="h-4 w-4" />
                <GlassVisuallyHidden>Download file</GlassVisuallyHidden>
              </GlassButton>

              <GlassButton type="button" variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
                <GlassVisuallyHidden>Edit document</GlassVisuallyHidden>
              </GlassButton>

              <GlassButton type="button" variant="ghost" size="sm">
                <Save className="h-4 w-4" />
                <GlassVisuallyHidden>Save changes</GlassVisuallyHidden>
              </GlassButton>

              <GlassButton type="button" variant="danger" size="sm">
                <Trash className="h-4 w-4" />
                <GlassVisuallyHidden>Delete item</GlassVisuallyHidden>
              </GlassButton>
            </div>
            <p className="mt-2 text-[var(--text-secondary)] text-sm">
              These buttons appear as icon-only but have descriptive text for
              screen readers.
            </p>
          </div>

          <div>
            <h3 className="mb-3 font-medium">Form with Hidden Labels</h3>
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
            <h3 className="mb-3 font-medium">Skip Links</h3>
            <GlassVisuallyHidden focusable>
              <a
                href="#main-content"
                className="focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-blue-500 focus:px-4 focus:py-2 focus:text-white"
              >
                Skip to main content
              </a>
            </GlassVisuallyHidden>
            <p className="text-[var(--text-secondary)] text-sm">
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
      username: "",
      email: "",
      password: "",
    });

    return (
      <div className="max-w-md p-8">
        <GlassCard className="p-6">
          <h2 className="mb-4 font-bold text-xl">
            Accessible Form
            <GlassVisuallyHidden>
              {" "}
              - All fields are required
            </GlassVisuallyHidden>
          </h2>

          <form className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="mb-1 block font-medium text-sm"
              >
                Username
                <GlassVisuallyHidden>
                  {" "}
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
              <label htmlFor="email" className="mb-1 block font-medium text-sm">
                Email
                <GlassVisuallyHidden>
                  {" "}
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
                className="mb-1 block font-medium text-sm"
              >
                Password
                <GlassVisuallyHidden>
                  {" "}
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
                  : "Password meets minimum length requirement"}
              </GlassVisuallyHidden>
            </div>

            <GlassButton type="submit" variant="primary" fullWidth>
              Create Account
              <GlassVisuallyHidden>
                {" "}
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
          "A form with visually hidden helper text and requirements for screen readers",
      },
    },
  },
};

export const DataTable: Story = {
  render: () => {
    const data = [
      { id: 1, name: "John Doe", role: "Developer", status: "Active" },
      { id: 2, name: "Jane Smith", role: "Designer", status: "Away" },
      { id: 3, name: "Bob Johnson", role: "Manager", status: "Active" },
    ];

    return (
      <div className="p-8">
        <GlassCard className="p-6">
          <h2 className="mb-4 font-bold text-xl">Team Members</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <caption className="sr-only">
                Team member list showing name, role, and current status
              </caption>
              <thead>
                <tr className="border-white/10 border-b">
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Role</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">
                    <GlassVisuallyHidden>Actions</GlassVisuallyHidden>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((member) => (
                  <tr key={member.id} className="border-white/5 border-b">
                    <td className="px-4 py-3">{member.name}</td>
                    <td className="px-4 py-3">{member.role}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs ${
                          member.status === "Active"
                            ? "bg-green-500/20 text-green-500"
                            : "bg-yellow-500/20 text-yellow-500"
                        }`}
                      >
                        <span className="h-2 w-2 rounded-full bg-current" />
                        {member.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        className="text-blue-500 hover:underline"
                      >
                        Edit
                        <GlassVisuallyHidden>
                          {" "}
                          {member.name}
                        </GlassVisuallyHidden>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-[var(--text-secondary)] text-sm">
            <GlassVisuallyHidden>
              Table shows {data.length} team members.
              {data.filter((m) => m.status === "Active").length} are currently
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
        story: "A data table with visually hidden context for screen readers",
      },
    },
  },
};

export const NavigationContext: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = React.useState("home");

    const navItems = [
      { id: "home", label: "Home", badge: null },
      { id: "messages", label: "Messages", badge: 3 },
      { id: "notifications", label: "Notifications", badge: 12 },
      { id: "settings", label: "Settings", badge: null },
    ];

    return (
      <div className="max-w-lg p-8">
        <GlassCard className="p-6">
          <h2 className="mb-4 font-bold text-xl">Navigation with Context</h2>

          <nav aria-label="Main navigation">
            <GlassVisuallyHidden as="h3">Main Menu</GlassVisuallyHidden>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => setCurrentPage(item.id)}
                    className={`w-full rounded-lg px-4 py-3 text-left transition-all ${
                      currentPage === item.id
                        ? "bg-blue-500/20 text-blue-500"
                        : "hover:bg-white/5"
                    }`}
                    aria-current={currentPage === item.id ? "page" : undefined}
                  >
                    <span className="flex items-center justify-between">
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="rounded-full bg-red-500 px-2 py-1 text-white text-xs">
                          {item.badge}
                          <GlassVisuallyHidden>
                            {" "}
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

          <div className="liquid-glass mt-6 rounded-lg p-4">
<div key={card.id} className="liquid-glass rounded-lg p-4">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-medium">
                    {card.title}
                    <GlassVisuallyHidden>
                      , {card.status}, {card.progress}% complete
                    </GlassVisuallyHidden>
                  </h3>
                  <button
                    type="button"
                    onClick={() => toggleCard(card.id)}
                    className="text-blue-500 text-sm"
                    aria-expanded={expandedCards.has(card.id)}
                    aria-controls={`details-${card.id}`}
                  >
                    {expandedCards.has(card.id) ? "Hide" : "Show"} Details
                    <GlassVisuallyHidden> for {card.title}</GlassVisuallyHidden>
                  </button>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <span
                    className={`rounded px-2 py-1 text-xs ${
                      card.status === "Completed"
                        ? "bg-green-500/20 text-green-500"
                        : card.status === "In Progress"
                          ? "bg-blue-500/20 text-blue-500"
                          : "bg-gray-500/20 text-gray-500"
                    }`}
                  >
                    {card.status}
                  </span>

                  <div className="flex-1">
                    <GlassVisuallyHidden>
                      Progress: {card.progress}% complete
                    </GlassVisuallyHidden>
                    <div
                      className="h-2 w-full rounded-full bg-white/10"
                      aria-hidden="true"
                    >
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all"
                        style={{ width: `${card.progress}%` }}
                      />
                    </div>
                  </div>

                  <span aria-hidden="true">{card.progress}%</span>
                </div>

                {expandedCards.has(card.id) && (
                  <div
                    id={`details-${card.id}`}
                    className="mt-4 text-[var(--text-secondary)] text-sm"
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
          "Complex UI with multiple visually hidden elements providing rich context",
      },
    },
  },
};
