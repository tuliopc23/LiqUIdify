"use client";

import { ScrollArea as ArkScrollArea } from "@ark-ui/react";

// Auto-styled Ark UI ScrollArea components with liquid glass styling
export const ScrollAreaRoot = ArkScrollArea.Root;
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
