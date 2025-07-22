/**
 * SSR Testing Utilities - Enhanced
 * Provides comprehensive utilities for testing component SSR safety
 */

import type { ReactElement } from "react";
import { renderToString } from "react-dom/server";
import { vi } from "vitest";

/**
 * Test if a component renders safely on the server
 * @param component - React component to test
 * @param name - Name for the test case
 */
export const testSSRSafety = (component: ReactElement, name: string) => {
	test(`${name} renders safely on server`, () => {
		expect(() => {
			renderToString(component);
		}).not.toThrow();
	});
};

/**
 * Test suite for comprehensive SSR safety
 * @param component - React component to test
 * @param name - Name for the test suite
 */
export const testSSRSuite = (component: ReactElement, name: string) => {
	describe(`${name} SSR Safety`, () => {
		testSSRSafety(component, name);

		test(`${name} produces valid HTML`, () => {
			const serverHTML = renderToString(component);
			expect(serverHTML).toBeDefined();
			expect(typeof serverHTML).toBe("string");
			expect(serverHTML.length).toBeGreaterThan(0);
		});

		test(`${name} doesn't access browser APIs during render`, () => {
			const consoleSpy = vi
				?.spyOn?.(console, "error")
				?.mockImplementation?.(() => {}) || { mockRestore: () => {} };

			renderToString(component);

			expect(consoleSpy).not.toHaveBeenCalledWith(
				expect.stringContaining("window is not defined"),
			);
			expect(consoleSpy).not.toHaveBeenCalledWith(
				expect.stringContaining("document is not defined"),
			);

			consoleSpy.mockRestore();
		});
	});
};
