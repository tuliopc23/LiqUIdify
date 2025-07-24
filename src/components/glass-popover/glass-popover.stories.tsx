import type { Meta, StoryObj } from "@storybook/react-vite";
// @ts-expect-error TS(6142): Module './glass-popover' was resolved to '/Users/t... Remove this comment to see the full error message
import { GlassPopover } from "./glass-popover";

const meta: Meta<typeof GlassPopover> = {
	title: "Glass/GlassPopover",
	component: GlassPopover,
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
		children: "GlassPopover Component",
	},
};

export const Secondary: Story = {
	args: {
// @ts-expect-error TS(2322): Type '{ variant: string; children: string; }' is n... Remove this comment to see the full error message
		variant: "secondary",
		children: "Secondary GlassPopover",
	},
};

export const Sizes: Story = {
	render: () => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<div className="flex items-center gap-4">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassPopover size="sm">Small</GlassPopover>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassPopover size="md">Medium</GlassPopover>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassPopover size="lg">Large</GlassPopover>
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
				<GlassPopover>Normal</GlassPopover>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassPopover disabled>Disabled</GlassPopover>
			</div>
		</div>
	),
};
