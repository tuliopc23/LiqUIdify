import type { Meta, StoryObj } from "@storybook/react-vite";
// @ts-expect-error TS(6142): Module './glass-textarea' was resolved to '/Users/... Remove this comment to see the full error message
import { GlassTextarea } from "./glass-textarea";

const meta: Meta<typeof GlassTextarea> = {
	title: "Glass/GlassTextarea",
	component: GlassTextarea,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: { type: "select" },
			options: ["default", "minimal"],
		},
		resize: {
			control: { type: "select" },
			options: ["none", "vertical", "horizontal", "both"],
		},
		disabled: {
			control: "boolean",
		},
		placeholder: {
			control: "text",
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		placeholder: "Enter your message...",
	},
};

export const Minimal: Story = {
	args: {
		variant: "minimal",
		placeholder: "Minimal textarea",
	},
};

export const WithValue: Story = {
	args: {
		defaultValue: "This is some sample text in the textarea.",
		placeholder: "Enter your message...",
	},
};

export const ResizeOptions: Story = {
	render: () => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<div className="space-y-4 w-full max-w-md">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<label className="block text-sm font-medium mb-2">No Resize</label>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassTextarea resize="none" placeholder="Cannot be resized" />
			</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<label className="block text-sm font-medium mb-2">
					Vertical Resize
				</label>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassTextarea
					resize="vertical"
					placeholder="Can be resized vertically"
				/>
			</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<label className="block text-sm font-medium mb-2">
					Horizontal Resize
				</label>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassTextarea
					resize="horizontal"
					placeholder="Can be resized horizontally"
				/>
			</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<label className="block text-sm font-medium mb-2">
					Both Directions
				</label>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassTextarea
					resize="both"
					placeholder="Can be resized in both directions"
				/>
			</div>
		</div>
	),
};

export const States: Story = {
	render: () => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<div className="space-y-4 w-full max-w-md">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<label className="block text-sm font-medium mb-2">Normal</label>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassTextarea placeholder="Normal textarea" />
			</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<label className="block text-sm font-medium mb-2">Disabled</label>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassTextarea disabled placeholder="Disabled textarea" />
			</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<label className="block text-sm font-medium mb-2">With Value</label>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassTextarea defaultValue="This textarea has some initial content that demonstrates how text appears in the component." />
			</div>
		</div>
	),
};

export const FormExample: Story = {
	render: () => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<div className="w-full max-w-md space-y-4">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<label htmlFor="message" className="block text-sm font-medium mb-2">
					Message
				</label>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassTextarea
					id="message"
					placeholder="Write your message here..."
					rows={4}
				/>
			</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<label htmlFor="feedback" className="block text-sm font-medium mb-2">
					Feedback (Minimal)
				</label>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassTextarea
					id="feedback"
					variant="minimal"
					placeholder="Your feedback..."
					rows={3}
				/>
			</div>
		</div>
	),
};
