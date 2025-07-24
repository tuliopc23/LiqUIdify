import type { Meta, StoryObj } from "@storybook/react-vite";
// @ts-expect-error TS(6142): Module './glass-toast' was resolved to '/Users/tul... Remove this comment to see the full error message
import { ToastProvider } from "./glass-toast";

const meta: Meta<typeof ToastProvider> = {
	title: "Glass/ToastProvider",
	component: ToastProvider,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		children: "ToastProvider Component",
	},
};

export const Secondary: Story = {
	args: {
// @ts-expect-error TS(2322): Type '{ variant: string; children: string; }' is n... Remove this comment to see the full error message
		variant: "secondary",
		children: "Secondary ToastProvider",
	},
};

export const Sizes: Story = {
	render: () => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<div className="flex items-center gap-4">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<ToastProvider size="sm">Small</ToastProvider>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<ToastProvider size="md">Medium</ToastProvider>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<ToastProvider size="lg">Large</ToastProvider>
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
				<ToastProvider>Normal</ToastProvider>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<ToastProvider disabled>Disabled</ToastProvider>
			</div>
		</div>
	),
};
