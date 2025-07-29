import React from "react";

import { cn, getGlassClass } from "@/core/utils/classname";

export interface GlassTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: "default" | "minimal";
  resize?: "none" | "vertical" | "horizontal" | "both";
}

export const GlassTextarea = React.memo(
  React.forwardRef<HTMLTextAreaElement, GlassTextareaProps>(
    (
      { className, variant = "default", resize = "vertical", ...props },
      ref,
    ) => {
      return (
        <textarea
          ref={ref}
          className={cn(
            getGlassClass("default"),
            "w-full rounded-xl px-4 py-3",
            "transition-all duration-200 ease-out",
            "border border-white/20 dark:border-white/10",
            "text-gray-900 dark:text-white",
            "placeholder:text-gray-500 dark:placeholder:text-gray-400",
            "focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500/50",
            "hover:bg-white/10 dark:hover:bg-white/5",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "min-h-[100px]",
            resize === "none" && "resize-none",
            resize === "vertical" && "resize-y",
            resize === "horizontal" && "resize-x",
            resize === "both" && "resize",
            variant === "minimal" &&
              "rounded-none border-0 border-white/30 border-b bg-transparent focus:border-blue-500/50 dark:border-white/20",
            className,
          )}
          {...props}
        />
      );
    },
  ),
);

GlassTextarea.displayName = "GlassTextarea";
