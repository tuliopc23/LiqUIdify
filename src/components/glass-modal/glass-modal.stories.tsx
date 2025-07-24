import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
// @ts-expect-error TS(6142): Module '../glass-button-refactored/glass-button' w... Remove this comment to see the full error message
import { GlassButton } from "../glass-button-refactored/glass-button";
// @ts-expect-error TS(6142): Module './glass-modal' was resolved to '/Users/tul... Remove this comment to see the full error message
import { GlassModal } from "./glass-modal";

const meta: Meta<typeof GlassModal> = {
	title: "Glass/GlassModal",
// @ts-expect-error TS(2322): Type '({ isOpen, onClose, title, children, classNa... Remove this comment to see the full error message
	component: GlassModal,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		isOpen: {
			control: "boolean",
		},
		title: {
			control: "text",
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

// Helper component for interactive stories
const ModalWrapper = ({
	title,
	children,
	className,
	titleClassName,
	contentClassName,
}: {
	title?: string;
	children: React.ReactNode;
	className?: string;
	titleClassName?: string;
	contentClassName?: string;
}) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassButton onClick={() => setIsOpen(true)}>Open Modal</GlassButton>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassModal
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				title={title}
				className={className}
				titleClassName={titleClassName}
				contentClassName={contentClassName}
			>
				{children}
			</GlassModal>
		</>
	);
};

export const Default: Story = {
	render: () => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<ModalWrapper title="Confirmation">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<p className="text-gray-600 dark:text-gray-300 mb-4">
				Are you sure you want to delete this item? This action cannot be undone.
			</p>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="flex gap-3 justify-end">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassButton variant="secondary" size="sm">
					Cancel
				</GlassButton>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassButton variant="destructive" size="sm">
					Delete
				</GlassButton>
			</div>
		</ModalWrapper>
	),
};

export const WithoutTitle: Story = {
	render: () => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<ModalWrapper>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="text-center">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
					Welcome!
				</h2>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<p className="text-gray-600 dark:text-gray-300 mb-4">
					This modal doesn't have a title in the header.
				</p>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassButton>Get Started</GlassButton>
			</div>
		</ModalWrapper>
	),
};

export const Form: Story = {
	render: () => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<ModalWrapper title="Create New Item">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<form className="space-y-4">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<label
						htmlFor="name"
						className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
					>
						Name
					</label>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<input
						type="text"
						id="name"
						className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
						placeholder="Enter item name"
					/>
				</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<label
						htmlFor="description"
						className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
					>
						Description
					</label>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<textarea
						id="description"
						rows={3}
						className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
						placeholder="Enter description"
					/>
				</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<div className="flex gap-3 justify-end pt-4">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<GlassButton variant="secondary" size="sm">
						Cancel
					</GlassButton>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<GlassButton variant="primary" size="sm">
						Create
					</GlassButton>
				</div>
			</form>
		</ModalWrapper>
	),
};

export const LongContent: Story = {
	render: () => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<ModalWrapper title="Terms and Conditions" className="max-w-2xl">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="max-h-96 overflow-y-auto pr-2 space-y-4">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<p className="text-gray-600 dark:text-gray-300">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
					minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					aliquip ex ea commodo consequat.
				</p>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<p className="text-gray-600 dark:text-gray-300">
					Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
					dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
					proident, sunt in culpa qui officia deserunt mollit anim id est
					laborum.
				</p>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<p className="text-gray-600 dark:text-gray-300">
					Sed ut perspiciatis unde omnis iste natus error sit voluptatem
					accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
					ab illo inventore veritatis et quasi architecto beatae vitae dicta
					sunt explicabo.
				</p>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<p className="text-gray-600 dark:text-gray-300">
					Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
					fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
					sequi nesciunt.
				</p>
			</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="flex gap-3 justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassButton variant="secondary" size="sm">
					Decline
				</GlassButton>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassButton variant="primary" size="sm">
					Accept
				</GlassButton>
			</div>
		</ModalWrapper>
	),
};

export const AlwaysOpen: Story = {
	args: {
		isOpen: true,
		onClose: () => console.log("Modal close requested"),
		title: "Example Modal",
		children: (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<p className="text-gray-600 dark:text-gray-300 mb-4">
					This modal is always open for demonstration purposes.
				</p>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassButton>Action Button</GlassButton>
			</div>
		),
	},
};
