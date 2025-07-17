/**
 * Enhanced Apple Liquid Glass Stories
 * Showcasing pixel-perfect multi-layer glass system with advanced visual effects
 */

import type { Meta, StoryObj } from '@storybook/react';
import {
    EnhancedAppleLiquidGlass,
    EnhancedAppleLiquidGlassCard,
    EnhancedAppleLiquidGlassButton,
    EnhancedAppleLiquidGlassNav,
    EnhancedAppleLiquidGlassModal,
    EnhancedAppleLiquidGlassShowcase,
} from './index';

const meta: Meta<typeof EnhancedAppleLiquidGlass> = {
    title: 'Enhanced/Apple Liquid Glass',
    component: EnhancedAppleLiquidGlass,
    parameters: {
        layout: 'centered',
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
            control: 'select',
            options: ['subtle', 'medium', 'strong', 'extreme'],
            description: 'Glass effect intensity level',
        },
        enablePhysics: {
            control: 'boolean',
            description: 'Enable magnetic hover and physics effects',
        },
        enableHaptics: {
            control: 'boolean',
            description: 'Enable haptic feedback (mobile devices)',
        },
        enableRetina: {
            control: 'boolean',
            description: 'Enable retina display optimization',
        },
        enableSubpixel: {
            control: 'boolean',
            description: 'Enable subpixel rendering',
        },
        enableSvgFilters: {
            control: 'boolean',
            description: 'Enable advanced SVG distortion filters',
        },
        magneticStrength: {
            control: { type: 'range', min: 0, max: 1, step: 0.1 },
            description: 'Magnetic hover effect strength',
        },
        liquidFlowIntensity: {
            control: { type: 'range', min: 0, max: 1, step: 0.1 },
            description: 'Liquid flow animation intensity',
        },
        distortionStrength: {
            control: { type: 'range', min: 0, max: 1, step: 0.1 },
            description: 'SVG distortion effect strength',
        },
    },
    decorators: [
        (Story) => (
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
        intensity: 'medium',
        enablePhysics: true,
        enableHaptics: false,
        enableRetina: true,
        enableSubpixel: true,
        enableSvgFilters: true,
        magneticStrength: 0.2,
        liquidFlowIntensity: 0.3,
        distortionStrength: 0.3,
        children: (
            <div className="p-6 space-y-2">
                <h3 className="text-lg font-semibold">Enhanced Apple Liquid Glass</h3>
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
        intensity: 'subtle',
        children: (
            <div className="p-6 space-y-2">
                <h3 className="text-lg font-semibold">Subtle Glass Effect</h3>
                <p className="text-sm opacity-90">Light and elegant glass appearance</p>
            </div>
        ),
    },
};

export const StrongIntensity: Story = {
    args: {
        ...Default.args,
        intensity: 'strong',
        children: (
            <div className="p-6 space-y-2">
                <h3 className="text-lg font-semibold">Strong Glass Effect</h3>
                <p className="text-sm opacity-90">Pronounced depth and visual impact</p>
            </div>
        ),
    },
};

export const ExtremeIntensity: Story = {
    args: {
        ...Default.args,
        intensity: 'extreme',
        children: (
            <div className="p-6 space-y-2">
                <h3 className="text-lg font-semibold">Extreme Glass Effect</h3>
                <p className="text-sm opacity-90">Maximum visual drama and depth</p>
            </div>
        ),
    },
};

// Enhanced Glass Card
export const EnhancedCard: Story = {
    render: (args) => (
        <EnhancedAppleLiquidGlassCard {...args}>
            <div className="space-y-4">
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">✨</span>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Enhanced Glass Card</h3>
                        <p className="text-sm opacity-75">Pixel-perfect rendering</p>
                    </div>
                </div>
                <p className="text-sm opacity-90 leading-relaxed">
                    This card demonstrates the enhanced multi-layer glass system with
                    advanced visual effects and Apple HIG compliance.
                </p>
                <div className="flex space-x-2">
                    <div className="px-3 py-1 bg-white/20 rounded-full text-xs">Feature</div>
                    <div className="px-3 py-1 bg-white/20 rounded-full text-xs">Enhanced</div>
                </div>
            </div>
        </EnhancedAppleLiquidGlassCard>
    ),
    args: {
        intensity: 'medium',
        enablePhysics: true,
        magneticStrength: 0.2,
        liquidFlowIntensity: 0.3,
    },
};

// Enhanced Glass Button
export const EnhancedButton: Story = {
    render: (args) => (
        <div className="space-y-4">
            <EnhancedAppleLiquidGlassButton
                {...args}
                variant="primary"
                size="md"
                onClick={() => alert('Enhanced button clicked!')}
            >
                Primary Button
            </EnhancedAppleLiquidGlassButton>
            <EnhancedAppleLiquidGlassButton
                {...args}
                variant="secondary"
                size="md"
                intensity="subtle"
            >
                Secondary Button
            </EnhancedAppleLiquidGlassButton>
            <EnhancedAppleLiquidGlassButton
                {...args}
                variant="ghost"
                size="sm"
                intensity="strong"
            >
                Ghost Button
            </EnhancedAppleLiquidGlassButton>
        </div>
    ),
    args: {
        intensity: 'medium',
        enablePhysics: true,
        magneticStrength: 0.3,
        liquidFlowIntensity: 0.2,
    },
};

// Enhanced Glass Navigation
export const EnhancedNavigation: Story = {
    render: (args) => (
        <EnhancedAppleLiquidGlassNav {...args}>
            <div className="flex items-center justify-between w-full max-w-md">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">L</span>
                    </div>
                    <span className="font-semibold">LiquidUI</span>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="text-sm opacity-75 hover:opacity-100 transition-opacity">
                        Home
                    </button>
                    <button className="text-sm opacity-75 hover:opacity-100 transition-opacity">
                        About
                    </button>
                    <button className="text-sm opacity-75 hover:opacity-100 transition-opacity">
                        Contact
                    </button>
                </div>
            </div>
        </EnhancedAppleLiquidGlassNav>
    ),
    args: {
        intensity: 'subtle',
        enablePhysics: false,
        liquidFlowIntensity: 0.1,
    },
};

// Enhanced Glass Modal
export const EnhancedModal: Story = {
    render: (args) => (
        <div className="relative">
            <EnhancedAppleLiquidGlassModal
                {...args}
                backdrop={false}
                className="max-w-sm"
            >
                <div className="space-y-4">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-white font-bold text-2xl">✓</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Success!</h3>
                        <p className="text-sm opacity-90 leading-relaxed">
                            Your enhanced glass modal is working perfectly with pixel-perfect
                            rendering and advanced visual effects.
                        </p>
                    </div>
                    <div className="flex space-x-3">
                        <button className="flex-1 px-4 py-2 bg-white/20 rounded-lg text-sm font-medium hover:bg-white/30 transition-colors">
                            Cancel
                        </button>
                        <button className="flex-1 px-4 py-2 bg-blue-500 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
                            Continue
                        </button>
                    </div>
                </div>
            </EnhancedAppleLiquidGlassModal>
        </div>
    ),
    args: {
        intensity: 'strong',
        enablePhysics: false,
        liquidFlowIntensity: 0.5,
        distortionStrength: 0.4,
    },
};

// Physics and Animation Demo
export const PhysicsDemo: Story = {
    render: (args) => (
        <div className="space-y-6">
            <EnhancedAppleLiquidGlassCard
                {...args}
                enablePhysics={true}
                magneticStrength={0.4}
                liquidFlowIntensity={0.6}
            >
                <div className="text-center space-y-2">
                    <h3 className="text-lg font-semibold">High Physics</h3>
                    <p className="text-sm opacity-90">
                        Strong magnetic hover and liquid flow effects
                    </p>
                </div>
            </EnhancedAppleLiquidGlassCard>

            <EnhancedAppleLiquidGlassCard
                {...args}
                enablePhysics={true}
                magneticStrength={0.1}
                liquidFlowIntensity={0.2}
            >
                <div className="text-center space-y-2">
                    <h3 className="text-lg font-semibold">Low Physics</h3>
                    <p className="text-sm opacity-90">
                        Subtle magnetic hover and gentle liquid flow
                    </p>
                </div>
            </EnhancedAppleLiquidGlassCard>
        </div>
    ),
    args: {
        intensity: 'medium',
        enableSvgFilters: true,
        distortionStrength: 0.3,
    },
};

// Complete Showcase
export const CompleteShowcase: Story = {
    render: () => (
        <div className="max-w-4xl">
            <EnhancedAppleLiquidGlassShowcase />
        </div>
    ),
    parameters: {
        layout: 'fullscreen',
    },
};

// Accessibility Demo
export const AccessibilityDemo: Story = {
    render: (args) => (
        <div className="space-y-4">
            <EnhancedAppleLiquidGlassCard {...args}>
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Accessibility First</h3>
                    <p className="text-sm opacity-90">
                        This component respects reduced motion preferences and provides
                        proper focus management.
                    </p>
                    <div className="text-xs opacity-75">
                        Try using keyboard navigation and screen readers
                    </div>
                </div>
            </EnhancedAppleLiquidGlassCard>

            <EnhancedAppleLiquidGlassButton
                {...args}
                onClick={() => alert('Accessible button activated!')}
                aria-label="Accessible enhanced glass button"
            >
                Accessible Button
            </EnhancedAppleLiquidGlassButton>
        </div>
    ),
    args: {
        intensity: 'medium',
        enablePhysics: true,
        magneticStrength: 0.2,
        liquidFlowIntensity: 0.3,
    },
};