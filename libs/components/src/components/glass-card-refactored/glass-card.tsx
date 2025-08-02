/**
 * Refactored Glass Card Component - Tailwind Migration
 *
 * This component demonstrates the Tailwind-based compound component architecture with:
 * - Tailwind CSS classes with glass utilities plugin
 * - HIG-compliant corner radii (radius-lg-s/m/l)
 * - Motion-safe hover and active states
 * - Glass effects using custom Tailwind utilities
 * - Compound components pattern with Card.Header, Card.Content, etc.
 * - Proper forwardRef throughout
 */

import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type {
  ComponentPropsBuilder,
  HeadingProps,
  LayoutGlassProps,
  ParagraphProps,
} from "../../core/base-component";
import { cn } from "../../core/utils/classname";
import { useGlassStateTransitions } from "../../hooks/use-glass-animations";

// Card state type
interface CardState {
  isHovered: boolean;
  isPressed: boolean;
  isSelected: boolean;
}

// Card-specific props
interface GlassCardRefactoredProps
  extends LayoutGlassProps,
    ComponentPropsBuilder<HTMLDivElement> {
  /** Card hover effects */
  hover?: boolean;
  /** Card borders */
  bordered?: boolean;
  /** Interactive card (clickable) */
  interactive?: boolean;
  /** Selectable card */
  selectable?: boolean;
  /** Selected state */
  selected?: boolean;
  /** Card elevation */
  elevation?: "none" | "sm" | "md" | "lg" | "xl";
  /** Card orientation */
  orientation?: "vertical" | "horizontal";
  /** Card click handler */
  onCardClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /** Card selection handler */
  onCardSelect?: (selected: boolean) => void;
}

// Business logic for card interactions
const useCardBusinessLogic = (props: GlassCardRefactoredProps) => {
  const [state, setState] = useState<CardState>({
    isHovered: false,
    isPressed: false,
    isSelected: props.selected || false,
  });

  const actions = useMemo(
    () => ({
      handleHover: (isHovered: boolean) => {
        if (!props.hover) return;
        setState((prev) => ({ ...prev, isHovered }));
      },

      handlePress: () => {
        if (!props.interactive) return;
        setState((prev) => ({ ...prev, isPressed: true }));
        setTimeout(
          () => setState((prev) => ({ ...prev, isPressed: false })),
          150,
        );
      },

      handleSelect: (isSelected: boolean) => {
        if (!props.selectable) return;
        setState((prev) => ({ ...prev, isSelected }));
      },
    }),
    [props.hover, props.interactive, props.selectable],
  );

  return { state, actions };
};

// Card context for sharing state between compound components
interface CardContextValue {
  variant: string;
  size: string;
  padding: string;
  interactive: boolean;
  selectable: boolean;
}

const CardContext = createContext<CardContextValue | null>(null);

const useCardContext = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error(
      "Card compound components must be used within a Card component",
    );
  }
  return context;
};

// Variant class mappings using Tailwind + glass utilities
const VARIANT_CLASSES = {
  primary: cn(
    "glass glass-card",
    "bg-white/90 dark:bg-gray-800/90",
    "border border-gray-200/50 dark:border-gray-700/50"
  ),
  secondary: cn(
    "glass glass-card",
    "bg-gray-50/90 dark:bg-gray-900/90",
    "border border-gray-300/50 dark:border-gray-600/50"
  ),
  tertiary: cn(
    "glass-card bg-transparent",
    "border border-gray-200/30 dark:border-gray-700/30"
  ),
  ghost: cn(
    "glass-card bg-transparent border-transparent"
  ),
  destructive: cn(
    "glass glass-card",
    "bg-red-50/90 dark:bg-red-900/10",
    "border border-red-200/50 dark:border-red-800/50"
  ),
  apple: cn(
    "glass glass-card",
    "bg-white/80 dark:bg-gray-800/80",
    "border border-gray-200/30 dark:border-gray-700/30"
  ),
};

// Elevation mappings using Tailwind shadow utilities
const ELEVATION_CLASSES = {
  none: "",
  sm: "shadow-sm",
  md: "shadow-glass",
  lg: "shadow-lg",
  xl: "shadow-xl",
};

// Padding mappings using Tailwind spacing
const PADDING_CLASSES = {
  none: "",
  xs: "p-2",
  sm: "p-3", 
  md: "p-4",
  lg: "p-6",
  xl: "p-8",
};

// Size-based radius mappings (HIG-compliant)
const RADIUS_CLASSES = {
  xs: "radius-lg-s",
  sm: "radius-lg-s",
  md: "radius-lg-m", 
  lg: "radius-lg-m",
  xl: "radius-lg-l",
};

/**
 * Main Glass Card Component
 */
export const GlassCard = React.memo(
  forwardRef<HTMLDivElement, GlassCardRefactoredProps>(
    (
      {
        // Base props
        size = "md",
        variant = "primary",
        className,
        children,

        // Layout props
        padding = "md",
        radius = "md",

        // Card-specific props
        hover = true,
        bordered = true,
        interactive = false,
        selectable = false,
        selected = false,
        elevation = "md",
        orientation = "vertical",

        // Glass effect props
        glassEffect = { intensity: "medium", blur: true, backdrop: true },

        // Animation props
        animation = "normal",
        disableAnimations = false,

        // Event handlers
        onClick,
        onMouseEnter,
        onMouseLeave,
        onCardClick,
        onCardSelect,

        ...props
      },
      ref,
    ) => {
      const { state, actions } = useCardBusinessLogic({
        hover,
        interactive,
        selectable,
        selected,
        size,
        variant,
        glassEffect,
        animation,
        disableAnimations,
        padding,
        radius,
        bordered,
        elevation,
        orientation,
        onCardClick,
        onCardSelect,
        ...props,
      });

      // Animation hooks
      const { currentState } = useGlassStateTransitions(animation);

      // Event handlers with business logic
      const handleClick = useCallback(
        (event: React.MouseEvent<HTMLDivElement>) => {
          if (interactive) {
            actions.handlePress();
            onCardClick?.(event);
          }

          if (selectable) {
            const newSelected = !state.isSelected;
            actions.handleSelect(newSelected);
            onCardSelect?.(newSelected);
          }

          onClick?.(event);
        },
        [
          interactive,
          selectable,
          state.isSelected,
          actions,
          onCardClick,
          onCardSelect,
          onClick,
        ],
      );

      const handleMouseEnter = useCallback(
        (event: React.MouseEvent<HTMLDivElement>) => {
          if (hover) {
            actions.handleHover(true);
          }
          onMouseEnter?.(event);
        },
        [hover, actions, onMouseEnter],
      );

      const handleMouseLeave = useCallback(
        (event: React.MouseEvent<HTMLDivElement>) => {
          if (hover) {
            actions.handleHover(false);
          }
          onMouseLeave?.(event);
        },
        [hover, actions, onMouseLeave],
      );

      const handleKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLDivElement>) => {
          if (
            (interactive || selectable) &&
            (event.key === "Enter" || event.key === " ")
          ) {
            event.preventDefault();
            actions.handlePress();
            if (onCardClick) {
              // Create a synthetic mouse event for consistency
              const syntheticEvent = {
                ...event,
                type: "click",
                button: 0,
                buttons: 0,
                clientX: 0,
                clientY: 0,
                pageX: 0,
                pageY: 0,
                screenX: 0,
                screenY: 0,
                movementX: 0,
                movementY: 0,
                offsetX: 0,
                offsetY: 0,
                x: 0,
                y: 0,
                getModifierState: event.getModifierState,
                relatedTarget: null,
              } as unknown as React.MouseEvent<HTMLDivElement>;
              onCardClick(syntheticEvent);
            }
          }
        },
        [interactive, selectable, actions, onCardClick],
      );

      // Build component classes using Tailwind + glass utilities
      const componentClasses = cn(
        // Base classes with glass utilities
        "relative overflow-hidden will-change-transform",
        
        // HIG-compliant radius based on size
        RADIUS_CLASSES[size as keyof typeof RADIUS_CLASSES],

        // Variant classes (includes glass utilities)
        VARIANT_CLASSES[variant as keyof typeof VARIANT_CLASSES],

        // Layout classes
        PADDING_CLASSES[padding as keyof typeof PADDING_CLASSES],

        // State classes with motion-safe prefixes
        {
          "cursor-pointer": interactive || selectable,
          "ring-2 ring-glass-accent/20": state.isSelected,
          "motion-safe:hover:shadow-lg": hover && !disableAnimations,
          "motion-safe:active:scale-[0.98]": interactive && !disableAnimations,
          flex: orientation === "horizontal",
          "flex-col": orientation === "vertical",
        },

        // Elevation classes
        ELEVATION_CLASSES[elevation],

        // Animation classes with motion-safe
        !disableAnimations && "transition-all duration-300 ease-out",

        // Custom classes
        className,
      );

      // Context value for compound components
      const contextValue: CardContextValue = {
        variant: variant || "primary",
        size: size || "md",
        padding: padding || "md",
        interactive,
        selectable,
      };

      return (
        <CardContext.Provider value={contextValue}>
          <div
            ref={ref}
            className={componentClasses}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            role={interactive || selectable ? "button" : undefined}
            tabIndex={interactive || selectable ? 0 : undefined}
            aria-pressed={selectable ? state.isSelected : undefined}
            aria-label={
              interactive || selectable ? "Interactive card" : undefined
            }
            data-testid="glass-card"
            {...props}
          >
            {/* Glass effect layers */}
            <div className="glass-filter" />
            <div className="glass-overlay" />
            <div className="glass-specular" />
            
            {/* Card content */}
            <div className="glass-content">
              {children}
            </div>
          </div>
        </CardContext.Provider>
      );
    },
  ),
);

GlassCard.displayName = "GlassCard";

/**
 * Card Header Component
 */
const CardHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { variant } = useCardContext();

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col space-y-1.5 p-6",
        variant === "apple" && "pb-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});

CardHeader.displayName = "CardHeader";

/**
 * Card Title Component
 */
const CardTitle = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, children, ...props }, ref) => {
    const { variant } = useCardContext();

    return (
      <h3
        ref={ref}
        className={cn(
          "font-semibold text-lg leading-none tracking-tight",
          "text-gray-900 dark:text-gray-100",
          variant === "apple" && "text-gray-800 dark:text-gray-200",
          className,
        )}
        {...props}
      >
        {children}
      </h3>
    );
  },
);

CardTitle.displayName = "CardTitle";

/**
 * Card Description Component
 */
const CardDescription = forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ className, children, ...props }, ref) => {
    const { variant } = useCardContext();

    return (
      <p
        ref={ref}
        className={cn(
          "text-gray-600 text-sm dark:text-gray-400",
          variant === "apple" && "text-gray-700 dark:text-gray-300",
          className,
        )}
        {...props}
      >
        {children}
      </p>
    );
  },
);

CardDescription.displayName = "CardDescription";

/**
 * Card Content Component
 */
const CardContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { padding } = useCardContext();

  return (
    <div
      ref={ref}
      className={cn("flex-1", padding !== "none" && "p-6 pt-0", className)}
      {...props}
    >
      {children}
    </div>
  );
});

CardContent.displayName = "CardContent";

/**
 * Card Footer Component
 */
const CardFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { variant } = useCardContext();

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center p-6 pt-0",
        variant === "apple" && "pt-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});

CardFooter.displayName = "CardFooter";

/**
 * Card Actions Component
 */
const CardActions = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex items-center gap-2 p-6 pt-0", className)}
      data-testid="glass-card-actions"
      {...props}
    >
      {children}
    </div>
  );
});

CardActions.displayName = "CardActions";

// Create compound component with all sub-components
const CompoundCard: typeof GlassCard & {
  Header: typeof CardHeader;
  Title: typeof CardTitle;
  Description: typeof CardDescription;
  Content: typeof CardContent;
  Footer: typeof CardFooter;
  Actions: typeof CardActions;
} = Object.assign(GlassCard, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter,
  Actions: CardActions,
});

export { CompoundCard as Card };
