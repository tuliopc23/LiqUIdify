import type { Meta, StoryObj } from "@storybook/react-vite";
// @ts-expect-error TS(6142): Module './glass-checkbox' was resolved to '/Users/... Remove this comment to see the full error message
import { GlassCheckbox } from "./glass-checkbox";

const meta: Meta<typeof GlassCheckbox> = {
	title: "Glass/GlassCheckbox",
	component: GlassCheckbox,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		disabled: {
			control: "boolean",
		},
		checked: {
			control: "boolean",
		},
		defaultChecked: {
			control: "boolean",
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: "Accept terms and conditions",
	},
};

export const Checked: Story = {
	args: {
		label: "Pre-checked checkbox",
		defaultChecked: true,
	},
};

export const WithoutLabel: Story = {
	args: {},
};

export const States: Story = {
	render: () => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<div className="flex flex-col gap-4">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassCheckbox label="Normal checkbox" />
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassCheckbox label="Checked checkbox" defaultChecked={true} />
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassCheckbox label="Disabled checkbox" disabled />
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassCheckbox
				label="Disabled checked checkbox"
				disabled
				defaultChecked={true}
			/>
		</div>
	),
};

export const MultipleOptions: Story = {
	render: () => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<div className="flex flex-col gap-3">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<h3 className="text-lg font-medium">Select your preferences:</h3>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassCheckbox label="Email notifications" />
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassCheckbox label="SMS notifications" />
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassCheckbox label="Push notifications" defaultChecked={true} />
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassCheckbox label="Marketing emails" />
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassCheckbox label="Security updates" defaultChecked={true} disabled />
		</div>
	),
};
