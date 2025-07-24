import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { GlassButton } from "../glass-button-refactored";
import { GlassFocusTrap } from "../glass-focus-trap";
import { GlassSkipNavigation } from "../glass-skip-navigation";
// @ts-expect-error TS(6142): Module './glass-focus-demo' was resolved to '/User... Remove this comment to see the full error message
import { GlassFocusDemo } from "./glass-focus-demo";

const meta: Meta<typeof GlassFocusDemo> = {
	title: "Accessibility/Focus Management",
	component: GlassFocusDemo,
	parameters: {
		docs: {
			description: {
				component: `
Enhanced focus management system with intelligent focus restoration, roving tabindex, and skip navigation.

## Features

### 1. Enhanced Focus Trap
- **Intelligent Focus Restoration**: Maintains focus history and restores to the most appropriate element
- **Edge Case Handling**: Handles disabled elements, removed elements, and nested traps
- **Stack Management**: Supports multiple nested focus traps
- **Scroll Position Preservation**: Remembers and restores scroll position
- **Fallback Focus**: Provides fallback options when primary focus targets are unavailable

### 2. Roving Tabindex System
- **Single-axis Navigation**: Horizontal or vertical keyboard navigation
- **Grid Navigation**: 2D navigation for complex layouts
- **Type-ahead Search**: Quick navigation by typing
- **Home/End Support**: Jump to first/last items
- **Loop Control**: Optional wrapping at boundaries
- **Focus on Hover**: Optional mouse support

### 3. Skip Navigation
- **Auto-generation**: Automatically creates skip links for landmarks
- **Custom Links**: Support for manually defined skip targets
- **Visible on Focus**: Shows skip links only when needed
- **Keyboard Navigation**: Full keyboard support within skip links
- **Smooth Scrolling**: Animated navigation to targets

## Usage

### Focus Trap
\`\`\`tsx
<GlassFocusTrap
  active={isModalOpen}
  onEscape={closeModal}
  initialFocus=".first-input"
  returnFocus={true}
  preventScroll={true}
>
  <ModalContent />
</GlassFocusTrap>
\`\`\`

### Roving Tabindex
\`\`\`tsx
const roving = useRovingTabindex({
  items: menuItems,
  orientation: 'vertical',
  loop: true,
  onActiveChange: handleMenuChange
});

// Apply to items
<button {...roving.getRovingProps(index)}>
  Menu Item
</button>
\`\`\`

### Skip Navigation
\`\`\`tsx
<GlassSkipNavigation
  autoGenerate={true}
  visibleOnFocus={true}
  position="top"
/>
\`\`\`

## Keyboard Shortcuts

### Focus Trap
- **Tab**: Navigate forward through focusable elements
- **Shift+Tab**: Navigate backward
- **Escape**: Exit focus trap (if enabled)

### Roving Tabindex
- **Arrow Keys**: Navigate between items
- **Home**: Jump to first item
- **End**: Jump to last item
- **Type**: Type-ahead search
- **Page Up/Down**: Navigate by page (if enabled)

### Skip Navigation
- **Tab**: Reveal skip links
- **Enter/Space**: Activate skip link
- **Arrow Keys**: Navigate between skip links
        `,
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const CompleteDemo: Story = {
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
	render: () => <GlassFocusDemo />,
};

export const FocusTrapExample: Story = {
	render: () => {
		const [isOpen, setIsOpen] = useState(false);

		return (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="p-8">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<h2 className="text-xl font-bold mb-4">Focus Trap Example</h2>

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassButton onClick={() => setIsOpen(true)}>
					Open Focus Trap
				</GlassButton>

				{isOpen && (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<GlassFocusTrap
						active={isOpen}
						onEscape={() => setIsOpen(false)}
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
					>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<div className="bg-white dark:bg-gray-900 p-6 rounded-lg max-w-md">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
							<h3 className="text-lg font-semibold mb-4">
								Trapped Focus Dialog
							</h3>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
							<p className="mb-4">
								Focus is trapped in this dialog. Press Tab to navigate.
							</p>

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
							<input
								type="text"
								placeholder="First input"
								className="w-full mb-3 px-3 py-2 border rounded"
							/>

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
							<input
								type="text"
								placeholder="Second input"
								className="w-full mb-4 px-3 py-2 border rounded"
							/>

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
							<div className="flex gap-3">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
								<GlassButton variant="ghost" onClick={() => setIsOpen(false)}>
									Cancel
								</GlassButton>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
								<GlassButton onClick={() => setIsOpen(false)}>
									Submit
								</GlassButton>
							</div>
						</div>
					</GlassFocusTrap>
				)}
			</div>
		);
	},
};

export const NestedFocusTraps: Story = {
	render: () => {
		const [outer, setOuter] = useState(false);
		const [inner, setInner] = useState(false);

		return (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="p-8">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<h2 className="text-xl font-bold mb-4">Nested Focus Traps</h2>

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassButton onClick={() => setOuter(true)}>
					Open Outer Trap
				</GlassButton>

				{outer && (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<GlassFocusTrap
						active={outer}
						onEscape={() => !inner && setOuter(false)}
						className="fixed inset-0 z-40 flex items-center justify-center bg-black/30"
					>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<div className="bg-white dark:bg-gray-900 p-8 rounded-lg max-w-lg">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
							<h3 className="text-lg font-semibold mb-4">Outer Focus Trap</h3>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
							<p className="mb-4">This is the outer focus trap.</p>

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
							<GlassButton onClick={() => setInner(true)}>
								Open Inner Trap
							</GlassButton>

							{inner && (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
								<GlassFocusTrap
									active={inner}
									onEscape={() => setInner(false)}
									className="absolute inset-4 z-50 flex items-center justify-center bg-black/50"
								>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
									<div className="bg-blue-50 dark:bg-blue-900 p-6 rounded-lg">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
										<h4 className="font-semibold mb-2">Inner Focus Trap</h4>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
										<p className="mb-4 text-sm">
											Nested trap with independent focus.
										</p>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
										<GlassButton size="sm" onClick={() => setInner(false)}>
											Close Inner
										</GlassButton>
									</div>
								</GlassFocusTrap>
							)}

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
							<GlassButton
								variant="ghost"
								onClick={() => setOuter(false)}
								className="mt-4"
							>
								Close Outer
							</GlassButton>
						</div>
					</GlassFocusTrap>
				)}
			</div>
		);
	},
};

export const SkipNavigationExample: Story = {
	render: () => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassSkipNavigation
				links={[
					{ id: "skip-nav", label: "Skip to navigation", target: "#nav" },
					{ id: "skip-main", label: "Skip to main content", target: "#main" },
					{ id: "skip-footer", label: "Skip to footer", target: "#footer" },
				]}
				visibleOnFocus={true}
			/>

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="p-8 space-y-8">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<header>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<h1 className="text-2xl font-bold">Page with Skip Navigation</h1>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<p className="text-gray-600">Tab to reveal skip links</p>
				</header>

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<nav id="nav" className="p-4 bg-gray-100 dark:bg-gray-800 rounded">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<h2 className="font-semibold mb-2">Navigation</h2>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<div className="flex gap-4">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<button
							onClick={() => console.log("Navigate to Home")}
							className="text-blue-500 bg-transparent border-none cursor-pointer hover:underline"
						>
							Home
						</button>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<button
							onClick={() => console.log("Navigate to About")}
							className="text-blue-500 bg-transparent border-none cursor-pointer hover:underline"
						>
							About
						</button>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<button
							onClick={() => console.log("Navigate to Services")}
							className="text-blue-500 bg-transparent border-none cursor-pointer hover:underline"
						>
							Services
						</button>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<button
							onClick={() => console.log("Navigate to Contact")}
							className="text-blue-500 bg-transparent border-none cursor-pointer hover:underline"
						>
							Contact
						</button>
					</div>
				</nav>

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<main
					id="main"
					className="min-h-[400px] p-4 bg-white dark:bg-gray-900 rounded"
				>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<h2 className="font-semibold mb-4">Main Content</h2>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<p>This is the main content area of the page.</p>
				</main>

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<footer
					id="footer"
					className="p-4 bg-gray-100 dark:bg-gray-800 rounded"
				>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<h2 className="font-semibold mb-2">Footer</h2>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<p className="text-sm text-gray-600">© 2024 Example Site</p>
				</footer>
			</div>
		</div>
	),
};
