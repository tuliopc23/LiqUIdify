"use client";

import { FloatingPanel as ArkFloatingPanel } from "@ark-ui/react";
import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";
import { cx } from "../../../../../../styled-system/css";
import { floatingPanel } from "../../../../../../styled-system/recipes/floating-panel";

type FloatingPanelContentProps = ComponentPropsWithoutRef<
	typeof ArkFloatingPanel.Content
>;

// Auto-styled Ark UI FloatingPanel components with liquid glass styling
export const FloatingPanelRoot = ArkFloatingPanel.Root;
export const FloatingPanelTrigger = ArkFloatingPanel.Trigger;
export const FloatingPanelPositioner = ArkFloatingPanel.Positioner;
export const FloatingPanelContent = forwardRef<
	ElementRef<typeof ArkFloatingPanel.Content>,
	FloatingPanelContentProps
>(({ className, ...props }, ref) => (
	<ArkFloatingPanel.Content
		ref={ref}
		className={cx(floatingPanel(), className)}
		{...props}
	/>
));

FloatingPanelContent.displayName = "FloatingPanelContent";
export const FloatingPanelHeader = ArkFloatingPanel.Header;
export const FloatingPanelTitle = ArkFloatingPanel.Title;
export const FloatingPanelCloseTrigger = ArkFloatingPanel.CloseTrigger;
export const FloatingPanelResizeTrigger = ArkFloatingPanel.ResizeTrigger;
export const FloatingPanelDragTrigger = ArkFloatingPanel.DragTrigger;

// Compound component API
export const FloatingPanel = {
	Root: FloatingPanelRoot,
	Trigger: FloatingPanelTrigger,
	Positioner: FloatingPanelPositioner,
	Content: FloatingPanelContent,
	Header: FloatingPanelHeader,
	Title: FloatingPanelTitle,
	CloseTrigger: FloatingPanelCloseTrigger,
	ResizeTrigger: FloatingPanelResizeTrigger,
	DragTrigger: FloatingPanelDragTrigger,
};
