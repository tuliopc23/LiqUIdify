import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import {
  cn,
  focusRing,
  getGlassClass,
  microInteraction,
} from "@/core/utils/classname";
import {
  createVariants as cva,
  type InferVariantProps as VariantProps,
} from "../../lib/variant-system";

const mobileNavVariants = cva({
  base: "relative",
  variants: {
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const hamburgerVariants = cva({
  base: cn(
    "flex items-center justify-center rounded-xl p-2",
    getGlassClass("default"),
    "hover:bg-[var(--liquid-glass-bg-elevated)]",
    focusRing,
    microInteraction.gentle,
    "transition-all duration-200",
  ),
  variants: {
    size: {
      sm: "p-1.5",
      md: "p-2",
      lg: "p-3",
    },
    isOpen: {
      true: "bg-[var(--liquid-glass-bg-elevated)]",
      false: "",
    },
  },
  defaultVariants: {
    size: "md",
    isOpen: "false",
  },
});

const overlayVariants = cva({
  base: "fixed inset-0 z-50 liquid-glass backdrop-blur-liquid-main border-0",
  variants: {},
});

const drawerVariants = cva({
  base: cn(
    "fixed inset-y-0 right-0 z-50 w-80 max-w-[85vw]",
    getGlassClass("elevated"),
    "border-l border-[var(--liquid-glass-border)]",
    "flex flex-col",
  ),
  variants: {
    position: {
      left: "left-0 border-r border-l-0",
      right: "right-0 border-l",
    },
  },
  defaultVariants: {
    position: "right",
  },
});

const navItemVariants = cva({
  base: cn(
    "flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left",
    "text-[var(--text-primary)] hover:bg-[var(--liquid-glass-bg)]",
    "transition-all duration-200",
    focusRing,
    microInteraction.gentle,
  ),
  variants: {
    size: {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-3 text-base",
      lg: "px-5 py-4 text-lg",
    },
    isActive: {
      true: "bg-liquid-accent/20 text-liquid-accent border-l-2 border-liquid-accent",
      false: "",
    },
  },
  defaultVariants: {
    size: "md",
    isActive: "false",
  },
});

export interface NavItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
  children?: Array<NavItem>;
}

interface GlassMobileNavProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof mobileNavVariants> {
  items: Array<NavItem>;
  activeItemId?: string;
  onItemClick?: (item: NavItem) => void;
  position?: "left" | "right";
  showOverlay?: boolean;
  closeOnItemClick?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  hamburgerLabel?: string;
  size?: "sm" | "md" | "lg";
}

const GlassMobileNav = forwardRef<HTMLDivElement, GlassMobileNavProps>(
  (
    {
      className,
      items,
      activeItemId,
      onItemClick,
      position = "right",
      showOverlay = true,
      closeOnItemClick = true,
      header,
      footer,
      hamburgerLabel = "Open navigation menu",
      size,
      ...props
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

    const hamburgerRef = useRef<HTMLButtonElement>(null);
    const drawerRef = useRef<HTMLDivElement>(null);
    const navId = useId();

    // Handle item click
    const handleItemClick = useCallback(
      (item: NavItem) => {
        if (item.disabled) return;

        // Handle expandable items
        if (item.children && item.children.length > 0) {
          setExpandedItems((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(item.id)) {
              newSet.delete(item.id);
            } else {
              newSet.add(item.id);
            }
            return newSet;
          });
          return;
        }

        // Handle regular items
        if (item.onClick) {
          item.onClick();
        }

        onItemClick?.(item);

        if (closeOnItemClick) {
          setIsOpen(false);
        }
      },
      [onItemClick, closeOnItemClick],
    );

    // Handle keyboard navigation
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        hamburgerRef.current?.focus();
      }
    }, []);

    // Handle click outside
    useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (event: MouseEvent) => {
        if (
          drawerRef.current &&
          !drawerRef.current.contains(event.target as Node) &&
          hamburgerRef.current &&
          !hamburgerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    // Focus management
    useEffect(() => {
      if (isOpen) {
        // Focus first focusable element in drawer
        const firstFocusable = drawerRef.current?.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ) as HTMLElement;
        firstFocusable?.focus();
      }
    }, [isOpen]);

    // Prevent body scroll when open
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }

      return () => {
        document.body.style.overflow = "";
      };
    }, [isOpen]);

    // Render navigation item
    const renderNavItem = (item: NavItem, level = 0) => {
      const isActive = activeItemId === item.id;
      const isExpanded = expandedItems.has(item.id);
      const hasChildren = item.children && item.children.length > 0;

      return (
        <div key={item.id}>
          <button
            type="button"
            onClick={() => handleItemClick(item)}
            disabled={item.disabled}
            className={cn(
              navItemVariants({
                ...{ size, isActive: isActive ? "true" : "false" },
              } as any),
              item.disabled && "opacity-50 cursor-not-allowed",
              level > 0 &&
                "ml-4 border-l border-[var(--liquid-glass-border)] pl-4",
            )}
            aria-expanded={hasChildren ? isExpanded : undefined}
            aria-current={isActive ? "page" : undefined}
          >
            {item.icon && (
              <span className="flex-shrink-0 text-[var(--text-secondary)]">
                {item.icon}
              </span>
            )}

            <span className="flex-1 text-left">{item.label}</span>

            {item.badge && (
              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-blue-500 px-1.5 text-xs font-medium text-liquid-text-inverse">
                {item.badge}
              </span>
            )}

            {hasChildren && (
              <motion.div
                animate={{ rotate: isExpanded ? 90 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex-shrink-0"
              >
                <svg
                  className="h-4 w-4 text-[var(--text-secondary)]"
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
              </motion.div>
            )}
          </button>

          {/* Render children */}
          <AnimatePresence>
            {hasChildren && isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="py-1">
                  {item.children?.map((child) =>
                    renderNavItem(child, level + 1),
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    };

    const drawerContent = (
      <motion.div
        ref={drawerRef}
        initial={{ x: position === "right" ? "100%" : "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: position === "right" ? "100%" : "-100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={cn(drawerVariants({ ...{ position } } as any))}
        onKeyDown={handleKeyDown}
        role="navigation"
        aria-labelledby={`${navId}-label`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--liquid-glass-border)] p-4">
          {header || (
            <h2
              id={`${navId}-label`}
              className="text-lg font-semibold text-[var(--text-primary)]"
            >
              Navigation
            </h2>
          )}

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className={cn(
              "rounded-lg p-2 text-[var(--text-secondary)]",
              "hover:bg-[var(--liquid-glass-bg)] hover:text-[var(--text-primary)]",
              focusRing,
              microInteraction.gentle,
            )}
            aria-label="Close navigation menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto p-4">
          <nav className="space-y-1">
            {items.map((item) => renderNavItem(item))}
          </nav>
        </div>

        {/* Footer */}
        {footer && (
          <div className="border-t border-[var(--liquid-glass-border)] p-4">
            {footer}
          </div>
        )}
      </motion.div>
    );

    return (
      <div
        ref={ref}
        className={cn(mobileNavVariants({ ...{ size } } as any), className)}
        {...props}
      >
        {/* Hamburger Button */}
        <button
          ref={hamburgerRef}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            hamburgerVariants({
              ...{ size, isOpen: isOpen ? "true" : "false" },
            } as any),
          )}
          aria-label={hamburgerLabel}
          aria-expanded={isOpen}
          aria-controls={navId}
        >
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? (
              <X className="h-5 w-5 text-[var(--text-primary)]" />
            ) : (
              <Menu className="h-5 w-5 text-[var(--text-primary)]" />
            )}
          </motion.div>
        </button>

        {/* Mobile Navigation Drawer */}
        {typeof window !== "undefined" &&
          createPortal(
            <AnimatePresence>
              {isOpen && (
                <>
                  {/* Overlay */}
                  {showOverlay && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className={cn(overlayVariants())}
                      onClick={() => setIsOpen(false)}
                    />
                  )}

                  {/* Drawer */}
                  {drawerContent}
                </>
              )}
            </AnimatePresence>,
            document.body,
          )}
      </div>
    );
  },
);

GlassMobileNav.displayName = "GlassMobileNav";

export { GlassMobileNav };
export default GlassMobileNav;
