"use client";

import { Accordion as ArkAccordion } from "@ark-ui/react";
import { createStyleContext } from "../../../../../../styled-system/jsx";
import { accordion } from "../../../../../../styled-system/recipes/accordion";

const { withContext } = createStyleContext(accordion);

// Auto-styled Ark UI Accordion components with liquid glass
export const AccordionRoot = withContext(ArkAccordion.Root, "root");
export const AccordionItem = withContext(ArkAccordion.Item, "item");
export const AccordionItemTrigger = withContext(ArkAccordion.ItemTrigger, "trigger");
export const AccordionItemContent = withContext(ArkAccordion.ItemContent, "content");

// Compound component API
export const Accordion = {
  Root: AccordionRoot,
  Item: AccordionItem,
  ItemTrigger: AccordionItemTrigger,
  ItemContent: AccordionItemContent,
};
