"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";
import { LiquidGlass } from "../liquid-glass";

const liquidHoverCardVariants = cva(
  "z-50 w-64 rounded-lg p-4 shadow-lg outline-none animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
  {
    variants: {
      variant: {
        default: "bg-white/10 backdrop-blur-md border border-white/20",
        glass: "bg-white/5 backdrop-blur-lg border border-white/10",
        solid: "bg-white/20 backdrop-blur-sm border border-white/30",
        ghost: "bg-white/5 backdrop-blur-xl border border-white/5",
      },
      size: {
        sm: "w-48 p-3",
        md: "w-64 p-4",
        lg: "w-80 p-5",
        xl: "w-96 p-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const hoverCardContentVariants = cva("space-y-2", {
  variants: {
    align: {
      start: "text-left",
      center: "text-center",
      end: "text-right",
    },
  },
  defaultVariants: {
    align: "start",
  },
});

interface LiquidHoverCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof liquidHoverCardVariants> {
  trigger: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  alignOffset?: number;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  openDelay?: number;
  closeDelay?: number;
  disabled?: boolean;
  avoidCollisions?: boolean;
  sticky?: "partial" | "always";
}

export const LiquidHoverCard = React.forwardRef<HTMLDivElement, LiquidHoverCardProps>(
  (
    {
      className,
      variant,
      size,
      trigger,
      children,
      side = "bottom",
      align = "center",
      sideOffset = 8,
      alignOffset = 0,
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      openDelay = 700,
      closeDelay = 300,
      disabled = false,
      avoidCollisions = true,
      sticky = "partial",
      ...props
    },
    _ref
  ) => {
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
    const [isHovering, setIsHovering] = React.useState(false);
    const [isContentHovering, setIsContentHovering] = React.useState(false);

    const triggerRef = React.useRef<HTMLDivElement>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);
    const openTimeoutRef = React.useRef<NodeJS.Timeout>();
    const closeTimeoutRef = React.useRef<NodeJS.Timeout>();

    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : internalOpen;

    const setOpen = React.useCallback(
      (open: boolean) => {
        if (!isControlled) {
          setInternalOpen(open);
        }
        onOpenChange?.(open);
      },
      [isControlled, onOpenChange]
    );

    // Clear timeouts on cleanup
    React.useEffect(() => {
      return () => {
        if (openTimeoutRef.current) {
          clearTimeout(openTimeoutRef.current);
        }
        if (closeTimeoutRef.current) {
          clearTimeout(closeTimeoutRef.current);
        }
      };
    }, []);

    // Handle open/close logic
    React.useEffect(() => {
      if (disabled) return;

      if (isHovering || isContentHovering) {
        if (closeTimeoutRef.current) {
          clearTimeout(closeTimeoutRef.current);
          closeTimeoutRef.current = undefined;
        }

        if (!isOpen) {
          openTimeoutRef.current = setTimeout(() => {
            setOpen(true);
          }, openDelay);
        }
      } else {
        if (openTimeoutRef.current) {
          clearTimeout(openTimeoutRef.current);
          openTimeoutRef.current = undefined;
        }

        if (isOpen) {
          closeTimeoutRef.current = setTimeout(() => {
            setOpen(false);
          }, closeDelay);
        }
      }
    }, [isHovering, isContentHovering, isOpen, disabled, openDelay, closeDelay, setOpen]);

    // Position calculation
    const [position, setPosition] = React.useState({ top: 0, left: 0 });

    React.useEffect(() => {
      if (!isOpen || !triggerRef.current || !contentRef.current) return;

      const updatePosition = () => {
        const triggerRect = triggerRef.current?.getBoundingClientRect();
        const contentRect = contentRef.current?.getBoundingClientRect();
        const viewport = {
          width: window.innerWidth,
          height: window.innerHeight,
        };

        let top = 0;
        let left = 0;

        // Calculate base position
        switch (side) {
          case "top":
            top = triggerRect.top - contentRect.height - sideOffset;
            break;
          case "bottom":
            top = triggerRect.bottom + sideOffset;
            break;
          case "left":
            left = triggerRect.left - contentRect.width - sideOffset;
            break;
          case "right":
            left = triggerRect.right + sideOffset;
            break;
        }

        // Calculate alignment
        if (side === "top" || side === "bottom") {
          switch (align) {
            case "start":
              left = triggerRect.left + alignOffset;
              break;
            case "center":
              left = triggerRect.left + triggerRect.width / 2 - contentRect.width / 2 + alignOffset;
              break;
            case "end":
              left = triggerRect.right - contentRect.width + alignOffset;
              break;
          }
        } else {
          switch (align) {
            case "start":
              top = triggerRect.top + alignOffset;
              break;
            case "center":
              top = triggerRect.top + triggerRect.height / 2 - contentRect.height / 2 + alignOffset;
              break;
            case "end":
              top = triggerRect.bottom - contentRect.height + alignOffset;
              break;
          }
        }

        // Collision detection and avoidance
        if (avoidCollisions) {
          // Horizontal boundaries
          if (left < 8) {
            left = 8;
          } else if (left + contentRect.width > viewport.width - 8) {
            left = viewport.width - contentRect.width - 8;
          }

          // Vertical boundaries
          if (top < 8) {
            top = 8;
          } else if (top + contentRect.height > viewport.height - 8) {
            top = viewport.height - contentRect.height - 8;
          }
        }

        setPosition({ top, left });
      };

      updatePosition();

      if (sticky === "always") {
        window.addEventListener("scroll", updatePosition, true);
        window.addEventListener("resize", updatePosition);

        return () => {
          window.removeEventListener("scroll", updatePosition, true);
          window.removeEventListener("resize", updatePosition);
        };
      }
    }, [isOpen, side, align, sideOffset, alignOffset, avoidCollisions, sticky]);

    // Handle trigger events
    const handleTriggerMouseEnter = () => {
      if (!disabled) {
        setIsHovering(true);
      }
    };

    const handleTriggerMouseLeave = () => {
      setIsHovering(false);
    };

    const handleContentMouseEnter = () => {
      setIsContentHovering(true);
    };

    const handleContentMouseLeave = () => {
      setIsContentHovering(false);
    };

    // Handle keyboard events
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setOpen(false);
      }
    };

    return (
      <div className="relative inline-block">
        {/* Trigger */}
        <div
          ref={triggerRef}
          onMouseEnter={handleTriggerMouseEnter}
          onMouseLeave={handleTriggerMouseLeave}
          onKeyDown={handleKeyDown}
          tabIndex={disabled ? -1 : 0}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          className="inline-block"
        >
          {trigger}
        </div>

        {/* Portal content */}
        {isOpen && (
          <div className="fixed inset-0 z-50 pointer-events-none" style={{ zIndex: 1000 }}>
            <LiquidGlass
              ref={contentRef}
              variant="card"
              intensity="medium"
              className={cn(
                liquidHoverCardVariants({ variant, size }),
                "fixed pointer-events-auto",
                className
              )}
              style={{
                top: position.top,
                left: position.left,
              }}
              onMouseEnter={handleContentMouseEnter}
              onMouseLeave={handleContentMouseLeave}
              role="dialog"
              aria-modal="false"
              data-state={isOpen ? "open" : "closed"}
              {...props}
            >
              <div className={cn(hoverCardContentVariants({ align }))}>{children}</div>
            </LiquidGlass>
          </div>
        )}
      </div>
    );
  }
);

LiquidHoverCard.displayName = "LiquidHoverCard";

// Avatar-based hover card for user profiles
interface LiquidUserHoverCardProps extends Omit<LiquidHoverCardProps, "children"> {
  user: {
    name: string;
    username?: string;
    avatar?: string;
    bio?: string;
    location?: string;
    website?: string;
    joinDate?: string;
    stats?: {
      followers?: number;
      following?: number;
      posts?: number;
    };
  };
  showStats?: boolean;
  showBio?: boolean;
  showMetadata?: boolean;
}

export const LiquidUserHoverCard = React.forwardRef<HTMLDivElement, LiquidUserHoverCardProps>(
  ({ user, showStats = true, showBio = true, showMetadata = true, size = "lg", ...props }, ref) => {
    const formatNumber = (num: number) => {
      if (num >= 1000000) {
        return `${(num / 1000000).toFixed(1)}M`;
      }
      if (num >= 1000) {
        return `${(num / 1000).toFixed(1)}K`;
      }
      return num.toString();
    };

    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      });
    };

    return (
      <LiquidHoverCard ref={ref} size={size} {...props}>
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start space-x-3">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-white/20"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-white font-semibold text-lg">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-white truncate">{user.name}</h3>
              {user.username && <p className="text-white/60 text-sm">@{user.username}</p>}
            </div>
          </div>

          {/* Bio */}
          {showBio && user.bio && (
            <p className="text-white/80 text-sm leading-relaxed">{user.bio}</p>
          )}

          {/* Metadata */}
          {showMetadata && (
            <div className="space-y-1 text-xs text-white/60">
              {user.location && (
                <div className="flex items-center space-x-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{user.location}</span>
                </div>
              )}
              {user.website && (
                <div className="flex items-center space-x-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="truncate">{user.website}</span>
                </div>
              )}
              {user.joinDate && (
                <div className="flex items-center space-x-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Joined {formatDate(user.joinDate)}</span>
                </div>
              )}
            </div>
          )}

          {/* Stats */}
          {showStats && user.stats && (
            <div className="flex space-x-4 pt-2 border-t border-white/10">
              {user.stats.followers !== undefined && (
                <div className="text-center">
                  <div className="font-semibold text-white text-sm">
                    {formatNumber(user.stats.followers)}
                  </div>
                  <div className="text-white/60 text-xs">Followers</div>
                </div>
              )}
              {user.stats.following !== undefined && (
                <div className="text-center">
                  <div className="font-semibold text-white text-sm">
                    {formatNumber(user.stats.following)}
                  </div>
                  <div className="text-white/60 text-xs">Following</div>
                </div>
              )}
              {user.stats.posts !== undefined && (
                <div className="text-center">
                  <div className="font-semibold text-white text-sm">
                    {formatNumber(user.stats.posts)}
                  </div>
                  <div className="text-white/60 text-xs">Posts</div>
                </div>
              )}
            </div>
          )}
        </div>
      </LiquidHoverCard>
    );
  }
);

LiquidUserHoverCard.displayName = "LiquidUserHoverCard";

export { liquidHoverCardVariants, hoverCardContentVariants, type LiquidHoverCardProps };
