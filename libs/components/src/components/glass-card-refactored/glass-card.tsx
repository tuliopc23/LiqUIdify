/**
 * Refactored Glass Card Component
 *
 * This component demonstrates the compound component architecture with:
 * - Compound components pattern with Card.Header, Card.Content, etc.
 * - Unified base component system
 * - Centralized glass effects
 * - Proper forwardRef throughout
 * - Separated business logic from presentation
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
import {
  generateGlassClasses,
  generateGlassVariables,
} from "../../core/glass/unified-glass-system";

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

// Variant class mappings
const VARIANT_CLASSES = {
  primary:
    "bg-white/90 dark:bg-gray-800/90 border-gray-200/50 dark:border-gray-700/50",
  secondary:
    "bg-gray-50/90 dark:bg-gray-900/90 border-gray-300/50 dark:border-gray-600/50",
  tertiary: "bg-transparent border-gray-200/30 dark:border-gray-700/30",
  ghost: "bg-transparent border-transparent",
  destructive:
    "bg-red-50/90 dark:bg-red-900/10 border-red-200/50 dark:border-red-800/50",
  apple:
    "bg-white/80 dark:bg-gray-800/80 border-gray-200/30 dark:border-gray-700/30",
};

// Elevation mappings
const ELEVATION_CLASSES = {
  none: "",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
};

// Padding mappings
const PADDING_CLASSES = {
  none: "",
  xs: "p-2",
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
  xl: "p-8",
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

      // Generate glass classes and variables
      const glassClasses = generateGlassClasses({
        variant: variant as any,
        intensity: glassEffect?.intensity,
        state: currentState,
        glassEffect: glassEffect as Record<string, unknown>,
      });

      const glassVariables = generateGlassVariables({
        intensity: glassEffect?.intensity,
        config: {
          animation: { duration: 300, easing: "cubic-bezier(0.4, 0, 0.2, 1)" },
          ...glassEffect,
        },
      });

      // Build component classes
      const componentClasses = cn(
        // Base classes
        "relative overflow-hidden",
        "rounded-xl",
        "will-change-transform",

        // Glass effect classes
        glassClasses,

        // Variant classes
        VARIANT_CLASSES[variant as keyof typeof VARIANT_CLASSES],

        // Layout classes
        PADDING_CLASSES[padding as keyof typeof PADDING_CLASSES],

        // State classes
        {
          border: bordered,
          "cursor-pointer": interactive || selectable,
          "ring-2 ring-blue-500/20": state.isSelected,
          "hover:shadow-lg": hover && !disableAnimations,
          "active:scale-[0.98]": interactive && !disableAnimations,
          flex: orientation === "horizontal",
          "flex-col": orientation === "vertical",
        },

        // Elevation classes
        ELEVATION_CLASSES[elevation],

        // Animation classes
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
            style={glassVariables as React.CSSProperties}
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
            {children}
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
  ComponentPropsBuilder<HTMLDivElement>
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
  ComponentPropsBuilder<HTMLDivElement>
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
  ComponentPropsBuilder<HTMLDivElement>
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
  ComponentPropsBuilder<HTMLDivElement>
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
const CompoundCard = Object.assign(GlassCard, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter,
  Actions: CardActions,
});

export { CompoundCard as Card };
