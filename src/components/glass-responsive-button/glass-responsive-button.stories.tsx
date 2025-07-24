import type { Meta, StoryObj } from "@storybook/react-vite";
// @ts-expect-error TS(6142): Module './glass-responsive-button' was resolved to... Remove this comment to see the full error message
import { GlassResponsiveButton } from "./glass-responsive-button";

const meta: Meta<typeof GlassResponsiveButton> = {
	title: "Glass/GlassResponsiveButton",
	component: GlassResponsiveButton,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		children: "GlassResponsiveButton Component",
	},
};

export const Secondary: Story = {
	args: {
		variant: "secondary",
		children: "Secondary GlassResponsiveButton",
	},
};

export const Sizes: Story = {
	render: () => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<div className="flex items-center gap-4">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassResponsiveButton size="sm">Small</GlassResponsiveButton>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassResponsiveButton size="md">Medium</GlassResponsiveButton>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassResponsiveButton size="lg">Large</GlassResponsiveButton>
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
				<GlassResponsiveButton>Normal</GlassResponsiveButton>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassResponsiveButton disabled>Disabled</GlassResponsiveButton>
			</div>
		</div>
	),
};
