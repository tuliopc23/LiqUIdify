import React from "react";
import { css } from "../../../styled-system/css";
import { ButtonDemo } from "../components/ButtonDemo";
import { FieldDemo } from "../components/FieldDemo";
import { Navbar } from "../components/Navbar";
import { SegmentedTabs } from "../components/SegmentedTabs";

export default function DemoPage() {
	return (
		<div>
			<Navbar />
			<main
				className={css({
					mt: "70px",
					maxW: "1100px",
					mx: "auto",
					px: "24px",
					pb: "64px",
				})}
			>
				<header className={css({ textAlign: "center", mb: "24px" })}>
					<div className="badge">
						<span className="badge__dot" /> Liquid Glass ready
					</div>
					<h1
						className={css({
							fontFamily: "sans",
							fontWeight: "700",
							letterSpacing: "-0.01em",
							lineHeight: "1.1",
							fontSize: { base: "clamp(36px, 2.5vw + 20px, 56px)" },
							color: "text",
							mt: "8px"
						})}
					>
						Apple‑like components for the web
					</h1>
					<p className={css({ color: "muted" })}>Built with Ark UI + Panda.</p>
				</header>

				<section
					className={css({
						display: "grid",
						gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
						gap: "20px",
					})}
				>
					<a className={css({
						borderRadius: "lg",
						borderWidth: "1px",
						borderColor: "border.default",
						backgroundColor: "bg.surface",
						transition: "transform .15s ease, border-color .15s ease, box-shadow .15s ease",
						_hover: { transform: "translateY(-2px)", borderColor: "glass.border" },
						p: "14px",
						display: "block",
						textDecoration: "none",
						color: "inherit"
					})} href="#">
						<span
							className={css({
								w: "48px",
								h: "48px",
								display: "grid",
								placeItems: "center",
								borderRadius: "md",
								borderWidth: "1px",
								borderColor: "glass.border",
								backgroundImage: "linear-gradient(180deg, rgba(255,255,255,.12), transparent)",
								backgroundColor: "color-mix(in oklch, var(--colors-blue-500) 20%, transparent)"
							})}
							aria-hidden="true"
						></span>
						<div className={css({ mt: "10px", fontWeight: 600 })}>Cards</div>
						<p className={css({ color: "muted" })}>
							Hairline borders, soft glass, hover lift.
						</p>
					</a>
					<a className={css({
						borderRadius: "lg",
						borderWidth: "1px",
						borderColor: "border.default",
						backgroundColor: "bg.surface",
						transition: "transform .15s ease, border-color .15s ease, box-shadow .15s ease",
						_hover: { transform: "translateY(-2px)", borderColor: "glass.border" },
						p: "14px",
						display: "block",
						textDecoration: "none",
						color: "inherit"
					})} href="#">
						<span className={css({
							w: "48px",
							h: "48px",
							display: "grid",
							placeItems: "center",
							borderRadius: "md",
							borderWidth: "1px",
							borderColor: "glass.border",
							backgroundImage: "linear-gradient(180deg, rgba(255,255,255,.12), transparent)",
							backgroundColor: "color-mix(in oklch, var(--colors-indigo-500) 20%, transparent)"
						})}></span>
						<div className={css({ mt: "10px", fontWeight: 600 })}>
							Typography
						</div>
						<p className={css({ color: "muted" })}>
							Display/title/body scale, system stack.
						</p>
					</a>
					<a className={css({
						borderRadius: "lg",
						borderWidth: "1px",
						borderColor: "border.default",
						backgroundColor: "bg.surface",
						transition: "transform .15s ease, border-color .15s ease, box-shadow .15s ease",
						_hover: { transform: "translateY(-2px)", borderColor: "glass.border" },
						p: "14px",
						display: "block",
						textDecoration: "none",
						color: "inherit"
					})} href="#">
						<span className={css({
							w: "48px",
							h: "48px",
							display: "grid",
							placeItems: "center",
							borderRadius: "md",
							borderWidth: "1px",
							borderColor: "glass.border",
							backgroundImage: "linear-gradient(180deg, rgba(255,255,255,.12), transparent)",
							backgroundColor: "color-mix(in oklch, var(--colors-teal-500) 20%, transparent)"
						})}></span>
						<div className={css({ mt: "10px", fontWeight: 600 })}>Glass</div>
						<p className={css({ color: "muted" })}>
							Translucent surfaces with crisp hairlines.
						</p>
					</a>
				</section>

				<section className={css({ mt: "32px" })}>
					<SegmentedTabs />
				</section>

				<section
					className={css({
						mt: "24px",
						display: "flex",
						gap: "16px",
						alignItems: "center",
					})}
				>
					<ButtonDemo />
					<FieldDemo />
				</section>
			</main>
		</div>
	);
}
