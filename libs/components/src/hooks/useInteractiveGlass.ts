import { useSpring } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

interface UseInteractiveGlassProps {
	/**
	 * Enable hover effects
	 * @default true
	 */
	enableHover?: boolean;
	/**
	 * Enable press effects
	 * @default true
	 */
	enablePress?: boolean;
	/**
	 * Interaction intensity
	 * @default "subtle"
	 */
	intensity?: "subtle" | "medium" | "strong";
	/**
	 * Custom spring stiffness
	 * @default 320
	 */
	stiffness?: number;
	/**
	 * Custom spring damping
	 * @default 23
	 */
	damping?: number;
}

// Simple reduced motion hook
const useReducedMotion = () => {
	const [prefersReduced, setPrefersReduced] = useState(false);
	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
		setPrefersReduced(mediaQuery.matches);
		const listener = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
		mediaQuery.addEventListener("change", listener);
		return () => mediaQuery.removeEventListener("change", listener);
	}, []);
	return prefersReduced;
};

/**
 * Unified glass interaction hook for consistent touch interactions across all components
 * Provides subtle spring physics for hover and press states
 */
export const useInteractiveGlass = (props: UseInteractiveGlassProps = {}) => {
	const {
		enableHover = true,
		enablePress = true,
		intensity = "subtle",
		stiffness = 320,
		damping = 23,
	} = props;

	const reducedMotion = useReducedMotion();

	// Intensity-based scales
	const scales = {
		subtle: { hover: 1.015, press: 0.985 },
		medium: { hover: 1.025, press: 0.975 },
		strong: { hover: 1.035, press: 0.965 },
	};

	const config = scales[intensity];

	// Core spring for scale animations
	const scale = useSpring(1, {
		stiffness: reducedMotion ? 0 : stiffness,
		damping: reducedMotion ? 0 : damping,
		restDelta: 0.001,
	});

	// Y-axis spring for subtle elevation
	const y = useSpring(0, {
		stiffness: reducedMotion ? 0 : stiffness * 0.8,
		damping: reducedMotion ? 0 : damping * 1.2,
	});

	// Hover handlers
	const handleHoverStart = useCallback(() => {
		if (!reducedMotion && enableHover) {
			scale.set(config.hover);
			y.set(-0.5);
		}
	}, [reducedMotion, enableHover, scale, y, config.hover]);

	const handleHoverEnd = useCallback(() => {
		if (!reducedMotion && enableHover) {
			scale.set(1);
			y.set(0);
		}
	}, [reducedMotion, enableHover, scale, y]);

	// Press handlers
	const handlePressStart = useCallback(() => {
		if (!reducedMotion && enablePress) {
			scale.set(config.press);
			y.set(0.3);
		}
	}, [reducedMotion, enablePress, scale, y, config.press]);

	const handlePressEnd = useCallback(() => {
		if (!reducedMotion && enablePress) {
			scale.set(enableHover ? config.hover : 1);
			y.set(enableHover ? -0.5 : 0);
		}
	}, [reducedMotion, enablePress, enableHover, scale, y, config.hover]);

	return {
		// Motion values for style binding
		scale,
		y,

		// Interaction handlers
		interactions: {
			onMouseEnter: handleHoverStart,
			onMouseLeave: handleHoverEnd,
			onMouseDown: handlePressStart,
			onMouseUp: handlePressEnd,
			onTouchStart: handlePressStart,
			onTouchEnd: handlePressEnd,
		},

		// State
		reducedMotion,
	};
};
