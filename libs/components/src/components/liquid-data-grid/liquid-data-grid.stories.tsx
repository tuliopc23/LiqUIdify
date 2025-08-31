import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { LiquidButton } from "../liquid-button";
import { LiquidDataGrid } from "./liquid-data-grid";

const meta: Meta<typeof LiquidDataGrid> = {
  title: "Data Display/LiquidDataGrid",
  component: LiquidDataGrid,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "An advanced data grid with virtual scrolling, column resizing, inline editing, and filtering capabilities.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: "700px",
          minWidth: "1200px",
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
type Story = StoryObj<typeof LiquidDataGrid>;

// Generate large dataset for virtual scrolling demo
const generateLargeDataset = (count: number) => {
  const names = ["John", "Jane", "Mike", "Sarah", "David", "Lisa", "Tom", "Amy", "Chris", "Emma"];
  const roles = ["Admin", "User", "Editor", "Manager"];
  const statuses = ["Active", "Inactive", "Pending"];
  const departments = ["Engineering", "Marketing", "Sales", "HR", "Finance"];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `${names[i % names.length]} ${Math.floor(i / names.length) + 1}`,
    email: `user${i + 1}@example.com`,
    role: roles[i % roles.length],
    status: statuses[i % statuses.length],
    department: departments[i % departments.length],
    salary: 40000 + Math.floor(Math.random() * 80000),
    score: Math.floor(Math.random() * 100),
    joinDate: new Date(
      2020 + Math.floor(Math.random() * 4),
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28) + 1
    )
      .toISOString()
      .split("T")[0],
    isActive: Math.random() > 0.3,
  }));
};

const sampleData = generateLargeDataset(1000);
const smallData = sampleData.slice(0, 20);

const basicColumns = [
  {
    key: "name",
    title: "Name",
    dataIndex: "name",
    width: 150,
    sortable: true,
    filterable: true,
    filterType: "text" as const,
  },
  {
    key: "email",
    title: "Email",
    dataIndex: "email",
    width: 200,
    sortable: true,
    filterable: true,
    filterType: "text" as const,
  },
  {
    key: "role",
    title: "Role",
    dataIndex: "role",
    width: 120,
    sortable: true,
    filterable: true,
    filterType: "select" as const,
    filterOptions: [
      { label: "Admin", value: "Admin" },
      { label: "User", value: "User" },
      { label: "Editor", value: "Editor" },
      { label: "Manager", value: "Manager" },
    ],
  },
  {
    key: "status",
    title: "Status",
    dataIndex: "status",
    width: 100,
    sortable: true,
    render: (value: string) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === "Active"
            ? "bg-green-500/20 text-green-200"
            : value === "Inactive"
              ? "bg-red-500/20 text-red-200"
              : "bg-yellow-500/20 text-yellow-200"
        }`}
      >
        {value}
      </span>
    ),
  },
];

const advancedColumns = [
  {
    key: "name",
    title: "Name",
    dataIndex: "name",
    width: 150,
    sortable: true,
    filterable: true,
    frozen: "left" as const,
    editor: "text" as const,
    render: (value: string) => (
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
    width: 200,
    sortable: true,
    filterable: true,
    editor: "text" as const,
  },
  {
    key: "role",
    title: "Role",
    dataIndex: "role",
    width: 120,
    sortable: true,
    filterable: true,
    filterType: "select" as const,
    filterOptions: [
      { label: "Admin", value: "Admin" },
      { label: "User", value: "User" },
      { label: "Editor", value: "Editor" },
      { label: "Manager", value: "Manager" },
    ],
    editor: "select" as const,
    editorProps: {
      options: [
        { label: "Admin", value: "Admin" },
        { label: "User", value: "User" },
        { label: "Editor", value: "Editor" },
        { label: "Manager", value: "Manager" },
      ],
    },
  },
  {
    key: "department",
    title: "Department",
    dataIndex: "department",
    width: 120,
    sortable: true,
    filterable: true,
  },
  {
    key: "salary",
    title: "Salary",
    dataIndex: "salary",
    width: 120,
    sortable: true,
    align: "right" as const,
    editor: "number" as const,
    render: (value: number) => `$${value.toLocaleString()}`,
  },
  {
    key: "score",
    title: "Score",
    dataIndex: "score",
    width: 120,
    sortable: true,
    align: "center" as const,
    render: (value: number) => (
      <div className="flex items-center justify-center gap-2">
        <div className="w-16 h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 rounded-full"
            style={{ width: `${value}%` }}
          />
        </div>
        <span className="text-sm">{value}</span>
      </div>
    ),
  },
  {
    key: "joinDate",
    title: "Join Date",
    dataIndex: "joinDate",
    width: 120,
    sortable: true,
    editor: "date" as const,
  },
  {
    key: "isActive",
    title: "Active",
    dataIndex: "isActive",
    width: 80,
    align: "center" as const,
    editor: "boolean" as const,
    render: (value: boolean) => (
      <div className="flex justify-center">
        <div className={`w-2 h-2 rounded-full ${value ? "bg-green-400" : "bg-gray-400"}`} />
      </div>
    ),
  },
  {
    key: "actions",
    title: "Actions",
    width: 120,
    frozen: "right" as const,
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
    data: smallData,
    height: 400,
  },
};

export const VirtualScrolling: Story = {
  args: {
    columns: advancedColumns,
    data: sampleData,
    height: 500,
    virtualized: true,
  },
};

export const WithSelection: Story = {
  render: () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>([]);

    return (
      <LiquidDataGrid
        columns={basicColumns}
        data={smallData}
        height={400}
        rowSelection={{
          selectedRowKeys,
          onChange: (keys, rows) => {
            setSelectedRowKeys(keys);
            console.log("Selection changed:", keys, rows);
          },
        }}
      />
    );
  },
};

export const EditableGrid: Story = {
  render: () => {
    const [data, setData] = useState(smallData);

    const handleCellEdit = (record: any, column: any, value: any) => {
      const newData = data.map((item) =>
        item.id === record.id ? { ...item, [column.dataIndex]: value } : item
      );
      setData(newData);
      console.log("Cell edited:", record, column.dataIndex, value);
    };

    return (
      <LiquidDataGrid
        columns={advancedColumns}
        data={data}
        height={500}
        editable
        onCellEdit={handleCellEdit}
        onRowDoubleClick={(record, _index) => {
          console.log("Row double-clicked for editing:", record);
        }}
      />
    );
  },
};

export const WithFiltering: Story = {
  render: () => {
    const [filteredData, setFilteredData] = useState(smallData);

    const handleFilter = (filters: Record<string, any>) => {
      let result = smallData;

      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          result = result.filter((item) => {
            const itemValue = item[key as keyof typeof item];
            if (typeof itemValue === "string") {
              return itemValue.toLowerCase().includes(value.toLowerCase());
            }
            return itemValue === value;
          });
        }
      });

      setFilteredData(result);
    };

    return (
      <div className="space-y-4">
        <div className="bg-white/10 p-3 rounded-lg">
          <div className="text-white/80 text-sm">
            Showing {filteredData.length} of {smallData.length} items
          </div>
        </div>

        <LiquidDataGrid
          columns={advancedColumns}
          data={filteredData}
          height={500}
          filterable
          onFilter={handleFilter}
        />
      </div>
    );
  },
};

export const ResizableColumns: Story = {
  render: () => {
    const [columns, setColumns] = useState(advancedColumns);

    const handleColumnResize = (column: any, width: number) => {
      const newColumns = columns.map((col) => (col.key === column.key ? { ...col, width } : col));
      setColumns(newColumns);
      console.log("Column resized:", column.key, width);
    };

    return (
      <LiquidDataGrid
        columns={columns}
        data={smallData}
        height={500}
        resizable
        onColumnResize={handleColumnResize}
      />
    );
  },
};

export const FrozenColumns: Story = {
  args: {
    columns: [
      { ...advancedColumns[0], frozen: "left" },
      ...advancedColumns.slice(1, -1),
      { ...advancedColumns[advancedColumns.length - 1], frozen: "right" },
    ],
    data: smallData,
    height: 400,
  },
};

export const LoadingState: Story = {
  args: {
    columns: basicColumns,
    data: [],
    height: 400,
    loading: true,
  },
};

export const EmptyState: Story = {
  args: {
    columns: basicColumns,
    data: [],
    height: 400,
    emptyText: (
      <div className="text-center py-8">
        <div className="text-white/40 mb-4 text-lg">No data available</div>
        <LiquidButton>Add New Record</LiquidButton>
      </div>
    ),
  },
};

export const CompactGrid: Story = {
  args: {
    columns: basicColumns,
    data: smallData,
    height: 300,
    rowHeight: 32,
    headerHeight: 32,
    size: "sm",
    variant: "minimal",
  },
};

export const StripedRows: Story = {
  args: {
    columns: basicColumns,
    data: smallData,
    height: 400,
    striped: true,
  },
};

// Interactive comprehensive demo
export const Interactive: Story = {
  render: () => {
    const [data, setData] = useState(smallData);
    const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>([]);
    const [loading, setLoading] = useState(false);
    const [editableMode, setEditableMode] = useState(false);

    const handleCellEdit = (record: any, column: any, value: any) => {
      const newData = data.map((item) =>
        item.id === record.id ? { ...item, [column.dataIndex]: value } : item
      );
      setData(newData);
    };

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
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setData(generateLargeDataset(20));
      setLoading(false);
    };

    const columnsWithActions = [
      ...advancedColumns.slice(0, -1),
      {
        key: "actions",
        title: "Actions",
        width: 120,
        frozen: "right" as const,
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

    return (
      <div className="space-y-4">
        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LiquidButton size="sm" onClick={handleRefresh} disabled={loading}>
              {loading ? "Refreshing..." : "Refresh"}
            </LiquidButton>
            <LiquidButton
              size="sm"
              variant={editableMode ? "default" : "ghost"}
              onClick={() => setEditableMode(!editableMode)}
            >
              {editableMode ? "Exit Edit" : "Edit Mode"}
            </LiquidButton>
            {selectedRowKeys.length > 0 && (
              <LiquidButton size="sm" variant="destructive" onClick={handleBulkDelete}>
                Delete Selected ({selectedRowKeys.length})
              </LiquidButton>
            )}
          </div>

          <div className="text-sm text-white/70">
            {data.length} items • {selectedRowKeys.length} selected
          </div>
        </div>

        {/* Grid */}
        <LiquidDataGrid
          columns={columnsWithActions}
          data={data}
          height={500}
          loading={loading}
          editable={editableMode}
          onCellEdit={handleCellEdit}
          rowSelection={{
            selectedRowKeys,
            onChange: (keys, _rows) => {
              setSelectedRowKeys(keys);
            },
          }}
          sortable
          filterable
          resizable
          striped
          onRowDoubleClick={(record, _index) => {
            console.log("Double-clicked row:", record);
          }}
        />

        {/* Status */}
        <div className="bg-white/10 p-3 rounded-lg text-sm text-white/70">
          <div>
            Grid Features: Virtual Scrolling • Column Resizing • Inline Editing • Filtering •
            Sorting
          </div>
          <div>
            Edit Mode: {editableMode ? "Enabled" : "Disabled"} • Double-click cells to edit when
            enabled
          </div>
        </div>
      </div>
    );
  },
};
