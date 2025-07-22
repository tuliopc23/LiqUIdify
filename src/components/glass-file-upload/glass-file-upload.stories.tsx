import type { Meta, StoryObj } from "@storybook/react";
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
		onFilesChange: (files) => {
			console.log("Files changed:", files);
		},
		onUpload: (files) => {
			console.log("Upload files:", files);
		},
	},
};

export const MultipleFiles: Story = {
	args: {
		...Default.args,
		multiple: true,
		maxFiles: 5,
	},
};

export const ImagesOnly: Story = {
	args: {
		...Default.args,
		accept: "image/*",
		multiple: true,
		showPreview: true,
	},
};

export const DocumentsOnly: Story = {
	args: {
		...Default.args,
		accept: ".pdf,.doc,.docx,.txt",
		multiple: true,
	},
};

export const WithSizeLimit: Story = {
	args: {
		...Default.args,
		maxSize: 2 * 1024 * 1024, // 2MB
		multiple: true,
	},
};

export const WithProgress: Story = {
	args: {
		...Default.args,
		showProgress: true,
		multiple: true,
	},
};

export const NoPreview: Story = {
	args: {
		...Default.args,
		showPreview: false,
		multiple: true,
	},
};

export const Disabled: Story = {
	args: {
		...Default.args,
		disabled: true,
	},
};

export const Error: Story = {
	args: {
		...Default.args,
		error: true,
	},
};

export const Success: Story = {
	args: {
		...Default.args,
		success: true,
	},
};

export const SmallSize: Story = {
	args: {
		...Default.args,
		size: "sm",
	},
};

export const LargeSize: Story = {
	args: {
		...Default.args,
		size: "lg",
	},
};

export const SecondaryVariant: Story = {
	args: {
		...Default.args,
		variant: "secondary",
	},
};

export const OutlineVariant: Story = {
	args: {
		...Default.args,
		variant: "outline",
	},
};

export const AllSizes: Story = {
	render: () => (
		<div className="space-y-6">
			<div className="text-sm text-gray-600">Small</div>
			<GlassFileUpload
				size="sm"
				onFilesChange={(files) => console.log("Small files:", files)}
				onUpload={(files) => console.log("Small upload:", files)}
			/>
			<div className="text-sm text-gray-600">Medium (default)</div>
			<GlassFileUpload
				size="md"
				onFilesChange={(files) => console.log("Medium files:", files)}
				onUpload={(files) => console.log("Medium upload:", files)}
			/>
			<div className="text-sm text-gray-600">Large</div>
			<GlassFileUpload
				size="lg"
				onFilesChange={(files) => console.log("Large files:", files)}
				onUpload={(files) => console.log("Large upload:", files)}
			/>
		</div>
	),
};

export const AllVariants: Story = {
	render: () => (
		<div className="space-y-6">
			<div className="text-sm text-gray-600">Default</div>
			<GlassFileUpload
				variant="default"
				onFilesChange={(files) => console.log("Default files:", files)}
				onUpload={(files) => console.log("Default upload:", files)}
			/>
			<div className="text-sm text-gray-600">Secondary</div>
			<GlassFileUpload
				variant="secondary"
				onFilesChange={(files) => console.log("Secondary files:", files)}
				onUpload={(files) => console.log("Secondary upload:", files)}
			/>
			<div className="text-sm text-gray-600">Outline</div>
			<GlassFileUpload
				variant="outline"
				onFilesChange={(files) => console.log("Outline files:", files)}
				onUpload={(files) => console.log("Outline upload:", files)}
			/>
		</div>
	),
};

export const AllStates: Story = {
	render: () => (
		<div className="space-y-6">
			<div className="text-sm text-gray-600">Normal</div>
			<GlassFileUpload
				onFilesChange={(files) => console.log("Normal files:", files)}
				onUpload={(files) => console.log("Normal upload:", files)}
			/>
			<div className="text-sm text-gray-600">Error</div>
			<GlassFileUpload
				error
				onFilesChange={(files) => console.log("Error files:", files)}
				onUpload={(files) => console.log("Error upload:", files)}
			/>
			<div className="text-sm text-gray-600">Success</div>
			<GlassFileUpload
				success
				onFilesChange={(files) => console.log("Success files:", files)}
				onUpload={(files) => console.log("Success upload:", files)}
			/>
			<div className="text-sm text-gray-600">Disabled</div>
			<GlassFileUpload
				disabled
				onFilesChange={(files) => console.log("Disabled files:", files)}
				onUpload={(files) => console.log("Disabled upload:", files)}
			/>
		</div>
	),
};

export const UseCases: Story = {
	render: () => (
		<div className="space-y-8">
			<div>
				<div className="text-sm text-gray-600 mb-2">Profile Picture Upload</div>
				<GlassFileUpload
					accept="image/*"
					maxSize={1024 * 1024} // 1MB
					showPreview
					onFilesChange={(files) => console.log("Profile picture:", files)}
					onUpload={(files) => console.log("Upload profile picture:", files)}
				/>
			</div>

			<div>
				<div className="text-sm text-gray-600 mb-2">Document Upload</div>
				<GlassFileUpload
					accept=".pdf,.doc,.docx"
					multiple
					maxFiles={3}
					maxSize={5 * 1024 * 1024} // 5MB
					variant="outline"
					onFilesChange={(files) => console.log("Documents:", files)}
					onUpload={(files) => console.log("Upload documents:", files)}
				/>
			</div>

			<div>
				<div className="text-sm text-gray-600 mb-2">Media Gallery Upload</div>
				<GlassFileUpload
					accept="image/*,video/*"
					multiple
					maxFiles={10}
					showPreview
					showProgress
					size="lg"
					onFilesChange={(files) => console.log("Media files:", files)}
					onUpload={(files) => console.log("Upload media:", files)}
				/>
			</div>

			<div>
				<div className="text-sm text-gray-600 mb-2">Resume Upload</div>
				<GlassFileUpload
					accept=".pdf,.doc,.docx"
					maxSize={2 * 1024 * 1024} // 2MB
					variant="secondary"
					onFilesChange={(files) => console.log("Resume:", files)}
					onUpload={(files) => console.log("Upload resume:", files)}
				/>
			</div>
		</div>
	),
};

export const WithCustomValidation: Story = {
	args: {
		...Default.args,
		multiple: true,
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
		multiple: true,
		showProgress: true,
		onUpload: async (files) => {
			console.log("Starting upload for files:", files);

			// Simulate upload progress
			for (let i = 0; i <= 100; i += 10) {
				await new Promise((resolve) => setTimeout(resolve, 100));
				console.log("Upload progress:", `${i}%`);
			}

			console.log("Upload completed");
		},
	},
};

export const RestrictedFileTypes: Story = {
	render: () => (
		<div className="space-y-6">
			<div>
				<div className="text-sm text-gray-600 mb-2">Images Only</div>
				<GlassFileUpload
					accept="image/jpeg,image/png,image/gif"
					showPreview
					onFilesChange={(files) => console.log("Images:", files)}
					onUpload={(files) => console.log("Upload images:", files)}
				/>
			</div>

			<div>
				<div className="text-sm text-gray-600 mb-2">PDFs Only</div>
				<GlassFileUpload
					accept=".pdf"
					multiple
					onFilesChange={(files) => console.log("PDFs:", files)}
					onUpload={(files) => console.log("Upload PDFs:", files)}
				/>
			</div>

			<div>
				<div className="text-sm text-gray-600 mb-2">Text Files Only</div>
				<GlassFileUpload
					accept=".txt,.csv,.json"
					multiple
					onFilesChange={(files) => console.log("Text files:", files)}
					onUpload={(files) => console.log("Upload text files:", files)}
				/>
			</div>
		</div>
	),
};

export const Interactive: Story = {
	args: {
		...Default.args,
		multiple: true,
		showPreview: true,
		showProgress: true,
		onFilesChange: (files) => {
			console.log(
				"Files changed:",
				files.map((f) => f.name),
			);
		},
		onUpload: (files) => {
			console.log(
				"Upload started for:",
				files.map((f) => f.name),
			);
		},
		onFileRemove: (file) => {
			console.log("File removed:", file.name);
		},
		onDragEnter: () => {
			console.log("Drag entered");
		},
		onDragLeave: () => {
			console.log("Drag left");
		},
		onDrop: (files) => {
			console.log(
				"Files dropped:",
				files.map((f) => f.name),
			);
		},
	},
};
