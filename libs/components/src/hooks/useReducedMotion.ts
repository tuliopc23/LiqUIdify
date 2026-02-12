import { useEffect, useState } from "react";

/**
 * Shared reduced-motion hook that is safe for SSR.
 *
 * Returns true when the user has requested reduced motion via
 * `prefers-reduced-motion: reduce`.
 */
export const useReducedMotion = (): boolean => {
	const [prefersReduced, setPrefersReduced] = useState(false);

	useEffect(() => {
		if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
			return;
		}

		const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
		setPrefersReduced(mediaQuery.matches);

		const listener = (event: MediaQueryListEvent) => {
			setPrefersReduced(event.matches);
		};

		mediaQuery.addEventListener("change", listener);

		return () => {
			mediaQuery.removeEventListener("change", listener);
		};
	}, []);

	return prefersReduced;
};

