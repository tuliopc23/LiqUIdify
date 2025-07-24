import type { Meta, StoryObj } from "@storybook/react-vite";
// @ts-expect-error TS(6142): Module './glass-loading' was resolved to '/Users/t... Remove this comment to see the full error message
import { GlassLoading } from "./glass-loading";

const meta: Meta<typeof GlassLoading> = {
	title: "Glass/GlassLoading",
	component: GlassLoading,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		size: {
			control: { type: "select" },
			options: ["sm", "md", "lg", "xl"],
		},
		variant: {
			control: { type: "select" },
			options: ["dots", "spinner", "pulse", "bars"],
		},
		text: {
			control: "text",
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Spinner: Story = {
	args: {
		variant: "spinner",
	},
};

export const Dots: Story = {
	args: {
		variant: "dots",
	},
};

export const Pulse: Story = {
	args: {
		variant: "pulse",
	},
};

export const Bars: Story = {
	args: {
		variant: "bars",
	},
};

export const WithText: Story = {
	args: {
		variant: "spinner",
		text: "Loading...",
	},
};

export const Sizes: Story = {
	render: () => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<div className="flex items-center gap-8">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassLoading size="sm" variant="spinner" text="Small" />
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassLoading size="md" variant="spinner" text="Medium" />
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassLoading size="lg" variant="spinner" text="Large" />
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassLoading size="xl" variant="spinner" text="Extra Large" />
		</div>
	),
};

export const AllVariants: Story = {
	render: () => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<div className="grid grid-cols-2 gap-8">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassLoading variant="spinner" text="Spinner" />
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassLoading variant="dots" text="Dots" />
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassLoading variant="pulse" text="Pulse" />
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassLoading variant="bars" text="Bars" />
		</div>
	),
};

export const LoadingStates: Story = {
	render: () => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<div className="flex flex-col gap-6">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassLoading variant="spinner" text="Connecting..." />
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassLoading variant="dots" text="Processing request..." />
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassLoading variant="pulse" text="Uploading files..." />
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassLoading variant="bars" text="Analyzing data..." />
		</div>
	),
};
