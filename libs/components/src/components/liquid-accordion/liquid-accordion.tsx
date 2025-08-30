"use client";

import * as React from "react";
import { useState, useCallback, useRef, useEffect } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { LiquidGlass } from "../liquid-glass";

const liquidAccordionVariants = cva(
  "w-full space-y-2",
  {
    variants: {
      variant: {
        default: "",
        card: "space-y-0 overflow-hidden rounded-lg border border-white/20",
        minimal: "space-y-1",
        separated: "space-y-4"
      },
      size: {
        sm: "text-sm",
        md: "",
        lg: "text-lg"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);

const accordionItemVariants = cva(
  "overflow-hidden transition-all duration-200",
  {
    variants: {
      variant: {
        default: "rounded-lg border border-white/20",
        card: "border-b border-white/10 last:border-b-0",
        minimal: "border-b border-white/5 last:border-b-0",
        separated: "rounded-lg border border-white/20 shadow-sm"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

const accordionTriggerVariants = cva(
  "flex w-full items-center justify-between p-4 font-medium text-left text-white transition-colors hover:bg-white/5 focus:bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500/50",
  {
    variants: {
      variant: {
        default: "",
        card: "border-0",
        minimal: "px-0 py-3",
        separated: ""
      },
      size: {
        sm: "p-3 text-sm",
        md: "p-4",
        lg: "p-5 text-lg"
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed hover:bg-transparent focus:bg-transparent",
        false: ""
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      disabled: false
    }
  }
);

const accordionContentVariants = cva(
  "overflow-hidden text-white/80 transition-all duration-200",
  {
    variants: {
      variant: {
        default: "px-4 pb-4",
        card: "px-4 pb-4",
        minimal: "pb-3",
        separated: "px-4 pb-4"
      },
      size: {
        sm: "px-3 pb-3 text-sm",
        md: "px-4 pb-4",
        lg: "px-5 pb-5 text-lg"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);

interface AccordionItem {
  key: string;
  title: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  extra?: React.ReactNode;
}

interface LiquidAccordionProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof liquidAccordionVariants> {
  items?: AccordionItem[];
  activeKey?: string | string[];
  defaultActiveKey?: string | string[];
  onChange?: (key: string | string[]) => void;
  accordion?: boolean; // Single item open (true) vs multiple items (false)
  collapsible?: boolean;
  bordered?: boolean;
  expandIcon?: (panelProps: { isActive: boolean; disabled?: boolean }) => React.ReactNode;
  expandIconPosition?: "left" | "right";
  ghost?: boolean;
  destroyInactivePanel?: boolean;
  children?: React.ReactNode;
}

interface LiquidAccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  title: React.ReactNode;
  itemKey: string;
  disabled?: boolean;
  extra?: React.ReactNode;
  showArrow?: boolean;
  children: React.ReactNode;
}

export const LiquidAccordion = React.forwardRef<HTMLDivElement, LiquidAccordionProps>(
  ({
    className,
    variant,
    size,
    items,
    activeKey,
    defaultActiveKey,
    onChange,
    accordion = false,
    collapsible = true,
    bordered = true,
    expandIcon,
    expandIconPosition = "right",
    ghost = false,
    destroyInactivePanel = false,
    children,
    ...props
  }, ref) => {
    // State for controlled/uncontrolled mode
    const [internalActiveKey, setInternalActiveKey] = useState<string | string[]>(() => {
      if (activeKey !== undefined) return activeKey;
      if (defaultActiveKey !== undefined) return defaultActiveKey;
      return accordion ? "" : [];
    });

    const currentActiveKey = activeKey !== undefined ? activeKey : internalActiveKey;

    // Handle item toggle
    const handleItemToggle = useCallback((key: string) => {
      let newActiveKey: string | string[];

      if (accordion) {
        // Single item mode - only one can be open
        const currentKey = currentActiveKey as string;
        if (currentKey === key && collapsible) {
          newActiveKey = "";
        } else {
          newActiveKey = key;
        }
      } else {
        // Multiple items mode
        const currentKeys = Array.isArray(currentActiveKey) ? currentActiveKey : [];
        if (currentKeys.includes(key)) {
          newActiveKey = currentKeys.filter(k => k !== key);
        } else {
          newActiveKey = [...currentKeys, key];
        }
      }

      if (activeKey === undefined) {
        setInternalActiveKey(newActiveKey);
      }
      onChange?.(newActiveKey);
    }, [accordion, collapsible, currentActiveKey, activeKey, onChange]);

    // Check if item is active
    const isItemActive = useCallback((key: string) => {
      if (accordion) {
        return currentActiveKey === key;
      }
      return Array.isArray(currentActiveKey) && currentActiveKey.includes(key);
    }, [accordion, currentActiveKey]);

    // Default expand icon
    const defaultExpandIcon = ({ isActive, disabled }: { isActive: boolean; disabled?: boolean }) => (
      <svg
        width="16"
        height="16" 
        viewBox="0 0 16 16"
        fill="currentColor"
        className={cn(
          "transition-transform duration-200",
          isActive && "rotate-180",
          disabled && "opacity-50"
        )}
      >
        <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
      </svg>
    );

    // Render items from props
    const renderItems = () => {
      if (!items) return null;

      return items.map((item) => (
        <LiquidAccordionItem
          key={item.key}
          itemKey={item.key}
          title={item.title}
          disabled={item.disabled}
          extra={item.extra}
          className={accordionItemVariants({ variant })}
        >
          {item.content}
        </LiquidAccordionItem>
      ));
    };

    // Context for accordion items
    const contextValue = {
      activeKey: currentActiveKey,
      onItemToggle: handleItemToggle,
      isItemActive,
      variant,
      size,
      expandIcon: expandIcon || defaultExpandIcon,
      expandIconPosition,
      destroyInactivePanel,
      bordered: !ghost && bordered,
    };

    return (
      <div
        ref={ref}
        className={cn(
          liquidAccordionVariants({ variant: ghost ? "minimal" : variant, size }),
          className
        )}
        {...props}
      >
        <AccordionContext.Provider value={contextValue}>
          {items ? renderItems() : children}
        </AccordionContext.Provider>
      </div>
    );
  }
);

LiquidAccordion.displayName = "LiquidAccordion";

// Context for accordion communication
const AccordionContext = React.createContext<{
  activeKey: string | string[];
  onItemToggle: (key: string) => void;
  isItemActive: (key: string) => boolean;
  variant?: string;
  size?: string;
  expandIcon: (props: { isActive: boolean; disabled?: boolean }) => React.ReactNode;
  expandIconPosition: "left" | "right";
  destroyInactivePanel: boolean;
  bordered: boolean;
} | null>(null);

const useAccordionContext = () => {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error("Accordion components must be used within LiquidAccordion");
  }
  return context;
};

// Individual accordion item component
export const LiquidAccordionItem = React.forwardRef<HTMLDivElement, LiquidAccordionItemProps>(
  ({
    className,
    title,
    itemKey,
    disabled = false,
    extra,
    showArrow = true,
    children,
    ...props
  }, ref) => {
    const context = useAccordionContext();
    const {
      isItemActive,
      onItemToggle,
      variant,
      size,
      expandIcon,
      expandIconPosition,
      destroyInactivePanel,
      bordered
    } = context;

    const isActive = isItemActive(itemKey);
    const contentRef = useRef<HTMLDivElement>(null);
    const [contentHeight, setContentHeight] = useState<number | undefined>(undefined);

    // Measure content height for smooth animation
    useEffect(() => {
      if (contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight);
      }
    }, [children, isActive]);

    const handleToggle = useCallback(() => {
      if (!disabled) {
        onItemToggle(itemKey);
      }
    }, [disabled, itemKey, onItemToggle]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleToggle();
      }
    }, [handleToggle]);

    return (
      <LiquidGlass
        ref={ref}
        variant="card"
        intensity="subtle"
        className={cn(
          accordionItemVariants({ variant }),
          !bordered && "border-0",
          className
        )}
        {...props}
      >
        {/* Trigger */}
        <button
          className={cn(
            accordionTriggerVariants({ variant, size, disabled }),
            "group"
          )}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          aria-expanded={isActive}
          aria-controls={`accordion-content-${itemKey}`}
          id={`accordion-trigger-${itemKey}`}
        >
          {/* Left expand icon */}
          {showArrow && expandIconPosition === "left" && (
            <div className="mr-3 flex-shrink-0">
              {expandIcon({ isActive, disabled })}
            </div>
          )}

          {/* Title */}
          <div className="flex-1 text-left">
            {title}
          </div>

          {/* Extra content */}
          {extra && (
            <div className="ml-2 flex-shrink-0 text-white/60">
              {extra}
            </div>
          )}

          {/* Right expand icon */}
          {showArrow && expandIconPosition === "right" && (
            <div className="ml-3 flex-shrink-0">
              {expandIcon({ isActive, disabled })}
            </div>
          )}
        </button>

        {/* Content */}
        <div
          id={`accordion-content-${itemKey}`}
          className="overflow-hidden transition-all duration-200 ease-out"
          style={{
            height: isActive ? contentHeight : 0,
            opacity: isActive ? 1 : 0,
          }}
          aria-labelledby={`accordion-trigger-${itemKey}`}
          role="region"
        >
          <div
            ref={contentRef}
            className={accordionContentVariants({ variant, size })}
          >
            {destroyInactivePanel && !isActive ? null : children}
          </div>
        </div>
      </LiquidGlass>
    );
  }
);

LiquidAccordionItem.displayName = "LiquidAccordionItem";

// Accordion header component for custom styling
interface LiquidAccordionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export const LiquidAccordionHeader = React.forwardRef<HTMLDivElement, LiquidAccordionHeaderProps>(
  ({ className, children, level = 3, ...props }, ref) => {
    const Component = `h${level}` as keyof JSX.IntrinsicElements;
    
    return (
      <Component
        ref={ref}
        className={cn("font-medium text-white", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

LiquidAccordionHeader.displayName = "LiquidAccordionHeader";

// Accordion content component for custom styling
interface LiquidAccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const LiquidAccordionContent = React.forwardRef<HTMLDivElement, LiquidAccordionContentProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("text-white/80 leading-relaxed", className)}
      {...props}
    >
      {children}
    </div>
  )
);

LiquidAccordionContent.displayName = "LiquidAccordionContent";

export { 
  liquidAccordionVariants,
  accordionItemVariants,
  accordionTriggerVariants,
  accordionContentVariants,
  type LiquidAccordionProps,
  type LiquidAccordionItemProps,
  type AccordionItem
};