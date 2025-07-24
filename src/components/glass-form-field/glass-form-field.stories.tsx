import type { Meta, StoryObj } from "@storybook/react";
// @ts-expect-error TS(6142): Module '../glass-checkbox/glass-checkbox' was reso... Remove this comment to see the full error message
import { GlassCheckbox } from "../glass-checkbox/glass-checkbox";
// @ts-expect-error TS(6142): Module '../glass-input/glass-input' was resolved t... Remove this comment to see the full error message
import { GlassInput } from "../glass-input/glass-input";
// @ts-expect-error TS(6142): Module '../glass-select/glass-select' was resolved... Remove this comment to see the full error message
import { GlassSelect } from "../glass-select/glass-select";
// @ts-expect-error TS(6142): Module '../glass-switch/glass-switch' was resolved... Remove this comment to see the full error message
import { GlassSwitch } from "../glass-switch/glass-switch";
// @ts-expect-error TS(6142): Module '../glass-textarea/glass-textarea' was reso... Remove this comment to see the full error message
import { GlassTextarea } from "../glass-textarea/glass-textarea";
// @ts-expect-error TS(6142): Module './glass-form-field' was resolved to '/User... Remove this comment to see the full error message
import { GlassFormField } from "./glass-form-field";

const meta: Meta<typeof GlassFormField> = {
	title: "Components/Form/GlassFormField",
	component: GlassFormField,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"A form field wrapper that provides labels, validation states, helper text, and accessibility features.",
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		label: {
			description: "Label text for the form field",
			control: "text",
		},
		htmlFor: {
			description: "ID of the form control this field wraps",
			control: "text",
		},
		required: {
			description: "Whether the field is required",
			control: "boolean",
		},
		optional: {
			description: "Whether to show optional indicator",
			control: "boolean",
		},
		error: {
			description: "Error message or boolean for error state",
			control: "text",
		},
		success: {
			description: "Success message or boolean for success state",
			control: "text",
		},
		warning: {
			description: "Warning message or boolean for warning state",
			control: "text",
		},
		helperText: {
			description: "Helper text shown below the field",
			control: "text",
		},
		disabled: {
			description: "Whether the field is disabled",
			control: "boolean",
		},
		size: {
			description: "Size variant of the field",
			control: "select",
			options: ["sm", "md", "lg"],
		},
		variant: {
			description: "Visual variant of the field",
			control: "select",
			options: ["default", "secondary", "outline"],
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: "Username",
		htmlFor: "username",
// @ts-expect-error TS(2322): Type 'Element' is not assignable to type 'string'.
		children: <GlassInput id="username" placeholder="Enter your username" />,
	},
};

export const Required: Story = {
	args: {
		label: "Email",
		htmlFor: "email",
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
		required: true,
// @ts-expect-error TS(2322): Type 'Element' is not assignable to type 'string'.
		children: (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassInput id="email" type="email" placeholder="Enter your email" />
		),
	},
};

export const Optional: Story = {
	args: {
		label: "Phone Number",
		htmlFor: "phone",
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
		optional: true,
// @ts-expect-error TS(2322): Type 'Element' is not assignable to type 'string'.
		children: (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassInput id="phone" type="tel" placeholder="Enter your phone number" />
		),
	},
};

export const WithHelper: Story = {
	args: {
		label: "Password",
		htmlFor: "password",
		helperText:
			"Must be at least 8 characters with uppercase, lowercase, and numbers",
// @ts-expect-error TS(2322): Type 'Element' is not assignable to type 'string'.
		children: (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassInput
				id="password"
				type="password"
				placeholder="Enter your password"
			/>
		),
	},
};

export const ErrorState: Story = {
	args: {
		label: "Email",
		htmlFor: "email-error",
		error: "Please enter a valid email address",
// @ts-expect-error TS(2322): Type 'Element' is not assignable to type 'string'.
		children: (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassInput
				id="email-error"
				type="email"
				placeholder="Enter your email"
				error
			/>
		),
	},
};

export const SuccessState: Story = {
	args: {
		label: "Username",
		htmlFor: "username-success",
		success: "Username is available",
// @ts-expect-error TS(2322): Type 'Element' is not assignable to type 'string'.
		children: (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassInput
				id="username-success"
				placeholder="Enter your username"
// @ts-expect-error TS(2322): Type '{ id: string; placeholder: string; success: ... Remove this comment to see the full error message
				success
			/>
		),
	},
};

export const WarningState: Story = {
	args: {
		label: "Password",
		htmlFor: "password-warning",
		warning: "Password strength is weak",
// @ts-expect-error TS(2322): Type 'Element' is not assignable to type 'string'.
		children: (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassInput
				id="password-warning"
				type="password"
				placeholder="Enter your password"
			/>
		),
	},
};

export const Disabled: Story = {
	args: {
		label: "Username",
		htmlFor: "username-disabled",
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
		disabled: true,
// @ts-expect-error TS(2322): Type 'Element' is not assignable to type 'string'.
		children: (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassInput
				id="username-disabled"
				placeholder="Enter your username"
				disabled
			/>
		),
	},
};

export const WithTextarea: Story = {
	args: {
		label: "Message",
		htmlFor: "message",
		helperText: "Maximum 500 characters",
// @ts-expect-error TS(2322): Type 'Element' is not assignable to type 'string'.
		children: (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassTextarea id="message" placeholder="Enter your message" rows={4} />
		),
	},
};

export const WithSelect: Story = {
	args: {
		label: "Country",
		htmlFor: "country",
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
		required: true,
// @ts-expect-error TS(2322): Type 'Element' is not assignable to type 'string'.
		children: (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassSelect id="country" placeholder="Select your country">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<option value="us">United States</option>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<option value="ca">Canada</option>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<option value="uk">United Kingdom</option>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<option value="au">Australia</option>
			</GlassSelect>
		),
	},
};

export const WithCheckbox: Story = {
	args: {
		label: "Preferences",
// @ts-expect-error TS(2322): Type 'Element' is not assignable to type 'string'.
		children: (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="space-y-2">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassCheckbox id="newsletter" label="Subscribe to newsletter" />
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassCheckbox id="updates" label="Receive product updates" />
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassCheckbox id="marketing" label="Marketing communications" />
			</div>
		),
	},
};

export const WithSwitch: Story = {
	args: {
		label: "Notifications",
// @ts-expect-error TS(2322): Type 'Element' is not assignable to type 'string'.
		children: (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="space-y-3">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassSwitch id="email-notifications" label="Email notifications" />
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassSwitch id="push-notifications" label="Push notifications" />
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassSwitch id="sms-notifications" label="SMS notifications" />
			</div>
		),
	},
};

export const SmallSize: Story = {
	args: {
		label: "Code",
		htmlFor: "code-sm",
		size: "sm",
// @ts-expect-error TS(2322): Type 'Element' is not assignable to type 'string'.
		children: <GlassInput id="code-sm" placeholder="Enter code" size="sm" />,
	},
};

export const LargeSize: Story = {
	args: {
		label: "Title",
		htmlFor: "title-lg",
		size: "lg",
// @ts-expect-error TS(2322): Type 'Element' is not assignable to type 'string'.
		children: <GlassInput id="title-lg" placeholder="Enter title" size="lg" />,
	},
};

export const SecondaryVariant: Story = {
	args: {
		label: "Description",
		htmlFor: "description-secondary",
		variant: "secondary",
// @ts-expect-error TS(2322): Type 'Element' is not assignable to type 'string'.
		children: (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassInput
				id="description-secondary"
				placeholder="Enter description"
// @ts-expect-error TS(2322): Type '"secondary"' is not assignable to type 'Comp... Remove this comment to see the full error message
				variant="secondary"
			/>
		),
	},
};

export const OutlineVariant: Story = {
	args: {
		label: "Notes",
		htmlFor: "notes-outline",
		variant: "outline",
// @ts-expect-error TS(2322): Type 'Element' is not assignable to type 'string'.
		children: (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassInput
				id="notes-outline"
				placeholder="Enter notes"
// @ts-expect-error TS(2322): Type '"outline"' is not assignable to type 'Compon... Remove this comment to see the full error message
				variant="outline"
			/>
		),
	},
};

export const ComplexForm: Story = {
	render: () => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<div className="space-y-6 w-96">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassFormField label="Full Name" htmlFor="fullname" required>
// @ts-expect-error TS(2322): Type 'Element' is not assignable to type 'string'.
				<GlassInput id="fullname" placeholder="Enter your full name" />
			</GlassFormField>

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassFormField
				label="Email Address"
				htmlFor="email-complex"
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
				required
				helperText="We'll never share your email with anyone else"
			>
// @ts-expect-error TS(2322): Type 'Element' is not assignable to type 'string'.
				<GlassInput
					id="email-complex"
					type="email"
					placeholder="Enter your email"
				/>
			</GlassFormField>

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassFormField
				label="Phone Number"
				htmlFor="phone-complex"
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
				optional
				helperText="Include country code"
			>
// @ts-expect-error TS(2322): Type 'Element' is not assignable to type 'string'.
				<GlassInput
					id="phone-complex"
					type="tel"
					placeholder="+1 (555) 123-4567"
				/>
			</GlassFormField>

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassFormField
				label="Message"
				htmlFor="message-complex"
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
				required
				helperText="Tell us how we can help you"
			>
// @ts-expect-error TS(2322): Type 'Element' is not assignable to type 'string'.
				<GlassTextarea
					id="message-complex"
					placeholder="Enter your message"
					rows={4}
				/>
			</GlassFormField>

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassFormField label="Newsletter Subscription">
// @ts-expect-error TS(2322): Type 'Element' is not assignable to type 'string'.
				<GlassCheckbox
					id="newsletter-complex"
					label="Subscribe to our newsletter"
				/>
			</GlassFormField>
		</div>
	),
};

export const ValidationStates: Story = {
	render: () => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<div className="space-y-6 w-96">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassFormField
				label="Valid Email"
				htmlFor="valid-email"
				success="Email is valid"
			>
// @ts-expect-error TS(2322): Type 'Element' is not assignable to type 'string'.
				<GlassInput
					id="valid-email"
					type="email"
					value="user@example.com"
// @ts-expect-error TS(2322): Type '{ id: string; type: "email"; value: string; ... Remove this comment to see the full error message
					success
				/>
			</GlassFormField>

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassFormField
				label="Invalid Email"
				htmlFor="invalid-email"
				error="Please enter a valid email address"
			>
// @ts-expect-error TS(2322): Type 'Element' is not assignable to type 'string'.
				<GlassInput
					id="invalid-email"
					type="email"
					value="invalid-email"
					error
				/>
			</GlassFormField>

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassFormField
				label="Weak Password"
				htmlFor="weak-password"
				warning="Password is too weak"
				helperText="Use a mix of letters, numbers, and symbols"
			>
// @ts-expect-error TS(2322): Type 'Element' is not assignable to type 'string'.
				<GlassInput id="weak-password" type="password" value="123" />
			</GlassFormField>

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassFormField
				label="Strong Password"
				htmlFor="strong-password"
				success="Password is strong"
			>
// @ts-expect-error TS(2322): Type 'Element' is not assignable to type 'string'.
				<GlassInput
					id="strong-password"
					type="password"
					value="MyStr0ngP@ssw0rd!"
// @ts-expect-error TS(2322): Type '{ id: string; type: "password"; value: strin... Remove this comment to see the full error message
					success
				/>
			</GlassFormField>
		</div>
	),
};

export const AllSizes: Story = {
	render: () => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<div className="space-y-6 w-96">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassFormField
				label="Small Field"
				htmlFor="small-field"
				size="sm"
				helperText="This is a small form field"
			>
// @ts-expect-error TS(2322): Type 'Element' is not assignable to type 'string'.
				<GlassInput id="small-field" placeholder="Small input" size="sm" />
			</GlassFormField>

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassFormField
				label="Medium Field"
				htmlFor="medium-field"
				size="md"
				helperText="This is a medium form field"
			>
// @ts-expect-error TS(2322): Type 'Element' is not assignable to type 'string'.
				<GlassInput id="medium-field" placeholder="Medium input" size="md" />
			</GlassFormField>

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassFormField
				label="Large Field"
				htmlFor="large-field"
				size="lg"
				helperText="This is a large form field"
			>
// @ts-expect-error TS(2322): Type 'Element' is not assignable to type 'string'.
				<GlassInput id="large-field" placeholder="Large input" size="lg" />
			</GlassFormField>
		</div>
	),
};

export const AllVariants: Story = {
	render: () => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<div className="space-y-6 w-96">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassFormField
				label="Default Variant"
				htmlFor="default-variant"
				variant="default"
				helperText="Default form field styling"
			>
// @ts-expect-error TS(2322): Type 'Element' is not assignable to type 'string'.
				<GlassInput
					id="default-variant"
					placeholder="Default input"
					variant="default"
				/>
			</GlassFormField>

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassFormField
				label="Secondary Variant"
				htmlFor="secondary-variant"
				variant="secondary"
				helperText="Secondary form field styling"
			>
// @ts-expect-error TS(2322): Type 'Element' is not assignable to type 'string'.
				<GlassInput
					id="secondary-variant"
					placeholder="Secondary input"
// @ts-expect-error TS(2322): Type '"secondary"' is not assignable to type 'Comp... Remove this comment to see the full error message
					variant="secondary"
				/>
			</GlassFormField>

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassFormField
				label="Outline Variant"
				htmlFor="outline-variant"
				variant="outline"
				helperText="Outline form field styling"
			>
// @ts-expect-error TS(2322): Type 'Element' is not assignable to type 'string'.
				<GlassInput
					id="outline-variant"
					placeholder="Outline input"
// @ts-expect-error TS(2322): Type '"outline"' is not assignable to type 'Compon... Remove this comment to see the full error message
					variant="outline"
				/>
			</GlassFormField>
		</div>
	),
};
