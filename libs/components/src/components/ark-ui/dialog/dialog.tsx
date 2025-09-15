"use client";

import { Dialog as ArkDialog } from "@ark-ui/react";
import { createStyleContext } from "../../../../../../styled-system/jsx";
import { dialog } from "../../../../../../styled-system/recipes/dialog";

const { withRootProvider, withContext } = createStyleContext(dialog);

// Auto-styled Ark UI Dialog components with liquid glass
export const DialogRoot = withRootProvider(ArkDialog.Root);
export const DialogBackdrop = withContext(ArkDialog.Backdrop, "backdrop");
export const DialogPositioner = withContext(ArkDialog.Positioner, "positioner");
export const DialogContent = withContext(ArkDialog.Content, "content");
export const DialogTitle = withContext(ArkDialog.Title, "title");
export const DialogDescription = withContext(ArkDialog.Description, "description");
export const DialogTrigger = withContext(ArkDialog.Trigger, "trigger");
export const DialogCloseTrigger = withContext(ArkDialog.CloseTrigger, "closeTrigger");

// Compound component API
export const Dialog = {
  Root: DialogRoot,
  Backdrop: DialogBackdrop,
  Positioner: DialogPositioner,
  Content: DialogContent,
  Title: DialogTitle,
  Description: DialogDescription,
  Trigger: DialogTrigger,
  CloseTrigger: DialogCloseTrigger,
};
