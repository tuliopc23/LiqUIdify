import type { Meta, StoryObj } from "@storybook/react";
import { Heart, MessageCircle, Share2, User } from "lucide-react";
import {
	GlassSkeleton,
	SkeletonCard,
	SkeletonTable,
	SkeletonText,
} from "./glass-skeleton";

const meta = {
	title: "Components/Feedback/GlassSkeleton",
	component: GlassSkeleton,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: `
A premium skeleton loading component with advanced glassmorphism effects and fluid animations.

## Features

- **Multiple Variants**: Default, shimmer, and pulse animation styles
- **Flexible Shapes**: Rectangle, circle, and line shapes for different content types
- **Pre-built Patterns**: Text blocks, cards, and tables with realistic layouts
- **Glass Effects**: Beautiful backdrop blur and glassmorphism design
- **Smooth Animations**: Configurable loading animations with staggered timing
- **Customizable**: Adjustable dimensions, spacing, and animation timing
- **Performance**: Optimized animations with reduced motion support

## Usage

\`\`\`tsx
import { GlassSkeleton, SkeletonText, SkeletonCard } from '@/components/glass-skeleton';

// Basic skeleton
<GlassSkeleton width={200} height={20} />

// Text skeleton
<SkeletonText lines={3} />

// Card skeleton
<SkeletonCard showAvatar />

// Custom skeleton
<GlassSkeleton
  variant="shimmer"
  shape="circle"
  width={64}
  height={64}
  animated />
\`\`\`

## Skeleton Types

- **Rectangle**: For content blocks, images, and buttons
- **Circle**: For avatars, profile pictures, and icons
- **Line**: For text content and form fields
- **Card**: Complete card layouts with avatar and content
- **Table**: Data table layouts with headers and rows

## Accessibility

The skeleton component follows accessibility guidelines:
- Reduced motion support via prefers-reduced-motion
- ARIA labels for screen readers
- Semantic loading indicators
- Proper contrast ratios
        `,
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		// Appearance
		variant: {
			control: "select",
			options: ["default", "shimmer", "pulse"],
			description: "Animation style variant",
			table: {
				type: { summary: "default | shimmer | pulse" },
				defaultValue: { summary: "default" },
				category: "Appearance",
			},
		},
		size: {
			control: "select",
			options: ["sm", "md", "lg", "xl"],
			description: "Predefined size of the skeleton",
			table: {
				type: { summary: "sm | md | lg | xl" },
				defaultValue: { summary: "md" },
				category: "Appearance",
			},
		},
		shape: {
			control: "select",
			options: ["rectangle", "circle", "line"],
			description: "Shape of the skeleton element",
			table: {
				type: { summary: "rectangle | circle | line" },
				defaultValue: { summary: "rectangle" },
				category: "Appearance",
			},
		},

		// Dimensions
		width: {
			control: "text",
			description: "Width of the skeleton (CSS value)",
			table: {
				type: { summary: "string | number" },
				category: "Dimensions",
			},
		},
		height: {
			control: "text",
			description: "Height of the skeleton (CSS value)",
			table: {
				type: { summary: "string | number" },
				category: "Dimensions",
			},
		},

		// Multiple Elements
		count: {
			control: { type: "number", min: 1, max: 10, step: 1 },
			description: "Number of skeleton elements to render",
			table: {
				type: { summary: "number" },
				defaultValue: { summary: "1" },
				category: "Multiple Elements",
			},
		},
		spacing: {
			control: { type: "number", min: 0, max: 32, step: 2 },
			description: "Spacing between multiple elements (px)",
			table: {
				type: { summary: "number" },
				defaultValue: { summary: "8" },
				category: "Multiple Elements",
			},
		},

		// Animation
		animated: {
			control: "boolean",
			description: "Enable/disable animations",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "true" },
				category: "Animation",
			},
		},

		// HTML Props
		className: {
			control: "text",
			description: "Additional CSS classes",
			table: {
				type: { summary: "string" },
				category: "HTML Props",
			},
		},
	},
	args: {
		variant: "default",
		size: "md",
		shape: "rectangle",
		count: 1,
		spacing: 8,
		animated: true,
	},
} satisfies Meta<typeof GlassSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story - Interactive playground
export const Playground: Story = {
	render: (args) => (
		<div className="flex min-h-[200px] w-full max-w-md items-center justify-center">
			<GlassSkeleton {...args} />
		</div>
	),
};

// Basic variants
export const Variants: Story = {
	render: () => (
		<div className="space-y-8">
			<div className="space-y-4">
				<h3 className="font-medium text-sm text-white/80">Default Variant</h3>
				<div className="space-y-3">
					<GlassSkeleton width={200} height={20} variant="default" />
					<GlassSkeleton width={150} height={20} variant="default" />
					<GlassSkeleton width={180} height={20} variant="default" />
				</div>
			</div>

			<div className="space-y-4">
				<h3 className="font-medium text-sm text-white/80">Shimmer Variant</h3>
				<div className="space-y-3">
					<GlassSkeleton width={200} height={20} variant="shimmer" />
					<GlassSkeleton width={150} height={20} variant="shimmer" />
					<GlassSkeleton width={180} height={20} variant="shimmer" />
				</div>
			</div>

			<div className="space-y-4">
				<h3 className="font-medium text-sm text-white/80">Pulse Variant</h3>
				<div className="space-y-3">
					<GlassSkeleton width={200} height={20} variant="pulse" />
					<GlassSkeleton width={150} height={20} variant="pulse" />
					<GlassSkeleton width={180} height={20} variant="pulse" />
				</div>
			</div>
		</div>
	),
	parameters: {
		backgrounds: {
			default: "dark",
			values: [
				{
					name: "dark",
					value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
				},
			],
		},
	},
};

// Different shapes
export const Shapes: Story = {
	render: () => (
		<div className="space-y-8">
			<div className="space-y-4">
				<h3 className="font-medium text-sm text-white/80">Rectangle Shapes</h3>
				<div className="flex items-center gap-4">
					<GlassSkeleton
						shape="rectangle"
						width={100}
						height={60}
						variant="shimmer"
					/>
					<GlassSkeleton
						shape="rectangle"
						width={120}
						height={80}
						variant="shimmer"
					/>
					<GlassSkeleton
						shape="rectangle"
						width={80}
						height={100}
						variant="shimmer"
					/>
				</div>
			</div>

			<div className="space-y-4">
				<h3 className="font-medium text-sm text-white/80">Circle Shapes</h3>
				<div className="flex items-center gap-4">
					<GlassSkeleton shape="circle" width={40} variant="shimmer" />
					<GlassSkeleton shape="circle" width={60} variant="shimmer" />
					<GlassSkeleton shape="circle" width={80} variant="shimmer" />
					<GlassSkeleton shape="circle" width={100} variant="shimmer" />
				</div>
			</div>

			<div className="space-y-4">
				<h3 className="font-medium text-sm text-white/80">Line Shapes</h3>
				<div className="space-y-3">
					<GlassSkeleton shape="line" width="100%" variant="shimmer" />
					<GlassSkeleton shape="line" width="80%" variant="shimmer" />
					<GlassSkeleton shape="line" width="60%" variant="shimmer" />
				</div>
			</div>
		</div>
	),
	parameters: {
		backgrounds: {
			default: "dark",
			values: [
				{
					name: "dark",
					value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
				},
			],
		},
	},
};

// Pre-built patterns
export const PreBuiltPatterns: Story = {
	render: () => (
		<div className="space-y-8">
			<div className="space-y-4">
				<h3 className="font-medium text-sm text-white/80">Text Skeleton</h3>
				<div className="max-w-md">
					<SkeletonText lines={4} lastLineWidth="70%" />
				</div>
			</div>

			<div className="space-y-4">
				<h3 className="font-medium text-sm text-white/80">
					Card Skeleton with Avatar
				</h3>
				<div className="max-w-md">
					<SkeletonCard showAvatar />
				</div>
			</div>

			<div className="space-y-4">
				<h3 className="font-medium text-sm text-white/80">
					Card Skeleton without Avatar
				</h3>
				<div className="max-w-md">
					<SkeletonCard showAvatar={false} />
				</div>
			</div>

			<div className="space-y-4">
				<h3 className="font-medium text-sm text-white/80">Table Skeleton</h3>
				<div className="max-w-2xl">
					<SkeletonTable rows={5} columns={4} />
				</div>
			</div>
		</div>
	),
	parameters: {
		backgrounds: {
			default: "dark",
			values: [
				{
					name: "dark",
					value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
				},
			],
		},
	},
};

// Content type examples
export const ContentTypeExamples: Story = {
	render: () => (
		<div className="space-y-12">
			<div className="space-y-4">
				<h3 className="font-medium text-sm text-white/80">
					Profile Card Loading
				</h3>
				<div className="max-w-sm rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
					<div className="mb-4 flex items-center gap-4">
						<GlassSkeleton
							shape="circle"
							width={64}
							height={64}
							variant="shimmer"
						/>
						<div className="flex-1 space-y-2">
							<GlassSkeleton width="60%" height={20} variant="shimmer" />
							<GlassSkeleton width="40%" height={16} variant="shimmer" />
						</div>
					</div>
					<div className="mb-4 space-y-2">
						<SkeletonText lines={3} lastLineWidth="80%" />
					</div>
					<div className="flex gap-2">
						<GlassSkeleton width={80} height={32} variant="shimmer" />
						<GlassSkeleton width={80} height={32} variant="shimmer" />
					</div>
				</div>
			</div>

			<div className="space-y-4">
				<h3 className="font-medium text-sm text-white/80">
					Article Card Loading
				</h3>
				<div className="max-w-md rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
					<GlassSkeleton
						width="100%"
						height={160}
						variant="shimmer"
						className="mb-4"
					/>
					<div className="space-y-3">
						<GlassSkeleton width="90%" height={24} variant="shimmer" />
						<SkeletonText lines={3} lastLineWidth="60%" />
						<div className="flex items-center gap-4 pt-2">
							<div className="flex items-center gap-2">
								<GlassSkeleton
									shape="circle"
									width={24}
									height={24}
									variant="shimmer"
								/>
								<GlassSkeleton width={60} height={14} variant="shimmer" />
							</div>
							<GlassSkeleton width={80} height={14} variant="shimmer" />
						</div>
					</div>
				</div>
			</div>

			<div className="space-y-4">
				<h3 className="font-medium text-sm text-white/80">
					Gallery Grid Loading
				</h3>
				<div className="grid max-w-md grid-cols-3 gap-4">
					{Array.from({ length: 9 }, (_, i) => (
						<GlassSkeleton
							key={i}
							width="100%"
							height={120}
							variant="shimmer"
							className="aspect-square"
						/>
					))}
				</div>
			</div>

			<div className="space-y-4">
				<h3 className="font-medium text-sm text-white/80">
					Chat Message Loading
				</h3>
				<div className="max-w-md space-y-4">
					{/* Incoming message */}
					<div className="flex gap-3">
						<GlassSkeleton
							shape="circle"
							width={32}
							height={32}
							variant="shimmer"
						/>
						<div className="flex-1 space-y-2">
							<GlassSkeleton width="70%" height={16} variant="shimmer" />
							<GlassSkeleton width="50%" height={16} variant="shimmer" />
						</div>
					</div>
					{/* Outgoing message */}
					<div className="flex justify-end gap-3">
						<div className="flex flex-1 flex-col items-end space-y-2">
							<GlassSkeleton width="60%" height={16} variant="shimmer" />
							<GlassSkeleton width="40%" height={16} variant="shimmer" />
						</div>
						<GlassSkeleton
							shape="circle"
							width={32}
							height={32}
							variant="shimmer"
						/>
					</div>
				</div>
			</div>
		</div>
	),
	parameters: {
		backgrounds: {
			default: "dark",
			values: [
				{
					name: "dark",
					value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
				},
			],
		},
	},
};

// Real-world examples
export const RealWorldExamples: Story = {
	render: () => (
		<div className="space-y-12">
			<div className="space-y-4">
				<h3 className="font-medium text-sm text-white/80">Social Media Feed</h3>
				<div className="max-w-lg space-y-6">
					{Array.from({ length: 3 }, (_, postIndex) => (
						<div
							key={postIndex}
							className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
						>
							{/* Post header */}
							<div className="mb-4 flex items-center gap-3">
								<GlassSkeleton
									shape="circle"
									width={48}
									height={48}
									variant="shimmer"
								/>
								<div className="flex-1 space-y-2">
									<GlassSkeleton width="40%" height={16} variant="shimmer" />
									<GlassSkeleton width="25%" height={14} variant="shimmer" />
								</div>
								<GlassSkeleton
									shape="circle"
									width={24}
									height={24}
									variant="shimmer"
								/>
							</div>

							{/* Post content */}
							<div className="mb-4 space-y-3">
								<SkeletonText lines={2} lastLineWidth="75%" />
								<GlassSkeleton width="100%" height={200} variant="shimmer" />
							</div>

							{/* Post actions */}
							<div className="flex items-center gap-6">
								<div className="flex items-center gap-2">
									<GlassSkeleton
										shape="circle"
										width={20}
										height={20}
										variant="shimmer"
									/>
									<GlassSkeleton width={30} height={14} variant="shimmer" />
								</div>
								<div className="flex items-center gap-2">
									<GlassSkeleton
										shape="circle"
										width={20}
										height={20}
										variant="shimmer"
									/>
									<GlassSkeleton width={30} height={14} variant="shimmer" />
								</div>
								<div className="flex items-center gap-2">
									<GlassSkeleton
										shape="circle"
										width={20}
										height={20}
										variant="shimmer"
									/>
									<GlassSkeleton width={30} height={14} variant="shimmer" />
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className="space-y-4">
				<h3 className="font-medium text-sm text-white/80">
					E-commerce Product Grid
				</h3>
				<div className="grid max-w-4xl grid-cols-2 gap-6 md:grid-cols-4">
					{Array.from({ length: 8 }, (_, productIndex) => (
						<div
							key={productIndex}
							className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
						>
							<GlassSkeleton
								width="100%"
								height={160}
								variant="shimmer"
								className="mb-4"
							/>
							<div className="space-y-2">
								<GlassSkeleton width="80%" height={16} variant="shimmer" />
								<GlassSkeleton width="60%" height={14} variant="shimmer" />
								<div className="flex items-center justify-between pt-2">
									<GlassSkeleton width={50} height={18} variant="shimmer" />
									<GlassSkeleton width={30} height={16} variant="shimmer" />
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className="space-y-4">
				<h3 className="font-medium text-sm text-white/80">
					Dashboard Analytics
				</h3>
				<div className="max-w-4xl rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
					{/* Header */}
					<div className="mb-6 flex items-center justify-between">
						<GlassSkeleton width={200} height={24} variant="shimmer" />
						<GlassSkeleton width={120} height={32} variant="shimmer" />
					</div>

					{/* Stats grid */}
					<div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
						{Array.from({ length: 4 }, (_, statIndex) => (
							<div
								key={statIndex}
								className="rounded-lg border border-white/10 bg-white/5 p-4"
							>
								<GlassSkeleton
									width="60%"
									height={14}
									variant="shimmer"
									className="mb-2"
								/>
								<GlassSkeleton
									width="40%"
									height={24}
									variant="shimmer"
									className="mb-2"
								/>
								<GlassSkeleton width="30%" height={12} variant="shimmer" />
							</div>
						))}
					</div>

					{/* Chart */}
					<div className="rounded-lg border border-white/10 bg-white/5 p-6">
						<GlassSkeleton
							width={150}
							height={20}
							variant="shimmer"
							className="mb-4"
						/>
						<GlassSkeleton width="100%" height={300} variant="shimmer" />
					</div>
				</div>
			</div>
		</div>
	),
	parameters: {
		backgrounds: {
			default: "dark",
			values: [
				{
					name: "dark",
					value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
				},
			],
		},
	},
};

// Loading states comparison
export const LoadingStatesComparison: Story = {
	render: () => (
		<div className="space-y-8">
			<div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
				<h4 className="mb-2 font-medium text-blue-900 dark:text-blue-100">
					Skeleton vs Loading States
				</h4>
				<p className="text-blue-800 text-sm dark:text-blue-200">
					Compare different loading state approaches for the same content
				</p>
			</div>

			<div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
				<div className="space-y-4">
					<h3 className="font-medium text-sm text-white/80">
						Skeleton Loading
					</h3>
					<div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
						<SkeletonCard showAvatar />
					</div>
				</div>

				<div className="space-y-4">
					<h3 className="font-medium text-sm text-white/80">Actual Content</h3>
					<div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
						<div className="mb-3 flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20">
								<User className="h-5 w-5 text-blue-400" />
							</div>
							<div>
								<div className="font-medium text-white/90">John Smith</div>
								<div className="text-sm text-white/60">2 hours ago</div>
							</div>
						</div>
						<div className="mb-4 space-y-2">
							<h3 className="font-medium text-white/90">
								Building Better Loading States
							</h3>
							<p className="text-sm text-white/70">
								Skeleton screens provide a better user experience by showing the
								structure of content before it loads, reducing perceived loading
								time.
							</p>
						</div>
						<div className="flex items-center gap-4">
							<button
								type="button"
								className="flex items-center gap-2 text-sm text-white/60 hover:text-white/80"
							>
								<Heart className="h-4 w-4" />
								<span>24</span>
							</button>
							<button
								type="button"
								className="flex items-center gap-2 text-sm text-white/60 hover:text-white/80"
							>
								<MessageCircle className="h-4 w-4" />
								<span>8</span>
							</button>
							<button
								type="button"
								className="flex items-center gap-2 text-sm text-white/60 hover:text-white/80"
							>
								<Share2 className="h-4 w-4" />
								<span>Share</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	),
	parameters: {
		backgrounds: {
			default: "dark",
			values: [
				{
					name: "dark",
					value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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
					<div className="max-w-md">
						<SkeletonCard showAvatar />
					</div>
				</div>
			</div>

			<div className="space-y-4">
				<h3 className="font-medium text-sm text-white/80">Sunset Theme</h3>
				<div className="rounded-xl bg-gradient-to-r from-orange-400 via-red-400 to-pink-500 p-8">
					<div className="grid max-w-md grid-cols-3 gap-4">
						{Array.from({ length: 6 }, (_, i) => (
							<GlassSkeleton
								key={i}
								width="100%"
								height={80}
								variant="shimmer"
							/>
						))}
					</div>
				</div>
			</div>

			<div className="space-y-4">
				<h3 className="font-medium text-sm text-white/80">Forest Theme</h3>
				<div className="rounded-xl bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 p-8">
					<div className="max-w-2xl">
						<SkeletonTable rows={4} columns={3} />
					</div>
				</div>
			</div>
		</div>
	),
};
