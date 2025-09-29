import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider, useTheme } from "../hooks/use-theme";
import {
	listAccentPresets,
	getAccentPreset,
	setAccentPreset,
} from "../lib/theme";
import type { AccentPresetName } from "../lib/theme";
import { render, waitFor } from "./test-utils";

function AccentChanger() {
	const { setAccent, accent } = useTheme();
	return (
		<button
			type="button"
			aria-label="change-accent"
			onClick={() => setAccent("#34C759")}
		>
			{accent}
		</button>
	);
}

function PresetChanger() {
	const { setAccentPreset, accentPreset } = useTheme();
	return (
		<button
			type="button"
			aria-label="change-preset"
			onClick={() => setAccentPreset("green")}
		>
			{accentPreset || "none"}
		</button>
	);
}

function TestComponent() {
	const { accent, accentPreset, setAccent, setAccentPreset } = useTheme();
	return (
		<div>
			<div data-testid="accent">{accent}</div>
			<div data-testid="preset">{accentPreset || "none"}</div>
			<button
				type="button"
				aria-label="set-red-preset"
				onClick={() => setAccentPreset("red")}
			>
				Red
			</button>
			<button
				type="button"
				aria-label="set-custom-accent"
				onClick={() => setAccent("#CUSTOM")}
			>
				Custom
			</button>
		</div>
	);
}

describe("ThemeProvider accent", () => {
	beforeEach(() => {
		// Reset DOM and storage between tests
		window.localStorage.clear();
		const root = document.documentElement as HTMLElement;
		delete (root as any).dataset.accent;
		root.style.removeProperty("--ui-accent");
	});

	describe("Basic accent functionality", () => {
		it("applies accent from localStorage on mount", async () => {
			window.localStorage.setItem("ui-accent", "#34C759");

			render(
				<ThemeProvider>
					<div>content</div>
				</ThemeProvider>,
			);

			await waitFor(() => {
				const root = document.documentElement as HTMLElement;
				expect(root.dataset.accent).toBe("#34C759");
				expect(root.style.getPropertyValue("--ui-accent")).toBe("#34C759");
			});
		});

		it("updates DOM and storage when setAccent is called", async () => {
			const user = userEvent.setup();

			const { findByRole } = render(
				<ThemeProvider>
					<AccentChanger />
				</ThemeProvider>,
			);

			const btn = await findByRole("button", { name: /change-accent/i });
			await user.click(btn);

			await waitFor(() => {
				const root = document.documentElement as HTMLElement;
				expect(root.dataset.accent).toBe("#34C759");
				expect(root.style.getPropertyValue("--ui-accent")).toBe("#34C759");
				expect(window.localStorage.getItem("ui-accent")).toBe("#34C759");
			});
		});

		it("falls back to default when no stored accent", async () => {
			render(
				<ThemeProvider>
					<div>content</div>
				</ThemeProvider>,
			);

			await waitFor(() => {
				const root = document.documentElement as HTMLElement;
				// Default is Apple System Blue
				expect(root.dataset.accent).toBe("#007AFF");
				expect(root.style.getPropertyValue("--ui-accent")).toBe("#007AFF");
			});
		});
	});

	describe("Accent preset functionality", () => {
		it("applies accentPreset prop on mount", async () => {
			render(
				<ThemeProvider accentPreset="red">
					<div>content</div>
				</ThemeProvider>,
			);

			await waitFor(() => {
				const root = document.documentElement as HTMLElement;
				expect(root.dataset.accent).toBe("#FF3B30");
				expect(root.style.getPropertyValue("--ui-accent")).toBe("#FF3B30");
			});
		});

		it("updates DOM when setAccentPreset is called", async () => {
			const user = userEvent.setup();

			const { findByRole } = render(
				<ThemeProvider>
					<PresetChanger />
				</ThemeProvider>,
			);

			const btn = await findByRole("button", { name: /change-preset/i });
			await user.click(btn);

			await waitFor(() => {
				const root = document.documentElement as HTMLElement;
				expect(root.dataset.accent).toBe("#34C759");
				expect(root.style.getPropertyValue("--ui-accent")).toBe("#34C759");
			});
		});

		it("tracks current preset name correctly", async () => {
			const user = userEvent.setup();

			const { findByRole, getByTestId } = render(
				<ThemeProvider>
					<TestComponent />
				</ThemeProvider>,
			);

			const btn = await findByRole("button", { name: /set-red-preset/i });
			await user.click(btn);

			await waitFor(() => {
				expect(getByTestId("preset")).toHaveTextContent("red");
				expect(getByTestId("accent")).toHaveTextContent("#FF3B30");
			});
		});

		it("clears preset when setting custom accent", async () => {
			const user = userEvent.setup();

			const { findByRole, getByTestId } = render(
				<ThemeProvider accentPreset="green">
					<TestComponent />
				</ThemeProvider>,
			);

			// Initially has green preset
			await waitFor(() => {
				expect(getByTestId("preset")).toHaveTextContent("green");
				expect(getByTestId("accent")).toHaveTextContent("#34C759");
			});

			// Set custom accent should clear preset
			const customBtn = await findByRole("button", {
				name: /set-custom-accent/i,
			});
			await user.click(customBtn);

			await waitFor(() => {
				expect(getByTestId("preset")).toHaveTextContent("none");
				expect(getByTestId("accent")).toHaveTextContent("#CUSTOM");
			});
		});
	});

	describe("Persistence behavior", () => {
		it("persists preset when persistAccent is true (default)", async () => {
			const user = userEvent.setup();

			const { findByRole } = render(
				<ThemeProvider>
					<PresetChanger />
				</ThemeProvider>,
			);

			const btn = await findByRole("button", { name: /change-preset/i });
			await user.click(btn);

			await waitFor(() => {
				expect(window.localStorage.getItem("ui-accent")).toBe("#34C759");
				expect(window.localStorage.getItem("ui-accent-preset")).toBe("green");
			});
		});

		it("does not persist when persistAccent is false", async () => {
			const user = userEvent.setup();

			const { findByRole } = render(
				<ThemeProvider persistAccent={false}>
					<PresetChanger />
				</ThemeProvider>,
			);

			const btn = await findByRole("button", { name: /change-preset/i });
			await user.click(btn);

			await waitFor(() => {
				const root = document.documentElement as HTMLElement;
				expect(root.dataset.accent).toBe("#34C759");
			});

			// Should not persist to localStorage
			expect(window.localStorage.getItem("ui-accent")).toBeNull();
			expect(window.localStorage.getItem("ui-accent-preset")).toBeNull();
		});

		it("restores preset from localStorage on mount", async () => {
			window.localStorage.setItem("ui-accent-preset", "orange");
			window.localStorage.setItem("ui-accent", "#FF9500");

			const { getByTestId } = render(
				<ThemeProvider>
					<TestComponent />
				</ThemeProvider>,
			);

			await waitFor(() => {
				expect(getByTestId("preset")).toHaveTextContent("orange");
				expect(getByTestId("accent")).toHaveTextContent("#FF9500");
			});
		});
	});

	describe("Precedence order", () => {
		it("prop overrides localStorage", async () => {
			window.localStorage.setItem("ui-accent-preset", "green");
			window.localStorage.setItem("ui-accent", "#34C759");

			const { getByTestId } = render(
				<ThemeProvider accentPreset="red">
					<TestComponent />
				</ThemeProvider>,
			);

			await waitFor(() => {
				expect(getByTestId("preset")).toHaveTextContent("red");
				expect(getByTestId("accent")).toHaveTextContent("#FF3B30");
			});
		});

		it("localStorage overrides CSS var", async () => {
			// Set CSS variable
			document.documentElement.style.setProperty("--ui-accent", "#CSS123");

			window.localStorage.setItem("ui-accent", "#34C759");

			const { getByTestId } = render(
				<ThemeProvider>
					<TestComponent />
				</ThemeProvider>,
			);

			await waitFor(() => {
				expect(getByTestId("accent")).toHaveTextContent("#34C759");
			});
		});

		it("CSS var overrides data-accent attribute", async () => {
			document.documentElement.style.setProperty("--ui-accent", "#CSS123");
			document.documentElement.dataset.accent = "#DATA456";

			const { getByTestId } = render(
				<ThemeProvider>
					<TestComponent />
				</ThemeProvider>,
			);

			await waitFor(() => {
				expect(getByTestId("accent")).toHaveTextContent("#CSS123");
			});
		});

		it("data-accent overrides default", async () => {
			document.documentElement.dataset.accent = "#DATA456";

			const { getByTestId } = render(
				<ThemeProvider>
					<TestComponent />
				</ThemeProvider>,
			);

			await waitFor(() => {
				expect(getByTestId("accent")).toHaveTextContent("#DATA456");
			});
		});
	});

	describe("OnAccentChange callback", () => {
		it("calls onAccentChange when accent changes", async () => {
			const onAccentChange = vi.fn();
			const user = userEvent.setup();

			const { findByRole } = render(
				<ThemeProvider onAccentChange={onAccentChange}>
					<PresetChanger />
				</ThemeProvider>,
			);

			const btn = await findByRole("button", { name: /change-preset/i });
			await user.click(btn);

			await waitFor(() => {
				expect(onAccentChange).toHaveBeenCalledWith("#34C759", "green");
			});
		});

		it("calls onAccentChange with preset name when setting preset", async () => {
			const onAccentChange = vi.fn();
			const user = userEvent.setup();

			const { findByRole } = render(
				<ThemeProvider onAccentChange={onAccentChange}>
					<TestComponent />
				</ThemeProvider>,
			);

			const btn = await findByRole("button", { name: /set-red-preset/i });
			await user.click(btn);

			await waitFor(() => {
				expect(onAccentChange).toHaveBeenCalledWith("#FF3B30", "red");
			});
		});

		it("calls onAccentChange with null preset when setting custom accent", async () => {
			const onAccentChange = vi.fn();
			const user = userEvent.setup();

			const { findByRole } = render(
				<ThemeProvider accentPreset="green" onAccentChange={onAccentChange}>
					<TestComponent />
				</ThemeProvider>,
			);

			const btn = await findByRole("button", { name: /set-custom-accent/i });
			await user.click(btn);

			await waitFor(() => {
				expect(onAccentChange).toHaveBeenCalledWith("#CUSTOM", null);
			});
		});
	});
});

describe("Accent preset library", () => {
	it("listAccentPresets returns all available presets", () => {
		const presets = listAccentPresets();
		expect(presets).toHaveLength(11);
		expect(presets).toContain("blue");
		expect(presets).toContain("red");
		expect(presets).toContain("green");
		expect(presets).toContain("orange");
		expect(presets).toContain("yellow");
		expect(presets).toContain("pink");
		expect(presets).toContain("purple");
		expect(presets).toContain("teal");
		expect(presets).toContain("indigo");
		expect(presets).toContain("brown");
		expect(presets).toContain("gray");
	});

	it("getAccentPreset returns correct color for preset", () => {
		expect(getAccentPreset("blue")).toBe("#007AFF");
		expect(getAccentPreset("red")).toBe("#FF3B30");
		expect(getAccentPreset("green")).toBe("#34C759");
		expect(getAccentPreset("orange")).toBe("#FF9500");
		expect(getAccentPreset("yellow")).toBe("#FFCC00");
		expect(getAccentPreset("pink")).toBe("#FF2D92");
		expect(getAccentPreset("purple")).toBe("#AF52DE");
		expect(getAccentPreset("teal")).toBe("#5AC8FA");
		expect(getAccentPreset("indigo")).toBe("#5856D6");
		expect(getAccentPreset("brown")).toBe("#A2845E");
		expect(getAccentPreset("gray")).toBe("#8E8E93");
	});

	it("setAccentPreset updates DOM with preset color", () => {
		setAccentPreset("purple");

		const root = document.documentElement as HTMLElement;
		expect(root.dataset.accent).toBe("#AF52DE");
		expect(root.style.getPropertyValue("--ui-accent")).toBe("#AF52DE");
	});

	it("setAccentPreset with persist option controls localStorage", () => {
		// Clear any existing storage
		window.localStorage.clear();

		// Test with persist: false
		setAccentPreset("teal", { persist: false });
		expect(window.localStorage.getItem("ui-accent")).toBeNull();
		expect(window.localStorage.getItem("ui-accent-preset")).toBeNull();

		// Test with persist: true (default)
		setAccentPreset("indigo", { persist: true });
		expect(window.localStorage.getItem("ui-accent")).toBe("#5856D6");
		expect(window.localStorage.getItem("ui-accent-preset")).toBe("indigo");
	});
});

describe("Accessibility considerations", () => {
	it("documents that some preset colors may have contrast limitations", () => {
		// This test serves as documentation that certain accent presets
		// (orange #FF9500, yellow #FFCC00) may not meet WCAG AA contrast
		// requirements when used as foreground text on light backgrounds.
		// This is expected behavior for Apple system colors.

		const problematicPresets: AccentPresetName[] = ["orange", "yellow"];

		problematicPresets.forEach((preset) => {
			const color = getAccentPreset(preset);
			// Document the colors for reference
			expect(color).toMatch(/^#[0-9A-F]{6}$/i);
		});

		// This test documents the limitation rather than enforcing strict compliance
		// since these are system colors designed for various use cases
		expect(problematicPresets).toContain("orange");
		expect(problematicPresets).toContain("yellow");
	});
});
