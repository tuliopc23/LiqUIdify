"use client";

import {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useRef,
} from "react";
import { cx } from "../../../../../styled-system/css";
// Slot recipe: returns slot class names
// eslint-disable-next-line import/no-relative-packages
import { dialog } from "../../../../../styled-system/recipes/dialog.js";

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
	open?: boolean;
	onClose?: () => void;
	closeOnEsc?: boolean;
	closeOnBackdropClick?: boolean;
	ariaLabel?: string;
	ariaLabelledBy?: string;
}

function mergeRefs<T>(...refs: Array<React.Ref<T>>): (node: T | null) => void {
	return (node: T | null) => {
		for (const ref of refs) {
			if (!ref) continue;
			if (typeof ref === "function") ref(node);
			else {
				(ref as React.MutableRefObject<T | null>).current = node;
			}
		}
	};
}

function getFocusable(container: HTMLElement | null) {
	if (!container) return [] as HTMLElement[];
	const selectors = [
		"a[href]",
		"area[href]",
		"input:not([disabled]):not([type=hidden])",
		"select:not([disabled])",
		"textarea:not([disabled])",
		"button:not([disabled])",
		"iframe",
		"audio[controls]",
		"video[controls]",
		"[contenteditable]",
		"[tabindex]:not([tabindex='-1'])",
	];
	return Array.from(
		container.querySelectorAll<HTMLElement>(selectors.join(",")),
	).filter(
		(el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden"),
	);
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
	(
		{
			open = false,
			className,
			children,
			onClose,
			closeOnEsc = true,
			closeOnBackdropClick = true,
			ariaLabel,
			ariaLabelledBy,
			...props
		},
		ref,
	) => {
		const slots = dialog();
		const contentRef = useRef<HTMLDivElement | null>(null);
		useImperativeHandle(ref, () => contentRef.current as HTMLDivElement, []);

		// Restore focus to previously focused element
		const lastActive = useRef<Element | null>(null);
		// Capture previously focused element at render time when opening
		if (open && lastActive.current == null) {
			lastActive.current = document.activeElement;
		}
		useEffect(() => {
			if (!open) return;
			// Focus first focusable or content
			const focusables = getFocusable(contentRef.current);
			if (focusables[0]) focusables[0].focus();
			else contentRef.current?.focus();
			return () => {
				const toFocus = lastActive.current;
				if (toFocus instanceof HTMLElement) {
					try {
						toFocus.focus();
					} catch {}
					setTimeout(() => {
						try {
							(toFocus as HTMLElement).focus();
						} catch {}
					}, 0);
				}
				lastActive.current = null;
			};
		}, [open]);

		// Key handling: Escape + Tab trap
		const onKeyDown = useCallback(
			(e: KeyboardEvent) => {
				if (!open) return;
				if (e.key === "Escape" && closeOnEsc) {
					e.preventDefault();
					onClose?.();
					return;
				}
				if (e.key === "Tab") {
					const focusables = getFocusable(contentRef.current);
					if (focusables.length === 0) return;
					const first = focusables[0];
					const last = focusables[focusables.length - 1];
					if (!first || !last) return;
					const active = document.activeElement as HTMLElement | null;
					if (e.shiftKey) {
						if (active === first || !contentRef.current?.contains(active)) {
							e.preventDefault();
							last.focus();
						}
					} else if (active === last) {
						e.preventDefault();
						first.focus();
					}
				}
			},
			[open, closeOnEsc, onClose],
		);

		useEffect(() => {
			if (!open) return;
			document.addEventListener("keydown", onKeyDown);
			return () => document.removeEventListener("keydown", onKeyDown);
		}, [open, onKeyDown]);

		const handleBackdropClick = useCallback<
			React.MouseEventHandler<HTMLDivElement>
		>(
			(e) => {
				if (!closeOnBackdropClick) return;
				if (e.target === e.currentTarget) onClose?.();
			},
			[closeOnBackdropClick, onClose],
		);

		if (!open) return null;

		return (
			<>
				<div className={slots.backdrop} />
				<div
					className={slots.positioner}
					role="button"
					aria-label="Close modal"
					onMouseDown={handleBackdropClick}
					tabIndex={-1}
				>
					<div
						className={cx(slots.content, className)}
						ref={mergeRefs(contentRef, ref)}
						role="dialog"
						aria-modal="true"
						aria-label={ariaLabel}
						aria-labelledby={ariaLabelledBy}
						tabIndex={-1}
						{...props}
					>
						{children}
					</div>
				</div>
			</>
		);
	},
);

Modal.displayName = "Modal";
