import type { Meta, StoryObj } from "@storybook/react-vite";
import { GlassTable } from "./glass-table";

const meta: Meta<typeof GlassTable> = {
	title: "Glass/GlassTable",
	component: GlassTable,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		children: "GlassTable Component",
	},
};

export const Secondary: Story = {
	args: {
		variant: "secondary",
		children: "Secondary GlassTable",
	},
};

export const Sizes: Story = {
	render: () => (
		<div className="flex items-center gap-4">
			<GlassTable size="sm">Small</GlassTable>
			<GlassTable size="md">Medium</GlassTable>
			<GlassTable size="lg">Large</GlassTable>
		</div>
	),
};

export const States: Story = {
	render: () => (
		<div className="flex flex-col gap-4">
			<div className="flex items-center gap-4">
				<GlassTable>Normal</GlassTable>
				<GlassTable disabled>Disabled</GlassTable>
			</div>
		</div>
	),
};
