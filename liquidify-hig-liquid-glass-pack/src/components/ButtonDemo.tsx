import React from "react";
import { css } from "../../../styled-system/css";

export function ButtonDemo() {
	return (
		<div style={{ display: "flex", gap: 12 }}>
			<button className={css({
				fontFamily: "sans",
				fontWeight: 600,
				borderRadius: "md",
				borderWidth: "1px",
				borderColor: "border.default",
				color: "white",
				backgroundColor: "primary",
				px: "0.75rem",
				py: "0.5rem",
				transition: "background-color .15s ease, transform .05s ease, border-color .15s ease",
				_hover: {
					backgroundColor: "color-mix(in oklch, var(--colors-primary) 92%, black 8%)",
				},
				_focusVisible: {
					outline: "none",
					boxShadow: "0 0 0 3px rgba(10,132,255,.35)",
					borderColor: "primary",
				},
				_active: { transform: "translateY(1px)" },
			})}>Primary</button>
			<button className={css({
				fontFamily: "sans",
				fontWeight: 600,
				borderRadius: "md",
				borderWidth: "1px",
				borderColor: "border.default",
				color: "text",
				backgroundColor: "bg.surface",
				px: "0.75rem",
				py: "0.5rem",
				transition: "background-color .15s ease, transform .05s ease, border-color .15s ease",
				_hover: {
					backgroundColor: "color-mix(in oklch, var(--colors-bg-surface) 92%, black 8%)",
				},
				_focusVisible: {
					outline: "none",
					boxShadow: "0 0 0 3px rgba(10,132,255,.35)",
					borderColor: "primary",
				},
				_active: { transform: "translateY(1px)" },
			})}>Neutral</button>
			<button className={css({
				fontFamily: "sans",
				fontWeight: 600,
				borderRadius: "md",
				borderWidth: "1px",
				borderColor: "glass.border",
				color: "text",
				backgroundColor: "glass.bg",
				backdropFilter: "blur(18px)",
				backgroundImage: "colors.glass.highlight",
				px: "0.75rem",
				py: "0.5rem",
				transition: "background-color .15s ease, transform .05s ease, border-color .15s ease",
				_hover: {
					backgroundColor: "color-mix(in oklch, var(--colors-glass-bg) 100%, transparent)",
				},
				_focusVisible: {
					outline: "none",
					boxShadow: "0 0 0 3px rgba(10,132,255,.35)",
					borderColor: "primary",
				},
				_active: { transform: "translateY(1px)" },
			})}>Glass</button>
			<button className={css({
				fontFamily: "sans",
				fontWeight: 600,
				borderRadius: "md",
				borderWidth: "1px",
				borderColor: "transparent",
				color: "primary",
				backgroundColor: "transparent",
				px: "0.75rem",
				py: "0.5rem",
				transition: "background-color .15s ease, transform .05s ease, border-color .15s ease",
				_hover: { textDecoration: "underline" },
				_focusVisible: {
					outline: "none",
					boxShadow: "0 0 0 3px rgba(10,132,255,.35)",
					borderColor: "primary",
				},
				_active: { transform: "translateY(1px)" },
			})}>Link</button>
		</div>
	);
}
