import type { Meta, StoryObj } from "@storybook/react-vite";
// @ts-expect-error TS(6142): Module './glass-responsive-card' was resolved to '... Remove this comment to see the full error message
import { GlassResponsiveCard } from "./glass-responsive-card";

const meta: Meta<typeof GlassResponsiveCard> = {
	title: "Glass/GlassResponsiveCard",
	component: GlassResponsiveCard,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		children: "GlassResponsiveCard Component",
	},
};

export const Secondary: Story = {
	args: {
// @ts-expect-error TS(2322): Type '"secondary"' is not assignable to type '"def... Remove this comment to see the full error message
		variant: "secondary",
		children: "Secondary GlassResponsiveCard",
	},
};

export const Sizes: Story = {
	render: () => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<div className="flex items-center gap-4">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassResponsiveCard size="sm">Small</GlassResponsiveCard>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassResponsiveCard size="md">Medium</GlassResponsiveCard>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassResponsiveCard size="lg">Large</GlassResponsiveCard>
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
				<GlassResponsiveCard>Normal</GlassResponsiveCard>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassResponsiveCard disabled>Disabled</GlassResponsiveCard>
			</div>
		</div>
	),
};
