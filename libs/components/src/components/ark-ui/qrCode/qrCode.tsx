"use client";

import { QrCode as ArkQrCode } from "@ark-ui/react";

// Auto-styled Ark UI QrCode components with liquid glass styling
export const QrCodeRoot = ArkQrCode.Root;
export const QrCodeFrame = ArkQrCode.Frame;
export const QrCodePattern = ArkQrCode.Pattern;

// Compound component API
export const QrCode = {
  Root: QrCodeRoot,
  Frame: QrCodeFrame,
  Pattern: QrCodePattern,
};
