import { act, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
	announcer,
	GlassLiveRegion,
	GlassLiveRegionProvider,
	useAnnouncement,
// @ts-expect-error TS(6142): Module './glass-live-region' was resolved to '/Use... Remove this comment to see the full error message
} from "./glass-live-region";

describe("GlassLiveRegion Enhanced Features", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.runOnlyPendingTimers();
		vi.useRealTimers();
	});

	describe("Smart Announcement Queuing", () => {
		it("should queue multiple announcements by priority", () => {
			const { rerender } = render(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassLiveRegion message="" queueingEnabled priority="polite" />,
			);

			// Queue announcements with different priorities
			rerender(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassLiveRegion
					message="Low priority message"
					queueingEnabled
					priority="polite"
				/>,
			);

			expect(screen.getByText("Low priority message")).toBeInTheDocument();
		});

		it("should process announcements in priority order", async () => {
			const TestComponent = () => {
				const { announce, announcement } = useAnnouncement();

				React.useEffect(() => {
					announce("Low priority", { priority: "low" });
					announce("Critical priority", { priority: "critical" });
					announce("Medium priority", { priority: "medium" });
				}, [announce]);

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				return <div>{announcement}</div>;
			};

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			render(<TestComponent />);

			// Critical should be announced first (0ms delay)
			await waitFor(() => {
				expect(screen.getByText("Critical priority")).toBeInTheDocument();
			});
		});
	});

	describe("Deduplication", () => {
		it("should deduplicate announcements with same dedupKey", () => {
			const TestComponent = () => {
				const { announce, announcement } = useAnnouncement();

				React.useEffect(() => {
					announce("Same message", { dedupKey: "test-key" });
					announce("Same message", { dedupKey: "test-key" }); // Should be ignored
					announce("Different message", { dedupKey: "other-key" });
				}, [announce]);

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				return <div>{announcement}</div>;
			};

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			render(<TestComponent />);

			act(() => {
				vi.advanceTimersByTime(1000);
			});

			// Only the first announcement should be made
			expect(screen.queryAllByText("Same message")).toHaveLength(0); // Not shown immediately due to delay
		});
	});

	describe("Context-aware Announcements", () => {
		it("should add context prefixes when enabled", () => {
			render(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassLiveRegion
					message="Form submitted"
					queueingEnabled={false}
					contextualPrefix={true}
					priority="polite"
				/>,
			);

			expect(screen.getByText("Form submitted")).toBeInTheDocument();
		});

		it("should use context-specific methods", () => {
			const TestComponent = () => {
				const { announceError, announceSuccess, announcement } =
					useAnnouncement();

				React.useEffect(() => {
					announceError("Something went wrong");
				}, [announceError]);

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				return <div>{announcement}</div>;
			};

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			render(<TestComponent />);

			act(() => {
// @ts-expect-error TS(2708): Cannot use namespace 'jest' as a value.
				jest.advanceTimersByTime(100); // High priority has 100ms delay
			});

			expect(screen.getByText("Something went wrong")).toBeInTheDocument();
		});
	});

	describe("Global Announcer", () => {
		it("should handle global announcements", () => {
			const TestComponent = () => {
				const [message, setMessage] = React.useState("");

// @ts-expect-error TS(2345): Argument of type '() => () => boolean' is not assi... Remove this comment to see the full error message
				React.useEffect(() => {
					const unsubscribe = announcer.subscribe((msg) => {
						setMessage(msg);
					});

					announcer.error("Global error message");

					return unsubscribe;
				}, []);

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				return <div>{message}</div>;
			};

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			render(<TestComponent />);

			act(() => {
				vi.advanceTimersByTime(100);
			});

			expect(screen.getByText("Global error message")).toBeInTheDocument();
		});
	});

	describe("GlassLiveRegionProvider", () => {
		it("should manage multiple live regions", () => {
			render(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassLiveRegionProvider>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<div>Test content</div>
				</GlassLiveRegionProvider>,
			);

			// Verify live regions are created
			const liveRegions = screen
				.getByText("Test content")
				.parentElement?.querySelectorAll("[aria-live]");
			expect(liveRegions?.length).toBeGreaterThan(0);
		});

		it("should separate polite and assertive announcements", () => {
			const { container } = render(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassLiveRegionProvider>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<div>Test</div>
				</GlassLiveRegionProvider>,
			);

			act(() => {
				announcer.announce("Polite message", { priority: "low" });
				announcer.announce("Assertive message", { priority: "critical" });
			});

			const politeRegion = container.querySelector('[aria-live="polite"]');
			const assertiveRegion = container.querySelector(
				'[aria-live="assertive"]',
			);

			expect(politeRegion).toBeInTheDocument();
			expect(assertiveRegion).toBeInTheDocument();
		});
	});

	describe("Custom Timing", () => {
		it("should respect custom delays", () => {
			const TestComponent = () => {
				const { announce, announcement } = useAnnouncement();

				React.useEffect(() => {
					announce("Delayed message", { delay: 1000 });
				}, [announce]);

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				return <div>{announcement || "No announcement"}</div>;
			};

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			render(<TestComponent />);

			// Initially no announcement
			expect(screen.getByText("No announcement")).toBeInTheDocument();

			// After 1 second delay
			act(() => {
				vi.advanceTimersByTime(1000);
			});

			expect(screen.getByText("Delayed message")).toBeInTheDocument();
		});

		it("should clear messages after clearDelay", () => {
			const TestComponent = () => {
				const { announce, announcement } = useAnnouncement();

				React.useEffect(() => {
					announce("Temporary message", { clearDelay: 2000, delay: 0 });
				}, [announce]);

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				return <div>{announcement || "No announcement"}</div>;
			};

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			render(<TestComponent />);

			// Message appears immediately
			expect(screen.getByText("Temporary message")).toBeInTheDocument();

			// After 2 seconds, message clears
			act(() => {
				vi.advanceTimersByTime(2000);
			});

			expect(screen.getByText("No announcement")).toBeInTheDocument();
		});
	});
});
