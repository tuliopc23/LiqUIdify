import React, { useState, useRef, useEffect } from "react";
import { cn } from "../../core/utils/classname";

interface NavbarProps {
  /** Content for the left side (logo/brand) */
  brand?: React.ReactNode;
  /** Navigation items */
  children?: React.ReactNode;
  /** Content for the right side (actions/user menu) */
  actions?: React.ReactNode;
  /** Navbar position */
  position?: "static" | "fixed" | "sticky";
  /** Whether navbar is transparent */
  transparent?: boolean;
  /** Custom className */
  className?: string;
  /** Height variant */
  height?: "sm" | "md" | "lg";
  /** Show shadow */
  shadow?: boolean;
  /** Blur background on scroll */
  blurOnScroll?: boolean;
  /** Hide on scroll down */
  hideOnScroll?: boolean;
  /** Background color (for non-transparent) */
  bgColor?: string;
  /** Z-index */
  zIndex?: number;
}

const heightMap = {
  sm: "h-14",
  md: "h-16",
  lg: "h-20",
};

const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  (
    {
      brand,
      children,
      actions,
      position = "sticky",
      transparent = false,
      className,
      height = "md",
      shadow = true,
      blurOnScroll = true,
      hideOnScroll = false,
      bgColor,
      zIndex = 50,
    },
    ref,
  ) => {
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
      if (!blurOnScroll && !hideOnScroll) return;

      const handleScroll = () => {
        const currentScrollY = window.scrollY;

        // Handle blur on scroll
        if (blurOnScroll) {
          setScrolled(currentScrollY > 10);
        }

        // Handle hide on scroll
        if (hideOnScroll) {
          if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
            setHidden(true);
          } else {
            setHidden(false);
          }
        }

        lastScrollY.current = currentScrollY;
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }, [blurOnScroll, hideOnScroll]);

    const positionClasses = {
      static: "",
      fixed: "fixed inset-x-0 top-0",
      sticky: "sticky top-0",
    };

    return (
      <nav
        ref={ref}
        className={cn(
          "w-full transition-all duration-300",
          heightMap[height],
          positionClasses[position],
          hidden && "-translate-y-full",
          className,
        )}
        style={{ zIndex }}
      >
        <div
          className={cn(
            "h-full flex items-center justify-between px-4 md:px-6 lg:px-8",
            transparent && !scrolled
              ? "bg-transparent backdrop-blur-none border-transparent"
              : "",
            shadow && scrolled && "shadow-lg",
            bgColor && !transparent && `bg-${bgColor}`,
          )}
        >
          {/* Brand Section */}
          {brand && (
            <div className="flex items-center flex-shrink-0">{brand}</div>
          )}

          {/* Navigation Items */}
          {children && (
            <div className="flex items-center space-x-1 md:space-x-2 flex-1 justify-center">
              {children}
            </div>
          )}

          {/* Actions Section */}
          {actions && (
            <div className="flex items-center space-x-2 md:space-x-4 flex-shrink-0">
              {actions}
            </div>
          )}
        </div>
      </nav>
    );
  },
);

Navbar.displayName = "Navbar";

// NavbarItem component for consistent navigation items
interface NavbarItemProps {
  /** Link href */
  href?: string;
  /** Active state */
  active?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Item content */
  children: React.ReactNode;
  /** Custom className */
  className?: string;
  /** Disabled state */
  disabled?: boolean;
}

const NavbarItem = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  NavbarItemProps
>(({ href, active, onClick, children, className, disabled }, ref) => {
  const Component = href ? "a" : "button";

  return (
    <Component
      ref={ref as any}
      href={href}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "px-3 py-2 rounded-lg text-sm font-medium transition-all",
        "hover:bg-white/10 active:bg-white/20",
        active && "bg-white/15 text-primary",
        disabled && "opacity-50 cursor-not-allowed",
        !active && !disabled && "text-gray-700 dark:text-gray-300",
        className,
      )}
    >
      {children}
    </Component>
  );
});

NavbarItem.displayName = "NavbarItem";

// NavbarDivider for visual separation
const NavbarDivider: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn("h-6 w-px bg-gray-300 dark:bg-gray-700", className)} />
);
