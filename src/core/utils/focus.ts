/**
 * Focus Management Utilities
 * Provides utilities for managing focus in glass components
 */

/**
 * Focus ring utility for consistent focus styling
 */
export const focusRing = {
	base: "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
	primary: "focus-visible:ring-blue-500",
	secondary: "focus-visible:ring-gray-500",
	destructive: "focus-visible:ring-red-500",
	ghost: "focus-visible:ring-gray-400",
} as const;

/**
 * Focus trap for modal and overlay components
 */
export const createFocusTrap = (element: HTMLElement) => {
	const focusableElements = element.querySelectorAll(
		'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
	);

	const firstElement = focusableElements[0] as HTMLElement;
	const lastElement = focusableElements.at(
		-1
	) as HTMLElement;

	const handleTabKey = (e: KeyboardEvent) => {
		if ("Tab" !== e.key) {
			return;
		}

		if (e.shiftKey) {
			if (document.activeElement === firstElement) {
				lastElement?.focus();
				e.preventDefault();
			}
		} else {
			if (document.activeElement === lastElement) {
				firstElement?.focus();
				e.preventDefault();
			}
		}
	};

	element.addEventListener("keydown", handleTabKey);

	return () => {
		element.removeEventListener("keydown", handleTabKey);
	};
};

/**
 * Focus the first focusable element in a container
 */
export const focusFirst = (container: HTMLElement) => {
	const focusable = container.querySelector(
		'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
	) as HTMLElement;

	focusable?.focus();
};

/**
 * Restore focus to a previously focused element
 */
export const restoreFocus = (element: HTMLElement | null) => {
	if (element && "function" === typeof element.focus) {
		element.focus();
	}
};

/**
 * Check if an element is focusable
 */
export const isFocusable = (element: HTMLElement): boolean => {
	const focusableSelectors = [
		"button:not([disabled])",
		"[href]",
		"input:not([disabled])",
		"select:not([disabled])",
		"textarea:not([disabled])",
		'[tabindex]:not([tabindex="-1"])',
	];

	return focusableSelectors.some((selector) => element.matches(selector));
};
