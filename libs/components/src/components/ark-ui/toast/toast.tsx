"use client";

import { Toast as ArkToast } from "@ark-ui/react";
import { createStyleContext } from "../../../../../../styled-system/jsx";
import { toast } from "../../../../../../styled-system/recipes/toast";

const { withContext } = createStyleContext(toast);

// Auto-styled Ark UI Toast components with liquid glass
export const ToastRoot = withContext(ArkToast.Root, "root");
export const ToastTitle = withContext(ArkToast.Title, "title");
export const ToastDescription = withContext(
	ArkToast.Description,
	"description",
);
export const ToastCloseTrigger = withContext(
	ArkToast.CloseTrigger,
	"closeTrigger",
);
export const ToastActionTrigger = withContext(
	ArkToast.ActionTrigger,
	"actionTrigger",
);

// Compound component API
export const Toast = {
	Root: ToastRoot,
	Title: ToastTitle,
	Description: ToastDescription,
	CloseTrigger: ToastCloseTrigger,
	ActionTrigger: ToastActionTrigger,
};
