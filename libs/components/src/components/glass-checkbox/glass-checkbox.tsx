import { forwardRef } from "react";

import { cn } from "@/core/utils/classname";

export interface GlassCheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const GlassCheckbox = forwardRef<HTMLInputElement, GlassCheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    const checkboxId =
      id || `checkbox-${Math.random().toString(36).slice(2, 11)}`;

    return (
      <label
        className="flex cursor-pointer items-center space-x-3"
        htmlFor={checkboxId}
      >
        <input
          type="checkbox"
          id={checkboxId}
          className={cn(
            "glass-effect h-5 w-5 rounded border-2 border-glass transition-colors focus:ring-2 focus:ring-primary",
            "checked:border-primary checked:bg-primary",
            className,
          )}
          ref={ref}
          {...props}
        />

        {label && <span className="text-primary">{label}</span>}
      </label>
    );
  },
);

GlassCheckbox.displayName = "GlassCheckbox";

export { GlassCheckbox };
