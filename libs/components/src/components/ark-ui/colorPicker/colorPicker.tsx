"use client";

import { ColorPicker as ArkColorPicker } from "@ark-ui/react";
import { forwardRef } from "react";
import {
  colorPicker,
  type ColorPickerVariantProps,
} from "../../../../../../styled-system/recipes/colorPicker";
import type { ComponentProps } from "react";

export interface ColorPickerProps
  extends ComponentProps<typeof ArkColorPicker.Root>,
    ColorPickerVariantProps {
  label?: string;
}

export const ColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>(
  ({ label, size, children, className, ...props }, ref) => {
    const [variantProps, restProps] = colorPicker.splitVariantProps({ size });

    return (
      <ArkColorPicker.Root
        ref={ref}
        className={[colorPicker(variantProps), className].filter(Boolean).join(" ")}
        {...restProps}
        {...props}
      >
        {label && <ArkColorPicker.Label>{label}</ArkColorPicker.Label>}
        <ArkColorPicker.Control>
          <ArkColorPicker.ChannelInput channel="hex" />
          <ArkColorPicker.Trigger>
            <ArkColorPicker.Swatch value="#ff0000" />
          </ArkColorPicker.Trigger>
        </ArkColorPicker.Control>
        <ArkColorPicker.Positioner>
          <ArkColorPicker.Content>
            <ArkColorPicker.Area>
              <ArkColorPicker.AreaThumb />
            </ArkColorPicker.Area>
            <ArkColorPicker.ChannelSlider channel="hue">
              <ArkColorPicker.ChannelSliderThumb />
            </ArkColorPicker.ChannelSlider>
          </ArkColorPicker.Content>
        </ArkColorPicker.Positioner>
        {children}
      </ArkColorPicker.Root>
    );
  }
);

ColorPicker.displayName = "ColorPicker";
