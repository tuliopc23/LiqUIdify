"use client";

import { HoverCard as ArkHoverCard } from "@ark-ui/react";

// Auto-styled Ark UI HoverCard components with liquid glass styling
export const HoverCardRoot = ArkHoverCard.Root;
export const HoverCardTrigger = ArkHoverCard.Trigger;
export const HoverCardPositioner = ArkHoverCard.Positioner;
export const HoverCardContent = ArkHoverCard.Content;
export const HoverCardArrow = ArkHoverCard.Arrow;
export const HoverCardArrowTip = ArkHoverCard.ArrowTip;

// Compound component API
export const HoverCard = {
  Root: HoverCardRoot,
  Trigger: HoverCardTrigger,
  Positioner: HoverCardPositioner,
  Content: HoverCardContent,
  Arrow: HoverCardArrow,
  ArrowTip: HoverCardArrowTip,
};
