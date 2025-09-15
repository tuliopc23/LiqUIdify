import React from "react";
import { css } from "../../../styled-system/css";

export function FieldDemo() {
	return (
		<div style={{ display: "grid", gap: 12, maxWidth: 480 }}>
			<label>
				<span
					className={css({
						display: "inline-flex",
						alignItems: "center",
						gap: "8px",
						px: "12px",
						py: "6px",
						borderRadius: "full",
						borderWidth: "1px",
						borderColor: "glass.border",
						backgroundColor: "glass.bg",
						backdropFilter: "blur(14px)",
						backgroundImage: "colors.glass.highlight",
						fontWeight: 600,
						fontSize: "14px",
						color: "text",
					})}
					style={{ marginBottom: 6, display: "inline-flex" }}
				>
					<span
						style={{
							width: 8,
							height: 8,
							borderRadius: 999,
							background: "var(--colors-blue-500)",
						}}
					/>
					Search
				</span>
				<input
					className={css({
						w: "100%",
						p: "10px 12px",
						borderRadius: "md",
						borderWidth: "1px",
						borderColor: "glass.border",
						backgroundColor: "glass.bg",
						color: "text",
						backdropFilter: "blur(14px)",
						backgroundImage: "colors.glass.highlight",
						_placeholder: { color: "muted" },
						_focusVisible: {
							outline: "none",
							boxShadow: "0 0 0 3px rgba(10,132,255,.35)",
							borderColor: "primary",
						},
					})}
					placeholder="Type to search..."
				/>
			</label>
		</div>
	);
}
