/**
 * Enhanced Apple Liquid Glass Stories
 * Showcasing pixel-perfect multi-layer glass system with advanced visual effects
 */

import type { Meta, StoryObj } from "@storybook/react";
import {
	EnhancedAppleLiquidGlass,
	EnhancedAppleLiquidGlassButton,
	EnhancedAppleLiquidGlassCard,
	EnhancedAppleLiquidGlassModal,
	EnhancedAppleLiquidGlassNav,
	EnhancedAppleLiquidGlassShowcase,
} from "./index";

const meta: Meta<typeof EnhancedAppleLiquidGlass> = {
	title: "Enhanced/Apple Liquid Glass",
	component: EnhancedAppleLiquidGlass,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: `
# Enhanced Apple Liquid Glass

Pixel-perfect multi-layer glass system with advanced visual effects and Apple HIG compliance.

## Features

- **Pixel-Perfect Rendering**: Subpixel accuracy and retina display optimization
- **Multi-Layer Structure**: Backdrop, overlay, specular, and content layers
- **Advanced Physics**: Magnetic hover effects and liquid flow animations
- **SVG Filters**: Authentic liquid glass distortion effects
- **Apple HIG Compliance**: Following Apple's Human Interface Guidelines precisely
- **Accessibility**: Full WCAG 2.1 AA compliance with reduced motion support

## Intensity Levels

- **Subtle**: Light glass effect with minimal distortion
- **Medium**: Balanced glass effect (default)
- **Strong**: Pronounced glass effect with enhanced depth
- **Extreme**: Maximum glass effect for dramatic impact
        `,
			},
		},
	},
	argTypes: {
		intensity: {
			control: "select",
			options: ["subtle", "medium", "strong", "extreme"],
			description: "Glass effect intensity level",
		},
		enablePhysics: {
			control: "boolean",
			description: "Enable magnetic hover and physics effects",
		},
		enableHaptics: {
			control: "boolean",
			description: "Enable haptic feedback (mobile devices)",
		},
		enableRetina: {
			control: "boolean",
			description: "Enable retina display optimization",
		},
		enableSubpixel: {
			control: "boolean",
			description: "Enable subpixel rendering",
		},
		enableSvgFilters: {
			control: "boolean",
			description: "Enable advanced SVG distortion filters",
		},
		magneticStrength: {
			control: { type: "range", min: 0, max: 1, step: 0.1 },
			description: "Magnetic hover effect strength",
		},
		liquidFlowIntensity: {
			control: { type: "range", min: 0, max: 1, step: 0.1 },
			description: "Liquid flow animation intensity",
		},
		distortionStrength: {
			control: { type: "range", min: 0, max: 1, step: 0.1 },
			description: "SVG distortion effect strength",
		},
	},
	decorators: [
		(Story) => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div
				className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8 flex items-center justify-center"
				style={{
					backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
            linear-gradient(135deg, #667eea 0%, #764ba2 100%)
          `,
				}}
			>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Enhanced Glass
export const Default: Story = {
	args: {
		intensity: "medium",
		enablePhysics: true,
		enableHaptics: false,
		enableRetina: true,
		enableSubpixel: true,
		enableSvgFilters: true,
		magneticStrength: 0.2,
		liquidFlowIntensity: 0.3,
		distortionStrength: 0.3,
		children: (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="p-6 space-y-2">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<h3 className="text-lg font-semibold">Enhanced Apple Liquid Glass</h3>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<p className="text-sm opacity-90">
					Pixel-perfect multi-layer rendering with advanced visual effects
				</p>
			</div>
		),
	},
};

// Intensity Variations
export const SubtleIntensity: Story = {
	args: {
		...Default.args,
		intensity: "subtle",
		children: (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="p-6 space-y-2">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<h3 className="text-lg font-semibold">Subtle Glass Effect</h3>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<p className="text-sm opacity-90">Light and elegant glass appearance</p>
			</div>
		),
	},
};

export const StrongIntensity: Story = {
	args: {
		...Default.args,
		intensity: "strong",
		children: (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="p-6 space-y-2">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<h3 className="text-lg font-semibold">Strong Glass Effect</h3>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<p className="text-sm opacity-90">Pronounced depth and visual impact</p>
			</div>
		),
	},
};

export const ExtremeIntensity: Story = {
	args: {
		...Default.args,
// @ts-expect-error TS(2322): Type '"extreme"' is not assignable to type '"subtl... Remove this comment to see the full error message
		intensity: "extreme",
		children: (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="p-6 space-y-2">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<h3 className="text-lg font-semibold">Extreme Glass Effect</h3>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<p className="text-sm opacity-90">Maximum visual drama and depth</p>
			</div>
		),
	},
};

// Enhanced Glass Card
export const EnhancedCard: Story = {
	render: (arguments_) => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<EnhancedAppleLiquidGlassCard {...arguments_}>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="space-y-4">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<div className="flex items-center space-x-3">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<span className="text-white font-bold text-lg">✨</span>
					</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<h3 className="text-lg font-semibold">Enhanced Glass Card</h3>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<p className="text-sm opacity-75">Pixel-perfect rendering</p>
					</div>
				</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<p className="text-sm opacity-90 leading-relaxed">
					This card demonstrates the enhanced multi-layer glass system with
					advanced visual effects and Apple HIG compliance.
				</p>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<div className="flex space-x-2">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<div className="px-3 py-1 bg-white/20 rounded-full text-xs">
						Feature
					</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<div className="px-3 py-1 bg-white/20 rounded-full text-xs">
						Enhanced
					</div>
				</div>
			</div>
		</EnhancedAppleLiquidGlassCard>
	),
	args: {
		intensity: "medium",
		enablePhysics: true,
		magneticStrength: 0.2,
		liquidFlowIntensity: 0.3,
	},
};

// Enhanced Glass Button
export const EnhancedButton: Story = {
	render: (arguments_) => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<div className="space-y-4">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<EnhancedAppleLiquidGlassButton
				{...arguments_}
				variant="primary"
				size="md"
				onClick={() => alert("Enhanced button clicked!")}
			>
				Primary Button
			</EnhancedAppleLiquidGlassButton>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<EnhancedAppleLiquidGlassButton
				{...arguments_}
				variant="secondary"
				size="md"
				intensity="subtle"
			>
				Secondary Button
			</EnhancedAppleLiquidGlassButton>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<EnhancedAppleLiquidGlassButton
				{...arguments_}
				variant="ghost"
				size="sm"
				intensity="strong"
			>
				Ghost Button
			</EnhancedAppleLiquidGlassButton>
		</div>
	),
	args: {
		intensity: "medium",
		enablePhysics: true,
		magneticStrength: 0.3,
		liquidFlowIntensity: 0.2,
	},
};

// Enhanced Glass Navigation
export const EnhancedNavigation: Story = {
	render: (arguments_) => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<EnhancedAppleLiquidGlassNav {...arguments_}>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="flex items-center justify-between w-full max-w-md">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<div className="flex items-center space-x-3">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<span className="text-white font-bold text-sm">L</span>
					</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<span className="font-semibold">LiquidUI</span>
				</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<div className="flex items-center space-x-4">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<button className="text-sm opacity-75 hover:opacity-100 transition-opacity">
						Home
					</button>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<button className="text-sm opacity-75 hover:opacity-100 transition-opacity">
						About
					</button>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<button className="text-sm opacity-75 hover:opacity-100 transition-opacity">
						Contact
					</button>
				</div>
			</div>
		</EnhancedAppleLiquidGlassNav>
	),
	args: {
		intensity: "subtle",
		enablePhysics: false,
		liquidFlowIntensity: 0.1,
	},
};

// Enhanced Glass Modal
export const EnhancedModal: Story = {
	render: (arguments_) => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<div className="relative">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<EnhancedAppleLiquidGlassModal
				{...arguments_}
				backdrop={false}
				className="max-w-sm"
			>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<div className="space-y-4">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<div className="text-center">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
							<span className="text-white font-bold text-2xl">✓</span>
						</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<h3 className="text-xl font-semibold mb-2">Success!</h3>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<p className="text-sm opacity-90 leading-relaxed">
							Your enhanced glass modal is working perfectly with pixel-perfect
							rendering and advanced visual effects.
						</p>
					</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<div className="flex space-x-3">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<button className="flex-1 px-4 py-2 bg-white/20 rounded-lg text-sm font-medium hover:bg-white/30 transition-colors">
							Cancel
						</button>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<button className="flex-1 px-4 py-2 bg-blue-500 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
							Continue
						</button>
					</div>
				</div>
			</EnhancedAppleLiquidGlassModal>
		</div>
	),
	args: {
		intensity: "strong",
		enablePhysics: false,
		liquidFlowIntensity: 0.5,
		distortionStrength: 0.4,
	},
};

// Physics and Animation Demo
export const PhysicsDemo: Story = {
	render: (arguments_) => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<div className="space-y-6">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<EnhancedAppleLiquidGlassCard
				{...arguments_}
				enablePhysics={true}
				magneticStrength={0.4}
				liquidFlowIntensity={0.6}
			>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<div className="text-center space-y-2">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<h3 className="text-lg font-semibold">High Physics</h3>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<p className="text-sm opacity-90">
						Strong magnetic hover and liquid flow effects
					</p>
				</div>
			</EnhancedAppleLiquidGlassCard>

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<EnhancedAppleLiquidGlassCard
				{...arguments_}
				enablePhysics={true}
				magneticStrength={0.1}
				liquidFlowIntensity={0.2}
			>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<div className="text-center space-y-2">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<h3 className="text-lg font-semibold">Low Physics</h3>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<p className="text-sm opacity-90">
						Subtle magnetic hover and gentle liquid flow
					</p>
				</div>
			</EnhancedAppleLiquidGlassCard>
		</div>
	),
	args: {
		intensity: "medium",
		enableSvgFilters: true,
		distortionStrength: 0.3,
	},
};

// Complete Showcase
export const CompleteShowcase: Story = {
	render: () => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<div className="max-w-4xl">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<EnhancedAppleLiquidGlassShowcase />
		</div>
	),
	parameters: {
		layout: "fullscreen",
	},
};

// Accessibility Demo
export const AccessibilityDemo: Story = {
	render: (arguments_) => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<div className="space-y-4">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<EnhancedAppleLiquidGlassCard {...arguments_}>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<div className="space-y-2">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<h3 className="text-lg font-semibold">Accessibility First</h3>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<p className="text-sm opacity-90">
						This component respects reduced motion preferences and provides
						proper focus management.
					</p>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<div className="text-xs opacity-75">
						Try using keyboard navigation and screen readers
					</div>
				</div>
			</EnhancedAppleLiquidGlassCard>

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<EnhancedAppleLiquidGlassButton
				{...arguments_}
				onClick={() => alert("Accessible button activated!")}
				aria-label="Accessible enhanced glass button"
			>
				Accessible Button
			</EnhancedAppleLiquidGlassButton>
		</div>
	),
	args: {
		intensity: "medium",
		enablePhysics: true,
		magneticStrength: 0.2,
		liquidFlowIntensity: 0.3,
	},
};
