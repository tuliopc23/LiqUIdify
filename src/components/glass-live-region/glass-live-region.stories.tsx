import type { Meta, StoryObj } from "@storybook/react";
import type React from "react";
import { useState } from "react";
import { GlassButton } from "../glass-button-refactored";
import {
	announcer,
	GlassLiveRegion,
	GlassLiveRegionProvider,
	useAnnouncement,
// @ts-expect-error TS(6142): Module './glass-live-region' was resolved to '/Use... Remove this comment to see the full error message
} from "./glass-live-region";

const meta: Meta<typeof GlassLiveRegion> = {
	title: "Accessibility/GlassLiveRegion",
	component: GlassLiveRegion,
	parameters: {
		docs: {
			description: {
				component: `
Enhanced Live Region component with smart announcement queuing, deduplication, and context-aware announcements.

## Features
- **Smart Queuing**: Announcements are queued and processed by priority
- **Deduplication**: Prevents duplicate announcements within a time window
- **Context-aware**: Different announcement types for different contexts
- **Multiple Priorities**: Low, Medium, High, and Critical priorities
- **Custom Timing**: Control delays and clear times for announcements

## Usage

\`\`\`tsx
// Basic usage
<GlassLiveRegion message="Status updated" priority="polite" />

// With queuing
<GlassLiveRegion 
  message="Important update" 
  queueingEnabled
  maxQueueSize={10}
  contextualPrefix
/>

// Using the hook
const { announce, announceError, announceSuccess } = useAnnouncement();
announceError('Form validation failed');
announceSuccess('Profile updated successfully');

// Global announcer
announcer.error('Network connection lost');
announcer.success('File uploaded');
\`\`\`
        `,
			},
		},
	},
	decorators: [
		(Story) => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassLiveRegionProvider>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<Story />
			</GlassLiveRegionProvider>
		),
	],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		message: "This is a live region announcement",
		priority: "polite",
		visuallyHidden: false,
	},
};

export const WithQueuing: Story = {
	render: () => {
		const QueueDemo = () => {
			const [messages, setMessages] = useState<string[]>([]);

			const addMessages = () => {
				announcer.announce("Low priority message", { priority: "low" });
				announcer.announce("Critical alert!", { priority: "critical" });
				announcer.announce("Medium priority update", { priority: "medium" });
				announcer.announce("High priority warning", { priority: "high" });

				setMessages([
					"Added: Low priority message",
					"Added: Critical alert!",
					"Added: Medium priority update",
					"Added: High priority warning",
				]);
			};

			return (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<div className="space-y-4">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<GlassButton onClick={addMessages}>
						Queue Multiple Announcements
					</GlassButton>

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<div className="p-4 bg-white/5 backdrop-blur-xl rounded-lg">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<h3 className="text-sm font-medium mb-2">
							Queued Messages (will be announced by priority):
						</h3>
						{messages.map((message, index) => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
							<div key={index} className="text-sm text-white/60">
								{message}
							</div>
						))}
					</div>

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<div className="sr-only">
						Live regions are embedded by the provider
					</div>
				</div>
			);
		};

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		return <QueueDemo />;
	},
};

export const ContextAwareAnnouncements: Story = {
	render: () => {
		const ContextDemo = () => {
			const {
				announceError,
				announceSuccess,
				announceNavigation,
				announceLoading,
			} = useAnnouncement();

			return (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<div className="space-y-4">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<div className="grid grid-cols-2 gap-4">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<GlassButton
							onClick={() => announceError("Failed to save changes")}
							className="bg-red-500/20"
						>
							Announce Error
						</GlassButton>

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<GlassButton
							onClick={() => announceSuccess("Profile updated successfully")}
							className="bg-green-500/20"
						>
							Announce Success
						</GlassButton>

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<GlassButton
							onClick={() => announceNavigation("Navigated to settings page")}
							className="bg-blue-500/20"
						>
							Announce Navigation
						</GlassButton>

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<GlassButton
							onClick={() => announceLoading("Loading user data...")}
							className="bg-yellow-500/20"
						>
							Announce Loading
						</GlassButton>
					</div>

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<div className="p-4 bg-white/5 backdrop-blur-xl rounded-lg">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<p className="text-sm text-white/60">
							Click buttons to trigger context-aware announcements. Each context
							has different priority and prefix.
						</p>
					</div>
				</div>
			);
		};

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		return <ContextDemo />;
	},
};

export const WithDeduplication: Story = {
	render: () => {
		const DedupDemo = () => {
			const [count, setCount] = useState(0);

			const announceWithDedup = () => {
				// These will be deduplicated
				announcer.announce("Network request in progress", {
					dedupKey: "network-status",
				});
				announcer.announce("Network request in progress", {
					dedupKey: "network-status",
				});
				announcer.announce("Network request in progress", {
					dedupKey: "network-status",
				});

				// This has a different key, so it will be announced
				announcer.announce("Different message", { dedupKey: "other-status" });

				setCount((c) => c + 1);
			};

			return (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<div className="space-y-4">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<GlassButton onClick={announceWithDedup}>
						Trigger Multiple Identical Announcements
					</GlassButton>

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<div className="p-4 bg-white/5 backdrop-blur-xl rounded-lg">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<p className="text-sm text-white/60">
							Button clicked {count} times. Despite multiple calls, duplicate
							announcements are filtered out.
						</p>
					</div>
				</div>
			);
		};

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		return <DedupDemo />;
	},
};

export const CustomTiming: Story = {
	render: () => {
		const TimingDemo = () => {
			const { announce } = useAnnouncement();

			return (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<div className="space-y-4">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<div className="grid grid-cols-2 gap-4">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<GlassButton
							onClick={() => announce("Immediate announcement", { delay: 0 })}
						>
							Announce Immediately
						</GlassButton>

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<GlassButton
							onClick={() => announce("Delayed by 2 seconds", { delay: 2000 })}
						>
							Announce After 2s
						</GlassButton>

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<GlassButton
							onClick={() =>
								announce("Clears after 1 second", {
									clearDelay: 1000,
									delay: 0,
								})
							}
						>
							Auto-clear After 1s
						</GlassButton>

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<GlassButton
							onClick={() =>
								announce("Stays for 10 seconds", {
									clearDelay: 10_000,
									delay: 0,
								})
							}
						>
							Long Duration (10s)
						</GlassButton>
					</div>

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<div className="p-4 bg-white/5 backdrop-blur-xl rounded-lg">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<p className="text-sm text-white/60">
							Test different timing configurations for announcements.
						</p>
					</div>
				</div>
			);
		};

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		return <TimingDemo />;
	},
};

export const VisualLiveRegion: Story = {
	args: {
		message: "This live region is visible for demonstration",
		priority: "polite",
		visuallyHidden: false,
		className: "p-4 bg-blue-500/20 backdrop-blur-xl rounded-lg text-white",
	},
};

export const FormExample: Story = {
	render: () => {
		const FormDemo = () => {
			const { announceError, announceSuccess } = useAnnouncement();
			const [email, setEmail] = useState("");

			const handleSubmit = (e: React.FormEvent) => {
				e.preventDefault();

				if (email.includes("@")) {
					announceSuccess("Form submitted successfully");
				} else {
					announceError("Please enter a valid email address");
				}
			};

			return (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<form onSubmit={handleSubmit} className="space-y-4 max-w-md">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<label htmlFor="email" className="block text-sm font-medium mb-2">
							Email Address
						</label>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<input
							id="email"
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full px-4 py-2 bg-white/10 backdrop-blur-xl rounded-lg 
                       border border-white/20 focus:border-white/40 focus:outline-none"
							aria-describedby="email-error"
						/>
					</div>

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<GlassButton type="submit">Submit Form</GlassButton>

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<div className="p-4 bg-white/5 backdrop-blur-xl rounded-lg">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<p className="text-sm text-white/60">
							Submit the form to trigger validation announcements. Try with and
							without @ symbol.
						</p>
					</div>
				</form>
			);
		};

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		return <FormDemo />;
	},
};
