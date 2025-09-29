"use client";

import { motion } from "framer-motion";
import { forwardRef } from "react";
import { cx } from "../../../../../styled-system/css";
import { card } from "../../../../../styled-system/recipes/card";
import { useCardSpring } from "../../hooks/useCardSpring";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
	variant?: "solid" | "glass" | "elevated";
	padded?: boolean;
	/**
	 * Enable spring physics for touch interactions
	 * @default true for glass variant
	 */
	springPhysics?: boolean;
	/**
	 * Spring interaction intensity
	 * @default "subtle"
	 */
	springIntensity?: "subtle" | "medium" | "strong";
	/**
	 * Enable tilt effect on hover
	 * @default true for glass variant
	 */
	enableTilt?: boolean;
	/**
	 * Enable depth shadow animation
	 * @default true for glass variant
	 */
	enableDepth?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
	(
		{
			variant = "solid",
			padded = true,
			springPhysics,
			springIntensity = "subtle",
			enableTilt,
			enableDepth,
			className,
			style,
			...props
		},
		ref,
	) => {
		// Enable spring physics by default for glass variant
		const shouldUseSpring = springPhysics ?? variant === "glass";
		const shouldTilt = enableTilt ?? variant === "glass";
		const shouldDepth = enableDepth ?? variant === "glass";

		const spring = useCardSpring({
			intensity: springIntensity,
			enableTilt: shouldTilt,
			enableDepth: shouldDepth,
		});

		if (shouldUseSpring && !spring.reducedMotion) {
			const {
				onDrag: _onDrag,
				onDragEnd: _onDragEnd,
				onDragStart: _onDragStart,
				onAnimationStart: _onAnimationStart,
				onAnimationEnd: _onAnimationEnd,
				onAnimationIteration: _onAnimationIteration,
				onMouseEnter: _onMouseEnter,
				onMouseLeave: _onMouseLeave,
				onMouseDown: _onMouseDown,
				onMouseUp: _onMouseUp,
				onMouseMove: _onMouseMove,
				...restProps
			} = props;

			return (
				<motion.div
					ref={ref}
					className={cx(card({ variant, padded }), className)}
					style={{
						...style,
						scale: spring.scale,
						y: spring.y,
						rotateX: spring.rotateX,
						rotateY: spring.rotateY,
						perspective: 1000,
						transformStyle: "preserve-3d" as any,
					}}
					onMouseEnter={spring.interactions.onHoverStart}
					onMouseLeave={spring.interactions.onHoverEnd}
					onMouseDown={spring.interactions.onPressStart}
					onMouseUp={spring.interactions.onPressEnd}
					onMouseMove={spring.interactions.onMouseMove}
					{...restProps}
				/>
			);
		}

		return (
			<div
				ref={ref}
				className={cx(card({ variant, padded }), className)}
				style={style}
				{...props}
			/>
		);
	},
);

Card.displayName = "Card";
