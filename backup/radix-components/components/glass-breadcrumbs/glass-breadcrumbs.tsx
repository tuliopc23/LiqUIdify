import { motion } from "framer-motion";
import { ChevronRight, Home } from "lucide-react";
import React, { useCallback } from "react";
import { getItemKey } from "@/core/utils/stable-key";
import { cn } from "../../core/utils/classname";
import {
  createVariants as cva,
  type InferVariantProps as VariantProps,
} from "../../lib/variant-system";

const breadcrumbsVariants = cva({
  base: "flex items-center space-x-1 rounded-lg border border-blue-300/20 p-2 text-sm ",
  variants: {
    size: {
      sm: "p-1.5 text-xs",
      md: "p-2 text-sm",
      lg: "p-3 text-base",
    },
    variant: {
      default: "/5",
      solid: "/10",
      ghost: "border-transparent bg-transparent",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
  },
});

const breadcrumbItemVariants = cva({
  base: "flex items-center rounded px-2 py-1 transition-all duration-200 hover:text-blue-600 focus:text-blue-600 focus:outline-none",
  variants: {
    isActive: {
      true: "font-medium text-blue-600",
      false: "text-blue-900 hover:text-blue-600",
    },
    isClickable: {
      true: "cursor-pointer hover:/10 hover:border-blue-500/30",
      false: "cursor-default",
    },
  },
  defaultVariants: {
    ...({ isActive: "false" } as any),
    isClickable: "true",
  },
});

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

interface GlassBreadcrumbsProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof React.AriaAttributes>,
    VariantProps<typeof breadcrumbsVariants> {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  showHome?: boolean;
  onHomeClick?: () => void;
  maxItems?: number;
  variant?: "default" | "solid" | "ghost";
  size?: "sm" | "md" | "lg";
}

const GlassBreadcrumbs = React.memo(
  React.forwardRef<HTMLElement, GlassBreadcrumbsProps>(
    (
      {
        className,
        items,
        separator = <ChevronRight className="h-4 w-4 text-blue-900/40" />,
        showHome = true,
        onHomeClick,
        maxItems,
        size,
        variant,
        ...props
      },
      ref
    ) => {
      // Truncate items if maxItems is specified
      const displayItems =
        maxItems && items.length > maxItems
          ? [
              ...items.slice(0, 1),
              {
                label: "...",
              } as BreadcrumbItem,
              ...items.slice(-(maxItems - 2)),
            ]
          : items;

      const handleItemClick = useCallback((item: BreadcrumbItem, _index: number) => {
        if (item.onClick) {
          item.onClick();
        } else if (item.href) {
          // In a real app, you'd handle navigation here
          // Navigation handled by onClick prop
        }
      }, []);

      return (
        <nav
          ref={ref}
          className={cn("", breadcrumbsVariants({ size, variant } as any), className)}
          aria-label="Breadcrumb"
          {...props}
        >
          <ol className="flex items-center space-x-1">
            {showHome && (
              <>
                <li>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onHomeClick}
                    className={cn(
                      breadcrumbItemVariants({
                        ...({ isActive: "false" } as any),
                        isClickable: "true",
                      })
                    )}
                    aria-label="Home"
                  >
                    <Home className="h-4 w-4" />
                  </motion.button>
                </li>
                {displayItems.length > 0 && <li className="flex items-center">{separator}</li>}
              </>
            )}

            {displayItems.map((item, index) => {
              const isLast = index === displayItems.length - 1;
              const isClickable = !isLast && (item.href || item.onClick) && item.label !== "...";

              const handleClick = () => handleItemClick(item, index);

              return (
                <React.Fragment key={getItemKey(item, "breadcrumb", index)}>
                  <li>
                    {isClickable ? (
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleClick}
                        className={cn(
                          breadcrumbItemVariants({
                            ...({ isActive: isLast ? "true" : "false" } as any),
                            isClickable: "true",
                          })
                        )}
                        aria-current={isLast ? "page" : undefined}
                      >
                        {item.icon && <span className="mr-1.5">{item.icon}</span>}
                        {item.label}
                      </motion.button>
                    ) : (
                      <span
                        className={cn(
                          breadcrumbItemVariants({
                            ...({ isActive: isLast ? "true" : "false" } as any),
                            isClickable: "false",
                          })
                        )}
                        aria-current={isLast ? "page" : undefined}
                      >
                        {item.icon && <span className="mr-1.5">{item.icon}</span>}
                        {item.label}
                      </span>
                    )}
                  </li>

                  {!isLast && <li className="flex items-center">{separator}</li>}
                </React.Fragment>
              );
            })}
          </ol>
        </nav>
      );
    }
  )
);

GlassBreadcrumbs.displayName = "GlassBreadcrumbs";

export { GlassBreadcrumbs };
export default GlassBreadcrumbs;
