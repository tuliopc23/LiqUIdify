"use client";

import * as React from "react";
import { useState, useCallback, useEffect } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { LiquidGlass } from "../liquid-glass";
import { LiquidButton } from "../liquid-button";

const liquidSidebarVariants = cva(
  "fixed top-0 h-full transition-all duration-300 ease-out z-40",
  {
    variants: {
      variant: {
        default: "bg-white/10 border-r border-white/20 backdrop-blur-xl",
        filled: "bg-white/15 border-r border-white/25 backdrop-blur-2xl",
        transparent: "bg-white/5 border-r border-white/10 backdrop-blur-sm",
        solid: "bg-white/95 border-r border-white/30 backdrop-blur-3xl"
      },
      side: {
        left: "left-0",
        right: "right-0"
      },
      size: {
        sm: "w-64",
        md: "w-80", 
        lg: "w-96",
        xl: "w-[28rem]"
      },
      collapsible: {
        true: "",
        false: ""
      }
    },
    compoundVariants: [
      {
        collapsible: true,
        class: "data-[collapsed=true]:w-16"
      }
    ],
    defaultVariants: {
      variant: "default",
      side: "left",
      size: "md",
      collapsible: false
    }
  }
);

interface SidebarItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  badge?: string | number;
  children?: SidebarItem[];
}

interface SidebarSection {
  title?: string;
  items: SidebarItem[];
}

interface LiquidSidebarProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof liquidSidebarVariants> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  sections?: SidebarSection[];
  header?: React.ReactNode;
  footer?: React.ReactNode;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  showOverlay?: boolean;
  closeOnClickOutside?: boolean;
}

export const LiquidSidebar = React.forwardRef<HTMLDivElement, LiquidSidebarProps>(
  ({
    className,
    variant,
    side,
    size,
    collapsible,
    open = true,
    onOpenChange,
    sections = [],
    header,
    footer,
    collapsed = false,
    onCollapsedChange,
    showOverlay = true,
    closeOnClickOutside = true,
    children,
    ...props
  }, ref) => {
    const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set());

    const handleToggleSection = useCallback((sectionIndex: number) => {
      setExpandedSections(prev => {
        const newSet = new Set(prev);
        if (newSet.has(sectionIndex)) {
          newSet.delete(sectionIndex);
        } else {
          newSet.add(sectionIndex);
        }
        return newSet;
      });
    }, []);

    const handleToggleCollapsed = useCallback(() => {
      if (collapsible) {
        onCollapsedChange?.(!collapsed);
      }
    }, [collapsible, collapsed, onCollapsedChange]);

    const handleOverlayClick = useCallback(() => {
      if (closeOnClickOutside) {
        onOpenChange?.(false);
      }
    }, [closeOnClickOutside, onOpenChange]);

    // Close sidebar on escape key
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && open) {
          onOpenChange?.(false);
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [open, onOpenChange]);

    const ChevronIcon = ({ expanded }: { expanded: boolean }) => (
      <svg 
        width="16" 
        height="16" 
        viewBox="0 0 16 16" 
        fill="currentColor"
        className={cn(
          "transition-transform duration-200",
          expanded && "transform rotate-90"
        )}
      >
        <path d="M6.22 4.22a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z"/>
      </svg>
    );

    const CollapseIcon = () => (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M9.78 4.22a.75.75 0 0 1 0 1.06L7.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L5.47 8.53a.75.75 0 0 1 0-1.06l3.25-3.25a.75.75 0 0 1 1.06 0Z"/>
      </svg>
    );

    const renderSidebarItem = (item: SidebarItem, itemIndex: number, sectionIndex: number, depth = 0) => {
      const hasChildren = item.children && item.children.length > 0;
      const isExpanded = expandedSections.has(sectionIndex * 1000 + itemIndex);
      const ItemComponent = item.href ? 'a' : 'button';

      return (
        <div key={`${sectionIndex}-${itemIndex}-${depth}`}>
          <ItemComponent
            href={item.href}
            onClick={() => {
              if (hasChildren) {
                handleToggleSection(sectionIndex * 1000 + itemIndex);
              } else {
                item.onClick?.();
              }
            }}
            disabled={item.disabled}
            className={cn(
              "flex items-center w-full px-3 py-2 text-left text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-transparent",
              item.active && "bg-white/15 text-white font-medium",
              item.disabled && "opacity-50 cursor-not-allowed",
              depth > 0 && "ml-6",
              collapsed && !depth && "justify-center px-2"
            )}
          >
            {/* Icon */}
            {item.icon && (
              <span className={cn(
                "flex-shrink-0 w-5 h-5 flex items-center justify-center",
                !collapsed && "mr-3"
              )}>
                {item.icon}
              </span>
            )}

            {/* Label */}
            {!collapsed && (
              <span className="flex-1 truncate">{item.label}</span>
            )}

            {/* Badge */}
            {!collapsed && item.badge && (
              <span className="ml-2 px-2 py-0.5 bg-blue-500/20 text-blue-200 text-xs rounded-full">
                {item.badge}
              </span>
            )}

            {/* Expand/Collapse Arrow */}
            {!collapsed && hasChildren && (
              <span className="ml-2 flex-shrink-0">
                <ChevronIcon expanded={isExpanded} />
              </span>
            )}
          </ItemComponent>

          {/* Children */}
          {!collapsed && hasChildren && isExpanded && (
            <div className="mt-1 space-y-1">
              {item.children?.map((child, childIndex) =>
                renderSidebarItem(child, childIndex, sectionIndex, depth + 1)
              )}
            </div>
          )}
        </div>
      );
    };

    const renderSection = (section: SidebarSection, sectionIndex: number) => {
      return (
        <div key={sectionIndex} className="space-y-2">
          {/* Section Title */}
          {!collapsed && section.title && (
            <div className="px-3 py-2">
              <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                {section.title}
              </h3>
            </div>
          )}

          {/* Section Items */}
          <div className="space-y-1">
            {section.items.map((item, itemIndex) =>
              renderSidebarItem(item, itemIndex, sectionIndex)
            )}
          </div>
        </div>
      );
    };

    return (
      <>
        {/* Overlay */}
        {showOverlay && open && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
            onClick={handleOverlayClick}
          />
        )}

        {/* Sidebar */}
        <LiquidGlass
          ref={ref}
          variant="panel"
          intensity="medium"
          className={cn(
            liquidSidebarVariants({ variant, side, size, collapsible }),
            !open && (side === "left" ? "-translate-x-full" : "translate-x-full"),
            "lg:translate-x-0",
            className
          )}
          data-collapsed={collapsed}
          {...props}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            {header && (
              <div className={cn(
                "flex-shrink-0 p-4 border-b border-white/10",
                collapsed && "px-2"
              )}>
                <div className="flex items-center justify-between">
                  {!collapsed && <div className="flex-1">{header}</div>}
                  
                  {collapsible && (
                    <LiquidButton
                      variant="ghost"
                      size="sm"
                      onClick={handleToggleCollapsed}
                      className={cn(collapsed && "mx-auto")}
                      aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                      <CollapseIcon />
                    </LiquidButton>
                  )}
                </div>
              </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {sections.map(renderSection)}
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div className={cn(
                "flex-shrink-0 p-4 border-t border-white/10",
                collapsed && "px-2"
              )}>
                {footer}
              </div>
            )}
          </div>
        </LiquidGlass>
      </>
    );
  }
);

LiquidSidebar.displayName = "LiquidSidebar";

export { liquidSidebarVariants, type LiquidSidebarProps, type SidebarItem, type SidebarSection };