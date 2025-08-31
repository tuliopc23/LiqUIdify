"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

interface LiquidAspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: number;
  asChild?: boolean;
}

export const LiquidAspectRatio = React.forwardRef<HTMLDivElement, LiquidAspectRatioProps>(
  ({ ratio = 1, asChild = false, className, style, ...props }, ref) => {
    const paddingBottom = `${100 / ratio}%`;

    if (asChild) {
      const child = React.Children.only(props.children) as React.ReactElement;
      return React.cloneElement(child, {
        ref,
        className: cn("relative w-full", className, child.props.className),
        style: {
          paddingBottom,
          ...style,
          ...child.props.style,
        },
        ...props,
      });
    }

    return (
      <div
        ref={ref}
        className={cn("relative w-full", className)}
        style={{
          paddingBottom,
          ...style,
        }}
        {...props}
      >
        <div className="absolute inset-0">{props.children}</div>
      </div>
    );
  }
);

LiquidAspectRatio.displayName = "LiquidAspectRatio";

// Common aspect ratio presets
export const AspectRatios = {
  square: 1,
  video: 16 / 9,
  golden: 1.618,
  portrait: 3 / 4,
  landscape: 4 / 3,
  ultrawide: 21 / 9,
  cinema: 2.39,
  photo: 3 / 2,
  instagram: 1,
  story: 9 / 16,
} as const;

// Preset components for common use cases
export const LiquidVideoAspectRatio = React.forwardRef<
  HTMLDivElement,
  Omit<LiquidAspectRatioProps, "ratio">
>((props, ref) => <LiquidAspectRatio ref={ref} ratio={AspectRatios.video} {...props} />);
LiquidVideoAspectRatio.displayName = "LiquidVideoAspectRatio";

export const LiquidSquareAspectRatio = React.forwardRef<
  HTMLDivElement,
  Omit<LiquidAspectRatioProps, "ratio">
>((props, ref) => <LiquidAspectRatio ref={ref} ratio={AspectRatios.square} {...props} />);
LiquidSquareAspectRatio.displayName = "LiquidSquareAspectRatio";

export const LiquidPortraitAspectRatio = React.forwardRef<
  HTMLDivElement,
  Omit<LiquidAspectRatioProps, "ratio">
>((props, ref) => <LiquidAspectRatio ref={ref} ratio={AspectRatios.portrait} {...props} />);
LiquidPortraitAspectRatio.displayName = "LiquidPortraitAspectRatio";

export const LiquidLandscapeAspectRatio = React.forwardRef<
  HTMLDivElement,
  Omit<LiquidAspectRatioProps, "ratio">
>((props, ref) => <LiquidAspectRatio ref={ref} ratio={AspectRatios.landscape} {...props} />);
LiquidLandscapeAspectRatio.displayName = "LiquidLandscapeAspectRatio";

export type { LiquidAspectRatioProps };
