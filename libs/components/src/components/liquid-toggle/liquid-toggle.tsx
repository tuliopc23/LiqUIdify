"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";
import { LiquidGlass } from "../liquid-glass";

const liquidToggleVariants = cva(
  "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-white/10 text-white hover:bg-white/20 data-[state=on]:bg-blue-500/30 data-[state=on]:text-white",
        outline:
          "border border-white/30 bg-transparent text-white hover:bg-white/10 data-[state=on]:bg-blue-500/20 data-[state=on]:border-blue-500/50",
        ghost:
          "text-white hover:bg-white/10 data-[state=on]:bg-blue-500/20 data-[state=on]:text-white",
        glass:
          "bg-white/5 backdrop-blur-sm text-white hover:bg-white/15 data-[state=on]:bg-blue-500/25 data-[state=on]:text-white",
      },
      size: {
        sm: "h-8 px-2.5 text-xs",
        md: "h-9 px-3 text-sm",
        lg: "h-10 px-4 text-base",
        xl: "h-11 px-5 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

interface LiquidToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof liquidToggleVariants> {
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  loading?: boolean;
  loadingText?: string;
}

export const LiquidToggle = React.forwardRef<HTMLButtonElement, LiquidToggleProps>(
  (
    {
      className,
      variant,
      size,
      pressed: controlledPressed,
      defaultPressed = false,
      onPressedChange,
      icon,
      iconPosition = "left",
      loading = false,
      loadingText,
      disabled,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    const [internalPressed, setInternalPressed] = React.useState(defaultPressed);

    const isControlled = controlledPressed !== undefined;
    const isPressed = isControlled ? controlledPressed : internalPressed;

    const handleClick = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (loading || disabled) return;

        const newPressed = !isPressed;

        if (!isControlled) {
          setInternalPressed(newPressed);
        }

        onPressedChange?.(newPressed);
        onClick?.(e);
      },
      [isPressed, isControlled, onPressedChange, onClick, loading, disabled]
    );

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          handleClick(e as any);
        }
      },
      [handleClick]
    );

    // Loading spinner component
    const LoadingSpinner = () => (
      <div className="animate-spin rounded-full h-3 w-3 border border-current border-t-transparent" />
    );

    // Render icon with proper positioning
    const renderIcon = () => {
      if (loading) {
        return <LoadingSpinner />;
      }
      return icon;
    };

    const hasIcon = icon || loading;
    const displayText = loading && loadingText ? loadingText : children;

    return (
      <LiquidGlass
        variant="card"
        intensity="subtle"
        className={cn(liquidToggleVariants({ variant, size }), className)}
        ref={ref}
        type="button"
        role="button"
        aria-pressed={isPressed}
        data-state={isPressed ? "on" : "off"}
        disabled={disabled || loading}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {hasIcon && iconPosition === "left" && (
          <span className={cn("flex items-center", displayText && "mr-2")}>{renderIcon()}</span>
        )}

        {displayText && <span>{displayText}</span>}

        {hasIcon && iconPosition === "right" && (
          <span className={cn("flex items-center", displayText && "ml-2")}>{renderIcon()}</span>
        )}
      </LiquidGlass>
    );
  }
);

LiquidToggle.displayName = "LiquidToggle";

// Toggle Group Component
interface LiquidToggleGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple";
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  orientation?: "horizontal" | "vertical";
  loop?: boolean;
  disabled?: boolean;
  variant?: VariantProps<typeof liquidToggleVariants>["variant"];
  size?: VariantProps<typeof liquidToggleVariants>["size"];
}

const toggleGroupVariants = cva("flex", {
  variants: {
    orientation: {
      horizontal: "flex-row",
      vertical: "flex-col",
    },
    variant: {
      default: "bg-white/10 backdrop-blur-sm",
      outline: "border border-white/20",
      ghost: "",
      glass: "bg-white/5 backdrop-blur-md",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    variant: "default",
  },
});

export const LiquidToggleGroup = React.forwardRef<HTMLDivElement, LiquidToggleGroupProps>(
  (
    {
      className,
      type = "single",
      value: controlledValue,
      defaultValue,
      onValueChange,
      orientation = "horizontal",
      loop = false,
      disabled = false,
      variant = "default",
      size = "md",
      children,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState<string | string[]>(
      defaultValue || (type === "multiple" ? [] : "")
    );

    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;

    const handleValueChange = React.useCallback(
      (itemValue: string, pressed: boolean) => {
        let newValue: string | string[];

        if (type === "single") {
          newValue = pressed ? itemValue : "";
        } else {
          const currentArray = Array.isArray(value) ? value : [];
          if (pressed) {
            newValue = [...currentArray, itemValue];
          } else {
            newValue = currentArray.filter((v) => v !== itemValue);
          }
        }

        if (!isControlled) {
          setInternalValue(newValue);
        }

        onValueChange?.(newValue);
      },
      [type, value, isControlled, onValueChange]
    );

    // Handle keyboard navigation
    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent) => {
        const items = Array.from(
          e.currentTarget.querySelectorAll("[data-toggle-item]")
        ) as HTMLElement[];
        const currentIndex = items.indexOf(document.activeElement);

        let nextIndex: number;

        switch (e.key) {
          case "ArrowRight":
            if (orientation === "horizontal") {
              e.preventDefault();
              nextIndex = loop
                ? (currentIndex + 1) % items.length
                : Math.min(currentIndex + 1, items.length - 1);
              items[nextIndex]?.focus();
            }
            break;
          case "ArrowLeft":
            if (orientation === "horizontal") {
              e.preventDefault();
              nextIndex = loop
                ? (currentIndex - 1 + items.length) % items.length
                : Math.max(currentIndex - 1, 0);
              items[nextIndex]?.focus();
            }
            break;
          case "ArrowDown":
            if (orientation === "vertical") {
              e.preventDefault();
              nextIndex = loop
                ? (currentIndex + 1) % items.length
                : Math.min(currentIndex + 1, items.length - 1);
              items[nextIndex]?.focus();
            }
            break;
          case "ArrowUp":
            if (orientation === "vertical") {
              e.preventDefault();
              nextIndex = loop
                ? (currentIndex - 1 + items.length) % items.length
                : Math.max(currentIndex - 1, 0);
              items[nextIndex]?.focus();
            }
            break;
          case "Home":
            e.preventDefault();
            items[0]?.focus();
            break;
          case "End":
            e.preventDefault();
            items[items.length - 1]?.focus();
            break;
        }
      },
      [orientation, loop]
    );

    return (
      <LiquidGlass
        variant="card"
        intensity="subtle"
        className={cn(
          toggleGroupVariants({ orientation, variant }),
          orientation === "horizontal" ? "rounded-lg p-1 space-x-1" : "rounded-lg p-1 space-y-1",
          className
        )}
        ref={ref}
        role="group"
        onKeyDown={handleKeyDown}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === LiquidToggleGroupItem) {
            const itemValue = child.props.value;
            const isPressed =
              type === "single"
                ? value === itemValue
                : Array.isArray(value) && value.includes(itemValue);

            return React.cloneElement(child, {
              pressed: isPressed,
              onPressedChange: (pressed: boolean) => handleValueChange(itemValue, pressed),
              disabled: disabled || child.props.disabled,
              variant,
              size,
            });
          }
          return child;
        })}
      </LiquidGlass>
    );
  }
);

LiquidToggleGroup.displayName = "LiquidToggleGroup";

// Toggle Group Item
interface LiquidToggleGroupItemProps
  extends Omit<LiquidToggleProps, "pressed" | "onPressedChange"> {
  value: string;
}

export const LiquidToggleGroupItem = React.forwardRef<
  HTMLButtonElement,
  LiquidToggleGroupItemProps
>(({ value, className, ...props }, ref) => {
  return (
    <LiquidToggle
      ref={ref}
      className={cn("data-[state=on]:bg-white/20", className)}
      data-toggle-item
      data-value={value}
      {...props}
    />
  );
});

LiquidToggleGroupItem.displayName = "LiquidToggleGroupItem";

export { liquidToggleVariants, toggleGroupVariants, type LiquidToggleProps };
