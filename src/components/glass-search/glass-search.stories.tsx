import type { Meta, StoryObj } from "@storybook/react-vite";
// @ts-expect-error TS(6142): Module './glass-search' was resolved to '/Users/tu... Remove this comment to see the full error message
import { GlassSearch } from "./glass-search";

const meta: Meta<typeof GlassSearch> = {
	title: "Glass/GlassSearch",
	component: GlassSearch,
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
		children: "GlassSearch Component",
	},
};

export const Secondary: Story = {
	args: {
// @ts-expect-error TS(2322): Type '{ variant: string; children: string; }' is n... Remove this comment to see the full error message
		variant: "secondary",
		children: "Secondary GlassSearch",
	},
};

export const Sizes: Story = {
	render: () => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<div className="flex items-center gap-4">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassSearch size="sm">Small</GlassSearch>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassSearch size="md">Medium</GlassSearch>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassSearch size="lg">Large</GlassSearch>
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
				<GlassSearch>Normal</GlassSearch>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassSearch disabled>Disabled</GlassSearch>
			</div>
		</div>
	),
};
