import { useMotionValue, useSpring, useTransform } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

interface UseGlassMicroProps {
	duration?: number; // Default 150ms
	stiffness?: number; // For spring, default 300
	damping?: number; // Default 20
	rippleColor?: string; // Default 'rgba(255,255,255,0.3)'
	onTap?: () => void;
}

export const useGlassMicro = (props: UseGlassMicroProps = {}) => {
	const {
		stiffness = 350, // Enhanced for more Apple-like responsiveness
		damping = 22, // Optimized for smooth settle
		rippleColor = "rgba(255,255,255,0.3)",
		onTap,
	} = props;

	const reducedMotion = useReducedMotion();

	// Enhanced spring physics with Apple-like parameters
	const scale = useSpring(1, {
		stiffness: reducedMotion ? 0 : stiffness,
		damping: reducedMotion ? 0 : damping,
		mass: reducedMotion ? 0 : 0.9, // Add mass for more realistic physics feel
		restDelta: 0.001, // Fine-tuned settling threshold
	});

	// Add Y-axis spring for enhanced hover lift effects
	const y = useSpring(0, {
		stiffness: reducedMotion ? 0 : stiffness * 0.8,
		damping: reducedMotion ? 0 : damping * 1.1,
		mass: reducedMotion ? 0 : 0.8,
	});

	const rippleX = useMotionValue(0);
	const rippleY = useMotionValue(0);
	const rippleOpacity = useMotionValue(1);

	const rippleSize = useTransform(rippleOpacity, [0, 1], ["0%", "200%"]);
	const rippleScale = useTransform(rippleOpacity, [0, 1], [0, 1]);

	const handleTap = useCallback(
		(event: React.MouseEvent | React.TouchEvent) => {
			if (reducedMotion || !onTap) return;

			const rect = event.currentTarget.getBoundingClientRect();
			const x =
				"touches" in event ? (event.touches[0]?.clientX ?? 0) : event.clientX;
			const y =
				"touches" in event ? (event.touches[0]?.clientY ?? 0) : event.clientY;

			rippleX.set(x - rect.left);
			rippleY.set(y - rect.top);
			rippleOpacity.set(1);

			// Animate ripple fade
			rippleOpacity.set(0);

			onTap();
		},
		[reducedMotion, onTap, rippleX, rippleY, rippleOpacity],
	);

	// Enhanced hover/press physics with Y-axis lift
	const handleHoverStart = useCallback(() => {
		if (!reducedMotion) {
			scale.set(1.025); // Slightly enhanced hover scale
			y.set(-1.5); // Subtle lift effect
		}
	}, [scale, y, reducedMotion]);

	const handleHoverEnd = useCallback(() => {
		if (!reducedMotion) {
			scale.set(1);
			y.set(0);
		}
	}, [scale, y, reducedMotion]);

	const handlePressStart = useCallback(() => {
		if (!reducedMotion) {
			scale.set(0.955); // Enhanced press feedback
			y.set(0.5); // Subtle press-down effect
		}
	}, [scale, y, reducedMotion]);

	const handlePressEnd = useCallback(() => {
		if (!reducedMotion) {
			scale.set(1.025); // Return to hover state if still hovering
			y.set(-1.5);
		}
	}, [scale, y, reducedMotion]);

	// Ripple animation properties factory
	const createRippleProps = () => ({
		style: {
			position: "absolute" as const,
			top: 0,
			left: 0,
			width: "100%",
			height: "100%",
			background: `radial-gradient(circle, ${rippleColor} 0%, transparent 70%)`,
			scale: rippleScale,
			opacity: rippleOpacity,
			borderRadius: "inherit",
			pointerEvents: "none" as const,
		},
		initial: { scale: 0, opacity: 0 },
		transition: { duration: 0.3, ease: "easeOut" as const },
	});

	return {
		scale, // Use in motion.div style={{ scale }}
		y, // Use in motion.div style={{ y }}
		ripple: {
			createRippleProps,
			handleTap,
			// Motion values for direct use
			x: rippleX,
			y: rippleY,
			opacity: rippleOpacity,
			size: rippleSize,
			scale: rippleScale,
		},
		interactions: {
			onHoverStart: handleHoverStart,
			onHoverEnd: handleHoverEnd,
			onPressStart: handlePressStart,
			onPressEnd: handlePressEnd,
		},
		reducedMotion,
	};
};

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
