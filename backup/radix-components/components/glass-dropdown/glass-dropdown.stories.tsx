import type { Meta, StoryObj } from "@storybook/react";
import {
  AlignLeft,
  Archive,
  ArrowDown,
  ArrowUp,
  BarChart,
  Bell,
  Calendar,
  Check,
  ChevronDown,
  Circle,
  Code,
  Copy,
  Database,
  Download,
  Edit,
  Eye,
  File,
  FileText,
  Flag,
  Folder,
  Grid,
  HardDrive,
  HelpCircle,
  Keyboard,
  List,
  Lock,
  LogOut,
  MoreVertical,
  Printer,
  RefreshCw,
  Save,
  Server,
  Settings,
  Share2,
  Square,
  Star,
  Trash2,
  User,
  Video,
  X,
} from "lucide-react";
import React from "react";
import { GlassButton } from "../glass-button-refactored";
import { Card } from "../glass-card-refactored";
import { GlassDropdown } from "./glass-dropdown";

const meta = {
  title: "Components/Overlays/GlassDropdown",
  component: GlassDropdown,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A glassmorphic dropdown menu component with smooth animations and comprehensive accessibility features.

## Features

- **Glass Design**: Beautiful frosted glass appearance with elevation effects
- **Flexible Positioning**: Smart positioning to stay within viewport
- **Alignment Options**: Start, center, or end alignment relative to trigger
- **Item Types**: Regular items, disabled items, and separators
- **Icon Support**: Optional icons for each menu item
- **Keyboard Navigation**: Full keyboard support with arrow keys
- **Click Outside**: Closes when clicking outside the dropdown
- **Custom Triggers**: Any element can be used as a trigger
- **Accessibility**: Full ARIA support and keyboard navigation
- **Animation**: Smooth fade and zoom animations

## Usage

\`\`\`tsx
import { GlassDropdown } from '@/components/glass-dropdown';

// Basic usage
const items = [
  { label: 'Edit', value: 'edit', icon: <Edit /> },
  { label: 'Copy', value: 'copy', icon: <Copy /> },
  { separator: true },
  { label: 'Delete', value: 'delete', icon: <Trash2 /> }
];

<GlassDropdown
  trigger={<button type="button">Options</button>}
  items={items}
  onSelect={(value) => console.log(value)} />

// With custom trigger
<GlassDropdown
  trigger={
    <GlassButton type="button" variant="ghost" iconOnly>
      <MoreVertical />
    </GlassButton>
  }
  items={menuItems}
  align="end" />
\`\`\`

## Keyboard Shortcuts

- **Space/Enter**: Open dropdown when trigger is focused
- **Escape**: Close dropdown
- **Arrow Up/Down**: Navigate through items (when implemented)
- **Tab**: Move focus to next element

## Accessibility

The dropdown follows WAI-ARIA guidelines:
- Trigger has aria-expanded and aria-haspopup
- Menu items are keyboard navigable
- Focus management on open/close
- Screen reader announcements
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    trigger: {
      control: false,
      description: "The element that triggers the dropdown",
      table: {
        type: { summary: "React.ReactNode" },
        category: "Content",
      },
    },
    items: {
      control: "object",
      description: "Array of dropdown items",
      table: {
        type: { summary: "Array<DropdownItem>" },
        category: "Content",
      },
    },
    onSelect: {
      action: "selected",
      description: "Callback when an item is selected",
      table: {
        type: { summary: "(value: string) => void" },
        category: "Events",
      },
    },
    align: {
      control: "radio",
      options: ["start", "center", "end"],
      description: "Alignment of dropdown relative to trigger",
      table: {
        type: { summary: "start | center | end" },
        defaultValue: { summary: "start" },
        category: "Layout",
      },
    },
    sideOffset: {
      control: { type: "number", min: 0, max: 20 },
      description: "Distance between trigger and dropdown",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "4" },
        category: "Layout",
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes for the container",
      table: {
        type: { summary: "string" },
        category: "Styling",
      },
    },
    contentClassName: {
      control: "text",
      description: "Additional CSS classes for the dropdown content",
      table: {
        type: { summary: "string" },
        category: "Styling",
      },
    },
  },
  args: {
    align: "start",
    sideOffset: 4,
  },
} satisfies Meta<typeof GlassDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story - Interactive playground
export const Playground: Story = {
  args: {
    trigger: (
      <GlassButton
        type="button"
        variant="secondary"
        rightIcon={<ChevronDown className="h-4 w-4" />}
      >
        Options
      </GlassButton>
    ),
    items: [
      { label: "Edit", value: "edit", icon: <Edit className="h-4 w-4" /> },
      { label: "Copy", value: "copy", icon: <Copy className="h-4 w-4" /> },
      { label: "Share", value: "share", icon: <Share2 className="h-4 w-4" /> },
      { separator: true, value: "sep1", label: "" },
      {
        label: "Delete",
        value: "delete",
        icon: <Trash2 className="h-4 w-4" />,
      },
    ],
  },
};

// Basic examples
export const BasicExamples: Story = {
  render: () => (
    <div className="flex flex-wrap gap-8">
      <GlassDropdown
        trigger={<GlassButton type="button">Simple Menu</GlassButton>}
        items={[
          { label: "Option 1", value: "opt1" },
          { label: "Option 2", value: "opt2" },
          { label: "Option 3", value: "opt3" },
        ]}
        onSelect={(value) => console.log("Selected:", value)}
      />

      <GlassDropdown
        trigger={
          <GlassButton type="button" variant="primary">
            With Icons
          </GlassButton>
        }
        items={[
          { label: "Save", value: "save", icon: <Save className="h-4 w-4" /> },
          {
            label: "Export",
            value: "export",
            icon: <Download className="h-4 w-4" />,
          },
          {
            label: "Print",
            value: "print",
            icon: <Printer className="h-4 w-4" />,
          },
        ]}
      />

      <GlassDropdown
        trigger={
          <GlassButton type="button" variant="ghost" iconOnly aria-label="More options">
            <MoreVertical className="h-4 w-4" />
          </GlassButton>
        }
        items={[
          { label: "View", value: "view", icon: <Eye className="h-4 w-4" /> },
          { label: "Edit", value: "edit", icon: <Edit className="h-4 w-4" /> },
          { separator: true, value: "sep1", label: "" },
          {
            label: "Delete",
            value: "delete",
            icon: <Trash2 className="h-4 w-4" />,
          },
        ]}
        align="end"
      />
    </div>
  ),
};

// Alignment options
export const AlignmentOptions: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-8">
      <div className="flex gap-16">
        <GlassDropdown
          trigger={<GlassButton type="button">Align Start</GlassButton>}
          items={[
            { label: "This dropdown", value: "item1" },
            { label: "is aligned to", value: "item2" },
            { label: "the start", value: "item3" },
          ]}
          align="start"
        />

        <GlassDropdown
          trigger={<GlassButton type="button">Align Center</GlassButton>}
          items={[
            { label: "This dropdown", value: "item1" },
            { label: "is centered", value: "item2" },
            { label: "below trigger", value: "item3" },
          ]}
          align="center"
        />

        <GlassDropdown
          trigger={<GlassButton type="button">Align End</GlassButton>}
          items={[
            { label: "This dropdown", value: "item1" },
            { label: "is aligned to", value: "item2" },
            { label: "the end", value: "item3" },
          ]}
          align="end"
        />
      </div>
    </div>
  ),
};

// Item states
export const ItemStates: Story = {
  render: () => (
    <GlassDropdown
      trigger={<GlassButton type="button">Item States Demo</GlassButton>}
      items={[
        {
          label: "Regular Item",
          value: "regular",
          icon: <Check className="h-4 w-4" />,
        },
        {
          label: "Another Item",
          value: "another",
          icon: <Star className="h-4 w-4" />,
        },
        { separator: true, value: "sep1", label: "" },
        {
          label: "Disabled Item",
          value: "disabled",
          icon: <X className="h-4 w-4" />,
          disabled: true,
        },
        {
          label: "Also Disabled",
          value: "disabled2",
          icon: <Lock className="h-4 w-4" />,
          disabled: true,
        },
        { separator: true, value: "sep2", label: "" },
        {
          label: "Final Item",
          value: "final",
          icon: <Flag className="h-4 w-4" />,
        },
      ]}
    />
  ),
};

// Real-world examples
export const RealWorldExamples: Story = {
  render: () => {
    const [selectedView, setSelectedView] = React.useState("grid");
    const [_selectedSort, setSelectedSort] = React.useState("name");
    const [_selectedFilter, _setSelectedFilter] = React.useState("all");

    return (
      <div className="max-w-4xl space-y-8">
        {/* File Manager Actions */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">File Manager</h3>
          <Card>
            <Card.Header>
              <div className="flex items-center justify-between">
                <Card.Title>Documents</Card.Title>
                <div className="flex items-center gap-2">
                  <GlassDropdown
                    trigger={
                      <GlassButton type="button" variant="ghost" size="sm">
                        View: {selectedView === "grid" ? "Grid" : "List"}
                        <ChevronDown className="ml-1 h-3 w-3" />
                      </GlassButton>
                    }
                    items={[
                      {
                        label: "Grid View",
                        value: "grid",
                        icon: <Grid className="h-4 w-4" />,
                      },
                      {
                        label: "List View",
                        value: "list",
                        icon: <List className="h-4 w-4" />,
                      },
                    ]}
                    onSelect={setSelectedView}
                  />

                  <GlassDropdown
                    trigger={
                      <GlassButton type="button" variant="ghost" size="sm">
                        Sort
                        <ChevronDown className="ml-1 h-3 w-3" />
                      </GlassButton>
                    }
                    items={[
                      {
                        label: "Name",
                        value: "name",
                        icon: <AlignLeft className="h-4 w-4" />,
                      },
                      {
                        label: "Date Modified",
                        value: "date",
                        icon: <Calendar className="h-4 w-4" />,
                      },
                      {
                        label: "Size",
                        value: "size",
                        icon: <HardDrive className="h-4 w-4" />,
                      },
                      {
                        label: "Type",
                        value: "type",
                        icon: <File className="h-4 w-4" />,
                      },
                    ]}
                    onSelect={setSelectedSort}
                  />

                  <GlassDropdown
                    trigger={
                      <GlassButton
                        type="button"
                        variant="ghost"
                        iconOnly
                        size="sm"
                        aria-label="More actions"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </GlassButton>
                    }
                    items={[
                      {
                        label: "New Folder",
                        value: "new-folder",
                        icon: <Folder className="h-4 w-4" />,
                      },
                      {
                        label: "Upload Files",
                        value: "upload",
                        icon: <Upload className="h-4 w-4" />,
                      },
                      { separator: true, value: "sep1", label: "" },
                      {
                        label: "Select All",
                        value: "select-all",
                        icon: <Square className="h-4 w-4" />,
                      },
                      {
                        label: "Refresh",
                        value: "refresh",
                        icon: <RefreshCw className="h-4 w-4" />,
                      },
                    ]}
                    align="end"
                  />
                </div>
              </div>
            </Card.Header>
            <Card.Content>
              <div className="grid grid-cols-4 gap-4">
                {["Document.pdf", "Presentation.pptx", "Spreadsheet.xlsx", "Image.png"].map(
                  (file) => (
                    <div
                      key={file}
                      className="cursor-pointer rounded-lg border border-blue-200 p-4 hover:bg-blue-100 dark:border-blue-200 dark:hover:bg-blue-100"
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <FileText className="h-8 w-8 text-blue-900" />
                        <GlassDropdown
                          trigger={
                            <button
                              type="button"
                              className="opacity-0 transition-opacity hover:opacity-100"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </button>
                          }
                          items={[
                            {
                              label: "Open",
                              value: "open",
                              icon: <Eye className="h-4 w-4" />,
                            },
                            {
                              label: "Rename",
                              value: "rename",
                              icon: <Edit className="h-4 w-4" />,
                            },
                            {
                              label: "Copy",
                              value: "copy",
                              icon: <Copy className="h-4 w-4" />,
                            },
                            { separator: true, value: "sep1", label: "" },
                            {
                              label: "Share",
                              value: "share",
                              icon: <Share2 className="h-4 w-4" />,
                            },
                            {
                              label: "Download",
                              value: "download",
                              icon: <Download className="h-4 w-4" />,
                            },
                            { separator: true, value: "sep2", label: "" },
                            {
                              label: "Delete",
                              value: "delete",
                              icon: <Trash2 className="h-4 w-4" />,
                            },
                          ]}
                          align="end"
                        />
                      </div>
                      <p className="truncate font-medium text-sm">{file}</p>
                      <p className="text-blue-900 text-xs">2.4 MB</p>
                    </div>
                  )
                )}
              </div>
            </Card.Content>
          </Card>
        </div>

        {/* User Profile Menu */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">User Profile Menu</h3>
          <div className="flex justify-center">
            <GlassDropdown
              trigger={
                <GlassButton type="button" variant="ghost" className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-600" />
                  <span>John Doe</span>
                  <ChevronDown className="h-4 w-4" />
                </GlassButton>
              }
              items={[
                {
                  label: "Profile",
                  value: "profile",
                  icon: <User className="h-4 w-4" />,
                },
                {
                  label: "Settings",
                  value: "settings",
                  icon: <Settings className="h-4 w-4" />,
                },
                {
                  label: "Notifications",
                  value: "notifications",
                  icon: <Bell className="h-4 w-4" />,
                },
                { separator: true, value: "sep1", label: "" },
                {
                  label: "Help & Support",
                  value: "help",
                  icon: <HelpCircle className="h-4 w-4" />,
                },
                {
                  label: "Keyboard Shortcuts",
                  value: "shortcuts",
                  icon: <Keyboard className="h-4 w-4" />,
                },
                { separator: true, value: "sep2", label: "" },
                {
                  label: "Log Out",
                  value: "logout",
                  icon: <LogOut className="h-4 w-4" />,
                },
              ]}
              align="end"
            />
          </div>
        </div>

        {/* Table Actions */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Table Row Actions</h3>
          <Card>
            <Card.Content>
              <table className="w-full">
                <thead>
                  <tr className="border-blue-200 border-b dark:border-blue-200">
                    <th className="py-2 text-left">Name</th>
                    <th className="py-2 text-left">Status</th>
                    <th className="py-2 text-left">Date</th>
                    <th className="py-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      name: "Project Alpha",
                      status: "Active",
                      date: "2024-01-15",
                    },
                    {
                      name: "Project Beta",
                      status: "Pending",
                      date: "2024-01-14",
                    },
                    {
                      name: "Project Gamma",
                      status: "Completed",
                      date: "2024-01-13",
                    },
                  ].map((project) => (
                    <tr
                      key={project.name}
                      className="border-blue-200 border-b dark:border-blue-200"
                    >
                      <td className="py-3">{project.name}</td>
                      <td className="py-3">
                        <span
                          className={cn(
                            "rounded-full px-2 py-1 text-xs",
                            project.status === "Active" &&
                              "bg-blue-500 text-blue-900 dark:bg-blue-500/20 dark:text-blue-900",
                            project.status === "Pending" &&
                              "bg-blue-500 text-blue-900 dark:bg-blue-500/20 dark:text-blue-900",
                            project.status === "Completed" &&
                              "bg-blue-500 text-blue-900 dark:bg-blue-500/20 dark:text-blue-900"
                          )}
                        >
                          {project.status}
                        </span>
                      </td>
                      <td className="py-3 text-blue-900 dark:text-blue-900">{project.date}</td>
                      <td className="py-3 text-right">
                        <GlassDropdown
                          trigger={
                            <GlassButton type="button" variant="ghost" iconOnly size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </GlassButton>
                          }
                          items={[
                            {
                              label: "View Details",
                              value: "view",
                              icon: <Eye className="h-4 w-4" />,
                            },
                            {
                              label: "Edit",
                              value: "edit",
                              icon: <Edit className="h-4 w-4" />,
                            },
                            {
                              label: "Duplicate",
                              value: "duplicate",
                              icon: <Copy className="h-4 w-4" />,
                            },
                            { separator: true, value: "sep1", label: "" },
                            {
                              label: "Archive",
                              value: "archive",
                              icon: <Archive className="h-4 w-4" />,
                            },
                            {
                              label: "Delete",
                              value: "delete",
                              icon: <Trash2 className="h-4 w-4" />,
                            },
                          ]}
                          align="end"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card.Content>
          </Card>
        </div>
      </div>
    );
  },
};

// Navigation dropdown
export const NavigationDropdown: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <GlassDropdown
        trigger={
          <GlassButton type="button" variant="ghost">
            Products
            <ChevronDown className="ml-1 h-4 w-4" />
          </GlassButton>
        }
        items={[
          {
            label: "Analytics",
            value: "analytics",
            icon: <BarChart className="h-4 w-4" />,
          },
          {
            label: "Database",
            value: "database",
            icon: <Database className="h-4 w-4" />,
          },
          {
            label: "Storage",
            value: "storage",
            icon: <HardDrive className="h-4 w-4" />,
          },
          {
            label: "Hosting",
            value: "hosting",
            icon: <Server className="h-4 w-4" />,
          },
          { separator: true, value: "sep1", label: "" },
          {
            label: "View All Products",
            value: "all",
            icon: <Grid className="h-4 w-4" />,
          },
        ]}
      />

      <GlassDropdown
        trigger={
          <GlassButton type="button" variant="ghost">
            Resources
            <ChevronDown className="ml-1 h-4 w-4" />
          </GlassButton>
        }
        items={[
          {
            label: "Documentation",
            value: "docs",
            icon: <FileText className="h-4 w-4" />,
          },
          {
            label: "API Reference",
            value: "api",
            icon: <Code className="h-4 w-4" />,
          },
          {
            label: "Tutorials",
            value: "tutorials",
            icon: <Video className="h-4 w-4" />,
          },
          { label: "Blog", value: "blog", icon: <Edit className="h-4 w-4" /> },
          { separator: true, value: "sep1", label: "" },
          {
            label: "Community",
            value: "community",
            icon: <Users className="h-4 w-4" />,
          },
          {
            label: "Support",
            value: "support",
            icon: <HelpCircle className="h-4 w-4" />,
          },
        ]}
      />
    </div>
  ),
};

// Theme showcase
export const ThemeShowcase: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-4 rounded-xl bg-blue-100/80 p-6 dark:bg-blue-100/80">
          <h3 className="font-semibold text-lg">Light Theme</h3>
          <GlassDropdown
            trigger={<GlassButton type="button">Light Theme Menu</GlassButton>}
            items={[
              {
                label: "Action 1",
                value: "action1",
                icon: <Check className="h-4 w-4" />,
              },
              {
                label: "Action 2",
                value: "action2",
                icon: <Star className="h-4 w-4" />,
              },
              { separator: true, value: "sep1", label: "" },
              {
                label: "Disabled",
                value: "disabled",
                icon: <X className="h-4 w-4" />,
                disabled: true,
              },
            ]}
          />
        </div>

        <div className="space-y-4 rounded-xl bg-blue-100/80 p-6 dark:bg-blue-100/80">
          <h3 className="font-semibold text-lg text-blue-900 dark:text-blue-900">Dark Theme</h3>
          <GlassDropdown
            trigger={<GlassButton type="button">Dark Theme Menu</GlassButton>}
            items={[
              {
                label: "Action 1",
                value: "action1",
                icon: <Check className="h-4 w-4" />,
              },
              {
                label: "Action 2",
                value: "action2",
                icon: <Star className="h-4 w-4" />,
              },
              { separator: true, value: "sep1", label: "" },
              {
                label: "Disabled",
                value: "disabled",
                icon: <X className="h-4 w-4" />,
                disabled: true,
              },
            ]}
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    backgrounds: {
      default: "liquid-gradient",
    },
  },
};

// Accessibility showcase
export const AccessibilityShowcase: Story = {
  render: () => (
    <div className="max-w-2xl space-y-8">
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Keyboard Navigation</h3>
        <p className="text-blue-900 text-sm dark:text-blue-900">
          Use Space or Enter to open the dropdown, Escape to close it.
        </p>
        <GlassDropdown
          trigger={
            <GlassButton type="button">
              Keyboard Accessible Menu
              <ChevronDown className="ml-2 h-4 w-4" />
            </GlassButton>
          }
          items={[
            {
              label: "First Item (Tab to focus)",
              value: "item1",
              icon: <ArrowDown className="h-4 w-4" />,
            },
            {
              label: "Second Item",
              value: "item2",
              icon: <Circle className="h-4 w-4" />,
            },
            {
              label: "Third Item",
              value: "item3",
              icon: <Square className="h-4 w-4" />,
            },
            { separator: true, value: "sep1", label: "" },
            {
              label: "Last Item",
              value: "item4",
              icon: <ArrowUp className="h-4 w-4" />,
            },
          ]}
        />
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Screen Reader Support</h3>
        <p className="text-blue-900 text-sm dark:text-blue-900">
          The trigger button has proper ARIA attributes for screen readers.
        </p>
        <GlassDropdown
          trigger={
            <GlassButton type="button" aria-label="Options menu">
              Options
              <ChevronDown className="ml-2 h-4 w-4" />
            </GlassButton>
          }
          items={[
            {
              label: "View (announces as button)",
              value: "view",
              icon: <Eye className="h-4 w-4" />,
            },
            {
              label: "Edit (announces as button)",
              value: "edit",
              icon: <Edit className="h-4 w-4" />,
            },
            { separator: true, value: "sep1", label: "" },
            {
              label: "Delete (disabled)",
              value: "delete",
              icon: <Trash2 className="h-4 w-4" />,
              disabled: true,
            },
          ]}
        />
      </div>
    </div>
  ),
};

// Custom styling
export const CustomStyling: Story = {
  render: () => (
    <div className="flex flex-wrap gap-8">
      <GlassDropdown
        trigger={<GlassButton type="button">Custom Content Style</GlassButton>}
        items={[
          { label: "Option 1", value: "opt1" },
          { label: "Option 2", value: "opt2" },
          { label: "Option 3", value: "opt3" },
        ]}
        contentClassName="bg-blue-500/90 border-blue-500/30"
      />

      <GlassDropdown
        trigger={<GlassButton type="button">Wide Dropdown</GlassButton>}
        items={[
          {
            label: "This is a very long menu item that needs more space",
            value: "long1",
          },
          { label: "Another long item with lots of text", value: "long2" },
          { label: "Yet another lengthy menu option", value: "long3" },
        ]}
        contentClassName="min-w-[300px]"
      />

      <GlassDropdown
        trigger={<GlassButton type="button">Compact Menu</GlassButton>}
        items={[
          { label: "A", value: "a" },
          { label: "B", value: "b" },
          { label: "C", value: "c" },
        ]}
        contentClassName="min-w-[80px]"
        sideOffset={0}
      />
    </div>
  ),
};
