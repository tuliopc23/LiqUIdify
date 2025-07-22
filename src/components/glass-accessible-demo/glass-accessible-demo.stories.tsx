import type { Meta, StoryObj } from "@storybook/react";
import { GlassAccessibleDemo } from "./glass-accessible-demo";

const meta: Meta<typeof GlassAccessibleDemo> = {
	title: "Accessibility/AccessibilityManager Demo",
	component: GlassAccessibleDemo,
	parameters: {
		docs: {
			description: {
				component: `
The AccessibilityManager provides comprehensive accessibility management for Glass UI components.

## Features

### 1. Automated WCAG Validation
- Real-time WCAG 2.1 AA compliance checking using axe-core
- Accessibility scoring (0-100, target: 95+)
- Detailed violation reports with fix suggestions

### 2. Contrast Checking & Auto-fixing
- Real-time contrast ratio validation
- Automatic color suggestions for better accessibility
- Support for glass morphism effects with backdrop calculations

### 3. ARIA Attribute Validation
- Validates ARIA roles and attributes
- Auto-corrects invalid boolean values
- Suggests missing required attributes
- Real-time monitoring with MutationObserver

### 4. Focus Management
- Intelligent focus trapping for modals and dropdowns
- Roving tabindex support for complex components
- Automatic skip navigation generation

## Usage

\`\`\`typescript
import { accessibilityManager } from '@/core/accessibility-manager';

// Validate a component
const report = await accessibilityManager.validateComponent(element);

// Check and fix contrast
const result = accessibilityManager.ensureContrast('#333', '#f0f0f0', {
  level: 'AA',
  autoFix: true
});

// Validate ARIA attributes
const validation = accessibilityManager.validateARIA(element, true);

// Manage focus
const focusTrap = accessibilityManager.manageFocus(container, {
  initialFocus: '.first-input',
  escapeDeactivates: true
});

// Make announcements
accessibilityManager.announce('Form submitted successfully', 'polite');
\`\`\`

## Best Practices

1. **Enable real-time monitoring** during development to catch issues early
2. **Use auto-fix features** for quick remediation of common issues
3. **Validate on component mount** and after significant updates
4. **Test with actual screen readers** in addition to automated testing
5. **Aim for 95+ accessibility score** for production components
        `,
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		className: "max-w-4xl mx-auto",
	},
};

export const InteractiveDemo: Story = {
	render: () => (
		<div className="space-y-6">
			<div className="p-4 bg-blue-500/10 rounded-lg">
				<h3 className="text-lg font-semibold mb-2">Try the Demo</h3>
				<ol className="list-decimal list-inside space-y-1 text-sm">
					<li>Click "Validate Accessibility" to check the demo component</li>
					<li>Use the color pickers to test contrast ratios</li>
					<li>Observe how invalid ARIA attributes are auto-corrected</li>
					<li>Check the browser console for real-time validation logs</li>
				</ol>
			</div>
			<GlassAccessibleDemo />
		</div>
	),
};
