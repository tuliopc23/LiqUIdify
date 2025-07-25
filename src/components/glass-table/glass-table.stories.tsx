import type { Meta, StoryObj } from '@storybook/react';
import { GlassTable } from './glass-table';

const meta = {
  title: 'Components/GlassTable',
  component: GlassTable,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A table component with glassmorphic styling for displaying structured data.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof GlassTable>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data types
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
}

// Sample data
const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Moderator', status: 'inactive' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'active' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User', status: 'active' },
];

const products: Product[] = [
  { id: 1, name: 'Laptop Pro', price: 1299.99, stock: 15, category: 'Electronics' },
  { id: 2, name: 'Wireless Mouse', price: 49.99, stock: 50, category: 'Accessories' },
  { id: 3, name: 'USB-C Hub', price: 79.99, stock: 30, category: 'Accessories' },
  { id: 4, name: 'Monitor 4K', price: 599.99, stock: 8, category: 'Electronics' },
  { id: 5, name: 'Keyboard Mechanical', price: 149.99, stock: 25, category: 'Accessories' },
];

// Basic table
export const Default: Story = {
  args: {
    data: users,
    columns: [
      { key: 'id', header: 'ID' },
      { key: 'name', header: 'Name' },
      { key: 'email', header: 'Email' },
      { key: 'role', header: 'Role' },
    ],
  },
};

// Table with custom rendering
export const WithCustomRendering: Story = {
  args: {
    data: users,
    columns: [
      { key: 'id', header: 'ID' },
      { key: 'name', header: 'Name' },
      { key: 'email', header: 'Email' },
      {
        key: 'status',
        header: 'Status',
        render: (value) => (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              value === 'active'
                ? 'bg-green-500/20 text-green-400'
                : 'bg-red-500/20 text-red-400'
            }`}
          >
            {value}
          </span>
        ),
      },
      {
        key: 'role',
        header: 'Role',
        render: (value) => (
          <span className="font-medium text-primary">{value}</span>
        ),
      },
    ],
  },
};

// Product table with price formatting
export const ProductTable: Story = {
  args: {
    data: products,
    columns: [
      { key: 'id', header: 'ID' },
      { key: 'name', header: 'Product' },
      {
        key: 'price',
        header: 'Price',
        render: (value) => (
          <span className="font-mono">${value.toFixed(2)}</span>
        ),
      },
      {
        key: 'stock',
        header: 'Stock',
        render: (value) => (
          <span
            className={`font-medium ${
              value < 10 ? 'text-red-400' : 'text-green-400'
            }`}
          >
            {value} units
          </span>
        ),
      },
      { key: 'category', header: 'Category' },
    ],
  },
};

// Empty table
export const EmptyTable: Story = {
  args: {
    data: [],
    columns: [
      { key: 'id', header: 'ID' },
      { key: 'name', header: 'Name' },
      { key: 'email', header: 'Email' },
    ],
  },
};

// Large dataset
const largeDataset = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  department: ['Sales', 'Engineering', 'Marketing', 'HR'][i % 4],
  joinDate: new Date(2020 + Math.floor(i / 12), i % 12, 1).toLocaleDateString(),
}));

export const LargeDataset: Story = {
  args: {
    data: largeDataset,
    columns: [
      { key: 'id', header: 'ID' },
      { key: 'name', header: 'Name' },
      { key: 'email', header: 'Email' },
      { key: 'department', header: 'Department' },
      { key: 'joinDate', header: 'Join Date' },
    ],
    className: 'max-h-96',
  },
};

// Styled table
export const StyledTable: Story = {
  args: {
    data: users.slice(0, 3),
    columns: [
      {
        key: 'name',
        header: 'Name',
        render: (value, item) => (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
              <span className="text-sm font-bold">{value.charAt(0)}</span>
            </div>
            <div>
              <div className="font-medium">{value}</div>
              <div className="text-xs text-secondary">{item.email}</div>
            </div>
          </div>
        ),
      },
      {
        key: 'role',
        header: 'Role',
        render: (value) => (
          <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm">
            {value}
          </span>
        ),
      },
      {
        key: 'status',
        header: 'Status',
        render: (value) => (
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                value === 'active' ? 'bg-green-400' : 'bg-red-400'
              }`}
            />
            <span className="capitalize">{value}</span>
          </div>
        ),
      },
    ],
    className: 'min-w-[600px]',
  },
};