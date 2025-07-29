import { AnimatePresence, motion } from 'framer-motion';
import {
  Archive,
  File,
  FileText,
  Image,
  Music,
  Upload,
  Video,
  X,
} from 'lucide-react';
import type React from 'react';
import { forwardRef, useCallback, useRef, useState } from 'react';
import { cn } from '@/core/utils/classname';
import { createVariants as cva } from '../../lib/variant-system';

const fileUploadVariants = cva({
  base: 'relative w-full rounded-xl border-2 border-dashed bg-white/5 backdrop-blur-sm transition-all duration-200',
  variants: {
    size: {
      sm: 'min-h-[120px] p-4',
      md: 'min-h-[160px] p-6',
      lg: 'min-h-[200px] p-8',
    },
    state: {
      idle: 'border-white/20 hover:border-white/40 hover:bg-white/10',
      dragover: 'border-blue-400 bg-blue-500/10',
      uploading: 'border-green-400 bg-green-500/10',
      error: 'border-red-400 bg-red-500/10',
    },
  },
  defaultVariants: {
    size: 'md',
    state: 'idle',
  },
});

const fileItemVariants = cva({
  base: 'flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3 backdrop-blur-sm transition-all duration-200',
  variants: {
    status: {
      pending: 'border-white/10',
      uploading: 'border-blue-400/50 bg-blue-500/10',
      success: 'border-green-400/50 bg-green-500/10',
      error: 'border-red-400/50 bg-red-500/10',
    },
  },
  defaultVariants: {
    status: 'pending',
  },
});

export interface FileUploadItem {
  id: string;
  file: File;
  status: 'pending' | 'uploading' | 'success' | 'error';
  progress?: number;
  error?: string;
  preview?: string;
}

export interface GlassFileUploadProps {
  onFilesChange?: (files: Array<FileUploadItem>) => void;
  onUpload?: (files: Array<File>) => Promise<void>;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxFileSize?: number; // in bytes
  disabled?: boolean;
  showPreview?: boolean;
  showProgress?: boolean;
  allowedTypes?: Array<string>;
  dropzoneText?: string;
  browseText?: string;
  className?: string;
  id?: string;
  onDragEnter?: React.DragEventHandler<HTMLDivElement>;
  onDragLeave?: React.DragEventHandler<HTMLDivElement>;
  onDragOver?: React.DragEventHandler<HTMLDivElement>;
  onDrop?: React.DragEventHandler<HTMLDivElement>;
  size?: 'sm' | 'md' | 'lg';
}

const GlassFileUpload = forwardRef<HTMLDivElement, GlassFileUploadProps>(
  (
    {
      className,
      size,
      onFilesChange,
      onUpload,
      accept = '*/*',
      multiple = true,
      maxFiles = 5,
      maxFileSize = 10 * 1024 * 1024, // 10MB
      disabled = false,
      showPreview = true,
      showProgress = true,
      allowedTypes = [],
      dropzoneText = 'Drag and drop files here, or click to browse',
      browseText = 'Browse files',
    },
    ref
  ) => {
    const [files, setFiles] = useState<FileUploadItem[]>([]);
    const [isDragOver, setIsDragOver] = useState(false);
    const [uploadState, setUploadState] = useState<
      'idle' | 'uploading' | 'error'
    >('idle');

    const fileInputRef = useRef<HTMLInputElement>(null);
    const dragCountRef = useRef(0);

    // Handle upload
    const handleUpload = useCallback(
      async (filesToUpload: Array<FileUploadItem>) => {
        if (!onUpload) {
          return;
        }

        setUploadState('uploading');

        try {
          // Update files to uploading state
          const updatedFiles = files.map((f) => {
            if (filesToUpload.find((u) => u.id === f.id)) {
              return { ...f, status: 'uploading' as const };
            }
            return f;
          });
          setFiles(updatedFiles);

          // Upload files
          await onUpload(filesToUpload.map((f) => f.file));

          // Update files to success state
          const successFiles = files.map((f) => {
            if (filesToUpload.find((u) => u.id === f.id)) {
              return { ...f, status: 'success' as const };
            }
            return f;
          });
          setFiles(successFiles);
          setUploadState('idle');
        } catch (error) {
          // Update files to error state
          const errorFiles = files.map((f) => {
            if (filesToUpload.find((u) => u.id === f.id)) {
              return {
                ...f,
                status: 'error' as const,
                error: error instanceof Error ? error.message : 'Upload failed',
              };
            }
            return f;
          });
          setFiles(errorFiles);
          setUploadState('error');
        }
      },
      [onUpload, files]
    );

    // Get file icon based on type
    const getFileIcon = (file: File) => {
      const type = file.type.toLowerCase();

      if (type.startsWith('image/')) {
        return Image;
      }
      if (type.startsWith('video/')) {
        return Video;
      }
      if (type.startsWith('audio/')) {
        return Music;
      }
      if (type.includes('pdf') || type.includes('document')) {
        return FileText;
      }
      if (type.includes('zip') || type.includes('rar')) {
        return Archive;
      }

      return File;
    };

    // Format file size
    const formatFileSize = (bytes: number): string => {
      if (bytes === 0) {
        return '0 Bytes';
      }
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const index = Math.floor(Math.log(bytes) / Math.log(k));
      return `${Number.parseFloat((bytes / k ** index).toFixed(2))} ${sizes[index]}`;
    };

    // Validate file
    const validateFile = useCallback(
      (file: File): string | null => {
        if (maxFileSize && file.size > maxFileSize) {
          return `File size exceeds ${formatFileSize(maxFileSize)}`;
        }

        if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
          return 'File type not allowed';
        }

        return null;
      },
      [maxFileSize, allowedTypes, formatFileSize]
    );

    // Create file preview
    const createPreview = (file: File): Promise<string | null> => {
      return new Promise((resolve) => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.addEventListener('load', (e) => {
            const result = e.target?.result;
            resolve(result ? (result as string) : null);
          });

          reader.onerror = () => resolve(null);
          reader.readAsDataURL(file);
        } else {
          resolve(null);
        }
      });
    };

    // Process files
    const processFiles = useCallback(
      async (fileList: Array<File>) => {
        if (disabled) {
          return;
        }

        const newFiles: Array<FileUploadItem> = [];

        for (const file of fileList) {
          const error = validateFile(file);
          const preview = showPreview ? await createPreview(file) : undefined;

          const fileItem: FileUploadItem = {
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
            file,
            status: error ? 'error' : 'pending',
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
          const validFiles = newFiles.filter((f) => f.status === 'pending');
          if (validFiles.length > 0) {
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
      ]
    );

    // Handle file input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const fileList = [...(e.target.files || [])];
      if (fileList.length > 0) {
        processFiles(fileList);
      }
    };

    // Handle drag events
    const handleDragEnter = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragCountRef.current++;
      if (dragCountRef.current === 1) {
        setIsDragOver(true);
      }
    };

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragCountRef.current--;
      if (dragCountRef.current === 0) {
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
      if (fileList.length > 0) {
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

    const currentState = isDragOver ? 'dragover' : uploadState;

    return (
      <div
        ref={ref}
        className={cn(
          fileUploadVariants({ size, state: currentState }),
          className
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        role="button"
        tabIndex={0}
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
          <div className="mb-4 flex justify-center">
            <Upload
              className={cn(
                'h-12 w-12 transition-colors duration-200',
                isDragOver ? 'text-blue-400' : 'text-white/60'
              )}
            />
          </div>

          <p className="mb-2 text-white/80">{dropzoneText}</p>

          <button
            type="button"
            onClick={openFileDialog}
            disabled={disabled}
            className={cn(
              'rounded-lg px-4 py-2 transition-all duration-200',
              'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30',
              'border border-blue-400/30 hover:border-blue-400/50',
              'disabled:cursor-not-allowed disabled:opacity-50'
            )}
          >
            {browseText}
          </button>
        </div>

        {/* File List */}
        <AnimatePresence>
          {files.length > 0 && (
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
                      fileItemVariants({ status: fileItem.status })
                    )}
                  >
                    {/* File Preview/Icon */}
                    <div className="flex-shrink-0">
                      {fileItem.preview ? (
                        <img
                          src={fileItem.preview}
                          alt={fileItem.file.name}
                          className="h-10 w-10 rounded object-cover"
                        />
                      ) : (
                        <Icon className="h-10 w-10 text-white/60" />
                      )}
                    </div>

                    {/* File Info */}
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-white/90">
                        {fileItem.file.name}
                      </p>

                      <p className="text-sm text-white/60">
                        {formatFileSize(fileItem.file.size)}
                      </p>

                      {/* Progress Bar */}
                      {showProgress && fileItem.status === 'uploading' && (
                        <div className="mt-1 h-1.5 w-full rounded-full bg-white/10">
                          <div
                            className="h-1.5 rounded-full bg-blue-400 transition-all duration-300"
                            style={{ width: `${fileItem.progress || 0}%` }}
                          />
                        </div>
                      )}

                      {/* Error Message */}
                      {fileItem.error && (
                        <p className="mt-1 text-red-400 text-xs">
                          {fileItem.error}
                        </p>
                      )}
                    </div>

                    {/* Remove Button */}
                    <button
                      type="button"
                      onClick={() => removeFile(fileItem.id)}
                      className="flex-shrink-0 rounded-lg p-1 transition-colors hover:bg-white/10"
                      aria-label="Remove file"
                    >
                      <X className="h-4 w-4 text-white/60" />
                    </button>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

GlassFileUpload.displayName = 'GlassFileUpload';

export { GlassFileUpload };
