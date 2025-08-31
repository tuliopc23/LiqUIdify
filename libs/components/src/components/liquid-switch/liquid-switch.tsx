"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";
import { LiquidGlass } from "../liquid-glass";

const liquidSwitchVariants = cva(
  "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "data-[state=checked]:bg-blue-500/30 data-[state=unchecked]:bg-white/10",
        success: "data-[state=checked]:bg-green-500/30 data-[state=unchecked]:bg-white/10",
        warning: "data-[state=checked]:bg-yellow-500/30 data-[state=unchecked]:bg-white/10",
        danger: "data-[state=checked]:bg-red-500/30 data-[state=unchecked]:bg-white/10",
        ghost: "data-[state=checked]:bg-white/20 data-[state=unchecked]:bg-white/5",
      },
      size: {
        sm: "h-5 w-9",
        md: "h-6 w-11",
        lg: "h-7 w-13",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const switchThumbVariants = cva(
  "pointer-events-none flex items-center justify-center rounded-full bg-white shadow-lg ring-0 transition-transform",
  {
    variants: {
      size: {
        sm: "h-3 w-3 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
        md: "h-4 w-4 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
        lg: "h-5 w-5 data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

interface LiquidSwitchProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof liquidSwitchVariants> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
  icon?: React.ReactNode;
  checkedIcon?: React.ReactNode;
  uncheckedIcon?: React.ReactNode;
  label?: React.ReactNode;
  description?: React.ReactNode;
  loading?: boolean;
}

export const LiquidSwitch = React.forwardRef<HTMLButtonElement, LiquidSwitchProps>(
  (
    {
      className,
      variant,
      size,
      checked: controlledChecked,
      defaultChecked = false,
      onCheckedChange,
      disabled = false,
      required = false,
      name,
      value,
      icon,
      checkedIcon,
      uncheckedIcon,
      label,
      description,
      loading = false,
      ...props
    },
    ref
  ) => {
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked);

    const isControlled = controlledChecked !== undefined;
    const checked = isControlled ? controlledChecked : internalChecked;

    const handleToggle = React.useCallback(() => {
      if (disabled || loading) return;

      const newChecked = !checked;

      if (!isControlled) {
        setInternalChecked(newChecked);
      }

      onCheckedChange?.(newChecked);
    }, [checked, disabled, loading, isControlled, onCheckedChange]);

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          handleToggle();
        }
      },
      [handleToggle]
    );

    // Loading spinner
    const LoadingSpinner = () => (
      <div className="animate-spin rounded-full h-2 w-2 border border-white/60 border-t-transparent" />
    );

    // Render icon content
    const renderIcon = () => {
      if (loading) {
        return <LoadingSpinner />;
      }

      if (checked) {
        return checkedIcon || icon;
      }

      return uncheckedIcon || icon;
    };

    const switchElement = (
      <LiquidGlass
        variant="card"
        intensity="subtle"
        className={cn(
          liquidSwitchVariants({ variant, size }),
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        data-state={checked ? "checked" : "unchecked"}
        role="switch"
        type="button"
        aria-checked={checked}
        aria-required={required}
        aria-disabled={disabled}
        disabled={disabled}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        ref={ref}
        {...props}
      >
        <span
          className={cn(
            switchThumbVariants({ size }),
            checked && "bg-white",
            !checked && "bg-white/90"
          )}
          data-state={checked ? "checked" : "unchecked"}
        >
          {renderIcon()}
        </span>

        {/* Hidden input for form integration */}
        <input
          type="checkbox"
          name={name}
          value={value}
          checked={checked}
          required={required}
          tabIndex={-1}
          aria-hidden="true"
          onChange={() => {}} // Controlled by parent
          style={{
            position: "absolute",
            width: 1,
            height: 1,
            padding: 0,
            margin: -1,
            overflow: "hidden",
            clip: "rect(0, 0, 0, 0)",
            whiteSpace: "nowrap",
            border: 0,
          }}
        />
      </LiquidGlass>
    );

    // If no label or description, return just the switch
    if (!label && !description) {
      return switchElement;
    }

    // Return switch with label/description
    return (
      <div className="flex items-start gap-3">
        {switchElement}
        {(label || description) && (
          <div className="grid gap-1.5 leading-none">
            {label && (
              <label
                className="text-sm font-medium leading-none text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-50 cursor-pointer"
                onClick={!disabled ? handleToggle : undefined}
              >
                {label}
              </label>
            )}
            {description && <p className="text-xs text-white/70">{description}</p>}
          </div>
        )}
      </div>
    );
  }
);

LiquidSwitch.displayName = "LiquidSwitch";

export { liquidSwitchVariants, switchThumbVariants, type LiquidSwitchProps };
