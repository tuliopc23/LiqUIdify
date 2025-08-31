"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";
import { LiquidGlass } from "../liquid-glass";

const liquidNavigationMenuVariants = cva(
  "relative z-10 flex max-w-max flex-1 items-center justify-center",
  {
    variants: {
      variant: {
        default: "",
        glass: "bg-white/5 backdrop-blur-md rounded-lg p-1",
        bordered: "border border-white/20 rounded-lg p-1",
      },
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col",
      },
    },
    defaultVariants: {
      variant: "default",
      orientation: "horizontal",
    },
  }
);

const navigationMenuListVariants = cva(
  "group flex flex-1 list-none items-center justify-center space-x-1",
  {
    variants: {
      orientation: {
        horizontal: "flex-row space-x-1 space-y-0",
        vertical: "flex-col space-x-0 space-y-1",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
);

const navigationMenuTriggerVariants = cva(
  "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "text-white data-[active]:bg-white/20 data-[state=open]:bg-white/20",
        ghost:
          "text-white/80 hover:text-white data-[active]:bg-white/10 data-[state=open]:bg-white/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const navigationMenuContentVariants = cva(
  "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto",
  {
    variants: {
      variant: {
        default: "",
        glass: "bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-lg",
        card: "bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg shadow-xl",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface NavigationMenuContextValue {
  activeItem: string | null;
  setActiveItem: (item: string | null) => void;
  orientation: "horizontal" | "vertical";
}

const NavigationMenuContext = React.createContext<NavigationMenuContextValue | undefined>(
  undefined
);

const useNavigationMenu = () => {
  const context = React.useContext(NavigationMenuContext);
  if (!context) {
    throw new Error("useNavigationMenu must be used within a LiquidNavigationMenu");
  }
  return context;
};

interface LiquidNavigationMenuProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof liquidNavigationMenuVariants> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  delayDuration?: number;
  skipDelayDuration?: number;
  dir?: "ltr" | "rtl";
}

export const LiquidNavigationMenu = React.forwardRef<HTMLElement, LiquidNavigationMenuProps>(
  (
    {
      className,
      variant,
      orientation = "horizontal",
      value,
      defaultValue,
      onValueChange,
      delayDuration = 200,
      skipDelayDuration = 300,
      dir = "ltr",
      children,
      ...props
    },
    ref
  ) => {
    const [activeItem, setActiveItem] = React.useState<string | null>(defaultValue || null);
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : activeItem;

    const handleValueChange = React.useCallback(
      (newValue: string | null) => {
        if (!isControlled) {
          setActiveItem(newValue);
        }
        if (newValue) {
          onValueChange?.(newValue);
        }
      },
      [isControlled, onValueChange]
    );

    const contextValue = React.useMemo(
      () => ({
        activeItem: currentValue,
        setActiveItem: handleValueChange,
        orientation,
      }),
      [currentValue, handleValueChange, orientation]
    );

    return (
      <NavigationMenuContext.Provider value={contextValue}>
        <nav
          ref={ref}
          className={cn(liquidNavigationMenuVariants({ variant, orientation }), className)}
          dir={dir}
          {...props}
        >
          {children}
        </nav>
      </NavigationMenuContext.Provider>
    );
  }
);

LiquidNavigationMenu.displayName = "LiquidNavigationMenu";

interface LiquidNavigationMenuListProps extends React.HTMLAttributes<HTMLUListElement> {}

export const LiquidNavigationMenuList = React.forwardRef<
  HTMLUListElement,
  LiquidNavigationMenuListProps
>(({ className, ...props }, ref) => {
  const { orientation } = useNavigationMenu();

  return (
    <ul
      ref={ref}
      className={cn(navigationMenuListVariants({ orientation }), className)}
      {...props}
    />
  );
});

LiquidNavigationMenuList.displayName = "LiquidNavigationMenuList";

interface LiquidNavigationMenuItemProps extends React.HTMLAttributes<HTMLLIElement> {
  value: string;
}

export const LiquidNavigationMenuItem = React.forwardRef<
  HTMLLIElement,
  LiquidNavigationMenuItemProps
>(({ value, ...props }, ref) => {
  return <li ref={ref} data-value={value} {...props} />;
});

LiquidNavigationMenuItem.displayName = "LiquidNavigationMenuItem";

interface LiquidNavigationMenuTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof navigationMenuTriggerVariants> {
  value: string;
}

export const LiquidNavigationMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  LiquidNavigationMenuTriggerProps
>(
  (
    {
      className,
      variant,
      value,
      children,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      onClick,
      ...props
    },
    ref
  ) => {
    const { activeItem, setActiveItem } = useNavigationMenu();
    const isActive = activeItem === value;
    const timeoutRef = React.useRef<NodeJS.Timeout>();

    const handleMouseEnter = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        setActiveItem(value);
        onMouseEnter?.(e);
      },
      [value, setActiveItem, onMouseEnter]
    );

    const handleMouseLeave = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        timeoutRef.current = setTimeout(() => {
          setActiveItem(null);
        }, 150);
        onMouseLeave?.(e);
      },
      [setActiveItem, onMouseLeave]
    );

    const handleFocus = React.useCallback(
      (e: React.FocusEvent<HTMLButtonElement>) => {
        setActiveItem(value);
        onFocus?.(e);
      },
      [value, setActiveItem, onFocus]
    );

    const handleClick = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        setActiveItem(isActive ? null : value);
        onClick?.(e);
      },
      [value, isActive, setActiveItem, onClick]
    );

    React.useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    return (
      <button
        ref={ref}
        className={cn(navigationMenuTriggerVariants({ variant }), className)}
        data-active={isActive || undefined}
        data-state={isActive ? "open" : "closed"}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onClick={handleClick}
        aria-expanded={isActive}
        {...props}
      >
        {children}
        <svg
          className={cn(
            "relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180",
            "[&>path]:fill-current"
          )}
          aria-hidden="true"
        >
          <path d="M15 8.25L12 11.25L9 8.25" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      </button>
    );
  }
);

LiquidNavigationMenuTrigger.displayName = "LiquidNavigationMenuTrigger";

interface LiquidNavigationMenuContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof navigationMenuContentVariants> {
  value: string;
  forceMount?: boolean;
}

export const LiquidNavigationMenuContent = React.forwardRef<
  HTMLDivElement,
  LiquidNavigationMenuContentProps
>(
  (
    {
      className,
      variant = "glass",
      value,
      forceMount,
      onMouseEnter,
      onMouseLeave,
      children,
      ...props
    },
    ref
  ) => {
    const { activeItem, setActiveItem } = useNavigationMenu();
    const isOpen = activeItem === value;
    const timeoutRef = React.useRef<NodeJS.Timeout>();

    const handleMouseEnter = React.useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        setActiveItem(value);
        onMouseEnter?.(e);
      },
      [value, setActiveItem, onMouseEnter]
    );

    const handleMouseLeave = React.useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        timeoutRef.current = setTimeout(() => {
          setActiveItem(null);
        }, 150);
        onMouseLeave?.(e);
      },
      [setActiveItem, onMouseLeave]
    );

    React.useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    if (!isOpen && !forceMount) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn("absolute left-0 top-full w-full md:w-auto", !isOpen && "hidden")}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <LiquidGlass
          variant="card"
          intensity="medium"
          className={cn(
            navigationMenuContentVariants({ variant }),
            "mt-1.5 min-w-[400px] p-4",
            className
          )}
          data-state={isOpen ? "open" : "closed"}
          {...props}
        >
          {children}
        </LiquidGlass>
      </div>
    );
  }
);

LiquidNavigationMenuContent.displayName = "LiquidNavigationMenuContent";

interface LiquidNavigationMenuLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof navigationMenuTriggerVariants> {
  active?: boolean;
}

export const LiquidNavigationMenuLink = React.forwardRef<
  HTMLAnchorElement,
  LiquidNavigationMenuLinkProps
>(({ className, variant, active, ...props }, ref) => {
  return (
    <a
      ref={ref}
      className={cn(
        navigationMenuTriggerVariants({ variant }),
        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 focus:bg-white/10",
        active && "bg-white/20",
        className
      )}
      data-active={active || undefined}
      {...props}
    />
  );
});

LiquidNavigationMenuLink.displayName = "LiquidNavigationMenuLink";

interface LiquidNavigationMenuIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {}

export const LiquidNavigationMenuIndicator = React.forwardRef<
  HTMLDivElement,
  LiquidNavigationMenuIndicatorProps
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
        className
      )}
      {...props}
    >
      <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-white/20 shadow-md" />
    </div>
  );
});

LiquidNavigationMenuIndicator.displayName = "LiquidNavigationMenuIndicator";

interface LiquidNavigationMenuViewportProps extends React.HTMLAttributes<HTMLDivElement> {}

export const LiquidNavigationMenuViewport = React.forwardRef<
  HTMLDivElement,
  LiquidNavigationMenuViewportProps
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("absolute left-0 top-full flex justify-center", className)}
      {...props}
    >
      <LiquidGlass
        variant="card"
        intensity="medium"
        className="origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-lg border border-white/20 bg-white/10 backdrop-blur-md shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]"
      />
    </div>
  );
});

LiquidNavigationMenuViewport.displayName = "LiquidNavigationMenuViewport";

// Utility component for creating navigation menu items with content
interface LiquidNavigationMenuItemWithContentProps {
  value: string;
  trigger: React.ReactNode;
  content: React.ReactNode;
  variant?: VariantProps<typeof navigationMenuTriggerVariants>["variant"];
}

export const LiquidNavigationMenuItemWithContent: React.FC<
  LiquidNavigationMenuItemWithContentProps
> = ({ value, trigger, content, variant }) => {
  return (
    <LiquidNavigationMenuItem value={value}>
      <LiquidNavigationMenuTrigger value={value} variant={variant}>
        {trigger}
      </LiquidNavigationMenuTrigger>
      <LiquidNavigationMenuContent value={value}>{content}</LiquidNavigationMenuContent>
    </LiquidNavigationMenuItem>
  );
};

LiquidNavigationMenuItemWithContent.displayName = "LiquidNavigationMenuItemWithContent";

export {
  liquidNavigationMenuVariants,
  navigationMenuListVariants,
  navigationMenuTriggerVariants,
  navigationMenuContentVariants,
  type LiquidNavigationMenuProps,
};
