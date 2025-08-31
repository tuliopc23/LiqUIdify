import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { LiquidButton } from "../liquid-button";
import { LiquidList } from "./liquid-list";

const meta: Meta<typeof LiquidList> = {
  title: "Data Display/LiquidList",
  component: LiquidList,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A flexible list component with multiple layouts, selection, search, and drag & drop sorting capabilities.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: "600px",
          minWidth: "800px",
          padding: "2rem",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "12px",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof LiquidList>;

// Sample data
const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    avatar: "JD",
    status: "online",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    avatar: "JS",
    status: "offline",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "Editor",
    avatar: "MJ",
    status: "online",
  },
  {
    id: 4,
    name: "Sarah Williams",
    email: "sarah@example.com",
    role: "User",
    avatar: "SW",
    status: "away",
  },
  {
    id: 5,
    name: "David Brown",
    email: "david@example.com",
    role: "Admin",
    avatar: "DB",
    status: "online",
  },
];

const projects = [
  {
    id: 1,
    name: "Website Redesign",
    status: "In Progress",
    progress: 75,
    team: 4,
    dueDate: "2024-04-01",
  },
  { id: 2, name: "Mobile App", status: "Planning", progress: 25, team: 6, dueDate: "2024-05-15" },
  {
    id: 3,
    name: "API Integration",
    status: "Completed",
    progress: 100,
    team: 2,
    dueDate: "2024-03-20",
  },
  {
    id: 4,
    name: "Database Migration",
    status: "On Hold",
    progress: 45,
    team: 3,
    dueDate: "2024-04-30",
  },
];

const simpleItems = ["Apple", "Banana", "Cherry", "Date", "Elderberry", "Fig", "Grape"];

// Icons
const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708L10.5 8.207l-3-3L12.146.146zM11.207 9l-3-3L2.5 11.707V13.5a.5.5 0 0 0 .5.5h1.793L11.207 9z" />
  </svg>
);

const DeleteIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Z" />
  </svg>
);

const ViewIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1ZM7 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm.25-6.25a.75.75 0 0 0-1.5 0v3.5a.75.75 0 0 0 1.5 0v-3.5Z" />
  </svg>
);

export const Default: Story = {
  args: {
    data: simpleItems,
  },
};

export const CustomItems: Story = {
  args: {
    data: users,
    renderItem: (user) => (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center">
          <span className="text-white font-medium text-sm">{user.avatar}</span>
        </div>
        <div className="flex-1">
          <div className="font-medium text-white">{user.name}</div>
          <div className="text-sm text-white/70">{user.email}</div>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              user.status === "online"
                ? "bg-green-400"
                : user.status === "away"
                  ? "bg-yellow-400"
                  : "bg-gray-400"
            }`}
          />
          <span className="text-xs text-white/60 capitalize">{user.status}</span>
        </div>
      </div>
    ),
  },
};

export const WithSelection: Story = {
  render: () => {
    const [selectedItems, setSelectedItems] = useState<(string | number)[]>([]);

    return (
      <div className="space-y-4">
        <div className="bg-white/10 p-3 rounded-lg">
          <div className="text-white/80 text-sm">Selected: {selectedItems.length} items</div>
        </div>

        <LiquidList
          data={users}
          selectable
          multiSelect
          selectedItems={selectedItems}
          onSelectionChange={(keys, data) => {
            setSelectedItems(keys);
            console.log("Selection changed:", keys, data);
          }}
          renderItem={(user) => (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">{user.avatar}</span>
              </div>
              <div className="flex-1">
                <div className="font-medium text-white">{user.name}</div>
                <div className="text-sm text-white/70">{user.role}</div>
              </div>
            </div>
          )}
        />
      </div>
    );
  },
};

export const WithActions: Story = {
  render: () => {
    const [data, setData] = useState(users);

    const actions = [
      {
        key: "edit",
        label: "Edit",
        icon: <EditIcon />,
        onClick: (item: any) => console.log("Edit:", item),
      },
      {
        key: "view",
        label: "View",
        icon: <ViewIcon />,
        onClick: (item: any) => console.log("View:", item),
      },
      {
        key: "delete",
        label: "Delete",
        icon: <DeleteIcon />,
        variant: "destructive" as const,
        onClick: (item: any) => {
          setData((prev) => prev.filter((u) => u.id !== item.id));
        },
      },
    ];

    return (
      <LiquidList
        data={data}
        actions={actions}
        showActions="hover"
        renderItem={(user) => (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">{user.avatar}</span>
            </div>
            <div className="flex-1">
              <div className="font-medium text-white">{user.name}</div>
              <div className="text-sm text-white/70">{user.email}</div>
            </div>
          </div>
        )}
      />
    );
  },
};

export const HorizontalLayout: Story = {
  args: {
    data: users.slice(0, 4),
    layout: "horizontal",
    renderItem: (user) => (
      <div className="flex flex-col items-center gap-2 p-4 min-w-[120px]">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center">
          <span className="text-white font-medium">{user.avatar}</span>
        </div>
        <div className="text-center">
          <div className="font-medium text-white text-sm">{user.name}</div>
          <div className="text-xs text-white/70">{user.role}</div>
        </div>
      </div>
    ),
  },
};

export const GridLayout: Story = {
  args: {
    data: projects,
    layout: "grid",
    gridCols: 2,
    gap: 16,
    renderItem: (project) => (
      <div className="p-4 bg-white/5 rounded-lg border border-white/10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-white">{project.name}</h3>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              project.status === "Completed"
                ? "bg-green-500/20 text-green-200"
                : project.status === "In Progress"
                  ? "bg-blue-500/20 text-blue-200"
                  : project.status === "On Hold"
                    ? "bg-red-500/20 text-red-200"
                    : "bg-yellow-500/20 text-yellow-200"
            }`}
          >
            {project.status}
          </span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-white/70">
            <span>Progress</span>
            <span>{project.progress}%</span>
          </div>
          <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-400 to-green-400 rounded-full"
              style={{ width: `${project.progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-white/60">
            <span>{project.team} team members</span>
            <span>Due: {project.dueDate}</span>
          </div>
        </div>
      </div>
    ),
  },
};

export const GroupedList: Story = {
  args: {
    data: users,
    groupBy: "role",
    groupHeader: (group, items) => (
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-white">{group}</h3>
        <span className="text-sm text-white/60">{items.length} users</span>
      </div>
    ),
    renderItem: (user) => (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-medium">{user.avatar}</span>
        </div>
        <div className="flex-1">
          <div className="font-medium text-white">{user.name}</div>
          <div className="text-sm text-white/70">{user.email}</div>
        </div>
      </div>
    ),
  },
};

export const WithSearch: Story = {
  render: () => {
    const [search, setSearch] = useState("");

    return (
      <div className="space-y-4">
        <div className="bg-white/10 p-4 rounded-lg">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>

        <LiquidList
          data={users}
          search={search}
          searchFields={["name", "email", "role"]}
          renderItem={(user) => (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">{user.avatar}</span>
              </div>
              <div className="flex-1">
                <div className="font-medium text-white">{user.name}</div>
                <div className="text-sm text-white/70">
                  {user.email} • {user.role}
                </div>
              </div>
            </div>
          )}
          emptyText="No users found matching your search."
        />
      </div>
    );
  },
};

export const LoadingState: Story = {
  args: {
    data: [],
    loading: true,
    loadingText: "Loading users...",
  },
};

export const EmptyState: Story = {
  args: {
    data: [],
    emptyText: (
      <div className="text-center py-8">
        <div className="text-white/40 mb-4 text-lg">No items found</div>
        <LiquidButton size="sm">Add New Item</LiquidButton>
      </div>
    ),
  },
};

export const WithHeaderFooter: Story = {
  args: {
    data: users,
    header: (
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-white">Team Members</h2>
        <LiquidButton size="sm">Add Member</LiquidButton>
      </div>
    ),
    footer: (
      <div className="text-center text-sm text-white/70">
        Showing {users.length} of {users.length} members
      </div>
    ),
    renderItem: (user) => (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-medium">{user.avatar}</span>
        </div>
        <div className="flex-1">
          <div className="font-medium text-white">{user.name}</div>
          <div className="text-sm text-white/70">{user.role}</div>
        </div>
      </div>
    ),
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-white font-medium mb-4">Default</h3>
        <LiquidList data={simpleItems.slice(0, 4)} />
      </div>

      <div>
        <h3 className="text-white font-medium mb-4">Card</h3>
        <LiquidList data={simpleItems.slice(0, 4)} variant="card" />
      </div>

      <div>
        <h3 className="text-white font-medium mb-4">Minimal</h3>
        <LiquidList data={simpleItems.slice(0, 4)} variant="minimal" divider={false} />
      </div>

      <div>
        <h3 className="text-white font-medium mb-4">Bordered</h3>
        <LiquidList data={simpleItems.slice(0, 4)} variant="bordered" />
      </div>
    </div>
  ),
};

// Interactive comprehensive demo
export const Interactive: Story = {
  render: () => {
    const [data, setData] = useState(users);
    const [selectedItems, setSelectedItems] = useState<(string | number)[]>([]);
    const [layout, setLayout] = useState<"vertical" | "horizontal" | "grid">("vertical");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const handleDelete = (item: any) => {
      setData((prev) => prev.filter((u) => u.id !== item.id));
      setSelectedItems((prev) => prev.filter((key) => key !== item.id));
    };

    const handleBulkDelete = () => {
      setData((prev) => prev.filter((item) => !selectedItems.includes(item.id)));
      setSelectedItems([]);
    };

    const handleRefresh = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setData(users);
      setLoading(false);
    };

    const actions = [
      {
        key: "edit",
        label: "Edit",
        icon: <EditIcon />,
        onClick: (item: any) => console.log("Edit:", item),
      },
      {
        key: "delete",
        label: "Delete",
        icon: <DeleteIcon />,
        variant: "destructive" as const,
        onClick: handleDelete,
      },
    ];

    return (
      <div className="space-y-4">
        {/* Controls */}
        <div className="bg-white/10 p-4 rounded-lg space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LiquidButton size="sm" onClick={handleRefresh} disabled={loading}>
                {loading ? "Refreshing..." : "Refresh"}
              </LiquidButton>
              {selectedItems.length > 0 && (
                <LiquidButton size="sm" variant="destructive" onClick={handleBulkDelete}>
                  Delete Selected ({selectedItems.length})
                </LiquidButton>
              )}
            </div>
            <div className="text-sm text-white/70">
              {data.length} items • {selectedItems.length} selected
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-white/80 mb-2">Search:</label>
              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>

            <div>
              <label className="block text-sm text-white/80 mb-2">Layout:</label>
              <div className="flex gap-1">
                {(["vertical", "horizontal", "grid"] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLayout(l)}
                    className={`px-3 py-2 text-sm rounded transition-colors capitalize ${
                      layout === l
                        ? "bg-blue-500/30 text-blue-200"
                        : "bg-white/10 text-white/80 hover:bg-white/20"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* List */}
        <LiquidList
          data={data}
          layout={layout}
          gridCols={layout === "grid" ? 2 : 3}
          loading={loading}
          search={search}
          searchFields={["name", "email", "role"]}
          selectable
          multiSelect
          selectedItems={selectedItems}
          onSelectionChange={(keys, _selectedData) => {
            setSelectedItems(keys);
          }}
          actions={actions}
          showActions="hover"
          onItemClick={(item) => console.log("Item clicked:", item)}
          renderItem={(user) => (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">{user.avatar}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-white truncate">{user.name}</div>
                <div className="text-sm text-white/70 truncate">
                  {user.email} • {user.role}
                </div>
              </div>
              <div
                className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  user.status === "online"
                    ? "bg-green-400"
                    : user.status === "away"
                      ? "bg-yellow-400"
                      : "bg-gray-400"
                }`}
              />
            </div>
          )}
          emptyText="No users found matching your search."
        />
      </div>
    );
  },
};
