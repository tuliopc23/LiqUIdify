"use client";

import { Clipboard as ArkClipboard } from "@ark-ui/react";
import type { ComponentProps } from "react";
import { forwardRef } from "react";
import { clipboard } from "../../../../../../styled-system/recipes/clipboard";

export interface ClipboardProps
	extends ComponentProps<typeof ArkClipboard.Root> {
	value?: string;
}

export const Clipboard = forwardRef<HTMLDivElement, ClipboardProps>(
	({ value, children, className, ...props }, ref) => {
		return (
			<ArkClipboard.Root
				ref={ref}
				className={[clipboard(), className].filter(Boolean).join(" ")}
				value={value}
				{...props}
			>
				<ArkClipboard.Label>Copy to clipboard</ArkClipboard.Label>
				<ArkClipboard.Control>
					<ArkClipboard.Input />
					<ArkClipboard.Trigger>
						<ArkClipboard.Indicator copied="✓" />
						<ArkClipboard.Indicator>📋</ArkClipboard.Indicator>
					</ArkClipboard.Trigger>
				</ArkClipboard.Control>
				{children}
			</ArkClipboard.Root>
		);
	},
);

Clipboard.displayName = "Clipboard";
