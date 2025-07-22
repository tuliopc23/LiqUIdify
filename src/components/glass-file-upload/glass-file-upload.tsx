import { cva, type VariantProps } from "class-variance-authority";
import { AnimatePresence, motion } from "framer-motion";
import {
	Archive,
	File,
	FileText,
	Image,
	Music,
	Upload,
	Video,
	X,
} from "lucide-react";
import type React from "react";
import { forwardRef, useCallback, useRef, useState } from "react";
import { cn } from "@/core/utils/classname";

const fileUploadVariants = cva(
	[
		"relative w-full rounded-xl border-2 border-dashed transition-all duration-200",
		"bg-white/5 backdrop-blur-sm",
	],
	{
		variants: {
			size: {
				sm: "p-4 min-h-[120px]",
				md: "p-6 min-h-[160px]",
				lg: "p-8 min-h-[200px]",
			},
			state: {
				idle: "border-white/20 hover:border-white/40 hover:bg-white/10",
				dragover: "border-blue-400 bg-blue-500/10",
				uploading: "border-green-400 bg-green-500/10",
				error: "border-red-400 bg-red-500/10",
			},
		},
		defaultVariants: {
			size: "md",
			state: "idle",
		},
	},
);

const fileItemVariants = cva(
	[
		"flex items-center gap-3 p-3 rounded-lg",
		"bg-white/5 backdrop-blur-sm border border-white/10",
		"transition-all duration-200",
	],
	{
		variants: {
			status: {
				pending: "border-white/10",
				uploading: "border-blue-400/50 bg-blue-500/10",
				success: "border-green-400/50 bg-green-500/10",
				error: "border-red-400/50 bg-red-500/10",
			},
		},
		defaultVariants: {
			status: "pending",
		},
	},
);

export interface FileUploadItem {
	id: string;
	file: File;
	status: "pending" | "uploading" | "success" | "error";
	progress?: number;
	error?: string;
	preview?: string;
}

export interface GlassFileUploadProps
	extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
		VariantProps<typeof fileUploadVariants> {
	onFilesChange?: (files: FileUploadItem[]) => void;
	onUpload?: (files: File[]) => Promise<void>;
	accept?: string;
	multiple?: boolean;
	maxFiles?: number;
	maxFileSize?: number; // in bytes
	disabled?: boolean;
	showPreview?: boolean;
	showProgress?: boolean;
	allowedTypes?: string[];
	dropzoneText?: string;
	browseText?: string;
}

const GlassFileUpload = forwardRef<HTMLDivElement, GlassFileUploadProps>(
	(
		{
			className,
			size,
			onFilesChange,
			onUpload,
			accept = "*/*",
			multiple = true,
			maxFiles = 5,
			maxFileSize = 10 * 1024 * 1024, // 10MB
			disabled = false,
			showPreview = true,
			showProgress = true,
			allowedTypes = [],
			dropzoneText = "Drag and drop files here, or click to browse",
			browseText = "Browse files",
			...props
		},
		ref,
	) => {
		const [files, setFiles] = useState<FileUploadItem[]>([]);
		const [isDragOver, setIsDragOver] = useState(false);
		const [uploadState, setUploadState] = useState<
			"idle" | "uploading" | "error"
		>("idle");

		const fileInputRef = useRef<HTMLInputElement>(null);
		const dragCountRef = useRef(0);

		// Handle upload
		const handleUpload = useCallback(
			async (filesToUpload: FileUploadItem[]) => {
				if (!onUpload) {
					return;
				}

				setUploadState("uploading");

				try {
					// Update files to uploading state
					const updatedFiles = files.map((f) => {
						if (filesToUpload.find((u) => u.id === f.id)) {
							return { ...f, status: "uploading" as const };
						}
						return f;
					});
					setFiles(updatedFiles);

					// Upload files
					await onUpload(filesToUpload.map((f) => f.file));

					// Update files to success state
					const successFiles = files.map((f) => {
						if (filesToUpload.find((u) => u.id === f.id)) {
							return { ...f, status: "success" as const };
						}
						return f;
					});
					setFiles(successFiles);
					setUploadState("idle");
				} catch (error) {
					// Update files to error state
					const errorFiles = files.map((f) => {
						if (filesToUpload.find((u) => u.id === f.id)) {
							return {
								...f,
								status: "error" as const,
								error: error instanceof Error ? error.message : "Upload failed",
							};
						}
						return f;
					});
					setFiles(errorFiles);
					setUploadState("error");
				}
			},
			[onUpload, files],
		);

		// Get file icon based on type
		const getFileIcon = (file: File) => {
			const type = file.type.toLowerCase();

			if (type.startsWith("image/")) {
				return Image;
			}
			if (type.startsWith("video/")) {
				return Video;
			}
			if (type.startsWith("audio/")) {
				return Music;
			}
			if (type.includes("pdf") || type.includes("document")) {
				return FileText;
			}
			if (type.includes("zip") || type.includes("rar")) {
				return Archive;
			}

			return File;
		};

		// Format file size
		const formatFileSize = (bytes: number): string => {
			if (0 === bytes) {
				return "0 Bytes";
			}
			const k = 1024;
			const sizes = ["Bytes", "KB", "MB", "GB"];
			const i = Math.floor(Math.log(bytes) / Math.log(k));
			return `${parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
		};

		// Validate file
		const validateFile = useCallback(
			(file: File): string | null => {
				if (maxFileSize && file.size > maxFileSize) {
					return `File size exceeds ${formatFileSize(maxFileSize)}`;
				}

				if (0 < allowedTypes.length && !allowedTypes.includes(file.type)) {
					return "File type not allowed";
				}

    return null;
			},
			[maxFileSize, allowedTypes, formatFileSize],
		);

		// Create file preview
		const createPreview = (file: File): Promise<string | null> => {
			return new Promise((resolve) => {
				if (file.type.startsWith("image/")) {
					const reader = new FileReader();
					reader.onload = (e) => resolve(e.target?.result as string);
     reader.onerror = () => resolve(null);
					reader.readAsDataURL(file);
				} else {
     resolve(null);
				}
			});
		};

		// Process files
		const processFiles = useCallback(
			async (fileList: File[]) => {
				if (disabled) {
					return;
				}

				const newFiles: FileUploadItem[] = [];

				for (const file of fileList) {
					const error = validateFile(file);
					const preview = showPreview ? await createPreview(file) : undefined;

					const fileItem: FileUploadItem = {
						id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
						file,
						status: error ? "error" : "pending",
						error: error || undefined,
						preview: preview || undefined,
					};

					newFiles.push(fileItem);
				}

				const updatedFiles = [...files, ...newFiles].slice(0, maxFiles);
				setFiles(updatedFiles);
				onFilesChange?.(updatedFiles);

				// Auto-upload if onUpload is provided
				if (onUpload) {
					const validFiles = newFiles.filter((f) => "pending" === f.status);
					if (0 < validFiles.length) {
						await handleUpload(validFiles);
					}
				}
			},
			[
				files,
				disabled,
				maxFiles,
				onFilesChange,
				onUpload,
				showPreview,
				validateFile,
				handleUpload,
				createPreview,
			],
		);

		// Handle file input change
		const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const fileList = [...(e.target.files || [])];
			if (0 < fileList.length) {
				processFiles(fileList);
			}
		};

		// Handle drag events
		const handleDragEnter = (e: React.DragEvent) => {
			e.preventDefault();
			e.stopPropagation();
			dragCountRef.current++;
			if (1 === dragCountRef.current) {
				setIsDragOver(true);
			}
		};

		const handleDragLeave = (e: React.DragEvent) => {
			e.preventDefault();
			e.stopPropagation();
			dragCountRef.current--;
			if (0 === dragCountRef.current) {
				setIsDragOver(false);
			}
		};

		const handleDragOver = (e: React.DragEvent) => {
			e.preventDefault();
			e.stopPropagation();
		};

		const handleDrop = (e: React.DragEvent) => {
			e.preventDefault();
			e.stopPropagation();

			setIsDragOver(false);
			dragCountRef.current = 0;

			const fileList = [...e.dataTransfer.files];
			if (0 < fileList.length) {
				processFiles(fileList);
			}
		};

		// Remove file
		const removeFile = (fileId: string) => {
			const updatedFiles = files.filter((f) => f.id !== fileId);
			setFiles(updatedFiles);
			onFilesChange?.(updatedFiles);
		};

		// Open file dialog
		const openFileDialog = () => {
			if (!disabled) {
				fileInputRef.current?.click();
			}
		};

		const currentState = isDragOver ? "dragover" : uploadState;

		return (
			<div
				ref={ref}
				className={cn(
					fileUploadVariants({ size, state: currentState }),
					className,
				)}
				onDragEnter={handleDragEnter}
				onDragLeave={handleDragLeave}
				onDragOver={handleDragOver}
				onDrop={handleDrop}
				{...props}
			>
				<input
					ref={fileInputRef}
					type="file"
					accept={accept}
					multiple={multiple}
					onChange={handleInputChange}
					className="hidden"
					disabled={disabled}
				/>

				{/* Upload Area */}
				<div className="text-center">
					<div className="flex justify-center mb-4">
						<Upload
							className={cn(
								"w-12 h-12 transition-colors duration-200",
								isDragOver ? "text-blue-400" : "text-white/60",
							)}
						/>
					</div>

					<p className="text-white/80 mb-2">{dropzoneText}</p>

					<button
						type="button"
						onClick={openFileDialog}
						disabled={disabled}
						className={cn(
							"px-4 py-2 rounded-lg transition-all duration-200",
							"bg-blue-500/20 hover:bg-blue-500/30 text-blue-400",
							"border border-blue-400/30 hover:border-blue-400/50",
							"disabled:opacity-50 disabled:cursor-not-allowed",
						)}
					>
						{browseText}
					</button>
				</div>

				{/* File List */}
				<AnimatePresence>
					{0 < files.length && (
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							className="mt-6 space-y-2"
						>
							{files.map((fileItem) => {
								const Icon = getFileIcon(fileItem.file);

								return (
									<motion.div
										key={fileItem.id}
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: 20 }}
										className={cn(
											fileItemVariants({ status: fileItem.status }),
										)}
									>
										{/* File Preview/Icon */}
										<div className="flex-shrink-0">
											{fileItem.preview ? (
												<img
													src={fileItem.preview}
													alt={fileItem.file.name}
													className="w-10 h-10 object-cover rounded"
												/>
											) : (
												<Icon className="w-10 h-10 text-white/60" />
											)}
										</div>

										{/* File Info */}
										<div className="flex-1 min-w-0">
											<p className="text-white/90 truncate font-medium">
												{fileItem.file.name}
											</p>
											<p className="text-white/60 text-sm">
												{formatFileSize(fileItem.file.size)}
											</p>

											{/* Progress Bar */}
											{showProgress && "uploading" === fileItem.status && (
												<div className="w-full bg-white/10 rounded-full h-1.5 mt-1">
													<div
														className="bg-blue-400 h-1.5 rounded-full transition-all duration-300"
														style={{ width: `${fileItem.progress || 0}%` }}
													/>
												</div>
											)}

											{/* Error Message */}
											{fileItem.error && (
												<p className="text-red-400 text-xs mt-1">
													{fileItem.error}
												</p>
											)}
										</div>

										{/* Remove Button */}
										<button
											type="button"
											onClick={() => removeFile(fileItem.id)}
											className="flex-shrink-0 p-1 hover:bg-white/10 rounded-lg transition-colors"
											aria-label="Remove file"
										>
											<X className="w-4 h-4 text-white/60" />
										</button>
									</motion.div>
								);
							})}
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		);
	},
);

GlassFileUpload.displayName = "GlassFileUpload";

export { GlassFileUpload };
