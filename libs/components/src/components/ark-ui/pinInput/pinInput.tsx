"use client";

import { PinInput as ArkPinInput } from "@ark-ui/react";
import type { ComponentProps } from "react";
import { forwardRef } from "react";
import {
  type PinInputVariantProps,
  pinInput,
} from "../../../../../../styled-system/recipes/pinInput";

export interface PinInputProps
  extends ComponentProps<typeof ArkPinInput.Root>,
    PinInputVariantProps {
  label?: string;
  length?: number;
}

export const PinInput = forwardRef<HTMLDivElement, PinInputProps>(
  ({ label, length = 4, size, children, className, ...props }, ref) => {
    const [variantProps, restProps] = pinInput.splitVariantProps({ size });

    // Generate stable keys that don't rely on array index
    const inputKeys = Array.from(
      { length },
      (_, i) => `input-${i}-of-${length}`,
    );

    return (
      <ArkPinInput.Root
        ref={ref}
        className={className}
        {...restProps}
        {...props}
      >
        {label && <ArkPinInput.Label>{label}</ArkPinInput.Label>}
        <ArkPinInput.Control>
          {inputKeys.map((key, index) => (
            <ArkPinInput.Input
              key={key}
              index={index}
              className={pinInput(variantProps)}
            />
          ))}
        </ArkPinInput.Control>
        {children}
      </ArkPinInput.Root>
    );
  },
);

PinInput.displayName = "PinInput";
