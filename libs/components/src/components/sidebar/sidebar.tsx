import React, { useState, useEffect } from "react";
import { cn } from "../../core/utils/classname";
import { GlassButton } from "../glass-button-refactored";

interface SidebarProps {
  /** Sidebar content */
  children: React.ReactNode;
  /** Open state (controlled) */
  open?: boolean;
  /** Default open state (uncontrolled) */
  defaultOpen?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Sidebar position */
  position?: "left" | "right";
  /** Sidebar width */
  width?: "sm" | "md" | "lg" | "full";
  /** Overlay behavior */
  overlay?: boolean;
  /** Push content instead of overlay */
  push?: boolean;
  /** Collapsible on desktop */
  collapsible?: boolean;
  /** Collapsed width when collapsible */
  collapsedWidth?: string;
  /** Custom className */
  className?: string;
  /** Header content */
  header?: React.ReactNode;
  /** Footer content */
  footer?: React.ReactNode;
  /** Z-index */
  zIndex?: number;
  /** Close on overlay click */
  closeOnOverlayClick?: boolean;
  /** Close on escape key */
  closeOnEsc?: boolean;
}

const widthMap = {
  sm: "w-64",
  md: "w-80",
  lg: "w-96",
  full: "w-full max-w-md",
};

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      children,
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      position = "left",
      width = "md",
      overlay = true,
      push = false,
      collapsible = false,
      collapsedWidth = "4rem",
      className,
      header,
      footer,
      zIndex = 40,
      closeOnOverlayClick = true,
      closeOnEsc = true,
    },
    ref,
  ) => {
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : internalOpen;

    const handleOpenChange = (newOpen: boolean) => {
      if (!isControlled) {
        setInternalOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    };

    // Handle escape key
    useEffect(() => {
      if (!closeOnEsc || !open) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          handleOpenChange(false);
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [closeOnEsc, open]);

    // Handle body scroll lock on mobile
    useEffect(() => {
      if (!overlay || !open) return;

      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        document.body.style.overflow = "hidden";
        return () => {
          document.body.style.overflow = "";
        };
      }
    }, [overlay, open]);

    const positionClasses = {
      left: {
        sidebar: "left-0",
        translate: "-translate-x-full",
        rounded: "rounded-r-xl",
      },
      right: {
        sidebar: "right-0",
        translate: "translate-x-full",
        rounded: "rounded-l-xl",
      },
    };

    const sidebarContent = (
      <div
        ref={ref}
        className={cn(
          "h-full flex flex-col",
          positionClasses[position].rounded,
          className,
        )}
      >
        {/* Header */}
        {header && (
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            {header}
            {overlay && (
              <GlassButton
                size="sm"
                variant="ghost"
                onClick={() => handleOpenChange(false)}
                className="md:hidden"
                aria-label="Close sidebar"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </GlassButton>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">{children}</div>

        {/* Footer */}
        {footer && <div className="p-4 border-t border-white/10">{footer}</div>}
      </div>
    );

    if (push) {
      // Push mode: sidebar pushes content
      return (
        <div
          className={cn(
            "fixed top-0 h-full transition-all duration-300",
            widthMap[width],
            positionClasses[position].sidebar,
            !open && positionClasses[position].translate,
            collapsible &&
              !open &&
              `${widthMap[width]} md:w-[${collapsedWidth}]`,
          )}
          style={{ zIndex }}
        >
          {sidebarContent}
        </div>
      );
    }

    // Overlay mode: sidebar overlays content
    return (
      <>
        {/* Overlay backdrop */}
        {overlay && open && (
          <div
            className="fixed inset-0 bg-black/50 transition-opacity md:hidden"
            style={{ zIndex: zIndex - 1 }}
            onClick={
              closeOnOverlayClick ? () => handleOpenChange(false) : undefined
            }
          />
        )}

        {/* Sidebar */}
        <div
          className={cn(
            "fixed top-0 h-full transition-transform duration-300",
            widthMap[width],
            positionClasses[position].sidebar,
            !open && positionClasses[position].translate,
            overlay && "md:sticky md:translate-x-0",
          )}
          style={{ zIndex }}
        >
          {sidebarContent}
        </div>
      </>
    );
  },
);

Sidebar.displayName = "Sidebar";

// SidebarItem component for consistent navigation items
interface SidebarItemProps {
  /** Icon */
  icon?: React.ReactNode;
  /** Label */
  label: string;
  /** Link href */
  href?: string;
  /** Active state */
  active?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Children items for nested navigation */
  children?: React.ReactNode;
  /** Collapsed state (for nested items) */
  collapsed?: boolean;
  /** Custom className */
  className?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Badge content */
  badge?: React.ReactNode;
}

const SidebarItem = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  SidebarItemProps
>(
  (
    {
      icon,
      label,
      href,
      active,
      onClick,
      children,
      collapsed = true,
      className,
      disabled,
      badge,
    },
    ref,
  ) => {
    const Component = href ? "a" : "button";

    return (
      <div className="w-full">
        <Component
          ref={ref as any}
          href={href}
          onClick={onClick}
          disabled={disabled}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all",
            "hover:bg-white/10 active:bg-white/20",
            active && "bg-white/15 text-primary font-medium",
            disabled && "opacity-50 cursor-not-allowed",
            !active && !disabled && "text-gray-700 dark:text-gray-300",
            className,
          )}
        >
          {icon && <span className="flex-shrink-0">{icon}</span>}
          <span className="flex-1 text-left">{label}</span>
          {badge && <span className="flex-shrink-0">{badge}</span>}
          {children && (
            <svg
              className={cn(
                "w-4 h-4 transition-transform",
                !collapsed && "rotate-90",
              )}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
        </Component>
        {children && !collapsed && (
          <div className="ml-6 mt-1 space-y-1">{children}</div>
        )}
      </div>
    );
  },
);

SidebarItem.displayName = "SidebarItem";

// SidebarSection for grouping items
interface SidebarSectionProps {
  /** Section title */
  title?: string;
  /** Section content */
  children: React.ReactNode;
  /** Custom className */
  className?: string;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({
  title,
  children,
  className,
}) => (
  <div className={cn("mb-6", className)}>
    {title && (
      <h3 className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
        {title}
      </h3>
    )}
    <div className="space-y-1">{children}</div>
  </div>
);

// SidebarDivider for visual separation
const SidebarDivider: React.FC<{ className?: string }> = ({ className }) => (
  <hr className={cn("my-4 border-white/10", className)} />
);
