import React, { useEffect, useState } from "react";
import { css, cx } from "../../../styled-system/css";

export function Navbar() {
	const [scrolled, setScrolled] = useState(false);
	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 50);
		onScroll();
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<nav
			className={cx(
				css({ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50 }),
				scrolled ? "navbar is-scrolled" : "navbar",
			)}
		>
			<div
				className={css({
					maxW: "1100px",
					mx: "auto",
					px: "24px",
					py: "10px",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				})}
			>
				<a
					href="/"
					className={css({
						fontFamily: "sans",
						fontWeight: 700,
						letterSpacing: "-0.01em",
					})}
				>
					Liquidify
				</a>
				<div
					className={css({
						display: "flex",
						gap: "12px",
						alignItems: "center",
					})}
				>
					<a
						href="/docs"
						className={css({ color: "muted", _hover: { color: "text" } })}
					>
						Docs
					</a>
					<a
						href="/blog"
						className={css({ color: "muted", _hover: { color: "text" } })}
					>
						Blog
					</a>
					<button
						className={css({
							fontFamily: "sans",
							fontWeight: 600,
							borderRadius: "sm",
							borderWidth: "1px",
							borderColor: "border.default",
							color: "text",
							backgroundColor: "bg.surface",
							px: "0.625rem",
							py: "0.375rem",
							fontSize: "14px",
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
						})}
						data-theme-toggle
					>
						Theme
					</button>
				</div>
			</div>
		</nav>
	);
}
