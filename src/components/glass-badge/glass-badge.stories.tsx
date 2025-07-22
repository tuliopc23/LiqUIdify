import type { Meta, StoryObj } from "@storybook/react-vite";
import { GlassBadge } from "./glass-badge";

const meta: Meta<typeof GlassBadge> = {
	title: "Glass/GlassBadge",
	component: GlassBadge,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: `
# Glass Badge

The GlassBadge component is used to display statuses or labels in your application. It comes in multiple variants to fit different contexts.

## Features

- **Variants**: Default, Success, Warning, Error
- **Flexible usage**: Can be used in various parts of your application to indicate status.

## Usage

\`\`\`tsx
import { GlassBadge } from '@liquidui/react'

function App() {
  return (
    <div className="flex items-center gap-4">
      <GlassBadge variant="default">Default</GlassBadge>
      <GlassBadge variant="success">Success</GlassBadge>
      <GlassBadge variant="warning">Warning</GlassBadge>
      <GlassBadge variant="error">Error</GlassBadge>
    </div>
  )
}
\`\`\`
        `,
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: { type: "select" },
			options: ["default", "success", "warning", "error"],
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "Default Badge",
	},
};

export const Success: Story = {
	args: {
		variant: "success",
		children: "Success Badge",
	},
};

export const Warning: Story = {
	args: {
		variant: "warning",
		children: "Warning Badge",
	},
};

export const Error: Story = {
	args: {
		variant: "error",
		children: "Error Badge",
	},
};

export const AllVariants: Story = {
	render: () => (
		<div className="flex items-center gap-4">
			<GlassBadge variant="default">Default</GlassBadge>
			<GlassBadge variant="success">Success</GlassBadge>
			<GlassBadge variant="warning">Warning</GlassBadge>
			<GlassBadge variant="error">Error</GlassBadge>
		</div>
	),
};

export const Examples: Story = {
	render: () => (
		<div className="flex flex-col gap-4">
			<div className="flex items-center gap-4">
				<GlassBadge>New</GlassBadge>
				<GlassBadge variant="success">Available</GlassBadge>
				<GlassBadge variant="warning">Pending</GlassBadge>
				<GlassBadge variant="error">Sold Out</GlassBadge>
			</div>
			<div className="flex items-center gap-4">
				<GlassBadge>Draft</GlassBadge>
				<GlassBadge variant="success">Published</GlassBadge>
				<GlassBadge variant="warning">Review</GlassBadge>
				<GlassBadge variant="error">Rejected</GlassBadge>
			</div>
		</div>
	),
};
