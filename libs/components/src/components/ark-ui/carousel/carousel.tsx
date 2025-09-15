"use client";

import { Carousel as ArkCarousel } from "@ark-ui/react";
import { createStyleContext } from "../../../../../../styled-system/jsx";
import { carousel } from "../../../../../../styled-system/recipes/carousel";

const { withRootProvider, withContext } = createStyleContext(carousel);

// Auto-styled Ark UI Carousel components with liquid glass
export const CarouselRoot = withRootProvider(ArkCarousel.Root);
export const CarouselControl = withContext(ArkCarousel.Control, "viewport");
export const CarouselItemGroup = withContext(ArkCarousel.ItemGroup, "itemGroup");
export const CarouselItem = withContext(ArkCarousel.Item, "item");
export const CarouselNextTrigger = withContext(ArkCarousel.NextTrigger, "nextTrigger");
export const CarouselPrevTrigger = withContext(ArkCarousel.PrevTrigger, "prevTrigger");
export const CarouselIndicatorGroup = withContext(ArkCarousel.IndicatorGroup, "indicatorGroup");
export const CarouselIndicator = withContext(ArkCarousel.Indicator, "indicator");

// Compound component API
export const Carousel = {
  Root: CarouselRoot,
  Control: CarouselControl,
  ItemGroup: CarouselItemGroup,
  Item: CarouselItem,
  NextTrigger: CarouselNextTrigger,
  PrevTrigger: CarouselPrevTrigger,
  IndicatorGroup: CarouselIndicatorGroup,
  Indicator: CarouselIndicator,
};
