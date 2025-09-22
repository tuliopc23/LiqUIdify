"use client";

import { ScrollArea as ArkScrollArea } from "@ark-ui/react";
import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";
import { cx } from "../../../../../../styled-system/css";
import { scrollArea } from "../../../../../../styled-system/recipes/scroll-area";

type ScrollAreaRootProps = ComponentPropsWithoutRef<
	typeof ArkScrollArea.Root
> & {
	className?: string;
};

// Auto-styled Ark UI ScrollArea components with liquid glass styling
export const ScrollAreaRoot = forwardRef<
	ElementRef<typeof ArkScrollArea.Root>,
	ScrollAreaRootProps
>(({ className, ...props }, ref) => (
	<ArkScrollArea.Root
		ref={ref}
		className={cx(scrollArea(), className)}
		{...props}
	/>
));

ScrollAreaRoot.displayName = "ScrollAreaRoot";
export const ScrollAreaViewport = ArkScrollArea.Viewport;
export const ScrollAreaScrollbar = ArkScrollArea.Scrollbar;
export const ScrollAreaThumb = ArkScrollArea.Thumb;
export const ScrollAreaCorner = ArkScrollArea.Corner;

// Compound component API
export const ScrollArea = {
	Root: ScrollAreaRoot,
	Viewport: ScrollAreaViewport,
	Scrollbar: ScrollAreaScrollbar,
	Thumb: ScrollAreaThumb,
	Corner: ScrollAreaCorner,
};
