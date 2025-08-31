"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";
import { LiquidGlass } from "../liquid-glass";

const liquidContextMenuVariants = cva(
  "z-50 min-w-[8rem] overflow-hidden rounded-lg p-1 shadow-lg animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
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

const contextMenuItemVariants = cva(
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

interface LiquidContextMenuProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof liquidContextMenuVariants> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
}

export const LiquidContextMenu = React.forwardRef<HTMLDivElement, LiquidContextMenuProps>(
  ({ className, variant, open, onOpenChange, modal = true, children, ...props }, _ref) => {
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const [isOpen, setIsOpen] = React.useState(false);
    const menuRef = React.useRef<HTMLDivElement>(null);
    const triggerRef = React.useRef<HTMLElement>(null);

    const handleOpenChange = React.useCallback(
      (newOpen: boolean) => {
        setIsOpen(newOpen);
        onOpenChange?.(newOpen);
      },
      [onOpenChange]
    );

    // Handle context menu trigger
    const handleContextMenu = React.useCallback(
      (e: MouseEvent) => {
        e.preventDefault();

        const rect = menuRef.current?.getBoundingClientRect();
        const menuWidth = rect?.width || 200;
        const menuHeight = rect?.height || 300;

        let x = e.clientX;
        let y = e.clientY;

        // Adjust position to keep menu in viewport
        if (x + menuWidth > window.innerWidth) {
          x = window.innerWidth - menuWidth - 8;
        }
        if (y + menuHeight > window.innerHeight) {
          y = window.innerHeight - menuHeight - 8;
        }

        if (x < 8) x = 8;
        if (y < 8) y = 8;

        setPosition({ x, y });
        handleOpenChange(true);
      },
      [handleOpenChange]
    );

    // Handle clicks outside to close
    React.useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (isOpen && menuRef.current && !menuRef.current.contains(e.target as Node)) {
          handleOpenChange(false);
        }
      };

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape" && isOpen) {
          handleOpenChange(false);
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
          document.removeEventListener("keydown", handleEscape);
        };
      }
    }, [isOpen, handleOpenChange]);

    return (
      <>
        {/* Trigger */}
        <div onContextMenu={handleContextMenu} ref={triggerRef as any}>
          {React.Children.toArray(children)[0]}
        </div>

        {/* Context Menu */}
        {isOpen && (
          <div className="fixed inset-0 z-50" style={{ pointerEvents: modal ? "auto" : "none" }}>
            <LiquidGlass
              ref={menuRef}
              variant="card"
              intensity="medium"
              className={cn(liquidContextMenuVariants({ variant }), "fixed", className)}
              style={{
                left: position.x,
                top: position.y,
                pointerEvents: "auto",
              }}
              data-state={isOpen ? "open" : "closed"}
              role="menu"
              {...props}
            >
              {React.Children.toArray(children).slice(1)}
            </LiquidGlass>
          </div>
        )}
      </>
    );
  }
);

LiquidContextMenu.displayName = "LiquidContextMenu";

interface LiquidContextMenuTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export const LiquidContextMenuTrigger = React.forwardRef<
  HTMLDivElement,
  LiquidContextMenuTriggerProps
>(({ asChild = false, ...props }, ref) => {
  if (asChild) {
    return React.cloneElement(props.children as React.ReactElement, { ref, ...props });
  }

  return <div ref={ref} {...props} />;
});

LiquidContextMenuTrigger.displayName = "LiquidContextMenuTrigger";

interface LiquidContextMenuContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof liquidContextMenuVariants> {
  onSelect?: (value: string) => void;
}

export const LiquidContextMenuContent = React.forwardRef<
  HTMLDivElement,
  LiquidContextMenuContentProps
>(({ className, variant, onSelect, children, ...props }, ref) => {
  const [focusedIndex, setFocusedIndex] = React.useState(-1);
  const itemRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      const items = itemRefs.current.filter(Boolean);

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setFocusedIndex((prev) => {
            const next = prev < items.length - 1 ? prev + 1 : 0;
            items[next]?.focus();
            return next;
          });
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusedIndex((prev) => {
            const next = prev > 0 ? prev - 1 : items.length - 1;
            items[next]?.focus();
            return next;
          });
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          if (focusedIndex >= 0) {
            items[focusedIndex]?.click();
          }
          break;
      }
    },
    [focusedIndex]
  );

  // Focus first item when menu opens
  React.useEffect(() => {
    const firstItem = itemRefs.current[0];
    if (firstItem) {
      firstItem.focus();
      setFocusedIndex(0);
    }
  }, []);

  return (
    <div ref={ref} className={cn("outline-none", className)} onKeyDown={handleKeyDown} {...props}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child) && child.type === LiquidContextMenuItem) {
          return React.cloneElement(child, {
            ref: (el: HTMLDivElement) => {
              itemRefs.current[index] = el;
            },
            onSelect,
          } as any);
        }
        return child;
      })}
    </div>
  );
});

LiquidContextMenuContent.displayName = "LiquidContextMenuContent";

interface LiquidContextMenuItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof contextMenuItemVariants> {
  inset?: boolean;
  disabled?: boolean;
  onSelect?: (value?: string) => void;
  value?: string;
}

export const LiquidContextMenuItem = React.forwardRef<HTMLDivElement, LiquidContextMenuItemProps>(
  ({ className, variant, inset, disabled, onSelect, value, children, onClick, ...props }, ref) => {
    const handleClick = React.useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (disabled) return;

        onClick?.(e);
        onSelect?.(value);
      },
      [disabled, onClick, onSelect, value]
    );

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (!disabled) {
            onSelect?.(value);
          }
        }
      },
      [disabled, onSelect, value]
    );

    return (
      <div
        ref={ref}
        className={cn(contextMenuItemVariants({ variant, inset }), className)}
        role="menuitem"
        aria-disabled={disabled}
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

LiquidContextMenuItem.displayName = "LiquidContextMenuItem";

interface LiquidContextMenuCheckboxItemProps extends Omit<LiquidContextMenuItemProps, "children"> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  children: React.ReactNode;
}

export const LiquidContextMenuCheckboxItem = React.forwardRef<
  HTMLDivElement,
  LiquidContextMenuCheckboxItemProps
>(({ className, checked, onCheckedChange, children, onSelect, ...props }, ref) => {
  const handleSelect = React.useCallback(() => {
    const newChecked = !checked;
    onCheckedChange?.(newChecked);
    onSelect?.(newChecked.toString());
  }, [checked, onCheckedChange, onSelect]);

  return (
    <LiquidContextMenuItem
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
    </LiquidContextMenuItem>
  );
});

LiquidContextMenuCheckboxItem.displayName = "LiquidContextMenuCheckboxItem";

interface LiquidContextMenuRadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  onValueChange?: (value: string) => void;
}

export const LiquidContextMenuRadioGroup = React.forwardRef<
  HTMLDivElement,
  LiquidContextMenuRadioGroupProps
>(({ value, onValueChange, children, ...props }, ref) => {
  return (
    <div ref={ref} role="radiogroup" {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === LiquidContextMenuRadioItem) {
          return React.cloneElement(child, {
            checked: child.props.value === value,
            onSelect: onValueChange,
          } as any);
        }
        return child;
      })}
    </div>
  );
});

LiquidContextMenuRadioGroup.displayName = "LiquidContextMenuRadioGroup";

interface LiquidContextMenuRadioItemProps extends Omit<LiquidContextMenuItemProps, "children"> {
  value: string;
  checked?: boolean;
  children: React.ReactNode;
}

export const LiquidContextMenuRadioItem = React.forwardRef<
  HTMLDivElement,
  LiquidContextMenuRadioItemProps
>(({ className, value, checked, children, onSelect, ...props }, ref) => {
  const handleSelect = React.useCallback(() => {
    onSelect?.(value);
  }, [onSelect, value]);

  return (
    <LiquidContextMenuItem
      ref={ref}
      className={cn("relative pl-8 pr-2", className)}
      onSelect={handleSelect}
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
    </LiquidContextMenuItem>
  );
});

LiquidContextMenuRadioItem.displayName = "LiquidContextMenuRadioItem";

interface LiquidContextMenuLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  inset?: boolean;
}

export const LiquidContextMenuLabel = React.forwardRef<HTMLDivElement, LiquidContextMenuLabelProps>(
  ({ className, inset, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "px-2 py-1.5 text-sm font-semibold text-white/70",
          inset && "pl-8",
          className
        )}
        {...props}
      />
    );
  }
);

LiquidContextMenuLabel.displayName = "LiquidContextMenuLabel";

interface LiquidContextMenuSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

export const LiquidContextMenuSeparator = React.forwardRef<
  HTMLDivElement,
  LiquidContextMenuSeparatorProps
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

LiquidContextMenuSeparator.displayName = "LiquidContextMenuSeparator";

interface LiquidContextMenuShortcutProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const LiquidContextMenuShortcut = React.forwardRef<
  HTMLSpanElement,
  LiquidContextMenuShortcutProps
>(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn("ml-auto text-xs tracking-widest text-white/60", className)}
      {...props}
    />
  );
});

LiquidContextMenuShortcut.displayName = "LiquidContextMenuShortcut";

export { liquidContextMenuVariants, contextMenuItemVariants, type LiquidContextMenuProps };
