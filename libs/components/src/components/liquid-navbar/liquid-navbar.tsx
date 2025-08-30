"use client";

import * as React from "react";
import { useState, useCallback, useEffect } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { LiquidGlass } from "../liquid-glass";
import { LiquidButton } from "../liquid-button";

const liquidNavbarVariants = cva(
  "w-full transition-all duration-300 sticky top-0 z-50",
  {
    variants: {
      variant: {
        default: "bg-white/10 border-b border-white/20 backdrop-blur-xl",
        filled: "bg-white/15 border-b border-white/25 backdrop-blur-2xl",
        transparent: "bg-transparent border-b border-transparent backdrop-blur-sm",
        solid: "bg-white/95 border-b border-white/30 backdrop-blur-3xl"
      },
      size: {
        sm: "h-14 px-4",
        md: "h-16 px-6",
        lg: "h-20 px-8"
      },
      shadow: {
        none: "",
        sm: "shadow-sm shadow-black/5",
        md: "shadow-md shadow-black/10",
        lg: "shadow-lg shadow-black/15"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      shadow: "sm"
    }
  }
);

interface NavItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
}

interface LiquidNavbarProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof liquidNavbarVariants> {
  logo?: React.ReactNode;
  items?: NavItem[];
  actions?: React.ReactNode;
  mobileMenuOpen?: boolean;
  onMobileMenuToggle?: (open: boolean) => void;
  hideOnScroll?: boolean;
  showMobileMenu?: boolean;
}

export const LiquidNavbar = React.forwardRef<HTMLElement, LiquidNavbarProps>(
  ({
    className,
    variant,
    size,
    shadow,
    logo,
    items = [],
    actions,
    mobileMenuOpen = false,
    onMobileMenuToggle,
    hideOnScroll = false,
    showMobileMenu = true,
    children,
    ...props
  }, ref) => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const handleMobileMenuToggle = useCallback(() => {
      const newState = !mobileMenuOpen;
      onMobileMenuToggle?.(newState);
    }, [mobileMenuOpen, onMobileMenuToggle]);

    // Handle scroll behavior
    useEffect(() => {
      if (!hideOnScroll) return;

      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY < 10) {
          setIsVisible(true);
        } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY) {
          setIsVisible(true);
        }
        
        setLastScrollY(currentScrollY);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }, [hideOnScroll, lastScrollY]);

    const HamburgerIcon = () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d={mobileMenuOpen ? "M18 6L6 18M6 6l12 12" : "M3 12h18M3 6h18M3 18h18"} />
      </svg>
    );

    const renderNavItem = (item: NavItem, index: number) => {
      const ItemComponent = item.href ? 'a' : 'button';
      
      return (
        <ItemComponent
          key={`${item.label}-${index}`}
          href={item.href}
          onClick={item.onClick}
          disabled={item.disabled}
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-transparent",
            item.active && "bg-white/15 text-white font-medium",
            item.disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          {item.icon && (
            <span className="w-5 h-5 flex items-center justify-center">
              {item.icon}
            </span>
          )}
          <span className="whitespace-nowrap">{item.label}</span>
        </ItemComponent>
      );
    };

    return (
      <>
        <nav
          ref={ref}
          className={cn(
            liquidNavbarVariants({ variant, size, shadow }),
            !isVisible && "transform -translate-y-full",
            className
          )}
          {...props}
        >
          <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
            {/* Logo Section */}
            {logo && (
              <div className="flex items-center">
                {logo}
              </div>
            )}

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {items.map(renderNavItem)}
            </div>

            {/* Actions & Mobile Menu */}
            <div className="flex items-center gap-3">
              {actions && (
                <div className="hidden sm:flex items-center gap-2">
                  {actions}
                </div>
              )}
              
              {showMobileMenu && items.length > 0 && (
                <LiquidButton
                  variant="ghost"
                  size="sm"
                  onClick={handleMobileMenuToggle}
                  className="md:hidden"
                  aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                >
                  <HamburgerIcon />
                </LiquidButton>
              )}
            </div>
          </div>

          {/* Custom content */}
          {children}
        </nav>

        {/* Mobile Menu Overlay */}
        {showMobileMenu && mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              onClick={() => onMobileMenuToggle?.(false)}
            />
            
            {/* Mobile Menu */}
            <LiquidGlass
              variant="panel"
              intensity="strong"
              className="fixed top-0 right-0 h-full w-80 max-w-[90vw] z-50 md:hidden transform transition-transform duration-300 ease-out"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  {logo && <div className="flex items-center">{logo}</div>}
                  <LiquidButton
                    variant="ghost"
                    size="sm"
                    onClick={handleMobileMenuToggle}
                    aria-label="Close menu"
                  >
                    <HamburgerIcon />
                  </LiquidButton>
                </div>

                {/* Mobile Menu Items */}
                <div className="flex-1 p-6 space-y-2">
                  {items.map((item, index) => {
                    const ItemComponent = item.href ? 'a' : 'button';
                    
                    return (
                      <ItemComponent
                        key={`mobile-${item.label}-${index}`}
                        href={item.href}
                        onClick={() => {
                          item.onClick?.();
                          onMobileMenuToggle?.(false);
                        }}
                        disabled={item.disabled}
                        className={cn(
                          "flex items-center gap-3 w-full p-4 rounded-xl text-left text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200",
                          "focus:outline-none focus:ring-2 focus:ring-blue-500/50",
                          item.active && "bg-white/15 text-white font-medium",
                          item.disabled && "opacity-50 cursor-not-allowed"
                        )}
                      >
                        {item.icon && (
                          <span className="w-6 h-6 flex items-center justify-center">
                            {item.icon}
                          </span>
                        )}
                        <span>{item.label}</span>
                      </ItemComponent>
                    );
                  })}
                </div>

                {/* Mobile Menu Actions */}
                {actions && (
                  <div className="border-t border-white/10 p-6">
                    <div className="flex flex-col gap-3">
                      {actions}
                    </div>
                  </div>
                )}
              </div>
            </LiquidGlass>
          </>
        )}
      </>
    );
  }
);

LiquidNavbar.displayName = "LiquidNavbar";

export { liquidNavbarVariants, type LiquidNavbarProps, type NavItem };