import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { accessibilityManager } from "@/core/accessibility-manager";
import { cn } from "@/core/utils/classname";
import { useIsClient } from "@/hooks/use-ssr-safe";

export interface GlassFocusTrapProps {
	children: React.ReactNode;
	active?: boolean;
	paused?: boolean;
	onEscape?: () => void;
	onDeactivate?: () => void;
	initialFocus?: React.RefObject<HTMLElement> | string;
	returnFocus?: boolean;
	className?: string;
	preventScroll?: boolean;
	fallbackFocus?: React.RefObject<HTMLElement>;
	delayInitialFocus?: boolean;
	allowOutsideClick?: boolean;
	autoFocus?: boolean;
	restoreFocus?: boolean;
	focusOptions?: FocusOptions;
	trapStack?: boolean; // Support multiple nested traps
}

interface FocusHistory {
	element: HTMLElement;
	scrollPosition: { x: number; y: number };
	timestamp: number;
}

// Interface for focus trap instance
interface FocusTrapInstance {
	containerRef: React.RefObject<HTMLDivElement | null>;
	isActive: boolean;
	deactivate: () => void;
}

// Global focus trap stack for nested traps
const focusTrapStack: FocusTrapInstance[] = [];

export const GlassFocusTrap: React.FC<GlassFocusTrapProps> = ({
	children,
	active = true,
	paused = false,
	onEscape,
	onDeactivate,
	initialFocus,
	returnFocus = true,
	className,
	preventScroll = false,
	fallbackFocus,
	delayInitialFocus = false,
	allowOutsideClick = false,
	autoFocus = true,
	restoreFocus = true,
	focusOptions = {},
	trapStack = true,
}) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const previousActiveElement = useRef<HTMLElement | null>(null);
	const focusHistory = useRef<FocusHistory[]>([]);
	const [isActive, setIsActive] = useState(false);
	const lastFocusedElement = useRef<HTMLElement | null>(null);
	const focusTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
	const instanceRef = useRef<FocusTrapInstance | null>(null);
	const isClient = useIsClient();

	// Store instance reference for stack management
	useEffect(() => {
		instanceRef.current = {
			containerRef,
			isActive,
			deactivate: () => setIsActive(false),
		};
	}, [isActive]);

	const getFocusableElements = useCallback((): HTMLElement[] => {
		if (!isClient || !containerRef.current) {
			return [];
		}

		const focusableSelectors = [
			'a[href]:not([disabled]):not([tabindex="-1"])',
			'button:not([disabled]):not([tabindex="-1"])',
			'textarea:not([disabled]):not([tabindex="-1"])',
			'input:not([disabled]):not([type="hidden"]):not([tabindex="-1"])',
			'select:not([disabled]):not([tabindex="-1"])',
			'[tabindex]:not([tabindex="-1"]):not([disabled])',
			'[contenteditable="true"]:not([disabled])',
			"audio[controls]:not([disabled])",
			"video[controls]:not([disabled])",
			"details > summary:not([disabled])",
			"iframe:not([disabled])",
		].join(",");

		return [
			...containerRef.current.querySelectorAll<HTMLElement>(focusableSelectors),
		].filter((el) => {
			// Check if element is visible and focusable
			const style = window.getComputedStyle(el);
			const rect = el.getBoundingClientRect();

			return (
				"none" !== style.display &&
				"hidden" !== style.visibility &&
				"0" !== style.opacity &&
				null !== el.offsetParent &&
				0 < rect.width &&
				0 < rect.height &&
				!el.hasAttribute("inert") &&
				!el.closest("[inert]")
			);
		});
	}, [isClient]);

	const saveFocusHistory = useCallback(
		(element: HTMLElement) => {
			if (!isClient) {
				return;
			}

			const scrollPosition = {
				x: window.scrollX,
				y: window.scrollY,
			};

			focusHistory.current.push({
				element,
				scrollPosition,
				timestamp: Date.now(),
			});

			// Keep only last 10 focus history items
			if (10 < focusHistory.current.length) {
				focusHistory.current.shift();
			}
		},
		[isClient],
	);

	const restoreFocusFromHistory = useCallback(() => {
		const history = focusHistory.current;

		for (let i = history.length - 1; 0 <= i; i--) {
			const historyItem = history[i];
			if (!historyItem) {
				continue;
			}
			const { element, scrollPosition } = historyItem;

			if (
				document.body.contains(element) &&
				!element.hasAttribute("disabled")
			) {
				try {
					element.focus({ preventScroll: true });

					if (document.activeElement === element) {
						// Restore scroll position if needed
						if (!preventScroll) {
							window.scrollTo(scrollPosition.x, scrollPosition.y);
						}
						return true;
					}
				} catch {
					// Logging disabled
				}
			}
		}

		return false;
	}, [preventScroll]);

	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (!isActive || paused) {
				return;
			}

			// Check if this is the active trap in the stack
			if (trapStack && 0 < focusTrapStack.length) {
				const activeTrap = focusTrapStack[focusTrapStack.length - 1];
				if (activeTrap !== instanceRef.current) {
					return;
				}
			}

			if ("Escape" === event.key && onEscape) {
				event.preventDefault();
				event.stopPropagation();
				onEscape();
				return;
			}

			if ("Tab" !== event.key) {
				return;
			}

			const focusableElements = getFocusableElements();
			if (0 === focusableElements.length) {
				return;
			}

			const firstElement = focusableElements[0];
			const lastElement = focusableElements[focusableElements.length - 1] as
				| HTMLElement
				| undefined;

			if (!firstElement || !lastElement) {
				return;
			}
			const activeElement = document.activeElement as HTMLElement;

			// Handle edge case: focus is outside the trap
			if (!containerRef.current?.contains(activeElement)) {
				event.preventDefault();
				if (event.shiftKey) {
					lastElement.focus(focusOptions);
				} else {
					firstElement.focus(focusOptions);
				}
				return;
			}

			// Tab forwards
			if (!event.shiftKey && activeElement === lastElement) {
				event.preventDefault();
				firstElement.focus(focusOptions);
				saveFocusHistory(firstElement);
			}
			// Tab backwards
			else if (event.shiftKey && activeElement === firstElement) {
				event.preventDefault();
				lastElement.focus(focusOptions);
				saveFocusHistory(lastElement);
			}
		},
		[
			isActive,
			paused,
			onEscape,
			getFocusableElements,
			focusOptions,
			saveFocusHistory,
			trapStack,
		],
	);

	const handleFocusIn = useCallback(
		(event: FocusEvent) => {
			if (!isActive || paused || !containerRef.current) {
				return;
			}

			// Check if this is the active trap in the stack
			if (trapStack && 0 < focusTrapStack.length) {
				const activeTrap = focusTrapStack[focusTrapStack.length - 1];
				if (activeTrap !== instanceRef.current) {
					return;
				}
			}

			const target = event.target as HTMLElement;

			// If focus moved outside the trap, bring it back
			if (!containerRef.current?.contains(target)) {
				event.preventDefault();
				event.stopPropagation();

				// Try to focus the last focused element within the trap
				if (
					lastFocusedElement.current &&
					containerRef.current?.contains(lastFocusedElement.current)
				) {
					lastFocusedElement.current.focus(focusOptions);
				} else {
					// Fall back to first focusable element
					const focusableElements = getFocusableElements();
					if (0 < focusableElements.length && focusableElements[0]) {
						focusableElements[0].focus(focusOptions);
					} else if (fallbackFocus?.current) {
						fallbackFocus.current.focus(focusOptions);
					}
				}
			} else {
				// Update last focused element within trap
				lastFocusedElement.current = target;
				saveFocusHistory(target);
			}
		},
		[
			isActive,
			paused,
			getFocusableElements,
			fallbackFocus,
			focusOptions,
			saveFocusHistory,
			trapStack,
		],
	);

	const handleMouseDown = useCallback(
		(event: MouseEvent) => {
			if (!isActive || paused || allowOutsideClick || !containerRef.current) {
				return;
			}

			const target = event.target as HTMLElement;

			if (!containerRef.current?.contains(target)) {
				event.preventDefault();
				event.stopPropagation();

				// Focus last element in trap
				if (
					lastFocusedElement.current &&
					containerRef.current?.contains(lastFocusedElement.current)
				) {
					lastFocusedElement.current.focus(focusOptions);
				}
			}
		},
		[isActive, paused, allowOutsideClick, focusOptions],
	);

	// Set up focus trap
	useEffect(() => {
		if (!isClient || !active) {
			setIsActive(false);
			return;
		}

		// Add to stack if enabled
		if (trapStack && instanceRef.current) {
			focusTrapStack.push(instanceRef.current as any);
		}

		// Store the previously focused element
		previousActiveElement.current = document.activeElement as HTMLElement;
		saveFocusHistory(previousActiveElement.current);

		setIsActive(true);

		// Set initial focus
		const setInitialFocus = () => {
			if (!autoFocus) {
				return;
			}

			if ("string" === typeof initialFocus) {
				const element =
					containerRef.current?.querySelector<HTMLElement>(initialFocus);
				if (element) {
					element.focus(focusOptions);
					lastFocusedElement.current = element;
				}
			} else if (initialFocus?.current) {
				initialFocus.current.focus(focusOptions);
				lastFocusedElement.current = initialFocus.current;
			} else {
				const focusableElements = getFocusableElements();
				if (0 < focusableElements.length && focusableElements[0]) {
					focusableElements[0].focus(focusOptions);
					lastFocusedElement.current = focusableElements[0];
				} else if (fallbackFocus?.current) {
					fallbackFocus.current.focus(focusOptions);
					lastFocusedElement.current = fallbackFocus.current;
				}
			}

			// Announce focus trap activation for screen readers
			accessibilityManager.announce(
				"Focus trapped. Press Escape to exit.",
				"polite",
			);
		};

		// Delay initial focus if requested
		if (delayInitialFocus) {
			focusTimeoutRef.current = setTimeout(setInitialFocus, 100);
		} else {
			requestAnimationFrame(setInitialFocus);
		}

		// Add event listeners
		document.addEventListener("keydown", handleKeyDown, true);
		document.addEventListener("focusin", handleFocusIn, true);
		document.addEventListener("mousedown", handleMouseDown, true);

		return () => {
			// Clear timeout if exists
			if (focusTimeoutRef.current) {
				clearTimeout(focusTimeoutRef.current);
			}

			// Remove from stack
			if (trapStack && instanceRef.current) {
				const index = focusTrapStack.indexOf(instanceRef.current as any);
				if (-1 < index) {
					focusTrapStack.splice(index, 1);
				}
			}

			document.removeEventListener("keydown", handleKeyDown, true);
			document.removeEventListener("focusin", handleFocusIn, true);
			document.removeEventListener("mousedown", handleMouseDown, true);

			// Call deactivate callback
			if (onDeactivate) {
				onDeactivate();
			}

			// Return focus to previous element
			if (returnFocus && restoreFocus) {
				if (!restoreFocusFromHistory() && previousActiveElement.current) {
					try {
						previousActiveElement.current.focus(focusOptions);
					} catch {
						// Logging disabled
					}
				}
			}

			// Announce focus trap deactivation
			accessibilityManager.announce("Focus trap deactivated", "polite");
		};
	}, [
		isClient,
		active,
		autoFocus,
		delayInitialFocus,
		initialFocus,
		returnFocus,
		restoreFocus,
		fallbackFocus,
		focusOptions,
		handleKeyDown,
		handleFocusIn,
		handleMouseDown,
		getFocusableElements,
		saveFocusHistory,
		restoreFocusFromHistory,
		onDeactivate,
		trapStack,
	]);

	return (
		<div
			ref={containerRef}
			className={cn("glass-focus-trap", className)}
			data-focus-trap-active={isActive}
			aria-modal={isActive ? "true" : undefined}
			role={isActive ? "dialog" : undefined}
		>
			{children}
		</div>
	);
};
