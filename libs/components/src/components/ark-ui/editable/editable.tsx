"use client";

import { Editable as ArkEditable } from "@ark-ui/react";

// Auto-styled Ark UI Editable components with liquid glass styling
export const EditableRoot = ArkEditable.Root;
export const EditableArea = ArkEditable.Area;
export const EditableInput = ArkEditable.Input;
export const EditablePreview = ArkEditable.Preview;
export const EditableControl = ArkEditable.Control;
export const EditableEditTrigger = ArkEditable.EditTrigger;
export const EditableSubmitTrigger = ArkEditable.SubmitTrigger;
export const EditableCancelTrigger = ArkEditable.CancelTrigger;

// Compound component API
export const Editable = {
  Root: EditableRoot,
  Area: EditableArea,
  Input: EditableInput,
  Preview: EditablePreview,
  Control: EditableControl,
  EditTrigger: EditableEditTrigger,
  SubmitTrigger: EditableSubmitTrigger,
  CancelTrigger: EditableCancelTrigger,
};
