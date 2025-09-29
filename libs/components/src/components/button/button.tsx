import React, { forwardRef, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { cx } from "../../../../../styled-system/css";
import { button as buttonRecipe } from "../../../../../styled-system/recipes";
import { focusRing } from "../../core/utils/classname";
import { useMagneticHover } from "../../hooks/useMagneticHover";
import { useGlassMicro } from "../../hooks/useGlassMicro";

type ButtonVariantNew = "filled" | "tinted" | "plain";
type ButtonTone = "accent" | "neutral" | "destructive";
type ButtonSizeNew = "compact" | "regular" | "large";

// Legacy variants (shim) mapped to new API
type ButtonVariantLegacy =
  | "primary"
  | "secondary"
  | "ghost"
  | "danger"
  | "success"
  | "warning";

// Underlying recipe variants and sizes
type RecipeVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "danger"
  | "success"
  | "warning"
  | "filled"
  | "tinted"
  | "plain";
type RecipeSize = "sm" | "md" | "lg" | "xl" | "compact" | "regular" | "large";

type AsElement = React.ElementType;

/**
 * Apple HIG–aligned Button props.
 *
 * New API:
 * - variant: "filled" | "tinted" | "plain"
 * - tone: "accent" | "neutral" | "destructive"
 * - size: "compact" | "regular" | "large" | "sm" | "md" | "lg" | "xl" (legacy; allowed)
 * - as: polymorphic root element (button | a | RouterLink etc.), preserves semantics
 * - icon/iconPosition: render an icon before or after the label; icon-only requires aria-label
 * - loading: sets aria-busy and disables interactions; adds data-loading for styling
 * - disabled: disables interactions; for non-native elements, sets aria-disabled and tabIndex=-1
 *
 * Legacy mapping:
 * - primary → filled accent
 * - secondary → tinted neutral
 * - ghost → plain neutral
 * - danger → filled destructive
 * - success → success recipe
 * - warning → warning recipe
 *
 * Accessibility:
 * - Enforces ≥44×44 min target via recipe sizes
 * - Applies focus-visible ring using accent token
 * - Icon-only usage MUST supply an accessible name (aria-label)
 */
export interface BaseButtonProps {
  // New API
  variant?: ButtonVariantNew | ButtonVariantLegacy;
  tone?: ButtonTone;
  size?: ButtonSizeNew | RecipeSize;
  as?: AsElement;
  icon?: React.ReactNode;
  iconPosition?: "start" | "end";
  loading?: boolean;
  disabled?: boolean;
  "aria-label"?: string;
  children?: React.ReactNode;
  className?: string;
  // Magnetic hover enhancement
  magneticHover?: boolean;
  magneticStrength?: number;
}

export type ButtonProps<C extends AsElement = "button"> = BaseButtonProps &
  Omit<
    React.ComponentPropsWithoutRef<C>,
    keyof BaseButtonProps | "as" | "disabled"
  > & {
    as?: C;
  };

function mapSize(size?: ButtonSizeNew | RecipeSize): RecipeSize {
  switch (size) {
    case "compact":
      return "sm";
    case "regular":
      return "md";
    case "large":
      return "lg";
    case "sm":
    case "md":
    case "lg":
    case "xl":
      return size as RecipeSize;
    default:
      return "md";
  }
}

function isLegacyVariant(v?: string): v is ButtonVariantLegacy {
  return (
    v === "primary" ||
    v === "secondary" ||
    v === "ghost" ||
    v === "danger" ||
    v === "success" ||
    v === "warning"
  );
}

/**
 * Map new API (variant + tone) and legacy variants to underlying recipe variants.
 * New → Recipe:
 * - filled + destructive → "danger"; otherwise → "primary"
 * - tinted + neutral → "secondary"; tinted + destructive → "danger"; tinted + accent → "primary"
 * - plain → "ghost"
 * Legacy passthrough:
 * "primary" | "secondary" | "ghost" | "danger" | "success" | "warning"
 */
function mapVariant(
  variant?: ButtonVariantNew | ButtonVariantLegacy,
  _tone: ButtonTone = "accent",
): RecipeVariant {
  // Preserve legacy directly
  if (isLegacyVariant(variant)) return variant;

  // New API → pass through to recipe
  switch (variant) {
    case "filled":
    case "tinted":
    case "plain":
      return variant;
    default:
      // default to filled (accent)
      return "filled";
  }
}

function isNativeButton(el: React.ElementType | undefined): el is "button" {
  return !el || el === "button";
}

export const Button = forwardRef<any, ButtonProps<any>>(function Button<
  C extends React.ElementType = "button",
>(props: ButtonProps<C>, ref: React.Ref<any>) {
  const {
    as,
    variant = "filled",
    tone = "accent",
    size = "regular",
    icon,
    iconPosition = "start",
    loading = false,
    disabled: disabledProp = false,
    className,
    children,
    "aria-label": ariaLabel,
    onClick,
    role,
    tabIndex,
    magneticHover = true,
    magneticStrength = 0.3,
    ...rest
  } = props;

  const Comp: any = as || "button";
  
  // Loading/disabled semantics (moved up)
  const isDisabled = !!disabledProp || !!loading;
  
  // Enhanced liquid animations with magnetic hover
  const magnetic = useMagneticHover({
    strength: magneticStrength,
    disabled: isDisabled || !magneticHover,
  });

  // Enhanced spring physics for touch interactions
  const glassMicro = useGlassMicro({
    stiffness: 350,
    damping: 22,
    onTap: onClick ? () => {} : undefined, // Enable tap effects when clickable
  });

  // Merge refs to support both magnetic ref and forwarded ref
  const mergedRef = useCallback((node: HTMLElement | null) => {
    // Set the magnetic ref
    if (magnetic.ref.current !== node) {
      magnetic.ref.current = node;
    }
    
    // Forward to consumer ref
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref && 'current' in ref) {
      (ref as React.MutableRefObject<HTMLElement | null>).current = node;
    }
  }, [ref, magnetic.ref]);
  if (
    isLegacyVariant(variant) &&
    typeof process !== "undefined" &&
    process.env?.NODE_ENV !== "production"
  ) {
    const suggestion =
      variant === "primary"
        ? 'variant="filled" tone="accent"'
        : variant === "secondary"
          ? 'variant="tinted" tone="neutral"'
          : variant === "ghost"
            ? 'variant="plain" tone="neutral"'
            : variant === "danger"
              ? 'variant="filled" tone="destructive"'
              : variant === "success"
                ? 'variant="filled" tone="accent"'
                : variant === "warning"
                  ? 'variant="tinted" tone="accent"'
                  : "";
    // eslint-disable-next-line no-console
    console.warn(
      `[Button] Legacy variant value "${variant}" is deprecated. Use ${suggestion}.`,
    );
  }

  const recipeVariant: RecipeVariant = mapVariant(variant, tone);
  const recipeSize: RecipeSize = mapSize(size);

  // Icon-only a11y guard
  const isIconOnly = !children && !!icon;
  if (
    isIconOnly &&
    !ariaLabel &&
    typeof process !== "undefined" &&
    process.env?.NODE_ENV !== "production"
  ) {
    // eslint-disable-next-line no-console
    console.warn(
      "[Button] Icon-only buttons must include an accessible name via `aria-label`.",
    );
  }

  // Loading/disabled semantics (already defined above)
  const commonA11y: Record<string, any> = {
    "aria-busy": loading || undefined,
    "aria-disabled": !isNativeButton(Comp) && isDisabled ? true : undefined,
    "data-loading": loading ? "" : undefined,
    "data-icon-only": isIconOnly ? "" : undefined,
    "data-tone": tone,
  };

  const handleClick: React.MouseEventHandler = (e) => {
    if (isDisabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    onClick?.(e);
  };

  // Keyboard/focus semantics for non-native elements
  const computedRole = !isNativeButton(Comp) && !role ? "button" : role;
  const computedTabIndex =
    !isNativeButton(Comp) && tabIndex == null
      ? isDisabled
        ? -1
        : 0
      : tabIndex;

  // Memoize MotionComp to prevent remounting
  const MotionComp = useMemo(() => 
    magneticHover ? motion(Comp) : Comp, 
    [magneticHover, Comp]
  );

  // Enhanced compose function to support multiple handlers (consumer, magnetic, spring)
  const composeHandlers = useCallback((consumerHandler: any, magneticHandler?: any, springHandler?: any) => {
    const hasHandlers = consumerHandler || magneticHandler || springHandler;
    return hasHandlers 
      ? (event: any) => {
          consumerHandler?.(event);
          magneticHandler?.(event);
          springHandler?.(event);
        }
      : undefined;
  }, []);

  // Extract and compose handlers from rest
  const { 
    onMouseMove: consumerMouseMove, 
    onMouseEnter: consumerMouseEnter, 
    onMouseLeave: consumerMouseLeave,
    onMouseDown: consumerMouseDown,
    onMouseUp: consumerMouseUp,
    onTouchStart: consumerTouchStart,
    onTouchEnd: consumerTouchEnd,
    style: consumerStyle,
    ...restWithoutHandlers 
  } = rest;

  const composedHandlers = {
    // Magnetic hover handlers (if enabled)
    onMouseMove: magneticHover 
      ? composeHandlers(consumerMouseMove, magnetic.handlers.onMouseMove)
      : consumerMouseMove,
    onMouseEnter: composeHandlers(
      consumerMouseEnter, 
      magneticHover ? magnetic.handlers.onMouseEnter : undefined,
      glassMicro.interactions.onHoverStart
    ),
    onMouseLeave: composeHandlers(
      consumerMouseLeave,
      magneticHover ? magnetic.handlers.onMouseLeave : undefined, 
      glassMicro.interactions.onHoverEnd
    ),
    // Enhanced spring physics for press interactions
    onMouseDown: composeHandlers(consumerMouseDown, glassMicro.interactions.onPressStart),
    onMouseUp: composeHandlers(consumerMouseUp, glassMicro.interactions.onPressEnd),
    onTouchStart: composeHandlers(consumerTouchStart, glassMicro.interactions.onPressStart),
    onTouchEnd: composeHandlers(consumerTouchEnd, glassMicro.interactions.onPressEnd),
  };

  // Merge styles to preserve motion values and spring physics
  const mergedStyle = {
    ...consumerStyle,
    ...(magneticHover ? magnetic.style : {}),
    // Add enhanced spring physics to all buttons
    scale: glassMicro.scale,
    y: glassMicro.y,
  };

  return (
    <MotionComp
      ref={magneticHover ? mergedRef : ref}
      style={mergedStyle}
      className={cx(
        buttonRecipe({ variant: recipeVariant, tone, size: recipeSize }),
        focusRing(true),
        className,
      )}
      disabled={isNativeButton(Comp) ? isDisabled : undefined}
      onClick={handleClick}
      role={computedRole}
      tabIndex={computedTabIndex}
      aria-label={ariaLabel}
      {...commonA11y}
      {...restWithoutHandlers}
      {...composedHandlers}
    >
      {icon && iconPosition === "start" ? (
        <span aria-hidden="true" className="btn__icon btn__icon--start">
          {icon}
        </span>
      ) : null}
      {children ? <span className="btn__label">{children}</span> : null}
      {icon && iconPosition === "end" ? (
        <span aria-hidden="true" className="btn__icon btn__icon--end">
          {icon}
        </span>
      ) : null}
      {loading ? (
        <span aria-hidden="true" className="btn__spinner">
          {/* Placeholder spinner slot for consumers to style */}
        </span>
      ) : null}
    </MotionComp>
  );
}) as <C extends React.ElementType = "button">(
  props: ButtonProps<C> & { ref?: React.Ref<any> },
) => React.ReactElement | null;

(Button as any).displayName = "Button";
