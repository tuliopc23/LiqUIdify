import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { LiquidButton } from "../liquid-button";
import { LiquidTable } from "./liquid-table";

const meta: Meta<typeof LiquidTable> = {
  title: "Data Display/LiquidTable",
  component: LiquidTable,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A data table component with Apple HIG liquid glass design, featuring sorting, filtering, pagination, and row selection.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "card", "minimal", "striped"],
      description: "Visual style variant",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the table",
    },
    loading: {
      control: "boolean",
      description: "Loading state",
    },
    bordered: {
      control: "boolean",
      description: "Show borders",
    },
    showHeader: {
      control: "boolean",
      description: "Show table header",
    },
    sticky: {
      control: "boolean",
      description: "Sticky header",
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: "600px",
          minWidth: "1000px",
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
type Story = StoryObj<typeof LiquidTable>;

// Sample data
const sampleData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
    lastLogin: "2024-03-15",
    score: 95,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "Active",
    lastLogin: "2024-03-14",
    score: 87,
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "Editor",
    status: "Inactive",
    lastLogin: "2024-03-10",
    score: 92,
  },
  {
    id: 4,
    name: "Sarah Williams",
    email: "sarah@example.com",
    role: "User",
    status: "Active",
    lastLogin: "2024-03-13",
    score: 78,
  },
  {
    id: 5,
    name: "David Brown",
    email: "david@example.com",
    role: "Admin",
    status: "Active",
    lastLogin: "2024-03-15",
    score: 89,
  },
  {
    id: 6,
    name: "Lisa Davis",
    email: "lisa@example.com",
    role: "Editor",
    status: "Active",
    lastLogin: "2024-03-12",
    score: 94,
  },
  {
    id: 7,
    name: "Tom Wilson",
    email: "tom@example.com",
    role: "User",
    status: "Inactive",
    lastLogin: "2024-03-08",
    score: 83,
  },
  {
    id: 8,
    name: "Amy Taylor",
    email: "amy@example.com",
    role: "Admin",
    status: "Active",
    lastLogin: "2024-03-14",
    score: 91,
  },
];

const basicColumns = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email", sortable: true },
  { key: "role", title: "Role", dataIndex: "role", sortable: true },
  { key: "status", title: "Status", dataIndex: "status", sortable: true },
];

const advancedColumns = [
  {
    key: "name",
    title: "Name",
    dataIndex: "name",
    sortable: true,
    width: 150,
    render: (value: string, _record: any) => (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-medium">{value.charAt(0)}</span>
        </div>
        <span className="font-medium">{value}</span>
      </div>
    ),
  },
  {
    key: "email",
    title: "Email",
    dataIndex: "email",
    sortable: true,
    width: 200,
  },
  {
    key: "role",
    title: "Role",
    dataIndex: "role",
    sortable: true,
    width: 100,
    render: (value: string) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === "Admin"
            ? "bg-red-500/20 text-red-200"
            : value === "Editor"
              ? "bg-blue-500/20 text-blue-200"
              : "bg-green-500/20 text-green-200"
        }`}
      >
        {value}
      </span>
    ),
  },
  {
    key: "status",
    title: "Status",
    dataIndex: "status",
    sortable: true,
    width: 100,
    render: (value: string) => (
      <div className="flex items-center gap-2">
        <div
          className={`w-2 h-2 rounded-full ${value === "Active" ? "bg-green-400" : "bg-gray-400"}`}
        />
        <span>{value}</span>
      </div>
    ),
  },
  {
    key: "lastLogin",
    title: "Last Login",
    dataIndex: "lastLogin",
    sortable: true,
    width: 120,
  },
  {
    key: "score",
    title: "Score",
    dataIndex: "score",
    sortable: true,
    width: 100,
    align: "right" as const,
    render: (value: number) => (
      <div className="flex items-center justify-end gap-2">
        <div className="w-12 h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-400 to-green-400 rounded-full"
            style={{ width: `${value}%` }}
          />
        </div>
        <span className="text-sm">{value}</span>
      </div>
    ),
  },
  {
    key: "actions",
    title: "Actions",
    width: 120,
    render: (_value: any, _record: any) => (
      <div className="flex gap-1">
        <LiquidButton size="sm" variant="ghost">
          Edit
        </LiquidButton>
        <LiquidButton size="sm" variant="destructive">
          Delete
        </LiquidButton>
      </div>
    ),
  },
];

export const Default: Story = {
  args: {
    columns: basicColumns,
    data: sampleData,
  },
};

export const WithSelection: Story = {
  render: () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>([]);

    return (
      <LiquidTable
        columns={basicColumns}
        data={sampleData}
        rowSelection={{
          selectedRowKeys,
          onSelect: (record, selected, selectedRows) => {
            console.log("Row selected:", record, selected, selectedRows);
          },
          onSelectAll: (selected, selectedRows, changeRows) => {
            const keys = selected ? sampleData.map((item) => item.id) : [];
            setSelectedRowKeys(keys);
            console.log("Select all:", selected, selectedRows, changeRows);
          },
        }}
      />
    );
  },
};

export const AdvancedRendering: Story = {
  args: {
    columns: advancedColumns,
    data: sampleData,
    variant: "card",
  },
};

export const WithPagination: Story = {
  render: () => {
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    const paginatedData = sampleData.slice((current - 1) * pageSize, current * pageSize);

    return (
      <LiquidTable
        columns={advancedColumns}
        data={paginatedData}
        pagination={{
          current,
          pageSize,
          total: sampleData.length,
          onChange: (page, size) => {
            setCurrent(page);
            setPageSize(size || pageSize);
          },
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        }}
      />
    );
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-white font-medium mb-4">Default</h3>
        <LiquidTable columns={basicColumns} data={sampleData.slice(0, 4)} />
      </div>

      <div>
        <h3 className="text-white font-medium mb-4">Card</h3>
        <LiquidTable columns={basicColumns} data={sampleData.slice(0, 4)} variant="card" />
      </div>

      <div>
        <h3 className="text-white font-medium mb-4">Striped</h3>
        <LiquidTable columns={basicColumns} data={sampleData.slice(0, 4)} variant="striped" />
      </div>

      <div>
        <h3 className="text-white font-medium mb-4">Minimal</h3>
        <LiquidTable columns={basicColumns} data={sampleData.slice(0, 4)} variant="minimal" />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-white font-medium mb-4">Small</h3>
        <LiquidTable columns={basicColumns} data={sampleData.slice(0, 3)} size="sm" />
      </div>

      <div>
        <h3 className="text-white font-medium mb-4">Medium (Default)</h3>
        <LiquidTable columns={basicColumns} data={sampleData.slice(0, 3)} size="md" />
      </div>

      <div>
        <h3 className="text-white font-medium mb-4">Large</h3>
        <LiquidTable columns={basicColumns} data={sampleData.slice(0, 3)} size="lg" />
      </div>
    </div>
  ),
};

export const Loading: Story = {
  args: {
    columns: basicColumns,
    data: [],
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    columns: basicColumns,
    data: [],
    emptyText: (
      <div className="text-center py-8">
        <div className="text-white/40 mb-2">No data found</div>
        <LiquidButton size="sm">Add New Item</LiquidButton>
      </div>
    ),
  },
};

export const Scrollable: Story = {
  args: {
    columns: [
      ...advancedColumns,
      { key: "extra1", title: "Extra 1", dataIndex: "name", width: 150 },
      { key: "extra2", title: "Extra 2", dataIndex: "email", width: 150 },
      { key: "extra3", title: "Extra 3", dataIndex: "role", width: 150 },
    ],
    data: sampleData,
    scroll: { x: 1200, y: 300 },
    sticky: true,
  },
};

export const CustomRowProps: Story = {
  render: () => {
    const [clickedRow, setClickedRow] = useState<any>(null);

    return (
      <div className="space-y-4">
        {clickedRow && (
          <div className="bg-blue-500/20 p-3 rounded-lg border border-blue-500/30">
            <div className="text-blue-200 text-sm">Last clicked row:</div>
            <div className="text-white font-medium">
              {clickedRow.name} - {clickedRow.email}
            </div>
          </div>
        )}

        <LiquidTable
          columns={basicColumns}
          data={sampleData}
          onRow={(record, _index) => ({
            onClick: () => setClickedRow(record),
            onDoubleClick: () => console.log("Double clicked:", record),
            onContextMenu: (e) => {
              e.preventDefault();
              console.log("Right clicked:", record);
            },
          })}
        />
      </div>
    );
  },
};

export const SortingAndFiltering: Story = {
  render: () => {
    const [sortState, setSortState] = useState<{ columnKey: string; order: "asc" | "desc" | null }>(
      {
        columnKey: "",
        order: null,
      }
    );

    const sortedData = React.useMemo(() => {
      if (!sortState.order || !sortState.columnKey) return sampleData;

      return [...sampleData].sort((a, b) => {
        const aVal = a[sortState.columnKey as keyof typeof a];
        const bVal = b[sortState.columnKey as keyof typeof b];

        if (typeof aVal === "string" && typeof bVal === "string") {
          const result = aVal.localeCompare(bVal);
          return sortState.order === "desc" ? -result : result;
        }

        if (typeof aVal === "number" && typeof bVal === "number") {
          const result = aVal - bVal;
          return sortState.order === "desc" ? -result : result;
        }

        return 0;
      });
    }, [sortState]);

    return (
      <div className="space-y-4">
        <div className="bg-white/10 p-3 rounded-lg">
          <div className="text-white/80 text-sm">
            Current sort:{" "}
            {sortState.columnKey ? `${sortState.columnKey} (${sortState.order})` : "None"}
          </div>
        </div>

        <LiquidTable
          columns={basicColumns}
          data={sortedData}
          onSort={(columnKey, order) => {
            setSortState({ columnKey, order });
          }}
        />
      </div>
    );
  },
};

// Interactive story with full state management
export const Interactive: Story = {
  render: () => {
    const [data, setData] = useState(sampleData);
    const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>([]);
    const [loading, setLoading] = useState(false);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    const handleDelete = (record: any) => {
      setData((prev) => prev.filter((item) => item.id !== record.id));
      setSelectedRowKeys((prev) => prev.filter((key) => key !== record.id));
    };

    const handleBulkDelete = () => {
      setData((prev) => prev.filter((item) => !selectedRowKeys.includes(item.id)));
      setSelectedRowKeys([]);
    };

    const handleRefresh = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
    };

    const columns = [
      ...advancedColumns.slice(0, -1), // Remove default actions column
      {
        key: "actions",
        title: "Actions",
        width: 120,
        render: (_value: any, record: any) => (
          <div className="flex gap-1">
            <LiquidButton size="sm" variant="ghost" onClick={() => console.log("Edit:", record)}>
              Edit
            </LiquidButton>
            <LiquidButton size="sm" variant="destructive" onClick={() => handleDelete(record)}>
              Delete
            </LiquidButton>
          </div>
        ),
      },
    ];

    const paginatedData = data.slice((current - 1) * pageSize, current * pageSize);

    return (
      <div className="space-y-4">
        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LiquidButton size="sm" onClick={handleRefresh} disabled={loading}>
              {loading ? "Refreshing..." : "Refresh"}
            </LiquidButton>
            {selectedRowKeys.length > 0 && (
              <LiquidButton size="sm" variant="destructive" onClick={handleBulkDelete}>
                Delete Selected ({selectedRowKeys.length})
              </LiquidButton>
            )}
          </div>

          <div className="text-sm text-white/70">{data.length} total items</div>
        </div>

        {/* Table */}
        <LiquidTable
          columns={columns}
          data={paginatedData}
          loading={loading}
          rowSelection={{
            selectedRowKeys,
            onSelect: (record, selected, _selectedRows) => {
              const newKeys = selected
                ? [...selectedRowKeys, record.id]
                : selectedRowKeys.filter((key) => key !== record.id);
              setSelectedRowKeys(newKeys);
            },
            onSelectAll: (selected, _selectedRows, _changeRows) => {
              const keys = selected ? paginatedData.map((item) => item.id) : [];
              setSelectedRowKeys(keys);
            },
          }}
          pagination={{
            current,
            pageSize,
            total: data.length,
            onChange: (page, size) => {
              setCurrent(page);
              setPageSize(size || pageSize);
            },
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`,
          }}
          onRow={(record) => ({
            onClick: () => console.log("Row clicked:", record),
            onDoubleClick: () => console.log("Row double-clicked:", record),
          })}
        />
      </div>
    );
  },
};
