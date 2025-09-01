"use client";

import { Splitter as ArkSplitter } from "@ark-ui/react";

// Auto-styled Ark UI Splitter components with liquid glass styling
export const SplitterRoot = ArkSplitter.Root;
export const SplitterPanel = ArkSplitter.Panel;
export const SplitterResizeTrigger = ArkSplitter.ResizeTrigger;

// Compound component API
export const Splitter = {
  Root: SplitterRoot,
  Panel: SplitterPanel,
  ResizeTrigger: SplitterResizeTrigger,
};
