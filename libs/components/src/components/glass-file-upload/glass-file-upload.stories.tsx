import type { Meta, StoryObj } from '@storybook/react';
import {
  AlertCircle,
  Archive,
  CheckCircle,
  FileText,
  Image,
  Video,
} from 'lucide-react';
import { useState } from 'react';
import { type FileUploadItem, GlassFileUpload } from './glass-file-upload';

const meta = {
  title: 'Components/Forms/GlassFileUpload',
  component: GlassFileUpload,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A premium file upload component with advanced glassmorphism effects, drag-and-drop functionality, and comprehensive file management.

## Features

- **Drag & Drop**: Intuitive drag-and-drop interface with visual feedback
- **Multiple File Types**: Support for images, documents, videos, audio, and archives
- **File Previews**: Automatic image previews and file type icons
- **Progress Tracking**: Built-in upload progress indicators
- **File Validation**: Size limits, type restrictions, and error handling
- **Glass Effects**: Beautiful backdrop blur and glassmorphism design
- **Interactive States**: Loading, success, and error states with animations
- **Accessibility**: Full keyboard navigation and screen reader support

## Usage

\`\`\`tsx
import { GlassFileUpload } from '@/components/glass-file-upload';

// Basic usage
<GlassFileUpload
  onFilesChange={(files) => console.log('Files:', files)}
  accept="image/*"
  multiple />

// With upload handler
<GlassFileUpload
  onFilesChange={handleFilesChange}
  onUpload={handleUpload}
  maxFiles={5}
  maxFileSize={10 * 1024 * 1024} // 10MB
  allowedTypes={['image/jpeg', 'image/png']}
  showPreview
  showProgress />
\`\`\`

## File Types Supported

- **Images**: JPEG, PNG, GIF, WebP, SVG
- **Documents**: PDF, DOC, DOCX, TXT, RTF
- **Videos**: MP4, WebM, AVI, MOV
- **Audio**: MP3, WAV, OGG, AAC
- **Archives**: ZIP, RAR, 7Z, TAR

## Accessibility

The file upload component follows WAI-ARIA guidelines:
- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader announcements
- Drag state indicators
- Error state handling
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // Core Props
    onFilesChange: {
      action: 'files changed',
      description: 'Callback fired when files are added or removed',
      table: {
        type: { summary: '(files: Array<FileUploadItem>) => void' },
        category: 'Core',
      },
    },
    onUpload: {
      action: 'upload started',
      description: 'Callback for handling file uploads',
      table: {
        type: { summary: '(files: Array<File>) => Promise<void>' },
        category: 'Core',
      },
    },

    // Configuration
    accept: {
      control: 'text',
      description: 'Accepted file types (MIME types)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '*/*' },
        category: 'Configuration',
      },
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple file selection',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Configuration',
      },
    },
    maxFiles: {
      control: { type: 'number', min: 1, max: 20, step: 1 },
      description: 'Maximum number of files allowed',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '5' },
        category: 'Configuration',
      },
    },
    maxFileSize: {
      control: {
        type: 'number',
        min: 1024,
        max: 100 * 1024 * 1024,
        step: 1024,
      },
      description: 'Maximum file size in bytes',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '10MB' },
        category: 'Configuration',
      },
    },
    allowedTypes: {
      control: 'object',
      description: 'Array of allowed MIME types',
      table: {
        type: { summary: 'Array<string>' },
        category: 'Configuration',
      },
    },

    // Appearance
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the upload area',
      table: {
        type: { summary: 'sm | md | lg' },
        defaultValue: { summary: 'md' },
        category: 'Appearance',
      },
    },
    dropzoneText: {
      control: 'text',
      description: 'Text displayed in the dropzone',
      table: {
        type: { summary: 'string' },
        defaultValue: {
          summary: 'Drag and drop files here, or click to browse',
        },
        category: 'Appearance',
      },
    },
    browseText: {
      control: 'text',
      description: 'Text for the browse button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Browse files' },
        category: 'Appearance',
      },
    },

    // Features
    showPreview: {
      control: 'boolean',
      description: 'Show image previews',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Features',
      },
    },
    showProgress: {
      control: 'boolean',
      description: 'Show upload progress bars',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Features',
      },
    },

    // State
    disabled: {
      control: 'boolean',
      description: 'Whether the upload is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'State',
      },
    },

    // HTML Props
    className: {
      control: 'text',
      description: 'Additional CSS classes',
      table: {
        type: { summary: 'string' },
        category: 'HTML Props',
      },
    },
  },
  args: {
    accept: '*/*',
    multiple: true,
    maxFiles: 5,
    maxFileSize: 10 * 1024 * 1024,
    size: 'md',
    dropzoneText: 'Drag and drop files here, or click to browse',
    browseText: 'Browse files',
    showPreview: true,
    showProgress: true,
    disabled: false,
    allowedTypes: [],
  },
} satisfies Meta<typeof GlassFileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story - Interactive playground
export const Playground: Story = {
  render: (args) => (
    <div className="flex min-h-[400px] w-full max-w-2xl items-start justify-center pt-8">
      <GlassFileUpload {...args} />
    </div>
  ),
};

// Basic usage
export const BasicUsage: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="font-medium text-sm text-white/80">
          Simple File Upload
        </h3>
        <GlassFileUpload
          onFilesChange={(files) => console.log('Files:', files)}
        />
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-sm text-white/80">
          Single File Upload
        </h3>
        <GlassFileUpload
          onFilesChange={(files) => console.log('Files:', files)}
          multiple={false}
          maxFiles={1}
          dropzoneText="Drop a single file here"
          browseText="Choose file"
        />
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-sm text-white/80">
          With File Restrictions
        </h3>
        <GlassFileUpload
          onFilesChange={(files) => console.log('Files:', files)}
          accept="image/*"
          maxFiles={3}
          maxFileSize={5 * 1024 * 1024} // 5MB
          dropzoneText="Drop images here (max 5MB each)"
        />
      </div>
    </div>
  ),
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        },
      ],
    },
  },
};

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="font-medium text-sm text-white/80">Small Size</h3>
        <GlassFileUpload
          size="sm"
          dropzoneText="Drop files here"
          browseText="Browse"
          onFilesChange={(files) => console.log('Small upload:', files)}
        />
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-sm text-white/80">Medium Size</h3>
        <GlassFileUpload
          size="md"
          onFilesChange={(files) => console.log('Medium upload:', files)}
        />
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-sm text-white/80">Large Size</h3>
        <GlassFileUpload
          size="lg"
          onFilesChange={(files) => console.log('Large upload:', files)}
        />
      </div>
    </div>
  ),
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        },
      ],
    },
  },
};

// File type specific uploads
export const FileTypeExamples: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="font-medium text-sm text-white/80">Image Upload</h3>
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="mb-4 flex items-center gap-3">
            <Image className="h-5 w-5 text-blue-400" />
            <div>
              <div className="font-medium text-white/90">Image Gallery</div>
              <div className="text-sm text-white/60">
                Upload photos and images
              </div>
            </div>
          </div>
          <GlassFileUpload
            accept="image/*"
            allowedTypes={[
              'image/jpeg',
              'image/png',
              'image/gif',
              'image/webp',
            ]}
            maxFiles={10}
            maxFileSize={5 * 1024 * 1024}
            dropzoneText="Drop images here (JPEG, PNG, GIF, WebP)"
            showPreview
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-sm text-white/80">Document Upload</h3>
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="mb-4 flex items-center gap-3">
            <FileText className="h-5 w-5 text-green-400" />
            <div>
              <div className="font-medium text-white/90">Document Manager</div>
              <div className="text-sm text-white/60">
                Upload PDFs and documents
              </div>
            </div>
          </div>
          <GlassFileUpload
            accept=".pdf,.doc,.docx,.txt"
            allowedTypes={[
              'application/pdf',
              'application/msword',
              'text/plain',
            ]}
            maxFiles={5}
            maxFileSize={20 * 1024 * 1024}
            dropzoneText="Drop documents here (PDF, DOC, TXT)"
            showPreview={false}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-sm text-white/80">Media Upload</h3>
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="mb-4 flex items-center gap-3">
            <Video className="h-5 w-5 text-purple-400" />
            <div>
              <div className="font-medium text-white/90">Media Library</div>
              <div className="text-sm text-white/60">
                Upload videos and audio files
              </div>
            </div>
          </div>
          <GlassFileUpload
            accept="video/*,audio/*"
            allowedTypes={['video/mp4', 'video/webm', 'audio/mp3', 'audio/wav']}
            maxFiles={3}
            maxFileSize={100 * 1024 * 1024} // 100MB
            dropzoneText="Drop media files here (Video, Audio)"
            showPreview={false}
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        },
      ],
    },
  },
};

// Upload states and progress
export const UploadStates: Story = {
  render: () => {
    const [_uploadingFiles, setUploadingFiles] = useState<
      Array<FileUploadItem>
    >([]);

    const simulateUpload = async (_files: Array<File>) => {
      // Simulate upload progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        setUploadingFiles((current) =>
          current.map((file) => ({
            ...file,
            progress: i,
            status: i === 100 ? 'success' : 'uploading',
          }))
        );
      }
    };

    return (
      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="font-medium text-sm text-white/80">
            Upload with Progress
          </h3>
          <GlassFileUpload
            onFilesChange={setUploadingFiles}
            onUpload={simulateUpload}
            showProgress
            maxFiles={3}
          />
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-sm text-white/80">
            Error State Example
          </h3>
          <GlassFileUpload
            onFilesChange={(files) => console.log('Files with errors:', files)}
            maxFileSize={1024} // Very small limit to trigger errors
            dropzoneText="Drop files here (1KB limit to demo errors)"
          />
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-sm text-white/80">Disabled State</h3>
          <GlassFileUpload disabled dropzoneText="Upload is disabled" />
        </div>
      </div>
    );
  },
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        },
      ],
    },
  },
};

// Real-world examples
export const RealWorldExamples: Story = {
  render: () => {
    const [profileFiles, setProfileFiles] = useState<Array<FileUploadItem>>([]);
    const [portfolioFiles, setPortfolioFiles] = useState<Array<FileUploadItem>>(
      []
    );
    const [_documentFiles, setDocumentFiles] = useState<Array<FileUploadItem>>(
      []
    );

    return (
      <div className="space-y-12">
        <div className="space-y-4">
          <h3 className="font-medium text-sm text-white/80">
            Profile Picture Upload
          </h3>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <div className="mb-4 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20">
                <Image className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <div className="font-medium text-white/90">Profile Picture</div>
                <div className="text-sm text-white/60">
                  Upload a profile photo (max 2MB)
                </div>
              </div>
            </div>
            <GlassFileUpload
              accept="image/*"
              multiple={false}
              maxFiles={1}
              maxFileSize={2 * 1024 * 1024}
              size="sm"
              dropzoneText="Drop your profile picture here"
              browseText="Choose photo"
              onFilesChange={setProfileFiles}
              showPreview
            />
            {profileFiles.length > 0 && (
              <div className="mt-4 text-sm text-white/60">
                Selected: {profileFiles[0].file.name}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-sm text-white/80">
            Portfolio Upload
          </h3>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <div className="mb-4 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/20">
                <Archive className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <div className="font-medium text-white/90">
                  Portfolio Gallery
                </div>
                <div className="text-sm text-white/60">
                  Upload your work samples and portfolio items
                </div>
              </div>
            </div>
            <GlassFileUpload
              accept="image/*,.pdf"
              maxFiles={10}
              maxFileSize={10 * 1024 * 1024}
              dropzoneText="Drop portfolio items here (Images, PDFs)"
              onFilesChange={setPortfolioFiles}
              showPreview
            />
            {portfolioFiles.length > 0 && (
              <div className="mt-4">
                <div className="font-medium text-sm text-white/80">
                  {portfolioFiles.length} file(s) selected
                </div>
                <div className="mt-2 space-y-1">
                  {portfolioFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-white/60 text-xs"
                    >
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      {file.file.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-sm text-white/80">
            Document Submission
          </h3>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <div className="mb-4 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20">
                <FileText className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <div className="font-medium text-white/90">Legal Documents</div>
                <div className="text-sm text-white/60">
                  Submit required documentation (PDF only)
                </div>
              </div>
            </div>
            <GlassFileUpload
              accept=".pdf"
              allowedTypes={['application/pdf']}
              maxFiles={5}
              maxFileSize={25 * 1024 * 1024}
              dropzoneText="Drop PDF documents here"
              browseText="Select PDFs"
              onFilesChange={setDocumentFiles}
              showPreview={false}
            />
            <div className="mt-4 rounded-lg border border-yellow-400/20 bg-yellow-400/10 p-3">
              <div className="flex items-start gap-2">
                <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-yellow-400" />
                <div className="text-sm text-yellow-200">
                  <div className="font-medium">Requirements:</div>
                  <ul className="mt-1 list-inside list-disc space-y-0.5 text-xs">
                    <li>PDF format only</li>
                    <li>Maximum 25MB per file</li>
                    <li>Up to 5 documents</li>
                    <li>Documents must be clearly legible</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        },
      ],
    },
  },
};

// Accessibility showcase
export const AccessibilityShowcase: Story = {
  render: () => {
    const [files, setFiles] = useState<Array<FileUploadItem>>([]);

    return (
      <div className="space-y-6">
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
          <h4 className="mb-2 font-medium text-blue-900 dark:text-blue-100">
            Accessibility Features
          </h4>
          <ul className="space-y-1 text-blue-800 text-sm dark:text-blue-200">
            <li>• Full keyboard navigation support</li>
            <li>• ARIA labels and live regions for screen readers</li>
            <li>• Drag state announcements</li>
            <li>• File upload progress announcements</li>
            <li>• Error state descriptions</li>
            <li>• Focus management and visual indicators</li>
          </ul>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-white/60">
            Try using keyboard navigation: Tab to focus the upload area,
            Space/Enter to open file dialog
          </p>
          <GlassFileUpload
            onFilesChange={setFiles}
            maxFiles={3}
            accept="image/*,.pdf"
            dropzoneText="Accessible file upload area"
          />
        </div>

        {files.length > 0 && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
            <h4 className="mb-2 font-medium text-green-900 dark:text-green-100">
              Upload Status
            </h4>
            <div className="space-y-2">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-green-800 text-sm dark:text-green-200"
                >
                  <CheckCircle className="h-4 w-4" />
                  <span>
                    {file.file.name} ({(file.file.size / 1024).toFixed(1)} KB)
                  </span>
                  <span className="text-xs opacity-75">- {file.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
          <h4 className="mb-2 font-medium text-gray-900 dark:text-gray-100">
            Screen Reader Announcements
          </h4>
          <div className="space-y-2 text-gray-700 text-sm dark:text-gray-300">
            <p>Drag enter: "File drop zone activated"</p>
            <p>File added: "File [filename] added to upload queue"</p>
            <p>Upload start: "Uploading [filename]"</p>
            <p>Upload complete: "Upload completed successfully"</p>
            <p>Error: "Upload failed: [error message]"</p>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        },
      ],
    },
  },
};

// Theme showcase
export const ThemeShowcase: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="font-medium text-sm text-white/80">Ocean Theme</h3>
        <div className="rounded-xl bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-500 p-8">
          <GlassFileUpload
            dropzoneText="Drop files into the ocean..."
            browseText="Dive for files"
            maxFiles={3}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-sm text-white/80">Sunset Theme</h3>
        <div className="rounded-xl bg-gradient-to-r from-orange-400 via-red-400 to-pink-500 p-8">
          <GlassFileUpload
            dropzoneText="Upload files to the sunset..."
            browseText="Find files"
            maxFiles={3}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-sm text-white/80">Forest Theme</h3>
        <div className="rounded-xl bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 p-8">
          <GlassFileUpload
            dropzoneText="Plant files in the forest..."
            browseText="Gather files"
            maxFiles={3}
          />
        </div>
      </div>
    </div>
  ),
};
