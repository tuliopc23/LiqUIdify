"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";
import { LiquidGlass } from "../liquid-glass";

const liquidDropdownMenuVariants = cva(
  "z-50 min-w-[8rem] overflow-hidden rounded-lg p-1 shadow-md",
  {
    variants: {
      variant: {
        default: "bg-white/10 backdrop-blur-md border border-white/20",
        glass: "bg-white/5 backdrop-blur-lg border border-white/10",
        solid: "bg-white/20 backdrop-blur-sm border border-white/30",
        ghost: "bg-white/5 backdrop-blur-xl border border-white/5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const dropdownMenuTriggerVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-white/10 text-white hover:bg-white/20",
        outline: "border border-white/30 bg-transparent text-white hover:bg-white/10",
        ghost: "text-white hover:bg-white/10",
        secondary: "bg-white/20 text-white hover:bg-white/30",
      },
      size: {
        sm: "h-8 px-2.5 text-xs",
        md: "h-9 px-3 text-sm",
        lg: "h-10 px-4 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const dropdownMenuItemVariants = cva(
  "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-white/20 focus:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  {
    variants: {
      variant: {
        default: "text-white hover:bg-white/10",
        destructive: "text-red-300 hover:bg-red-500/20 focus:bg-red-500/20",
      },
      inset: {
        true: "pl-8",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      inset: false,
    },
  }
);

interface LiquidDropdownMenuProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof liquidDropdownMenuVariants> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
}

export const LiquidDropdownMenu = React.forwardRef<HTMLDivElement, LiquidDropdownMenuProps>(
  ({ open: controlledOpen, onOpenChange, modal = true, children, ...props }, ref) => {
    const [internalOpen, setInternalOpen] = React.useState(false);

    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : internalOpen;

    const setOpen = React.useCallback(
      (open: boolean) => {
        if (!isControlled) {
          setInternalOpen(open);
        }
        onOpenChange?.(open);
      },
      [isControlled, onOpenChange]
    );

    const contextValue = React.useMemo(
      () => ({
        open: isOpen,
        setOpen,
        modal,
      }),
      [isOpen, setOpen, modal]
    );

    return (
      <DropdownMenuContext.Provider value={contextValue}>
        <div ref={ref} {...props}>
          {children}
        </div>
      </DropdownMenuContext.Provider>
    );
  }
);

LiquidDropdownMenu.displayName = "LiquidDropdownMenu";

// Context for dropdown menu state
interface DropdownMenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  modal: boolean;
}

const DropdownMenuContext = React.createContext<DropdownMenuContextValue | undefined>(undefined);

const useDropdownMenu = () => {
  const context = React.useContext(DropdownMenuContext);
  if (!context) {
    throw new Error("useDropdownMenu must be used within a LiquidDropdownMenu");
  }
  return context;
};

interface LiquidDropdownMenuTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof dropdownMenuTriggerVariants> {
  asChild?: boolean;
}

export const LiquidDropdownMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  LiquidDropdownMenuTriggerProps
>(({ className, variant, size, asChild = false, children, onClick, ...props }, ref) => {
  const { open, setOpen } = useDropdownMenu();

  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setOpen(!open);
      onClick?.(e);
    },
    [open, setOpen, onClick]
  );

  if (asChild) {
    return React.cloneElement(children as React.ReactElement, {
      ref,
      onClick: handleClick,
      "data-state": open ? "open" : "closed",
      "aria-expanded": open,
      "aria-haspopup": "menu",
      ...props,
    });
  }

  return (
    <LiquidGlass
      ref={ref}
      variant="card"
      intensity="subtle"
      className={cn(dropdownMenuTriggerVariants({ variant, size }), className)}
      onClick={handleClick}
      data-state={open ? "open" : "closed"}
      aria-expanded={open}
      aria-haspopup="menu"
      {...props}
    >
      {children}
    </LiquidGlass>
  );
});

LiquidDropdownMenuTrigger.displayName = "LiquidDropdownMenuTrigger";

interface LiquidDropdownMenuContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof liquidDropdownMenuVariants> {
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  alignOffset?: number;
  avoidCollisions?: boolean;
  forceMount?: boolean;
}

export const LiquidDropdownMenuContent = React.forwardRef<
  HTMLDivElement,
  LiquidDropdownMenuContentProps
>(
  (
    {
      className,
      variant,
      align = "center",
      side = "bottom",
      sideOffset = 4,
      alignOffset = 0,
      avoidCollisions = true,
      forceMount = false,
      children,
      onKeyDown,
      ...props
    },
    _ref
  ) => {
    const { open, setOpen } = useDropdownMenu();
    const contentRef = React.useRef<HTMLDivElement>(null);
    const [focusedIndex, setFocusedIndex] = React.useState(-1);

    // Handle keyboard navigation
    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        const items = Array.from(
          contentRef.current?.querySelectorAll("[data-dropdown-item]:not([data-disabled])") || []
        ) as HTMLElement[];

        switch (e.key) {
          case "ArrowDown": {
            e.preventDefault();
            const nextIndex = focusedIndex < items.length - 1 ? focusedIndex + 1 : 0;
            setFocusedIndex(nextIndex);
            items[nextIndex]?.focus();
            break;
          }
          case "ArrowUp": {
            e.preventDefault();
            const prevIndex = focusedIndex > 0 ? focusedIndex - 1 : items.length - 1;
            setFocusedIndex(prevIndex);
            items[prevIndex]?.focus();
            break;
          }
          case "Escape":
            e.preventDefault();
            setOpen(false);
            break;
          case "Tab":
            e.preventDefault();
            setOpen(false);
            break;
        }
        onKeyDown?.(e);
      },
      [focusedIndex, setOpen, onKeyDown]
    );

    // Handle click outside
    React.useEffect(() => {
      if (!open) return;

      const handleClickOutside = (e: MouseEvent) => {
        if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
          setOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open, setOpen]);

    // Focus first item when menu opens
    React.useEffect(() => {
      if (open && contentRef.current) {
        const firstItem = contentRef.current.querySelector(
          "[data-dropdown-item]:not([data-disabled])"
        ) as HTMLElement;
        if (firstItem) {
          firstItem.focus();
          setFocusedIndex(0);
        }
      }
    }, [open]);

    if (!open && !forceMount) {
      return null;
    }

    return (
      <div className="fixed inset-0 z-50" style={{ pointerEvents: open ? "auto" : "none" }}>
        <LiquidGlass
          ref={contentRef}
          variant="card"
          intensity="medium"
          className={cn(
            liquidDropdownMenuVariants({ variant }),
            "absolute animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            className
          )}
          data-state={open ? "open" : "closed"}
          role="menu"
          aria-orientation="vertical"
          onKeyDown={handleKeyDown}
          tabIndex={-1}
          style={{ pointerEvents: "auto" }}
          {...props}
        >
          {children}
        </LiquidGlass>
      </div>
    );
  }
);

LiquidDropdownMenuContent.displayName = "LiquidDropdownMenuContent";

interface LiquidDropdownMenuItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dropdownMenuItemVariants> {
  inset?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
}

export const LiquidDropdownMenuItem = React.forwardRef<HTMLDivElement, LiquidDropdownMenuItemProps>(
  ({ className, variant, inset, disabled, onSelect, children, onClick, ...props }, ref) => {
    const { setOpen } = useDropdownMenu();

    const handleClick = React.useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (disabled) return;

        onClick?.(e);
        onSelect?.();

        if (!e.defaultPrevented) {
          setOpen(false);
        }
      },
      [disabled, onClick, onSelect, setOpen]
    );

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick(e as any);
        }
      },
      [handleClick]
    );

    return (
      <div
        ref={ref}
        className={cn(dropdownMenuItemVariants({ variant, inset }), className)}
        role="menuitem"
        data-dropdown-item
        data-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : 0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </div>
    );
  }
);

LiquidDropdownMenuItem.displayName = "LiquidDropdownMenuItem";

interface LiquidDropdownMenuCheckboxItemProps
  extends Omit<LiquidDropdownMenuItemProps, "children"> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  children: React.ReactNode;
}

export const LiquidDropdownMenuCheckboxItem = React.forwardRef<
  HTMLDivElement,
  LiquidDropdownMenuCheckboxItemProps
>(({ className, checked, onCheckedChange, children, onSelect, ...props }, ref) => {
  const handleSelect = React.useCallback(() => {
    const newChecked = !checked;
    onCheckedChange?.(newChecked);
    onSelect?.();
  }, [checked, onCheckedChange, onSelect]);

  return (
    <LiquidDropdownMenuItem
      ref={ref}
      className={cn("relative pl-8 pr-2", className)}
      onSelect={handleSelect}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {checked && (
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <polyline points="20,6 9,17 4,12" />
          </svg>
        )}
      </span>
      {children}
    </LiquidDropdownMenuItem>
  );
});

LiquidDropdownMenuCheckboxItem.displayName = "LiquidDropdownMenuCheckboxItem";

interface LiquidDropdownMenuRadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  onValueChange?: (value: string) => void;
}

export const LiquidDropdownMenuRadioGroup = React.forwardRef<
  HTMLDivElement,
  LiquidDropdownMenuRadioGroupProps
>(({ value, onValueChange, children, ...props }, ref) => {
  return (
    <div ref={ref} role="radiogroup" {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === LiquidDropdownMenuRadioItem) {
          return React.cloneElement(child, {
            checked: child.props.value === value,
            onSelect: () => onValueChange?.(child.props.value),
          } as any);
        }
        return child;
      })}
    </div>
  );
});

LiquidDropdownMenuRadioGroup.displayName = "LiquidDropdownMenuRadioGroup";

interface LiquidDropdownMenuRadioItemProps extends Omit<LiquidDropdownMenuItemProps, "children"> {
  value: string;
  checked?: boolean;
  children: React.ReactNode;
}

export const LiquidDropdownMenuRadioItem = React.forwardRef<
  HTMLDivElement,
  LiquidDropdownMenuRadioItemProps
>(({ className, value, checked, children, onSelect, ...props }, ref) => {
  return (
    <LiquidDropdownMenuItem
      ref={ref}
      className={cn("relative pl-8 pr-2", className)}
      onSelect={onSelect}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {checked && (
          <svg className="h-2 w-2 fill-current" viewBox="0 0 8 8">
            <circle cx="4" cy="4" r="2" />
          </svg>
        )}
      </span>
      {children}
    </LiquidDropdownMenuItem>
  );
});

LiquidDropdownMenuRadioItem.displayName = "LiquidDropdownMenuRadioItem";

interface LiquidDropdownMenuLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  inset?: boolean;
}

export const LiquidDropdownMenuLabel = React.forwardRef<
  HTMLDivElement,
  LiquidDropdownMenuLabelProps
>(({ className, inset, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("px-2 py-1.5 text-sm font-semibold text-white/70", inset && "pl-8", className)}
      {...props}
    />
  );
});

LiquidDropdownMenuLabel.displayName = "LiquidDropdownMenuLabel";

interface LiquidDropdownMenuSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

export const LiquidDropdownMenuSeparator = React.forwardRef<
  HTMLDivElement,
  LiquidDropdownMenuSeparatorProps
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("-mx-1 my-1 h-px bg-white/20", className)}
      role="separator"
      {...props}
    />
  );
});

LiquidDropdownMenuSeparator.displayName = "LiquidDropdownMenuSeparator";

interface LiquidDropdownMenuShortcutProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const LiquidDropdownMenuShortcut = React.forwardRef<
  HTMLSpanElement,
  LiquidDropdownMenuShortcutProps
>(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn("ml-auto text-xs tracking-widest text-white/60", className)}
      {...props}
    />
  );
});

LiquidDropdownMenuShortcut.displayName = "LiquidDropdownMenuShortcut";

interface LiquidDropdownMenuGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

export const LiquidDropdownMenuGroup = React.forwardRef<
  HTMLDivElement,
  LiquidDropdownMenuGroupProps
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("overflow-hidden p-1 text-white", className)}
      role="group"
      {...props}
    />
  );
});

LiquidDropdownMenuGroup.displayName = "LiquidDropdownMenuGroup";

interface LiquidDropdownMenuSubProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const LiquidDropdownMenuSub = React.forwardRef<HTMLDivElement, LiquidDropdownMenuSubProps>(
  ({ open, onOpenChange, children, ...props }, ref) => {
    // Submenu implementation would go here
    // For now, return a simple wrapper
    return (
      <div ref={ref} {...props}>
        {children}
      </div>
    );
  }
);

LiquidDropdownMenuSub.displayName = "LiquidDropdownMenuSub";

export {
  liquidDropdownMenuVariants,
  dropdownMenuTriggerVariants,
  dropdownMenuItemVariants,
  type LiquidDropdownMenuProps,
};
