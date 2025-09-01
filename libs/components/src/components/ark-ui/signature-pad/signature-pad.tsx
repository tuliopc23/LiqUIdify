"use client";

import { SignaturePad as ArkSignaturePad } from "@ark-ui/react";

// Auto-styled Ark UI SignaturePad components with liquid glass styling
export const SignaturePadRoot = ArkSignaturePad.Root;
export const SignaturePadLabel = ArkSignaturePad.Label;
export const SignaturePadControl = ArkSignaturePad.Control;
export const SignaturePadSegment = ArkSignaturePad.Segment;
export const SignaturePadClearTrigger = ArkSignaturePad.ClearTrigger;
export const SignaturePadGuide = ArkSignaturePad.Guide;

// Compound component API
export const SignaturePad = {
  Root: SignaturePadRoot,
  Label: SignaturePadLabel,
  Control: SignaturePadControl,
  Segment: SignaturePadSegment,
  ClearTrigger: SignaturePadClearTrigger,
  Guide: SignaturePadGuide,
};
