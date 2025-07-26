import type { Meta, StoryObj } from '@storybook/react';
import { Columns, Database, Key, Settings, Table, Type } from 'lucide-react';
import React from 'react';
import { GlassButton } from '@/components/glass-button-refactored/glass-button';
import { GlassCard } from '@/components/glass-card-refactored/glass-card';
import {
  GlassTreeView,
  type TreeNode,
} from '@/components/glass-tree-view/glass-tree-view';

const meta = {
  title: 'Components/Glass Tree View',
  component: GlassTreeView,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A hierarchical tree view component with glassmorphism styling. Supports nested structures, custom icons, selection states, and expand/collapse animations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    nodes: {
      description: 'Tree nodes to display',
      control: false,
    },
    onNodeSelect: {
      description: 'Callback when a node is selected',
      action: 'node selected',
    },
    onNodeExpand: {
      description: 'Callback when a node is expanded/collapsed',
      action: 'node toggled',
    },
    selectedNodeId: {
      description: 'ID of the selected node',
      control: { type: 'text' },
    },
    expandedNodeIds: {
      description: 'IDs of expanded nodes',
      control: false,
    },
    showIcons: {
      description: 'Show node icons',
      control: { type: 'boolean' },
    },
    indentSize: {
      description: 'Indentation size in pixels',
      control: { type: 'number', min: 10, max: 40, step: 5 },
    },
  },
} satisfies Meta<typeof GlassTreeView>;

export default meta;
type Story = StoryObj<typeof meta>;

const fileSystemNodes: TreeNode[] = [
  {
    id: 'src',
    label: 'src',
    defaultExpanded: true,
    children: [
      {
        id: 'components',
        label: 'components',
        defaultExpanded: true,
        children: [
          { id: 'Button.tsx', label: 'Button.tsx' },
          { id: 'Card.tsx', label: 'Card.tsx' },
          { id: 'Modal.tsx', label: 'Modal.tsx' },
        ],
      },
      {
        id: 'utils',
        label: 'utils',
        children: [
          { id: 'helpers.ts', label: 'helpers.ts' },
          { id: 'constants.ts', label: 'constants.ts' },
        ],
      },
      { id: 'App.tsx', label: 'App.tsx' },
      { id: 'index.tsx', label: 'index.tsx' },
    ],
  },
  {
    id: 'public',
    label: 'public',
    children: [
      { id: 'index.html', label: 'index.html' },
      { id: 'favicon.ico', label: 'favicon.ico' },
    ],
  },
  { id: 'package.json', label: 'package.json' },
  { id: 'README.md', label: 'README.md' },
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
      React.useState<string>('Button.tsx');

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-bold mb-4">File Explorer</h3>
          <GlassTreeView
            nodes={fileSystemNodes}
            selectedNodeId={selectedNodeId}
            onNodeSelect={(node) => setSelectedNodeId(node.id)}
          />
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Selected File</h3>
          <GlassCard className="p-6">
            <p className="text-[var(--text-secondary)]">
              {selectedNodeId
                ? `Selected: ${selectedNodeId}`
                : 'No file selected'}
            </p>
          </GlassCard>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Tree view with selection state management',
      },
    },
  },
};

export const DatabaseSchema: Story = {
  args: {
    nodes: [
      {
        id: 'database',
        label: 'Production Database',
        icon: <Database className="h-4 w-4" />,
        defaultExpanded: true,
        children: [
          {
            id: 'users-table',
            label: 'users',
            icon: <Table className="h-4 w-4" />,
            children: [
              {
                id: 'users-id',
                label: 'id',
                icon: <Key className="h-4 w-4" />,
              },
              {
                id: 'users-name',
                label: 'name',
                icon: <Type className="h-4 w-4" />,
              },
              {
                id: 'users-email',
                label: 'email',
                icon: <Type className="h-4 w-4" />,
              },
              {
                id: 'users-created',
                label: 'created_at',
                icon: <Type className="h-4 w-4" />,
              },
            ],
          },
          {
            id: 'posts-table',
            label: 'posts',
            icon: <Table className="h-4 w-4" />,
            children: [
              {
                id: 'posts-id',
                label: 'id',
                icon: <Key className="h-4 w-4" />,
              },
              {
                id: 'posts-title',
                label: 'title',
                icon: <Type className="h-4 w-4" />,
              },
              {
                id: 'posts-content',
                label: 'content',
                icon: <Type className="h-4 w-4" />,
              },
              {
                id: 'posts-user-id',
                label: 'user_id',
                icon: <Columns className="h-4 w-4" />,
              },
            ],
          },
          {
            id: 'comments-table',
            label: 'comments',
            icon: <Table className="h-4 w-4" />,
            children: [
              {
                id: 'comments-id',
                label: 'id',
                icon: <Key className="h-4 w-4" />,
              },
              {
                id: 'comments-text',
                label: 'text',
                icon: <Type className="h-4 w-4" />,
              },
              {
                id: 'comments-post-id',
                label: 'post_id',
                icon: <Columns className="h-4 w-4" />,
              },
              {
                id: 'comments-user-id',
                label: 'user_id',
                icon: <Columns className="h-4 w-4" />,
              },
            ],
          },
        ],
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Database schema visualization with custom icons',
      },
    },
  },
};

export const ControlledExpansion: Story = {
  render: () => {
    const [expandedNodeIds, setExpandedNodeIds] = React.useState<string[]>([
      'src',
    ]);

    const handleNodeExpand = (node: TreeNode, expanded: boolean) => {
      setExpandedNodeIds((prev) => {
        if (expanded) {
          return [...prev, node.id];
        }
        return prev.filter((id) => id !== node.id);
      });
    };

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <GlassButton
            size="sm"
            onClick={() => {
              const allNodeIds: string[] = [];
              const collectIds = (nodes: TreeNode[]) => {
                nodes.forEach((node) => {
                  if (node.children) {
                    allNodeIds.push(node.id);
                    collectIds(node.children);
                  }
                });
              };
              collectIds(fileSystemNodes);
              setExpandedNodeIds(allNodeIds);
            }}
          >
            Expand All
          </GlassButton>
          <GlassButton
            size="sm"
            variant="ghost"
            onClick={() => setExpandedNodeIds([])}
          >
            Collapse All
          </GlassButton>
        </div>

        <GlassTreeView
          nodes={fileSystemNodes}
          expandedNodeIds={expandedNodeIds}
          onNodeExpand={handleNodeExpand}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Controlled expansion state with expand/collapse all functionality',
      },
    },
  },
};

export const SettingsMenu: Story = {
  args: {
    nodes: [
      {
        id: 'general',
        label: 'General',
        icon: <Settings className="h-4 w-4" />,
        defaultExpanded: true,
        children: [
          { id: 'appearance', label: 'Appearance' },
          { id: 'language', label: 'Language & Region' },
          { id: 'accessibility', label: 'Accessibility' },
        ],
      },
      {
        id: 'privacy',
        label: 'Privacy & Security',
        children: [
          { id: 'passwords', label: 'Passwords' },
          { id: 'two-factor', label: 'Two-Factor Auth' },
          { id: 'privacy-settings', label: 'Privacy Settings' },
        ],
      },
      {
        id: 'notifications',
        label: 'Notifications',
        children: [
          { id: 'email-notif', label: 'Email' },
          { id: 'push-notif', label: 'Push Notifications' },
          { id: 'sms-notif', label: 'SMS' },
        ],
      },
      {
        id: 'advanced',
        label: 'Advanced',
        children: [
          { id: 'developer', label: 'Developer Options' },
          { id: 'experimental', label: 'Experimental Features' },
          { id: 'data-export', label: 'Data Export' },
        ],
      },
    ],
    showIcons: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Settings menu structure using tree view',
      },
    },
  },
};

export const WithDataBinding: Story = {
  render: () => {
    const [selectedNode, setSelectedNode] = React.useState<TreeNode | null>(
      null
    );

    const nodesWithData: TreeNode[] = [
      {
        id: 'products',
        label: 'Products',
        defaultExpanded: true,
        children: [
          {
            id: 'electronics',
            label: 'Electronics',
            data: { category: 'electronics', itemCount: 152 },
            children: [
              {
                id: 'phones',
                label: 'Phones',
                data: { subcategory: 'phones', itemCount: 45 },
              },
              {
                id: 'laptops',
                label: 'Laptops',
                data: { subcategory: 'laptops', itemCount: 32 },
              },
              {
                id: 'tablets',
                label: 'Tablets',
                data: { subcategory: 'tablets', itemCount: 28 },
              },
            ],
          },
          {
            id: 'clothing',
            label: 'Clothing',
            data: { category: 'clothing', itemCount: 324 },
            children: [
              {
                id: 'mens',
                label: "Men's",
                data: { subcategory: 'mens', itemCount: 156 },
              },
              {
                id: 'womens',
                label: "Women's",
                data: { subcategory: 'womens', itemCount: 168 },
              },
            ],
          },
        ],
      },
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-bold mb-4">Product Categories</h3>
          <GlassTreeView
            nodes={nodesWithData}
            onNodeSelect={setSelectedNode}
            selectedNodeId={selectedNode?.id}
          />
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Category Details</h3>
          <GlassCard className="p-6">
            {selectedNode?.data ? (
              <div className="space-y-3">
                <h4 className="font-semibold">{selectedNode.label}</h4>
                <div className="space-y-2 text-sm">
                  {Object.entries(selectedNode.data).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-[var(--text-secondary)]">
                        {key.replace(/([A-Z])/g, ' $1').trim()}:
                      </span>
                      <span className="font-medium">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-[var(--text-secondary)]">
                Select a category to view details
              </p>
            )}
          </GlassCard>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Tree nodes with custom data binding',
      },
    },
  },
};

export const CompactTree: Story = {
  args: {
    nodes: [
      {
        id: 'root',
        label: 'Root',
        children: [
          { id: 'child1', label: 'Child 1' },
          { id: 'child2', label: 'Child 2' },
          {
            id: 'child3',
            label: 'Child 3',
            children: [
              { id: 'grandchild1', label: 'Grandchild 1' },
              { id: 'grandchild2', label: 'Grandchild 2' },
            ],
          },
        ],
      },
    ],
    showIcons: false,
    indentSize: 15,
  },
  render: (args) => (
    <div className="max-w-xs">
      <GlassTreeView {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Compact tree view without icons and smaller indentation',
      },
    },
  },
};

export const NonSelectableNodes: Story = {
  args: {
    nodes: [
      {
        id: 'categories',
        label: 'Categories',
        selectable: false,
        defaultExpanded: true,
        children: [
          {
            id: 'active',
            label: 'Active Items',
            selectable: false,
            children: [
              { id: 'item1', label: 'Item 1' },
              { id: 'item2', label: 'Item 2' },
            ],
          },
          {
            id: 'archived',
            label: 'Archived Items',
            selectable: false,
            children: [
              { id: 'item3', label: 'Item 3' },
              { id: 'item4', label: 'Item 4' },
            ],
          },
        ],
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Tree with non-selectable parent nodes',
      },
    },
  },
};
