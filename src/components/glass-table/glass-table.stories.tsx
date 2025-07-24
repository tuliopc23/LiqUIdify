import type { Meta, StoryObj } from "@storybook/react-vite";
// @ts-expect-error TS(6142): Module './glass-table' was resolved to '/Users/tul... Remove this comment to see the full error message
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
// @ts-expect-error TS(2322): Type '{ children: string; }' is not assignable to ... Remove this comment to see the full error message
		children: "GlassTable Component",
	},
};

export const Secondary: Story = {
	args: {
// @ts-expect-error TS(2322): Type '{ variant: string; children: string; }' is n... Remove this comment to see the full error message
		variant: "secondary",
		children: "Secondary GlassTable",
	},
};

export const Sizes: Story = {
	render: () => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<div className="flex items-center gap-4">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassTable size="sm">Small</GlassTable>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassTable size="md">Medium</GlassTable>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassTable size="lg">Large</GlassTable>
		</div>
	),
};

export const States: Story = {
	render: () => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<div className="flex flex-col gap-4">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="flex items-center gap-4">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassTable>Normal</GlassTable>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassTable disabled>Disabled</GlassTable>
			</div>
		</div>
	),
};
