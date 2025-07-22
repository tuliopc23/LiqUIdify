/**
 * SSR-Safe DOM Utilities
 * Provides safe wrappers for DOM operations that work in both SSR and client environments
 */

// SSR environment check utilities
export const isSSR = (): boolean => {
	return "undefined" === typeof window || "undefined" === typeof document;
};

export const isClient = (): boolean => {
	return !isSSR();
};

// Safe DOM creation wrapper
export const safeCreateElement = <T extends HTMLElement>(
	tagName: string,
	options?: ElementCreationOptions,
): T | null => {
	if (isSSR()) {
		console.warn(
			"[SSR] createElement called in SSR environment, returning null",
		);
		return;
	}

	try {
		return document.createElement(tagName, options) as T;
	} catch (error) {
		console.warn("[SSR] Failed to create element:", error);
		return;
	}
};

// Safe document.body access
export const safeGetDocumentBody = (): HTMLElement | null => {
	if (isSSR() || !document.body) {
		return;
	}
	return document.body;
};

// Safe document.querySelector wrapper
export const safeQuerySelector = <T extends Element = Element>(
	selector: string,
	container?: Element | Document,
): T | null => {
	if (isSSR()) {
		return;
	}

	try {
		const root = container || document;
		return root.querySelector<T>(selector);
	} catch (error) {
		console.warn(`[SSR] Failed to query selector "${selector}":`, error);
		return;
	}
};

// Safe document.querySelectorAll wrapper
export const safeQuerySelectorAll = <T extends Element = Element>(
	selector: string,
	container?: Element | Document,
): NodeListOf<T> | T[] => {
	if (isSSR()) {
		return [] as T[];
	}

	try {
		const root = container || document;
		return root.querySelectorAll<T>(selector);
	} catch (error) {
		console.warn(`[SSR] Failed to query selector all "${selector}":`, error);
		return [] as T[];
	}
};

// Safe document.getElementById wrapper
export const safeGetElementById = <T extends HTMLElement = HTMLElement>(
	id: string,
): T | null => {
	if (isSSR()) {
		return;
	}

	try {
		return document.getElementById(id) as T | null;
	} catch (error) {
		console.warn(`[SSR] Failed to get element by id "${id}":`, error);
		return;
	}
};

// Safe event listener management
export const safeAddEventListener = (
	element: Element | Window | Document,
	type: string,
	listener: EventListenerOrEventListenerObject,
	options?: boolean | AddEventListenerOptions,
): (() => void) => {
	if (isSSR()) {
		return () => {}; // Return empty cleanup function
	}

	try {
		element.addEventListener(type, listener, options);

		// Return cleanup function
		return () => {
			try {
				element.removeEventListener(type, listener, options);
			} catch (error) {
				console.warn(
					`[SSR] Failed to remove event listener for "${type}":`,
					error,
				);
			}
		};
	} catch (error) {
		console.warn(`[SSR] Failed to add event listener for "${type}":`, error);
		return () => {};
	}
};

// Safe window property access
export const safeGetWindowProperty = <T>(
	property: keyof Window,
	fallback: T,
): T => {
	if (isSSR()) {
		return fallback;
	}

	try {
		return (window[property] as T) ?? fallback;
	} catch (error) {
		console.warn(`[SSR] Failed to access window.${property}:`, error);
		return fallback;
	}
};

// Safe viewport dimensions
export const safeGetViewportDimensions = (): {
	width: number;
	height: number;
} => {
	if (isSSR()) {
		return { width: 1024, height: 768 }; // Default viewport dimensions
	}

	try {
		return {
			width: window.innerWidth || document.documentElement.clientWidth || 1024,
			height:
				window.innerHeight || document.documentElement.clientHeight || 768,
		};
	} catch (error) {
		console.warn("[SSR] Failed to get viewport dimensions:", error);
		return { width: 1024, height: 768 };
	}
};

// Safe scroll position access
export const safeGetScrollPosition = (): { x: number; y: number } => {
	if (isSSR()) {
		return { x: 0, y: 0 };
	}

	try {
		return {
			x: window.pageXOffset || document.documentElement.scrollLeft || 0,
			y: window.pageYOffset || document.documentElement.scrollTop || 0,
		};
	} catch (error) {
		console.warn("[SSR] Failed to get scroll position:", error);
		return { x: 0, y: 0 };
	}
};

// Safe element bounds access
export const safeGetBoundingClientRect = (element: Element | null): DOMRect => {
	const fallbackRect = {
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		toJSON: () => ({}),
	} as DOMRect;

	if (isSSR() || !element) {
		return fallbackRect;
	}

	try {
		return element.getBoundingClientRect();
	} catch (error) {
		console.warn("[SSR] Failed to get bounding client rect:", error);
		return fallbackRect;
	}
};

// Safe computed style access
export const safeGetComputedStyle = (
	element: Element | null,
	pseudoElement?: string | null,
): CSSStyleDeclaration | Partial<CSSStyleDeclaration> => {
	if (isSSR() || !element) {
		return {} as Partial<CSSStyleDeclaration>;
	}

	try {
		return window.getComputedStyle(element, pseudoElement);
	} catch (error) {
		console.warn("[SSR] Failed to get computed style:", error);
		return {} as Partial<CSSStyleDeclaration>;
	}
};

// Safe local storage access
export const safeLocalStorage = {
	getItem: (key: string): string | null => {
		if (isSSR()) {
			return;
		}

		try {
			return localStorage.getItem(key);
		} catch (error) {
			console.warn(`[SSR] Failed to get localStorage item "${key}":`, error);
			return;
		}
	},

	setItem: (key: string, value: string): boolean => {
		if (isSSR()) {
			return false;
		}

		try {
			localStorage.setItem(key, value);
			return true;
		} catch (error) {
			console.warn(`[SSR] Failed to set localStorage item "${key}":`, error);
			return false;
		}
	},

	removeItem: (key: string): boolean => {
		if (isSSR()) {
			return false;
		}

		try {
			localStorage.removeItem(key);
			return true;
		} catch (error) {
			console.warn(`[SSR] Failed to remove localStorage item "${key}":`, error);
			return false;
		}
	},
};

// Safe session storage access
export const safeSessionStorage = {
	getItem: (key: string): string | null => {
		if (isSSR()) {
			return;
		}

		try {
			return sessionStorage.getItem(key);
		} catch (error) {
			console.warn(`[SSR] Failed to get sessionStorage item "${key}":`, error);
			return;
		}
	},

	setItem: (key: string, value: string): boolean => {
		if (isSSR()) {
			return false;
		}

		try {
			sessionStorage.setItem(key, value);
			return true;
		} catch (error) {
			console.warn(`[SSR] Failed to set sessionStorage item "${key}":`, error);
			return false;
		}
	},

	removeItem: (key: string): boolean => {
		if (isSSR()) {
			return false;
		}

		try {
			sessionStorage.removeItem(key);
			return true;
		} catch (error) {
			console.warn(
				`[SSR] Failed to remove sessionStorage item "${key}":`,
				error,
			);
			return false;
		}
	},
};

// Safe body style manipulation
export interface BodyStyleProps {
	overflow?: string;
	paddingRight?: string;
	[key: string]: string | undefined;
}

export const safeSetBodyStyles = (styles: BodyStyleProps): (() => void) => {
	if (isSSR()) {
		return () => {}; // Return empty cleanup function
	}

	const body = safeGetDocumentBody();
	if (!body) {
		return () => {};
	}

	const originalStyles: BodyStyleProps = {};

	try {
		// Store original values and apply new styles
		Object.keys(styles).forEach((property) => {
			const value = styles[property];
			if (value !== undefined) {
				originalStyles[property] = body.style.getPropertyValue(property) || "";
				body.style.setProperty(property, value);
			}
		});

		// Return cleanup function that restores original styles
		return () => {
			try {
				Object.keys(originalStyles).forEach((property) => {
					const originalValue = originalStyles[property];
					if (originalValue !== undefined) {
						if ("" === originalValue) {
							body.style.removeProperty(property);
						} else {
							body.style.setProperty(property, originalValue);
						}
					}
				});
			} catch (error) {
				console.warn("[SSR] Failed to restore body styles:", error);
			}
		};
	} catch (error) {
		console.warn("[SSR] Failed to set body styles:", error);
		return () => {};
	}
};

// Safe focus management
export const safeFocus = (
	element: HTMLElement | null,
	options?: FocusOptions,
): boolean => {
	if (isSSR() || !element) {
		return false;
	}

	try {
		element.focus(options);
		return document.activeElement === element;
	} catch (error) {
		console.warn("[SSR] Failed to focus element:", error);
		return false;
	}
};

// Safe element visibility check
export const safeIsElementVisible = (element: Element | null): boolean => {
	if (isSSR() || !element) {
		return false;
	}

	try {
		const style = safeGetComputedStyle(element);
		const rect = safeGetBoundingClientRect(element);

		return (
			"none" !== style.display &&
			"hidden" !== style.visibility &&
			0 < parseFloat(style.opacity || "1") &&
			0 < rect.width &&
			0 < rect.height &&
			null !== (element as HTMLElement).offsetParent
		);
	} catch (error) {
		console.warn("[SSR] Failed to check element visibility:", error);
		return false;
	}
};

// Safe media query matching
export const safeMatchMedia = (
	query: string,
): {
	matches: boolean;
	addListener: (listener: (event: MediaQueryListEvent) => void) => () => void;
} => {
	if (isSSR()) {
		return {
			matches: false,
			addListener: () => () => {}, // Return empty cleanup function
		};
	}

	try {
		const mediaQuery = window.matchMedia(query);

		return {
			matches: mediaQuery.matches,
			addListener: (listener: (event: MediaQueryListEvent) => void) => {
				mediaQuery.addEventListener("change", listener);

				return () => {
					try {
						mediaQuery.removeEventListener("change", listener);
					} catch (error) {
						console.warn("[SSR] Failed to remove media query listener:", error);
					}
				};
			},
		};
	} catch (error) {
		console.warn(`[SSR] Failed to match media query "${query}":`, error);
		return {
			matches: false,
			addListener: () => () => {},
		};
	}
};

export default {
	isSSR,
	isClient,
	safeCreateElement,
	safeGetDocumentBody,
	safeQuerySelector,
	safeQuerySelectorAll,
	safeGetElementById,
	safeAddEventListener,
	safeGetWindowProperty,
	safeGetViewportDimensions,
	safeGetScrollPosition,
	safeGetBoundingClientRect,
	safeGetComputedStyle,
	safeLocalStorage,
	safeSessionStorage,
	safeSetBodyStyles,
	safeFocus,
	safeIsElementVisible,
	safeMatchMedia,
};
