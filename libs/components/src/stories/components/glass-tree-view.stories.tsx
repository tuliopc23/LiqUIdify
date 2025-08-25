import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Database, Folder, File, Key, Type, Table } from "lucide-react";
import { GlassButton } from "@/components/glass-button-refactored/glass-button";
import { GlassCard } from "@/components/glass-card-refactored/glass-card";
import {
  GlassTreeView,
  type TreeNode,
} from "@/components/glass-tree-view/glass-tree-view";

const meta = {
  title: "Components/Glass Tree View",
  component: GlassTreeView,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A hierarchical tree view component with glassmorphism styling. Supports nested structures, custom icons, selection states, and expand/collapse animations.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    nodes: {
      description: "Array of tree nodes to display",
      control: false,
    },
    selectedNodeId: {
      description: "ID of the currently selected node",
      control: { type: "text" },
    },
    onNodeSelect: {
      description: "Callback when a node is selected",
      action: "node selected",
    },
    onNodeExpand: {
      description: "Callback when a node is expanded",
      action: "node expanded",
    },
    onNodeCollapse: {
      description: "Callback when a node is collapsed",
      action: "node collapsed",
    },
    showIcons: {
      description: "Whether to show node icons",
      control: { type: "boolean" },
    },
    className: {
      description: "Additional CSS classes",
      control: { type: "text" },
    },
  },
} satisfies Meta<typeof GlassTreeView>;

export default meta;
type Story = StoryObj<typeof meta>;

const fileSystemNodes: Array<TreeNode> = [
  {
    id: "src",
    label: "src",
    icon: <Folder className="h-4 w-4" />,
    defaultExpanded: true,
    children: [
      {
        id: "components",
        label: "components",
        icon: <Folder className="h-4 w-4" />,
        defaultExpanded: true,
        children: [
          {
            id: "Button.tsx",
            label: "Button.tsx",
            icon: <File className="h-4 w-4" />,
          },
          {
            id: "Card.tsx",
            label: "Card.tsx",
            icon: <File className="h-4 w-4" />,
          },
          {
            id: "Modal.tsx",
            label: "Modal.tsx",
            icon: <File className="h-4 w-4" />,
          },
        ],
      },
      {
        id: "utils",
        label: "utils",
        icon: <Folder className="h-4 w-4" />,
        children: [
          {
            id: "helpers.ts",
            label: "helpers.ts",
            icon: <File className="h-4 w-4" />,
          },
          {
            id: "constants.ts",
            label: "constants.ts",
            icon: <File className="h-4 w-4" />,
          },
        ],
      },
      { id: "App.tsx", label: "App.tsx", icon: <File className="h-4 w-4" /> },
      {
        id: "index.tsx",
        label: "index.tsx",
        icon: <File className="h-4 w-4" />,
      },
    ],
  },
  {
    id: "public",
    label: "public",
    icon: <Folder className="h-4 w-4" />,
    children: [
      {
        id: "index.html",
        label: "index.html",
        icon: <File className="h-4 w-4" />,
      },
      {
        id: "favicon.ico",
        label: "favicon.ico",
        icon: <File className="h-4 w-4" />,
      },
    ],
  },
  {
    id: "package.json",
    label: "package.json",
    icon: <File className="h-4 w-4" />,
  },
  { id: "README.md", label: "README.md", icon: <File className="h-4 w-4" /> },
];

export const Default: Story = {
  args: {
    nodes: fileSystemNodes,
    showIcons: true,
  },
};

export const WithSelection: Story = {
  render: () => {
    const [selectedNodeId, setSelectedNodeId] =
      React.useState<string>("Button.tsx");

    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <h3 className="mb-4 font-bold text-lg">File Explorer</h3>
          <GlassTreeView
            nodes={fileSystemNodes}
            selectedNodeId={selectedNodeId}
            onNodeSelect={(node) => setSelectedNodeId(node.id)}
          />
        </div>
        <div>
          <h3 className="mb-4 font-bold text-lg">Selected File</h3>
          <GlassCard className="p-6">
            <p className="text-[var(--text-secondary)]">
              {selectedNodeId
                ? `Selected: ${selectedNodeId}`
                : "No file selected"}
            </p>
          </GlassCard>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Tree view with selection state management",
      },
    },
  },
};

export const DatabaseSchema: Story = {
  args: {
    nodes: [
      {
        id: "database",
        label: "Production Database",
        icon: <Database className="h-4 w-4" />,
        defaultExpanded: true,
        children: [
          {
            id: "users-table",
            label: "users",
            icon: <Table className="h-4 w-4" />,
            children: [
              {
                id: "users-id",
                label: "id",
                icon: <Key className="h-4 w-4" />,
              },
              {
                id: "users-name",
                label: "name",
                icon: <Type className="h-4 w-4" />,
              },
              {
                id: "users-email",
                label: "email",
                icon: <Type className="h-4 w-4" />,
              },
              {
                id: "users-created",
                label: "created_at",
                icon: <Type className="h-4 w-4" />,
              },
            ],
          },
          {
            id: "posts-table",
            label: "posts",
            icon: <Table className="h-4 w-4" />,
            children: [
              {
                id: "posts-id",
                label: "id",
                icon: <Key className="h-4 w-4" />,
              },
              {
                id: "posts-title",
                label: "title",
                icon: <Type className="h-4 w-4" />,
              },
              {
                id: "posts-content",
                label: "content",
                icon: <Type className="h-4 w-4" />,
              },
              {
                id: "posts-user-id",
                label: "user_id",
                icon: <Key className="h-4 w-4" />,
              },
              {
                id: "posts-created",
                label: "created_at",
                icon: <Type className="h-4 w-4" />,
              },
            ],
          },
          {
            id: "comments-table",
            label: "comments",
            icon: <Table className="h-4 w-4" />,
            children: [
              {
                id: "comments-id",
                label: "id",
                icon: <Key className="h-4 w-4" />,
              },
              {
                id: "comments-content",
                label: "content",
                icon: <Type className="h-4 w-4" />,
              },
              {
                id: "comments-post-id",
                label: "post_id",
                icon: <Key className="h-4 w-4" />,
              },
              {
                id: "comments-user-id",
                label: "user_id",
                icon: <Key className="h-4 w-4" />,
              },
            ],
          },
        ],
      },
    ],
    showIcons: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Tree view displaying a database schema with tables and columns",
      },
    },
  },
};

export const InteractiveExample: Story = {
  render: () => {
    const [nodes, setNodes] = React.useState<TreeNode[]>(fileSystemNodes);
    const [selectedNodeId, setSelectedNodeId] = React.useState<
      string | undefined
    >();

    const addNode = () => {
      const newNode: TreeNode = {
        id: `new-file-${Date.now()}`,
        label: `new-file-${nodes.length + 1}.tsx`,
        icon: <File className="h-4 w-4" />,
      };

      setNodes([...nodes, newNode]);
    };

    const removeSelectedNode = () => {
      if (!selectedNodeId) return;

      const removeNodeRecursively = (nodeList: TreeNode[]): TreeNode[] => {
        return nodeList
          .filter((node) => node.id !== selectedNodeId)
          .map((node) => ({
            ...node,
            children: node.children
              ? removeNodeRecursively(node.children)
              : undefined,
          }));
      };

      setNodes(removeNodeRecursively(nodes));
      setSelectedNodeId(undefined);
    };

    return (
      <div className="space-y-6">
        <GlassCard className="p-6">
          <h3 className="mb-4 font-bold text-lg">Interactive Tree View</h3>
          <p className="mb-4 text-[var(--text-secondary)] text-sm">
            Select nodes and use the buttons below to add or remove items from
            the tree.
          </p>

          <div className="mb-4 flex gap-2">
            <GlassButton type="button" onClick={addNode} size="sm">
              Add File
            </GlassButton>
            <GlassButton
              type="button"
              variant="danger"
              onClick={removeSelectedNode}
              disabled={!selectedNodeId}
              size="sm"
            >
              Remove Selected
            </GlassButton>
          </div>

          {selectedNodeId && (
            <div className="mb-4 rounded-lg bg-liquid-accent/10 p-3">
              <p className="text-sm">
                <strong>Selected:</strong> {selectedNodeId}
              </p>
            </div>
          )}
        </GlassCard>

        <GlassTreeView
          nodes={nodes}
          selectedNodeId={selectedNodeId}
          onNodeSelect={(node) => setSelectedNodeId(node.id)}
          showIcons
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive tree view with add/remove functionality",
      },
    },
  },
};

export const WithoutIcons: Story = {
  args: {
    nodes: [
      {
        id: "root",
        label: "Root Folder",
        defaultExpanded: true,
        children: [
          {
            id: "documents",
            label: "Documents",
            children: [
              { id: "doc1", label: "Document 1.pdf" },
              { id: "doc2", label: "Document 2.docx" },
            ],
          },
          {
            id: "images",
            label: "Images",
            children: [
              { id: "img1", label: "photo1.jpg" },
              { id: "img2", label: "photo2.png" },
            ],
          },
          { id: "readme", label: "README.txt" },
        ],
      },
    ],
    showIcons: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Tree view without icons for a cleaner, text-only appearance",
      },
    },
  },
};
