"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { LiquidGlass } from "../liquid-glass";

const liquidBreadcrumbVariants = cva(
  "flex items-center space-x-1 text-sm",
  {
    variants: {
      variant: {
        default: "",
        card: "bg-white/5 rounded-xl px-4 py-2 border border-white/10",
        ghost: "bg-transparent"
      },
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);

const breadcrumbItemVariants = cva(
  "flex items-center transition-colors duration-200",
  {
    variants: {
      clickable: {
        true: "text-white/70 hover:text-white cursor-pointer",
        false: "text-white/90"
      },
      current: {
        true: "text-white font-medium",
        false: ""
      }
    },
    defaultVariants: {
      clickable: false,
      current: false
    }
  }
);

const separatorVariants = cva(
  "flex items-center justify-center text-white/40 mx-2",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm", 
        lg: "text-base"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);

interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface LiquidBreadcrumbProps extends React.HTMLAttributes<HTMLNavElement>, VariantProps<typeof liquidBreadcrumbVariants> {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  maxItems?: number;
  showRoot?: boolean;
  rootLabel?: string;
  collapsedLabel?: string;
}

export const LiquidBreadcrumb = React.forwardRef<HTMLElement, LiquidBreadcrumbProps>(
  ({
    className,
    variant,
    size,
    items,
    separator,
    maxItems,
    showRoot = true,
    rootLabel = "Home",
    collapsedLabel = "...",
    ...props
  }, ref) => {
    // Default separator
    const defaultSeparator = (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
        <path d="M4.22 2.22a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 0 1-1.06-1.06L7.94 6 4.22 3.28a.75.75 0 0 1 0-1.06Z"/>
      </svg>
    );

    const separatorElement = separator ?? defaultSeparator;

    // Process items for display
    const processedItems = React.useMemo(() => {
      let displayItems = [...items];

      // Add root item if showRoot is true and items don't start with root
      if (showRoot && items.length > 0 && items[0].label !== rootLabel) {
        displayItems.unshift({
          label: rootLabel,
          href: "/",
        });
      }

      // Handle maxItems truncation
      if (maxItems && displayItems.length > maxItems) {
        const start = displayItems.slice(0, 1); // Keep first item (usually home)
        const end = displayItems.slice(-(maxItems - 2)); // Keep last (maxItems - 2) items
        
        return [
          ...start,
          { label: collapsedLabel, disabled: true },
          ...end
        ];
      }

      return displayItems;
    }, [items, showRoot, rootLabel, maxItems, collapsedLabel]);

    const renderBreadcrumbItem = (item: BreadcrumbItem, index: number, isLast: boolean) => {
      const ItemComponent = item.href && !item.disabled ? 'a' : 'span';
      const isClickable = (item.href || item.onClick) && !item.disabled;
      const isCurrent = isLast && !item.disabled;

      const itemContent = (
        <ItemComponent
          href={item.href}
          onClick={item.onClick}
          className={cn(
            breadcrumbItemVariants({ 
              clickable: isClickable, 
              current: isCurrent 
            }),
            item.disabled && "opacity-50 cursor-not-allowed",
            isClickable && "focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-transparent rounded-md px-1 py-0.5"
          )}
          aria-current={isCurrent ? "page" : undefined}
          aria-disabled={item.disabled}
        >
          {item.icon && (
            <span className="w-4 h-4 mr-1.5 flex-shrink-0">
              {item.icon}
            </span>
          )}
          <span className="truncate">{item.label}</span>
        </ItemComponent>
      );

      return (
        <React.Fragment key={`${item.label}-${index}`}>
          <li className="flex items-center">
            {itemContent}
          </li>
          
          {!isLast && (
            <li className={cn(separatorVariants({ size }))} aria-hidden="true">
              {separatorElement}
            </li>
          )}
        </React.Fragment>
      );
    };

    const content = (
      <ol className="flex items-center space-x-1">
        {processedItems.map((item, index) =>
          renderBreadcrumbItem(item, index, index === processedItems.length - 1)
        )}
      </ol>
    );

    if (variant === "card") {
      return (
        <nav
          ref={ref}
          aria-label="Breadcrumb"
          className={cn(liquidBreadcrumbVariants({ variant, size }), className)}
          {...props}
        >
          <LiquidGlass
            variant="card"
            intensity="subtle"
            className="w-full"
          >
            {content}
          </LiquidGlass>
        </nav>
      );
    }

    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cn(liquidBreadcrumbVariants({ variant, size }), className)}
        {...props}
      >
        {content}
      </nav>
    );
  }
);

LiquidBreadcrumb.displayName = "LiquidBreadcrumb";

// Sub-components for advanced usage
interface LiquidBreadcrumbListProps extends React.OlHTMLAttributes<HTMLOListElement> {
  children: React.ReactNode;
}

export const LiquidBreadcrumbList = React.forwardRef<HTMLOListElement, LiquidBreadcrumbListProps>(
  ({ className, children, ...props }, ref) => (
    <ol
      ref={ref}
      className={cn("flex items-center space-x-1", className)}
      {...props}
    >
      {children}
    </ol>
  )
);

LiquidBreadcrumbList.displayName = "LiquidBreadcrumbList";

interface LiquidBreadcrumbItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
}

export const LiquidBreadcrumbItem = React.forwardRef<HTMLLIElement, LiquidBreadcrumbItemProps>(
  ({ className, children, ...props }, ref) => (
    <li
      ref={ref}
      className={cn("flex items-center", className)}
      {...props}
    >
      {children}
    </li>
  )
);

LiquidBreadcrumbItem.displayName = "LiquidBreadcrumbItem";

interface LiquidBreadcrumbLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean;
  children: React.ReactNode;
}

export const LiquidBreadcrumbLink = React.forwardRef<HTMLAnchorElement, LiquidBreadcrumbLinkProps>(
  ({ className, asChild, children, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : "a";

    return (
      <Comp
        ref={asChild ? undefined : ref}
        className={asChild ? undefined : cn(
          "text-white/70 hover:text-white transition-colors duration-200",
          "focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-transparent rounded-md px-1 py-0.5",
          className
        )}
        {...(asChild ? {} : props)}
      >
        {children}
      </Comp>
    );
  }
);

LiquidBreadcrumbLink.displayName = "LiquidBreadcrumbLink";

interface LiquidBreadcrumbPageProps extends React.SpanHTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export const LiquidBreadcrumbPage = React.forwardRef<HTMLSpanElement, LiquidBreadcrumbPageProps>(
  ({ className, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn("text-white font-medium", className)}
      aria-current="page"
      {...props}
    >
      {children}
    </span>
  )
);

LiquidBreadcrumbPage.displayName = "LiquidBreadcrumbPage";

interface LiquidBreadcrumbSeparatorProps extends React.LiHTMLAttributes<HTMLLIElement> {
  children?: React.ReactNode;
}

export const LiquidBreadcrumbSeparator = React.forwardRef<HTMLLIElement, LiquidBreadcrumbSeparatorProps>(
  ({ className, children, ...props }, ref) => (
    <li
      ref={ref}
      className={cn("flex items-center justify-center text-white/40 mx-2", className)}
      aria-hidden="true"
      {...props}
    >
      {children ?? (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
          <path d="M4.22 2.22a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 0 1-1.06-1.06L7.94 6 4.22 3.28a.75.75 0 0 1 0-1.06Z"/>
        </svg>
      )}
    </li>
  )
);

LiquidBreadcrumbSeparator.displayName = "LiquidBreadcrumbSeparator";

export { 
  liquidBreadcrumbVariants,
  breadcrumbItemVariants,
  separatorVariants,
  type LiquidBreadcrumbProps, 
  type BreadcrumbItem 
};