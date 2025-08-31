"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

const liquidCollapsibleVariants = cva("w-full", {
  variants: {
    variant: {
      default: "",
      bordered: "border border-white/20 rounded-lg",
      glass: "bg-white/5 backdrop-blur-sm rounded-lg",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const collapsibleTriggerVariants = cva(
  "flex w-full items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
  {
    variants: {
      variant: {
        default: "text-white hover:text-white/80",
        ghost: "text-white/80 hover:text-white",
        bordered: "px-4 text-white hover:bg-white/5",
      },
      size: {
        sm: "py-2 text-sm",
        md: "py-4 text-base",
        lg: "py-6 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const collapsibleContentVariants = cva("overflow-hidden text-sm transition-all", {
  variants: {
    variant: {
      default: "text-white/80",
      bordered: "px-4 pb-4 pt-0 text-white/80",
      glass: "p-4 text-white/80",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface LiquidCollapsibleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof liquidCollapsibleVariants> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  animated?: boolean;
}

export const LiquidCollapsible = React.forwardRef<HTMLDivElement, LiquidCollapsibleProps>(
  (
    {
      className,
      variant,
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      disabled = false,
      animated = true,
      children,
      ...props
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);

    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : internalOpen;

    const setOpen = React.useCallback(
      (open: boolean) => {
        if (disabled) return;

        if (!isControlled) {
          setInternalOpen(open);
        }
        onOpenChange?.(open);
      },
      [disabled, isControlled, onOpenChange]
    );

    const contextValue = React.useMemo(
      () => ({
        open: isOpen,
        setOpen,
        disabled,
        animated,
        variant,
      }),
      [isOpen, setOpen, disabled, animated, variant]
    );

    return (
      <CollapsibleContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(liquidCollapsibleVariants({ variant }), className)}
          data-state={isOpen ? "open" : "closed"}
          data-disabled={disabled || undefined}
          {...props}
        >
          {children}
        </div>
      </CollapsibleContext.Provider>
    );
  }
);

LiquidCollapsible.displayName = "LiquidCollapsible";

// Context for sharing state between collapsible components
interface CollapsibleContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  disabled: boolean;
  animated: boolean;
  variant?: VariantProps<typeof liquidCollapsibleVariants>["variant"];
}

const CollapsibleContext = React.createContext<CollapsibleContextValue | undefined>(undefined);

const useCollapsible = () => {
  const context = React.useContext(CollapsibleContext);
  if (!context) {
    throw new Error("useCollapsible must be used within a LiquidCollapsible");
  }
  return context;
};

interface LiquidCollapsibleTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof collapsibleTriggerVariants> {
  asChild?: boolean;
}

export const LiquidCollapsibleTrigger = React.forwardRef<
  HTMLButtonElement,
  LiquidCollapsibleTriggerProps
>(
  (
    { className, variant: triggerVariant, size, asChild = false, children, onClick, ...props },
    ref
  ) => {
    const { open, setOpen, disabled, variant } = useCollapsible();

    const handleClick = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOpen(!open);
        onClick?.(e);
      },
      [open, setOpen, onClick]
    );

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setOpen(!open);
        }
      },
      [open, setOpen]
    );

    // Use parent variant if no trigger variant specified
    const computedVariant = triggerVariant || (variant === "bordered" ? "bordered" : "default");

    if (asChild) {
      return React.cloneElement(children as React.ReactElement, {
        ref,
        onClick: handleClick,
        onKeyDown: handleKeyDown,
        "data-state": open ? "open" : "closed",
        "aria-expanded": open,
        disabled,
        ...props,
      });
    }

    return (
      <button
        ref={ref}
        className={cn(collapsibleTriggerVariants({ variant: computedVariant, size }), className)}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        data-state={open ? "open" : "closed"}
        aria-expanded={open}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

LiquidCollapsibleTrigger.displayName = "LiquidCollapsibleTrigger";

interface LiquidCollapsibleContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof collapsibleContentVariants> {
  forceMount?: boolean;
}

export const LiquidCollapsibleContent = React.forwardRef<
  HTMLDivElement,
  LiquidCollapsibleContentProps
>(({ className, variant: contentVariant, forceMount = false, children, ...props }, ref) => {
  const { open, animated, variant } = useCollapsible();
  const [height, setHeight] = React.useState<number | "auto">(open ? "auto" : 0);
  const _contentRef = React.useRef<HTMLDivElement>(null);
  const measureRef = React.useRef<HTMLDivElement>(null);

  // Use parent variant if no content variant specified
  const computedVariant = contentVariant || variant || "default";

  // Measure content height
  React.useEffect(() => {
    if (!animated) {
      setHeight(open ? "auto" : 0);
      return;
    }

    if (measureRef.current) {
      const contentHeight = measureRef.current.scrollHeight;
      setHeight(open ? contentHeight : 0);
    }
  }, [open, animated]);

  // Auto height after animation
  React.useEffect(() => {
    if (open && animated && height !== "auto") {
      const timer = setTimeout(() => {
        setHeight("auto");
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [open, animated, height]);

  if (!open && !forceMount) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={cn(
        collapsibleContentVariants({ variant: computedVariant }),
        animated &&
          "data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down",
        className
      )}
      style={{
        height: animated ? height : open ? "auto" : 0,
        transition: animated ? "height 300ms cubic-bezier(0.87, 0, 0.13, 1)" : undefined,
      }}
      data-state={open ? "open" : "closed"}
      {...props}
    >
      <div ref={measureRef}>{children}</div>

      <style jsx>{`
          @keyframes collapsible-down {
            from {
              height: 0;
            }
            to {
              height: var(--radix-collapsible-content-height);
            }
          }

          @keyframes collapsible-up {
            from {
              height: var(--radix-collapsible-content-height);
            }
            to {
              height: 0;
            }
          }

          .animate-collapsible-down {
            animation: collapsible-down 300ms cubic-bezier(0.87, 0, 0.13, 1);
          }

          .animate-collapsible-up {
            animation: collapsible-up 300ms cubic-bezier(0.87, 0, 0.13, 1);
          }
        `}</style>
    </div>
  );
});

LiquidCollapsibleContent.displayName = "LiquidCollapsibleContent";

// Accordion-style collapsible with header and content
interface LiquidAccordionItemProps extends LiquidCollapsibleProps {
  title: React.ReactNode;
  icon?: React.ReactNode;
  showChevron?: boolean;
  headerClassName?: string;
  contentClassName?: string;
}

export const LiquidAccordionItem = React.forwardRef<HTMLDivElement, LiquidAccordionItemProps>(
  (
    {
      title,
      icon,
      showChevron = true,
      headerClassName,
      contentClassName,
      children,
      ...collapsibleProps
    },
    ref
  ) => {
    return (
      <LiquidCollapsible ref={ref} {...collapsibleProps}>
        <LiquidCollapsibleTrigger className={cn("group", headerClassName)}>
          <div className="flex items-center">
            {icon && <span className="mr-2 flex-shrink-0">{icon}</span>}
            <span className="text-left">{title}</span>
          </div>
          {showChevron && (
            <svg
              className="h-4 w-4 shrink-0 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )}
        </LiquidCollapsibleTrigger>
        <LiquidCollapsibleContent className={contentClassName}>{children}</LiquidCollapsibleContent>
      </LiquidCollapsible>
    );
  }
);

LiquidAccordionItem.displayName = "LiquidAccordionItem";

// FAQ-style collapsible
interface LiquidFAQItemProps extends LiquidCollapsibleProps {
  question: React.ReactNode;
  answer: React.ReactNode;
}

export const LiquidFAQItem = React.forwardRef<HTMLDivElement, LiquidFAQItemProps>(
  ({ question, answer, ...collapsibleProps }, ref) => {
    return (
      <LiquidCollapsible ref={ref} variant="bordered" {...collapsibleProps}>
        <LiquidCollapsibleTrigger className="group px-4 py-3 text-left font-medium">
          <div className="flex items-center justify-between">
            <span>{question}</span>
            <svg
              className="h-4 w-4 shrink-0 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
        </LiquidCollapsibleTrigger>
        <LiquidCollapsibleContent className="px-4 pb-4">
          <div className="text-white/80">{answer}</div>
        </LiquidCollapsibleContent>
      </LiquidCollapsible>
    );
  }
);

LiquidFAQItem.displayName = "LiquidFAQItem";

export {
  liquidCollapsibleVariants,
  collapsibleTriggerVariants,
  collapsibleContentVariants,
  type LiquidCollapsibleProps,
};
