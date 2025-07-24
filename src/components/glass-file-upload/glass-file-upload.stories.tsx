import type { Meta, StoryObj } from "@storybook/react";
// @ts-expect-error TS(6142): Module './glass-file-upload' was resolved to '/Use... Remove this comment to see the full error message
import { GlassFileUpload } from "./glass-file-upload";

const meta: Meta<typeof GlassFileUpload> = {
	title: "Components/Form/GlassFileUpload",
	component: GlassFileUpload,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"A comprehensive file upload component with drag-and-drop, file validation, previews, and liquid glass styling.",
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		accept: {
			description: "Accepted file types (MIME types)",
			control: "text",
		},
		multiple: {
			description: "Whether multiple files can be selected",
			control: "boolean",
		},
		disabled: {
			description: "Whether the file upload is disabled",
			control: "boolean",
		},
		maxSize: {
			description: "Maximum file size in bytes",
			control: "number",
		},
		maxFiles: {
			description: "Maximum number of files allowed",
			control: "number",
		},
		showPreview: {
			description: "Whether to show file previews",
			control: "boolean",
		},
		showProgress: {
			description: "Whether to show upload progress",
			control: "boolean",
		},
		variant: {
			description: "Visual variant of the file upload",
			control: "select",
			options: ["default", "secondary", "outline"],
		},
		size: {
			description: "Size variant of the file upload",
			control: "select",
			options: ["sm", "md", "lg"],
		},
		error: {
			description: "Whether the file upload has an error state",
			control: "boolean",
		},
		success: {
			description: "Whether the file upload has a success state",
			control: "boolean",
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
// @ts-expect-error TS(2322): Type '(files: any) => void' is not assignable to t... Remove this comment to see the full error message
		onFilesChange: (files) => {
			console.log("Files changed:", files);
		},
// @ts-expect-error TS(2322): Type '(files: any) => void' is not assignable to t... Remove this comment to see the full error message
		onUpload: (files) => {
			console.log("Upload files:", files);
		},
	},
};

export const MultipleFiles: Story = {
	args: {
		...Default.args,
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
		multiple: true,
// @ts-expect-error TS(2322): Type 'number' is not assignable to type 'string'.
		maxFiles: 5,
	},
};

export const ImagesOnly: Story = {
	args: {
		...Default.args,
		accept: "image/*",
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
		multiple: true,
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
		showPreview: true,
	},
};

export const DocumentsOnly: Story = {
	args: {
		...Default.args,
		accept: ".pdf,.doc,.docx,.txt",
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
		multiple: true,
	},
};

export const WithSizeLimit: Story = {
	args: {
		...Default.args,
// @ts-expect-error TS(2322): Type 'number' is not assignable to type 'string'.
		maxSize: 2 * 1024 * 1024, // 2MB
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
		multiple: true,
	},
};

export const WithProgress: Story = {
	args: {
		...Default.args,
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
		showProgress: true,
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
		multiple: true,
	},
};

export const NoPreview: Story = {
	args: {
		...Default.args,
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
		showPreview: false,
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
		multiple: true,
	},
};

export const Disabled: Story = {
	args: {
		...Default.args,
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
		disabled: true,
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

export const AllSizes: Story = {
	render: () => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<div className="space-y-6">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="text-sm text-gray-600">Small</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassFileUpload
				size="sm"
// @ts-expect-error TS(2322): Type '(files: any) => void' is not assignable to t... Remove this comment to see the full error message
				onFilesChange={(files) => console.log("Small files:", files)}
// @ts-expect-error TS(2322): Type '(files: any) => void' is not assignable to t... Remove this comment to see the full error message
				onUpload={(files) => console.log("Small upload:", files)}
			/>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="text-sm text-gray-600">Medium (default)</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassFileUpload
				size="md"
// @ts-expect-error TS(2322): Type '(files: any) => void' is not assignable to t... Remove this comment to see the full error message
				onFilesChange={(files) => console.log("Medium files:", files)}
// @ts-expect-error TS(2322): Type '(files: any) => void' is not assignable to t... Remove this comment to see the full error message
				onUpload={(files) => console.log("Medium upload:", files)}
			/>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="text-sm text-gray-600">Large</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassFileUpload
				size="lg"
// @ts-expect-error TS(2322): Type '(files: any) => void' is not assignable to t... Remove this comment to see the full error message
				onFilesChange={(files) => console.log("Large files:", files)}
// @ts-expect-error TS(2322): Type '(files: any) => void' is not assignable to t... Remove this comment to see the full error message
				onUpload={(files) => console.log("Large upload:", files)}
			/>
		</div>
	),
};

export const AllVariants: Story = {
	render: () => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<div className="space-y-6">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="text-sm text-gray-600">Default</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassFileUpload
				variant="default"
// @ts-expect-error TS(2322): Type '(files: any) => void' is not assignable to t... Remove this comment to see the full error message
				onFilesChange={(files) => console.log("Default files:", files)}
// @ts-expect-error TS(2322): Type '(files: any) => void' is not assignable to t... Remove this comment to see the full error message
				onUpload={(files) => console.log("Default upload:", files)}
			/>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="text-sm text-gray-600">Secondary</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassFileUpload
				variant="secondary"
// @ts-expect-error TS(2322): Type '(files: any) => void' is not assignable to t... Remove this comment to see the full error message
				onFilesChange={(files) => console.log("Secondary files:", files)}
// @ts-expect-error TS(2322): Type '(files: any) => void' is not assignable to t... Remove this comment to see the full error message
				onUpload={(files) => console.log("Secondary upload:", files)}
			/>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="text-sm text-gray-600">Outline</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassFileUpload
				variant="outline"
// @ts-expect-error TS(2322): Type '(files: any) => void' is not assignable to t... Remove this comment to see the full error message
				onFilesChange={(files) => console.log("Outline files:", files)}
// @ts-expect-error TS(2322): Type '(files: any) => void' is not assignable to t... Remove this comment to see the full error message
				onUpload={(files) => console.log("Outline upload:", files)}
			/>
		</div>
	),
};

export const AllStates: Story = {
	render: () => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<div className="space-y-6">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="text-sm text-gray-600">Normal</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassFileUpload
// @ts-expect-error TS(2322): Type '(files: any) => void' is not assignable to t... Remove this comment to see the full error message
				onFilesChange={(files) => console.log("Normal files:", files)}
// @ts-expect-error TS(2322): Type '(files: any) => void' is not assignable to t... Remove this comment to see the full error message
				onUpload={(files) => console.log("Normal upload:", files)}
			/>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="text-sm text-gray-600">Error</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassFileUpload
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
				error
// @ts-expect-error TS(2322): Type '(files: any) => void' is not assignable to t... Remove this comment to see the full error message
				onFilesChange={(files) => console.log("Error files:", files)}
// @ts-expect-error TS(2322): Type '(files: any) => void' is not assignable to t... Remove this comment to see the full error message
				onUpload={(files) => console.log("Error upload:", files)}
			/>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="text-sm text-gray-600">Success</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassFileUpload
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
				success
// @ts-expect-error TS(2322): Type '(files: any) => void' is not assignable to t... Remove this comment to see the full error message
				onFilesChange={(files) => console.log("Success files:", files)}
// @ts-expect-error TS(2322): Type '(files: any) => void' is not assignable to t... Remove this comment to see the full error message
				onUpload={(files) => console.log("Success upload:", files)}
			/>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="text-sm text-gray-600">Disabled</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassFileUpload
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
				disabled
// @ts-expect-error TS(2322): Type '(files: any) => void' is not assignable to t... Remove this comment to see the full error message
				onFilesChange={(files) => console.log("Disabled files:", files)}
// @ts-expect-error TS(2322): Type '(files: any) => void' is not assignable to t... Remove this comment to see the full error message
				onUpload={(files) => console.log("Disabled upload:", files)}
			/>
		</div>
	),
};

export const UseCases: Story = {
	render: () => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<div className="space-y-8">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<div className="text-sm text-gray-600 mb-2">Profile Picture Upload</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassFileUpload
					accept="image/*"
// @ts-expect-error TS(2322): Type 'number' is not assignable to type 'string'.
					maxSize={1024 * 1024} // 1MB
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
					showPreview
// @ts-expect-error TS(2322): Type '(files: any) => void' is not assignable to t... Remove this comment to see the full error message
					onFilesChange={(files) => console.log("Profile picture:", files)}
// @ts-expect-error TS(2322): Type '(files: any) => void' is not assignable to t... Remove this comment to see the full error message
					onUpload={(files) => console.log("Upload profile picture:", files)}
				/>
			</div>

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<div className="text-sm text-gray-600 mb-2">Document Upload</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassFileUpload
					accept=".pdf,.doc,.docx"
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
					multiple
// @ts-expect-error TS(2322): Type 'number' is not assignable to type 'string'.
					maxFiles={3}
// @ts-expect-error TS(2322): Type 'number' is not assignable to type 'string'.
					maxSize={5 * 1024 * 1024} // 5MB
					variant="outline"
// @ts-expect-error TS(2322): Type '(files: any) => void' is not assignable to t... Remove this comment to see the full error message
					onFilesChange={(files) => console.log("Documents:", files)}
// @ts-expect-error TS(2322): Type '(files: any) => void' is not assignable to t... Remove this comment to see the full error message
					onUpload={(files) => console.log("Upload documents:", files)}
				/>
			</div>

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<div className="text-sm text-gray-600 mb-2">Media Gallery Upload</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassFileUpload
					accept="image/*,video/*"
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
					multiple
// @ts-expect-error TS(2322): Type 'number' is not assignable to type 'string'.
					maxFiles={10}
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
					showPreview
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
					showProgress
					size="lg"
// @ts-expect-error TS(2322): Type '(files: any) => void' is not assignable to t... Remove this comment to see the full error message
					onFilesChange={(files) => console.log("Media files:", files)}
// @ts-expect-error TS(2322): Type '(files: any) => void' is not assignable to t... Remove this comment to see the full error message
					onUpload={(files) => console.log("Upload media:", files)}
				/>
			</div>

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<div className="text-sm text-gray-600 mb-2">Resume Upload</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassFileUpload
					accept=".pdf,.doc,.docx"
// @ts-expect-error TS(2322): Type 'number' is not assignable to type 'string'.
					maxSize={2 * 1024 * 1024} // 2MB
					variant="secondary"
// @ts-expect-error TS(2322): Type '(files: any) => void' is not assignable to t... Remove this comment to see the full error message
					onFilesChange={(files) => console.log("Resume:", files)}
// @ts-expect-error TS(2322): Type '(files: any) => void' is not assignable to t... Remove this comment to see the full error message
					onUpload={(files) => console.log("Upload resume:", files)}
				/>
			</div>
		</div>
	),
};

export const WithCustomValidation: Story = {
	args: {
		...Default.args,
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
		multiple: true,
// @ts-expect-error TS(2322): Type '(file: any) => "Filename too long (max 50 ch... Remove this comment to see the full error message
		validateFile: (file) => {
			if (file.name.length > 50) {
				return "Filename too long (max 50 characters)";
			}
			if (file.type.startsWith("image/") && file.size > 1024 * 1024) {
				return "Image files must be smaller than 1MB";
			}
			return null;
		},
	},
};

export const WithUploadProgress: Story = {
	args: {
		...Default.args,
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
		multiple: true,
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
		showProgress: true,
// @ts-expect-error TS(2322): Type '(files: any) => Promise<void>' is not assign... Remove this comment to see the full error message
		onUpload: async (files) => {
			console.log("Starting upload for files:", files);

			// Simulate upload progress
			for (let index = 0; index <= 100; index += 10) {
				await new Promise((resolve) => setTimeout(resolve, 100));
				console.log("Upload progress:", `${index}%`);
			}

			console.log("Upload completed");
		},
	},
};

export const RestrictedFileTypes: Story = {
	render: () => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<div className="space-y-6">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<div className="text-sm text-gray-600 mb-2">Images Only</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassFileUpload
					accept="image/jpeg,image/png,image/gif"
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
					showPreview
// @ts-expect-error TS(2322): Type '(files: any) => void' is not assignable to t... Remove this comment to see the full error message
					onFilesChange={(files) => console.log("Images:", files)}
// @ts-expect-error TS(2322): Type '(files: any) => void' is not assignable to t... Remove this comment to see the full error message
					onUpload={(files) => console.log("Upload images:", files)}
				/>
			</div>

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<div className="text-sm text-gray-600 mb-2">PDFs Only</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassFileUpload
					accept=".pdf"
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
					multiple
// @ts-expect-error TS(2322): Type '(files: any) => void' is not assignable to t... Remove this comment to see the full error message
					onFilesChange={(files) => console.log("PDFs:", files)}
// @ts-expect-error TS(2322): Type '(files: any) => void' is not assignable to t... Remove this comment to see the full error message
					onUpload={(files) => console.log("Upload PDFs:", files)}
				/>
			</div>

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<div className="text-sm text-gray-600 mb-2">Text Files Only</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassFileUpload
					accept=".txt,.csv,.json"
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
					multiple
// @ts-expect-error TS(2322): Type '(files: any) => void' is not assignable to t... Remove this comment to see the full error message
					onFilesChange={(files) => console.log("Text files:", files)}
// @ts-expect-error TS(2322): Type '(files: any) => void' is not assignable to t... Remove this comment to see the full error message
					onUpload={(files) => console.log("Upload text files:", files)}
				/>
			</div>
		</div>
	),
};

export const Interactive: Story = {
	args: {
		...Default.args,
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
		multiple: true,
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
		showPreview: true,
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
		showProgress: true,
// @ts-expect-error TS(2322): Type '(files: any) => void' is not assignable to t... Remove this comment to see the full error message
		onFilesChange: (files) => {
			console.log(
				"Files changed:",
// @ts-expect-error TS(7006): Parameter 'f' implicitly has an 'any' type.
				files.map((f) => f.name),
			);
		},
// @ts-expect-error TS(2322): Type '(files: any) => void' is not assignable to t... Remove this comment to see the full error message
		onUpload: (files) => {
			console.log(
				"Upload started for:",
// @ts-expect-error TS(7006): Parameter 'f' implicitly has an 'any' type.
				files.map((f) => f.name),
			);
		},
// @ts-expect-error TS(2322): Type '(file: any) => void' is not assignable to ty... Remove this comment to see the full error message
		onFileRemove: (file) => {
			console.log("File removed:", file.name);
		},
// @ts-expect-error TS(2322): Type '() => void' is not assignable to type 'strin... Remove this comment to see the full error message
		onDragEnter: () => {
			console.log("Drag entered");
		},
// @ts-expect-error TS(2322): Type '() => void' is not assignable to type 'strin... Remove this comment to see the full error message
		onDragLeave: () => {
			console.log("Drag left");
		},
// @ts-expect-error TS(2322): Type '(files: any) => void' is not assignable to t... Remove this comment to see the full error message
		onDrop: (files) => {
			console.log(
				"Files dropped:",
// @ts-expect-error TS(7006): Parameter 'f' implicitly has an 'any' type.
				files.map((f) => f.name),
			);
		},
	},
};
