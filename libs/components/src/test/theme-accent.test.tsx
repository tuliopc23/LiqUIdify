import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { ThemeProvider, useTheme } from "../hooks/use-theme";
import { render, screen, waitFor } from "./test-utils";

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

describe("ThemeProvider accent", () => {
	beforeEach(() => {
		// Reset DOM and storage between tests
		window.localStorage.clear();
		const root = document.documentElement as HTMLElement;
		delete (root as any).dataset.accent;
		root.style.removeProperty("--ui-accent");
	});

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

		render(
			<ThemeProvider>
				<AccentChanger />
			</ThemeProvider>,
		);

		const btn = await screen.findByRole("button", { name: /change-accent/i });
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
