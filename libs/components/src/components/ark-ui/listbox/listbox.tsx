"use client";

import { Listbox as ArkListbox } from "@ark-ui/react";
import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";
import { cx } from "styled-system/css";
import { listbox } from "styled-system/recipes/listbox";

type ListboxRootProps = ComponentPropsWithoutRef<typeof ArkListbox.Root> & {
	className?: string;
};

// Auto-styled Ark UI Listbox components with liquid glass styling
export const ListboxRoot = forwardRef<
	ElementRef<typeof ArkListbox.Root>,
	ListboxRootProps
>(({ className, ...props }, ref) => (
	<ArkListbox.Root ref={ref} className={cx(listbox(), className)} {...props} />
));

ListboxRoot.displayName = "ListboxRoot";
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
