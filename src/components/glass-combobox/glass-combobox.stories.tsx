import type { Meta, StoryObj } from "@storybook/react";
// @ts-expect-error TS(6142): Module './glass-combobox' was resolved to '/Users/... Remove this comment to see the full error message
import { GlassCombobox } from "./glass-combobox";

const meta: Meta<typeof GlassCombobox> = {
	title: "Components/Form/GlassCombobox",
	component: GlassCombobox,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"A sophisticated combobox component with search, keyboard navigation, and liquid glass styling.",
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		value: {
			description: "Current selected value",
			control: "text",
		},
		placeholder: {
			description: "Placeholder text when no value is selected",
			control: "text",
		},
		searchPlaceholder: {
			description: "Placeholder text for search input",
			control: "text",
		},
		disabled: {
			description: "Whether the combobox is disabled",
			control: "boolean",
		},
		clearable: {
			description: "Whether the combobox can be cleared",
			control: "boolean",
		},
		loading: {
			description: "Whether the combobox is in loading state",
			control: "boolean",
		},
		error: {
			description: "Whether the combobox has an error state",
			control: "boolean",
		},
		success: {
			description: "Whether the combobox has a success state",
			control: "boolean",
		},
		size: {
			description: "Size variant of the combobox",
			control: "select",
			options: ["sm", "md", "lg"],
		},
		variant: {
			description: "Visual variant of the combobox",
			control: "select",
			options: ["default", "secondary", "outline"],
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data for stories
const sampleOptions = [
	{ value: "apple", label: "Apple" },
	{ value: "banana", label: "Banana" },
	{ value: "cherry", label: "Cherry" },
	{ value: "date", label: "Date" },
	{ value: "elderberry", label: "Elderberry" },
	{ value: "fig", label: "Fig" },
	{ value: "grape", label: "Grape" },
	{ value: "honeydew", label: "Honeydew" },
	{ value: "kiwi", label: "Kiwi" },
	{ value: "lemon", label: "Lemon" },
];

export const Default: Story = {
	args: {
// @ts-expect-error TS(2322): Type '{ value: string; label: string; }[]' is not ... Remove this comment to see the full error message
		options: sampleOptions,
		placeholder: "Choose a fruit...",
		searchPlaceholder: "Search fruits...",
	},
};

export const WithValue: Story = {
// @ts-expect-error TS(2322): Type '{ value: string; ref?: React.Ref<HTMLDivElem... Remove this comment to see the full error message
	args: {
		...Default.args,
		value: "apple",
	},
};

export const Disabled: Story = {
	args: {
		...Default.args,
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
		disabled: true,
	},
};

export const Loading: Story = {
	args: {
		...Default.args,
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
		loading: true,
	},
};

export const Error: Story = {
	args: {
		...Default.args,
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
		error: true,
	},
};

export const Success: Story = {
	args: {
		...Default.args,
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
		success: true,
	},
};

export const NotClearable: Story = {
	args: {
		...Default.args,
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
		clearable: false,
		value: "apple",
	},
};

export const SmallSize: Story = {
// @ts-expect-error TS(2322): Type '{ size: string; ref?: React.Ref<HTMLDivEleme... Remove this comment to see the full error message
	args: {
		...Default.args,
		size: "sm",
	},
};

export const LargeSize: Story = {
// @ts-expect-error TS(2322): Type '{ size: string; ref?: React.Ref<HTMLDivEleme... Remove this comment to see the full error message
	args: {
		...Default.args,
		size: "lg",
	},
};

export const SecondaryVariant: Story = {
// @ts-expect-error TS(2322): Type '{ variant: string; ref?: React.Ref<HTMLDivEl... Remove this comment to see the full error message
	args: {
		...Default.args,
		variant: "secondary",
	},
};

export const OutlineVariant: Story = {
// @ts-expect-error TS(2322): Type '{ variant: string; ref?: React.Ref<HTMLDivEl... Remove this comment to see the full error message
	args: {
		...Default.args,
		variant: "outline",
	},
};

export const CustomFilter: Story = {
	args: {
		...Default.args,
// @ts-expect-error TS(2322): Type '(option: any, searchValue: any) => any' is n... Remove this comment to see the full error message
		filterFn: (option, searchValue) =>
			option.label.toLowerCase().includes(searchValue.toLowerCase()) ||
			option.value.toLowerCase().includes(searchValue.toLowerCase()),
	},
};

export const EmptyState: Story = {
	args: {
		...Default.args,
// @ts-expect-error TS(2322): Type 'never[]' is not assignable to type 'string'.
		options: [],
		emptyText: "No fruits found",
	},
};

export const Interactive: Story = {
	args: {
		...Default.args,
// @ts-expect-error TS(2322): Type '(value: any) => void' is not assignable to t... Remove this comment to see the full error message
		onValueChange: (value) => {
			console.log("Selected:", value);
		},
// @ts-expect-error TS(2322): Type '(search: any) => void' is not assignable to ... Remove this comment to see the full error message
		onSearchChange: (search) => {
			console.log("Search:", search);
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
			<GlassCombobox
// @ts-expect-error TS(2322): Type '{ value: string; label: string; }[]' is not ... Remove this comment to see the full error message
				options={sampleOptions}
				placeholder="Small combobox"
				size="sm"
			/>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="text-sm text-gray-600">Medium (default)</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassCombobox
// @ts-expect-error TS(2322): Type '{ value: string; label: string; }[]' is not ... Remove this comment to see the full error message
				options={sampleOptions}
				placeholder="Medium combobox"
				size="md"
			/>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="text-sm text-gray-600">Large</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassCombobox
// @ts-expect-error TS(2322): Type '{ value: string; label: string; }[]' is not ... Remove this comment to see the full error message
				options={sampleOptions}
				placeholder="Large combobox"
				size="lg"
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
			<GlassCombobox
// @ts-expect-error TS(2322): Type '{ value: string; label: string; }[]' is not ... Remove this comment to see the full error message
				options={sampleOptions}
				placeholder="Default variant"
				variant="default"
			/>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="text-sm text-gray-600">Secondary</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassCombobox
// @ts-expect-error TS(2322): Type '{ value: string; label: string; }[]' is not ... Remove this comment to see the full error message
				options={sampleOptions}
				placeholder="Secondary variant"
				variant="secondary"
			/>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="text-sm text-gray-600">Outline</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassCombobox
// @ts-expect-error TS(2322): Type '{ value: string; label: string; }[]' is not ... Remove this comment to see the full error message
				options={sampleOptions}
				placeholder="Outline variant"
				variant="outline"
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
			<GlassCombobox options={sampleOptions} placeholder="Normal state" />
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="text-sm text-gray-600">Loading</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassCombobox
// @ts-expect-error TS(2322): Type '{ value: string; label: string; }[]' is not ... Remove this comment to see the full error message
				options={sampleOptions}
				placeholder="Loading state"
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
				loading
			/>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="text-sm text-gray-600">Error</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassCombobox options={sampleOptions} placeholder="Error state" error />
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="text-sm text-gray-600">Success</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassCombobox
// @ts-expect-error TS(2322): Type '{ value: string; label: string; }[]' is not ... Remove this comment to see the full error message
				options={sampleOptions}
				placeholder="Success state"
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
				success
			/>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="text-sm text-gray-600">Disabled</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassCombobox
// @ts-expect-error TS(2322): Type '{ value: string; label: string; }[]' is not ... Remove this comment to see the full error message
				options={sampleOptions}
				placeholder="Disabled state"
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
				disabled
			/>
		</div>
	),
};
