import type { Meta, StoryObj } from "@storybook/react-vite";
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
		<div className="flex flex-col gap-4">
			<GlassCheckbox label="Normal checkbox" />
			<GlassCheckbox label="Checked checkbox" defaultChecked={true} />
			<GlassCheckbox label="Disabled checkbox" disabled />
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
		<div className="flex flex-col gap-3">
			<h3 className="text-lg font-medium">Select your preferences:</h3>
			<GlassCheckbox label="Email notifications" />
			<GlassCheckbox label="SMS notifications" />
			<GlassCheckbox label="Push notifications" defaultChecked={true} />
			<GlassCheckbox label="Marketing emails" />
			<GlassCheckbox label="Security updates" defaultChecked={true} disabled />
		</div>
	),
};
