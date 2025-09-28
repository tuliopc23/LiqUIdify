import React, { forwardRef } from "react";
import { cx } from "../../../../../styled-system/css";
import { button as buttonRecipe } from "../../../../../styled-system/recipes";
import { focusRing } from "../../core/utils/classname";

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
    ...rest
  } = props;

  const Comp: any = as || "button";
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

  // Loading/disabled semantics
  const isDisabled = !!disabledProp || !!loading;
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

  return (
    <Comp
      ref={ref}
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
      {...rest}
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
    </Comp>
  );
}) as <C extends React.ElementType = "button">(
  props: ButtonProps<C> & { ref?: React.Ref<any> },
) => React.ReactElement | null;

(Button as any).displayName = "Button";
