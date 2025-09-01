"use client";

import { FloatingPanel as ArkFloatingPanel } from "@ark-ui/react";

// Auto-styled Ark UI FloatingPanel components with liquid glass styling
export const FloatingPanelRoot = ArkFloatingPanel.Root;
export const FloatingPanelTrigger = ArkFloatingPanel.Trigger;
export const FloatingPanelPositioner = ArkFloatingPanel.Positioner;
export const FloatingPanelContent = ArkFloatingPanel.Content;
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
