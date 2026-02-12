import { useSpring } from "framer-motion";
import { useCallback, useRef } from "react";
import { useReducedMotion } from "./useReducedMotion";

interface UseMagneticHoverProps {
	strength?: number; // Magnetic strength (0-1)
	disabled?: boolean;
}

export const useMagneticHover = (props: UseMagneticHoverProps = {}) => {
	const { strength = 0.3, disabled = false } = props;
	const ref = useRef<HTMLElement>(null);
	const reducedMotion = useReducedMotion();

	const x = useSpring(0, { stiffness: 150, damping: 15 });
	const y = useSpring(0, { stiffness: 150, damping: 15 });
	const scale = useSpring(1, { stiffness: 300, damping: 20 });

	const handleMouseMove = useCallback(
		(event: React.MouseEvent) => {
			if (disabled || !ref.current || reducedMotion) return;

			const element = ref.current;
			const rect = element.getBoundingClientRect();
			const centerX = rect.left + rect.width / 2;
			const centerY = rect.top + rect.height / 2;

			const deltaX = (event.clientX - centerX) * strength;
			const deltaY = (event.clientY - centerY) * strength;

			x.set(deltaX);
			y.set(deltaY);
			scale.set(1.05);
		},
		[disabled, strength, x, y, scale, reducedMotion],
	);

	const handleMouseLeave = useCallback(() => {
		if (disabled || reducedMotion) return;

		x.set(0);
		y.set(0);
		scale.set(1);
	}, [disabled, x, y, scale, reducedMotion]);

	const handleMouseEnter = useCallback(() => {
		if (disabled || reducedMotion) return;
		scale.set(1.02);
	}, [disabled, scale, reducedMotion]);

	return {
		ref,
		style: { x, y, scale },
		handlers: {
			onMouseMove: handleMouseMove,
			onMouseLeave: handleMouseLeave,
			onMouseEnter: handleMouseEnter,
		},
	};
};
