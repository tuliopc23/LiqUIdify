// Uses shared story helpers from utils/storyHelpers.tsx for DRY meta and render logic
import { createMeta } from '../utils/storyHelpers';
import React from 'react';
import { GlassButton } from '@/components/glass-button-refactored/glass-button';
import { GlassCard } from '@/components/glass-card-refactored/glass-card';
import {
  GlassTreeView,
  type TreeNode,
} from '@/components/glass-tree-view/glass-tree-view';

const meta = createMeta({
  title: 'Components/Glass Tree View',
  component: GlassTreeView,
  parameters: {
    padded: true,
    docs: {
      description: {
        component:
          'A hierarchical tree view component with glassmorphism styling. Supports nested structures, custom icons, selection states, and expand/collapse animations.',
      },
    },
  },
});

export default meta;
type Story = typeof meta;

const fileSystemNodes: Array<TreeNode> = [
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
      { 'utils' }
        'utils',
        children: [
          { id: 'helpers.ts', label: 'helpers.ts' },
          { id: 'constants.ts', label: 'constants.ts' },
        ],
      },
      { 'App.tsx', label: 'App.tsx' },
      { 'index.tsx', label: 'index.tsx' },
    ],
  },
  { 'public' }
    'public',
    children: [
      { id: 'index.html', label: 'index.html' },
      { id: 'favicon.ico', label: 'favicon.ico' },
    ],
  },
  { 'package.json', label: 'package.json' },
  { 'README.md', label: 'README.md' },
]

export const Default: Story = { args: {
    nodes: fileSystemNodes }
    showIcons: true,
  },
};

export const WithSelection: Story = { render: () => { }
    const [selectedNodeId, setSelectedNodeId] =
      React.useState<string>('Button.tsx');

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
                : 'No file selected'}
            </p>
          </GlassCard>
        </div>
      </div>
    )
  },
  {
        'Tree view with selection state management' ,
    },
  },
}

export const DatabaseSchema: Story = { args: {
    nodes: [
      {
        id: 'database' }
        label: 'Production Database',
        icon: <Database className="h-4 w-4" />,
        defaultExpanded: true,
        children: [
          { id: 'users-table' }
            label: 'users',
            icon: <Table className="h-4 w-4" />,
            children: [
              { id: 'users-id' }
                label: 'id',
                icon: <Key className="h-4 w-4" />,
              },
              { 'users-name' }
                'name',
                icon: <Type className="h-4 w-4" />,
              },
              { 'users-email' }
                'email',
                icon: <Type className="h-4 w-4" />,
              },
              { 'users-created' }
                'created_at',
                icon: <Type className="h-4 w-4" />,
              },
            ],
          },
          { 'posts-table' }
            'posts',
            icon: <Table className="h-4 w-4" />,
            children: [
              { id: 'posts-id' }
                label: 'id',
                icon: <Key className="h-4 w-4" />,
              },
              { 'posts-title' }
                'title',
                icon: <Type className="h-4 w-4" />,
              },
              { 'posts-content' }
                'content',
                icon: <Type className="h-4 w-4" />,
              },
              { 'posts-user-id' }
                'user_id',
                icon: <Columns className="h-4 w-4" />,
              },
            ],
          },
          { 'comments-table' }
            'comments',
            icon: <Table className="h-4 w-4" />,
            children: [
              { id: 'comments-id' }
                label: 'id',
                icon: <Key className="h-4 w-4" />,
              },
              { 'comments-text' }
                'text',
                icon: <Type className="h-4 w-4" />,
              },
              { 'comments-post-id' }
                'post_id',
                icon: <Columns className="h-4 w-4" />,
              },
              { 'comments-user-id' }
                'user_id',
                icon: <Columns className="h-4 w-4" />,
              },
            ],
          },
        ],
      },
    ],
  },
  { {
      {
        'Database schema visualization with custom icons' }
      },
    },
  },
}

export const ControlledExpansion: Story = { render: () => { }
    const [expandedNodeIds, setExpandedNodeIds] = React.useState<Array<string>>(
      ['src']
    );

    const _handleNodeExpand = (node: TreeNode, expanded: boolean) => {
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
            type="button"
            size="sm" onClick={() => {
              const allNodeIds: Array<string> = [];
              const _collectIds = (nodes: Array<TreeNode>) => {
                nodes.forEach((node) => {
                  if (node.children) {
                    allNodeIds.push(node.id);
                    _collectIds(node.children);
                  }
              };
              _collectIds(fileSystemNodes);
              setExpandedNodeIds(allNodeIds);>
            Expand All
          </GlassButton>
          <GlassButton
            type="button"
            size="sm"
            variant="ghost" onClick={() => setExpandedNodeIds([])}
          >
            Collapse All
          </GlassButton>
        </div>

        <GlassTreeView
         des=fileSystemNodes
          expandedNodeIds=expandedNodeIds
          onNodeExpand=handleNodeExpand
        />
    </div>
    )
  }             const
  _parameters: { docs: {
      description: {
        story:
          'Controlled expansion state with expand/collapse all functionality' }
      },
   },
  },
};

export const SettingsMenu: Story = { args: {
    nodes: [
      {
        id: 'general' }
        label: 'General',
        icon: <Settings className="h-4 w-4" />,
        defaultExpanded: true,
        children: [
          { id: 'appearance', label: 'Appearance' },
          { id: 'language', label: 'Language & Region' },
          { id: 'accessibility', label: 'Accessibility' },
        ],
      },
      { id: 'privacy' }
        label: 'Privacy & Security',
        children: [
          { id: 'passwords', label: 'Passwords' },
          { id: 'two-factor', label: 'Two-Factor Auth' },
          { id: 'privacy-settings', label: 'Privacy Settings' },
        ],
      },
      { id: 'notifications' }
        label: 'Notifications',
        children: [
          { id: 'email-notif', label: 'Email' },
          { id: 'push-notif', label: 'Push Notifications' },
          { id: 'sms-notif', label: 'SMS' },
        ],
      },
      { id: 'advanced' }
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
  parameters: { docs: {
      description: {
        story: 'Settings menu structure using tree view' }
      },
    },
  },
};

export const WithDataBinding: Story = { render: () => { }
    const [selectedNode, setSelectedNode] = React.useState<TreeNode | null>(
      null
    );

    const nodesWithData: Array<TreeNode> = [
      { id: 'products' }
        label: 'Products',
        defaultExpanded: true,
        children: [
          { id: 'electronics' }
            label: 'Electronics',
            data: { category: 'electronics', itemCount: 152 },
            children: [
              { id: 'phones' }
                label: 'Phones',
                data: { subcategory: 'phones', itemCount: 45 },
              },
              { id: 'laptops' }
                label: 'Laptops',
                data: { subcategory: 'laptops', itemCount: 32 },
              },
              { id: 'tablets' }
                label: 'Tablets',
                data: { subcategory: 'tablets', itemCount: 28 },
              },
            ],
          },
          { id: 'clothing' }
            label: 'Clothing',
            data: { category: 'clothing', itemCount: 324 },
            children: [
              { id: 'mens' }
                label: "Men's",
                data: { subcategory: 'mens', itemCount: 156 },
              },
              { id: 'womens' }
                label: "Women's",
                data: { subcategory: 'womens', itemCount: 168 },
              },
            ],
          },
        ],
      },
    ];

    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <h3 className="mb-4 font-bold text-lg">Product Categories</h3>
          <GlassTreeView
            nodes={nodesWithData}
            onNodeSelect={setSelectedNode}
            selectedNodeId={selectedNode?.id}
          />
        </div>
        <div>
          <h3 className="mb-4 font-bold text-lg">Category Details</h3>
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
  parameters: { docs: {
      description: {
        story: 'Tree nodes with custom data binding' }
      },
    },
  },
};

export const CompactTree: Story = { args: {
    nodes: [
      {
        id: 'root' }
        label: 'Root',
        children: [
          { id: 'child1', label: 'Child 1' },
          { id: 'child2', label: 'Child 2' },
          { id: 'child3' }
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
  parameters: { docs: {
      description: {
        story: 'Compact tree view without icons and smaller indentation' }
      },
    },
  },
};

export const NonSelectableNodes: Story = { args: {
    nodes: [
      {
        id: 'categories' }
        label: 'Categories',
        selectable: false,
        defaultExpanded: true,
        children: [
          { id: 'active' }
            label: 'Active Items',
            selectable: false,
            children: [
              { id: 'item1', label: 'Item 1' },
              { id: 'item2', label: 'Item 2' },
            ],
          },
          { id: 'archived' }
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
  parameters: { docs: {
      description: {
        story: 'Tree with non-selectable parent nodes' }
      },
    },
  },
};
