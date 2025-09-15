"use client";

import { Listbox as ArkListbox } from "@ark-ui/react";

// Auto-styled Ark UI Listbox components with liquid glass styling
export const ListboxRoot = ArkListbox.Root;
export const ListboxLabel = ArkListbox.Label;
export const ListboxContent = ArkListbox.Content;
export const ListboxItem = ArkListbox.Item;
export const ListboxItemText = ArkListbox.ItemText;
export const ListboxItemIndicator = ArkListbox.ItemIndicator;
export const ListboxItemGroup = ArkListbox.ItemGroup;
export const ListboxItemGroupLabel = ArkListbox.ItemGroupLabel;

// Compound component API
export const Listbox = {
  Root: ListboxRoot,
  Label: ListboxLabel,
  Content: ListboxContent,
  Item: ListboxItem,
  ItemText: ListboxItemText,
  ItemIndicator: ListboxItemIndicator,
  ItemGroup: ListboxItemGroup,
  ItemGroupLabel: ListboxItemGroupLabel,
};
