"use client";

import { Splitter as ArkSplitter } from "@ark-ui/react";
import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";
import { cx } from "../../../../../../styled-system/css";
import { splitter } from "../../../../../../styled-system/recipes/splitter";

type SplitterRootProps = ComponentPropsWithoutRef<typeof ArkSplitter.Root> & {
	className?: string;
};

// Auto-styled Ark UI Splitter components with liquid glass styling
export const SplitterRoot = forwardRef<
	ElementRef<typeof ArkSplitter.Root>,
	SplitterRootProps
>(({ className, ...props }, ref) => (
	<ArkSplitter.Root
		ref={ref}
		className={cx(splitter(), className)}
		{...props}
	/>
));

SplitterRoot.displayName = "SplitterRoot";
export const SplitterPanel = ArkSplitter.Panel;
export const SplitterResizeTrigger = ArkSplitter.ResizeTrigger;

// Compound component API
export const Splitter = {
	Root: SplitterRoot,
	Panel: SplitterPanel,
	ResizeTrigger: SplitterResizeTrigger,
};
