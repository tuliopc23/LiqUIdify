import { TabsRoot, TabList, TabTrigger, TabContent } from "@ark-ui/react/tabs";
import React from "react";
import { css } from "../../../styled-system/css";

export function SegmentedTabs() {
	return (
		<TabsRoot defaultValue="one">
			<TabList className={css({
				display: "inline-flex",
				gap: "4px",
				borderRadius: "md",
				p: "4px",
				backgroundColor: "bg.subtle",
				borderWidth: "1px",
				borderColor: "border.default",
			})}>
				<TabTrigger
					value="one"
					className={css({
						px: "10px",
						py: "6px",
						borderRadius: "sm",
						fontWeight: 600,
						color: "muted",
						transition: "color .15s ease, background-color .15s ease",
						_hover: { color: "text" },
						_selected: {
							color: "text",
							backgroundColor: "glass.bg",
							borderWidth: "1px",
							borderColor: "glass.border",
							backdropFilter: "blur(12px)",
						},
						_disabled: { opacity: 0.5, cursor: "not-allowed" },
					})}
				>
					Overview
				</TabTrigger>
				<TabTrigger
					value="two"
					className={css({
						px: "10px",
						py: "6px",
						borderRadius: "sm",
						fontWeight: 600,
						color: "muted",
						transition: "color .15s ease, background-color .15s ease",
						_hover: { color: "text" },
						_selected: {
							color: "text",
							backgroundColor: "glass.bg",
							borderWidth: "1px",
							borderColor: "glass.border",
							backdropFilter: "blur(12px)",
						},
						_disabled: { opacity: 0.5, cursor: "not-allowed" },
					})}
				>
					Components
				</TabTrigger>
				<TabTrigger
					value="three"
					className={css({
						px: "10px",
						py: "6px",
						borderRadius: "sm",
						fontWeight: 600,
						color: "muted",
						transition: "color .15s ease, background-color .15s ease",
						_hover: { color: "text" },
						_selected: {
							color: "text",
							backgroundColor: "glass.bg",
							borderWidth: "1px",
							borderColor: "glass.border",
							backdropFilter: "blur(12px)",
						},
						_disabled: { opacity: 0.5, cursor: "not-allowed" },
					})}
				>
					Tokens
				</TabTrigger>
			</TabList>
			<TabContent value="one" className={css({ mt: "12px" })}>
				Overview content
			</TabContent>
			<TabContent value="two" className={css({ mt: "12px" })}>
				Components content
			</TabContent>
			<TabContent value="three" className={css({ mt: "12px" })}>
				Tokens content
			</TabContent>
		</TabsRoot>
	);
}
