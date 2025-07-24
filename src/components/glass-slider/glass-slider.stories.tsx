import type { Meta, StoryObj } from "@storybook/react-vite";
// @ts-expect-error TS(6142): Module './glass-slider' was resolved to '/Users/tu... Remove this comment to see the full error message
import { GlassSlider } from "./glass-slider";

const meta: Meta<typeof GlassSlider> = {
	title: "Glass/GlassSlider",
	component: GlassSlider,
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
		children: "GlassSlider Component",
	},
};

export const Secondary: Story = {
	args: {
// @ts-expect-error TS(2322): Type '"secondary"' is not assignable to type '"def... Remove this comment to see the full error message
		variant: "secondary",
		children: "Secondary GlassSlider",
	},
};

export const Sizes: Story = {
	render: () => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<div className="flex items-center gap-4">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassSlider size="sm">Small</GlassSlider>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassSlider size="md">Medium</GlassSlider>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassSlider size="lg">Large</GlassSlider>
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
				<GlassSlider>Normal</GlassSlider>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassSlider disabled>Disabled</GlassSlider>
			</div>
		</div>
	),
};
