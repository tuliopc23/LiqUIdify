import type { Meta, StoryObj } from "@storybook/react";
// @ts-expect-error TS(6142): Module './glass-number-input' was resolved to '/Us... Remove this comment to see the full error message
import { GlassNumberInput } from "./glass-number-input";

const meta: Meta<typeof GlassNumberInput> = {
	title: "Components/Form/GlassNumberInput",
	component: GlassNumberInput,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"A sophisticated number input component with increment/decrement buttons, formatting, and liquid glass styling.",
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		value: {
			description: "Current numeric value",
			control: "number",
		},
		placeholder: {
			description: "Placeholder text when no value is entered",
			control: "text",
		},
		min: {
			description: "Minimum allowed value",
			control: "number",
		},
		max: {
			description: "Maximum allowed value",
			control: "number",
		},
		step: {
			description: "Step size for increment/decrement",
			control: "number",
		},
		precision: {
			description: "Number of decimal places",
			control: "number",
		},
		disabled: {
			description: "Whether the input is disabled",
			control: "boolean",
		},
		error: {
			description: "Whether the input has an error state",
			control: "boolean",
		},
		success: {
			description: "Whether the input has a success state",
			control: "boolean",
		},
		size: {
			description: "Size variant of the input",
			control: "select",
			options: ["sm", "md", "lg"],
		},
		variant: {
			description: "Visual variant of the input",
			control: "select",
			options: ["default", "secondary", "outline"],
		},
		allowNegative: {
			description: "Whether negative values are allowed",
			control: "boolean",
		},
		allowDecimal: {
			description: "Whether decimal values are allowed",
			control: "boolean",
		},
		showButtons: {
			description: "Whether to show increment/decrement buttons",
			control: "boolean",
		},
		formatValue: {
			description: "Custom value formatting function",
			control: false,
		},
		parseValue: {
			description: "Custom value parsing function",
			control: false,
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		placeholder: "Enter a number...",
	},
};

export const WithValue: Story = {
	args: {
		...Default.args,
// @ts-expect-error TS(2322): Type 'number' is not assignable to type 'string'.
		value: 42,
	},
};

export const WithMinMax: Story = {
	args: {
		...Default.args,
// @ts-expect-error TS(2322): Type 'number' is not assignable to type 'string'.
		min: 0,
// @ts-expect-error TS(2322): Type 'number' is not assignable to type 'string'.
		max: 100,
// @ts-expect-error TS(2322): Type 'number' is not assignable to type 'string'.
		value: 50,
	},
};

export const WithStep: Story = {
	args: {
		...Default.args,
// @ts-expect-error TS(2322): Type 'number' is not assignable to type 'string'.
		step: 5,
// @ts-expect-error TS(2322): Type 'number' is not assignable to type 'string'.
		value: 25,
	},
};

export const WithPrecision: Story = {
	args: {
		...Default.args,
// @ts-expect-error TS(2322): Type 'number' is not assignable to type 'string'.
		precision: 2,
// @ts-expect-error TS(2322): Type 'number' is not assignable to type 'string'.
		value: 3.14,
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
		allowDecimal: true,
	},
};

export const NoNegative: Story = {
	args: {
		...Default.args,
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
		allowNegative: false,
// @ts-expect-error TS(2322): Type 'number' is not assignable to type 'string'.
		value: 10,
	},
};

export const NoDecimal: Story = {
	args: {
		...Default.args,
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
		allowDecimal: false,
// @ts-expect-error TS(2322): Type 'number' is not assignable to type 'string'.
		value: 42,
	},
};

export const NoButtons: Story = {
	args: {
		...Default.args,
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
		showButtons: false,
// @ts-expect-error TS(2322): Type 'number' is not assignable to type 'string'.
		value: 123,
	},
};

export const Disabled: Story = {
	args: {
		...Default.args,
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
		disabled: true,
// @ts-expect-error TS(2322): Type 'number' is not assignable to type 'string'.
		value: 100,
	},
};

export const Error: Story = {
	args: {
		...Default.args,
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
		error: true,
// @ts-expect-error TS(2322): Type 'number' is not assignable to type 'string'.
		value: 999,
	},
};

export const Success: Story = {
	args: {
		...Default.args,
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
		success: true,
// @ts-expect-error TS(2322): Type 'number' is not assignable to type 'string'.
		value: 42,
	},
};

export const SmallSize: Story = {
	args: {
		...Default.args,
		size: "sm",
// @ts-expect-error TS(2322): Type 'number' is not assignable to type 'string'.
		value: 10,
	},
};

export const LargeSize: Story = {
	args: {
		...Default.args,
		size: "lg",
// @ts-expect-error TS(2322): Type 'number' is not assignable to type 'string'.
		value: 100,
	},
};

export const SecondaryVariant: Story = {
	args: {
		...Default.args,
		variant: "secondary",
// @ts-expect-error TS(2322): Type 'number' is not assignable to type 'string'.
		value: 50,
	},
};

export const OutlineVariant: Story = {
	args: {
		...Default.args,
		variant: "outline",
// @ts-expect-error TS(2322): Type 'number' is not assignable to type 'string'.
		value: 75,
	},
};

export const CurrencyFormat: Story = {
	args: {
		...Default.args,
// @ts-expect-error TS(2322): Type 'number' is not assignable to type 'string'.
		value: 1234.56,
// @ts-expect-error TS(2322): Type 'number' is not assignable to type 'string'.
		precision: 2,
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
		allowDecimal: true,
// @ts-expect-error TS(2322): Type '(value: any) => string' is not assignable to... Remove this comment to see the full error message
		formatValue: (value) => `$${value.toFixed(2)}`,
// @ts-expect-error TS(2322): Type '(value: any) => number' is not assignable to... Remove this comment to see the full error message
		parseValue: (value) => Number.parseFloat(value.replace("$", "")) || 0,
	},
};

export const PercentageFormat: Story = {
	args: {
		...Default.args,
// @ts-expect-error TS(2322): Type 'number' is not assignable to type 'string'.
		value: 75,
// @ts-expect-error TS(2322): Type 'number' is not assignable to type 'string'.
		min: 0,
// @ts-expect-error TS(2322): Type 'number' is not assignable to type 'string'.
		max: 100,
// @ts-expect-error TS(2322): Type '(value: any) => string' is not assignable to... Remove this comment to see the full error message
		formatValue: (value) => `${value}%`,
// @ts-expect-error TS(2322): Type '(value: any) => number' is not assignable to... Remove this comment to see the full error message
		parseValue: (value) => Number.parseFloat(value.replace("%", "")) || 0,
	},
};

export const Interactive: Story = {
	args: {
		...Default.args,
// @ts-expect-error TS(2322): Type '(value: any) => void' is not assignable to t... Remove this comment to see the full error message
		onValueChange: (value) => {
			console.log("Value changed:", value);
		},
// @ts-expect-error TS(2322): Type '() => void' is not assignable to type 'strin... Remove this comment to see the full error message
		onBlur: () => {
			console.log("Input blurred");
		},
// @ts-expect-error TS(2322): Type '() => void' is not assignable to type 'strin... Remove this comment to see the full error message
		onFocus: () => {
			console.log("Input focused");
		},
	},
};

export const AllSizes: Story = {
	render: () => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<div className="space-y-4">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="text-sm text-gray-600">Small</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassNumberInput placeholder="Small number input" size="sm" value={10} />
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="text-sm text-gray-600">Medium (default)</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassNumberInput
				placeholder="Medium number input"
				size="md"
// @ts-expect-error TS(2322): Type 'number' is not assignable to type 'string'.
				value={50}
			/>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="text-sm text-gray-600">Large</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassNumberInput
				placeholder="Large number input"
				size="lg"
// @ts-expect-error TS(2322): Type 'number' is not assignable to type 'string'.
				value={100}
			/>
		</div>
	),
};

export const AllVariants: Story = {
	render: () => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<div className="space-y-4">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="text-sm text-gray-600">Default</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassNumberInput
				placeholder="Default variant"
				variant="default"
// @ts-expect-error TS(2322): Type 'number' is not assignable to type 'string'.
				value={42}
			/>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="text-sm text-gray-600">Secondary</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassNumberInput
				placeholder="Secondary variant"
				variant="secondary"
// @ts-expect-error TS(2322): Type 'number' is not assignable to type 'string'.
				value={42}
			/>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="text-sm text-gray-600">Outline</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassNumberInput
				placeholder="Outline variant"
				variant="outline"
// @ts-expect-error TS(2322): Type 'number' is not assignable to type 'string'.
				value={42}
			/>
		</div>
	),
};

export const AllStates: Story = {
	render: () => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<div className="space-y-4">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="text-sm text-gray-600">Normal</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassNumberInput placeholder="Normal state" value={42} />
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="text-sm text-gray-600">Error</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassNumberInput placeholder="Error state" value={999} error />
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="text-sm text-gray-600">Success</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassNumberInput placeholder="Success state" value={42} success />
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="text-sm text-gray-600">Disabled</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassNumberInput placeholder="Disabled state" value={42} disabled />
		</div>
	),
};

export const UseCases: Story = {
	render: () => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<div className="space-y-6">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<div className="text-sm text-gray-600 mb-2">Price Input</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassNumberInput
					placeholder="0.00"
// @ts-expect-error TS(2322): Type 'number' is not assignable to type 'string'.
					value={29.99}
// @ts-expect-error TS(2322): Type 'number' is not assignable to type 'string'.
					precision={2}
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
					allowDecimal={true}
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
					allowNegative={false}
// @ts-expect-error TS(2322): Type '(value: any) => string' is not assignable to... Remove this comment to see the full error message
					formatValue={(value) => `$${value.toFixed(2)}`}
// @ts-expect-error TS(2322): Type '(value: any) => number' is not assignable to... Remove this comment to see the full error message
					parseValue={(value) => Number.parseFloat(value.replace("$", "")) || 0}
				/>
			</div>

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<div className="text-sm text-gray-600 mb-2">Quantity Input</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassNumberInput
					placeholder="0"
// @ts-expect-error TS(2322): Type 'number' is not assignable to type 'string'.
					value={5}
// @ts-expect-error TS(2322): Type 'number' is not assignable to type 'string'.
					min={1}
// @ts-expect-error TS(2322): Type 'number' is not assignable to type 'string'.
					max={99}
// @ts-expect-error TS(2322): Type 'number' is not assignable to type 'string'.
					step={1}
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
					allowDecimal={false}
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
					allowNegative={false}
				/>
			</div>

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<div className="text-sm text-gray-600 mb-2">Percentage Input</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassNumberInput
					placeholder="0%"
// @ts-expect-error TS(2322): Type 'number' is not assignable to type 'string'.
					value={75}
// @ts-expect-error TS(2322): Type 'number' is not assignable to type 'string'.
					min={0}
// @ts-expect-error TS(2322): Type 'number' is not assignable to type 'string'.
					max={100}
// @ts-expect-error TS(2322): Type 'number' is not assignable to type 'string'.
					step={5}
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
					allowDecimal={false}
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
					allowNegative={false}
// @ts-expect-error TS(2322): Type '(value: any) => string' is not assignable to... Remove this comment to see the full error message
					formatValue={(value) => `${value}%`}
// @ts-expect-error TS(2322): Type '(value: any) => number' is not assignable to... Remove this comment to see the full error message
					parseValue={(value) => Number.parseFloat(value.replace("%", "")) || 0}
				/>
			</div>

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<div className="text-sm text-gray-600 mb-2">Temperature Input</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassNumberInput
					placeholder="0°C"
// @ts-expect-error TS(2322): Type 'number' is not assignable to type 'string'.
					value={22.5}
// @ts-expect-error TS(2322): Type 'number' is not assignable to type 'string'.
					precision={1}
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
					allowDecimal={true}
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
					allowNegative={true}
// @ts-expect-error TS(2322): Type '(value: any) => string' is not assignable to... Remove this comment to see the full error message
					formatValue={(value) => `${value}°C`}
// @ts-expect-error TS(2322): Type '(value: any) => number' is not assignable to... Remove this comment to see the full error message
					parseValue={(value) => Number.parseFloat(value.replace("°C", "")) || 0}
				/>
			</div>
		</div>
	),
};
