import React from 'react';

export interface FileUploadItem {
  file: File;
  status: 'idle' | 'uploading' | 'success' | 'error';
  progress?: number;
}

export interface GlassFileUploadProps {
  // Core Props
  onFilesChange?: (files: Array<FileUploadItem>) => void;
  onUpload?: (files: Array<File>) => Promise<void>;

  // Configuration
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxFileSize?: number;
  allowedTypes?: Array<string>;

  // Appearance
  size?: 'sm' | 'md' | 'lg';
  dropzoneText?: string;
  browseText?: string;

  // Features
  showPreview?: boolean;
  showProgress?: boolean;

  // State
  disabled?: boolean;

  // HTML Props
  className?: string;
}

export const GlassFileUpload: React.FC<GlassFileUploadProps> = ({
  onFilesChange,
  onUpload,
  accept = "*/*",
  multiple = true,
  maxFiles = 5,
  maxFileSize = 10 * 1024 * 1024,
  allowedTypes = [],
  size = "md",
  dropzoneText = "Drag and drop files here, or click to browse",
  browseText = "Browse files",
  showPreview = true,
  showProgress = true,
  disabled = false,
  className = "",
}) => {
  const [files, setFiles] = React.useState<Array<FileUploadItem>>([]);
  const [isDragOver, setIsDragOver] = React.useState(false);

  const handleFileChange = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles: Array<FileUploadItem> = Array.from(selectedFiles).map(file => ({
      file,
      status: 'idle' as const,
      progress: 0,
    }));

    const updatedFiles = [...files, ...newFiles].slice(0, maxFiles);
    setFiles(updatedFiles);
    onFilesChange?.(updatedFiles);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileChange(e.dataTransfer.files);
  };

  const sizeClasses = {
    sm: 'h-32 text-sm',
    md: 'h-48 text-base',
    lg: 'h-64 text-lg',
  };

  return (
    <div className={`glass-file-upload ${className}`}>
      <div
        className={`
          relative flex flex-col items-center justify-center
          border-2 border-dashed rounded-xl
          transition-all duration-200 ease-in-out
          backdrop-blur-sm bg-white/10
          ${isDragOver ? 'border-blue-400 bg-blue-500/20' : 'border-white/30'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-white/50'}
          ${sizeClasses[size]}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={(e) => handleFileChange(e.target.files)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="text-center space-y-4">
          <div className="text-white/80">
            {dropzoneText}
          </div>
          <button
            type="button"
            disabled={disabled}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white/90 transition-colors"
          >
            {browseText}
          </button>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((fileItem, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
              <div className="flex-1">
                <div className="text-white/90 text-sm">{fileItem.file.name}</div>
                <div className="text-white/60 text-xs">
                  {(fileItem.file.size / 1024).toFixed(1)} KB
                </div>
              </div>
              {showProgress && fileItem.progress !== undefined && (
                <div className="w-16 text-xs text-white/70">
                  {fileItem.progress}%
                </div>
              )}
              <div className={`text-xs px-2 py-1 rounded ${
                fileItem.status === 'success' ? 'bg-green-500/20 text-green-400' :
                fileItem.status === 'error' ? 'bg-red-500/20 text-red-400' :
                fileItem.status === 'uploading' ? 'bg-blue-500/20 text-blue-400' :
                'bg-gray-500/20 text-gray-400'
              }`}>
                {fileItem.status}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GlassFileUpload;