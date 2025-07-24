import type { Meta, StoryObj } from "@storybook/react-vite";
// @ts-expect-error TS(6142): Module './glass-tooltip' was resolved to '/Users/t... Remove this comment to see the full error message
import { GlassTooltip } from "./glass-tooltip";

const meta: Meta<typeof GlassTooltip> = {
	title: "Glass/GlassTooltip",
	component: GlassTooltip,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		children: "GlassTooltip Component",
	},
};

export const Secondary: Story = {
	args: {
// @ts-expect-error TS(2322): Type '{ variant: string; children: string; }' is n... Remove this comment to see the full error message
		variant: "secondary",
		children: "Secondary GlassTooltip",
	},
};

export const Sizes: Story = {
	render: () => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<div className="flex items-center gap-4">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassTooltip size="sm">Small</GlassTooltip>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassTooltip size="md">Medium</GlassTooltip>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassTooltip size="lg">Large</GlassTooltip>
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
				<GlassTooltip>Normal</GlassTooltip>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassTooltip disabled>Disabled</GlassTooltip>
			</div>
		</div>
	),
};
