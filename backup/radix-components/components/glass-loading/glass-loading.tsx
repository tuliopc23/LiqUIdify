import React from "react";
import { generateStaticKey } from "@/core/utils/stable-key";
import { cn } from "../../core/utils/classname";

interface GlassLoadingProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "dots" | "spinner" | "pulse" | "bars";
  className?: string;
  text?: string;
}

export const GlassLoading = React.forwardRef<HTMLDivElement, GlassLoadingProps>(
  ({ size = "md", variant = "spinner", className, text, ...props }, ref) => {
    const sizeClasses = {
      sm: "w-4 h-4",
      md: "w-6 h-6",
      lg: "w-8 h-8",
      xl: "w-12 h-12",
    };

    const dotSizes = {
      sm: "w-1 h-1",
      md: "w-1.5 h-1.5",
      lg: "w-2 h-2",
      xl: "w-3 h-3",
    };

    const barSizes = {
      sm: "w-0.5 h-3",
      md: "w-0.5 h-4",
      lg: "w-1 h-5",
      xl: "w-1 h-6",
    };

    const renderSpinner = () => (
      <div
        className={cn(
          sizeClasses[size],
          // Use theme tokens instead of hard-coded colors
          "animate-spin rounded-full border-2 border-current/30 border-t-current",
          "text-blue-600"
        )}
      />
    );

    const renderDots = () => (
      <div className="flex space-x-1 text-blue-600">
        {[0, 1, 2].map((index) => (
          <div
            key={generateStaticKey("dot", index)}
            className={cn(dotSizes[size], "animate-pulse rounded-full bg-current/70")}
            style={{
              animationDelay: `${index * 0.2}s`,
              animationDuration: "1s",
            }}
          />
        ))}
      </div>
    );

    const renderPulse = () => (
      <div
        className={cn(
          sizeClasses[size],
          "animate-ping rounded-full bg-current/60",
          "text-blue-600"
        )}
      />
    );

    const renderBars = () => (
      <div className="flex items-end space-x-1 text-blue-600">
        {[0, 1, 2, 3].map((index) => (
          <div
            key={generateStaticKey("bar", index)}
            className={cn(barSizes[size], "animate-pulse bg-current/70")}
            style={{
              animationDelay: `${index * 0.15}s`,
              animationDuration: "0.8s",
            }}
          />
        ))}
      </div>
    );

    const renderVariant = () => {
      switch (variant) {
        case "dots": {
          return renderDots();
        }
        case "pulse": {
          return renderPulse();
        }
        case "bars": {
          return renderBars();
        }
        default: {
          return renderSpinner();
        }
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative ",
          "flex flex-col items-center justify-center space-y-3",
          className
        )}
        {...props}
      >
        {/* subtle overlay to emphasize glass */}
        <div className="pointer-events-none absolute inset-0" />
        {renderVariant()}
        {text && <p className="animate-pulse text-blue-700 text-sm">{text}</p>}
      </div>
    );
  }
);

GlassLoading.displayName = "GlassLoading";
