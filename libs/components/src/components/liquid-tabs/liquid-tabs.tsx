"use client";

import * as React from "react";
import { useState, useCallback, useRef, useEffect } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { LiquidGlass } from "../liquid-glass";

const liquidTabsVariants = cva(
  "w-full",
  {
    variants: {
      variant: {
        default: "",
        card: "bg-white/5 rounded-2xl p-1 border border-white/10",
        pills: "",
        underline: ""
      },
      orientation: {
        horizontal: "flex flex-col",
        vertical: "flex flex-row"
      }
    },
    defaultVariants: {
      variant: "default",
      orientation: "horizontal"
    }
  }
);

const tabListVariants = cva(
  "relative flex",
  {
    variants: {
      variant: {
        default: "border-b border-white/20",
        card: "bg-white/5 rounded-xl p-1",
        pills: "gap-2",
        underline: "border-b border-white/20"
      },
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col border-r border-white/20 border-b-0 min-w-48"
      }
    },
    defaultVariants: {
      variant: "default",
      orientation: "horizontal"
    }
  }
);

const tabTriggerVariants = cva(
  "relative flex items-center justify-center gap-2 px-4 py-2 text-white/70 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "hover:bg-white/5 data-[state=active]:text-white data-[state=active]:bg-white/10",
        card: "rounded-lg hover:bg-white/10 data-[state=active]:bg-white/15 data-[state=active]:text-white",
        pills: "rounded-full bg-white/5 hover:bg-white/10 data-[state=active]:bg-white/20 data-[state=active]:text-white",
        underline: "hover:bg-white/5 data-[state=active]:text-white"
      },
      orientation: {
        horizontal: "whitespace-nowrap",
        vertical: "w-full justify-start text-left"
      }
    },
    defaultVariants: {
      variant: "default",
      orientation: "horizontal"
    }
  }
);

interface TabItem {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  badge?: string | number;
  content?: React.ReactNode;
}

interface LiquidTabsProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof liquidTabsVariants> {
  tabs: TabItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  animateIndicator?: boolean;
}

export const LiquidTabs = React.forwardRef<HTMLDivElement, LiquidTabsProps>(
  ({
    className,
    variant,
    orientation,
    tabs,
    value: controlledValue,
    defaultValue,
    onValueChange,
    animateIndicator = true,
    ...props
  }, ref) => {
    const [internalValue, setInternalValue] = useState(defaultValue || tabs[0]?.value || "");
    const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});
    const tabListRef = useRef<HTMLDivElement>(null);
    const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

    const value = controlledValue ?? internalValue;
    const isVertical = orientation === "vertical";

    const handleValueChange = useCallback((newValue: string) => {
      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    }, [controlledValue, onValueChange]);

    // Update indicator position
    const updateIndicator = useCallback(() => {
      if (!animateIndicator || variant === "pills" || variant === "card") return;

      const activeTab = tabRefs.current.get(value);
      const tabList = tabListRef.current;

      if (activeTab && tabList) {
        const tabRect = activeTab.getBoundingClientRect();
        const listRect = tabList.getBoundingClientRect();

        if (isVertical) {
          setIndicatorStyle({
            position: 'absolute',
            right: 0,
            top: activeTab.offsetTop,
            height: tabRect.height,
            width: '2px',
            backgroundColor: 'rgb(59 130 246)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          });
        } else {
          setIndicatorStyle({
            position: 'absolute',
            bottom: 0,
            left: activeTab.offsetLeft,
            width: tabRect.width,
            height: '2px',
            backgroundColor: 'rgb(59 130 246)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          });
        }
      }
    }, [value, animateIndicator, variant, isVertical]);

    // Update indicator on value change or mount
    useEffect(() => {
      updateIndicator();
    }, [updateIndicator]);

    // Update indicator on window resize
    useEffect(() => {
      const handleResize = () => updateIndicator();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, [updateIndicator]);

    const renderTabTrigger = (tab: TabItem) => {
      const isActive = value === tab.value;

      return (
        <button
          key={tab.value}
          ref={(el) => {
            if (el) {
              tabRefs.current.set(tab.value, el);
            } else {
              tabRefs.current.delete(tab.value);
            }
          }}
          onClick={() => !tab.disabled && handleValueChange(tab.value)}
          disabled={tab.disabled}
          data-state={isActive ? "active" : "inactive"}
          className={cn(
            tabTriggerVariants({ variant, orientation })
          )}
          role="tab"
          aria-selected={isActive}
          aria-controls={`panel-${tab.value}`}
          id={`tab-${tab.value}`}
        >
          {tab.icon && (
            <span className="w-4 h-4 flex-shrink-0">
              {tab.icon}
            </span>
          )}
          <span>{tab.label}</span>
          {tab.badge && (
            <span className="ml-2 px-2 py-0.5 bg-blue-500/20 text-blue-200 text-xs rounded-full">
              {tab.badge}
            </span>
          )}
        </button>
      );
    };

    const activeTab = tabs.find(tab => tab.value === value);

    return (
      <div
        ref={ref}
        className={cn(liquidTabsVariants({ variant, orientation }), className)}
        {...props}
      >
        {/* Tab List */}
        <div
          ref={tabListRef}
          className={cn(tabListVariants({ variant, orientation }))}
          role="tablist"
          aria-orientation={orientation}
        >
          {tabs.map(renderTabTrigger)}
          
          {/* Animated Indicator */}
          {animateIndicator && (variant === "default" || variant === "underline") && (
            <div style={indicatorStyle} />
          )}
        </div>

        {/* Tab Panels */}
        <div className={cn(
          "flex-1",
          isVertical && "ml-4"
        )}>
          {tabs.map((tab) => {
            const isActive = value === tab.value;
            
            return (
              <div
                key={tab.value}
                role="tabpanel"
                id={`panel-${tab.value}`}
                aria-labelledby={`tab-${tab.value}`}
                hidden={!isActive}
                className={cn(
                  "focus:outline-none",
                  isActive && "animate-in fade-in-0 duration-200",
                  !isVertical && "pt-6",
                  isVertical && "pl-0"
                )}
                tabIndex={isActive ? 0 : -1}
              >
                {tab.content}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

LiquidTabs.displayName = "LiquidTabs";

// Sub-components for advanced usage
interface LiquidTabsListProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof tabListVariants> {
  children: React.ReactNode;
}

export const LiquidTabsList = React.forwardRef<HTMLDivElement, LiquidTabsListProps>(
  ({ className, variant, orientation, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(tabListVariants({ variant, orientation }), className)}
      role="tablist"
      aria-orientation={orientation}
      {...props}
    >
      {children}
    </div>
  )
);

LiquidTabsList.displayName = "LiquidTabsList";

interface LiquidTabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof tabTriggerVariants> {
  value: string;
  children: React.ReactNode;
}

export const LiquidTabsTrigger = React.forwardRef<HTMLButtonElement, LiquidTabsTriggerProps>(
  ({ className, variant, orientation, value, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(tabTriggerVariants({ variant, orientation }), className)}
      role="tab"
      data-value={value}
      {...props}
    >
      {children}
    </button>
  )
);

LiquidTabsTrigger.displayName = "LiquidTabsTrigger";

interface LiquidTabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  children: React.ReactNode;
}

export const LiquidTabsContent = React.forwardRef<HTMLDivElement, LiquidTabsContentProps>(
  ({ className, value, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("focus:outline-none", className)}
      role="tabpanel"
      data-value={value}
      {...props}
    >
      {children}
    </div>
  )
);

LiquidTabsContent.displayName = "LiquidTabsContent";

export { 
  liquidTabsVariants, 
  tabListVariants, 
  tabTriggerVariants,
  type LiquidTabsProps, 
  type TabItem 
};