"use client";

import { Tour as ArkTour } from "@ark-ui/react";

// Auto-styled Ark UI Tour components with liquid glass styling
export const TourRoot = ArkTour.Root;
export const TourPositioner = ArkTour.Positioner;
export const TourContent = ArkTour.Content;
export const TourArrow = ArkTour.Arrow;
export const TourArrowTip = ArkTour.ArrowTip;
export const TourCloseTrigger = ArkTour.CloseTrigger;
export const TourTitle = ArkTour.Title;
export const TourDescription = ArkTour.Description;
export const TourActionTrigger = ArkTour.ActionTrigger;
export const TourSpotlight = ArkTour.Spotlight;

// Compound component API
export const Tour = {
  Root: TourRoot,
  Positioner: TourPositioner,
  Content: TourContent,
  Arrow: TourArrow,
  ArrowTip: TourArrowTip,
  CloseTrigger: TourCloseTrigger,
  Title: TourTitle,
  Description: TourDescription,
  ActionTrigger: TourActionTrigger,
  Spotlight: TourSpotlight,
};
