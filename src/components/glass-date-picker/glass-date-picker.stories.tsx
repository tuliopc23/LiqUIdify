import type { Meta, StoryObj } from "@storybook/react";
// @ts-expect-error TS(6142): Module './glass-date-picker' was resolved to '/Use... Remove this comment to see the full error message
import { GlassDatePicker } from "./glass-date-picker";

const meta: Meta<typeof GlassDatePicker> = {
	title: "Components/Form/GlassDatePicker",
	component: GlassDatePicker,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"A comprehensive date picker component with optional time selection, navigation, and liquid glass styling.",
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		value: {
			description: "Selected date value",
			control: "date",
		},
		placeholder: {
			description: "Placeholder text when no date is selected",
			control: "text",
		},
		disabled: {
			description: "Whether the date picker is disabled",
			control: "boolean",
		},
		error: {
			description: "Whether the date picker has an error state",
			control: "boolean",
		},
		success: {
			description: "Whether the date picker has a success state",
			control: "boolean",
		},
		size: {
			description: "Size variant of the date picker",
			control: "select",
			options: ["sm", "md", "lg"],
		},
		variant: {
			description: "Visual variant of the date picker",
			control: "select",
			options: ["default", "secondary", "outline"],
		},
		showTime: {
			description: "Whether to show time selection",
			control: "boolean",
		},
		timeFormat: {
			description: "Time format (12 or 24 hour)",
			control: "select",
			options: ["12", "24"],
		},
		dateFormat: {
			description: "Date format string",
			control: "text",
		},
		locale: {
			description: "Locale for date formatting",
			control: "text",
		},
		minDate: {
			description: "Minimum selectable date",
			control: "date",
		},
		maxDate: {
			description: "Maximum selectable date",
			control: "date",
		},
		clearable: {
			description: "Whether the date picker can be cleared",
			control: "boolean",
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		placeholder: "Select a date",
	},
};

export const WithValue: Story = {
	args: {
		...Default.args,
// @ts-expect-error TS(2322): Type 'Date' is not assignable to type 'string'.
		value: new Date("2024-03-15"),
	},
};

export const WithTime: Story = {
	args: {
		...Default.args,
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
		showTime: true,
		placeholder: "Select date and time",
	},
};

export const Time24Hour: Story = {
	args: {
		...Default.args,
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
		showTime: true,
		timeFormat: "24",
		placeholder: "Select date and time (24h)",
	},
};

export const WithMinMax: Story = {
	args: {
		...Default.args,
// @ts-expect-error TS(2322): Type 'Date' is not assignable to type 'string'.
		minDate: new Date(),
// @ts-expect-error TS(2322): Type 'Date' is not assignable to type 'string'.
		maxDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
		placeholder: "Select date (next 30 days)",
	},
};

export const CustomFormat: Story = {
// @ts-expect-error TS(2322): Type '{ dateFormat: string; placeholder: string; r... Remove this comment to see the full error message
	args: {
		...Default.args,
		dateFormat: "dd/MM/yyyy",
		placeholder: "DD/MM/YYYY",
	},
};

export const DifferentLocale: Story = {
// @ts-expect-error TS(2322): Type '{ locale: string; placeholder: string; ref?:... Remove this comment to see the full error message
	args: {
		...Default.args,
		locale: "es-ES",
		placeholder: "Seleccionar fecha",
	},
};

export const NotClearable: Story = {
	args: {
		...Default.args,
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
		clearable: false,
// @ts-expect-error TS(2322): Type 'Date' is not assignable to type 'string'.
		value: new Date(),
	},
};

export const Disabled: Story = {
	args: {
		...Default.args,
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
		disabled: true,
// @ts-expect-error TS(2322): Type 'Date' is not assignable to type 'string'.
		value: new Date(),
	},
};

export const Error: Story = {
	args: {
		...Default.args,
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
		error: true,
// @ts-expect-error TS(2322): Type 'Date' is not assignable to type 'string'.
		value: new Date(),
	},
};

export const Success: Story = {
	args: {
		...Default.args,
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
		success: true,
// @ts-expect-error TS(2322): Type 'Date' is not assignable to type 'string'.
		value: new Date(),
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

export const Interactive: Story = {
	args: {
		...Default.args,
// @ts-expect-error TS(2322): Type '(date: any) => void' is not assignable to ty... Remove this comment to see the full error message
		onDateChange: (date) => {
			console.log("Date changed:", date);
		},
// @ts-expect-error TS(2322): Type '(time: any) => void' is not assignable to ty... Remove this comment to see the full error message
		onTimeChange: (time) => {
			console.log("Time changed:", time);
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
			<GlassDatePicker placeholder="Small date picker" size="sm" />
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="text-sm text-gray-600">Medium (default)</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassDatePicker placeholder="Medium date picker" size="md" />
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="text-sm text-gray-600">Large</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassDatePicker placeholder="Large date picker" size="lg" />
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
			<GlassDatePicker placeholder="Default variant" variant="default" />
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="text-sm text-gray-600">Secondary</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassDatePicker placeholder="Secondary variant" variant="secondary" />
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="text-sm text-gray-600">Outline</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassDatePicker placeholder="Outline variant" variant="outline" />
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
			<GlassDatePicker placeholder="Normal state" />
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="text-sm text-gray-600">With Value</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassDatePicker placeholder="With value" value={new Date()} />
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="text-sm text-gray-600">Error</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassDatePicker placeholder="Error state" error />
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="text-sm text-gray-600">Success</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassDatePicker placeholder="Success state" success />
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="text-sm text-gray-600">Disabled</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassDatePicker placeholder="Disabled state" disabled />
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
				<div className="text-sm text-gray-600 mb-2">Birthday Picker</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassDatePicker
					placeholder="Select your birthday"
// @ts-expect-error TS(2322): Type 'Date' is not assignable to type 'string'.
					maxDate={new Date()}
					dateFormat="MMMM d, yyyy"
				/>
			</div>

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<div className="text-sm text-gray-600 mb-2">Appointment Scheduler</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassDatePicker
					placeholder="Select appointment date & time"
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
					showTime
// @ts-expect-error TS(2322): Type 'Date' is not assignable to type 'string'.
					minDate={new Date()}
// @ts-expect-error TS(2322): Type 'Date' is not assignable to type 'string'.
					maxDate={new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)} // 60 days from now
				/>
			</div>

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<div className="text-sm text-gray-600 mb-2">Event Date</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassDatePicker
					placeholder="Event date"
// @ts-expect-error TS(2322): Type 'Date' is not assignable to type 'string'.
					minDate={new Date()}
					dateFormat="EEE, MMM d, yyyy"
				/>
			</div>

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<div className="text-sm text-gray-600 mb-2">Deadline Picker</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassDatePicker
					placeholder="Set deadline"
// @ts-expect-error TS(2322): Type 'Date' is not assignable to type 'string'.
					minDate={new Date()}
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
					showTime
					timeFormat="24"
					variant="outline"
				/>
			</div>
		</div>
	),
};

export const WithDisabledDates: Story = {
	args: {
		...Default.args,
		placeholder: "Select date (weekends disabled)",
// @ts-expect-error TS(2322): Type '(date: any) => boolean' is not assignable to... Remove this comment to see the full error message
		disabledDates: (date) => {
			const day = date.getDay();
			return day === 0 || day === 6; // Disable weekends
		},
	},
};

export const WithHighlightedDates: Story = {
	args: {
		...Default.args,
		placeholder: "Select date (holidays highlighted)",
// @ts-expect-error TS(2322): Type 'Date[]' is not assignable to type 'string'.
		highlightedDates: [
			new Date("2024-01-01"), // New Year
			new Date("2024-07-04"), // Independence Day
			new Date("2024-12-25"), // Christmas
		],
	},
};

export const DateRange: Story = {
	render: () => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<div className="space-y-4">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="text-sm text-gray-600">Date Range Selection</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="flex gap-4">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassDatePicker placeholder="Start date" variant="outline" />
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassDatePicker placeholder="End date" variant="outline" />
			</div>
		</div>
	),
};

export const MultipleFormats: Story = {
	render: () => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<div className="space-y-4">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="text-sm text-gray-600">US Format (MM/dd/yyyy)</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassDatePicker
				placeholder="MM/dd/yyyy"
				dateFormat="MM/dd/yyyy"
				locale="en-US"
			/>

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="text-sm text-gray-600">European Format (dd/MM/yyyy)</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassDatePicker
				placeholder="dd/MM/yyyy"
				dateFormat="dd/MM/yyyy"
				locale="en-GB"
			/>

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="text-sm text-gray-600">ISO Format (yyyy-MM-dd)</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassDatePicker placeholder="yyyy-MM-dd" dateFormat="yyyy-MM-dd" />

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="text-sm text-gray-600">Long Format</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassDatePicker
				placeholder="Long format"
				dateFormat="EEEE, MMMM d, yyyy"
			/>
		</div>
	),
};
