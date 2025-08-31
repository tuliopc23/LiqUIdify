"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";
import { LiquidGlass } from "../liquid-glass";

const liquidMenubarVariants = cva("flex h-10 items-center space-x-1 rounded-lg p-1", {
  variants: {
    variant: {
      default: "bg-white/10 backdrop-blur-md border border-white/20",
      glass: "bg-white/5 backdrop-blur-lg border border-white/10",
      solid: "bg-white/20 backdrop-blur-sm border border-white/30",
      ghost: "bg-white/5 backdrop-blur-xl border border-white/5",
    },
    size: {
      sm: "h-8 text-xs px-2",
      md: "h-10 text-sm px-3",
      lg: "h-12 text-base px-4",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

const menubarTriggerVariants = cva(
  "flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none transition-colors focus:bg-white/20 focus:text-white data-[state=open]:bg-white/20 data-[state=open]:text-white",
  {
    variants: {
      variant: {
        default: "text-white hover:bg-white/10 hover:text-white",
        ghost: "text-white/80 hover:bg-white/5 hover:text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const menubarContentVariants = cva(
  "z-50 min-w-[8rem] overflow-hidden rounded-lg p-1 shadow-lg animate-in slide-in-from-top-1 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
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

const menubarItemVariants = cva(
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

interface MenubarContextValue {
  activeMenu: string | null;
  setActiveMenu: (menu: string | null) => void;
  closeMenus: () => void;
}

const MenubarContext = React.createContext<MenubarContextValue | undefined>(undefined);

const useMenubar = () => {
  const context = React.useContext(MenubarContext);
  if (!context) {
    throw new Error("useMenubar must be used within a LiquidMenubar");
  }
  return context;
};

interface LiquidMenubarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof liquidMenubarVariants> {
  value?: string;
  onValueChange?: (value: string) => void;
  loop?: boolean;
  dir?: "ltr" | "rtl";
}

export const LiquidMenubar = React.forwardRef<HTMLDivElement, LiquidMenubarProps>(
  (
    {
      className,
      variant,
      size,
      value,
      onValueChange,
      loop = false,
      dir = "ltr",
      children,
      ...props
    },
    ref
  ) => {
    const [activeMenu, setActiveMenu] = React.useState<string | null>(value || null);

    const handleSetActiveMenu = React.useCallback(
      (menu: string | null) => {
        setActiveMenu(menu);
        if (menu) {
          onValueChange?.(menu);
        }
      },
      [onValueChange]
    );

    const closeMenus = React.useCallback(() => {
      setActiveMenu(null);
    }, []);

    // Handle keyboard navigation
    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent) => {
        const triggers = Array.from(
          (e.currentTarget as HTMLElement).querySelectorAll("[data-menubar-trigger]")
        ) as HTMLElement[];

        const currentIndex = triggers.findIndex(
          (trigger) => trigger.getAttribute("data-value") === activeMenu
        );

        switch (e.key) {
          case "ArrowLeft":
            e.preventDefault();
            if (dir === "rtl") {
              const nextIndex = loop
                ? (currentIndex + 1) % triggers.length
                : Math.min(currentIndex + 1, triggers.length - 1);
              const nextTrigger = triggers[nextIndex];
              if (nextTrigger) {
                handleSetActiveMenu(nextTrigger.getAttribute("data-value"));
                nextTrigger.focus();
              }
            } else {
              const prevIndex = loop
                ? (currentIndex - 1 + triggers.length) % triggers.length
                : Math.max(currentIndex - 1, 0);
              const prevTrigger = triggers[prevIndex];
              if (prevTrigger) {
                handleSetActiveMenu(prevTrigger.getAttribute("data-value"));
                prevTrigger.focus();
              }
            }
            break;
          case "ArrowRight":
            e.preventDefault();
            if (dir === "rtl") {
              const prevIndex = loop
                ? (currentIndex - 1 + triggers.length) % triggers.length
                : Math.max(currentIndex - 1, 0);
              const prevTrigger = triggers[prevIndex];
              if (prevTrigger) {
                handleSetActiveMenu(prevTrigger.getAttribute("data-value"));
                prevTrigger.focus();
              }
            } else {
              const nextIndex = loop
                ? (currentIndex + 1) % triggers.length
                : Math.min(currentIndex + 1, triggers.length - 1);
              const nextTrigger = triggers[nextIndex];
              if (nextTrigger) {
                handleSetActiveMenu(nextTrigger.getAttribute("data-value"));
                nextTrigger.focus();
              }
            }
            break;
          case "Escape":
            e.preventDefault();
            closeMenus();
            break;
        }
      },
      [activeMenu, loop, dir, handleSetActiveMenu, closeMenus]
    );

    // Close menus when clicking outside
    React.useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as Element;
        if (!target.closest("[data-menubar]")) {
          closeMenus();
        }
      };

      if (activeMenu) {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
      }
    }, [activeMenu, closeMenus]);

    return (
      <MenubarContext.Provider
        value={{ activeMenu, setActiveMenu: handleSetActiveMenu, closeMenus }}
      >
        <LiquidGlass
          ref={ref}
          variant="card"
          intensity="subtle"
          className={cn(liquidMenubarVariants({ variant, size }), className)}
          role="menubar"
          data-menubar
          dir={dir}
          onKeyDown={handleKeyDown}
          {...props}
        >
          {children}
        </LiquidGlass>
      </MenubarContext.Provider>
    );
  }
);

LiquidMenubar.displayName = "LiquidMenubar";

interface LiquidMenubarMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  children: React.ReactNode;
}

export const LiquidMenubarMenu = React.forwardRef<HTMLDivElement, LiquidMenubarMenuProps>(
  ({ value, children, ...props }, ref) => {
    return (
      <div ref={ref} data-value={value} {...props}>
        {children}
      </div>
    );
  }
);

LiquidMenubarMenu.displayName = "LiquidMenubarMenu";

interface LiquidMenubarTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof menubarTriggerVariants> {
  value: string;
  asChild?: boolean;
}

export const LiquidMenubarTrigger = React.forwardRef<HTMLButtonElement, LiquidMenubarTriggerProps>(
  ({ className, variant, value, asChild = false, children, onClick, onKeyDown, ...props }, ref) => {
    const { activeMenu, setActiveMenu } = useMenubar();
    const isOpen = activeMenu === value;

    const handleClick = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setActiveMenu(isOpen ? null : value);
        onClick?.(e);
      },
      [isOpen, value, setActiveMenu, onClick]
    );

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLButtonElement>) => {
        switch (e.key) {
          case "Enter":
          case " ":
            e.preventDefault();
            setActiveMenu(isOpen ? null : value);
            break;
          case "ArrowDown":
            e.preventDefault();
            if (!isOpen) {
              setActiveMenu(value);
            }
            break;
        }
        onKeyDown?.(e);
      },
      [isOpen, value, setActiveMenu, onKeyDown]
    );

    return (
      <button
        ref={ref}
        className={cn(menubarTriggerVariants({ variant }), className)}
        data-menubar-trigger
        data-value={value}
        data-state={isOpen ? "open" : "closed"}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </button>
    );
  }
);

LiquidMenubarTrigger.displayName = "LiquidMenubarTrigger";

interface LiquidMenubarContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof menubarContentVariants> {
  value: string;
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  alignOffset?: number;
  avoidCollisions?: boolean;
  forceMount?: boolean;
}

export const LiquidMenubarContent = React.forwardRef<HTMLDivElement, LiquidMenubarContentProps>(
  (
    {
      className,
      variant,
      value,
      align = "start",
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
    const { activeMenu, closeMenus } = useMenubar();
    const isOpen = activeMenu === value;
    const contentRef = React.useRef<HTMLDivElement>(null);

    // Handle keyboard navigation within menu
    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        const items = Array.from(
          contentRef.current?.querySelectorAll("[data-menubar-item]:not([data-disabled])") || []
        ) as HTMLElement[];

        const currentIndex = items.indexOf(document.activeElement);

        switch (e.key) {
          case "ArrowDown": {
            e.preventDefault();
            const nextIndex = (currentIndex + 1) % items.length;
            items[nextIndex]?.focus();
            break;
          }
          case "ArrowUp": {
            e.preventDefault();
            const prevIndex = (currentIndex - 1 + items.length) % items.length;
            items[prevIndex]?.focus();
            break;
          }
          case "Escape":
            e.preventDefault();
            closeMenus();
            break;
          case "Tab":
            e.preventDefault();
            closeMenus();
            break;
        }
        onKeyDown?.(e);
      },
      [closeMenus, onKeyDown]
    );

    // Auto-focus first item when menu opens
    React.useEffect(() => {
      if (isOpen && contentRef.current) {
        const firstItem = contentRef.current.querySelector(
          "[data-menubar-item]:not([data-disabled])"
        ) as HTMLElement;
        firstItem?.focus();
      }
    }, [isOpen]);

    if (!isOpen && !forceMount) {
      return null;
    }

    return (
      <LiquidGlass
        ref={contentRef}
        variant="card"
        intensity="medium"
        className={cn(menubarContentVariants({ variant }), className)}
        role="menu"
        aria-orientation="vertical"
        data-state={isOpen ? "open" : "closed"}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
        {...props}
      >
        {children}
      </LiquidGlass>
    );
  }
);

LiquidMenubarContent.displayName = "LiquidMenubarContent";

interface LiquidMenubarItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof menubarItemVariants> {
  inset?: boolean;
  disabled?: boolean;
}

export const LiquidMenubarItem = React.forwardRef<HTMLButtonElement, LiquidMenubarItemProps>(
  ({ className, variant, inset, disabled, onClick, onSelect, children, ...props }, ref) => {
    const { closeMenus } = useMenubar();

    const handleClick = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled) return;

        onClick?.(e);
        onSelect?.(e as any);

        if (!e.defaultPrevented) {
          closeMenus();
        }
      },
      [disabled, onClick, onSelect, closeMenus]
    );

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick(e as any);
        }
      },
      [handleClick]
    );

    return (
      <button
        ref={ref}
        className={cn(menubarItemVariants({ variant, inset }), className)}
        role="menuitem"
        data-menubar-item
        data-disabled={disabled || undefined}
        disabled={disabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </button>
    );
  }
);

LiquidMenubarItem.displayName = "LiquidMenubarItem";

interface LiquidMenubarSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

export const LiquidMenubarSeparator = React.forwardRef<HTMLDivElement, LiquidMenubarSeparatorProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("-mx-1 my-1 h-px bg-white/20", className)}
        role="separator"
        {...props}
      />
    );
  }
);

LiquidMenubarSeparator.displayName = "LiquidMenubarSeparator";

interface LiquidMenubarLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  inset?: boolean;
}

export const LiquidMenubarLabel = React.forwardRef<HTMLDivElement, LiquidMenubarLabelProps>(
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

LiquidMenubarLabel.displayName = "LiquidMenubarLabel";

interface LiquidMenubarShortcutProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const LiquidMenubarShortcut = React.forwardRef<HTMLSpanElement, LiquidMenubarShortcutProps>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn("ml-auto text-xs tracking-widest text-white/60", className)}
        {...props}
      />
    );
  }
);

LiquidMenubarShortcut.displayName = "LiquidMenubarShortcut";

export {
  liquidMenubarVariants,
  menubarTriggerVariants,
  menubarContentVariants,
  menubarItemVariants,
  type LiquidMenubarProps,
};
