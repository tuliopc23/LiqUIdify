"use client";

import { TagsInput as ArkTagsInput } from "@ark-ui/react";

// Auto-styled Ark UI TagsInput components with liquid glass styling
export const TagsInputRoot = ArkTagsInput.Root;
export const TagsInputLabel = ArkTagsInput.Label;
export const TagsInputControl = ArkTagsInput.Control;
export const TagsInputInput = ArkTagsInput.Input;
export const TagsInputClearTrigger = ArkTagsInput.ClearTrigger;
export const TagsInputItem = ArkTagsInput.Item;
export const TagsInputItemPreview = ArkTagsInput.ItemPreview;
export const TagsInputItemText = ArkTagsInput.ItemText;
export const TagsInputItemInput = ArkTagsInput.ItemInput;
export const TagsInputItemDeleteTrigger = ArkTagsInput.ItemDeleteTrigger;
export const TagsInputHiddenInput = ArkTagsInput.HiddenInput;

// Compound component API
export const TagsInput = {
	Root: TagsInputRoot,
	Label: TagsInputLabel,
	Control: TagsInputControl,
	Input: TagsInputInput,
	ClearTrigger: TagsInputClearTrigger,
	Item: TagsInputItem,
	ItemPreview: TagsInputItemPreview,
	ItemText: TagsInputItemText,
	ItemInput: TagsInputItemInput,
	ItemDeleteTrigger: TagsInputItemDeleteTrigger,
	HiddenInput: TagsInputHiddenInput,
};
