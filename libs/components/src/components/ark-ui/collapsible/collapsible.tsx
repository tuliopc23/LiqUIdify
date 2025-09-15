"use client";

import { Collapsible as ArkCollapsible } from "@ark-ui/react";
import type { ComponentProps } from "react";
import { forwardRef } from "react";
import { collapsible } from "../../../../../../styled-system/recipes/collapsible";

export interface CollapsibleProps
	extends ComponentProps<typeof ArkCollapsible.Root> {
	triggerText?: string;
}

export const Collapsible = forwardRef<HTMLDivElement, CollapsibleProps>(
	({ triggerText, children, className, ...props }, ref) => {
		return (
			<ArkCollapsible.Root
				ref={ref}
				className={[collapsible(), className].filter(Boolean).join(" ")}
				{...props}
			>
				<ArkCollapsible.Trigger>
					{triggerText || "Toggle"}
					<ArkCollapsible.Indicator>▼</ArkCollapsible.Indicator>
				</ArkCollapsible.Trigger>
				<ArkCollapsible.Content>{children}</ArkCollapsible.Content>
			</ArkCollapsible.Root>
		);
	},
);

Collapsible.displayName = "Collapsible";
