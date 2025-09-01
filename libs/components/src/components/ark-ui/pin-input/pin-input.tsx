"use client";

import { PinInput as ArkPinInput } from "@ark-ui/react";
import { forwardRef } from "react";
import {
  pinInput,
  type PinInputVariantProps,
} from "../../../../../../styled-system/recipes/pin-input";
import type { ComponentProps } from "react";

export interface PinInputProps
  extends ComponentProps<typeof ArkPinInput.Root>,
    PinInputVariantProps {
  label?: string;
  length?: number;
}

export const PinInput = forwardRef<HTMLDivElement, PinInputProps>(
  ({ label, length = 4, size, children, className, ...props }, ref) => {
    const [variantProps, restProps] = pinInput.splitVariantProps({ size });

    return (
      <ArkPinInput.Root ref={ref} className={className} {...restProps} {...props}>
        {label && <ArkPinInput.Label>{label}</ArkPinInput.Label>}
        <ArkPinInput.Control>
          {Array.from({ length }, (_, index) => (
            <ArkPinInput.Input key={index} index={index} className={pinInput(variantProps)} />
          ))}
        </ArkPinInput.Control>
        {children}
      </ArkPinInput.Root>
    );
  }
);

PinInput.displayName = "PinInput";
