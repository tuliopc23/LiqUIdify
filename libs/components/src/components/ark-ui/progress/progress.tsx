"use client";

import { Progress as ArkProgress } from "@ark-ui/react";
import { forwardRef } from "react";
import {
  progress,
  type ProgressVariantProps,
} from "../../../../../../styled-system/recipes/progress";
import type { ComponentProps } from "react";

export interface ProgressProps
  extends ComponentProps<typeof ArkProgress.Root>,
    ProgressVariantProps {
  label?: string;
  value?: number;
  max?: number;
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ label, value = 0, max = 100, size, children, className, ...props }, ref) => {
    const [variantProps, restProps] = progress.splitVariantProps({ size });

    return (
      <ArkProgress.Root
        ref={ref}
        className={[progress(variantProps), className].filter(Boolean).join(" ")}
        value={value}
        max={max}
        {...restProps}
        {...props}
      >
        {(label || children) && <ArkProgress.Label>{label || children}</ArkProgress.Label>}
        <ArkProgress.Track>
          <ArkProgress.Range />
        </ArkProgress.Track>
        <ArkProgress.ValueText />
      </ArkProgress.Root>
    );
  }
);

Progress.displayName = "Progress";
