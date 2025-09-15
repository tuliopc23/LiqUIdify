"use client";

import { useEffect, useId, useRef } from "react";

export interface LiquidBackdropProps {
	opacity?: number;
}

export function LiquidBackdrop({ opacity = 0.06 }: LiquidBackdropProps) {
	const ref = useRef<SVGFETurbulenceElement | null>(null);
	const uid = useId();

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		let t = 0;
		let raf = 0;
		const loop = () => {
			t += 0.003;
			const base = 0.005 + Math.abs(Math.sin(t)) * 0.004;
			el.setAttribute("baseFrequency", `${base} ${base * 1.3}`);
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(raf);
	}, []);

	return (
		<svg
			aria-hidden="true"
			width="0"
			height="0"
			style={{ position: "absolute" }}
		>
			<filter id={`liquid-warp-${uid}`}>
				<feTurbulence
					ref={ref}
					type="fractalNoise"
					numOctaves="1"
					seed="2"
					baseFrequency="0.006 0.008"
				/>
				<feDisplacementMap in="SourceGraphic" scale="8" />
			</filter>
			<defs>
				<linearGradient id={`lg-${uid}`} x1="0" y1="0" x2="1" y2="1">
					<stop offset="0%" stopColor="rgba(255,255,255,1)" />
					<stop offset="100%" stopColor="rgba(255,255,255,0)" />
				</linearGradient>
			</defs>
			<rect width="0" height="0" fill="none" />
			<style>{`.liquid-warp { filter: url(#liquid-warp-${uid}); opacity: ${opacity}; }`}</style>
		</svg>
	);
}
