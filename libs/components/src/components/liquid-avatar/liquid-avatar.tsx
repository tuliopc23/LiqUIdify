"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";
import { LiquidGlass } from "../liquid-glass";

const liquidAvatarVariants = cva("relative flex shrink-0 overflow-hidden", {
  variants: {
    variant: {
      default: "rounded-full",
      square: "rounded-lg",
      rounded: "rounded-xl",
    },
    size: {
      xs: "h-6 w-6 text-xs",
      sm: "h-8 w-8 text-sm",
      md: "h-10 w-10 text-base",
      lg: "h-12 w-12 text-lg",
      xl: "h-16 w-16 text-xl",
      "2xl": "h-20 w-20 text-2xl",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

const avatarImageVariants = cva("aspect-square h-full w-full object-cover", {
  variants: {
    variant: {
      default: "rounded-full",
      square: "rounded-lg",
      rounded: "rounded-xl",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const avatarFallbackVariants = cva(
  "flex h-full w-full items-center justify-center font-medium text-white ",
  {
    variants: {
      variant: {
        default: "rounded-full",
        square: "rounded-lg",
        rounded: "rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const statusIndicatorVariants = cva("absolute border-2 border-white rounded-full", {
  variants: {
    size: {
      xs: "h-2 w-2 -bottom-0 -right-0",
      sm: "h-2.5 w-2.5 -bottom-0 -right-0",
      md: "h-3 w-3 -bottom-0.5 -right-0.5",
      lg: "h-3.5 w-3.5 -bottom-0.5 -right-0.5",
      xl: "h-4 w-4 -bottom-1 -right-1",
      "2xl": "h-5 w-5 -bottom-1 -right-1",
    },
    status: {
      online: "bg-green-500",
      offline: "bg-gray-400",
      away: "bg-yellow-500",
      busy: "bg-red-500",
    },
  },
  defaultVariants: {
    size: "md",
    status: "online",
  },
});

interface LiquidAvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof liquidAvatarVariants> {
  src?: string;
  alt?: string;
  fallback?: React.ReactNode;
  status?: "online" | "offline" | "away" | "busy";
  showStatus?: boolean;
  loading?: "lazy" | "eager";
  onImageLoad?: () => void;
  onImageError?: () => void;
}

export const LiquidAvatar = React.forwardRef<HTMLDivElement, LiquidAvatarProps>(
  (
    {
      className,
      variant,
      size,
      src,
      alt,
      fallback,
      status = "online",
      showStatus = false,
      loading = "lazy",
      onImageLoad,
      onImageError,
      ...props
    },
    ref
  ) => {
    const [imageError, setImageError] = React.useState(false);
    const [imageLoaded, setImageLoaded] = React.useState(false);

    const handleImageLoad = React.useCallback(() => {
      setImageLoaded(true);
      onImageLoad?.();
    }, [onImageLoad]);

    const handleImageError = React.useCallback(() => {
      setImageError(true);
      onImageError?.();
    }, [onImageError]);

    // Generate initials from alt text or fallback
    const generateInitials = React.useCallback((text: string) => {
      return text
        .split(" ")
        .map((word) => word.charAt(0))
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }, []);

    const renderFallback = () => {
      if (fallback) {
        return fallback;
      }

      if (alt) {
        return generateInitials(alt);
      }

      // Default user icon
      return (
        <svg
          width="60%"
          height="60%"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-white/80"
        >
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      );
    };

    const shouldShowImage = src && !imageError;

    return (
      <LiquidGlass
        ref={ref}
        variant="card"
        intensity="subtle"
        className={cn(liquidAvatarVariants({ variant, size }), className)}
        {...props}
      >
        {shouldShowImage ? (
          <img
            src={src}
            alt={alt}
            loading={loading}
            className={cn(
              avatarImageVariants({ variant }),
              !imageLoaded && "opacity-0 transition-opacity duration-200",
              imageLoaded && "opacity-100"
            )}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        ) : (
          <div className={cn(avatarFallbackVariants({ variant }))}>{renderFallback()}</div>
        )}

        {/* Status indicator */}
        {showStatus && <div className={cn(statusIndicatorVariants({ size, status }))} />}

        {/* Loading state for images */}
        {shouldShowImage && !imageLoaded && (
          <div
            className={cn(
              avatarFallbackVariants({ variant }),
              "absolute inset-0 bg-white/10 animate-pulse"
            )}
          >
            <div className="w-4 h-4 border-2 border-white/30 border-t-white/80 rounded-full animate-spin" />
          </div>
        )}
      </LiquidGlass>
    );
  }
);

LiquidAvatar.displayName = "LiquidAvatar";

// Avatar Group component for displaying multiple avatars
interface LiquidAvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number;
  spacing?: "tight" | "normal" | "loose";
  children: React.ReactNode;
}

const avatarGroupVariants = cva("flex items-center", {
  variants: {
    spacing: {
      tight: "-space-x-2",
      normal: "-space-x-1",
      loose: "space-x-1",
    },
  },
  defaultVariants: {
    spacing: "normal",
  },
});

export const LiquidAvatarGroup = React.forwardRef<HTMLDivElement, LiquidAvatarGroupProps>(
  ({ className, max = 5, spacing = "normal", children, ...props }, ref) => {
    const childrenArray = React.Children.toArray(children);
    const visibleChildren = childrenArray.slice(0, max);
    const remainingCount = Math.max(0, childrenArray.length - max);

    return (
      <div ref={ref} className={cn(avatarGroupVariants({ spacing }), className)} {...props}>
        {visibleChildren.map((child, index) => (
          <div
            key={`avatar-${index}-${Math.random().toString(36).substring(2, 9)}`}
            className="relative ring-2 ring-white/20 rounded-full"
            style={{ zIndex: visibleChildren.length - index }}
          >
            {child}
          </div>
        ))}

        {remainingCount > 0 && (
          <div className="relative ring-2 ring-white/20 rounded-full">
            <LiquidAvatar fallback={`+${remainingCount}`} className="bg-white/20 text-white/80" />
          </div>
        )}
      </div>
    );
  }
);

LiquidAvatarGroup.displayName = "LiquidAvatarGroup";

export {
  liquidAvatarVariants,
  avatarImageVariants,
  avatarFallbackVariants,
  statusIndicatorVariants,
  avatarGroupVariants,
  type LiquidAvatarProps,
};
